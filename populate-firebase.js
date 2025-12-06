/**
 * Firebase Population Script for BirdTurds
 * Run this ONCE from browser console while logged in as admin
 * 
 * Usage: 
 * 1. Open play.html in browser
 * 2. Login as admin
 * 3. Open console (F12)
 * 4. Copy and paste this entire script
 * 5. Run: populateAll()
 */

const SAMPLE_CHURCHES = [
  {
    name: "Calvary Chapel Costa Mesa",
    pastor: "Brian Brodersen",
    denomination: "Calvary Chapel",
    address: "3800 S. Fairview St",
    city: "Santa Ana",
    state: "California",
    country: "United States",
    zipCode: "92704",
    latitude: 33.6946,
    longitude: -117.9028,
    phone: "(714) 979-4422",
    website: "https://calvarychapel.com",
    description: "The original Calvary Chapel, started by Pastor Chuck Smith in 1965. A Bible-teaching church focused on verse-by-verse exposition.",
    serviceTimes: [
      { day: "Sunday", time: "8:00 AM", type: "Worship Service" },
      { day: "Sunday", time: "10:00 AM", type: "Worship Service" },
      { day: "Sunday", time: "12:00 PM", type: "Worship Service" },
      { day: "Wednesday", time: "7:00 PM", type: "Midweek Study" }
    ],
    hasYouthGroup: true,
    hasChildrensMinistry: true,
    hasLiveStream: true,
    hasPodcast: true,
    status: "approved",
    featured: true,
    verified: true
  },
  {
    name: "First Baptist Dallas",
    pastor: "Robert Jeffress",
    denomination: "Southern Baptist",
    address: "1707 San Jacinto St",
    city: "Dallas",
    state: "Texas",
    country: "United States",
    zipCode: "75201",
    latitude: 32.7876,
    longitude: -96.7985,
    phone: "(214) 969-0111",
    website: "https://firstdallas.org",
    description: "Historic Southern Baptist church in downtown Dallas, known for strong biblical preaching and patriotic services.",
    serviceTimes: [
      { day: "Sunday", time: "9:30 AM", type: "Sunday School" },
      { day: "Sunday", time: "11:00 AM", type: "Worship Service" },
      { day: "Sunday", time: "6:00 PM", type: "Evening Service" }
    ],
    hasYouthGroup: true,
    hasChildrensMinistry: true,
    hasLiveStream: true,
    status: "approved",
    featured: true
  },
  {
    name: "Prestonwood Baptist Church",
    pastor: "Jack Graham",
    denomination: "Southern Baptist",
    address: "6801 W Park Blvd",
    city: "Plano",
    state: "Texas",
    country: "United States",
    zipCode: "75093",
    latitude: 33.0366,
    longitude: -96.8364,
    phone: "(972) 820-5000",
    website: "https://prestonwood.org",
    description: "One of the largest churches in America with multiple campuses. Strong emphasis on evangelism and missions.",
    serviceTimes: [
      { day: "Saturday", time: "5:00 PM", type: "Worship Service" },
      { day: "Sunday", time: "9:15 AM", type: "Worship Service" },
      { day: "Sunday", time: "11:00 AM", type: "Worship Service" }
    ],
    hasYouthGroup: true,
    hasChildrensMinistry: true,
    hasLiveStream: true,
    hasPodcast: true,
    status: "approved",
    featured: false
  },
  {
    name: "Harvest Christian Fellowship",
    pastor: "Greg Laurie",
    denomination: "Non-Denominational",
    address: "6115 Arlington Ave",
    city: "Riverside",
    state: "California",
    country: "United States",
    zipCode: "92504",
    latitude: 33.9533,
    longitude: -117.4175,
    phone: "(951) 687-6902",
    website: "https://harvest.org",
    description: "One of the largest churches in America, known for Harvest Crusades and evangelistic outreach.",
    serviceTimes: [
      { day: "Saturday", time: "7:00 PM", type: "Worship Service" },
      { day: "Sunday", time: "7:30 AM", type: "Worship Service" },
      { day: "Sunday", time: "9:30 AM", type: "Worship Service" },
      { day: "Sunday", time: "11:30 AM", type: "Worship Service" }
    ],
    hasYouthGroup: true,
    hasChildrensMinistry: true,
    hasLiveStream: true,
    hasPodcast: true,
    status: "approved",
    featured: true
  },
  {
    name: "McLean Bible Church",
    pastor: "David Platt",
    denomination: "Non-Denominational",
    address: "8925 Leesburg Pike",
    city: "Vienna",
    state: "Virginia",
    country: "United States",
    zipCode: "22182",
    latitude: 38.9167,
    longitude: -77.2295,
    phone: "(703) 639-2000",
    website: "https://mcleanbible.org",
    description: "Bible-centered church in the DC metro area with a strong emphasis on missions and Scripture.",
    serviceTimes: [
      { day: "Sunday", time: "9:00 AM", type: "Worship Service" },
      { day: "Sunday", time: "11:00 AM", type: "Worship Service" }
    ],
    hasYouthGroup: true,
    hasChildrensMinistry: true,
    hasLiveStream: true,
    status: "approved"
  },
  {
    name: "The Village Church",
    pastor: "Matt Chandler",
    denomination: "Acts 29",
    address: "1501 W Royal Ln",
    city: "Flower Mound",
    state: "Texas",
    country: "United States",
    zipCode: "75028",
    latitude: 33.0317,
    longitude: -97.0789,
    phone: "(972) 899-4455",
    website: "https://thevillagechurch.net",
    description: "Gospel-centered church known for expository preaching and intentional community.",
    serviceTimes: [
      { day: "Sunday", time: "9:00 AM", type: "Worship Service" },
      { day: "Sunday", time: "11:00 AM", type: "Worship Service" }
    ],
    hasYouthGroup: true,
    hasChildrensMinistry: true,
    hasLiveStream: true,
    hasPodcast: true,
    status: "approved"
  },
  {
    name: "Saddleback Church",
    pastor: "Andy Wood",
    denomination: "Southern Baptist",
    address: "1 Saddleback Pkwy",
    city: "Lake Forest",
    state: "California",
    country: "United States",
    zipCode: "92630",
    latitude: 33.6412,
    longitude: -117.6854,
    phone: "(949) 609-8000",
    website: "https://saddleback.com",
    description: "Founded by Rick Warren. Known for Purpose-Driven ministry and global church planting.",
    serviceTimes: [
      { day: "Saturday", time: "4:30 PM", type: "Worship Service" },
      { day: "Saturday", time: "6:30 PM", type: "Worship Service" },
      { day: "Sunday", time: "9:00 AM", type: "Worship Service" },
      { day: "Sunday", time: "11:15 AM", type: "Worship Service" }
    ],
    hasYouthGroup: true,
    hasChildrensMinistry: true,
    hasLiveStream: true,
    hasPodcast: true,
    status: "approved",
    featured: true
  },
  {
    name: "Grace Community Church",
    pastor: "John MacArthur",
    denomination: "Non-Denominational",
    address: "13248 Roscoe Blvd",
    city: "Sun Valley",
    state: "California",
    country: "United States",
    zipCode: "91352",
    latitude: 34.2217,
    longitude: -118.4078,
    phone: "(818) 909-5500",
    website: "https://gracechurch.org",
    description: "Home church of John MacArthur, known for verse-by-verse expository preaching and Grace To You ministry.",
    serviceTimes: [
      { day: "Sunday", time: "8:30 AM", type: "Worship Service" },
      { day: "Sunday", time: "10:30 AM", type: "Worship Service" },
      { day: "Sunday", time: "6:00 PM", type: "Evening Service" },
      { day: "Wednesday", time: "7:00 PM", type: "Midweek Study" }
    ],
    hasYouthGroup: true,
    hasChildrensMinistry: true,
    hasLiveStream: true,
    hasPodcast: true,
    status: "approved",
    featured: true
  }
];

