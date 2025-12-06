// Firebase Firestore Security Rules for Church Directory
// Copy these to your Firebase Console > Firestore > Rules

/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
             request.auth.uid in ['vMF6j5Pb6xVWy9QxyK8PJqq9awp1'];
    }
    
    // Churches Collection (approved churches)
    match /churches/{churchId} {
      // Anyone can read approved churches
      allow read: if resource.data.status == 'approved';
      
      // Only admins can write
      allow write: if isAdmin();
    }
    
    // Church Submissions (pending review)
    match /church_submissions/{submissionId} {
      // Anyone can create a submission
      allow create: if true;
      
      // Submitter can read their own
      allow read: if isAuthenticated() && 
                    resource.data.submittedBy == request.auth.uid;
      
      // Only admins can read all and update
      allow read, update, delete: if isAdmin();
    }
    
    // Events Collection (approved events)
    match /events/{eventId} {
      // Anyone can read approved events
      allow read: if resource.data.status == 'approved';
      
      // Authenticated users can mark interested
      allow update: if isAuthenticated() && 
                      request.resource.data.diff(resource.data).affectedKeys()
                        .hasOnly(['interestedCount', 'interestedUsers']);
      
      // Only admins can fully write
      allow write: if isAdmin();
    }
    
    // Event Submissions (pending review)
    match /event_submissions/{submissionId} {
      // Anyone can create
      allow create: if true;
      
      // Submitter can read their own
      allow read: if isAuthenticated() && 
                    resource.data.submittedBy == request.auth.uid;
      
      // Only admins can manage
      allow read, update, delete: if isAdmin();
    }
    
    // Existing rules for other collections...
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && request.auth.uid == userId;
    }
    
    match /leaderboard/{scoreId} {
      allow read: if true;
      allow create: if isAuthenticated();
    }
    
    match /moderation_queue/{docId} {
      allow create: if true;
      allow read, update, delete: if isAdmin();
    }
    
    match /approved_content/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
*/

// ============================================
// FIRESTORE DATABASE STRUCTURE
// ============================================

const FirestoreStructure = {
  
  // Churches Collection
  churches: {
    // Document ID: auto-generated
    exampleDoc: {
      // Basic Info
      name: 'Church Name',
      pastor: 'Pastor Name',
      denomination: 'Calvary Chapel', // From approved list
      
      // Location
      address: '123 Main St',
      city: 'City Name',
      state: 'State',
      country: 'United States',
      zipCode: '12345',
      latitude: 34.0522,
      longitude: -118.2437,
      geoHash: '3405_-11824', // For proximity queries
      
      // Contact
      phone: '(555) 123-4567',
      email: 'info@church.com',
      website: 'https://church.com',
      
      // Description
      description: 'Church description...',
      
      // Service Times
      serviceTimes: [
        { day: 'Sunday', time: '9:00 AM', type: 'Worship Service' },
        { day: 'Sunday', time: '11:00 AM', type: 'Worship Service' },
        { day: 'Wednesday', time: '7:00 PM', type: 'Midweek Study' }
      ],
      
      // Features
      hasYouthGroup: true,
      hasChildrensMinistry: true,
      hasLiveStream: true,
      hasPodcast: true,
      hasSmallGroups: true,
      hasMissionsProgram: true,
      
      // Social Media
      socialMedia: {
        facebook: 'https://facebook.com/...',
        instagram: 'https://instagram.com/...',
        youtube: 'https://youtube.com/...',
        twitter: 'https://twitter.com/...'
      },
      
      // Beliefs (must affirm all)
      beliefs: [
        'Bible is the inerrant Word of God',
        'Jesus Christ is Lord and Savior',
        'Salvation through faith in Christ alone',
        'Physical resurrection of Jesus',
        'Second coming of Christ',
        'Marriage is between one man and one woman',
        'Sanctity of human life from conception'
      ],
      
      // Status
      status: 'approved', // pending, approved, rejected
      approved: true,
      featured: false,
      verified: false,
      
      // Metrics
      views: 0,
      rating: 0,
      reviewCount: 0,
      
      // Timestamps
      createdAt: 'Firestore Timestamp',
      approvedAt: 'Firestore Timestamp',
      approvedBy: 'admin_uid',
      submittedBy: 'user_uid',
      lastUpdated: 'Firestore Timestamp'
    }
  },
  
  // Events Collection
  events: {
    exampleDoc: {
      // Basic Info
      title: 'Event Title',
      description: 'Event description...',
      type: 'conference', // conference, worship, revival, youth, mens, womens, etc.
      
      // Date/Time
      date: 'Firestore Timestamp',
      endDate: 'Firestore Timestamp', // Optional
      
      // Location
      location: 'Venue Name',
      address: '123 Main St',
      city: 'City',
      state: 'State',
      country: 'United States',
      isVirtual: false,
      
      // Links
      website: 'https://event.com',
      registrationUrl: 'https://event.com/register',
      
      // Details
      price: 'Free', // or '$25', '$50-100', etc.
      ageGroup: 'All ages', // or '18-25', 'Men 13+', etc.
      
      // Features
      hasLiveStream: true,
      hasChildcare: false,
      
      // Church Association (optional)
      churchId: 'church_doc_id', // If hosted by listed church
      churchName: 'Church Name',
      
      // Status
      status: 'approved',
      approved: true,
      featured: false,
      
      // Engagement
      attendeeCount: 0,
      interestedCount: 0,
      interestedUsers: ['user_uid_1', 'user_uid_2'],
      
      // Timestamps
      createdAt: 'Firestore Timestamp',
      approvedAt: 'Firestore Timestamp',
      submittedBy: 'user_uid'
    }
  },
  
  // Submissions (pending review)
  church_submissions: {
    // Same structure as churches, but status = 'pending'
  },
  
  event_submissions: {
    // Same structure as events, but status = 'pending'
  }
};

// ============================================
// FIRESTORE INDEXES
// ============================================

/*
Create these composite indexes in Firebase Console:

1. Churches by location:
   Collection: churches
   Fields: status (Asc), country (Asc), state (Asc), city (Asc)

2. Churches by denomination:
   Collection: churches
   Fields: status (Asc), denomination (Asc)

3. Churches nearby (latitude):
   Collection: churches
   Fields: status (Asc), latitude (Asc)

4. Featured churches:
   Collection: churches
   Fields: status (Asc), featured (Asc)

5. Events by date:
   Collection: events
   Fields: status (Asc), date (Asc)

6. Events by type:
   Collection: events
   Fields: status (Asc), type (Asc), date (Asc)

7. Featured events:
   Collection: events
   Fields: status (Asc), featured (Asc), date (Asc)

8. Church events:
   Collection: events
   Fields: churchId (Asc), status (Asc), date (Asc)

9. Pending submissions:
   Collection: church_submissions
   Fields: status (Asc), submittedAt (Asc)

10. Pending event submissions:
    Collection: event_submissions
    Fields: status (Asc), submittedAt (Asc)
*/

// Export for reference
if (typeof module !== 'undefined') {
  module.exports = { FirestoreStructure };
}

console.log('📋 Firebase structure documentation loaded');
