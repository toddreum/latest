/**
 * BirdTurds.com - Church Directory System (Debugged)
 * Find local churches, events, bulletins
 * Dude.com © 2024. All Rights Reserved.
 * 
 * "For where two or three gather in my name, there am I with them."
 * — Matthew 18:20
 */

(function() {
  'use strict';

  // =============================================================================
  // CHURCH DIRECTORY CLASS
  // =============================================================================

  class ChurchDirectory {
    constructor() {
      this.db = null;
      this.churches = [];
      this.events = [];
      this.bulletins = [];
      this.userLocation = null;
      this.initialized = false;

      this.init();
    }

    init() {
      // Check for Firebase
      if (typeof firebase !== 'undefined' && firebase.firestore) {
        this.db = firebase.firestore();
        this.initialized = true;
        console.log('⛪ Church Directory connected to Firebase');
      } else {
        console.log('⛪ Church Directory using demo data (Firebase not loaded)');
      }

      // Get user location
      this.requestLocation();
    }

    requestLocation() {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          console.log('📍 Location obtained');
        },
        (err) => console.log('Location unavailable:', err.message),
        { timeout: 10000 }
      );
    }

    // =========================================================================
    // CHURCHES
    // =========================================================================

    async fetchChurches(options = {}) {
      if (!this.db) return this.getDemoChurches();

      try {
        let query = this.db.collection('churches');

        if (options.denomination && options.denomination !== 'all') {
          query = query.where('denomination', '==', options.denomination);
        }

        if (options.verified) {
          query = query.where('verified', '==', true);
        }

        query = query.limit(options.limit || 50);

        const snapshot = await query.get();
        this.churches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Calculate distances
        if (this.userLocation) {
          this.churches = this.churches.map(church => ({
            ...church,
            distance: this.calcDistance(
              this.userLocation.lat, this.userLocation.lng,
              church.location?.lat, church.location?.lng
            )
          })).sort((a, b) => (a.distance || 999) - (b.distance || 999));
        }

        return this.churches;
      } catch (error) {
        console.error('Error fetching churches:', error);
        return this.getDemoChurches();
      }
    }

    async searchChurches(term) {
      if (!term) return this.fetchChurches();
      if (!this.db) {
        return this.getDemoChurches().filter(c =>
          c.name.toLowerCase().includes(term.toLowerCase()) ||
          (c.address?.city || '').toLowerCase().includes(term.toLowerCase())
        );
      }

      try {
        const snapshot = await this.db.collection('churches').limit(100).get();
        const lowerTerm = term.toLowerCase();

        this.churches = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(church =>
            (church.name || '').toLowerCase().includes(lowerTerm) ||
            (church.address?.city || '').toLowerCase().includes(lowerTerm) ||
            (church.denomination || '').toLowerCase().includes(lowerTerm) ||
            (church.pastor || '').toLowerCase().includes(lowerTerm)
          );

        return this.churches;
      } catch (error) {
        console.error('Search error:', error);
        return [];
      }
    }

    async getChurchById(churchId) {
      if (!churchId) return null;
      if (!this.db) return this.getDemoChurches().find(c => c.id === churchId);

      try {
        const doc = await this.db.collection('churches').doc(churchId).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
      } catch (error) {
        console.error('Error getting church:', error);
        return null;
      }
    }

    // =========================================================================
    // EVENTS
    // =========================================================================

    async fetchEvents(options = {}) {
      if (!this.db) return this.getDemoEvents();

      try {
        let query = this.db.collection('church_events').where('isPublic', '==', true);

        if (options.churchId) {
          query = query.where('churchId', '==', options.churchId);
        }

        if (options.category && options.category !== 'all') {
          query = query.where('category', '==', options.category);
        }

        query = query.orderBy('date', 'asc').limit(options.limit || 30);

        const snapshot = await query.get();
        this.events = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate ? doc.data().date.toDate() : doc.data().date
        }));

        return this.events;
      } catch (error) {
        console.error('Error fetching events:', error);
        return this.getDemoEvents();
      }
    }

    async getEventsByChurch(churchId, limit = 10) {
      return this.fetchEvents({ churchId, limit });
    }

    // =========================================================================
    // BULLETINS
    // =========================================================================

    async fetchBulletins(options = {}) {
      if (!this.db) return this.getDemoBulletins();

      try {
        let query = this.db.collection('church_bulletins');

        if (options.churchId) {
          query = query.where('churchId', '==', options.churchId);
        }

        query = query.orderBy('weekOf', 'desc').limit(options.limit || 20);

        const snapshot = await query.get();
        this.bulletins = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          weekOf: doc.data().weekOf?.toDate ? doc.data().weekOf.toDate() : doc.data().weekOf
        }));

        return this.bulletins;
      } catch (error) {
        console.error('Error fetching bulletins:', error);
        return this.getDemoBulletins();
      }
    }

    async getLatestBulletin(churchId) {
      const bulletins = await this.fetchBulletins({ churchId, limit: 1 });
      return bulletins[0] || null;
    }

    // =========================================================================
    // USER ACTIONS
    // =========================================================================

    async saveChurch(churchId) {
      if (!this.db || typeof firebase === 'undefined') return false;
      const user = firebase.auth().currentUser;
      if (!user) return false;

      try {
        await this.db.collection('user_churches').doc(user.uid).set({
          savedChurches: firebase.firestore.FieldValue.arrayUnion(churchId),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        return true;
      } catch (error) {
        console.error('Error saving church:', error);
        return false;
      }
    }

    async getSavedChurches() {
      if (!this.db || typeof firebase === 'undefined') return [];
      const user = firebase.auth().currentUser;
      if (!user) return [];

      try {
        const doc = await this.db.collection('user_churches').doc(user.uid).get();
        if (!doc.exists) return [];

        const savedIds = doc.data().savedChurches || [];
        const churches = await Promise.all(savedIds.map(id => this.getChurchById(id)));
        return churches.filter(c => c !== null);
      } catch (error) {
        console.error('Error getting saved churches:', error);
        return [];
      }
    }

    async setHomeChurch(churchId) {
      if (!this.db || typeof firebase === 'undefined') return false;
      const user = firebase.auth().currentUser;
      if (!user) return false;

      try {
        await this.db.collection('user_churches').doc(user.uid).set({
          homeChurch: churchId,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        localStorage.setItem('birdturds_home_church', churchId);
        return true;
      } catch (error) {
        console.error('Error setting home church:', error);
        return false;
      }
    }

    // =========================================================================
    // ADMIN: ADD CHURCH
    // =========================================================================

    async addChurch(churchData) {
      if (!this.db) return null;

      try {
        const docRef = await this.db.collection('churches').add({
          ...churchData,
          verified: false,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return docRef.id;
      } catch (error) {
        console.error('Error adding church:', error);
        return null;
      }
    }

    // =========================================================================
    // HELPERS
    // =========================================================================

    calcDistance(lat1, lon1, lat2, lon2) {
      if (!lat1 || !lon1 || !lat2 || !lon2) return null;
      const R = 3959;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;
      return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10;
    }

    formatServiceTimes(services) {
      if (!services || !services.length) return 'Contact for times';
      return services.map(s => `${s.day} ${s.time}`).join(', ');
    }

    // =========================================================================
    // DEMO DATA
    // =========================================================================

    getDemoChurches() {
      return [
        {
          id: 'demo_1',
          name: 'Grace Community Church',
          denomination: 'Non-denominational',
          address: { street: '456 Faith Ave', city: 'Nashville', state: 'TN', zip: '37201' },
          location: { lat: 36.1627, lng: -86.7816 },
          contact: { phone: '615-555-2345', email: 'info@gracecommunity.org', website: 'https://gracecommunity.org' },
          pastor: 'Pastor Michael Johnson',
          services: [
            { day: 'Sunday', time: '9:00 AM', type: 'Early Service' },
            { day: 'Sunday', time: '11:00 AM', type: 'Main Service' }
          ],
          description: 'A welcoming community focused on authentic worship.',
          tags: ['family-friendly', 'youth-group', 'live-streaming'],
          verified: true
        },
        {
          id: 'demo_2',
          name: 'First Baptist Church',
          denomination: 'Baptist',
          address: { street: '789 Gospel Road', city: 'Nashville', state: 'TN', zip: '37203' },
          location: { lat: 36.158, lng: -86.79 },
          contact: { phone: '615-555-3456', website: 'https://firstbaptist.org' },
          pastor: 'Pastor David Williams',
          services: [
            { day: 'Sunday', time: '10:30 AM', type: 'Worship' },
            { day: 'Wednesday', time: '7:00 PM', type: 'Bible Study' }
          ],
          description: 'Serving our community for over 100 years.',
          tags: ['choir', 'missions', 'senior-ministry'],
          verified: true
        },
        {
          id: 'demo_3',
          name: 'New Life Assembly',
          denomination: 'Assembly of God',
          address: { street: '321 Spirit Way', city: 'Nashville', state: 'TN', zip: '37205' },
          location: { lat: 36.15, lng: -86.81 },
          contact: { phone: '615-555-4567' },
          pastor: 'Pastor Sarah Thompson',
          services: [
            { day: 'Sunday', time: '10:00 AM', type: 'Worship' }
          ],
          description: 'Experience the Holy Spirit in vibrant worship.',
          tags: ['spirit-filled', 'youth-group'],
          verified: true
        }
      ];
    }

    getDemoEvents() {
      const today = new Date();
      return [
        {
          id: 'event_1',
          churchId: 'demo_1',
          churchName: 'Grace Community Church',
          title: 'Easter Celebration',
          description: 'Join us for Easter!',
          date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
          time: '10:00 AM',
          location: 'Main Sanctuary',
          category: 'worship',
          isFree: true,
          isPublic: true
        },
        {
          id: 'event_2',
          churchId: 'demo_2',
          churchName: 'First Baptist Church',
          title: 'Food Drive',
          description: 'Help families in need.',
          date: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000),
          time: '9:00 AM',
          location: 'Fellowship Hall',
          category: 'outreach',
          isFree: true,
          isPublic: true
        }
      ];
    }

    getDemoBulletins() {
      const lastSunday = new Date();
      lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());

      return [
        {
          id: 'bulletin_1',
          churchId: 'demo_1',
          churchName: 'Grace Community Church',
          weekOf: lastSunday,
          title: `Weekly Bulletin - ${lastSunday.toLocaleDateString()}`,
          content: {
            welcomeMessage: 'Welcome to Grace Community Church!',
            announcements: ['Easter service times announced', 'Small groups resume'],
            prayerRequests: ['The Johnson family', 'Our missionaries']
          }
        }
      ];
    }
  }

  // =============================================================================
  // CREATE GLOBAL INSTANCE
  // =============================================================================

  const churchDirectory = new ChurchDirectory();

  window.churchDirectory = churchDirectory;
  window.ChurchDirectory = ChurchDirectory;

  console.log('⛪ Church Directory loaded - "For where two or three gather..."');

})();
