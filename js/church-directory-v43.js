/**
 * BirdTurds Church Directory v43 - Complete System
 * Auto-populating, real-time church finder with events and bulletins
 * 
 * Categories:
 * - Calvary Chapel
 * - Baptist
 * - Non-denominational
 * - Pentecostal/Charismatic
 * - Presbyterian
 * - Lutheran
 * - Methodist
 * - Catholic
 * - Orthodox
 * - Other
 * 
 * "For where two or three gather in my name, there am I with them." - Matthew 18:20
 */

(function() {
  'use strict';

  // =============================================================================
  // COMPREHENSIVE CHURCH DATABASE
  // =============================================================================

  const SEED_CHURCHES = [
    // ========== CALVARY CHAPEL ==========
    {
      id: 'calvary_chino',
      name: 'Calvary Chapel Chino Hills',
      denomination: 'Calvary Chapel',
      pastor: 'Pastor Jack Hibbs',
      address: { street: '14524 Peyton Dr', city: 'Chino Hills', state: 'CA', zip: '91709' },
      location: { lat: 33.9906, lng: -117.7327 },
      contact: { phone: '909-597-1700', website: 'https://reallife.org', email: 'info@reallife.org' },
      services: [
        { day: 'Sunday', time: '8:00 AM', type: 'Early Service' },
        { day: 'Sunday', time: '10:00 AM', type: 'Main Service' },
        { day: 'Wednesday', time: '7:00 PM', type: 'Midweek Study' }
      ],
      description: 'Home of Real Life with Jack Hibbs. Solid Bible teaching, prophecy updates, and community outreach.',
      tags: ['bible-teaching', 'prophecy', 'live-streaming', 'youth-group', 'missions'],
      featured: true,
      verified: true,
      rating: 4.9
    },
    {
      id: 'calvary_costa_mesa',
      name: 'Calvary Chapel Costa Mesa',
      denomination: 'Calvary Chapel',
      pastor: 'Pastor Brian Brodersen',
      address: { street: '3800 S Fairview St', city: 'Santa Ana', state: 'CA', zip: '92704' },
      location: { lat: 33.7016, lng: -117.9039 },
      contact: { phone: '714-979-4422', website: 'https://calvarychapel.com' },
      services: [
        { day: 'Sunday', time: '8:30 AM', type: 'Worship' },
        { day: 'Sunday', time: '10:30 AM', type: 'Main Service' }
      ],
      description: 'The original Calvary Chapel. Where the Jesus Movement began.',
      tags: ['bible-teaching', 'historic', 'missions', 'college-ministry'],
      verified: true,
      rating: 4.8
    },
    {
      id: 'calvary_fort_lauderdale',
      name: 'Calvary Chapel Fort Lauderdale',
      denomination: 'Calvary Chapel',
      pastor: 'Pastor Bob Coy / Doug Sauder',
      address: { street: '2401 W Cypress Creek Rd', city: 'Fort Lauderdale', state: 'FL', zip: '33309' },
      location: { lat: 26.1905, lng: -80.1637 },
      contact: { website: 'https://calvaryftl.org' },
      services: [
        { day: 'Sunday', time: '9:00 AM', type: 'Service' },
        { day: 'Sunday', time: '11:00 AM', type: 'Service' }
      ],
      description: 'One of the largest Calvary Chapels on the East Coast.',
      tags: ['bible-teaching', 'large-church', 'youth-group'],
      verified: true,
      rating: 4.7
    },

    // ========== BAPTIST ==========
    {
      id: 'shadow_mountain',
      name: 'Shadow Mountain Community Church',
      denomination: 'Baptist',
      pastor: 'Dr. David Jeremiah',
      address: { street: '2100 Greenfield Dr', city: 'El Cajon', state: 'CA', zip: '92019' },
      location: { lat: 32.8095, lng: -116.9625 },
      contact: { phone: '619-440-1802', website: 'https://shadowmountain.org' },
      services: [
        { day: 'Sunday', time: '9:00 AM', type: 'First Service' },
        { day: 'Sunday', time: '11:00 AM', type: 'Second Service' }
      ],
      description: 'Home of Turning Point Ministries with Dr. David Jeremiah. Biblical teaching for today.',
      tags: ['bible-teaching', 'radio-ministry', 'live-streaming', 'bookstore'],
      featured: true,
      verified: true,
      rating: 4.9
    },
    {
      id: 'first_baptist_dallas',
      name: 'First Baptist Dallas',
      denomination: 'Baptist',
      pastor: 'Dr. Robert Jeffress',
      address: { street: '1707 San Jacinto St', city: 'Dallas', state: 'TX', zip: '75201' },
      location: { lat: 32.7837, lng: -96.7969 },
      contact: { phone: '214-969-0111', website: 'https://firstdallas.org' },
      services: [
        { day: 'Sunday', time: '9:30 AM', type: 'Worship' },
        { day: 'Sunday', time: '11:00 AM', type: 'Worship' }
      ],
      description: 'Historic downtown Dallas church with strong conservative values.',
      tags: ['historic', 'bible-teaching', 'choir', 'downtown'],
      verified: true,
      rating: 4.7
    },
    {
      id: 'bellevue_baptist',
      name: 'Bellevue Baptist Church',
      denomination: 'Baptist',
      pastor: 'Pastor Steve Gaines',
      address: { street: '2000 Appling Rd', city: 'Memphis', state: 'TN', zip: '38016' },
      location: { lat: 35.1815, lng: -89.7925 },
      contact: { website: 'https://bellevue.org' },
      services: [
        { day: 'Sunday', time: '9:30 AM', type: 'Worship' },
        { day: 'Sunday', time: '11:00 AM', type: 'Worship' }
      ],
      description: 'One of the largest SBC churches. Known for powerful worship.',
      tags: ['large-church', 'choir', 'missions'],
      verified: true,
      rating: 4.6
    },

    // ========== NON-DENOMINATIONAL ==========
    {
      id: 'mclean_bible',
      name: 'McLean Bible Church',
      denomination: 'Non-denominational',
      pastor: 'Pastor David Platt',
      address: { street: '8925 Leesburg Pike', city: 'Vienna', state: 'VA', zip: '22182' },
      location: { lat: 38.9184, lng: -77.2306 },
      contact: { phone: '703-639-2000', website: 'https://mcleanbible.org' },
      services: [
        { day: 'Sunday', time: '9:00 AM', type: 'Worship' },
        { day: 'Sunday', time: '11:00 AM', type: 'Worship' }
      ],
      description: 'Multi-campus church in the DC area focused on radical devotion to Christ.',
      tags: ['bible-teaching', 'missions', 'multi-campus', 'college-ministry'],
      featured: true,
      verified: true,
      rating: 4.8
    },
    {
      id: 'north_point',
      name: 'North Point Community Church',
      denomination: 'Non-denominational',
      pastor: 'Andy Stanley',
      address: { street: '4350 North Point Pkwy', city: 'Alpharetta', state: 'GA', zip: '30022' },
      location: { lat: 34.0569, lng: -84.2754 },
      contact: { website: 'https://northpoint.org' },
      services: [
        { day: 'Sunday', time: '9:00 AM', type: 'Service' },
        { day: 'Sunday', time: '11:00 AM', type: 'Service' }
      ],
      description: 'Innovative, seeker-friendly church with strong small group ministry.',
      tags: ['seeker-friendly', 'small-groups', 'large-church', 'youth-group'],
      verified: true,
      rating: 4.5
    },
    {
      id: 'grace_community',
      name: 'Grace Community Church',
      denomination: 'Non-denominational',
      pastor: 'John MacArthur',
      address: { street: '13248 Roscoe Blvd', city: 'Sun Valley', state: 'CA', zip: '91352' },
      location: { lat: 34.2289, lng: -118.4102 },
      contact: { phone: '818-909-5500', website: 'https://gracechurch.org' },
      services: [
        { day: 'Sunday', time: '8:30 AM', type: 'First Service' },
        { day: 'Sunday', time: '10:30 AM', type: 'Second Service' }
      ],
      description: 'Home of Grace to You ministry. Expository preaching of Scripture.',
      tags: ['bible-teaching', 'expository', 'masters-seminary', 'radio-ministry'],
      featured: true,
      verified: true,
      rating: 4.9
    },

    // ========== PENTECOSTAL/CHARISMATIC ==========
    {
      id: 'bethel_redding',
      name: 'Bethel Church',
      denomination: 'Pentecostal',
      pastor: 'Bill Johnson',
      address: { street: '933 College View Dr', city: 'Redding', state: 'CA', zip: '96003' },
      location: { lat: 40.5691, lng: -122.3857 },
      contact: { website: 'https://bethel.com' },
      services: [
        { day: 'Sunday', time: '9:00 AM', type: 'Worship' },
        { day: 'Sunday', time: '11:00 AM', type: 'Worship' }
      ],
      description: 'Spirit-filled church known for worship music and supernatural ministry.',
      tags: ['spirit-filled', 'worship-music', 'healing', 'school-of-ministry'],
      verified: true,
      rating: 4.6
    },
    {
      id: 'lakewood_church',
      name: 'Lakewood Church',
      denomination: 'Non-denominational/Charismatic',
      pastor: 'Joel Osteen',
      address: { street: '3700 Southwest Fwy', city: 'Houston', state: 'TX', zip: '77027' },
      location: { lat: 29.7275, lng: -95.4557 },
      contact: { website: 'https://lakewoodchurch.com' },
      services: [
        { day: 'Sunday', time: '8:30 AM', type: 'English Service' },
        { day: 'Sunday', time: '11:00 AM', type: 'English Service' },
        { day: 'Sunday', time: '1:30 PM', type: 'Spanish Service' }
      ],
      description: 'Largest church in America. Encouraging messages of hope.',
      tags: ['large-church', 'live-streaming', 'spanish-service', 'inspirational'],
      verified: true,
      rating: 4.4
    },

    // ========== PRESBYTERIAN ==========
    {
      id: 'redeemer_nyc',
      name: 'Redeemer Presbyterian Church',
      denomination: 'Presbyterian',
      pastor: 'Various pastors (founded by Tim Keller)',
      address: { street: '150 W 83rd St', city: 'New York', state: 'NY', zip: '10024' },
      location: { lat: 40.7857, lng: -73.9753 },
      contact: { website: 'https://redeemer.com' },
      services: [
        { day: 'Sunday', time: '10:00 AM', type: 'West Side' },
        { day: 'Sunday', time: '5:00 PM', type: 'Downtown' }
      ],
      description: 'Gospel-centered church in Manhattan. Legacy of Tim Keller.',
      tags: ['urban-ministry', 'gospel-centered', 'multi-site', 'intellectual'],
      verified: true,
      rating: 4.8
    },

    // ========== LUTHERAN ==========
    {
      id: 'st_peter_lutheran',
      name: 'St. Peter Lutheran Church',
      denomination: 'Lutheran',
      pastor: 'Various',
      address: { street: '1225 N Campbell St', city: 'Arlington', state: 'VA', zip: '22205' },
      location: { lat: 38.8856, lng: -77.1139 },
      contact: { website: 'https://stpeterarlington.org' },
      services: [
        { day: 'Sunday', time: '8:00 AM', type: 'Traditional' },
        { day: 'Sunday', time: '10:30 AM', type: 'Contemporary' }
      ],
      description: 'Traditional Lutheran worship with contemporary outreach.',
      tags: ['traditional', 'liturgical', 'family-friendly'],
      verified: true,
      rating: 4.5
    },

    // ========== METHODIST ==========
    {
      id: 'first_methodist_houston',
      name: 'First United Methodist Church Houston',
      denomination: 'Methodist',
      pastor: 'Various',
      address: { street: '1320 Main St', city: 'Houston', state: 'TX', zip: '77002' },
      location: { lat: 29.7528, lng: -95.3617 },
      contact: { website: 'https://fumchouston.org' },
      services: [
        { day: 'Sunday', time: '8:30 AM', type: 'Traditional' },
        { day: 'Sunday', time: '11:00 AM', type: 'Traditional' }
      ],
      description: 'Historic downtown Houston church with strong community programs.',
      tags: ['historic', 'traditional', 'downtown', 'community-outreach'],
      verified: true,
      rating: 4.5
    },

    // ========== MORE CHURCHES ==========
    {
      id: 'the_village_church',
      name: 'The Village Church',
      denomination: 'Baptist',
      pastor: 'Matt Chandler',
      address: { street: '1501 S Main St', city: 'Flower Mound', state: 'TX', zip: '75028' },
      location: { lat: 33.0146, lng: -97.0969 },
      contact: { website: 'https://thevillagechurch.net' },
      services: [
        { day: 'Sunday', time: '9:00 AM', type: 'Worship' },
        { day: 'Sunday', time: '11:00 AM', type: 'Worship' }
      ],
      description: 'Gospel-centered preaching and community. Part of Acts 29 network.',
      tags: ['gospel-centered', 'multi-campus', 'reformed', 'young-adults'],
      verified: true,
      rating: 4.7
    },
    {
      id: 'saddleback',
      name: 'Saddleback Church',
      denomination: 'Baptist',
      pastor: 'Andy Wood',
      address: { street: '1 Saddleback Pkwy', city: 'Lake Forest', state: 'CA', zip: '92630' },
      location: { lat: 33.6400, lng: -117.6897 },
      contact: { website: 'https://saddleback.com' },
      services: [
        { day: 'Saturday', time: '5:00 PM', type: 'Weekend Service' },
        { day: 'Sunday', time: '9:00 AM', type: 'Worship' },
        { day: 'Sunday', time: '11:00 AM', type: 'Worship' }
      ],
      description: 'Purpose Driven church. One of America\'s largest congregations.',
      tags: ['purpose-driven', 'large-church', 'multi-campus', 'small-groups'],
      verified: true,
      rating: 4.5
    },
    {
      id: 'elevation_church',
      name: 'Elevation Church',
      denomination: 'Baptist',
      pastor: 'Steven Furtick',
      address: { street: '11416 E Independence Blvd', city: 'Matthews', state: 'NC', zip: '28105' },
      location: { lat: 35.1202, lng: -80.6923 },
      contact: { website: 'https://elevationchurch.org' },
      services: [
        { day: 'Sunday', time: '9:30 AM', type: 'Worship' },
        { day: 'Sunday', time: '11:30 AM', type: 'Worship' }
      ],
      description: 'Known for powerful worship music and dynamic preaching.',
      tags: ['worship-music', 'young-adults', 'multi-campus', 'contemporary'],
      verified: true,
      rating: 4.6
    },
    {
      id: 'life_church',
      name: 'Life.Church',
      denomination: 'Non-denominational',
      pastor: 'Craig Groeschel',
      address: { street: '4600 E 2nd St', city: 'Edmond', state: 'OK', zip: '73034' },
      location: { lat: 35.6600, lng: -97.4400 },
      contact: { website: 'https://life.church' },
      services: [
        { day: 'Sunday', time: '9:30 AM', type: 'Worship' },
        { day: 'Sunday', time: '11:30 AM', type: 'Worship' }
      ],
      description: 'Creators of YouVersion Bible App. Innovative multi-site church.',
      tags: ['innovative', 'technology', 'youversion', 'multi-campus', 'free-resources'],
      verified: true,
      rating: 4.7
    },
    {
      id: 'transformation_church',
      name: 'Transformation Church',
      denomination: 'Non-denominational',
      pastor: 'Michael Todd',
      address: { street: '1800 S Garnett Rd', city: 'Tulsa', state: 'OK', zip: '74128' },
      location: { lat: 36.1301, lng: -95.8558 },
      contact: { website: 'https://transformchurch.us' },
      services: [
        { day: 'Sunday', time: '9:00 AM', type: 'Experience' },
        { day: 'Sunday', time: '11:00 AM', type: 'Experience' }
      ],
      description: 'Representing God to the lost and found for transformation.',
      tags: ['young-adults', 'diverse', 'live-streaming', 'dynamic'],
      verified: true,
      rating: 4.8
    }
  ];

  // =============================================================================
  // CHURCH DIRECTORY MANAGER
  // =============================================================================

  class ChurchDirectoryManager {
    constructor() {
      this.db = null;
      this.churches = [];
      this.events = [];
      this.bulletins = [];
      this.categories = [
        'Calvary Chapel',
        'Baptist', 
        'Non-denominational',
        'Pentecostal',
        'Presbyterian',
        'Lutheran',
        'Methodist',
        'Catholic',
        'Orthodox',
        'Other'
      ];
      this.unsubscribes = [];
      this.userLocation = null;
      
      this.init();
    }

    async init() {
      if (typeof firebase !== 'undefined' && firebase.firestore) {
        this.db = firebase.firestore();
        console.log('⛪ Church Directory v43 connected to Firestore');
        
        // Check if we need to seed data
        await this.checkAndSeedData();
        
        // Start real-time listeners
        this.startRealtimeListeners();
        
        // Get user location
        this.requestLocation();
      } else {
        console.log('⛪ Church Directory using local data (Firestore not available)');
        this.churches = SEED_CHURCHES;
      }
    }

    requestLocation() {
      if (!navigator.geolocation) return;
      
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          console.log('📍 Location obtained for church finder');
          // Recalculate distances
          this.sortByDistance();
        },
        (err) => console.log('Location unavailable:', err.message),
        { timeout: 10000 }
      );
    }

    // =========================================================================
    // SEEDING DATA
    // =========================================================================

    async checkAndSeedData() {
      if (!this.db) return;

      try {
        const snapshot = await this.db.collection('churches').limit(1).get();
        
        if (snapshot.empty) {
          console.log('⛪ Seeding church database...');
          await this.seedChurches();
          await this.seedEvents();
        } else {
          console.log('⛪ Churches already in database');
        }
      } catch (error) {
        console.error('Error checking/seeding data:', error);
      }
    }

    async seedChurches() {
      if (!this.db) return;

      const batch = this.db.batch();
      
      for (const church of SEED_CHURCHES) {
        const ref = this.db.collection('churches').doc(church.id);
        batch.set(ref, {
          ...church,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }

      await batch.commit();
      console.log(`⛪ Seeded ${SEED_CHURCHES.length} churches`);
    }

    async seedEvents() {
      if (!this.db) return;

      const now = new Date();
      const events = [
        {
          churchId: 'calvary_chino',
          churchName: 'Calvary Chapel Chino Hills',
          title: 'Prophecy Update',
          description: 'Weekly prophecy update with Pastor Jack Hibbs',
          date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
          time: '7:00 PM',
          category: 'bible-study',
          isPublic: true,
          recurring: 'weekly'
        },
        {
          churchId: 'shadow_mountain',
          churchName: 'Shadow Mountain Community Church',
          title: 'Turning Point Conference',
          description: 'Annual conference with Dr. David Jeremiah',
          date: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
          time: '6:00 PM',
          category: 'conference',
          isPublic: true
        },
        {
          churchId: 'grace_community',
          churchName: 'Grace Community Church',
          title: 'Shepherds Conference',
          description: 'Annual pastors conference',
          date: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
          time: '8:00 AM',
          category: 'conference',
          isPublic: true
        },
        {
          churchId: 'mclean_bible',
          churchName: 'McLean Bible Church',
          title: 'Missions Sunday',
          description: 'Hear from missionaries serving around the world',
          date: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
          time: '9:00 AM',
          category: 'missions',
          isPublic: true
        }
      ];

      for (const event of events) {
        await this.db.collection('church_events').add({
          ...event,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }

      console.log(`⛪ Seeded ${events.length} events`);
    }

    // =========================================================================
    // REAL-TIME LISTENERS (Auto-populate)
    // =========================================================================

    startRealtimeListeners() {
      if (!this.db) return;

      // Listen to churches collection
      const churchUnsubscribe = this.db.collection('churches')
        .onSnapshot((snapshot) => {
          this.churches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          this.sortByDistance();
          this.notifyUpdate('churches');
          console.log(`⛪ Churches updated: ${this.churches.length}`);
        }, (error) => {
          console.error('Church listener error:', error);
        });

      this.unsubscribes.push(churchUnsubscribe);

      // Listen to events collection
      const eventsUnsubscribe = this.db.collection('church_events')
        .where('isPublic', '==', true)
        .orderBy('date', 'asc')
        .onSnapshot((snapshot) => {
          this.events = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            date: doc.data().date?.toDate ? doc.data().date.toDate() : new Date(doc.data().date)
          }));
          this.notifyUpdate('events');
          console.log(`⛪ Events updated: ${this.events.length}`);
        }, (error) => {
          console.error('Events listener error:', error);
        });

      this.unsubscribes.push(eventsUnsubscribe);

      // Listen to bulletins collection
      const bulletinsUnsubscribe = this.db.collection('church_bulletins')
        .orderBy('weekOf', 'desc')
        .limit(20)
        .onSnapshot((snapshot) => {
          this.bulletins = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            weekOf: doc.data().weekOf?.toDate ? doc.data().weekOf.toDate() : new Date(doc.data().weekOf)
          }));
          this.notifyUpdate('bulletins');
          console.log(`⛪ Bulletins updated: ${this.bulletins.length}`);
        }, (error) => {
          console.error('Bulletins listener error:', error);
        });

      this.unsubscribes.push(bulletinsUnsubscribe);
    }

    stopListeners() {
      this.unsubscribes.forEach(unsub => unsub());
      this.unsubscribes = [];
    }

    notifyUpdate(type) {
      // Dispatch custom event for UI to listen
      window.dispatchEvent(new CustomEvent('churchDirectoryUpdate', { 
        detail: { type, data: this[type] } 
      }));
    }

    // =========================================================================
    // QUERIES
    // =========================================================================

    getChurches(options = {}) {
      let results = [...this.churches];

      // Filter by denomination
      if (options.denomination && options.denomination !== 'all') {
        results = results.filter(c => 
          c.denomination?.toLowerCase().includes(options.denomination.toLowerCase())
        );
      }

      // Filter by tags
      if (options.tag) {
        results = results.filter(c => c.tags?.includes(options.tag));
      }

      // Filter by state
      if (options.state) {
        results = results.filter(c => c.address?.state === options.state);
      }

      // Search query
      if (options.search) {
        const term = options.search.toLowerCase();
        results = results.filter(c => 
          c.name?.toLowerCase().includes(term) ||
          c.pastor?.toLowerCase().includes(term) ||
          c.address?.city?.toLowerCase().includes(term) ||
          c.denomination?.toLowerCase().includes(term)
        );
      }

      // Featured first
      if (options.featuredFirst) {
        results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      }

      // Limit
      if (options.limit) {
        results = results.slice(0, options.limit);
      }

      return results;
    }

    getFeaturedChurches() {
      return this.churches.filter(c => c.featured);
    }

    getChurchesByDenomination(denomination) {
      return this.getChurches({ denomination });
    }

    getChurchById(id) {
      return this.churches.find(c => c.id === id);
    }

    getEvents(options = {}) {
      let results = [...this.events];

      // Filter out past events
      const now = new Date();
      results = results.filter(e => new Date(e.date) >= now);

      // Filter by category
      if (options.category && options.category !== 'all') {
        results = results.filter(e => e.category === options.category);
      }

      // Filter by church
      if (options.churchId) {
        results = results.filter(e => e.churchId === options.churchId);
      }

      // Limit
      if (options.limit) {
        results = results.slice(0, options.limit);
      }

      return results;
    }

    getUpcomingEvents(limit = 5) {
      return this.getEvents({ limit });
    }

    getBulletins(options = {}) {
      let results = [...this.bulletins];

      if (options.churchId) {
        results = results.filter(b => b.churchId === options.churchId);
      }

      if (options.limit) {
        results = results.slice(0, options.limit);
      }

      return results;
    }

    // =========================================================================
    // DISTANCE CALCULATION
    // =========================================================================

    sortByDistance() {
      if (!this.userLocation) return;

      this.churches = this.churches.map(church => ({
        ...church,
        distance: this.calculateDistance(
          this.userLocation.lat,
          this.userLocation.lng,
          church.location?.lat,
          church.location?.lng
        )
      })).sort((a, b) => (a.distance || 9999) - (b.distance || 9999));
    }

    calculateDistance(lat1, lng1, lat2, lng2) {
      if (!lat1 || !lng1 || !lat2 || !lng2) return null;

      const R = 3959; // Earth's radius in miles
      const dLat = this.toRad(lat2 - lat1);
      const dLng = this.toRad(lng2 - lng1);
      const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return Math.round(R * c * 10) / 10; // Round to 1 decimal
    }

    toRad(deg) {
      return deg * (Math.PI / 180);
    }

    // =========================================================================
    // ADMIN FUNCTIONS (for adding new churches)
    // =========================================================================

    async addChurch(churchData) {
      if (!this.db) {
        console.error('Firestore not available');
        return null;
      }

      try {
        const docRef = await this.db.collection('churches').add({
          ...churchData,
          verified: false, // Requires manual verification
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        console.log('⛪ Church submitted:', docRef.id);
        return docRef.id;
      } catch (error) {
        console.error('Error adding church:', error);
        return null;
      }
    }

    async addEvent(eventData) {
      if (!this.db) return null;

      try {
        const docRef = await this.db.collection('church_events').add({
          ...eventData,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        return docRef.id;
      } catch (error) {
        console.error('Error adding event:', error);
        return null;
      }
    }

    async addBulletin(bulletinData) {
      if (!this.db) return null;

      try {
        const docRef = await this.db.collection('church_bulletins').add({
          ...bulletinData,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        return docRef.id;
      } catch (error) {
        console.error('Error adding bulletin:', error);
        return null;
      }
    }
  }

  // =============================================================================
  // CREATE GLOBAL INSTANCE
  // =============================================================================

  const churchDirectoryManager = new ChurchDirectoryManager();
  
  window.churchDirectoryManager = churchDirectoryManager;
  window.ChurchDirectoryManager = ChurchDirectoryManager;
  window.CHURCH_CATEGORIES = churchDirectoryManager.categories;

  console.log('⛪ Church Directory v43 loaded - "For where two or three gather..."');

})();