const SAMPLE_EVENTS = [
  {
    title: "Harvest Crusade 2025",
    description: "Annual evangelistic event with Greg Laurie. Music, testimony, and powerful gospel message. Free admission!",
    type: "crusade",
    date: new Date("2025-08-15T19:00:00"),
    endDate: new Date("2025-08-17T21:00:00"),
    location: "Angel Stadium of Anaheim",
    address: "2000 E Gene Autry Way",
    city: "Anaheim",
    state: "California",
    country: "United States",
    website: "https://harvest.org/crusades",
    registrationUrl: "https://harvest.org/crusades/register",
    price: "Free",
    ageGroup: "All ages",
    hasLiveStream: true,
    status: "approved",
    featured: true
  },
  {
    title: "Passion Conference 2025",
    description: "Gathering of 18-25 year olds for worship, teaching, and encounter with Jesus. Featuring Louie Giglio and worship leaders.",
    type: "conference",
    date: new Date("2025-01-02T18:00:00"),
    endDate: new Date("2025-01-04T21:00:00"),
    location: "Mercedes-Benz Stadium",
    address: "1 AMB Drive NW",
    city: "Atlanta",
    state: "Georgia",
    country: "United States",
    website: "https://passionconferences.com",
    registrationUrl: "https://passionconferences.com/register",
    price: "$179-$229",
    ageGroup: "18-25",
    hasLiveStream: true,
    status: "approved",
    featured: true
  },
  {
    title: "Men's Wild Game Dinner",
    description: "Bring a friend! Wild game feast with powerful testimony and call to faith. Great outreach event for men.",
    type: "mens",
    date: new Date("2025-02-22T17:00:00"),
    location: "Calvary Chapel Costa Mesa",
    address: "3800 S. Fairview St",
    city: "Santa Ana",
    state: "California",
    country: "United States",
    price: "$25",
    ageGroup: "Men 13+",
    hasChildcare: false,
    status: "approved"
  },
  {
    title: "Women of Faith Conference",
    description: "Weekend retreat for women featuring worship, teaching, and fellowship. Keynote speakers include Priscilla Shirer.",
    type: "womens",
    date: new Date("2025-04-11T18:00:00"),
    endDate: new Date("2025-04-12T16:00:00"),
    location: "First Baptist Dallas",
    address: "1707 San Jacinto St",
    city: "Dallas",
    state: "Texas",
    country: "United States",
    price: "$89",
    ageGroup: "Women 18+",
    hasChildcare: true,
    hasLiveStream: false,
    status: "approved",
    featured: true
  },
  {
    title: "Youth Summer Camp 2025",
    description: "Week-long camp for middle and high school students. Games, worship, small groups, and life-changing decisions!",
    type: "youth",
    date: new Date("2025-07-14T09:00:00"),
    endDate: new Date("2025-07-18T15:00:00"),
    location: "Forest Home Christian Camps",
    city: "Forest Falls",
    state: "California",
    country: "United States",
    price: "$450",
    ageGroup: "12-18",
    status: "approved"
  },
  {
    title: "National Day of Prayer Gathering",
    description: "Join believers across America in prayer for our nation, leaders, families, and revival.",
    type: "prayer",
    date: new Date("2025-05-01T12:00:00"),
    location: "Multiple Locations / Online",
    city: "Nationwide",
    state: "All States",
    country: "United States",
    website: "https://nationaldayofprayer.org",
    price: "Free",
    ageGroup: "All ages",
    hasLiveStream: true,
    isVirtual: true,
    status: "approved",
    featured: true
  },
  {
    title: "Prophecy Conference 2025",
    description: "End times Bible prophecy teaching with leading scholars. Topics include Rapture, Tribulation, Second Coming.",
    type: "conference",
    date: new Date("2025-03-21T09:00:00"),
    endDate: new Date("2025-03-22T17:00:00"),
    location: "Shadow Mountain Community Church",
    address: "2100 Greenfield Dr",
    city: "El Cajon",
    state: "California",
    country: "United States",
    price: "Free-will offering",
    ageGroup: "All ages",
    hasLiveStream: true,
    status: "approved"
  },
  {
    title: "VBS - God's Kingdom Adventure",
    description: "Free Vacation Bible School for kids K-5th grade. Bible stories, crafts, games, snacks, and fun!",
    type: "vbs",
    date: new Date("2025-06-16T09:00:00"),
    endDate: new Date("2025-06-20T12:00:00"),
    location: "Prestonwood Baptist Church",
    address: "6801 W Park Blvd",
    city: "Plano",
    state: "Texas",
    country: "United States",
    price: "Free",
    ageGroup: "K-5th Grade",
    status: "approved"
  }
];

// Population functions
async function populateChurches() {
  if (typeof firebase === 'undefined') {
    console.error('Firebase not loaded!');
    return;
  }
  
  const db = firebase.firestore();
  console.log('📦 Adding sample churches...');
  
  for (const church of SAMPLE_CHURCHES) {
    try {
      const ref = await db.collection('churches').add({
        ...church,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        approvedAt: firebase.firestore.FieldValue.serverTimestamp(),
        views: 0,
        rating: 0,
        reviewCount: 0
      });
      console.log(`✅ Added church: ${church.name} (${ref.id})`);
    } catch (err) {
      console.error(`❌ Error adding ${church.name}:`, err);
    }
  }
  
  console.log('✅ Churches population complete!');
}

async function populateEvents() {
  if (typeof firebase === 'undefined') {
    console.error('Firebase not loaded!');
    return;
  }
  
  const db = firebase.firestore();
  console.log('📦 Adding sample events...');
  
  for (const event of SAMPLE_EVENTS) {
    try {
      const ref = await db.collection('events').add({
        ...event,
        date: firebase.firestore.Timestamp.fromDate(event.date),
        endDate: event.endDate ? firebase.firestore.Timestamp.fromDate(event.endDate) : null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        approvedAt: firebase.firestore.FieldValue.serverTimestamp(),
        attendeeCount: 0,
        interestedCount: 0,
        interestedUsers: []
      });
      console.log(`✅ Added event: ${event.title} (${ref.id})`);
    } catch (err) {
      console.error(`❌ Error adding ${event.title}:`, err);
    }
  }
  
  console.log('✅ Events population complete!');
}

async function populateAll() {
  console.log('🚀 Starting Firebase population...');
  await populateChurches();
  await populateEvents();
  console.log('🎉 All data populated!');
}

// Make available globally
window.populateChurches = populateChurches;
window.populateEvents = populateEvents;
window.populateAll = populateAll;

console.log('📋 Firebase population script loaded!');
console.log('Run populateAll() to add sample churches and events.');
