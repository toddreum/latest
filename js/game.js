/*!
 * BirdTurds Game Engine v19.6 - WAKE UP AMERICA EDITION!
 * Entertainment with PURPOSE - Awakening Hearts to Biblical Truth
 * Copyright (c) 2025 Dude.com. All Rights Reserved.
 * 
 * PROPRIETARY AND CONFIDENTIAL
 * 
 * This source code is protected intellectual property of Dude.com.
 * Unauthorized copying, modification, reverse engineering, decompilation,
 * disassembly, or distribution of this code, via any medium, is strictly
 * prohibited and may result in severe civil and criminal penalties.
 * 
 * Violators will be prosecuted to the maximum extent possible under law.
 * 
 * License: Proprietary - All Rights Reserved
 * Website: https://birdturds.com
 * Contact: support@birdturds.com
 * 
 * "Making the world laugh AND awakening hearts to biblical truth!"
 * 
 * v19.6 - WAKE UP AMERICA EDITION!
 * PURPOSE: This game is not just for humor - it's meant to IMPACT and AWAKEN
 * players to biblical truth. The rapture is coming. God doesn't want anyone left behind!
 * 
 * FEATURES:
 * - 4 Animated Woke Globalist types (Swamp Level 7)
 * - 4 Animated Demon sprites (White House Level 8)  
 * - 4 Phone Zombie types - Wake them with Bibles!
 * - Divine Golden Powder effect on awakening
 * - 78 Bible Scriptures (Wake-up, End Times, Teen, Rapture, Victory)
 * - Rapture Warning messages
 * - All Boss Birds attack at White House finale!
 * - Trump victory celebration with fist pump!
 * - 3 Difficulty modes: Beginner, Intermediate, Advanced
 * - Silent Mode shop item (no popups)
 */

const GAME_WIDTH = 1280;
const GAME_HEIGHT = 640;
const WORLD_WIDTH = 20000;
const TURD_SCALE = 0.04; // Smaller turds - fixed scaling
const BIRD_SCALE = 0.12; // Bird scaling - reasonable size
const ANIMAL_SCALE = 0.20; // Ground animal scaling - increased for visibility
const HUNTER_SCALE = 0.24; // Character scale for sprite sheets - slightly larger for readability
const TRUMP_SCALE = 0.24; // Trump and VIPs
const BODYGUARD_SCALE = 0.22; // Secret service
const FARMER_SCALE = 0.22; // NPCs
const CHILD_SCALE = 0.18; // Smaller NPCs
const TRACTOR_SCALE = 0.18; // Vehicles

// ========== DIFFICULTY MODES ==========
const DIFFICULTY_MODES = {
  beginner: {
    name: 'Beginner',
    emoji: '🟢',
    description: 'For new players - more health, slower enemies, helpful hints',
    playerHealth: 150,
    playerMaxHealth: 150,
    turdDamage: 5,          // Reduced turd damage
    demonDamage: 8,         // Reduced demon damage
    enemySpeed: 0.7,        // 70% enemy speed
    birdSpawnRate: 0.7,     // 70% bird spawn rate
    globalistSpawnRate: 0.5,// 50% globalist spawn rate
    demonSpawnRate: 0.5,    // 50% demon spawn rate
    bossHealth: 0.6,        // 60% boss health
    startingAmmo: 120,      // More starting ammo
    startingCoins: 100,     // Starting coins bonus
    birdsToAdvance: 20,     // Fewer birds needed per level
    showHints: true,        // Show helpful hints
    angelDuration: 20,      // Longer angel protection
    respawnTime: 5          // Seconds to respawn after death
  },
  intermediate: {
    name: 'Intermediate',
    emoji: '🟡',
    description: 'Balanced challenge - standard gameplay experience',
    playerHealth: 100,
    playerMaxHealth: 100,
    turdDamage: 8,
    demonDamage: 15,
    enemySpeed: 1.0,        // Normal speed
    birdSpawnRate: 1.0,     // Normal spawn rate
    globalistSpawnRate: 1.0,
    demonSpawnRate: 1.0,
    bossHealth: 1.0,        // Normal boss health
    startingAmmo: 90,
    startingCoins: 0,
    birdsToAdvance: 25,
    showHints: false,
    angelDuration: 15,
    respawnTime: 3
  },
  advanced: {
    name: 'Advanced',
    emoji: '🔴',
    description: 'For experts - less health, faster enemies, no mercy!',
    playerHealth: 75,
    playerMaxHealth: 75,
    turdDamage: 12,         // More turd damage
    demonDamage: 25,        // More demon damage
    enemySpeed: 1.4,        // 140% enemy speed
    birdSpawnRate: 1.5,     // 150% bird spawn rate
    globalistSpawnRate: 1.5,// More globalists
    demonSpawnRate: 1.8,    // More demons!
    bossHealth: 1.5,        // 150% boss health
    startingAmmo: 60,       // Less starting ammo
    startingCoins: 0,
    birdsToAdvance: 35,     // More birds needed
    showHints: false,
    angelDuration: 10,      // Shorter angel protection
    respawnTime: 0,         // No respawn - permadeath!
    allBossesAtWhiteHouse: true,  // ALL bosses attack at White House!
    doubleGlobalists: true        // Double globalists at swamp
  }
};

// Current difficulty (can be changed in menu)
let currentDifficulty = DIFFICULTY_MODES.intermediate;

// ========== PHONE ZOMBIES - WAKE THEM UP! ==========
// People mindlessly on phones - give them Bibles to wake them up!
const PHONE_ZOMBIE_TYPES = [
  {
    type: 'teen_boy',
    name: 'Distracted Teen',
    walkFrames: 4,
    wakeFrames: 4,
    helpFrames: 4,
    quotes: ["Just scrolling...", "One more video...", "Whatever...", "Leave me alone..."],
    wokenQuotes: ["Whoa, what's happening?!", "I can see clearly now!", "Thank you!", "God is real!"],
    helpQuotes: ["I'll help fight!", "For America!", "Let's go!"]
  },
  {
    type: 'teen_girl',
    name: 'Social Media Addict',
    walkFrames: 4,
    wakeFrames: 4,
    helpFrames: 4,
    quotes: ["Need more likes...", "Posting selfie...", "So bored...", "Drama everywhere..."],
    wokenQuotes: ["Wait, what's real?!", "My eyes are open!", "This matters more!", "I was so blind!"],
    helpQuotes: ["Count me in!", "Truth matters!", "Fighting back!"]
  },
  {
    type: 'adult_man',
    name: 'News Zombie',
    walkFrames: 4,
    wakeFrames: 4,
    helpFrames: 4,
    quotes: ["Must check news...", "The experts say...", "Trust the algorithm...", "Can't look away..."],
    wokenQuotes: ["It was all lies!", "I've been deceived!", "The truth shall set you free!", "Wake up people!"],
    helpQuotes: ["I'll spread the word!", "No more fake news!", "Truth warrior now!"]
  },
  {
    type: 'adult_woman',
    name: 'Doom Scroller',
    walkFrames: 4,
    wakeFrames: 4,
    helpFrames: 4,
    quotes: ["So anxious...", "Everything's terrible...", "Can't stop scrolling...", "Need distraction..."],
    wokenQuotes: ["There's hope!", "God has a plan!", "I feel peace now!", "Fear is gone!"],
    helpQuotes: ["Spreading hope!", "Join us!", "Light defeats darkness!"]
  }
];

// Bible pickup configuration
const BIBLE_PICKUP_CONFIG = {
  spawnChance: 0.15,       // 15% chance per spawn cycle
  spawnInterval: 20,       // Every 20 seconds
  maxOnScreen: 3,          // Max bibles on ground at once
  glowColor: 0xffd700,     // Golden glow
  pickupRange: 60          // Pixels to pick up
};

// Phone Zombie configuration  
const PHONE_ZOMBIE_CONFIG = {
  spawnChance: 0.25,       // 25% chance per spawn cycle
  spawnInterval: 15,       // Every 15 seconds
  maxOnScreen: 4,          // Max zombies at once
  wakeRange: 80,           // Pixels - how close to give Bible
  pointsForWaking: 200,    // Points for waking someone up
  coinsForWaking: 15,      // Coins for waking someone up
  helpDuration: 30,        // Seconds the woken person helps fight
  helpDamage: 10           // Damage dealt by helpers
};

// Wake-up scriptures
const WAKEUP_SCRIPTURES = [
  { verse: "Awake, O sleeper, and arise from the dead, and Christ will shine on you.", ref: "Ephesians 5:14" },
  { verse: "The truth will set you free.", ref: "John 8:32" },
  { verse: "Be sober-minded; be watchful. Your adversary the devil prowls around.", ref: "1 Peter 5:8" },
  { verse: "Do not conform to the pattern of this world, but be transformed.", ref: "Romans 12:2" },
  { verse: "Wake up! Strengthen what remains and is about to die.", ref: "Revelation 3:2" },
  { verse: "The night is nearly over; the day is almost here.", ref: "Romans 13:12" },
  { verse: "Come out of her, my people, so that you will not share in her sins.", ref: "Revelation 18:4" },
  { verse: "Open my eyes that I may see wonderful things.", ref: "Psalm 119:18" },
  { verse: "For you were once darkness, but now you are light in the Lord.", ref: "Ephesians 5:8" },
  { verse: "See to it that no one takes you captive through hollow philosophy.", ref: "Colossians 2:8" }
];

// ========== END TIMES SCRIPTURES - Family Division Warning ==========
// These appear when phone zombies are awakened to warn about the times we live in
const END_TIMES_FAMILY_SCRIPTURES = [
  // Family division prophecies
  { verse: "Children will rise against parents and have them put to death.", ref: "Matthew 10:21", 
    message: "Don't let division destroy your family!" },
  { verse: "Brother will betray brother to death, and a father his child.", ref: "Mark 13:12",
    message: "Stay united with your loved ones!" },
  { verse: "A man's enemies will be the members of his own household.", ref: "Matthew 10:36",
    message: "Protect your family bonds!" },
  { verse: "From now on five in one household will be divided, three against two.", ref: "Luke 12:52",
    message: "Don't let the enemy divide you!" },
  
  // Last days character warnings
  { verse: "In the last days people will be lovers of self, disobedient to parents.", ref: "2 Timothy 3:2",
    message: "Honor your parents! Don't be deceived!" },
  { verse: "People will be ungrateful, unholy, without love for their families.", ref: "2 Timothy 3:2-3",
    message: "Choose love over selfishness!" },
  { verse: "Lovers of pleasure rather than lovers of God.", ref: "2 Timothy 3:4",
    message: "Put God first, not your phone!" },
  { verse: "They will have a form of godliness but deny its power.", ref: "2 Timothy 3:5",
    message: "Don't just pretend - truly follow Jesus!" },
  
  // Hope and restoration
  { verse: "He will turn the hearts of fathers to their children, and children to their fathers.", ref: "Malachi 4:6",
    message: "God can heal your family!" },
  { verse: "Honor your father and mother, that it may go well with you.", ref: "Ephesians 6:2-3",
    message: "Blessing comes through honoring parents!" },
  { verse: "Children, obey your parents in the Lord, for this is right.", ref: "Ephesians 6:1",
    message: "Obedience brings blessing!" },
  { verse: "Train up a child in the way he should go.", ref: "Proverbs 22:6",
    message: "Parents: teach your kids the truth!" },
  
  // Call to action
  { verse: "Choose this day whom you will serve. As for me and my house, we will serve the Lord.", ref: "Joshua 24:15",
    message: "Make the choice TODAY!" },
  { verse: "If my people humble themselves and pray, I will heal their land.", ref: "2 Chronicles 7:14",
    message: "Revival starts with YOU!" },
  { verse: "Return to me, and I will return to you, says the Lord.", ref: "Malachi 3:7",
    message: "It's not too late to turn back!" },
  { verse: "Behold, I stand at the door and knock.", ref: "Revelation 3:20",
    message: "Jesus is waiting for you!" }
];

// Teen-specific encouragement scriptures
const TEEN_AWAKENING_SCRIPTURES = [
  { verse: "Don't let anyone look down on you because you are young.", ref: "1 Timothy 4:12",
    message: "Your generation can make a difference!" },
  { verse: "Remember your Creator in the days of your youth.", ref: "Ecclesiastes 12:1",
    message: "Don't wait until you're older!" },
  { verse: "I have written to you, young people, because you are strong.", ref: "1 John 2:14",
    message: "You have the strength to stand!" },
  { verse: "How can a young person stay pure? By obeying your word.", ref: "Psalm 119:9",
    message: "God's Word is your guide!" },
  { verse: "Flee youthful passions and pursue righteousness.", ref: "2 Timothy 2:22",
    message: "Run from distractions, run to God!" },
  { verse: "Your word is a lamp to my feet and a light to my path.", ref: "Psalm 119:105",
    message: "The Bible shows you the way!" },
  { verse: "The fear of the Lord is the beginning of wisdom.", ref: "Proverbs 9:10",
    message: "Real wisdom starts with God!" },
  { verse: "Trust in the Lord with all your heart, lean not on your own understanding.", ref: "Proverbs 3:5",
    message: "Don't trust the algorithm - trust God!" }
];

// ========== RAPTURE SCRIPTURES - God Doesn't Want Anyone Left Behind! ==========
const RAPTURE_SCRIPTURES = [
  // The Second Coming of Christ
  { verse: "For the Lord himself will come down from heaven, with a loud command, with the voice of the archangel and with the trumpet call of God, and the dead in Christ will rise first.", 
    ref: "1 Thessalonians 4:16", message: "Jesus is coming back! Are you ready?" },
  { verse: "Then we who are alive, who are left, will be caught up together with them in the clouds to meet the Lord in the air.", 
    ref: "1 Thessalonians 4:17", message: "The rapture is REAL! Don't be left behind!" },
  { verse: "Look, he is coming with the clouds, and every eye will see him, even those who pierced him.", 
    ref: "Revelation 1:7", message: "EVERY eye will see Him return!" },
  { verse: "Then will appear the sign of the Son of Man in heaven. And then all the peoples of the earth will mourn when they see the Son of Man coming on the clouds of heaven, with power and great glory.", 
    ref: "Matthew 24:30", message: "He's coming with POWER and GLORY!" },
  { verse: "Look, I am coming soon! My reward is with me, and I will give to each person according to what they have done.", 
    ref: "Revelation 22:12", message: "He's coming SOON with rewards!" },
  { verse: "This same Jesus, who has been taken from you into heaven, will come back in the same way you have seen him go into heaven.", 
    ref: "Acts 1:11", message: "He's coming back just as He left!" },
  
  // God's Patience - He Doesn't Want Anyone Left Behind
  { verse: "The Lord is not slow in keeping his promise, as some understand slowness. Instead, he is patient with you, not wanting anyone to perish, but everyone to come to repentance.", 
    ref: "2 Peter 3:9", message: "God doesn't want ANYONE left behind!" },
  { verse: "For many are called, but few are chosen.", 
    ref: "Matthew 22:14", message: "Many are called - will YOU be chosen?" },
  
  // Be Ready - You Don't Know When
  { verse: "Be ready, for the Son of Man is coming at an hour you do not expect.", 
    ref: "Matthew 24:44", message: "No one knows the day or hour - BE READY!" },
  { verse: "Watch therefore, for you know neither the day nor the hour.", 
    ref: "Matthew 25:13", message: "Stay awake! Stay ready! Stay faithful!" },
  { verse: "In a moment, in the twinkling of an eye, at the last trumpet. For the trumpet will sound, the dead will be raised imperishable, and we shall be changed.", 
    ref: "1 Corinthians 15:52", message: "It will happen in an INSTANT!" },
  { verse: "Be always on the watch, and pray that you may be able to escape all that is about to happen, and that you may be able to stand before the Son of Man.", 
    ref: "Luke 21:36", message: "Watch and PRAY!" }
];

// ========== END TIMES SIGNS - What the Bible Predicted ==========
const END_TIMES_SIGNS_SCRIPTURES = [
  // Signs Jesus Told Us To Watch For
  { verse: "You will hear of wars and rumors of wars, but see to it that you are not alarmed. Such things must happen, but the end is still to come.", 
    ref: "Matthew 24:6", message: "Wars and rumors of wars - just as predicted!" },
  { verse: "Nation will rise against nation, and kingdom against kingdom. There will be earthquakes in various places, and famines. These are the beginning of birth pains.", 
    ref: "Mark 13:8", message: "Birth pains of the end times!" },
  { verse: "There will be great earthquakes, famines, and pestilences in various places, and fearful events and great signs from heaven.", 
    ref: "Luke 21:11", message: "Look around - the signs are HERE!" },
  { verse: "And this gospel of the kingdom will be preached in the whole world as a testimony to all nations, and then the end will come.", 
    ref: "Matthew 24:14", message: "The Gospel is reaching the whole world!" },
  
  // Perseverance Required
  { verse: "But the one who stands firm to the end will be saved.", 
    ref: "Matthew 24:13", message: "Stand firm to the END!" },
  { verse: "Do not be afraid of what you are about to suffer. Be faithful, even to the point of death, and I will give you life as your victor's crown.", 
    ref: "Revelation 2:10", message: "Be FAITHFUL - receive the crown of LIFE!" },
  { verse: "Blessed is the one who perseveres under trial because, having stood the test, that person will receive the crown of life that the Lord has promised to those who love him.", 
    ref: "James 1:12", message: "Persevere and receive the crown!" },
  
  // Judgment Day
  { verse: "When the Son of Man comes in his glory, and all the angels with him, he will sit on his glorious throne.", 
    ref: "Matthew 25:31", message: "He will judge from His throne!" },
  { verse: "For we must all appear before the judgment seat of Christ, so that each of us may receive what is due us for the things done while in the body, whether good or bad.", 
    ref: "2 Corinthians 5:10", message: "We will ALL stand before Christ!" },
  { verse: "And I saw the dead, great and small, standing before the throne, and books were opened.", 
    ref: "Revelation 20:12", message: "The books will be opened!" }
];

// ========== HOPE AND COMFORT SCRIPTURES ==========
const HOPE_SCRIPTURES = [
  { verse: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.", 
    ref: "Revelation 21:4", message: "No more tears, no more pain - FOREVER!" },
  { verse: "While we wait for the blessed hope—the appearing of the glory of our great God and Savior, Jesus Christ.", 
    ref: "Titus 2:13", message: "Our BLESSED HOPE is coming!" },
  { verse: "I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.", 
    ref: "John 16:33", message: "Take heart - Jesus has OVERCOME!" },
  { verse: "No, in all these things we are more than conquerors through him who loved us.", 
    ref: "Romans 8:37", message: "You are MORE than a conqueror!" },
  { verse: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary; they will walk and not be faint.", 
    ref: "Isaiah 40:31", message: "Hope in the Lord - soar like eagles!" },
  { verse: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you.", 
    ref: "Isaiah 41:10", message: "Do NOT fear - God is WITH you!" },
  { verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", 
    ref: "Jeremiah 29:11", message: "God has GOOD plans for you!" },
  { verse: "To the one who is victorious, I will give the right to sit with me on my throne, just as I was victorious and sat down with my Father on his throne.", 
    ref: "Revelation 3:21", message: "Be victorious - sit with Jesus on His throne!" }
];

// ========== PRAYER IN END TIMES ==========
const PRAYER_SCRIPTURES = [
  { verse: "The end of all things is near. Therefore be alert and of sober mind so that you may pray.", 
    ref: "1 Peter 4:7", message: "The end is near - PRAY!" },
  { verse: "Pray continually.", 
    ref: "1 Thessalonians 5:17", message: "Never stop praying!" },
  { verse: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", 
    ref: "Philippians 4:6", message: "Don't be anxious - PRAY!" },
  { verse: "The prayer of a righteous person is powerful and effective.", 
    ref: "James 5:16", message: "Your prayers are POWERFUL!" },
  { verse: "Be joyful in hope, patient in affliction, faithful in prayer.", 
    ref: "Romans 12:12", message: "Stay faithful in prayer!" }
];

// ========== PASTOR VIDEO RESOURCES ==========
// These videos relate to the scriptures and messages in the game
// Each video has a topic that matches game themes
const PASTOR_VIDEO_RESOURCES = [
  // RAPTURE & END TIMES
  { 
    title: "The Rapture Just Happened: What You Need To Know",
    pastor: "Jack Hibbs",
    channel: "Real Life with Jack Hibbs",
    url: "https://www.youtube.com/@reallifejackhibbs",
    topic: "rapture",
    description: "What if you've been left behind? What should you expect?"
  },
  { 
    title: "Defining the Rapture",
    pastor: "Jack Hibbs",
    channel: "Real Life with Jack Hibbs",
    url: "https://www.youtube.com/@reallifejackhibbs",
    topic: "rapture",
    description: "Biblical teaching on the rapture and why it matters"
  },
  { 
    title: "Signs of the Coming Antichrist",
    pastor: "Jack Hibbs",
    channel: "Real Life with Jack Hibbs",
    url: "https://www.youtube.com/@reallifejackhibbs",
    topic: "end_times",
    description: "End times prophecy and what to watch for"
  },
  { 
    title: "A Post-Rapture World",
    pastor: "Jack Hibbs",
    channel: "Real Life with Jack Hibbs",
    url: "https://www.youtube.com/@reallifejackhibbs",
    topic: "rapture",
    description: "What the Bible says will happen after the rapture"
  },
  // YOUTH & FAMILY
  { 
    title: "Ask Pastor Jack - Youth Edition",
    pastor: "Jack Hibbs",
    channel: "Real Life with Jack Hibbs",
    url: "https://www.youtube.com/@reallifejackhibbs",
    topic: "youth",
    description: "Real questions and biblical answers from the next generation"
  },
  { 
    title: "United In Truth",
    pastor: "Jack Hibbs",
    channel: "Real Life with Jack Hibbs",
    url: "https://www.youtube.com/@reallifejackhibbs",
    topic: "family",
    description: "Building up brothers and sisters in Christ"
  },
  { 
    title: "Navigating Family Dynamics with Grace",
    pastor: "Jack Hibbs",
    channel: "Real Life with Jack Hibbs",
    url: "https://www.youtube.com/@reallifejackhibbs",
    topic: "family",
    description: "God's wisdom for family relationships"
  },
  // FAITH & CULTURE
  { 
    title: "TPUSA Faith - Freedom Night in America",
    pastor: "Various",
    channel: "TPUSA Faith",
    url: "https://www.youtube.com/@tpusafaith",
    topic: "faith",
    description: "Christians rising to put faith into action"
  },
  { 
    title: "The Believers Summit",
    pastor: "Various",
    channel: "TPUSA Faith",
    url: "https://www.youtube.com/@tpusafaith",
    topic: "faith",
    description: "Onward for the Kingdom - engaging the world with truth"
  }
];

// ========== REWARD & ACHIEVEMENT SCRIPTURES ==========
const REWARD_SCRIPTURES = [
  { verse: "Well done, good and faithful servant! You have been faithful with a few things; I will put you in charge of many things.", 
    ref: "Matthew 25:21", message: "God rewards faithfulness!" },
  { verse: "I have fought the good fight, I have finished the race, I have kept the faith.", 
    ref: "2 Timothy 4:7", message: "Keep fighting the good fight!" },
  { verse: "Do you not know that in a race all the runners run, but only one gets the prize? Run in such a way as to get the prize.", 
    ref: "1 Corinthians 9:24", message: "Run to WIN!" },
  { verse: "Blessed is the one who perseveres under trial because, having stood the test, that person will receive the crown of life.", 
    ref: "James 1:12", message: "Persevere and receive the crown!" },
  { verse: "And whatever you do, work at it with all your heart, as working for the Lord, not for human masters.", 
    ref: "Colossians 3:23", message: "Work for the Lord in all you do!" },
  { verse: "His master replied, 'Well done, good and faithful servant! Come and share your master's happiness!'", 
    ref: "Matthew 25:23", message: "Share in the Master's joy!" }
];

// ========== TESTIMONY & WITNESS SCRIPTURES ==========
const TESTIMONY_SCRIPTURES = [
  { verse: "Let the redeemed of the Lord tell their story—those he redeemed from the hand of the foe.", 
    ref: "Psalm 107:2", message: "Tell your story of redemption!" },
  { verse: "They triumphed over him by the blood of the Lamb and by the word of their testimony.", 
    ref: "Revelation 12:11", message: "Your testimony is powerful!" },
  { verse: "Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have.", 
    ref: "1 Peter 3:15", message: "Be ready to share your hope!" },
  { verse: "You are the light of the world. A town built on a hill cannot be hidden.", 
    ref: "Matthew 5:14", message: "Let your light shine!" },
  { verse: "Go into all the world and preach the gospel to all creation.", 
    ref: "Mark 16:15", message: "Share the good news everywhere!" },
  { verse: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses.", 
    ref: "Acts 1:8", message: "Be a witness for Christ!" }
];

// ========== SHARING & GENEROSITY SCRIPTURES ==========
const SHARING_SCRIPTURES = [
  { verse: "Give, and it will be given to you. A good measure, pressed down, shaken together and running over.", 
    ref: "Luke 6:38", message: "Give generously!" },
  { verse: "Each of you should use whatever gift you have received to serve others, as faithful stewards of God's grace.", 
    ref: "1 Peter 4:10", message: "Use your gifts to serve!" },
  { verse: "Do not forget to do good and to share with others, for with such sacrifices God is pleased.", 
    ref: "Hebrews 13:16", message: "Share with others!" },
  { verse: "A generous person will prosper; whoever refreshes others will be refreshed.", 
    ref: "Proverbs 11:25", message: "Be generous and be blessed!" },
  { verse: "Freely you have received; freely give.", 
    ref: "Matthew 10:8", message: "Share freely what you've received!" }
];

// ========== ALL BOSS BIRDS - Released at White House! ==========
const ALL_BOSS_BIRDS = [
  { name: 'Thunderbird', key: 'thunderbird', health: 150, damage: 25, speed: 80, color: 0xffd700, size: 1.5, 
    ability: 'lightning', desc: 'Summons lightning bolts!' },
  { name: 'Phoenix', key: 'phoenix', health: 200, damage: 20, speed: 70, color: 0xff4500, size: 1.4,
    ability: 'fire', desc: 'Rises from ashes, shoots fireballs!' },
  { name: 'Dragon', key: 'dragon', health: 300, damage: 35, speed: 60, color: 0x228b22, size: 2.0,
    ability: 'breath', desc: 'Breathes fire in a cone!' },
  { name: 'Pterodactyl', key: 'pterodactyl', health: 180, damage: 30, speed: 90, color: 0x8b4513, size: 1.6,
    ability: 'dive', desc: 'Devastating dive attacks!' },
  { name: 'Giant Eagle', key: 'goldeneagle', health: 120, damage: 20, speed: 100, color: 0x4169e1, size: 1.3,
    ability: 'swoop', desc: 'Lightning fast swoops!' },
  { name: 'Vulture King', key: 'vulture', health: 160, damage: 15, speed: 50, color: 0x2f4f4f, size: 1.4,
    ability: 'poison', desc: 'Toxic cloud attacks!' },
  { name: 'Storm Crow', key: 'crow', health: 100, damage: 18, speed: 85, color: 0x1a1a2e, size: 1.2,
    ability: 'storm', desc: 'Calls swarms of crows!' },
  { name: 'Frost Owl', key: 'owl', health: 140, damage: 22, speed: 55, color: 0x87ceeb, size: 1.3,
    ability: 'freeze', desc: 'Freezing wind attacks!' }
];

// ========== CHARACTER SYSTEM - 8 Animated Hunters ==========
// 4 Male: Buck, Clyde, Bubba, Gunner
// 4 Female: Daisy, Jolene, Sierra, Tammy
var CHARACTER_ROSTER = {
  buck: { 
    id: 'buck', 
    name: 'Buck', 
    gender: 'male', 
    desc: 'Rugged cowboy with a trusty rifle', 
    weapon: 'Lever-Action Rifle', 
    style: 'Western Cowboy',
    animations: {
      idle: { frames: 4, cols: 2, rows: 2, frameRate: 6, loop: true },
      walk: { frames: 9, cols: 3, rows: 3, frameRate: 10, loop: true },
      run: { frames: 9, cols: 3, rows: 3, frameRate: 14, loop: true },
      shoot: { frames: 4, cols: 2, rows: 2, frameRate: 12, loop: false },
      jump: { frames: 4, cols: 2, rows: 2, frameRate: 10, loop: false },
      hurt: { frames: 4, cols: 2, rows: 2, frameRate: 8, loop: false }
    }
  },
  daisy: { 
    id: 'daisy', 
    name: 'Daisy', 
    gender: 'female', 
    desc: 'Sharpshooting cowgirl with attitude', 
    weapon: 'Shotgun', 
    style: 'Country Cowgirl',
    animations: {
      idle: { frames: 4, cols: 2, rows: 2, frameRate: 6, loop: true },
      walk: { frames: 9, cols: 3, rows: 3, frameRate: 10, loop: true },
      run: { frames: 9, cols: 3, rows: 3, frameRate: 14, loop: true },
      shoot: { frames: 4, cols: 2, rows: 2, frameRate: 12, loop: false },
      jump: { frames: 4, cols: 2, rows: 2, frameRate: 10, loop: false },
      hurt: { frames: 4, cols: 2, rows: 2, frameRate: 8, loop: false }
    }
  },
  clyde: { 
    id: 'clyde', 
    name: 'Clyde', 
    gender: 'male', 
    desc: 'Patriotic muscleman - "Freedom ain\'t free!"', 
    weapon: 'AR-15', 
    style: 'The Patriot',
    animations: {
      idle: { frames: 4, cols: 2, rows: 2, frameRate: 6, loop: true },
      walk: { frames: 9, cols: 3, rows: 3, frameRate: 10, loop: true },
      run: { frames: 9, cols: 3, rows: 3, frameRate: 14, loop: true },
      shoot: { frames: 4, cols: 2, rows: 2, frameRate: 12, loop: false },
      jump: { frames: 4, cols: 2, rows: 2, frameRate: 10, loop: false },
      hurt: { frames: 4, cols: 2, rows: 2, frameRate: 8, loop: false }
    }
  },
  bubba: { 
    id: 'bubba', 
    name: 'Bubba', 
    gender: 'male', 
    desc: 'Good ol\' boy - "Hold my beer!"', 
    weapon: 'Double-Barrel Shotgun', 
    style: 'The Redneck',
    animations: {
      idle: { frames: 4, cols: 2, rows: 2, frameRate: 6, loop: true },
      walk: { frames: 9, cols: 3, rows: 3, frameRate: 10, loop: true },
      run: { frames: 9, cols: 3, rows: 3, frameRate: 14, loop: true },
      shoot: { frames: 4, cols: 2, rows: 2, frameRate: 12, loop: false },
      jump: { frames: 4, cols: 2, rows: 2, frameRate: 10, loop: false },
      hurt: { frames: 4, cols: 2, rows: 2, frameRate: 8, loop: false }
    }
  },
  gunner: { 
    id: 'gunner', 
    name: 'Gunner', 
    gender: 'male', 
    desc: 'Grizzled veteran - "I\'ve seen things..."', 
    weapon: 'M16 Tactical', 
    style: 'The Veteran',
    animations: {
      idle: { frames: 4, cols: 2, rows: 2, frameRate: 6, loop: true },
      walk: { frames: 9, cols: 3, rows: 3, frameRate: 10, loop: true },
      run: { frames: 9, cols: 3, rows: 3, frameRate: 14, loop: true },
      shoot: { frames: 4, cols: 2, rows: 2, frameRate: 12, loop: false },
      jump: { frames: 4, cols: 2, rows: 2, frameRate: 10, loop: false },
      hurt: { frames: 4, cols: 2, rows: 2, frameRate: 8, loop: false }
    }
  },
  jolene: { 
    id: 'jolene', 
    name: 'Jolene', 
    gender: 'female', 
    desc: 'Southern belle - "Bless your heart!"', 
    weapon: 'Pink Rifle', 
    style: 'The Belle',
    animations: {
      idle: { frames: 4, cols: 2, rows: 2, frameRate: 6, loop: true },
      walk: { frames: 9, cols: 3, rows: 3, frameRate: 10, loop: true },
      run: { frames: 9, cols: 3, rows: 3, frameRate: 14, loop: true },
      shoot: { frames: 4, cols: 2, rows: 2, frameRate: 12, loop: false },
      jump: { frames: 4, cols: 2, rows: 2, frameRate: 10, loop: false },
      hurt: { frames: 4, cols: 2, rows: 2, frameRate: 8, loop: false }
    }
  },
  sierra: { 
    id: 'sierra', 
    name: 'Sierra', 
    gender: 'female', 
    desc: 'Fitness queen - "Great for my macros!"', 
    weapon: 'Tactical Crossbow', 
    style: 'CrossFit Queen',
    animations: {
      idle: { frames: 4, cols: 2, rows: 2, frameRate: 6, loop: true },
      walk: { frames: 9, cols: 3, rows: 3, frameRate: 10, loop: true },
      run: { frames: 9, cols: 3, rows: 3, frameRate: 14, loop: true },
      shoot: { frames: 4, cols: 2, rows: 2, frameRate: 12, loop: false },
      jump: { frames: 4, cols: 2, rows: 2, frameRate: 10, loop: false },
      hurt: { frames: 4, cols: 2, rows: 2, frameRate: 8, loop: false }
    }
  },
  tammy: { 
    id: 'tammy', 
    name: 'Tammy', 
    gender: 'female', 
    desc: 'Truck stop waitress - "I deal with worse!"', 
    weapon: 'Sawed-Off Shotgun', 
    style: 'The Waitress',
    animations: {
      idle: { frames: 4, cols: 2, rows: 2, frameRate: 6, loop: true },
      walk: { frames: 9, cols: 3, rows: 3, frameRate: 10, loop: true },
      run: { frames: 9, cols: 3, rows: 3, frameRate: 14, loop: true },
      shoot: { frames: 4, cols: 2, rows: 2, frameRate: 12, loop: false },
      jump: { frames: 4, cols: 2, rows: 2, frameRate: 10, loop: false },
      hurt: { frames: 4, cols: 2, rows: 2, frameRate: 8, loop: false }
    }
  }
};

// Animation state names
const ANIM_IDLE = 'idle';
const ANIM_WALK = 'walk';
const ANIM_RUN = 'run';
const ANIM_SHOOT = 'shoot';
const ANIM_JUMP = 'jump';
const ANIM_HURT = 'hurt';

// Get selected character from localStorage or default
function getSelectedCharacter() {
  let saved = localStorage.getItem('birdturds_character');
  
  // MIGRATION: If user has old character (hunter_*), reset to Buck
  if (saved && (saved.startsWith('hunter_') || !CHARACTER_ROSTER[saved])) {
    console.log('Migrating old character to Buck:', saved);
    saved = 'buck';
    localStorage.setItem('birdturds_character', 'buck');
  }
  
  if (saved && CHARACTER_ROSTER[saved]) {
    return saved;
  }
  return 'buck'; // Default character is now Buck
}

// Game state
const btState = {
  score: 0,
  health: 100,             // Player health for non-turd damage (0-100)
  maxHealth: 100,          // Max health
  turdMeter: 0,            // Turd-O-Meter (0-100) - turds only!
  maxTurdMeter: 100,       // Max turd meter
  turdCount: 0,            // How many turds currently on hunter
  ammo: 90,
  ammoMax: 130,
  coins: 0,
  coinsEarnedToday: 0,     // Track daily earnings
  dailyCoinLimit: 500,     // Max coins earnable per day from gameplay
  lastCoinDate: null,      // Date of last coin earning
  weaponName: 'Semi-Auto Rifle',
  difficulty: 'intermediate', // DIFFICULTY MODE: beginner, intermediate, advanced
  kills: 0,
  accuracy: 0,
  shots: 0,
  invincible: false,
  doublePoints: false,
  slowMotion: false,
  triplePoints: false,     // Triple points active
  timeFrozen: false,       // Time freeze active
  currentWeapon: 'rifle',
  animalKills: 0,          // Track animal kills
  funnyDeaths: 0,          // Track funny deaths for stats
  shakesUsed: 0,           // Track shake-offs used
  hasBow: false,           // Bow pickup
  hasCrossbow: false,      // Crossbow pickup
  hasShotgun: false,       // Shotgun pickup
  bowArrows: 0,            // Arrows for bow
  crossbowBolts: 0,        // Bolts for crossbow
  shotgunShells: 0,        // Shells for shotgun
  hatProtection: false,    // Sturdy hat active - blocks turds
  hatTimer: 0,             // Seconds remaining on hat
  grenades: 0,             // Grenade count
  molotovs: 0,             // Molotov count
  flashbangs: 0,           // Flashbang count
  bazookaAmmo: 0,          // Bazooka rockets
  silentMode: false,       // SILENT MODE - No comments, jokes, or scriptures
  noCommentaryMode: false, // NO COMMENTARY - Disables hints/tips for bonus points (1.5x)
  commentaryBonus: 1.0,    // Point multiplier (1.5x when noCommentary is true)
  biblesHeld: 0,           // Bibles collected to give to phone zombies
  zombiesAwakened: 0,      // Track how many zombies awakened
  helpersActive: 0,        // Current active helpers
  // ========== JETPACK SYSTEM ==========
  jetpackActive: false,    // Is jetpack currently active?
  jetpackFuel: 0,          // Seconds of fuel remaining
  jetpackMaxFuel: 30,      // Max fuel (30 sec standard, 60 sec XL)
  // ========== OWNED VEHICLES (HELPERS) ==========
  hasDirtbike: false,      // Spawns helper on dirtbike
  hasATV: false,           // Spawns helper on ATV  
  hasTruck: false,         // Spawns helper truck that blocks turds
  hasJeep: false,          // Spawns jeep with mounted gun
  hasTank: false,          // Spawns tank that shoots birds
  hasHelicopter: false,    // Spawns helicopter ally
  vehicleHelperTimer: 0,   // Cooldown between helpers
  // ========== OWNED WEAPONS ==========
  hasHandgun: false,
  hasRevolver: false,
  hasDeagle: false,
  hasMachinegun: false,
  hasMinigun: false,
  hasSniper: false,
  hasBarrett: false,
  hasBazooka: false,
  hasRocketLauncher: false,
  hasMountedMinigun: false,
  // ========== HELPER BIRDS ==========
  extraEagles: 0,          // Helper eagles that attack birds
  goldenEagles: 0,         // Better helper eagles
  hasFalcon: false,        // Falcon helper
  hasOwlHelper: false,     // Owl helper (night vision)
  hasCoinMagnet: false,    // Auto-collect coins
  hasLuckyCharm: false,    // +20% rare birds
  // ========== COSMETIC BONUSES ==========
  camoActive: false,       // Birds spot you less
  hazmatImmune: false,     // Immune to toxic turds
  // ========== DEVELOPER MODE ==========
  devMode: false,          // Developer mode - unlimited coins/items
  devModeCode: 'BIRDTURDS777', // Secret code to activate
  // ========== LEVEL PROGRESSION ==========
  currentLevel: 1,         // Current level (1-8)
  birdsKilledThisLevel: 0, // Birds killed in current level
  birdsNeededThisLevel: 25,// Birds needed to clear level
  levelComplete: false,    // Has current level been cleared?
  gameWon: false,          // Has player reached White House?
  reachedWhiteHouse: false,// Has player ever reached White House?
  // WHITE HOUSE FINALE - All bosses attack!
  whiteHouseBossesReleased: false,
  bossesDefeated: 0,
  totalBossesToDefeat: 8,
  // SKIN & ARMOR EFFECTS
  currentSkin: 'default',  // Current equipped skin
  armorReduction: 0,       // % damage reduction from armor (0-0.3)
  speedModifier: 1,        // Movement speed multiplier
  fireRateModifier: 1,     // Fire rate multiplier from skin
  coinDropModifier: 1,     // Coin drop multiplier from skin
  damageModifier: 1,       // Damage multiplier from skin
  upgrades: {
    fireRate: 1,
    damage: 1,
    armor: 0,
    ammoCapacity: 0,
    coinMultiplier: 1
  },
  // ========== ANGEL PROTECTION SYSTEM ==========
  angelProtectionActive: false,
  angelProtectionTimer: 0,
  angelProtectionLevel: 0,  // 0=none, 1=basic, 2=enhanced, 3=divine
  // Holy Bible Weapon
  hasBibleWeapon: false,
  bibleAmmo: 0,
  bibleMaxAmmo: 10,
  // ========== ANTI-CHEAT SYSTEM ==========
  _sessionId: Math.random().toString(36).substr(2, 16),
  _gameStartTime: Date.now(),
  _lastScoreTime: Date.now(),
  _scoreHistory: [],
  _maxScorePerMinute: 2000,  // Max legitimate score per minute
  _flaggedActivity: 0,
  _verified: false,
  // ========== BADGE SYSTEM ==========
  badges: [],
  badgesEarned: [],
  // ========== YOUTH ENGAGEMENT ==========
  referrals: 0,
  shareCount: 0,
  dailyLoginStreak: 0,
  lastLoginDate: null,
  bonusCoinsEarned: 0
};

// ========== ANGEL PROTECTION TIERS ==========
const ANGEL_PROTECTION = {
  1: { name: 'Guardian Angel', cost: 50, duration: 30, turdBlock: 0.5, damageReduction: 0.25, description: 'Blocks 50% turds, 25% damage reduction' },
  2: { name: 'Warrior Angel', cost: 100, duration: 45, turdBlock: 0.75, damageReduction: 0.50, description: 'Blocks 75% turds, 50% damage reduction' },
  3: { name: 'Divine Shield', cost: 200, duration: 60, turdBlock: 1.0, damageReduction: 0.75, description: 'Blocks ALL turds, 75% damage reduction' }
};

// ========== ANTI-CHEAT SYSTEM ==========
const AntiCheat = {
  // Encryption key (rotates each session)
  _k: btState._sessionId,
  
  // Hash function for score verification
  hash: function(score, kills, time) {
    const str = `${score}-${kills}-${time}-${this._k}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  },
  
  // Validate score increment
  validateScore: function(newScore, oldScore, action) {
    const now = Date.now();
    const timeDiff = (now - btState._lastScoreTime) / 1000;
    const scoreDiff = newScore - oldScore;
    
    // Check for impossible score jumps
    if (scoreDiff > 1000 && timeDiff < 1) {
      btState._flaggedActivity++;
      console.warn('Anti-cheat: Suspicious score jump detected');
      return false;
    }
    
    // Track score history
    btState._scoreHistory.push({
      score: scoreDiff,
      time: now,
      action: action
    });
    
    // Keep only last 100 entries
    if (btState._scoreHistory.length > 100) {
      btState._scoreHistory.shift();
    }
    
    // Calculate score rate
    const recentHistory = btState._scoreHistory.filter(h => now - h.time < 60000);
    const recentScore = recentHistory.reduce((sum, h) => sum + h.score, 0);
    
    if (recentScore > btState._maxScorePerMinute) {
      btState._flaggedActivity++;
      console.warn('Anti-cheat: Score rate exceeded');
      return false;
    }
    
    btState._lastScoreTime = now;
    return true;
  },
  
  // Verify game session integrity
  verifySession: function() {
    const gameTime = (Date.now() - btState._gameStartTime) / 1000;
    const expectedMinScore = btState.kills * 5; // Minimum expected from kills
    const expectedMaxScore = btState.kills * 200 + gameTime * 50; // Maximum reasonable
    
    if (btState.score < expectedMinScore * 0.5 || btState.score > expectedMaxScore * 2) {
      btState._flaggedActivity++;
      return false;
    }
    
    return btState._flaggedActivity < 3;
  },
  
  // Generate verification token for awards
  generateAwardToken: function() {
    if (!this.verifySession()) {
      return null;
    }
    
    const token = {
      sessionId: btState._sessionId,
      score: btState.score,
      kills: btState.kills,
      zombiesAwakened: btState.zombiesAwakened,
      gameTime: Date.now() - btState._gameStartTime,
      hash: this.hash(btState.score, btState.kills, btState._gameStartTime),
      timestamp: Date.now()
    };
    
    return btoa(JSON.stringify(token));
  },
  
  // Validate award eligibility
  validateAwardEligibility: function(awardType) {
    if (!this.verifySession()) {
      return { eligible: false, reason: 'Session integrity check failed' };
    }
    
    const gameTime = (Date.now() - btState._gameStartTime) / 1000 / 60; // minutes
    
    switch(awardType) {
      case 'bible':
        // 50,000 points required, must have played at least 30 minutes
        if (btState.score < 50000) {
          return { eligible: false, reason: 'Score requirement not met (50,000 needed)' };
        }
        if (gameTime < 30) {
          return { eligible: false, reason: 'Minimum play time not met (30 min)' };
        }
        if (btState.kills < 100) {
          return { eligible: false, reason: 'Minimum kills not met (100 needed)' };
        }
        break;
        
      case 'germproof':
        // Weekly top scorer validation
        if (btState.score < 25000) {
          return { eligible: false, reason: 'Score too low for weekly competition' };
        }
        if (gameTime < 15) {
          return { eligible: false, reason: 'Minimum play time not met (15 min)' };
        }
        break;
        
      case 'awakener':
        // 100 zombies awakened
        if (btState.zombiesAwakened < 100) {
          return { eligible: false, reason: `Need ${100 - btState.zombiesAwakened} more zombies awakened` };
        }
        break;
    }
    
    return { eligible: true, token: this.generateAwardToken() };
  }
};

// ========== BADGE SYSTEM ==========
const BADGES = {
  // Gameplay Badges
  first_kill: { id: 'first_kill', name: 'First Blood', icon: '🎯', description: 'Get your first kill', requirement: { kills: 1 }, coins: 10 },
  bird_slayer: { id: 'bird_slayer', name: 'Bird Slayer', icon: '🦅', description: 'Kill 100 birds', requirement: { kills: 100 }, coins: 50 },
  bird_master: { id: 'bird_master', name: 'Bird Master', icon: '👑', description: 'Kill 500 birds', requirement: { kills: 500 }, coins: 200 },
  sharpshooter: { id: 'sharpshooter', name: 'Sharpshooter', icon: '🎯', description: '90% accuracy in a game', requirement: { accuracy: 90 }, coins: 100 },
  
  // Score Badges
  score_1k: { id: 'score_1k', name: 'Getting Started', icon: '⭐', description: 'Score 1,000 points', requirement: { score: 1000 }, coins: 20 },
  score_10k: { id: 'score_10k', name: 'Rising Star', icon: '🌟', description: 'Score 10,000 points', requirement: { score: 10000 }, coins: 75 },
  score_50k: { id: 'score_50k', name: 'Champion', icon: '🏆', description: 'Score 50,000 points', requirement: { score: 50000 }, coins: 250 },
  score_100k: { id: 'score_100k', name: 'Legend', icon: '👑', description: 'Score 100,000 points', requirement: { score: 100000 }, coins: 500 },
  
  // Spiritual Badges
  awakener_10: { id: 'awakener_10', name: 'Soul Sower', icon: '🌱', description: 'Awaken 10 phone zombies', requirement: { zombiesAwakened: 10 }, coins: 30 },
  awakener_50: { id: 'awakener_50', name: 'Soul Winner', icon: '✝️', description: 'Awaken 50 phone zombies', requirement: { zombiesAwakened: 50 }, coins: 100 },
  awakener_100: { id: 'awakener_100', name: 'Soul Awakener', icon: '👼', description: 'Awaken 100 phone zombies', requirement: { zombiesAwakened: 100 }, coins: 300 },
  
  // Level Badges
  level_4: { id: 'level_4', name: 'Adventurer', icon: '🗺️', description: 'Reach Level 4', requirement: { level: 4 }, coins: 40 },
  level_8: { id: 'level_8', name: 'White House Hero', icon: '🏛️', description: 'Reach the White House', requirement: { level: 8 }, coins: 150 },
  
  // Social Badges
  first_share: { id: 'first_share', name: 'Evangelist', icon: '📢', description: 'Share the game once', requirement: { shares: 1 }, coins: 25 },
  super_sharer: { id: 'super_sharer', name: 'Super Sharer', icon: '🌍', description: 'Share 10 times', requirement: { shares: 10 }, coins: 150 },
  
  // Daily Badges
  daily_3: { id: 'daily_3', name: 'Faithful', icon: '📅', description: '3 day login streak', requirement: { streak: 3 }, coins: 30 },
  daily_7: { id: 'daily_7', name: 'Dedicated', icon: '🔥', description: '7 day login streak', requirement: { streak: 7 }, coins: 100 },
  daily_30: { id: 'daily_30', name: 'Devoted', icon: '💎', description: '30 day login streak', requirement: { streak: 30 }, coins: 500 }
};

// Badge checking function
function checkBadges(scene) {
  const earnedBadges = [];
  const storedBadges = JSON.parse(localStorage.getItem('birdturds_badges') || '[]');
  
  for (const [id, badge] of Object.entries(BADGES)) {
    if (storedBadges.includes(id)) continue; // Already earned
    
    let earned = false;
    const req = badge.requirement;
    
    if (req.kills && btState.kills >= req.kills) earned = true;
    if (req.score && btState.score >= req.score) earned = true;
    if (req.accuracy && btState.accuracy >= req.accuracy) earned = true;
    if (req.zombiesAwakened && btState.zombiesAwakened >= req.zombiesAwakened) earned = true;
    if (req.level && btState.currentLevel >= req.level) earned = true;
    if (req.shares && btState.shareCount >= req.shares) earned = true;
    if (req.streak && btState.dailyLoginStreak >= req.streak) earned = true;
    
    if (earned) {
      storedBadges.push(id);
      earnedBadges.push(badge);
      btState.coins += badge.coins;
      btState.bonusCoinsEarned += badge.coins;
    }
  }
  
  localStorage.setItem('birdturds_badges', JSON.stringify(storedBadges));
  
  // Show badge notifications
  earnedBadges.forEach((badge, i) => {
    setTimeout(() => {
      if (scene && scene.showBadgeNotification) {
        scene.showBadgeNotification(badge);
      }
    }, i * 2000);
  });
  
  return earnedBadges;
}

// ========== YOUTH ENGAGEMENT SYSTEM ==========
const YouthEngagement = {
  // Check daily login
  checkDailyLogin: function() {
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem('birdturds_lastLogin');
    
    if (lastLogin !== today) {
      localStorage.setItem('birdturds_lastLogin', today);
      
      // Check if consecutive day
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (lastLogin === yesterday) {
        btState.dailyLoginStreak++;
      } else {
        btState.dailyLoginStreak = 1;
      }
      
      localStorage.setItem('birdturds_streak', btState.dailyLoginStreak.toString());
      
      // Daily login bonus
      const bonus = Math.min(btState.dailyLoginStreak * 5, 50); // 5-50 coins
      btState.coins += bonus;
      btState.bonusCoinsEarned += bonus;
      
      return { isNew: true, streak: btState.dailyLoginStreak, bonus: bonus };
    }
    
    btState.dailyLoginStreak = parseInt(localStorage.getItem('birdturds_streak') || '0');
    return { isNew: false, streak: btState.dailyLoginStreak, bonus: 0 };
  },
  
  // Track share
  trackShare: function(platform) {
    btState.shareCount++;
    localStorage.setItem('birdturds_shares', btState.shareCount.toString());
    
    // Bonus for sharing
    const bonus = 10;
    btState.coins += bonus;
    btState.bonusCoinsEarned += bonus;
    
    return { shareCount: btState.shareCount, bonus: bonus };
  },
  
  // Generate referral code
  generateReferralCode: function() {
    const userId = localStorage.getItem('birdturds_userId') || Math.random().toString(36).substr(2, 8);
    localStorage.setItem('birdturds_userId', userId);
    return `BT-${userId.toUpperCase()}`;
  },
  
  // Youth encouragement messages
  getEncouragementMessage: function() {
    const messages = [
      { text: "🎮 Share this game with friends and earn FREE COINS!", scripture: "Go and make disciples — Matthew 28:19" },
      { text: "📢 Tell your youth group about BirdTurds!", scripture: "Let no one despise your youth — 1 Timothy 4:12" },
      { text: "👨‍👩‍👧‍👦 Play with your family and earn bonus points!", scripture: "Train up a child in the way he should go — Proverbs 22:6" },
      { text: "🏆 Compete with friends for the top spot!", scripture: "Run to win the prize — 1 Corinthians 9:24" },
      { text: "✝️ Every zombie you wake is a soul being reached!", scripture: "He who wins souls is wise — Proverbs 11:30" },
      { text: "🔥 Login daily to build your streak and earn more coins!", scripture: "Be faithful in small things — Luke 16:10" },
      { text: "📖 Earn the Soul Awakener badge - wake 100 zombies!", scripture: "The harvest is plentiful — Matthew 9:37" },
      { text: "🌟 Share on social media and spread the Word!", scripture: "Let your light shine — Matthew 5:16" }
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }
};

// Initialize youth engagement on load
(function initYouthEngagement() {
  const loginResult = YouthEngagement.checkDailyLogin();
  btState.shareCount = parseInt(localStorage.getItem('birdturds_shares') || '0');
})();

// ========== DEMON BOSS CONFIG ==========
// The devil is NOT omnipotent, omniscient, or omnipresent like God!
// "You believe that there is one God. Good! Even the demons believe that—and shudder." - James 2:19
// "The one who is in you is greater than the one who is in the world." - 1 John 4:4
const DEMON_CONFIG = {
  spawnChance: 0.20,       // 20% chance per spawn cycle
  minLevel: 3,             // Demons start appearing at level 3
  speed: 100,              // How fast demon moves (slower, more menacing)
  lieInterval: 2.0,        // Seconds between throwing lies
  health: 8,               // BOSS LEVEL - 8 hits to kill!
  score: 500,              // BIG points for killing demon boss
  lieSpeed: 180,           // How fast lies fall
  lieDamage: 20,           // Damage if lie hits player
  isBoss: true,            // Treat as boss enemy
  coinDrop: 25             // Drops 25 coins when killed!
};

// ========== HOLY BIBLE WEAPON ==========
const BIBLE_WEAPON = {
  cost: 150,               // Cost in coins
  damage: 5,               // Massive damage to demons!
  ammo: 10,                // 10 shots per purchase
  speed: 400,              // Fast projectile
  scriptures: [            // What the Bible bullets display
    "John 3:16", "Romans 8:31", "Psalm 23:4", "Isaiah 54:17",
    "James 4:7", "1 John 4:4", "Ephesians 6:11", "Philippians 4:13",
    "2 Timothy 1:7", "Psalm 91:11", "Romans 8:37", "Joshua 1:9"
  ]
};

// ========== GOD vs DEVIL - THE TRUTH ==========
// Scripture proving God's supremacy over Satan:
const GOD_VS_DEVIL_SCRIPTURES = [
  // God is OMNIPOTENT (all-powerful) - Satan is LIMITED
  { verse: "With God all things are possible.", ref: "Matthew 19:26", truth: "God is omnipotent" },
  { verse: "The devil prowls around like a roaring lion... but resist him, firm in faith.", ref: "1 Peter 5:8-9", truth: "Satan is limited" },
  
  // God is OMNISCIENT (all-knowing) - Satan is NOT
  { verse: "Great is our Lord and mighty in power; His understanding has no limit.", ref: "Psalm 147:5", truth: "God knows all" },
  { verse: "The Lord knows the thoughts of man.", ref: "Psalm 94:11", truth: "Only God reads hearts" },
  
  // God is OMNIPRESENT (everywhere) - Satan is NOT
  { verse: "Where can I go from Your Spirit? Where can I flee from Your presence?", ref: "Psalm 139:7", truth: "God is everywhere" },
  { verse: "The devil... was seeking someone to devour.", ref: "1 Peter 5:8", truth: "Satan must seek - he's not omnipresent" },
  
  // God is ETERNAL VICTOR
  { verse: "The God of peace will soon crush Satan under your feet.", ref: "Romans 16:20", truth: "Satan's defeat is certain" },
  { verse: "And the devil... was thrown into the lake of fire.", ref: "Revelation 20:10", truth: "Satan's end is sealed" }
];

// Demon lie messages (what the lies say when thrown)
const DEMON_LIES = [
  "You can't win!", "Give up now!", "Trump lost!", "You're weak!",
  "Surrender!", "No hope!", "Fake news!", "You'll fail!",
  "It's over!", "Impossible!", "Too hard!", "Why try?",
  "God forgot you!", "You're alone!", "No one cares!", "Just quit!"
];

// Parachuter ally messages
const parachuterMessages = [
  "🪂 ALLY DEPLOYED!", "🪂 BACKUP ARRIVED!", "🪂 FRIENDLY INBOUND!",
  "🪂 REINFORCEMENTS!", "🪂 WINGMAN DROPPING!", "🪂 HELP IS HERE!"
];

// Weapon pickup messages
const weaponPickupMessages = [
  "🏹 BOW ACQUIRED!", "🏹 GOT A BOW!", "🏹 ARROWS READY!",
  "⚔️ CROSSBOW FOUND!", "⚔️ CROSSBOW LOADED!", "⚔️ BOLTS READY!"
];

// ========== SCRIPTURE COLLECTIONS ==========
// Power over darkness - when demons appear
const DEMON_SCRIPTURES = [
  { verse: "Submit to God. Resist the devil and he will flee from you.", ref: "James 4:7" },
  { verse: "Greater is He that is in you than he that is in the world.", ref: "1 John 4:4" },
  { verse: "The light shines in the darkness, and the darkness has not overcome it.", ref: "John 1:5" },
  { verse: "For God has not given us a spirit of fear, but of power and love.", ref: "2 Timothy 1:7" },
  { verse: "No weapon formed against you shall prosper.", ref: "Isaiah 54:17" },
  { verse: "The Lord is my light and my salvation—whom shall I fear?", ref: "Psalm 27:1" },
  { verse: "Be strong and courageous. Do not be afraid; the Lord is with you.", ref: "Joshua 1:9" },
  { verse: "I have given you authority to trample on snakes and scorpions.", ref: "Luke 10:19" },
  { verse: "Put on the full armor of God to stand against the devil's schemes.", ref: "Ephesians 6:11" },
  { verse: "The God of peace will soon crush Satan under your feet.", ref: "Romans 16:20" }
];

// Angel protection - God's love and protection
const ANGEL_SCRIPTURES = [
  { verse: "For He will command His angels to guard you in all your ways.", ref: "Psalm 91:11" },
  { verse: "If God is for us, who can be against us?", ref: "Romans 8:31" },
  { verse: "The angel of the Lord encamps around those who fear Him.", ref: "Psalm 34:7" },
  { verse: "Are not all angels ministering spirits sent to serve?", ref: "Hebrews 1:14" },
  { verse: "He will cover you with His feathers; under His wings you will find refuge.", ref: "Psalm 91:4" },
  { verse: "The Lord is my shepherd; I shall not want.", ref: "Psalm 23:1" },
  { verse: "God is our refuge and strength, an ever-present help in trouble.", ref: "Psalm 46:1" },
  { verse: "Cast all your anxiety on Him because He cares for you.", ref: "1 Peter 5:7" }
];

// God's love for sinners - Jesus came for the lost
const LOVE_SCRIPTURES = [
  { verse: "For God so loved the world that He gave His only Son.", ref: "John 3:16" },
  { verse: "God demonstrates His love: while we were sinners, Christ died for us.", ref: "Romans 5:8" },
  { verse: "I have not come to call the righteous, but sinners to repentance.", ref: "Luke 5:32" },
  { verse: "There is more rejoicing in heaven over one sinner who repents.", ref: "Luke 15:7" },
  { verse: "Come to me, all who are weary, and I will give you rest.", ref: "Matthew 11:28" },
  { verse: "Neither do I condemn you. Go and sin no more.", ref: "John 8:11" },
  { verse: "The Son of Man came to seek and save the lost.", ref: "Luke 19:10" },
  { verse: "God is love. Whoever lives in love lives in God.", ref: "1 John 4:16" }
];

// Warrior scriptures - stand for truth, fight the good fight
const WARRIOR_SCRIPTURES = [
  { verse: "Fight the good fight of the faith.", ref: "1 Timothy 6:12" },
  { verse: "Be watchful, stand firm in the faith, act like men, be strong.", ref: "1 Corinthians 16:13" },
  { verse: "The Lord is a warrior; the Lord is His name.", ref: "Exodus 15:3" },
  { verse: "Be strong in the Lord and in His mighty power.", ref: "Ephesians 6:10" },
  { verse: "Do not be overcome by evil, but overcome evil with good.", ref: "Romans 12:21" },
  { verse: "Stand firm then, with the belt of truth buckled around your waist.", ref: "Ephesians 6:14" },
  { verse: "The weapons we fight with are not of this world.", ref: "2 Corinthians 10:4" },
  { verse: "Have I not commanded you? Be strong and courageous!", ref: "Joshua 1:9" },
  { verse: "Through God we will do valiantly.", ref: "Psalm 60:12" },
  { verse: "The righteous are as bold as a lion.", ref: "Proverbs 28:1" }
];

// Victory scriptures - when defeating demons/completing levels
const VICTORY_SCRIPTURES = [
  { verse: "Thanks be to God! He gives us the victory through our Lord Jesus Christ.", ref: "1 Corinthians 15:57" },
  { verse: "In all these things we are more than conquerors through Him who loved us.", ref: "Romans 8:37" },
  { verse: "This is the victory that has overcome the world—our faith.", ref: "1 John 5:4" },
  { verse: "The Lord your God is with you, the Mighty Warrior who saves.", ref: "Zephaniah 3:17" },
  { verse: "I can do all things through Christ who strengthens me.", ref: "Philippians 4:13" },
  { verse: "The battle is not yours, but God's.", ref: "2 Chronicles 20:15" }
];

// Encouragement scriptures - random popup during gameplay
const ENCOURAGEMENT_SCRIPTURES = [
  { verse: "A cheerful heart is good medicine.", ref: "Proverbs 17:22" },
  { verse: "The joy of the Lord is your strength.", ref: "Nehemiah 8:10" },
  { verse: "Be joyful in hope, patient in affliction, faithful in prayer.", ref: "Romans 12:12" },
  { verse: "Rejoice always, pray continually, give thanks in all circumstances.", ref: "1 Thessalonians 5:16-18" },
  { verse: "Do not be anxious about anything, but in everything by prayer.", ref: "Philippians 4:6" },
  { verse: "Trust in the Lord with all your heart.", ref: "Proverbs 3:5" },
  { verse: "Delight yourself in the Lord and He will give you the desires of your heart.", ref: "Psalm 37:4" },
  { verse: "For I know the plans I have for you, declares the Lord.", ref: "Jeremiah 29:11" },
  { verse: "The Lord is good, a refuge in times of trouble.", ref: "Nahum 1:7" },
  { verse: "Blessed are those who hunger and thirst for righteousness.", ref: "Matthew 5:6" }
];

// Funny random exclamations when hit by turd
const turdExclamations = [
  // Original
  "SPLAT! 💩", "OH NO! 💩", "GROSS! 🤢", "YUCK! 😱", "NOT AGAIN! 💩",
  "RIGHT IN THE FACE! 😫", "BIRD DOWN! ...on you! 💩", "INCOMING! 💩",
  "THAT'S FOWL PLAY! 🐔💩", "DIRECT HIT! 💩", "TURD ALERT! 🚨",
  "SPLASHDOWN! 💦💩", "BULLSEYE! (the bad kind) 🎯💩", "UGHHH! 🤮",
  // NEW - Holy exclamations
  "HOLY TURDS! 💩✝️", "SWEET MOTHER OF TURDS! 💩", "HOLY GUACAMOLE... wait that's turd! 💩",
  "JESUS TAKE THE... TURD?! 💩", "LORD HAVE MERCY! 💩", "HOLY COW... POO! 🐄💩",
  // NEW - Amazement
  "WOULD YA LOOK AT ALL THESE TURDS! 💩💩💩", "TURD CITY OVER HERE! 🏙️💩",
  "IT'S RAININ' TURDS! ☔💩", "TURD-NADO! 🌪️💩", "THE TURDS ARE COMIN'! 💩",
  "TURD STORM INCOMING! ⛈️💩", "THEY'RE EVERYWHERE! 💩💩",
  // NEW - Cowboy style
  "WELL BUTTER MY BISCUIT... IN TURD! 💩", "DAG NABBIT! 💩", "TARNATION! 💩",
  "WHAT IN TURD-NATION?! 💩", "AW SHUCKS... LITERALLY! 💩", "CONSARNIT! 💩",
  // NEW - Military style
  "TURD INCOMING! TAKE COVER! 🛡️💩", "HOSTILE TURD! 💩", "TURD AT 12 O'CLOCK! ⏰💩",
  "WE'RE TAKING TURD FIRE! 💩", "MAN DOWN... IN TURD! 💩",
  // NEW - Dramatic
  "NOOOOO! 💩", "WHY MEEEE?! 💩", "THIS IS THE WORST DAY! 💩",
  "I DIDN'T SIGN UP FOR THIS! 💩", "THEY GOT ME! 💩", "TURD ATTACK! 💩",
  // NEW - Funny observations
  "THAT BIRD HAD TACO BELL! 🌮💩", "SOMEONE HAD FIBER! 💩", "BIG TURD ENERGY! 💩",
  "THAT'S A CHONKER! 💩", "SIZE XL TURD! 💩", "PREMIUM ORGANIC TURD! 💩",
  // NEW - Swamp style
  "SWAMP MISSILE! 💩", "BAYOU BOMB! 💩", "GATOR BAIT... I MEAN TURD! 💩",
  // NEW - Texas style
  "EVERYTHING'S BIGGER IN TEXAS... INCLUDING TURDS! 💩", "YEEHAW... NOT! 💩",
  // NEW - Exclamations
  "SPLAT ATTACK! 💩", "TURD TORPEDO! 💩", "POOP PROJECTILE! 💩",
  "DOOKIE DELIVERY! 📦💩", "SPECIAL DELIVERY! 💩", "AIR MAIL FROM HELL! ✉️💩"
];

// Funny messages when shaking off
const shakeMessages = [
  "SHAKE IT OFF! 💃", "EWWW BEGONE! 🙅", "TURD-B-GONE! ✨", "SHAKE SHAKE SHAKE! 🕺",
  "NOT TODAY TURD! 🚫💩", "BYEBYE BIRD BOMBS! 👋", "CLEANED UP! 🧹",
  // NEW
  "GET OFF ME! 💩", "SHAKIN' THE TURDS! 💃", "FRESH AND CLEAN! ✨",
  "TURD FREE ZONE! 🚫💩", "BACK TO FRESH! 🌸", "SMELL YA LATER! 👃💩"
];

// Funny animal encounter messages
const animalMessages = {
  bear: ["BEAR DOWN! 🐻", "THAT'S UNBEARABLE! 🐻", "BEAR WITH ME! 🐻"],
  wolf: ["HOWL YOU DOIN'? 🐺", "WOLF DOWN! 🐺", "THAT'S RUFF! 🐺"],
  cougar: ["COUGAR ALERT! 🦁", "CAT-ASTROPHE! 🐱", "PURRFECT SHOT! 🎯"],
  deer: ["OH DEER! 🦌", "DEER ME! 🦌", "FAWN-TASTIC! 🦌"],
  dog: ["BAD DOG! 🐕", "GOOD BOY... NOT! 🐶", "RUFF DAY! 🐕"],
  elk: ["ELK-CELLENT! 🦌", "WHAT THE ELK! 🦌", "ELK YEAH! 🦌"]
};

// Storm/Lightning messages
const stormMessages = [
  "⛈️ STORM INCOMING!", "🌩️ LIGHTNING APPROACHING!", "⚡ TAKE COVER!",
  "🌧️ STORM CLOUDS GATHERING!", "⛈️ SEEK SHELTER!", "🌩️ WATCH THE SKIES!"
];

// ========== WOKE TURD GLOBALISTS - DRAIN THE SWAMP! ==========
// 4 Globalist types - ALL EQUAL POINTS (500 pts, 25 coins)
// ARRESTABLE - Press E to arrest and send to JAIL!
// "No weapon formed against you shall prosper" - Isaiah 54:17

const WOKE_GLOBALIST_TYPES = [
  // Type 1: The Syringe Pusher - Blue vest, glasses, syringe, papers
  { 
    type: 1, 
    title: "Syringe Pusher", 
    points: 500, 
    coins: 25, 
    speed: 42,
    walkFrames: 4,
    throwFrames: 4,
    arrestedFrames: 3,
    hasSyringePush: true,
    quotes: ["Trust the science!", "Take your medicine!", "It's for your own good!", "Just one more shot!"]
  },
  // Type 2: The Suit - Dark suit, red tie, smug politician walk
  { 
    type: 2, 
    title: "The Suit", 
    points: 500, 
    coins: 25, 
    speed: 45,
    walkFrames: 12,
    throwFrames: 4,
    arrestedFrames: 3,
    quotes: ["Hope and change!", "Yes we can!", "You didn't build that!", "Elections have consequences!"]
  },
  // Type 3: The Phone Addict - Blue pantsuit, phone in hand, yellow earrings
  { 
    type: 3, 
    title: "Phone Addict", 
    points: 500, 
    coins: 25, 
    speed: 48,
    walkFrames: 4,
    throwFrames: 4,
    arrestedFrames: 3,
    quotes: ["Delete those emails!", "What difference does it make?!", "I'm with her!", "Deplorables everywhere!"]
  },
  // Type 4: The Hoodie - Black hoodie, jeans, sad/angry look
  { 
    type: 4, 
    title: "The Hoodie", 
    points: 500, 
    coins: 25, 
    speed: 40,
    walkFrames: 4,
    throwFrames: 4,
    arrestedFrames: 3,
    quotes: ["Censor everything!", "That's misinformation!", "Trust the fact checkers!", "You're banned!"]
  }
];

// Scripture quotes about standing against evil
const SPIRITUAL_WARFARE_SCRIPTURES = [
  { verse: "No weapon formed against you shall prosper.", ref: "Isaiah 54:17" },
  { verse: "Submit to God. Resist the devil and he will flee from you.", ref: "James 4:7" },
  { verse: "Put on the full armor of God to stand against the devil's schemes.", ref: "Ephesians 6:11" },
  { verse: "The Lord is my light and my salvation—whom shall I fear?", ref: "Psalm 27:1" },
  { verse: "If God is for us, who can be against us?", ref: "Romans 8:31" },
  { verse: "Greater is He that is in you than he that is in the world.", ref: "1 John 4:4" },
  { verse: "Be strong in the Lord and in His mighty power.", ref: "Ephesians 6:10" },
  { verse: "The God of peace will soon crush Satan under your feet.", ref: "Romans 16:20" },
  { verse: "We are more than conquerors through Him who loved us.", ref: "Romans 8:37" },
  { verse: "Fight the good fight of the faith.", ref: "1 Timothy 6:12" },
  { verse: "The battle is not yours, but God's.", ref: "2 Chronicles 20:15" },
  { verse: "Stand firm then, with the belt of truth buckled around your waist.", ref: "Ephesians 6:14" }
];

// DEMON FLEE SCRIPTURES - Shown when demons are defeated!
const DEMON_FLEE_SCRIPTURES = [
  { verse: "Resist the devil, and he will flee from you.", ref: "James 4:7" },
  { verse: "The God of peace will soon crush Satan under your feet.", ref: "Romans 16:20" },
  { verse: "Greater is He that is in you than he that is in the world.", ref: "1 John 4:4" },
  { verse: "They overcame him by the blood of the Lamb and by the word of their testimony.", ref: "Revelation 12:11" },
  { verse: "The devil prowls around like a roaring lion, but resist him, standing firm in the faith.", ref: "1 Peter 5:8-9" },
  { verse: "I have given you authority to trample on snakes and scorpions and over all the power of the enemy.", ref: "Luke 10:19" },
  { verse: "The reason the Son of God appeared was to destroy the devil's work.", ref: "1 John 3:8" },
  { verse: "Be strong in the Lord and in his mighty power.", ref: "Ephesians 6:10" },
  { verse: "In all things we are more than conquerors through Him who loved us.", ref: "Romans 8:37" },
  { verse: "For our struggle is not against flesh and blood, but against the spiritual forces of evil.", ref: "Ephesians 6:12" },
  { verse: "The Lord will rescue me from every evil attack and bring me safely to His heavenly kingdom.", ref: "2 Timothy 4:18" },
  { verse: "Put on the full armor of God, so that you can take your stand against the devil's schemes.", ref: "Ephesians 6:11" },
  { verse: "You, dear children, are from God and have overcome them.", ref: "1 John 4:4" },
  { verse: "Thanks be to God! He gives us the victory through our Lord Jesus Christ.", ref: "1 Corinthians 15:57" }
];

// SHOP ITEM: Silent Mode - No comments, jokes, or scriptures
const SHOP_SILENT_MODE = {
  name: "Silent Mode",
  description: "Play without comments, jokes, or scripture popups",
  cost: 500, // 500 TurdCoins
  id: "silent_mode"
};

// Generic globalist quotes
const GLOBALIST_QUOTES = [
  "You'll own nothing and like it!",
  "The Great Reset is coming!",
  "Trust the experts!",
  "It's for your own good!",
  "We know what's best!",
  "Borders are outdated!",
  "Nationalism is evil!",
  "Obey the science!",
  "Diversity is our strength!",
  "Check your privilege!",
  "That's misinformation!",
  "You need re-education!",
  "Comply or else!",
  "Free speech is dangerous!",
  "We're the good guys!",
  "Think globally!",
  "Your carbon footprint!",
  "Eat the bugs!",
  "Digital ID for all!",
  "One world government!"
];

// Quotes when globalist is ARRESTED
const ARREST_QUOTES = [
  "GOTCHA GLOBALIST!", "SWAMP CREATURE CAUGHT!", "DRAINING THE SWAMP!",
  "PATRIOT POWER!", "OFF TO JAIL!", "NO ESCAPE!",
  "AMERICA FIRST!", "FREEDOM WINS!", "CAUGHT RED-HANDED!",
  "CLEANING UP DC!", "TAKE THAT GLOBALIST!", "LOCKED UP!",
  "NO WEAPON SHALL PROSPER!", "RESIST THE DEVIL!", "TRUTH PREVAILS!"
];

// Villain spawn config - GLOBALISTS AT SWAMP, DEMONS AT WHITE HOUSE!
const VILLAIN_CONFIG = {
  minLevel: 7,           // Globalists start appearing at THE SWAMP (level 7)
  arrestRange: 100,      // Pixels - how close to press E to arrest
  escapeTime: 25,        // Seconds before they escape off screen
  // Level-based multipliers - SWAMP HAS GLOBALISTS, WHITE HOUSE HAS DEMONS!
  levelMultipliers: {
    1: { chance: 0, interval: 999 },      // No globalists
    2: { chance: 0, interval: 999 },      // No globalists  
    3: { chance: 0, interval: 999 },      // No globalists
    4: { chance: 0, interval: 999 },      // No globalists
    5: { chance: 0, interval: 999 },      // No globalists
    6: { chance: 0, interval: 999 },      // No globalists
    7: { chance: 0.85, interval: 2.5 },   // THE SWAMP - 85% every 2.5 sec! GLOBALISTS!
    8: { chance: 0.15, interval: 10 }     // White House - few stragglers (demons are main enemy here)
  }
};

// DEMON spawn config - DEMONS AT WHITE HOUSE!
const DEMON_WHITEHOUSE_CONFIG = {
  spawnChance: 0.70,     // 70% chance per spawn cycle at White House
  spawnInterval: 4,      // Every 4 seconds
  maxDemons: 5,          // Max demons at once per hunter
  damagePerHit: 15       // Damage when demon hits player
};

// Swamp level special messages
const SWAMP_MESSAGES = [
  "DRAIN THE SWAMP!",
  "WOKE TURD GLOBALISTS EVERYWHERE!",
  "STOP THEM FROM REACHING THE WHITE HOUSE!",
  "CLEAN UP THESE WOKE TURDS!",
  "HELP THE TEAM DRAIN THE SWAMP!",
  "ARREST THEM ALL FOR BIG POINTS!",
  "KEEP THE GLOBALISTS OUT!",
  "PROTECT THE WHITE HOUSE!",
  "THE SWAMP CREATURES ARE COMING!",
  "DRAIN IT! DRAIN IT! DRAIN IT!"
];

// White House special messages
const WHITEHOUSE_SWAMP_MESSAGES = [
  "STRAGGLERS FROM THE SWAMP!",
  "THEY MADE IT PAST THE SWAMP!",
  "FINISH DRAINING THE SWAMP!",
  "PROTECT TRUMP!",
  "LAST OF THE GLOBALISTS!",
  "CLEAN HOUSE LITERALLY!"
];

const lightningHitMessages = [
  "⚡ ZAP!", "⚡ SHOCKING!", "⚡ ELECTRIFYING!", "⚡ THUNDERSTRUCK!"
];

// Funny comments when shooting SHOOTABLE birds (celebrate!)
const shootableBirdKillMessages = [
  "Way to shoot that turder! 💩", "That bird had it coming! 🎯", "Bye bye birdie! 👋",
  "BOOM! Feathers everywhere! 💥", "That's what you get for turding! 💩",
  "No more turds from that one! 🚫💩", "Turd machine DESTROYED! 🔥",
  "Another turder bites the dust! 🎵", "Fowl play? More like FAIR play! 🎯",
  "That bird won't turd again! 🎯", "SPLAT goes the turder! 💩",
  "One less turd in the sky! ☁️", "That's for all the car washes! 🚗",
  "Revenge is sweet! 🍬", "Target eliminated! 🎯",
  "That bird was full of... well, you know! 💩", "Feather duster! 🧹",
  "You showed that turder! 👊", "Nice shot, hunter! 🏆",
  "That bird was asking for it! 😤", "KABOOM! No more turds! 💥",
  "Bird down! Turd count: -1! 📉", "You're on FIRE! 🔥",
  "The turder has been terminated! 🤖", "Clean shot! Dirty bird! 💩"
];

// Funny comments when shooting PROTECTED birds (scold player!)
const protectedBirdHitMessages = [
  "Dude, that bird was your FRIEND! 😱", "Whoa! That one helps YOU! 🦅",
  "Wrong bird, genius! 🙄", "That eagle was on YOUR side! 😤",
  "Are you TRYING to lose?! 🤦", "That's a HELPER bird! Read the rules! 📖",
  "Friendly fire! NOT cool! 😠", "That bird eats turders FOR you! 🍽️",
  "Bro, that's an ALLY! 🤝", "Eagles are FRIENDS not FOOD! 🦅",
  "That hawk was helping you! 🦅", "You just shot your wingman! ✈️",
  "That bird was MVP! Now YOU'RE not! 😅", "Protected species, dude! 🚫",
  "That's like shooting your own goalie! ⚽", "The EPA is NOT happy! 🌿",
  "Conservation officers incoming! 🚔", "That bird had a FAMILY! 😢",
  "Bad hunter! No cookie! 🍪🚫", "You monster! 👹",
  "That eagle did nothing to you! 😭", "Read the bird guide! 📚"
];

// Protected park zone messages
const protectedParkMessages = [
  "🏞️ NO HUNTING ZONE! -100 pts!", "🚫 This is a WILDLIFE SANCTUARY!",
  "🌲 Protected area! Put the gun DOWN!", "🏞️ Can't shoot here, ranger's watching!",
  "🚔 GAME WARDEN ALERT! -100 pts!", "🌿 Nature preserve! No shooting!",
  "🦌 The animals here are PROTECTED!", "📋 That'll be a $100 fine, hunter!"
];

// Tractor/Vehicle tire shooting messages
const tireShotMessages = [
  "🎯 FLAT TIRE! Tractor stopped!", "💨 PSSSHHH! Nice shot!", 
  "🔧 That farmer's gonna be MAD!", "🚜 Tractor DOWN!", 
  "💥 TIRE BLOWOUT! You showed that tractor!", "🛞 Wheel deal! +15 pts!",
  "🎯 Bullseye on the rubber!", "🚜 Tractor trouble! Haha!",
  "💨 Air goes WHOOSH!", "🛞 That tire had a family! Just kidding!"
];

// Wind/Tornado messages
const windMessages = [
  "🌪️ TORNADO INCOMING!", "💨 WIND PICKING UP!", "🌀 TWISTER APPROACHING!",
  "💨 Hold onto your hat!", "🌪️ Birds getting blown away!"
];

const tornadoKillMessages = [
  "🌪️ SWEPT AWAY!", "💨 BLOWN TO BITS!", "🌀 TWISTER TAKEDOWN!",
  "💨 Wind did the work!", "🌪️ Nature's cleanup crew!"
];

// Bird species configuration
const speciesConfig = {
  // SHOOTABLE - COMMON HUNTED BIRDS (positive points)
  duck: { sprite: 'duck', shootable: true, score: 10, turdRate: 0.35, speed: 120, coinDrop: 2, size: 0.06 },
  mallard: { sprite: 'duck', shootable: true, score: 12, turdRate: 0.35, speed: 115, coinDrop: 2, size: 0.06 },
  goose: { sprite: 'goose', shootable: true, score: 12, turdRate: 0.35, speed: 110, coinDrop: 3, size: 0.07 },
  canadagoose: { sprite: 'goose', shootable: true, score: 14, turdRate: 0.40, speed: 105, coinDrop: 3, size: 0.07 },
  chicken: { sprite: 'chicken', shootable: true, score: 8, turdRate: 0.30, speed: 90, coinDrop: 1, size: 0.05 },
  pigeon: { sprite: 'pigeon', shootable: true, score: 8, turdRate: 0.30, speed: 100, coinDrop: 1, size: 0.04 },
  turkey: { sprite: 'turkey', shootable: true, score: 15, turdRate: 0.40, speed: 85, coinDrop: 4, size: 0.07 },
  wildturkey: { sprite: 'turkey', shootable: true, score: 18, turdRate: 0.45, speed: 80, coinDrop: 5, size: 0.08 },
  seagull: { sprite: 'seagull', shootable: true, score: 12, turdRate: 0.45, speed: 130, coinDrop: 2, size: 0.05 },
  magpie: { sprite: 'magpie', shootable: true, score: 10, turdRate: 0.35, speed: 125, coinDrop: 2, size: 0.04 },
  crow: { sprite: 'crow', shootable: true, score: 6, turdRate: 0.30, speed: 115, coinDrop: 1, size: 0.04 },
  raven: { sprite: 'crow', shootable: true, score: 8, turdRate: 0.32, speed: 110, coinDrop: 1, size: 0.05 },
  vulture: { sprite: 'vulture', shootable: true, score: 14, turdRate: 0.35, speed: 95, coinDrop: 3, size: 0.07 },
  owl: { sprite: 'owl', shootable: true, score: 10, turdRate: 0.25, speed: 80, coinDrop: 2, size: 0.05, nightOnly: true },
  
  // SHOOTABLE - UPLAND GAME BIRDS
  pheasant: { sprite: 'pheasant', shootable: true, score: 20, turdRate: 0.30, speed: 100, coinDrop: 5, size: 0.06 },
  quail: { sprite: 'quail', shootable: true, score: 8, turdRate: 0.20, speed: 140, coinDrop: 2, size: 0.03 },
  grouse: { sprite: 'grouse', shootable: true, score: 15, turdRate: 0.25, speed: 95, coinDrop: 4, size: 0.05 },
  partridge: { sprite: 'partridge', shootable: true, score: 12, turdRate: 0.25, speed: 105, coinDrop: 3, size: 0.04 },
  dove: { sprite: 'dove', shootable: true, score: 10, turdRate: 0.20, speed: 135, coinDrop: 2, size: 0.04 },
  woodcock: { sprite: 'woodcock', shootable: true, score: 14, turdRate: 0.22, speed: 90, coinDrop: 3, size: 0.04 },
  snipe: { sprite: 'snipe', shootable: true, score: 12, turdRate: 0.20, speed: 145, coinDrop: 3, size: 0.03 },
  
  // SHOOTABLE - WATERFOWL
  teal: { sprite: 'teal', shootable: true, score: 10, turdRate: 0.30, speed: 140, coinDrop: 2, size: 0.05 },
  pintail: { sprite: 'pintail', shootable: true, score: 12, turdRate: 0.32, speed: 125, coinDrop: 3, size: 0.05 },
  woodduck: { sprite: 'woodduck', shootable: true, score: 14, turdRate: 0.30, speed: 120, coinDrop: 3, size: 0.05 },
  
  // HELPERS - Attack shootables, DROP COINS not turds! (DON'T SHOOT!)
  baldeagle: { sprite: 'baldeagle', shootable: false, helper: true, score: -50, turdRate: 0, coinDropRate: 0.15, speed: 150, size: 0.08 },
  goldeneagle: { sprite: 'goldeneagle', shootable: false, helper: true, score: -50, turdRate: 0, coinDropRate: 0.15, speed: 145, size: 0.07 },
  hawk: { sprite: 'hawk', shootable: false, helper: true, score: -30, turdRate: 0, coinDropRate: 0.12, speed: 140, size: 0.06 },
  falcon: { sprite: 'falcon', shootable: false, helper: true, score: -40, turdRate: 0, coinDropRate: 0.12, speed: 180, size: 0.05 },
  osprey: { sprite: 'osprey', shootable: false, helper: true, score: -35, turdRate: 0, coinDropRate: 0.12, speed: 135, size: 0.06 },
  
  // PROTECTED - Negative if shot
  parrot: { sprite: 'parrot', shootable: false, score: -20, turdRate: 0.25, speed: 115, size: 0.05 },
  peacock: { sprite: 'peacock', shootable: false, score: -25, turdRate: 0.25, speed: 80, size: 0.08 },
  pelican: { sprite: 'pelican', shootable: false, score: -20, turdRate: 0.30, speed: 95, size: 0.07 },
  stork: { sprite: 'stork', shootable: false, score: -20, turdRate: 0.25, speed: 105, size: 0.07 },
  flamingo: { sprite: 'flamingo', shootable: false, score: -20, turdRate: 0.25, speed: 90, size: 0.07 },
  heron: { sprite: 'heron', shootable: false, score: -20, turdRate: 0.25, speed: 85, size: 0.08 },
  crane: { sprite: 'crane', shootable: false, score: -25, turdRate: 0.25, speed: 95, size: 0.08 },
  swan: { sprite: 'swan', shootable: false, score: -30, turdRate: 0.30, speed: 100, size: 0.07 },
  dodo: { sprite: 'dodo', shootable: false, score: -30, turdRate: 0.40, speed: 70, size: 0.06 },
  toucan: { sprite: 'toucan', shootable: false, score: -15, turdRate: 0.25, speed: 100, size: 0.05 },
  penguin: { sprite: 'penguin', shootable: false, score: -20, turdRate: 0.20, speed: 60, size: 0.06, groundBird: true },
  
  // NIGHT ONLY
  bat: { sprite: 'bat', shootable: false, score: -15, turdRate: 0.10, speed: 160, nightOnly: true, coinDrop: 0, size: 0.04, protected: true },
  
  // BOSS BIRDS (rare spawns - big rewards!)
  pterodactyl: { sprite: 'pterodactyl', shootable: true, score: 100, turdRate: 0.50, speed: 180, coinDrop: 25, size: 0.12, health: 5, boss: true },
  phoenix: { sprite: 'phoenix', shootable: true, score: 150, turdRate: 0.40, speed: 200, coinDrop: 50, size: 0.10, health: 3, respawns: true, boss: true },
  dragon: { sprite: 'dragon', shootable: true, score: 500, turdRate: 0.60, speed: 120, coinDrop: 100, size: 0.15, health: 10, boss: true },
  thunderbird: { sprite: 'thunderbird', shootable: true, score: 300, turdRate: 0.55, speed: 160, coinDrop: 75, size: 0.13, health: 8, boss: true }
};

// Ground animals
const groundAnimals = {
  deer: { sprite: 'deer', speed: 80, dangerous: false, penalty: -15, canCharge: true, chargeDamage: 15 },
  elk: { sprite: 'elk', speed: 70, dangerous: false, penalty: -25, canCharge: true, chargeDamage: 20 },
  bear: { sprite: 'bear', speed: 60, dangerous: true, points: 25, coins: 5 },
  cougar: { sprite: 'cougar', speed: 100, dangerous: true, points: 20, coins: 4 },
  wolf: { sprite: 'wolf', speed: 90, dangerous: true, points: 15, coins: 3 },
  dog: { sprite: 'dog', speed: 70, dangerous: false, penalty: -30 },
  cat: { sprite: 'cat', speed: 50, dangerous: false, penalty: -25 },
  rabbit: { sprite: 'rabbit', speed: 120, dangerous: false, penalty: -15 },
  fox: { sprite: 'fox', speed: 85, dangerous: false, penalty: -15 },
  skunk: { sprite: 'skunk', speed: 40, dangerous: false, penalty: -10 }
};

// NPCs
const npcTypes = {
  hiker: { sprite: 'hiker', speed: 50 },
  farmer: { sprite: 'farmer', speed: 40 },
  jogger: { sprite: 'jogger', speed: 90 },
  cyclist: { sprite: 'cyclist', speed: 120 },
  child: { sprite: 'child', speed: 60 },
  fisherman: { sprite: 'fisherman', speed: 30 }
};

// Scene configurations with NEW landscapes from Ludo.ai
// ========== LEVEL-BASED PROGRESSION SYSTEM ==========
// Goal: Fight through 7 levels to reach the White House and meet Trump!
// Each level gets progressively harder with more birds and tougher challenges
// Birds are FINITE per level - kill them all to progress!

const LEVEL_CONFIG = {
  0:  { birdsToKill: 10,  spawnRate: 3.0, birdSpeed: 0.85, turdChance: 0.04, bossChance: 0.02, name: 'Christmas Celebration 🎄' },
  1:  { birdsToKill: 15,  spawnRate: 2.6, birdSpeed: 0.95, turdChance: 0.08, bossChance: 0.03, name: 'Country Farm' },
  2:  { birdsToKill: 20,  spawnRate: 2.0, birdSpeed: 1.05, turdChance: 0.15, bossChance: 0.05, name: 'Deep Forest' },
  3:  { birdsToKill: 25,  spawnRate: 1.8, birdSpeed: 1.1, turdChance: 0.18, bossChance: 0.07, name: 'Fishing Lake' },
  4:  { birdsToKill: 0,   spawnRate: 2.5, birdSpeed: 0.8, turdChance: 0.10, bossChance: 0.00, name: 'STATE PARK (NO HUNTING!)' },
  5:  { birdsToKill: 30,  spawnRate: 1.6, birdSpeed: 1.15, turdChance: 0.22, bossChance: 0.10, name: 'Wild West Desert' },
  6:  { birdsToKill: 35,  spawnRate: 1.4, birdSpeed: 1.2, turdChance: 0.25, bossChance: 0.12, name: 'Frozen Peaks' },
  7:  { birdsToKill: 40,  spawnRate: 1.3, birdSpeed: 1.25, turdChance: 0.28, bossChance: 0.14, name: 'Coastal Beach' },
  8:  { birdsToKill: 45,  spawnRate: 1.2, birdSpeed: 1.3, turdChance: 0.30, bossChance: 0.16, name: 'Quiet Suburbs' },
  9:  { birdsToKill: 50,  spawnRate: 1.1, birdSpeed: 1.35, turdChance: 0.33, bossChance: 0.18, name: 'Western Town' },
  10: { birdsToKill: 30,  spawnRate: 1.5, birdSpeed: 1.2, turdChance: 0.20, bossChance: 0.10, name: 'Church Camp' },
  11: { birdsToKill: 60,  spawnRate: 0.9, birdSpeed: 1.4, turdChance: 0.50, bossChance: 0.22, name: 'THE SWAMP' },
  12: { birdsToKill: 100, spawnRate: 0.7, birdSpeed: 1.5, turdChance: 0.45, bossChance: 0.30, name: 'WHITE HOUSE FINAL' },
  13: { birdsToKill: 100, spawnRate: 0.7, birdSpeed: 1.5, turdChance: 0.45, bossChance: 0.30, name: 'WHITE HOUSE FINAL' } // Level 13 when Christmas active
};

// ========== CHRISTMAS MODE ==========
// Auto-activates December 1-31
// Check if already defined (to avoid conflicts with play.html)
const isChristmasSeason = typeof window.isChristmasSeason !== 'undefined' 
  ? window.isChristmasSeason 
  : () => {
    return true; // FORCED ON - Christmas is LIVE!
    const month = new Date().getMonth();
    return true; // CHRISTMAS MODE ALWAYS ON until owner says stop // December (0-indexed)
  };

// Christmas Scriptures - The TRUE meaning of Christmas
const CHRISTMAS_SCRIPTURES = [
  "\"For unto us a child is born, unto us a son is given.\" — Isaiah 9:6",
  "\"Glory to God in the highest, and on earth peace, good will toward men.\" — Luke 2:14",
  "\"For God so loved the world, that he gave his only begotten Son.\" — John 3:16",
  "\"She will bear a son, and you shall call his name Jesus.\" — Matthew 1:21",
  "\"Today in the town of David a Savior has been born to you; he is Christ the Lord.\" — Luke 2:11",
  "\"The Word became flesh and dwelt among us.\" — John 1:14",
  "\"Thanks be to God for his indescribable gift!\" — 2 Corinthians 9:15",
  "\"Every good gift and every perfect gift is from above.\" — James 1:17",
  "\"Behold, I bring you good tidings of great joy.\" — Luke 2:10",
  "\"And she brought forth her firstborn son, and wrapped him in swaddling clothes.\" — Luke 2:7"
];

const CHRISTMAS_MESSAGES = [
  "🎄 Merry Christmas! Jesus is the reason for the season!",
  "⭐ Glory to God in the highest!",
  "🎁 Jesus is the greatest gift ever given!",
  "🕯️ The Light of the World has come!",
  "🔔 Joy to the world, the Lord has come!",
  "✝️ For unto us a child is born!",
  "⛪ O come let us adore Him!",
  "❄️ Be thankful for family and blessings!",
  "🙏 Give thanks for what you have!",
  "👨‍👩‍👧‍👦 Cherish your family this Christmas!"
];

// Build scene sequence - Christmas scene FIRST if December
const buildSceneSequence = () => {
  const scenes = [];
  
  // Add Christmas scene FIRST if it's December
  if (isChristmasSeason()) {
    scenes.push({
      key: 'christmas', name: 'CHRISTMAS CELEBRATION 🎄', level: 0, attire: 'casual',
      animals: ['deer', 'rabbit'], npcs: ['farmer', 'hiker'],
      skyColor: 0x0a1628, // Dark starry night
      ambientTint: 0xffeedd, // Warm glow
      music: 'peaceful',
      groundColor: 0xffffff, // Snow white
      groundColorLight: 0xeeeeff, // Light snow
      birdsToKill: 10, // Easy intro
      isChristmas: true,
      description: '🎄 Merry Christmas! Celebrate the birth of Jesus! Kill 10 birds to begin your journey!'
    });
  }
  
  // Regular scenes (levels adjust based on Christmas)
  const levelOffset = isChristmasSeason() ? 1 : 0;
  
  scenes.push(
    { key: 'farm', name: `Level ${1 + levelOffset}: Country Farm`, level: 1 + levelOffset, attire: 'casual', 
      animals: ['deer', 'rabbit', 'dog', 'cat'], npcs: ['farmer', 'hiker'], 
      skyColor: 0x87ceeb, ambientTint: 0xffffff, music: 'country',
      groundColor: 0x4a7c23, groundColorLight: 0x6b9b3a,
      birdsToKill: 15,
      description: 'Start your journey! Kill 15 birds to advance.' },
    { key: 'forest', name: `Level ${2 + levelOffset}: Deep Forest`, level: 2 + levelOffset, attire: 'forest', 
      animals: ['deer', 'elk', 'bear', 'fox', 'rabbit'], npcs: ['hiker'], 
      skyColor: 0x6bb3d9, ambientTint: 0xe8f5e9, music: 'forest',
      groundColor: 0x2d5016, groundColorLight: 0x3d6b1e,
      birdsToKill: 20,
      description: 'Into the wild! Kill 20 birds to advance.' },
    { key: 'lake', name: `Level ${3 + levelOffset}: Fishing Lake`, level: 3 + levelOffset, attire: 'casual', 
      animals: ['deer', 'dog'], npcs: ['fisherman', 'hiker'], 
      skyColor: 0x87ceeb, ambientTint: 0xe3f2fd, music: 'peaceful',
      groundColor: 0x5c8a3d, groundColorLight: 0x7aa855,
      birdsToKill: 25,
      description: 'Waterfowl galore! Kill 25 birds to advance.' },
    { key: 'statepark', name: `Level ${4 + levelOffset}: STATE PARK`, level: 4 + levelOffset, attire: 'casual', 
      animals: ['deer', 'rabbit', 'fox'], npcs: ['hiker'], 
      skyColor: 0x87ceeb, ambientTint: 0xfff8dc, music: 'peaceful',
      groundColor: 0x4a6741, groundColorLight: 0x5c8352,
      birdsToKill: 0, isProtectedPark: true,
      description: '🚫 NO HUNTING! Walk through without shooting to advance.' },
    { key: 'desert', name: `Level ${5 + levelOffset}: Wild West Desert`, level: 5 + levelOffset, attire: 'desert', 
      animals: ['rabbit', 'fox'], npcs: ['hiker'], 
      skyColor: 0xfbbf24, ambientTint: 0xfef3c7, music: 'desert',
      groundColor: 0xc9a227, groundColorLight: 0xdbb84a,
      birdsToKill: 30,
      description: 'Vultures and heat! Kill 30 birds to advance.' },
    { key: 'snowmountain', name: `Level ${6 + levelOffset}: Frozen Peaks`, level: 6 + levelOffset, attire: 'winter', 
      animals: ['rabbit', 'wolf', 'cougar'], npcs: ['hiker'], 
      skyColor: 0xbfdbfe, ambientTint: 0xe0f2fe, music: 'winter',
      groundColor: 0xe8e8e8, groundColorLight: 0xffffff,
      birdsToKill: 35,
      description: 'Brutal cold! Kill 35 birds to advance.' },
    { key: 'beach', name: `Level ${7 + levelOffset}: Coastal Beach`, level: 7 + levelOffset, attire: 'casual', 
      animals: ['dog', 'cat'], npcs: ['fisherman', 'hiker'], 
      skyColor: 0x87ceeb, ambientTint: 0xe0f7fa, music: 'peaceful',
      groundColor: 0xc2a366, groundColorLight: 0xdec088,
      birdsToKill: 40,
      description: 'Seagulls everywhere! Kill 40 birds to advance.' },
    { key: 'suburbs', name: `Level ${8 + levelOffset}: Quiet Suburbs`, level: 8 + levelOffset, attire: 'casual', 
      animals: ['dog', 'cat', 'rabbit'], npcs: ['farmer', 'hiker'], 
      skyColor: 0x87ceeb, ambientTint: 0xffffff, music: 'country',
      groundColor: 0x5c7a45, groundColorLight: 0x6e8c55,
      birdsToKill: 45,
      description: 'Neighborhood crows! Kill 45 birds to advance.' },
    { key: 'town', name: `Level ${9 + levelOffset}: Western Town`, level: 9 + levelOffset, attire: 'urban', 
      animals: ['dog', 'cat'], npcs: ['farmer', 'hiker'], 
      skyColor: 0x87ceeb, ambientTint: 0xfff8dc, music: 'country',
      groundColor: 0x8b7355, groundColorLight: 0xa08060,
      birdsToKill: 50,
      description: 'Urban swarms! Kill 50 birds to advance.' },
    { key: 'churchcamp', name: `Level ${10 + levelOffset}: Church Camp`, level: 10 + levelOffset, attire: 'casual', 
      animals: ['deer', 'rabbit'], npcs: ['hiker'], 
      skyColor: 0xfbbf24, ambientTint: 0xfef3c7, music: 'peaceful',
      groundColor: 0x4a7c23, groundColorLight: 0x5c8e35,
      birdsToKill: 30, isChurchCamp: true,
      description: 'Peaceful retreat! Kill 30 birds to advance.' },
    { key: 'swamp', name: `Level ${11 + levelOffset}: THE SWAMP`, level: 11 + levelOffset, attire: 'swamp', 
      animals: [], npcs: [], isSwamp: true, 
      skyColor: 0x4a5d23, ambientTint: 0xd4e6a5, music: 'swamp',
      groundColor: 0x3d4a2a, groundColorLight: 0x4d5c36,
      birdsToKill: 60,
      description: 'DRAIN THE SWAMP! Kill 60 globalist turds!' },
    { key: 'whitehouse', name: `Level ${12 + levelOffset}: THE WHITE HOUSE`, level: 12 + levelOffset, attire: 'formal', 
      animals: [], npcs: [], isWhiteHouse: true, hasTrump: true, 
      skyColor: 0x1e40af, ambientTint: 0xffffff, music: 'anthem',
      groundColor: 0x2d5016, groundColorLight: 0x3d6b1e,
      birdsToKill: 100, isFinalLevel: true,
      description: 'FINAL LEVEL! Defeat all bosses to WIN!' }
  );
  
  return scenes;
};

// Build the scene sequence (evaluates Christmas mode at load time)
const sceneSequence = buildSceneSequence();

// Scene transition messages for flavor
const sceneTransitionMessages = {
  christmas: ["🎄 MERRY CHRISTMAS!", "Jesus is the reason for the season!", "Be thankful for family and blessings!"],
  farm: ["Fresh country air!", "Easy hunting ahead!", "Kill 15 birds to advance!"],
  forest: ["Into the wild!", "Bears ahead! Be careful!", "Kill 20 birds to advance!"],
  lake: ["Great fishing spot!", "Ducks love it here!", "Kill 25 birds to advance!"],
  statepark: ["STATE PARK!", "🚫 NO HUNTING ZONE!", "Don't shoot - just walk through!"],
  desert: ["It's getting hot!", "Vultures circling!", "Kill 30 birds to advance!"],
  snowmountain: ["Bundle up!", "Ice cold hunting!", "Kill 35 birds to advance!"],
  beach: ["Coastal vibes!", "Seagulls everywhere!", "Kill 40 birds to advance!"],
  suburbs: ["Quiet neighborhood!", "Watch for crows!", "Kill 45 birds to advance!"],
  town: ["Urban jungle!", "Pigeons swarm!", "Kill 50 birds to advance!"],
  churchcamp: ["Church Camp!", "Peaceful retreat!", "Kill 30 birds - extra scriptures!"],
  swamp: ["THE SWAMP!", "DRAIN THE SWAMP!", "Kill 60 globalist turds!"],
  whitehouse: ["THE WHITE HOUSE!", "FINAL LEVEL!", "Defeat ALL bosses to WIN!"]
};

// ========== TRUMP QUOTES ==========
const TRUMP_QUOTES = {
  entrance: [
    "Make America Great Again, Shooters!",
    "DRAIN THE TURDS!",
    "We have the BEST hunters, believe me!",
    "This is TREMENDOUS! Just tremendous!",
    "We're gonna win SO much!",
    "God bless America!"
  ],
  welcome: [
    "You made it! TREMENDOUS!",
    "Welcome to the White House, patriot!",
    "Only the BEST hunters get here!",
    "You're a TRUE American hero!",
    "Come on in, you've EARNED it!"
  ],
  fistShake: [
    "We'll build a wall! Keep these turds OUT!",
    "I've been shot at and survived — may God be with us!",
    "Turds may happen, but I'm not worried!",
    "This is a GREAT, GREAT game!",
    "Nobody's tougher than us!"
  ],
  protected: [
    "TREMENDOUS job, patriot!",
    "You're a winner!",
    "That's what I call AMERICAN!",
    "Keep America Great!",
    "God bless you!"
  ]
};

class BirdTurdsScene extends Phaser.Scene {
  constructor() { 
    super('BirdTurds'); 
    this.soundEnabled = true;
  }

  preload() {
    // ========== LOADING SCREEN WITH PROGRESS BAR ==========
    const loadingBg = this.add.rectangle(GAME_WIDTH/2, GAME_HEIGHT/2, GAME_WIDTH, GAME_HEIGHT, 0x1a1a2e);
    const loadingTitle = this.add.text(GAME_WIDTH/2, GAME_HEIGHT/2 - 60, '🎮 BIRDTURDS 🎮', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffd700'
    }).setOrigin(0.5);
    const loadingText = this.add.text(GAME_WIDTH/2, GAME_HEIGHT/2 - 20, 'Loading...', {
      fontSize: '18px', color: '#ffffff'
    }).setOrigin(0.5);
    
    // Progress bar background
    const barBg = this.add.rectangle(GAME_WIDTH/2, GAME_HEIGHT/2 + 30, 300, 20, 0x333333);
    const barFill = this.add.rectangle(GAME_WIDTH/2 - 148, GAME_HEIGHT/2 + 30, 4, 16, 0x22c55e).setOrigin(0, 0.5);
    
    const percentText = this.add.text(GAME_WIDTH/2, GAME_HEIGHT/2 + 60, '0%', {
      fontSize: '14px', color: '#88ccff'
    }).setOrigin(0.5);
    
    // ========== SCARED CHICKEN TRYING TO HOLD BACK THE BAR! ==========
    const barLeftX = GAME_WIDTH/2 - 148;
    const barY = GAME_HEIGHT/2 + 30;
    
    // Create chicken emoji-style using graphics
    const chicken = this.add.container(barLeftX + 10, barY - 15);
    
    // Body (white oval)
    const body = this.add.ellipse(0, 0, 18, 22, 0xffffff);
    // Wing
    const wing = this.add.ellipse(2, 2, 10, 8, 0xeeeeee);
    // Head
    const head = this.add.ellipse(-2, -14, 12, 10, 0xffffff);
    // Eye (scared - wide open!)
    const eye = this.add.circle(-4, -15, 3, 0x000000);
    const eyeWhite = this.add.circle(-5, -16, 1.5, 0xffffff);
    // Beak
    const beak = this.add.triangle(6, -13, 0, 0, 8, 3, 0, 6, 0xfabc50);
    // Comb (red)
    const comb1 = this.add.ellipse(-4, -22, 5, 5, 0xdc2828);
    const comb2 = this.add.ellipse(0, -24, 5, 5, 0xdc2828);
    // Legs (orange, spread out like braking!)
    const leg1 = this.add.rectangle(-5, 14, 3, 10, 0xf0a028).setAngle(-20);
    const leg2 = this.add.rectangle(3, 14, 3, 10, 0xf0a028).setAngle(20);
    // Skid dust puffs behind!
    const dust1 = this.add.ellipse(-18, 8, 8, 6, 0xcccccc, 0.6);
    const dust2 = this.add.ellipse(-25, 5, 6, 5, 0xcccccc, 0.4);
    const dust3 = this.add.ellipse(-30, 10, 5, 4, 0xcccccc, 0.3);
    
    chicken.add([dust3, dust2, dust1, body, wing, head, eye, eyeWhite, beak, comb1, comb2, leg1, leg2]);
    chicken.setScale(0.9);
    chicken.setDepth(100);
    
    // Flip to face left (trying to hold back!)
    chicken.scaleX = -0.9;
    
    // Scared text bubble
    const scaredText = this.add.text(barLeftX + 50, barY - 45, '😱', {
      fontSize: '16px'
    }).setOrigin(0.5).setAlpha(0);
    
    let chickenPhase = 0;
    let lastProgress = 0;
    
    // Update progress bar as assets load
    this.load.on('progress', (value) => {
      barFill.width = 296 * value;
      percentText.setText(Math.round(value * 100) + '%');
      
      // Move chicken with the bar (being pushed!)
      const chickenX = barLeftX + (296 * value) + 15;
      chicken.x = chickenX;
      scaredText.x = chickenX + 40;
      
      // Skidding animation - bobbing and shaking!
      chickenPhase += 0.4;
      chicken.y = barY - 15 + Math.sin(chickenPhase) * 3;
      chicken.rotation = Math.sin(chickenPhase * 1.5) * 0.15; // Wobble!
      
      // Dust puffs animate
      dust1.setAlpha(0.3 + Math.sin(chickenPhase * 2) * 0.3);
      dust2.setAlpha(0.2 + Math.sin(chickenPhase * 2.5) * 0.2);
      dust3.setAlpha(0.1 + Math.sin(chickenPhase * 3) * 0.2);
      
      // Show scared text occasionally
      if (value > 0.3 && value < 0.9) {
        scaredText.setAlpha(Math.sin(chickenPhase) > 0.7 ? 1 : 0);
      }
      
      // At 80%+ chicken gets MORE panicked!
      if (value > 0.8) {
        chicken.rotation = Math.sin(chickenPhase * 3) * 0.25;
        scaredText.setText('🆘');
        scaredText.setAlpha(1);
      }
      
      lastProgress = value;
    });
    
    this.load.on('complete', () => {
      // CHICKEN FREAKOUT AT 100%!
      scaredText.setText('💀');
      scaredText.setAlpha(1);
      
      // Freakout animation
      this.tweens.add({
        targets: chicken,
        duration: 150,
        angle: { from: -15, to: 15 },
        yoyo: true,
        repeat: 4,
        ease: 'Sine.inOut',
        onComplete: () => {
          // Chicken flies away!
          this.tweens.add({
            targets: [chicken, scaredText],
            duration: 400,
            y: chicken.y - 80,
            alpha: 0,
            angle: 720,
            ease: 'Back.in',
            onComplete: () => {
              chicken.destroy();
              scaredText.destroy();
            }
          });
        }
      });
      
      // Clean up loading elements after chicken animation
      this.time.delayedCall(600, () => {
        loadingBg.destroy();
        loadingTitle.destroy();
        loadingText.destroy();
        barBg.destroy();
        barFill.destroy();
        percentText.destroy();
      });
    });
    
    // Helper function for loading images with error handling
    const img = (key, file) => {
      try { 
        this.load.image(key, file);
      } catch(e) { 
        console.warn('Failed to load:', key, e); 
      }
    };
    
    // Track failed assets
    this.failedAssets = [];
    this.load.on('loaderror', (file) => {
      console.warn('⚠️ Asset failed to load:', file.key, file.src);
      this.failedAssets.push(file.key);
    });
    
    // ========== 8 ANIMATED CHARACTER SPRITE SHEETS ==========
    // Buck animations (male character)
    this.load.spritesheet('buck_idle', '/sprites/characters/buck_idle.png', { frameWidth: 414, frameHeight: 516 });
    this.load.spritesheet('buck_walk', '/sprites/characters/buck_walk.png', { frameWidth: 358, frameHeight: 494 });
    this.load.spritesheet('buck_run', '/sprites/characters/buck_run.png', { frameWidth: 412, frameHeight: 506 });
    this.load.spritesheet('buck_shoot', '/sprites/characters/buck_shoot.png', { frameWidth: 640, frameHeight: 488 });
    this.load.spritesheet('buck_jump', '/sprites/characters/buck_jump.png', { frameWidth: 298, frameHeight: 602 });
    this.load.spritesheet('buck_hurt', '/sprites/characters/buck_hurt.png', { frameWidth: 360, frameHeight: 426 });
    
    // Daisy animations (female character)
    this.load.spritesheet('daisy_idle', '/sprites/characters/daisy_idle.png', { frameWidth: 426, frameHeight: 508 });
    this.load.spritesheet('daisy_walk', '/sprites/characters/daisy_walk.png', { frameWidth: 476, frameHeight: 512 });
    this.load.spritesheet('daisy_run', '/sprites/characters/daisy_run.png', { frameWidth: 374, frameHeight: 458 });
    this.load.spritesheet('daisy_shoot', '/sprites/characters/daisy_shoot.png', { frameWidth: 474, frameHeight: 402 });
    this.load.spritesheet('daisy_jump', '/sprites/characters/daisy_jump.png', { frameWidth: 374, frameHeight: 536 });
    this.load.spritesheet('daisy_hurt', '/sprites/characters/daisy_hurt.png', { frameWidth: 386, frameHeight: 418 });
    
    // Clyde animations (The Patriot)
    this.load.spritesheet('clyde_idle', '/sprites/characters/clyde_idle.png', { frameWidth: 500, frameHeight: 500 });
    this.load.spritesheet('clyde_walk', '/sprites/characters/clyde_walk.png', { frameWidth: 400, frameHeight: 450 });
    this.load.spritesheet('clyde_run', '/sprites/characters/clyde_run.png', { frameWidth: 400, frameHeight: 450 });
    this.load.spritesheet('clyde_shoot', '/sprites/characters/clyde_shoot.png', { frameWidth: 400, frameHeight: 400 });
    this.load.spritesheet('clyde_jump', '/sprites/characters/clyde_jump.png', { frameWidth: 350, frameHeight: 450 });
    this.load.spritesheet('clyde_hurt', '/sprites/characters/clyde_hurt.png', { frameWidth: 350, frameHeight: 400 });
    
    // Bubba animations (The Redneck)
    this.load.spritesheet('bubba_idle', '/sprites/characters/bubba_idle.png', { frameWidth: 424, frameHeight: 470 });
    this.load.spritesheet('bubba_walk', '/sprites/characters/bubba_walk.png', { frameWidth: 380, frameHeight: 440 });
    this.load.spritesheet('bubba_run', '/sprites/characters/bubba_run.png', { frameWidth: 380, frameHeight: 440 });
    this.load.spritesheet('bubba_shoot', '/sprites/characters/bubba_shoot.png', { frameWidth: 380, frameHeight: 400 });
    this.load.spritesheet('bubba_jump', '/sprites/characters/bubba_jump.png', { frameWidth: 350, frameHeight: 450 });
    this.load.spritesheet('bubba_hurt', '/sprites/characters/bubba_hurt.png', { frameWidth: 350, frameHeight: 400 });
    
    // Gunner animations (The Veteran)
    this.load.spritesheet('gunner_idle', '/sprites/characters/gunner_idle.png', { frameWidth: 450, frameHeight: 480 });
    this.load.spritesheet('gunner_walk', '/sprites/characters/gunner_walk.png', { frameWidth: 400, frameHeight: 450 });
    this.load.spritesheet('gunner_run', '/sprites/characters/gunner_run.png', { frameWidth: 400, frameHeight: 450 });
    this.load.spritesheet('gunner_shoot', '/sprites/characters/gunner_shoot.png', { frameWidth: 400, frameHeight: 400 });
    this.load.spritesheet('gunner_jump', '/sprites/characters/gunner_jump.png', { frameWidth: 350, frameHeight: 450 });
    this.load.spritesheet('gunner_hurt', '/sprites/characters/gunner_hurt.png', { frameWidth: 350, frameHeight: 400 });
    
    // Jolene animations (The Belle)
    this.load.spritesheet('jolene_idle', '/sprites/characters/jolene_idle.png', { frameWidth: 450, frameHeight: 500 });
    this.load.spritesheet('jolene_walk', '/sprites/characters/jolene_walk.png', { frameWidth: 400, frameHeight: 450 });
    this.load.spritesheet('jolene_run', '/sprites/characters/jolene_run.png', { frameWidth: 400, frameHeight: 450 });
    this.load.spritesheet('jolene_shoot', '/sprites/characters/jolene_shoot.png', { frameWidth: 400, frameHeight: 400 });
    this.load.spritesheet('jolene_jump', '/sprites/characters/jolene_jump.png', { frameWidth: 350, frameHeight: 450 });
    this.load.spritesheet('jolene_hurt', '/sprites/characters/jolene_hurt.png', { frameWidth: 350, frameHeight: 400 });
    
    // Sierra animations (CrossFit Queen)
    this.load.spritesheet('sierra_idle', '/sprites/characters/sierra_idle.png', { frameWidth: 400, frameHeight: 480 });
    this.load.spritesheet('sierra_walk', '/sprites/characters/sierra_walk.png', { frameWidth: 380, frameHeight: 450 });
    this.load.spritesheet('sierra_run', '/sprites/characters/sierra_run.png', { frameWidth: 380, frameHeight: 450 });
    this.load.spritesheet('sierra_shoot', '/sprites/characters/sierra_shoot.png', { frameWidth: 380, frameHeight: 400 });
    this.load.spritesheet('sierra_jump', '/sprites/characters/sierra_jump.png', { frameWidth: 350, frameHeight: 450 });
    this.load.spritesheet('sierra_hurt', '/sprites/characters/sierra_hurt.png', { frameWidth: 350, frameHeight: 400 });
    
    // Tammy animations (The Waitress)
    this.load.spritesheet('tammy_idle', '/sprites/characters/tammy_idle.png', { frameWidth: 450, frameHeight: 480 });
    this.load.spritesheet('tammy_walk', '/sprites/characters/tammy_walk.png', { frameWidth: 400, frameHeight: 450 });
    this.load.spritesheet('tammy_run', '/sprites/characters/tammy_run.png', { frameWidth: 400, frameHeight: 450 });
    this.load.spritesheet('tammy_shoot', '/sprites/characters/tammy_shoot.png', { frameWidth: 400, frameHeight: 400 });
    this.load.spritesheet('tammy_jump', '/sprites/characters/tammy_jump.png', { frameWidth: 350, frameHeight: 450 });
    this.load.spritesheet('tammy_hurt', '/sprites/characters/tammy_hurt.png', { frameWidth: 350, frameHeight: 400 });
    
    // ========== TRUMP & WHITE HOUSE ==========
    this.load.spritesheet('trump_walk', '/sprites/trump/trump_walk.png', { frameWidth: 380, frameHeight: 400 });
    this.load.spritesheet('trump_run', '/sprites/trump/trump_run.png', { frameWidth: 380, frameHeight: 400 });
    this.load.spritesheet('trump_hurt', '/sprites/trump/trump_hurt.png', { frameWidth: 320, frameHeight: 380 });
    this.load.spritesheet('bodyguard_walk', '/sprites/trump/bodyguard_walk.png', { frameWidth: 342, frameHeight: 528 });
    this.load.spritesheet('bodyguard_shoot', '/sprites/trump/bodyguard_shoot.png', { frameWidth: 640, frameHeight: 512 });
    this.load.spritesheet('angel', '/sprites/trump/angel.png', { frameWidth: 470, frameHeight: 450 });
    this.load.spritesheet('angel_protect', '/sprites/trump/angel_protect.png', { frameWidth: 484, frameHeight: 462 });
    this.load.spritesheet('americaneagle', '/sprites/trump/americaneagle.png', { frameWidth: 450, frameHeight: 400 });
    
    // ========== WOKE TURD GLOBALISTS - DRAIN THE SWAMP! ==========
    // Globalist 1: Syringe Pusher (blue vest, glasses, syringe)
    // walk: 1280x1016 = 2x2 grid, 4 frames, 640x508 each
    this.load.spritesheet('globalist_1_walk', '/sprites/globalists/globalist_1_walk.png', { frameWidth: 640, frameHeight: 508 });
    // throw: 1280x748 = 2x2 grid, 4 frames, 640x374 each
    this.load.spritesheet('globalist_1_throw', '/sprites/globalists/globalist_1_throw.png', { frameWidth: 640, frameHeight: 374 });
    // arrested: 1216x704 = 3x1 or similar, 3 frames, ~405x704 each
    this.load.spritesheet('globalist_1_arrested', '/sprites/globalists/globalist_1_arrested.png', { frameWidth: 405, frameHeight: 704 });
    // syringe_push: 604x748 = single frame
    this.load.image('globalist_1_syringe_push', '/sprites/globalists/globalist_1_syringe_push.png');
    
    // Globalist 2: The Suit (dark suit, red tie)
    // walk: 1434x1584 = 3x4 grid, 12 frames, 478x396 each
    this.load.spritesheet('globalist_2_walk', '/sprites/globalists/globalist_2_walk.png', { frameWidth: 478, frameHeight: 396 });
    // throw: 1280x1280 = 2x2 grid, 4 frames, 640x640 each
    this.load.spritesheet('globalist_2_throw', '/sprites/globalists/globalist_2_throw.png', { frameWidth: 640, frameHeight: 640 });
    // arrested: 1144x908 = 3x1, 3 frames, ~381x908 each
    this.load.spritesheet('globalist_2_arrested', '/sprites/globalists/globalist_2_arrested.png', { frameWidth: 381, frameHeight: 908 });
    
    // Globalist 3: Phone Addict (blue pantsuit, phone)
    // walk: 924x1064 = 2x2 grid, 4 frames, 462x532 each
    this.load.spritesheet('globalist_3_walk', '/sprites/globalists/globalist_3_walk.png', { frameWidth: 462, frameHeight: 532 });
    // throw: 708x852 = 2x2 grid, 4 frames, 354x426 each
    this.load.spritesheet('globalist_3_throw', '/sprites/globalists/globalist_3_throw.png', { frameWidth: 354, frameHeight: 426 });
    // arrested: 1156x996 = 3x1, 3 frames, ~385x996 each
    this.load.spritesheet('globalist_3_arrested', '/sprites/globalists/globalist_3_arrested.png', { frameWidth: 385, frameHeight: 996 });
    
    // Globalist 4: The Hoodie (black hoodie, jeans)
    // walk: 792x960 = 2x2 grid, 4 frames, 396x480 each
    this.load.spritesheet('globalist_4_walk', '/sprites/globalists/globalist_4_walk.png', { frameWidth: 396, frameHeight: 480 });
    // throw: 644x760 = 2x2 grid, 4 frames, 322x380 each
    this.load.spritesheet('globalist_4_throw', '/sprites/globalists/globalist_4_throw.png', { frameWidth: 322, frameHeight: 380 });
    // arrested: 672x760 = 3x1, 3 frames, 224x760 each
    this.load.spritesheet('globalist_4_arrested', '/sprites/globalists/globalist_4_arrested.png', { frameWidth: 224, frameHeight: 760 });
    
    // ========== DEMONS - Appear at White House! ==========
    // demon_fly: 988x904 = 2x2 grid, 4 frames, 494x452 each
    this.load.spritesheet('demon_fly', '/sprites/demons/demon_fly.png', { frameWidth: 494, frameHeight: 452 });
    // demon_attack: 864x904 = 2x2 grid, 4 frames, 432x452 each
    this.load.spritesheet('demon_attack', '/sprites/demons/demon_attack.png', { frameWidth: 432, frameHeight: 452 });
    // demon_hit: 1280x1180 = 2x2 grid, 4 frames, 640x590 each
    this.load.spritesheet('demon_hit', '/sprites/demons/demon_hit.png', { frameWidth: 640, frameHeight: 590 });
    // demon_flee: 1146x1308 = 3x3 grid, 9 frames, 382x436 each
    this.load.spritesheet('demon_flee', '/sprites/demons/demon_flee.png', { frameWidth: 382, frameHeight: 436 });
    
    // ========== GOD BLESS AMERICA SPLASH ==========
    this.load.spritesheet('godbless_splash', '/sprites/godbless_splash.png', { frameWidth: 376, frameHeight: 390 });
    
    // ========== LANDSCAPES ==========
    img('farm', '/sprites/landscapes/farm.png');
    img('forest', '/sprites/landscapes/forest.png');
    img('desert', '/sprites/landscapes/desert.png');
    img('lake', '/sprites/landscapes/lake.png');
    img('snowmountain', '/sprites/landscapes/snowmountain.png');
    img('town', '/sprites/landscapes/town.png');
    img('swamp', '/sprites/landscapes/swamp.png');
    img('whitehouse', '/sprites/landscapes/whitehouse.png');
    // NEW LANDSCAPES - 12 Level System
    img('statepark', '/sprites/landscapes/statepark.png');
    img('beach', '/sprites/landscapes/beach.png');
    img('suburbs', '/sprites/landscapes/suburbs.png');
    img('churchcamp', '/sprites/landscapes/churchcamp.png');
    // CHRISTMAS SCENE - Only loaded in December
    if (isChristmasSeason()) {
      img('christmas', '/sprites/landscapes/christmas.png');
    }
    
    // ========== GROUND & SKY TEXTURES - Create these in Ludo! ==========
    // grass.png - Tileable grass texture (512x100 recommended)
    // clouds.png - Cloud sprites for parallax sky
    img('grass', '/sprites/landscapes/grass.png');
    img('clouds', '/sprites/landscapes/clouds.png');
    img('snow', '/sprites/landscapes/christmas.png'); // Snow ground for Christmas
    
    // ========== GUN SOUND EFFECTS - Real Audio Files ==========
    this.load.audio('buck_shoot', '/sounds/buck_shoot.mp3');      // Lever-Action Rifle
    this.load.audio('bubba_shoot', '/sounds/bubba_shoot.mp3');    // Pump-Action Shotgun
    this.load.audio('daisy_shoot', '/sounds/daisy_shoot.mp3');    // Double-Barrel Shotgun
    this.load.audio('sierra_shoot', '/sounds/sierra_shoot.mp3'); // AR-15 Carbine
    this.load.audio('clyde_shoot', '/sounds/clyde_shoot.mp3');   // Semi-Auto Hunting Rifle
    this.load.audio('gunner_shoot', '/sounds/gunner_shoot.mp3'); // AK Assault Rifle
    this.load.audio('jolene_shoot', '/sounds/jolene_shoot.mp3'); // Bolt-Action Sniper
    this.load.audio('tammy_shoot', '/sounds/tammy_shoot.mp3');   // Semi-Auto Pistol
    this.load.audio('machinegun_sound', '/sounds/machinegun.mp3'); // Store Machine Gun
    
    // ========== GAMEPLAY SOUND EFFECTS - Real Audio Files ==========
    this.load.audio('hit_sound', '/sounds/hit.mp3');             // Bullet impact
    this.load.audio('splat_sound', '/sounds/splat.mp3');         // Bird poop splat
    this.load.audio('coin_sound', '/sounds/coin.mp3');           // Coin collect
    this.load.audio('reload_sound', '/sounds/reload.mp3');       // Gun reload
    this.load.audio('explosion_sound', '/sounds/explosion.mp3'); // Explosions
    this.load.audio('hurt_sound', '/sounds/hurt.mp3');           // Player hurt
    this.load.audio('bird_death_sound', '/sounds/bird_death.mp3'); // Bird dying
    this.load.audio('gameover_sound', '/sounds/gameover.mp3');   // Game over
    
    // Hunter skin overlays (tint variations applied in code)
    // Armor overlays loaded separately
    // Hunter skin overlays (optional)
    // img('armor_basic', '/sprites/armor_basic.png'); // Not used
    // img('armor_heavy', '/sprites/armor_heavy.png'); // Not used
    // img('armor_golden', '/sprites/armor_golden.png'); // Not used
    
    // ========== VEHICLES - Use Ludo PNG assets ==========
    // Tractors - animated spritesheets (400x80, 5 frames @ 80x80 each)
    this.load.spritesheet('tractor_good_anim', '/sprites/vehicles/tractor_good_strip.png', { frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet('tractor_good_left', '/sprites/vehicles/tractor_good_strip_left.png', { frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet('tractor_bad_anim', '/sprites/vehicles/tractor_bad_strip.png', { frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet('tractor_bad_left', '/sprites/vehicles/tractor_bad_strip_left.png', { frameWidth: 80, frameHeight: 80 });
    // Fallback single images
    img('tractor_good', '/sprites/vehicles/tractor_green.png');
    img('tractor_bad', '/sprites/vehicles/tractor_red.png');
    img('tractor', '/sprites/vehicles/tractor_green.png'); // Alias for green
    
    // Tractor driver audio
    this.load.audio('tractor_driver_good', '/sounds/tractor_driver_good.mp3');
    this.load.audio('tractor_driver_bad', '/sounds/tractor_driver_bad_new.mp3');
    this.load.audio('tractor_engine_good', '/sounds/tractor_good.mp3');
    this.load.audio('tractor_engine_bad', '/sounds/tractor_bad.mp3');
    img('plane', '/sprites/vehicles/plane.png');
    img('helicopter', '/sprites/vehicles/helicopter.png');
    img('dirtbike', '/sprites/vehicles/dirtbike.png');
    
    // ========== ITEMS - Use Ludo PNG assets ==========
    img('turd', '/sprites/items/turd.png');
    img('ammo', '/sprites/items/ammo.png');
    img('firstaid', '/sprites/items/firstaid.png');
    img('coin', '/sprites/items/coin.png');
    img('arrow', '/sprites/items/arrow.png');
    img('bolt', '/sprites/items/bolt.png');
    img('bullet', '/sprites/items/bullet.png');
    img('doublepoints', '/sprites/items/doublepoints.png');
    img('shield', '/sprites/items/shield.png');
    img('speedboost', '/sprites/items/speedboost.png');
    img('hat', '/sprites/items/hat.png');
    
    // ========== WEAPONS - Use Ludo PNG assets ==========
    img('rifle', '/sprites/weapons/rifle.png');
    img('bow', '/sprites/weapons/bow.png');
    img('crossbow', '/sprites/weapons/crossbow.png');
    img('knife', '/sprites/weapons/knife.png');
    img('shotgun', '/sprites/weapons/shotgun.png');
    img('sniper', '/sprites/weapons/sniper.png');
    img('machinegun', '/sprites/weapons/machinegun.png');
    img('flamethrower', '/sprites/weapons/flamethrower.png');
    img('rocketlauncher', '/sprites/weapons/rocketlauncher.png');
    img('grenade', '/sprites/weapons/grenade.png');
    img('axe', '/sprites/weapons/axe.png');
    img('lasergun', '/sprites/weapons/lasergun.png');
    
    // ========== BIRD SPRITES - Use Ludo PNG assets ==========
    Object.keys(speciesConfig).forEach(key => {
      const cfg = speciesConfig[key];
      img(cfg.sprite, `/sprites/birds/${cfg.sprite}.png`);
    });
    
    // ========== GROUND ANIMALS - Use Ludo PNG assets ==========
    Object.keys(groundAnimals).forEach(key => {
      img(key, `/sprites/animals/${key}.png`);
    });
    
    // ========== NPCs - Use Ludo PNG assets ==========
    Object.keys(npcTypes).forEach(key => {
      img(key, `/sprites/npcs/${key}.png`);
    });
    
    // ========== PHONE ZOMBIES & AWAKENED PEOPLE - Ludo PNG assets ==========
    img('zombie_teen_boy', '/sprites/zombies/zombie_teen_boy.png');
    img('zombie_teen_girl', '/sprites/zombies/zombie_teen_girl.png');
    img('zombie_adult_man', '/sprites/zombies/zombie_adult_man.png');
    img('zombie_adult_woman', '/sprites/zombies/zombie_adult_woman.png');
    img('person_teen_boy', '/sprites/zombies/person_teen_boy.png');
    img('person_teen_girl', '/sprites/zombies/person_teen_girl.png');
    img('person_adult_man', '/sprites/zombies/person_adult_man.png');
    img('person_adult_woman', '/sprites/zombies/person_adult_woman.png');
    img('bible_pickup', '/sprites/items/bible_pickup.png');
  }
  
  // ========== CREATE CHARACTER ANIMATIONS ==========
  createAnimations() {
    const charId = this.selectedCharacter;
    const charData = CHARACTER_ROSTER[charId];
    if (!charData) return;
    
    // Create animations for selected character
    Object.keys(charData.animations).forEach(animName => {
      const anim = charData.animations[animName];
      const key = `${charId}_${animName}`;
      
      // Don't recreate if exists
      if (this.anims.exists(key)) return;
      
      this.anims.create({
        key: key,
        frames: this.anims.generateFrameNumbers(`${charId}_${animName}`, { start: 0, end: anim.frames - 1 }),
        frameRate: anim.frameRate,
        repeat: anim.loop ? -1 : 0
      });
    });
  }

  create() {
    console.log('BirdTurds v17.0: create() started');
    
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, GAME_HEIGHT);
    this.groundY = GAME_HEIGHT - 60;
    console.log('BirdTurds: groundY =', this.groundY);
    
    // ========== PERFORMANCE SYSTEM INIT ==========
    try { 
      if (window.PerformanceSystem) window.PerformanceSystem.init(this);
    } catch(e) { console.warn('PerformanceSystem init error:', e); }
    
    // ========== CHRISTMAS MODE CHECK ==========
    this.isChristmasMode = isChristmasSeason();
    if (this.isChristmasMode) {
      console.log('🎄 CHRISTMAS MODE ACTIVE! Merry Christmas!');
    }
    
    // ========== GOD BLESS AMERICA SPLASH SCREEN ==========
    this.showGodBlessSplash();
    
    // Get selected character
    this.selectedCharacter = getSelectedCharacter();
    console.log('BirdTurds: Selected character:', this.selectedCharacter);
    
    // Create animations for the selected character
    this.createAnimations();
    
    this.createGroups();
    console.log('BirdTurds: groups created');
    this.createBackground();
    console.log('BirdTurds: background created');
    this.createHunter();
    console.log('BirdTurds: hunter created at', this.hunter?.x, this.hunter?.y);
    this.createInput();
    console.log('BirdTurds: input created');
    this.initDebugOverlay();
    this.initJokeSystem();
    
    // ========== CHRISTMAS FALLING SNOW ==========
    if (this.isChristmasMode) {
      this.createChristmasSnow();
    }
    
    // Timers
    this.spawnTimer = 0;
    this.vehicleTimer = 0;
    this.itemTimer = 0;
    this.planeTimer = 0;
    this.animalTimer = 0;
    this.npcTimer = 0;
    this.bossTimer = 0;
    this.firstBossSpawned = false;
    this.jokeTimer = 0;
    
    // State
    this.gameOver = false;
    this.paused = false;
    this.isCrouching = false;
    this.walkFrame = 0;
    this.currentSceneIndex = 0;
    this.currentScene = sceneSequence[0];
    this.fireRateCooldown = 0;
    this.lastDirection = 1;
    
    this.setupHUD();
    this.showInstructions();
    this.loadPlayerData();
    
    // Setup in-game coin display and quick shop
    this.setupCoinDisplay();
    this.setupQuickShopKeys();
    
    // Show first joke after 10 seconds
    this.time.delayedCall(10000, () => this.showRandomJoke());
    
    // Start wellness reminder system (first check after 20 minutes)
    this.time.delayedCall(this.breakInterval, () => this.checkWellness());
    
    // Initialize AI bots (2 bots by default for solo play)
    // Delay slightly to ensure camera and all assets are ready
    this.time.delayedCall(500, () => {
      console.log('🤖 Delayed bot initialization starting...');
      this.initBots(2);
    });
    
    // Initialize demon group
    this.demons = this.physics.add.group();
    this.demonLies = this.physics.add.group();
    this.demonTimer = 0;
    
    // Initialize sky clarity (0 = cloudy, 1 = clear)
    this.skyClarity = 0;
    
    // Angel protection visual (player's personal angel)
    this.playerAngel = null;
  }
  
  // ========== ANGEL PROTECTION PURCHASE MENU ==========
  showAngelMenu() {
    if (this.angelMenuOpen) return;
    this.angelMenuOpen = true;
    
    // Pause game slightly
    this.physics.pause();
    
    // Create overlay
    const overlay = this.add.rectangle(GAME_WIDTH/2, GAME_HEIGHT/2, GAME_WIDTH, GAME_HEIGHT, 0x000033, 0.95)
      .setScrollFactor(0).setDepth(2000);
    
    // Title
    const title = this.add.text(GAME_WIDTH/2, 35, '😇 SPIRITUAL ARMORY 😇', {
      fontSize: '28px', fontStyle: 'bold', color: '#ffd700'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(2001);
    
    const subtitle = this.add.text(GAME_WIDTH/2, 65, '"Put on the full armor of God" — Ephesians 6:11', {
      fontSize: '12px', fontStyle: 'italic', color: '#ffffff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(2001);
    
    const coinsText = this.add.text(GAME_WIDTH/2, 95, `Your Coins: 🪙 ${btState.coins}  |  Bible Ammo: 📖 ${btState.bibleAmmo}`, {
      fontSize: '16px', color: '#ffd700'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(2001);
    
    const buttons = [];
    
    // ========== ANGEL PROTECTION SECTION ==========
    const angelHeader = this.add.text(GAME_WIDTH/2, 125, '✨ ANGEL PROTECTION ✨', {
      fontSize: '16px', fontStyle: 'bold', color: '#88ccff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(2001);
    buttons.push(angelHeader);
    
    // Protection tier buttons (compact)
    const tiers = [1, 2, 3];
    tiers.forEach((tier, i) => {
      const config = ANGEL_PROTECTION[tier];
      const y = 160 + i * 55;
      const canAfford = btState.coins >= config.cost;
      
      const bg = this.add.rectangle(GAME_WIDTH/2, y, 520, 45, canAfford ? 0x224422 : 0x332222, 0.9)
        .setScrollFactor(0).setDepth(2001).setStrokeStyle(2, canAfford ? 0x44ff44 : 0x664444);
      
      const stars = '⭐'.repeat(tier);
      const nameText = this.add.text(GAME_WIDTH/2 - 240, y, `${stars} ${config.name}`, {
        fontSize: '14px', fontStyle: 'bold', color: canAfford ? '#44ff44' : '#666666'
      }).setOrigin(0, 0.5).setScrollFactor(0).setDepth(2002);
      
      const descText = this.add.text(GAME_WIDTH/2 - 20, y, `${config.description} (${config.duration}s)`, {
        fontSize: '11px', color: '#aaaaaa'
      }).setOrigin(0, 0.5).setScrollFactor(0).setDepth(2002);
      
      const costText = this.add.text(GAME_WIDTH/2 + 230, y, `🪙${config.cost}`, {
        fontSize: '16px', fontStyle: 'bold', color: canAfford ? '#ffd700' : '#444444'
      }).setOrigin(0.5).setScrollFactor(0).setDepth(2002);
      
      if (canAfford) {
        bg.setInteractive({ useHandCursor: true });
        bg.on('pointerover', () => bg.setFillStyle(0x336633));
        bg.on('pointerout', () => bg.setFillStyle(0x224422));
        bg.on('pointerdown', () => {
          this.purchaseAngelProtection(tier);
          this.closeAngelMenu(overlay, title, subtitle, coinsText, buttons);
        });
      }
      buttons.push(bg, nameText, descText, costText);
    });
    
    // ========== HOLY BIBLE WEAPON SECTION ==========
    const bibleHeader = this.add.text(GAME_WIDTH/2, 340, '📖 HOLY BIBLE WEAPON 📖', {
      fontSize: '16px', fontStyle: 'bold', color: '#ffd700'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(2001);
    buttons.push(bibleHeader);
    
    const bibleDesc = this.add.text(GAME_WIDTH/2, 365, '"The Word of God is living and active, sharper than any two-edged sword" — Hebrews 4:12', {
      fontSize: '10px', fontStyle: 'italic', color: '#cccccc'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(2001);
    buttons.push(bibleDesc);
    
    const canAffordBible = btState.coins >= BIBLE_WEAPON.cost;
    const bibleBg = this.add.rectangle(GAME_WIDTH/2, 410, 520, 60, canAffordBible ? 0x442200 : 0x332222, 0.9)
      .setScrollFactor(0).setDepth(2001).setStrokeStyle(2, canAffordBible ? 0xffd700 : 0x664444);
    
    const bibleIcon = this.add.text(GAME_WIDTH/2 - 240, 400, '📖 HOLY BIBLE', {
      fontSize: '16px', fontStyle: 'bold', color: canAffordBible ? '#ffd700' : '#666666'
    }).setOrigin(0, 0.5).setScrollFactor(0).setDepth(2002);
    
    const bibleInfo = this.add.text(GAME_WIDTH/2 - 240, 420, `Shoots scripture at demons! 5x damage! 10 shots. Press B to fire.`, {
      fontSize: '11px', color: '#aaaaaa'
    }).setOrigin(0, 0.5).setScrollFactor(0).setDepth(2002);
    
    const bibleCost = this.add.text(GAME_WIDTH/2 + 230, 410, `🪙${BIBLE_WEAPON.cost}`, {
      fontSize: '18px', fontStyle: 'bold', color: canAffordBible ? '#ffd700' : '#444444'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(2002);
    
    if (canAffordBible) {
      bibleBg.setInteractive({ useHandCursor: true });
      bibleBg.on('pointerover', () => bibleBg.setFillStyle(0x553311));
      bibleBg.on('pointerout', () => bibleBg.setFillStyle(0x442200));
      bibleBg.on('pointerdown', () => {
        this.purchaseBibleWeapon();
        this.closeAngelMenu(overlay, title, subtitle, coinsText, buttons);
      });
    }
    buttons.push(bibleBg, bibleIcon, bibleInfo, bibleCost);
    
    // ========== GOD VS DEVIL TRUTH ==========
    const truthHeader = this.add.text(GAME_WIDTH/2, 460, '✝️ REMEMBER THE TRUTH ✝️', {
      fontSize: '12px', fontStyle: 'bold', color: '#22c55e'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(2001);
    buttons.push(truthHeader);
    
    const truth1 = this.add.text(GAME_WIDTH/2, 480, 'GOD is Omnipotent, Omniscient, Omnipresent — Satan is NOT!', {
      fontSize: '10px', color: '#88ff88'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(2001);
    const truth2 = this.add.text(GAME_WIDTH/2, 495, '"The one who is in you is GREATER than the one who is in the world" — 1 John 4:4', {
      fontSize: '9px', fontStyle: 'italic', color: '#ffffff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(2001);
    buttons.push(truth1, truth2);
    
    // Close button
    const closeBtn = this.add.text(GAME_WIDTH/2, GAME_HEIGHT - 35, '❌ CLOSE (Press A again)', {
      fontSize: '16px', color: '#ff6666'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(2002).setInteractive({ useHandCursor: true });
    closeBtn.on('pointerdown', () => this.closeAngelMenu(overlay, title, subtitle, coinsText, buttons, closeBtn));
    buttons.push(closeBtn);
    
    this.angelMenuElements = { overlay, title, subtitle, coinsText, buttons };
  }
  
  purchaseBibleWeapon() {
    if (btState.coins < BIBLE_WEAPON.cost) {
      this.showNotification('❌ Not enough coins for the Holy Bible!', 0xff4444);
      return;
    }
    
    btState.coins -= BIBLE_WEAPON.cost;
    btState.hasBibleWeapon = true;
    btState.bibleAmmo += BIBLE_WEAPON.ammo;
    
    this.showNotification('📖 HOLY BIBLE ACQUIRED! Press B to fire scripture!', 0xffd700);
    this.playSound('powerup');
    
    // Show special scripture
    const scripture = { verse: "The Word of God is living and active, sharper than any two-edged sword.", ref: "Hebrews 4:12" };
    this.showScripturePopup(scripture, 0xffd700);
  }
  
  fireBibleWeapon() {
    if (!btState.hasBibleWeapon || btState.bibleAmmo <= 0) {
      if (!btState.hasBibleWeapon) {
        this.showNotification('📖 Press A to buy Holy Bible weapon!', 0xffaa00);
      } else {
        this.showNotification('📖 Out of Bible ammo! Press A to buy more.', 0xff6666);
      }
      return;
    }
    
    btState.bibleAmmo--;
    
    // Get random scripture for this shot
    const scriptureRef = BIBLE_WEAPON.scriptures[Math.floor(Math.random() * BIBLE_WEAPON.scriptures.length)];
    
    // Create Bible projectile
    const startX = this.hunter.x;
    const startY = this.hunter.y - 30;
    
    // Aim at nearest demon or straight ahead
    let targetX = startX + (this.hunter.flipX ? -300 : 300);
    let targetY = startY - 50;
    
    if (this.demons && this.demons.getChildren().length > 0) {
      let nearestDemon = null;
      let nearestDist = Infinity;
      this.demons.getChildren().forEach(d => {
        if (d && d.active) {
          const dist = Phaser.Math.Distance.Between(startX, startY, d.x, d.y);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearestDemon = d;
          }
        }
      });
      if (nearestDemon) {
        targetX = nearestDemon.x;
        targetY = nearestDemon.y;
      }
    }
    
    // Create the Bible bullet
    const bible = this.add.container(startX, startY);
    const bookBg = this.add.rectangle(0, 0, 60, 30, 0x8B4513, 1).setStrokeStyle(2, 0xffd700);
    const cross = this.add.text(0, -2, '✝️', { fontSize: '16px' }).setOrigin(0.5);
    const ref = this.add.text(0, 10, scriptureRef, { fontSize: '8px', color: '#ffd700' }).setOrigin(0.5);
    bible.add([bookBg, cross, ref]);
    bible.setDepth(20);
    
    this.physics.world.enable(bible);
    
    const dx = targetX - startX;
    const dy = targetY - startY;
    const dist = Math.hypot(dx, dy);
    bible.body.setVelocity(
      (dx / dist) * BIBLE_WEAPON.speed,
      (dy / dist) * BIBLE_WEAPON.speed
    );
    
    bible.isBibleBullet = true;
    bible.damage = BIBLE_WEAPON.damage;
    bible.scriptureRef = scriptureRef;
    
    // Add to tracking
    if (!this.bibleBullets) this.bibleBullets = [];
    this.bibleBullets.push(bible);
    
    // Golden trail effect
    this.time.addEvent({
      delay: 50,
      repeat: 10,
      callback: () => {
        if (bible && bible.active) {
          const trail = this.add.circle(bible.x, bible.y, 5, 0xffd700, 0.5).setDepth(19);
          this.tweens.add({
            targets: trail,
            alpha: 0, scale: 0.3,
            duration: 300,
            onComplete: () => trail.destroy()
          });
        }
      }
    });
    
    this.showNotification(`📖 "${scriptureRef}"`, 0xffd700);
  }
  
  closeAngelMenu(overlay, title, subtitle, coinsText, buttons, closeBtn) {
    overlay.destroy();
    title.destroy();
    subtitle.destroy();
    coinsText.destroy();
    buttons.forEach(b => b.destroy());
    if (closeBtn) closeBtn.destroy();
    this.angelMenuOpen = false;
    this.physics.resume();
  }
  
  purchaseAngelProtection(tier) {
    const config = ANGEL_PROTECTION[tier];
    if (btState.coins < config.cost) {
      this.showNotification('❌ Not enough coins!', 0xff4444);
      return;
    }
    
    btState.coins -= config.cost;
    btState.angelProtectionActive = true;
    btState.angelProtectionTimer = config.duration;
    btState.angelProtectionLevel = tier;
    
    this.showNotification(`😇 ${config.name} ACTIVATED! 😇`, 0xffd700);
    this.playSound('powerup');
    
    // Show angel scripture
    this.showAngelScripture();
    
    // Make any existing demons flee!
    if (this.demons) {
      this.demons.getChildren().forEach(demon => {
        if (demon && demon.active && !demon.fleeing) {
          demon.fleeing = true;
          demon.direction = 1;
          this.showDemonFlee(demon);
        }
      });
    }
    
    // Spawn player's personal angel
    this.spawnPlayerAngel(tier);
  }
  
  spawnPlayerAngel(tier) {
    if (this.playerAngel) this.playerAngel.destroy();
    
    // Create angel hovering above player
    this.playerAngel = this.add.sprite(this.hunter.x, this.hunter.y - 80, 'angel_protect')
      .setScale(0.08 + tier * 0.02).setDepth(25).setAlpha(0.8);
    
    // Play animation if exists
    if (this.anims.exists('angel_protect_anim')) {
      this.playerAngel.play('angel_protect_anim');
    }
    
    // Divine glow based on tier
    const glowColors = [0xffffcc, 0xffdd88, 0xffd700];
    this.playerAngel.setTint(glowColors[tier - 1]);
    
    // Add halo effect
    this.playerAngel.halo = this.add.circle(this.hunter.x, this.hunter.y - 100, 15 + tier * 5, glowColors[tier - 1], 0.5)
      .setDepth(24);
    
    // Pulsing animation
    this.tweens.add({
      targets: this.playerAngel,
      alpha: { from: 0.6, to: 1 },
      scale: { from: this.playerAngel.scale * 0.95, to: this.playerAngel.scale * 1.05 },
      duration: 1000,
      yoyo: true,
      repeat: -1
    });
  }
  
  updateAngelProtection(dt) {
    if (!btState.angelProtectionActive) return;
    
    btState.angelProtectionTimer -= dt;
    
    // Update angel position to follow player
    if (this.playerAngel && this.hunter) {
      this.playerAngel.x = this.hunter.x;
      this.playerAngel.y = this.hunter.y - 80;
      if (this.playerAngel.halo) {
        this.playerAngel.halo.x = this.hunter.x;
        this.playerAngel.halo.y = this.hunter.y - 100;
      }
    }
    
    // Warning at 5 seconds
    if (btState.angelProtectionTimer <= 5 && btState.angelProtectionTimer > 4.9) {
      this.showNotification('⚠️ Angel protection ending soon!', 0xffaa00);
    }
    
    // Expired
    if (btState.angelProtectionTimer <= 0) {
      btState.angelProtectionActive = false;
      btState.angelProtectionLevel = 0;
      this.showNotification('😇 Angel protection ended', 0x888888);
      
      if (this.playerAngel) {
        if (this.playerAngel.halo) this.playerAngel.halo.destroy();
        this.tweens.add({
          targets: this.playerAngel,
          alpha: 0,
          y: this.playerAngel.y - 100,
          duration: 1000,
          onComplete: () => { this.playerAngel.destroy(); this.playerAngel = null; }
        });
      }
    }
  }
  
  // ========== GOD BLESS AMERICA ANIMATED SPLASH ==========
  showGodBlessSplash() {
    // Mark splash as active - prevents shooting
    this.splashActive = true;
    
    // QUICK splash - 1.5 seconds then straight to level intro (skip woke-free zone)
    const overlay = this.add.rectangle(GAME_WIDTH/2, GAME_HEIGHT/2, GAME_WIDTH, GAME_HEIGHT, 0x000022, 0.95)
      .setScrollFactor(0).setDepth(1000);
    
    // Simple "God Bless America" text instead of slow animation
    const title = this.add.text(GAME_WIDTH/2, GAME_HEIGHT/2 - 50, 'GOD BLESS AMERICA!', {
      fontSize: '36px',
      fontStyle: 'bold',
      color: '#ffd700'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
    
    const subtitle = this.add.text(GAME_WIDTH/2, GAME_HEIGHT/2 + 10, '🎮 LAUGH AND ENJOY! 🎮', {
      fontSize: '24px',
      fontStyle: 'bold',
      color: '#ffffff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1002);
    
    const scripture = this.add.text(GAME_WIDTH/2, GAME_HEIGHT/2 + 60, 
      '"A cheerful heart is good medicine" — Proverbs 17:22', {
      fontSize: '16px',
      fontStyle: 'italic',
      color: '#88ccff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1002);
    
    // Click/tap to skip hint
    const skipText = this.add.text(GAME_WIDTH/2, GAME_HEIGHT - 30, 
      'Click or tap anywhere to skip...', {
      fontSize: '12px',
      color: '#aaaaaa'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1002);
    
    // Store elements for cleanup
    const splashElements = [overlay, title, subtitle, scripture, skipText];
    let splashDone = false;
    const self = this;
    
    const closeSplash = () => {
      if (splashDone) return;
      splashDone = true;
      self.splashActive = false; // Re-enable shooting
      self.input.off('pointerdown', closeSplash);
      splashElements.forEach(el => { if (el && el.destroy) el.destroy(); });
      // Skip woke-free zone, go straight to level intro
      self.showLevelIntro();
    };
    
    // Click to skip immediately - use interactive overlay
    overlay.setInteractive({ useHandCursor: true });
    overlay.on('pointerdown', closeSplash);
    
    // Also listen globally as backup
    this.input.once('pointerdown', closeSplash);
    
    // Auto-close after 0.8 seconds (FAST start!)
    this.time.delayedCall(800, closeSplash);
  }
  
  // ========== WOKE-FREE ZONE SPLASH ==========
  showWokeFreeSplash() {
    // Create dark overlay
    const overlay = this.add.rectangle(GAME_WIDTH/2, GAME_HEIGHT/2, GAME_WIDTH, GAME_HEIGHT, 0x1a1a2e, 0.95)
      .setScrollFactor(0).setDepth(1000);
    
    // Main title
    const title = this.add.text(GAME_WIDTH/2, 50,
      '🚫 WOKE-FREE ZONE 🚫', {
      fontSize: '32px',
      fontStyle: 'bold',
      color: '#ff4444'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
    
    // ========== GAME GOAL - YOUR MISSION ==========
    const missionTitle = this.add.text(GAME_WIDTH/2, 100,
      '🎯 YOUR MISSION 🎯', {
      fontSize: '22px',
      fontStyle: 'bold',
      color: '#ffd700'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
    
    const missionText = this.add.text(GAME_WIDTH/2, 140,
      'Fight through 7 LEVELS to reach THE WHITE HOUSE!\nClear all birds → Skies get clearer → Level complete!', {
      fontSize: '14px',
      color: '#88ff88',
      align: 'center'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
    
    // ========== NEW FEATURES ==========
    const featuresTitle = this.add.text(GAME_WIDTH/2, 195,
      '✨ SPECIAL FEATURES ✨', {
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#88ccff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
    
    const features = this.add.text(GAME_WIDTH/2, 255,
      '😇 Press A to Call ANGEL PROTECTION (costs coins)\n' +
      '   • Guardian Angel: 50 coins - blocks 50% turds\n' +
      '   • Warrior Angel: 100 coins - blocks 75% turds\n' +
      '   • Divine Shield: 200 coins - blocks ALL turds!\n\n' +
      '😈 DEMONS appear at Level 3+ throwing LIES\n' +
      '   • Shoot the lies before they hit you!\n' +
      '   • Defeat demons for big points!', {
      fontSize: '12px',
      color: '#cccccc',
      align: 'center',
      lineSpacing: 4
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
    
    // Call to action
    const cta = this.add.text(GAME_WIDTH/2, GAME_HEIGHT - 50,
      '🤠 HEAD RIGHT → REACH THE WHITE HOUSE! 🇺🇸', {
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#ffffff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
    
    // Scripture
    const scripture = this.add.text(GAME_WIDTH/2, GAME_HEIGHT - 20,
      'Romans 8:31 - "If God is for us, who can be against us?"', {
      fontSize: '12px',
      fontStyle: 'italic',
      color: '#ffd700'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
    
    // Animate entrance
    [title, missionTitle, missionText, featuresTitle, features, cta, scripture].forEach((txt, i) => {
      txt.setAlpha(0).setScale(0.8);
      this.tweens.add({
        targets: txt,
        alpha: 1,
        scale: 1,
        duration: 400,
        delay: i * 100,
        ease: 'Back.easeOut'
      });
    });
    
    // Fade out after 6 seconds (longer to read features)
    this.time.delayedCall(6000, () => {
      this.tweens.add({
        targets: [overlay, title, missionTitle, missionText, featuresTitle, features, cta, scripture],
        alpha: 0,
        duration: 500,
        onComplete: () => {
          overlay.destroy();
          title.destroy();
          missionTitle.destroy();
          missionText.destroy();
          featuresTitle.destroy();
          features.destroy();
          cta.destroy();
          scripture.destroy();
          
          // Show level intro
          this.showLevelIntro();
        }
      });
    });
  }
  
  // ========== LEVEL INTRO SPLASH - FAST & SKIPPABLE ==========
  showLevelIntro() {
    // Mark intro as active - prevents shooting
    this.splashActive = true;
    
    const level = btState.currentLevel;
    const config = LEVEL_CONFIG[level];
    const scene = sceneSequence[level - 1] || sceneSequence[0];
    
    // Create overlay
    const overlay = this.add.rectangle(GAME_WIDTH/2, GAME_HEIGHT/2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.85)
      .setScrollFactor(0).setDepth(1000);
    
    // Level number - BIG and clear
    const levelText = this.add.text(GAME_WIDTH/2, GAME_HEIGHT/2 - 60,
      `LEVEL ${level}`, {
      fontSize: '64px',
      fontStyle: 'bold',
      color: level === 7 ? '#ffd700' : '#ffffff',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
    
    // Scene name
    const sceneName = this.add.text(GAME_WIDTH/2, GAME_HEIGHT/2,
      scene ? scene.name : 'Unknown', {
      fontSize: '28px',
      fontStyle: 'bold',
      color: level === 7 ? '#ff4444' : '#88ccff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
    
    // Birds to kill - most important info
    const objective = this.add.text(GAME_WIDTH/2, GAME_HEIGHT/2 + 50,
      `🎯 Kill ${config.birdsToKill} birds to advance! 🎯`, {
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#ffff00'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
    
    // Skip hint
    const skipText = this.add.text(GAME_WIDTH/2, GAME_HEIGHT - 30, 
      'Click/tap to start!', {
      fontSize: '14px',
      color: '#aaaaaa'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
    
    const elements = [overlay, levelText, sceneName, objective, skipText];
    let introDone = false;
    const self = this;
    
    const closeIntro = () => {
      if (introDone) return;
      introDone = true;
      self.splashActive = false; // Re-enable shooting
      self.input.off('pointerdown', closeIntro);
      elements.forEach(el => { if (el && el.destroy) el.destroy(); });
    };
    
    // Make overlay interactive for click-to-skip
    overlay.setInteractive({ useHandCursor: true });
    overlay.on('pointerdown', closeIntro);
    
    // Also listen globally as backup
    this.input.once('pointerdown', closeIntro);
    
    // Auto-close after 0.8 seconds (FAST start!)
    this.time.delayedCall(800, closeIntro);
  }
  
  initJokeSystem() {
    // Daily jokes - ALL clean, bird-related humor!
    this.jokes = [
      // ========== BIBLE JOKES - Clean & Family Friendly ==========
      { setup: "How does Moses make his coffee?", punchline: "Hebrews it! ☕" },
      { setup: "Why couldn't Jonah trust the ocean?", punchline: "He knew there was something fishy about it! 🐟" },
      { setup: "Who was the best babysitter in the Bible?", punchline: "David - he rocked Goliath to sleep! 👶" },
      { setup: "What kind of man was Boaz before he married Ruth?", punchline: "Ruth-less! 💒" },
      { setup: "How do we know Peter was a rich fisherman?", punchline: "By his net income! 💰" },
      { setup: "Why did Noah punish the chickens on the Ark?", punchline: "They were using FOWL language! 🐔" },
      { setup: "What did Adam say the day before Christmas?", punchline: "It's Christmas, Eve! 🎄" },
      { setup: "Where is the best place to get an ice cream cone?", punchline: "Sundae School! 🍦" },
      { setup: "Who was the greatest financier in the Bible?", punchline: "Noah - he floated his stock while the world was in liquidation! 📈" },
      { setup: "Why did Moses break the Ten Commandments?", punchline: "He was the original tablet crasher! 📱" },
      { setup: "What's the best way to study the Bible?", punchline: "You Luke into it! 📖" },
      { setup: "Who was the smartest man in the Bible?", punchline: "Abraham - he knew a Lot! 🧠" },
      { setup: "Why did the hawk sit on the church steeple?", punchline: "It was a bird of pray! 🦅" },
      { setup: "What kind of car does Jesus drive?", punchline: "A Christler! 🚗" },
      { setup: "Why do mice pray?", punchline: "To Cheesus! 🐭" },
      { setup: "Why is Swiss the most religious cheese?", punchline: "It's hole-y! 🧀" },
      { setup: "What kind of lights did Noah use on the Ark?", punchline: "Floodlights! 💡" },
      { setup: "What do you call a Bible character who's always in a hurry?", punchline: "Russian! Wait... that's not in the Bible! 😂" },
      { setup: "How do you know God loves baseball?", punchline: "The Bible starts 'In the big inning'! ⚾" },
      { setup: "What's a missionary's favorite car?", punchline: "A convertible! 🚘" },
      
      // ========== DAD JOKES - Clean & Wholesome ==========
      { setup: "Why don't scientists trust atoms?", punchline: "Because they make up everything! ⚛️" },
      { setup: "What do you call a fake noodle?", punchline: "An impasta! 🍝" },
      { setup: "Why did the scarecrow win an award?", punchline: "He was outstanding in his field! 🌾" },
      { setup: "What did the ocean say to the beach?", punchline: "Nothing, it just waved! 🌊" },
      { setup: "Why don't eggs tell jokes?", punchline: "They'd crack each other up! 🥚" },
      { setup: "What do you call a bear with no teeth?", punchline: "A gummy bear! 🐻" },
      { setup: "Why did the bicycle fall over?", punchline: "It was two-tired! 🚲" },
      { setup: "What do you call cheese that isn't yours?", punchline: "Nacho cheese! 🧀" },
      { setup: "Why can't you give Elsa a balloon?", punchline: "She'll let it go! ❄️" },
      { setup: "What do you call a sleeping dinosaur?", punchline: "A dino-snore! 🦕" },
      { setup: "How do you organize a space party?", punchline: "You planet! 🚀" },
      { setup: "Why did the math book look so sad?", punchline: "It had too many problems! 📘" },
      { setup: "What do you call a fish without eyes?", punchline: "A fsh! 🐟" },
      { setup: "Why did the coffee file a police report?", punchline: "It got mugged! ☕" },
      { setup: "What did the janitor say when he jumped out of the closet?", punchline: "Supplies! 🧹" },
      { setup: "Why don't skeletons fight each other?", punchline: "They don't have the guts! 🎯" },
      { setup: "What do you call a dog that does magic?", punchline: "A Labracadabrador! 🐕" },
      { setup: "Why did the cookie go to the doctor?", punchline: "It was feeling crummy! 🍪" },
      { setup: "What's brown and sticky?", punchline: "A stick! 🪵" },
      { setup: "Why can't your nose be 12 inches long?", punchline: "Then it would be a foot! 👃" },
      
      // ========== BIRD JOKES - Classic Game Theme ==========
      { setup: "Why did Noah kick the chicken off the ark?", punchline: "He heard it was using FOWL language! 🐔" },
      { setup: "What do you call a bird that's afraid to fly?", punchline: "A chicken! 🐓" },
      { setup: "Why do birds fly south for the winter?", punchline: "Because it's too far to walk! 🦆" },
      { setup: "What's a bird's favorite subject in school?", punchline: "Owl-gebra! 🦉" },
      { setup: "Why did the bird go to the hospital?", punchline: "To get some tweetment! 🏥" },
      { setup: "What do you call a funny chicken?", punchline: "A comedi-HEN! 😂" },
      { setup: "Why was the pelican kicked out of the restaurant?", punchline: "He had a big bill! 🦅" },
      { setup: "What's a duck's favorite snack?", punchline: "Cheese and QUACKers! 🦆🧀" },
      { setup: "Why do seagulls fly over the sea?", punchline: "Because if they flew over the bay, they'd be bagels! 🥯" },
      { setup: "What do you call a parrot that flew away?", punchline: "A polygon! 🦜" },
      { setup: "Why do hummingbirds hum?", punchline: "Because they forgot the words! 🎵" },
      { setup: "What time does a duck wake up?", punchline: "At the quack of dawn! 🌅" },
      { setup: "What do ducks watch on TV?", punchline: "Duck-umentaries! 📺" },
      { setup: "Why did the turkey cross the road twice?", punchline: "To prove he wasn't chicken! 🦃" },
      { setup: "What do you call an owl magician?", punchline: "Hoo-dini! 🎩" },
      { setup: "What's a penguin's favorite relative?", punchline: "Aunt-arctica! 🐧" },
      { setup: "Why do flamingos stand on one leg?", punchline: "If they lifted the other, they'd fall! 🦩" },
      { setup: "What do you call two birds in love?", punchline: "Tweet-hearts! 💕" },
      { setup: "How do crows stick together?", punchline: "Vel-CROW! 🪶" },
      { setup: "Why are birds always online?", punchline: "They love to tweet! 🐤" },
      
      // ========== FAITH ENCOURAGEMENT JOKES ==========
      { setup: "Why did God make economists?", punchline: "To make weather forecasters look good! 🌤️" },
      { setup: "What did the lawyer ask about God's will?", punchline: "'Was it notarized?' ⚖️" },
      { setup: "Why did Jesus tell knock-knock jokes?", punchline: "Because He said 'knock and the door will be opened'! 🚪" },
      { setup: "What do you call a sleepwalking nun?", punchline: "A roamin' Catholic! 😴" },
      { setup: "Why don't church chairs ever panic?", punchline: "Because they always keep their composure in the pews! ⛪" },
      { setup: "What did the grape say when it got stepped on?", punchline: "Nothing, it just let out a little wine! 🍇" },
    ];
    this.lastJokeIndex = -1;
    this.jokeInterval = 45; // Show joke every 45 seconds
    
    // Track which jokes have been shown today
    this.shownJokesToday = [];
    
    // WELLNESS & HEALTHY GAMING SYSTEM
    this.sessionStartTime = Date.now();
    this.totalPlayTime = parseInt(localStorage.getItem('birdturds_totalPlayTime') || '0');
    this.lastBreakReminder = Date.now();
    this.breakInterval = 20 * 60 * 1000; // 20 minutes
    this.wellnessMessages = [
      // Break reminders with faith
      { type: 'break', msg: "⏰ You've been playing for a while! Time for a quick stretch AND a prayer?", icon: '🙏' },
      { type: 'break', msg: "💪 Gaming break tip: Stand up, stretch, and thank God for this day!", icon: '✝️' },
      { type: 'break', msg: "🚰 Stay hydrated! Grab some water and remember - Jesus is the living water!", icon: '💧' },
      { type: 'break', msg: "🌟 Pro tip: Taking breaks improves focus - use it to read a Bible verse!", icon: '📖' },
      // Family time with faith
      { type: 'family', msg: "👨‍👩‍👧‍👦 Family time is precious! Play this game TOGETHER with your family!", icon: '❤️' },
      { type: 'family', msg: "💝 Have you told your family you love them today? Honor your parents!", icon: '🏠' },
      { type: 'family', msg: "🍽️ Meals are better with family! Pray together before eating!", icon: '🙏' },
      { type: 'family', msg: "📱 Put down devices during family dinner - real connections matter!", icon: '🤝' },
      // Spiritual activities
      { type: 'spiritual', msg: "📖 Have you read your Bible today? Even one verse can change your day!", icon: '✝️' },
      { type: 'spiritual', msg: "🙏 Take 2 minutes to pray - God is always listening!", icon: '💫' },
      { type: 'spiritual', msg: "⛪ When's the last time you went to church? Fellowship matters!", icon: '🤝' },
      { type: 'spiritual', msg: "📺 Check out Pastor Jack Hibbs on YouTube for awesome Bible teaching!", icon: '🎬' },
      // Outdoor activities
      { type: 'outdoor', msg: "🌳 God's creation is amazing! Go explore the outdoors He made!", icon: '🏞️' },
      { type: 'outdoor', msg: "🚴 Bike rides, hikes, or just a walk - appreciate God's nature!", icon: '🌤️' },
      { type: 'outdoor', msg: "⚽ Real sports are fun too! Your body is a temple - keep it active!", icon: '🏃' },
      { type: 'outdoor', msg: "🐕 If you have a pet, God gave them to you - give them love!", icon: '🦮' },
      // Healthy habits with purpose
      { type: 'health', msg: "😴 Good sleep = sharper mind! Rest is a gift from God!", icon: '🛏️' },
      { type: 'health', msg: "📚 Balance is key! Have you done your homework/chores? Be responsible!", icon: '✅' },
      { type: 'health', msg: "🥦 Your body is a temple! Fuel it with good food!", icon: '🍎' },
      { type: 'health', msg: "🧠 Learning new skills is like leveling up - God gave you that brain!", icon: '📖' },
      // Positive reinforcement with faith
      { type: 'positive', msg: "⭐ You're fearfully and wonderfully made! Your worth is in Christ, not scores!", icon: '💫' },
      { type: 'positive', msg: "🌈 Real achievements > Virtual ones. What can you do for God today?", icon: '🏆' },
      { type: 'positive', msg: "😊 Be kind online AND offline - let your light shine!", icon: '💝' },
      { type: 'positive', msg: "📢 Share this game with friends and spread the message!", icon: '✨' },
    ];
    this.lastWellnessIndex = -1;
    
    // MULTIPLAYER STATE
    this.isMultiplayer = false;
    this.isOnline = false;
    this.roomCode = null;
    this.playerId = null;
    this.otherPlayers = new Map(); // Map of playerId -> sprite
    this.bots = []; // AI bot players
    this.maxBots = 3;
  }

  createGroups() {
    this.birds = this.physics.add.group();
    this.bullets = this.physics.add.group();
    this.turds = this.physics.add.group();
    this.groundTurds = this.physics.add.group();
    this.vehicles = this.physics.add.group();
    this.planes = this.physics.add.group();
    this.items = this.physics.add.group();
    this.coins = this.physics.add.group();
    this.animals = this.physics.add.group();
    this.npcs = this.physics.add.group();
    this.parachuters = this.physics.add.group();  // Friendly parachuting allies!
    this.ammoPickups = this.physics.add.group(); // Ammo box pickups
    
    // ========== TRACTOR ANIMATIONS ==========
    // Animated tractors with spinning wheels, driver raising hands, smoke
    if (this.textures.exists('tractor_good_anim')) {
      this.anims.create({
        key: 'tractor_good_right',
        frames: this.anims.generateFrameNumbers('tractor_good_anim', { start: 0, end: 4 }),
        frameRate: 12,
        repeat: -1
      });
    }
    if (this.textures.exists('tractor_good_left')) {
      this.anims.create({
        key: 'tractor_good_left',
        frames: this.anims.generateFrameNumbers('tractor_good_left', { start: 0, end: 4 }),
        frameRate: 12,
        repeat: -1
      });
    }
    if (this.textures.exists('tractor_bad_anim')) {
      this.anims.create({
        key: 'tractor_bad_right',
        frames: this.anims.generateFrameNumbers('tractor_bad_anim', { start: 0, end: 4 }),
        frameRate: 12,
        repeat: -1
      });
    }
    if (this.textures.exists('tractor_bad_left')) {
      this.anims.create({
        key: 'tractor_bad_left',
        frames: this.anims.generateFrameNumbers('tractor_bad_left', { start: 0, end: 4 }),
        frameRate: 12,
        repeat: -1
      });
    }
    
    // Initialize sound system
    this.initSoundSystem();
    
    // Initialize ElevenLabs voice system
    this.initVoiceSystem();
  }
  
  

  // ========== LIGHTWEIGHT DEBUG OVERLAY ==========
  // Toggle with F3 (desktop only). Shows FPS and basic entity counts for profiling.
  initDebugOverlay() {
    this.debugEnabled = false;
    try {
      this.debugText = this.add.text(10, 70, '', {
        fontSize: '11px',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        color: '#ffffff',
        backgroundColor: 'rgba(0,0,0,0.6)'
      }).setScrollFactor(0).setDepth(3000).setVisible(false);
    } catch (e) {
      console.warn('Debug overlay text failed to init:', e);
      this.debugText = null;
    }

    if (this.input && this.input.keyboard) {
      this.input.keyboard.on('keydown-F3', () => {
        this.debugEnabled = !this.debugEnabled;
        if (this.debugText) {
          this.debugText.setVisible(this.debugEnabled);
        }
      });
    }
  }

  updateDebugOverlay(dt) {
    if (!this.debugEnabled || !this.debugText) return;

    const loop = this.game && this.game.loop;
    const fps = loop && loop.actualFps ? Math.round(loop.actualFps) : Math.round(1 / (dt || 0.016));

    const birds = this.birds ? this.birds.countActive(true) : 0;
    const vehicles = this.vehicles ? this.vehicles.countActive(true) : 0;
    const bullets = this.bullets ? this.bullets.countActive(true) : 0;
    const coins = this.coins ? this.coins.countActive(true) : 0;
    const animals = this.animals ? this.animals.countActive(true) : 0;

    this.debugText.setText(
      `FPS: ${fps}\n` +
      `Birds: ${birds}  Vehicles: ${vehicles}\n` +
      `Bullets: ${bullets}  Coins: ${coins}\n` +
      `Animals: ${animals}  Level: ${btState.currentLevel}`
    );
  }

// ========== ELEVENLABS VOICE SYSTEM ==========
  initVoiceSystem() {
    // Voice settings - SEPARATE from game SFX
    this.voiceEnabled = localStorage.getItem('birdturds_voice') !== 'false';
    this.voiceVolume = parseFloat(localStorage.getItem('birdturds_voiceVolume') || '0.8');
    this.voiceQueue = [];
    this.voicePlaying = false;
    
    // ElevenLabs API config - Multiple voices for each character
    this.elevenLabsConfig = {
      apiKey: '00f20c36fa96c1609dfe42bdde9c69035f585c6837c915536f9d761e7dd80fd0',
      modelId: 'eleven_monolingual_v1',
      // Default narrator voice
      narratorVoiceId: 'Enon49nSds4wDZZqnHN1', jokeVoiceId: 'dHd5gvgSOzSfduK4CvEg',
      // Trump-style confident American male voice
      trumpVoiceId: 'pNInz6obpgDQGcFmaJgB', // "Adam" - confident, authoritative
      
      // ========== CHARACTER VOICES ==========
      // Each hunter has a unique ElevenLabs voice ID
      characterVoices: {
        buck: {
          voiceId: 'TxGEqnHWrfWFTfGW9XjX', // "Josh" - rugged American male
          stability: 0.5,
          style: 0.6,
          pitch: 'low'
        },
        daisy: {
          voiceId: 'EXAVITQu4vr4xnSDxMaL', // "Bella" - young American female
          stability: 0.6,
          style: 0.5,
          pitch: 'medium'
        },
        bubba: {
          voiceId: 'VR6AewLTigWG4xSOukaG', // "Arnold" - deep southern male
          stability: 0.4,
          style: 0.7,
          pitch: 'very_low'
        },
        clyde: {
          voiceId: '2EiwWnXFnvU5JabPnv8n', // "Clyde" - gruff older male
          stability: 0.5,
          style: 0.4,
          pitch: 'low'
        },
        sierra: {
          voiceId: 'jBpfuIE2acCO8z3wKNLl', // "Gigi" - sassy female
          stability: 0.5,
          style: 0.7,
          pitch: 'high'
        },
        gunner: {
          voiceId: 'N2lVS1w4EtoT3dr4eOWO', // "Callum" - military male
          stability: 0.6,
          style: 0.5,
          pitch: 'medium_low'
        },
        jolene: {
          voiceId: 'XB0fDUnXU5powFXDhCwa', // "Charlotte" - mature female
          stability: 0.5,
          style: 0.5,
          pitch: 'medium'
        },
        tammy: {
          voiceId: 'pFZP5JQG7iQjIQuC4Bku', // "Lily" - soft-spoken female
          stability: 0.6,
          style: 0.4,
          pitch: 'medium_high'
        }
      }
    };
    
    // ========== CHARACTER BIOS & COMBAT LINES ==========
    this.characterProfiles = {
      buck: {
        name: 'Buck "Deadeye" Thompson',
        age: 42,
        hometown: 'Amarillo, Texas',
        weapon: 'Lever-Action Rifle',
        specialty: 'Long-range precision shots',
        bio: 'A 5th generation rancher from the Texas Panhandle. Buck learned to shoot before he could ride, and he could ride by age 3. His grandfather fought in WWII and his daddy was a rodeo champion. Buck\'s never missed a shot that mattered.',
        skills: ['Eagle Eye (+15% accuracy)', 'Quick Draw (-0.2s reload)', 'Rattlesnake Reflexes'],
        greeting: 'Howdy partner! Ready to bag some birds?',
        wave: 'Tips his cowboy hat',
        combatLines: [
          'Got em right between the eyes!',
          'That\'s how we do it in Texas!',
          'Yeehaw! Another one bites the dust!',
          'Keep em coming, I got all day!',
          'My grandpappy would be proud!',
          'Ain\'t no bird gonna mess with this ranch!',
          'Let\'s drain this swamp!',
          'God bless America!',
          'We\'re almost there boys!',
          'Good shooting partner!'
        ],
        hurtLines: ['Just a scratch!', 'That all you got?', 'I\'ve had worse!'],
        killStreakLines: ['I\'m on fire!', 'Can\'t stop won\'t stop!', 'Who wants some?!']
      },
      daisy: {
        name: 'Daisy Mae Reynolds',
        age: 28,
        hometown: 'Nashville, Tennessee',
        weapon: 'Double-Barrel Shotgun',
        specialty: 'Close-range devastation',
        bio: 'Former competitive skeet shooter turned country music singer. Daisy won 3 national championships before age 20. When she\'s not on stage, she\'s protecting her family\'s 200-acre farm from varmints.',
        skills: ['Spread Shot (+20% pellet spread)', 'Quick Reload', 'Country Strong'],
        greeting: 'Hey y\'all! Let\'s show these birds who\'s boss!',
        wave: 'Blows a kiss and winks',
        combatLines: [
          'Boom! That\'s what I\'m talking about!',
          'Sweet as sugar, deadly as venom!',
          'Mama didn\'t raise no quitter!',
          'That one\'s for Nashville!',
          'Y\'all picked the wrong farm!',
          'Keep pushing forward y\'all!',
          'We got this in the bag!',
          'Lord give me strength!',
          'Another one down!',
          'Feels good to be winning!'
        ],
        hurtLines: ['Ouch! That\'s gonna leave a mark!', 'Oh no you didn\'t!', 'Now I\'m mad!'],
        killStreakLines: ['I\'m unstoppable!', 'Queen of the hunt!', 'Try and stop me!']
      },
      bubba: {
        name: 'Bubba "Gator" Jackson',
        age: 55,
        hometown: 'Bayou La Batre, Alabama',
        weapon: 'Heavy Double-Barrel',
        specialty: 'Maximum damage per shot',
        bio: 'Swamp guide for 30 years, Bubba knows every creature that crawls, flies, or swims in the Louisiana bayou. Survived 3 gator attacks and once wrestled a 12-footer. His shotgun is named "Bertha."',
        skills: ['Swamp Knowledge (+25% animal damage)', 'Gator Skin (+15 HP)', 'Heavy Hitter'],
        greeting: 'Well I\'ll be! Time to go huntin\'!',
        wave: 'Raises shotgun overhead',
        combatLines: [
          'That\'s what Bertha thinks of ya!',
          'Woo-wee! Got em good!',
          'Back to the swamp with ya!',
          'I\'ve wrestled gators tougher than you!',
          'Bubba don\'t miss!',
          'Hot dang that was a good shot!',
          'We\'re making progress boys!',
          'Almost to the finish line!',
          'Keep your eyes peeled!',
          'Drain that swamp!'
        ],
        hurtLines: ['Gator bites hurt worse!', 'That tickled!', 'You call that an attack?'],
        killStreakLines: ['Bubba\'s on a roll!', 'Can\'t touch this!', 'Fear the gator!']
      },
      clyde: {
        name: 'Clyde "Mountain" Morrison',
        age: 62,
        hometown: 'Jackson Hole, Wyoming',
        weapon: 'Bolt-Action Hunting Rifle',
        specialty: 'One-shot kills from any range',
        bio: 'Former park ranger who spent 40 years in the Rockies. Clyde can track a mouse through a blizzard and shoot a fly off a deer\'s ear at 500 yards. Lives off-grid in a cabin he built himself.',
        skills: ['Tracker (+30% critical hit)', 'Mountain Man (no fall damage)', 'Patience'],
        greeting: 'Mountains are calling. Let\'s hunt.',
        wave: 'Nods stoically',
        combatLines: [
          'One shot. One kill.',
          'The mountain provides.',
          'Patience pays off.',
          'Clean hit.',
          'Nature\'s balance restored.',
          'Steady hands, clear mind.',
          'We press forward.',
          'Stay focused team.',
          'Almost there.',
          'Good work everyone.'
        ],
        hurtLines: ['I\'ve survived worse winters.', 'Pain is temporary.', 'Not my first wound.'],
        killStreakLines: ['The mountain is with me.', 'Unstoppable force.', 'Nothing can stop us.']
      },
      sierra: {
        name: 'Sierra "Quickdraw" Valdez',
        age: 32,
        hometown: 'El Paso, Texas',
        weapon: 'Twin Revolvers',
        specialty: 'Fastest fire rate in the West',
        bio: 'Competitive quick-draw champion and stunt performer. Sierra\'s family has been on the border for 7 generations. She learned to shoot from her abuela, a legendary sharpshooter in her own right.',
        skills: ['Lightning Hands (+40% fire rate)', 'Dual Wield', 'Acrobat'],
        greeting: '¡Vamos! Let\'s dance with these birds!',
        wave: 'Twirls both revolvers',
        combatLines: [
          '¡Ándale! Too slow!',
          'Abuela taught me well!',
          'Fastest guns in the West!',
          'You blinked - you lost!',
          '¡Ay caramba! Got another one!',
          'Let\'s keep moving amigos!',
          'We\'re doing great!',
          'Stay sharp everyone!',
          'Victory is close!',
          '¡Viva America!'
        ],
        hurtLines: ['¡Ay! That stung!', 'Lucky shot!', 'Now you made me angry!'],
        killStreakLines: ['¡Fuego! I\'m on fire!', 'Can\'t catch me!', 'Unstoppable!']
      },
      gunner: {
        name: 'Sergeant Marcus "Gunner" Williams',
        age: 38,
        hometown: 'Fort Bragg, North Carolina',
        weapon: 'M249 Squad Automatic Weapon',
        specialty: 'Suppressive fire and crowd control',
        bio: '3 tours in Afghanistan, 2 Purple Hearts, and a Silver Star. Gunner left the Army but the Army never left him. Now he defends the homeland from a different kind of threat. Semper Fi.',
        skills: ['Suppressive Fire (+50% ammo)', 'Combat Training', 'Iron Will'],
        greeting: 'Lock and load! Time to defend freedom!',
        wave: 'Crisp military salute',
        combatLines: [
          'Tango down!',
          'Area secured!',
          'For God and country!',
          'Contact eliminated!',
          'Hooah! Keep moving!',
          'Stay frosty people!',
          'Push forward! Almost there!',
          'Outstanding work team!',
          'We will not fail!',
          'Defend the homeland!'
        ],
        hurtLines: ['I\'ve had worse in basic!', 'Flesh wound!', 'Still combat effective!'],
        killStreakLines: ['Weapons free!', 'They can\'t stop us!', 'Victory is ours!']
      },
      jolene: {
        name: 'Jolene Parker',
        age: 48,
        hometown: 'Lexington, Kentucky',
        weapon: 'Custom Hunting Rifle',
        specialty: 'Balanced stats, leadership bonus',
        bio: 'Owner of a 5,000-acre cattle ranch and mother of 4. Jolene\'s been managing land and livestock her whole life. When birds threaten her herd, she handles it personally. Her ranch has been in the family since 1847.',
        skills: ['Leadership (+10% team bonus)', 'Ranch Owner', 'Determined'],
        greeting: 'This is my land. Let\'s protect it.',
        wave: 'Tips her sun hat',
        combatLines: [
          'Not on my ranch you don\'t!',
          'The Parker way - get it done!',
          'My land, my rules!',
          'That\'s for my cattle!',
          'We protect what\'s ours!',
          'Keep fighting everyone!',
          'We\'re almost home free!',
          'Stay strong team!',
          'God\'s on our side!',
          'Together we win!'
        ],
        hurtLines: ['I\'ve birthed 4 kids, this is nothing!', 'Takes more than that!', 'Still standing!'],
        killStreakLines: ['Mama bear mode!', 'Don\'t mess with Texas!', 'Unstoppable!']
      },
      tammy: {
        name: 'Tammy "Ghost" Chen',
        age: 26,
        hometown: 'Austin, Texas',
        weapon: 'Compound Crossbow',
        specialty: 'Silent kills, stealth bonus',
        bio: 'Former Olympic archery hopeful turned wildlife conservationist. Tammy believes in ethical hunting and clean kills. She volunteers at animal shelters and only hunts invasive species and threats to the ecosystem.',
        skills: ['Silent Strike (no sound)', 'Stealth Mode', 'Precision'],
        greeting: 'Shh... let\'s do this quietly.',
        wave: 'Small wave with fingers',
        combatLines: [
          'Silent but deadly.',
          'Never saw it coming.',
          'Clean kill.',
          'Conservation in action.',
          'Precision over power.',
          'Moving forward quietly.',
          'Stay low, stay quiet.',
          'We\'re doing great.',
          'Almost to victory.',
          'For the ecosystem.'
        ],
        hurtLines: ['Ow! Stay focused...', 'I\'m okay...', 'Just a scratch...'],
        killStreakLines: ['In the zone.', 'Ghost mode activated.', 'Can\'t see me coming.']
      }
    };
    
    // Combat line cooldown (don't spam)
    this.lastCombatLineTime = 0;
    this.combatLineCooldown = 8000; // 8 seconds between lines
    
    // Character-specific TURD reaction lines
    this.turdReactionLines = {
      buck: [
        "Holy turds, that's nasty!",
        "Dag nabbit, got me good!",
        "Well butter my biscuit in turd!",
        "That bird's got aim!",
        "Consarnit! Right on my hat!"
      ],
      daisy: [
        "Ewww! My hair!",
        "Oh no you didn't!",
        "That's just wrong!",
        "Gross gross gross!",
        "This is SO not okay!"
      ],
      bubba: [
        "Woo-wee that's a big one!",
        "Smells worse than the swamp!",
        "Hot dang, direct hit!",
        "That's nastier than gator breath!",
        "Bertha's gonna make em pay!"
      ],
      clyde: [
        "Nature's revenge.",
        "The mountain tests me.",
        "I've survived worse.",
        "A minor setback.",
        "Patience..."
      ],
      sierra: [
        "¡Ay caramba!",
        "¡Qué asco!",
        "Oh that's nasty!",
        "You're gonna pay for that!",
        "Now I'm really mad!"
      ],
      gunner: [
        "Hostile turd incoming!",
        "Taking fire!",
        "Man down... in turd!",
        "This ain't basic training!",
        "Turd at 12 o'clock!"
      ],
      jolene: [
        "Not on my ranch you don't!",
        "That's disgusting!",
        "I've cleaned worse from the barn!",
        "You messed with the wrong rancher!",
        "This means war!"
      ],
      tammy: [
        "Ew... gross...",
        "That was sneaky...",
        "Didn't see that coming...",
        "So much for stealth...",
        "Need to clean up..."
      ]
    };
    
    // Cache for generated audio (saves API calls)
    this.voiceCache = {};
    this.voiceAudioCtxReady = false;
    
    // DEFER voice audio context creation until first speech request
    console.log('🎤 Voice system ready (will init on first speech)');
  }
  
  // Speak text using ElevenLabs - DOES NOT affect game sounds
  async speakText(text, type = 'scripture') {
    if (!this.voiceEnabled || btState.silentMode) return;
    
    // LAZY INIT: Create voice AudioContext on first use
    if (!this.voiceAudioCtxReady) {
      try {
        this.voiceAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.voiceGain = this.voiceAudioCtx.createGain();
        this.voiceGain.gain.value = this.voiceVolume;
        this.voiceGain.connect(this.voiceAudioCtx.destination);
        this.voiceAudioCtxReady = true;
        console.log('🎤 Voice AudioContext initialized');
      } catch(e) {
        console.warn('Voice audio context failed:', e);
        return;
      }
    }
    
    // Check if voice is muted for this type
    const jokesMuted = localStorage.getItem('birdturds_muteJokes') === 'true';
    const scripturesMuted = localStorage.getItem('birdturds_muteScriptures') === 'true';
    
    if (type === 'joke' && jokesMuted) return;
    if (type === 'scripture' && scripturesMuted) return;
    
    // Check cache first
    const cacheKey = text.substring(0, 50);
    if (this.voiceCache[cacheKey]) {
      this.playVoiceAudio(this.voiceCache[cacheKey]);
      return;
    }
    
    // Queue the voice request
    this.voiceQueue.push({ text, type, cacheKey });
    this.processVoiceQueue();
  }
  
  // Speak Trump quotes with Trump-style voice
  async speakTrumpQuote(text) {
    if (!this.voiceEnabled) return;
    
    const cacheKey = 'trump_' + text.substring(0, 40);
    if (this.voiceCache[cacheKey]) {
      this.playVoiceAudio(this.voiceCache[cacheKey]);
      return;
    }
    
    this.voiceQueue.push({ text, type: 'trump', cacheKey, voiceId: this.elevenLabsConfig.trumpVoiceId });
    this.processVoiceQueue();
  }
  
  // ========== CHARACTER VOICE SYSTEM ==========
  
  // Speak as the current character
  async speakAsCharacter(text, characterId = null) {
    if (!this.voiceEnabled) return;
    
    const charId = characterId || btState.currentCharacter || 'buck';
    const voiceConfig = this.elevenLabsConfig.characterVoices[charId];
    
    if (!voiceConfig) return;
    
    const cacheKey = `char_${charId}_${text.substring(0, 30)}`;
    if (this.voiceCache[cacheKey]) {
      this.playVoiceAudio(this.voiceCache[cacheKey]);
      return;
    }
    
    this.voiceQueue.push({ 
      text, 
      type: 'character', 
      cacheKey, 
      voiceId: voiceConfig.voiceId,
      stability: voiceConfig.stability,
      style: voiceConfig.style
    });
    this.processVoiceQueue();
  }
  
  // Play character greeting when selected
  playCharacterGreeting(characterId) {
    const profile = this.characterProfiles[characterId];
    if (profile && profile.greeting) {
      this.speakAsCharacter(profile.greeting, characterId);
    }
  }
  
  // Play random combat line (with cooldown to prevent spam)
  playRandomCombatLine() {
    const now = Date.now();
    if (now - this.lastCombatLineTime < this.combatLineCooldown) return;
    
    const charId = btState.currentCharacter || 'buck';
    const profile = this.characterProfiles[charId];
    
    if (profile && profile.combatLines && profile.combatLines.length > 0) {
      const line = profile.combatLines[Math.floor(Math.random() * profile.combatLines.length)];
      this.speakAsCharacter(line, charId);
      this.lastCombatLineTime = now;
    }
  }
  
  // Play hurt line when taking damage
  playHurtLine() {
    const charId = btState.currentCharacter || 'buck';
    const profile = this.characterProfiles[charId];
    
    if (profile && profile.hurtLines && profile.hurtLines.length > 0) {
      const line = profile.hurtLines[Math.floor(Math.random() * profile.hurtLines.length)];
      this.speakAsCharacter(line, charId);
    }
  }
  
  // Play turd-specific reaction (funnier than generic hurt)
  playTurdReactionLine() {
    const charId = btState.currentCharacter || 'buck';
    const lines = this.turdReactionLines[charId];
    
    if (lines && lines.length > 0) {
      const line = lines[Math.floor(Math.random() * lines.length)];
      this.speakAsCharacter(line, charId);
    }
  }
  
  // Play kill streak line for big combos
  playKillStreakLine() {
    const charId = btState.currentCharacter || 'buck';
    const profile = this.characterProfiles[charId];
    
    if (profile && profile.killStreakLines && profile.killStreakLines.length > 0) {
      const line = profile.killStreakLines[Math.floor(Math.random() * profile.killStreakLines.length)];
      this.speakAsCharacter(line, charId);
    }
  }
  
  // Make character wave (animation)
  playCharacterWave() {
    if (!this.hunter || !this.hunter.active) return;
    
    // Store original state
    const originalFlipX = this.hunter.flipX;
    
    // Wave animation - arm raise effect using rotation
    this.tweens.add({
      targets: this.hunter,
      rotation: 0.2,
      duration: 200,
      yoyo: true,
      repeat: 2,
      onComplete: () => {
        this.hunter.rotation = 0;
      }
    });
    
    // Show wave emoji above head
    const waveEmoji = this.add.text(this.hunter.x, this.hunter.y - 80, '👋', {
      fontSize: '32px'
    }).setOrigin(0.5).setDepth(100);
    
    this.tweens.add({
      targets: waveEmoji,
      y: waveEmoji.y - 30,
      alpha: 0,
      duration: 1000,
      onComplete: () => waveEmoji.destroy()
    });
  }
  
  // Get character profile for UI display
  getCharacterProfile(characterId) {
    return this.characterProfiles[characterId] || this.characterProfiles.buck;
  }
  
  // ========== CLEAN TEXT FOR NATURAL SPEECH ==========
  // Converts written text to how a human would naturally read it
  cleanTextForSpeech(text) {
    if (!text) return '';
    
    let cleaned = text;
    
    // Remove emojis (ElevenLabs can't read them)
    cleaned = cleaned.replace(/[\u{1F600}-\u{1F64F}]/gu, ''); // Emoticons
    cleaned = cleaned.replace(/[\u{1F300}-\u{1F5FF}]/gu, ''); // Misc symbols
    cleaned = cleaned.replace(/[\u{1F680}-\u{1F6FF}]/gu, ''); // Transport
    cleaned = cleaned.replace(/[\u{1F1E0}-\u{1F1FF}]/gu, ''); // Flags
    cleaned = cleaned.replace(/[\u{2600}-\u{26FF}]/gu, '');   // Misc symbols
    cleaned = cleaned.replace(/[\u{2700}-\u{27BF}]/gu, '');   // Dingbats
    cleaned = cleaned.replace(/[\u{FE00}-\u{FE0F}]/gu, '');   // Variation selectors
    cleaned = cleaned.replace(/[\u{1F900}-\u{1F9FF}]/gu, ''); // Supplemental
    cleaned = cleaned.replace(/[\u{1FA00}-\u{1FA6F}]/gu, ''); // Chess etc
    cleaned = cleaned.replace(/[\u{1FA70}-\u{1FAFF}]/gu, ''); // Symbols extended
    cleaned = cleaned.replace(/[\u{231A}-\u{231B}]/gu, '');   // Watch/hourglass
    cleaned = cleaned.replace(/[\u{23E9}-\u{23F3}]/gu, '');   // Media controls
    cleaned = cleaned.replace(/[\u{23F8}-\u{23FA}]/gu, '');   // More media
    cleaned = cleaned.replace(/[\u{25AA}-\u{25AB}]/gu, '');   // Squares
    cleaned = cleaned.replace(/[\u{25B6}]/gu, '');            // Play button
    cleaned = cleaned.replace(/[\u{25C0}]/gu, '');            // Reverse
    cleaned = cleaned.replace(/[\u{25FB}-\u{25FE}]/gu, '');   // More squares
    cleaned = cleaned.replace(/[\u{2614}-\u{2615}]/gu, '');   // Umbrella/coffee
    cleaned = cleaned.replace(/[\u{2648}-\u{2653}]/gu, '');   // Zodiac
    cleaned = cleaned.replace(/[\u{267F}]/gu, '');            // Wheelchair
    cleaned = cleaned.replace(/[\u{2693}]/gu, '');            // Anchor
    cleaned = cleaned.replace(/[\u{26A1}]/gu, '');            // Lightning
    cleaned = cleaned.replace(/[\u{26AA}-\u{26AB}]/gu, '');   // Circles
    cleaned = cleaned.replace(/[\u{26BD}-\u{26BE}]/gu, '');   // Sports
    cleaned = cleaned.replace(/[\u{26C4}-\u{26C5}]/gu, '');   // Weather
    cleaned = cleaned.replace(/[\u{26CE}]/gu, '');            // Ophiuchus
    cleaned = cleaned.replace(/[\u{26D4}]/gu, '');            // No entry
    cleaned = cleaned.replace(/[\u{26EA}]/gu, '');            // Church
    cleaned = cleaned.replace(/[\u{26F2}-\u{26F3}]/gu, '');   // Fountain/golf
    cleaned = cleaned.replace(/[\u{26F5}]/gu, '');            // Sailboat
    cleaned = cleaned.replace(/[\u{26FA}]/gu, '');            // Tent
    cleaned = cleaned.replace(/[\u{26FD}]/gu, '');            // Fuel pump
    cleaned = cleaned.replace(/[\u{2702}]/gu, '');            // Scissors
    cleaned = cleaned.replace(/[\u{2705}]/gu, '');            // Check mark
    cleaned = cleaned.replace(/[\u{2708}-\u{270D}]/gu, '');   // Airplane etc
    cleaned = cleaned.replace(/[\u{270F}]/gu, '');            // Pencil
    cleaned = cleaned.replace(/[\u{2712}]/gu, '');            // Black nib
    cleaned = cleaned.replace(/[\u{2714}]/gu, '');            // Check
    cleaned = cleaned.replace(/[\u{2716}]/gu, '');            // X mark
    cleaned = cleaned.replace(/[\u{271D}]/gu, '');            // Cross
    cleaned = cleaned.replace(/[\u{2721}]/gu, '');            // Star of David
    cleaned = cleaned.replace(/[\u{2728}]/gu, '');            // Sparkles
    cleaned = cleaned.replace(/[\u{2733}-\u{2734}]/gu, '');   // Eight spoked
    cleaned = cleaned.replace(/[\u{2744}]/gu, '');            // Snowflake
    cleaned = cleaned.replace(/[\u{2747}]/gu, '');            // Sparkle
    cleaned = cleaned.replace(/[\u{274C}]/gu, '');            // Cross mark
    cleaned = cleaned.replace(/[\u{274E}]/gu, '');            // Cross mark
    cleaned = cleaned.replace(/[\u{2753}-\u{2755}]/gu, '');   // Question marks
    cleaned = cleaned.replace(/[\u{2757}]/gu, '');            // Exclamation
    cleaned = cleaned.replace(/[\u{2763}-\u{2764}]/gu, '');   // Hearts
    cleaned = cleaned.replace(/[\u{2795}-\u{2797}]/gu, '');   // Math
    cleaned = cleaned.replace(/[\u{27A1}]/gu, '');            // Arrow
    cleaned = cleaned.replace(/[\u{27B0}]/gu, '');            // Curly loop
    cleaned = cleaned.replace(/[\u{27BF}]/gu, '');            // Double curly
    cleaned = cleaned.replace(/[\u{2934}-\u{2935}]/gu, '');   // Arrows
    cleaned = cleaned.replace(/[\u{2B05}-\u{2B07}]/gu, '');   // Arrows
    cleaned = cleaned.replace(/[\u{2B1B}-\u{2B1C}]/gu, '');   // Squares
    cleaned = cleaned.replace(/[\u{2B50}]/gu, '');            // Star
    cleaned = cleaned.replace(/[\u{2B55}]/gu, '');            // Circle
    cleaned = cleaned.replace(/[\u{3030}]/gu, '');            // Wavy dash
    cleaned = cleaned.replace(/[\u{303D}]/gu, '');            // Part mark
    cleaned = cleaned.replace(/[\u{3297}]/gu, '');            // Circled
    cleaned = cleaned.replace(/[\u{3299}]/gu, '');            // Circled
    
    // Convert Bible verse references to natural speech
    // "John 3:16" -> "John chapter 3 verse 16"
    cleaned = cleaned.replace(/(\d+):(\d+)/g, 'chapter $1 verse $2');
    
    // Convert common abbreviations to full words
    cleaned = cleaned.replace(/\bvs\.?\b/gi, 'versus');
    cleaned = cleaned.replace(/\betc\.?\b/gi, 'etcetera');
    cleaned = cleaned.replace(/\be\.g\.?\b/gi, 'for example');
    cleaned = cleaned.replace(/\bi\.e\.?\b/gi, 'that is');
    cleaned = cleaned.replace(/\bDr\.\s/gi, 'Doctor ');
    cleaned = cleaned.replace(/\bMr\.\s/gi, 'Mister ');
    cleaned = cleaned.replace(/\bMrs\.\s/gi, 'Missus ');
    cleaned = cleaned.replace(/\bMs\.\s/gi, 'Miss ');
    cleaned = cleaned.replace(/\bSt\.\s/gi, 'Saint ');
    cleaned = cleaned.replace(/\bSgt\.\s/gi, 'Sergeant ');
    cleaned = cleaned.replace(/\bGen\.\s/gi, 'General ');
    cleaned = cleaned.replace(/\bCol\.\s/gi, 'Colonel ');
    cleaned = cleaned.replace(/\bLt\.\s/gi, 'Lieutenant ');
    cleaned = cleaned.replace(/\bCpl\.\s/gi, 'Corporal ');
    cleaned = cleaned.replace(/\bPvt\.\s/gi, 'Private ');
    
    // Convert numbers to be spoken more naturally
    // "$100" -> "100 dollars"
    cleaned = cleaned.replace(/\$(\d+(?:,\d{3})*(?:\.\d{2})?)/g, '$1 dollars');
    cleaned = cleaned.replace(/(\d+)%/g, '$1 percent');
    cleaned = cleaned.replace(/#(\d+)/g, 'number $1');
    
    // Remove extra punctuation that might be read literally
    cleaned = cleaned.replace(/\.{3,}/g, '...'); // Multiple periods to ellipsis
    cleaned = cleaned.replace(/!{2,}/g, '!');     // Multiple ! to single
    cleaned = cleaned.replace(/\?{2,}/g, '?');    // Multiple ? to single
    
    // Remove parentheses content or make it flow naturally
    cleaned = cleaned.replace(/\s*\([^)]*\)\s*/g, ', '); // Remove parenthetical
    
    // Remove brackets
    cleaned = cleaned.replace(/\[|\]/g, '');
    
    // Convert & to "and"
    cleaned = cleaned.replace(/\s*&\s*/g, ' and ');
    
    // Clean up multiple spaces
    cleaned = cleaned.replace(/\s+/g, ' ');
    
    // Trim
    cleaned = cleaned.trim();
    
    return cleaned;
  }
  
  async processVoiceQueue() {
    if (this.voicePlaying || this.voiceQueue.length === 0) return;
    
    this.voicePlaying = true;
    const item = this.voiceQueue.shift();
    
    // CLEAN THE TEXT FOR NATURAL SPEECH
    const cleanedText = this.cleanTextForSpeech(item.text);
    
    // Skip if text is empty after cleaning
    if (!cleanedText || cleanedText.length < 2) {
      this.voicePlaying = false;
      this.processVoiceQueue();
      return;
    }
    
    // Select voice based on type
    let voiceId, stability, style;
    
    if (item.type === 'trump') {
      // TRUMP uses Web Speech API - NOT ElevenLabs
      this.speakTrumpWithWebSpeech(cleanedText);
      this.voicePlaying = false;
      this.processVoiceQueue();
      return;
    } else if (item.type === 'character') {
      voiceId = item.voiceId;
      stability = item.stability || 0.5;
      style = item.style || 0.5;
    } else if (item.type === 'joke') {
      // Jokes use dedicated joke voice
      voiceId = this.elevenLabsConfig.jokeVoiceId;
      stability = 0.5;
      style = 0.6;
    } else {
      // Scripture and default use narrator/scripture voice
      voiceId = this.elevenLabsConfig.narratorVoiceId;
      stability = 0.6;
      style = 0.4;
    }
    
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + voiceId, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.elevenLabsConfig.apiKey
        },
        body: JSON.stringify({
          text: cleanedText, // USE CLEANED TEXT
          model_id: this.elevenLabsConfig.modelId,
          voice_settings: {
            stability: stability,
            similarity_boost: 0.75,
            style: style,
            use_speaker_boost: true
          }
        })
      });
      
      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Cache it
        this.voiceCache[item.cacheKey] = audioUrl;
        
        // Play it (on separate audio channel)
        this.playVoiceAudio(audioUrl);
      } else {
        console.warn('ElevenLabs API error:', response.status);
        this.voicePlaying = false;
        this.processVoiceQueue();
      }
    } catch(e) {
      console.warn('Voice synthesis failed:', e);
      this.voicePlaying = false;
      this.processVoiceQueue();
    }
  }
  
  playVoiceAudio(audioUrl) {
    const audio = new Audio(audioUrl);
    audio.volume = this.voiceVolume;
    
    // Lower MUSIC volume while speaking (not SFX!)
    const originalMusicVol = this.musicVolume;
    if (this.musicGain) {
      this.musicGain.gain.value = originalMusicVol * 0.15; // Duck music more
    }
    
    audio.onended = () => {
      // Restore music volume
      if (this.musicGain) {
        this.musicGain.gain.value = originalMusicVol * 0.3;
      }
      this.voicePlaying = false;
      this.processVoiceQueue();
    };
    
    audio.onerror = () => {
      this.voicePlaying = false;
      this.processVoiceQueue();
    };
    
    audio.play().catch(() => {
      this.voicePlaying = false;
      this.processVoiceQueue();
    });
  }
  
  // Toggle voice on/off
  toggleVoice() {
    this.voiceEnabled = !this.voiceEnabled;
    localStorage.setItem('birdturds_voice', this.voiceEnabled);
    this.showNotification(this.voiceEnabled ? '🎤 Voice ON' : '🔇 Voice OFF');
  }
  
  // Trump voice using Web Speech API (deep, confident, authoritative)
  speakTrumpWithWebSpeech(text) {
    if (!window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get available voices and pick best one for Trump
    const voices = speechSynthesis.getVoices();
    let trumpVoice = voices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('male'));
    if (!trumpVoice) trumpVoice = voices.find(v => v.lang === 'en-US');
    if (!trumpVoice) trumpVoice = voices.find(v => v.lang.startsWith('en'));
    if (!trumpVoice && voices.length > 0) trumpVoice = voices[0];
    
    if (trumpVoice) utterance.voice = trumpVoice;
    
    // Trump voice settings: deep, confident, deliberate pace
    utterance.pitch = 0.85;     // Lower pitch for authoritative sound
    utterance.rate = 0.88;      // Slightly slower, deliberate pace
    utterance.volume = this.voiceVolume;
    
    // Lower music volume while speaking
    const originalMusicVol = this.musicVolume;
    if (this.musicGain) {
      this.musicGain.gain.value = originalMusicVol * 0.15;
    }
    
    utterance.onend = () => {
      if (this.musicGain) {
        this.musicGain.gain.value = originalMusicVol * 0.3;
      }
    };
    
    speechSynthesis.speak(utterance);
  }

  initSoundSystem() {
    // DEFER AudioContext creation until first user interaction
    // This prevents the browser warning spam
    this.audioCtxReady = false;
    this.soundEnabled = localStorage.getItem('birdturds_sound') !== 'false';
    this.musicEnabled = localStorage.getItem('birdturds_music') !== 'false';
    this.sfxVolume = parseFloat(localStorage.getItem('birdturds_sfxVolume') || '0.6');
    this.musicVolume = parseFloat(localStorage.getItem('birdturds_musicVolume') || '0.3');
    
    // Set up one-time click handler to initialize audio
    const initAudioOnce = () => {
      if (this.audioCtxReady) return;
      try {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterVolume = this.audioCtx.createGain();
        this.masterVolume.gain.value = 0.5;
        this.masterVolume.connect(this.audioCtx.destination);
        this.audioCtxReady = true;
        console.log('🔊 Sound system initialized (after user interaction)');
        
        // Start background music after audio is ready
        if (this.musicEnabled) {
          this.startBackgroundMusic();
        }
      } catch(e) {
        console.warn('Audio not available:', e);
        this.soundEnabled = false;
      }
      // Remove listener after first interaction
      document.removeEventListener('click', initAudioOnce);
      document.removeEventListener('touchstart', initAudioOnce);
      document.removeEventListener('keydown', initAudioOnce);
    };
    
    document.addEventListener('click', initAudioOnce, { once: true });
    document.addEventListener('touchstart', initAudioOnce, { once: true });
    document.addEventListener('keydown', initAudioOnce, { once: true });
    
    console.log('🔊 Sound system ready (waiting for user interaction)');
  }
  
  // REAL AUDIO FILE PLAYBACK - Uses loaded MP3 files via Phaser
  playRealAudio(key, volume = 1) {
    if (!this.soundEnabled) return;
    
    // Prevent rapid sound stacking - track last play time per key
    if (!this.soundLastPlayed) this.soundLastPlayed = {};
    const now = Date.now();
    const minInterval = key.includes('shoot') ? 50 : 100; // 50ms for shots, 100ms for others
    if (this.soundLastPlayed[key] && (now - this.soundLastPlayed[key]) < minInterval) {
      return; // Skip if played too recently
    }
    this.soundLastPlayed[key] = now;
    
    try {
      // Check if sound exists in Phaser's cache
      if (this.sound.get(key)) {
        // Sound already exists, play it
        this.sound.play(key, { volume: volume * this.sfxVolume });
      } else if (this.cache.audio.exists(key)) {
        // Sound is cached but not added yet, add and play
        const sound = this.sound.add(key);
        sound.play({ volume: volume * this.sfxVolume });
      } else {
        // Fallback to synthesized sound if audio file not loaded
        console.warn('Audio file not found:', key, '- using fallback');
        if (this.audioCtx && this.audioCtxReady) {
          this.playFallbackShot(volume);
        }
      }
    } catch (e) {
      console.warn('Error playing audio:', key, e);
    }
  }
  
  // Fallback shot sound if real audio fails
  playFallbackShot(vol) {
    if (!this.audioCtx || !this.audioCtxReady) return;
    const now = this.audioCtx.currentTime;
    const noise = this.createNoise(0.05);
    const noiseGain = this.audioCtx.createGain();
    noiseGain.gain.setValueAtTime(vol * 0.5, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    noise.connect(noiseGain);
    noiseGain.connect(this.masterVolume);
  }
  
  // PROCEDURAL SOUND EFFECTS using Web Audio API
  playSound(type, options = {}) {
    if (!this.soundEnabled || !this.audioCtx || !this.audioCtxReady) return;
    
    try {
      // Resume audio context if suspended (browser autoplay policy)
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      
      const now = this.audioCtx.currentTime;
      const vol = (options.volume || 1) * this.sfxVolume;
      
      switch(type) {
        case 'shoot':
          // Play weapon-specific REAL sound based on selected character
          const charWeapon = btState.currentCharacter || 'buck';
          const shootSoundKey = charWeapon + '_shoot';
          this.playRealAudio(shootSoundKey, vol);
          break;
        case 'machinegun':
          this.playRealAudio('machinegun_sound', vol);
          break;
        case 'minigun':
          this.playRealAudio('machinegun_sound', vol * 0.8); // Use machinegun sound
          break;
        case 'sniper_shop':
          this.playRealAudio('jolene_shoot', vol); // Use sniper sound
          break;
        case 'barrett':
          this.playRealAudio('jolene_shoot', vol * 1.2); // Use sniper sound louder
          break;
        case 'deagle':
          this.playRealAudio('tammy_shoot', vol * 1.1); // Use pistol sound
          break;
        case 'revolver':
          this.playRealAudio('buck_shoot', vol); // Use rifle sound for revolver
          break;
        case 'hit':
          this.playRealAudio('hit_sound', vol);
          break;
        case 'coin':
          this.playRealAudio('coin_sound', vol);
          break;
        case 'splat':
          this.playRealAudio('splat_sound', vol);
          break;
        case 'jump':
          this.playJumpSound(now, vol); // Keep synthesized for now
          break;
        case 'reload':
          this.playRealAudio('reload_sound', vol);
          break;
        case 'knife':
          this.playKnifeSound(now, vol);
          break;
        case 'explosion':
          this.playRealAudio('explosion_sound', vol);
          break;
        case 'powerup':
          this.playPowerupSound(now, vol);
          break;
        case 'hurt':
          this.playRealAudio('hurt_sound', vol);
          break;
        case 'bird':
          this.playBirdSound(now, vol);
          break;
        case 'tractor':
          this.playTractorSound(now, vol);
          break;
        case 'gameover':
          this.playRealAudio('gameover_sound', vol);
          break;
        case 'transition':
          this.playTransitionSound(now, vol);
          break;
        case 'badge':
          this.playBadgeSound(now, vol);
          break;
        case 'levelup':
          this.playLevelUpSound(now, vol);
          break;
        case 'zombie_wake':
          this.playZombieWakeSound(now, vol);
          break;
        case 'scripture':
          this.playScriptureSound(now, vol);
          break;
        case 'demon':
          this.playDemonSound(now, vol);
          break;
        case 'angel':
          this.playAngelSound(now, vol);
          break;
        case 'bible_throw':
          this.playBibleThrowSound(now, vol);
          break;
        case 'share':
          this.playShareSound(now, vol);
          break;
        case 'victory':
          this.playVictorySound(now, vol);
          break;
        case 'anthem':
          this.playAnthemSound(now, vol);
          break;
        // NEW VEHICLE SOUNDS
        case 'helicopter':
          this.playHelicopterSound(now, vol);
          break;
        case 'tank':
          this.playTankSound(now, vol);
          break;
        case 'jeep':
          this.playJeepSound(now, vol);
          break;
        case 'truck':
          this.playTruckSound(now, vol);
          break;
        case 'atv':
          this.playATVSound(now, vol);
          break;
        case 'plane':
          this.playPlaneSound(now, vol);
          break;
        case 'biplane':
          this.playBiplaneSound(now, vol);
          break;
        // BIRD TYPE SOUNDS
        case 'crow':
          this.playCrowSound(now, vol);
          break;
        case 'seagull':
          this.playSeagullSound(now, vol);
          break;
        case 'pigeon':
          this.playPigeonSound(now, vol);
          break;
        case 'hawk':
          this.playHawkSound(now, vol);
          break;
        case 'eagle':
          this.playEagleSound(now, vol);
          break;
        case 'owl':
          this.playOwlSound(now, vol);
          break;
        case 'vulture':
          this.playVultureSound(now, vol);
          break;
        case 'pelican':
          this.playPelicanSound(now, vol);
          break;
        // IMPACT SOUNDS
        case 'bullet_hit':
          this.playBulletHitSound(now, vol);
          break;
        case 'bird_death':
          this.playRealAudio('bird_death_sound', vol);
          break;
        case 'boss_hit':
          this.playBossHitSound(now, vol);
          break;
        case 'boss_death':
          this.playBossDeathSound(now, vol);
          break;
        case 'turd_block':
          this.playTurdBlockSound(now, vol);
          break;
        // TRUMP SOUNDS
        case 'trump_speak':
          this.playTrumpSpeakSound(now, vol);
          break;
        // GROUND ANIMAL SOUNDS
        case 'deer':
          this.playDeerSound(now, vol);
          break;
        case 'bear':
          this.playBearSound(now, vol);
          break;
        case 'wolf':
          this.playWolfSound(now, vol);
          break;
        case 'fox':
          this.playFoxSound(now, vol);
          break;
        case 'rabbit':
          this.playRabbitSound(now, vol);
          break;
        case 'squirrel':
          this.playSquirrelSound(now, vol);
          break;
        case 'raccoon':
          this.playRaccoonSound(now, vol);
          break;
        case 'skunk':
          this.playSkunkSound(now, vol);
          break;
        case 'armadillo':
          this.playArmadilloSound(now, vol);
          break;
        case 'alligator':
          this.playAlligatorSound(now, vol);
          break;
        case 'snake':
          this.playSnakeSound(now, vol);
          break;
        case 'frog':
          this.playFrogSound(now, vol);
          break;
        case 'coyote':
          this.playCoyoteSound(now, vol);
          break;
        case 'moose':
          this.playMooseSound(now, vol);
          break;
        case 'buffalo':
          this.playBuffaloSound(now, vol);
          break;
        case 'turkey':
          this.playTurkeySound(now, vol);
          break;
        case 'chicken':
          this.playChickenSound(now, vol);
          break;
        case 'cow':
          this.playCowSound(now, vol);
          break;
        case 'horse':
          this.playHorseSound(now, vol);
          break;
        case 'pig':
          this.playPigSound(now, vol);
          break;
        case 'dog':
          this.playDogSound(now, vol);
          break;
        case 'cat':
          this.playCatSound(now, vol);
          break;
        // MORE ANIMALS
        case 'elk':
          this.playElkSound(now, vol);
          break;
        case 'cougar':
          this.playCougarSound(now, vol);
          break;
        // MORE BIRD SPECIES
        case 'sparrow':
          this.playSparrowSound(now, vol);
          break;
        case 'robin':
          this.playRobinSound(now, vol);
          break;
        case 'bluebird':
          this.playBluebirdSound(now, vol);
          break;
        case 'cardinal':
          this.playCardinalSound(now, vol);
          break;
        case 'mockingbird':
          this.playMockingbirdSound(now, vol);
          break;
        case 'woodpecker':
          this.playWoodpeckerSound(now, vol);
          break;
        case 'duck':
          this.playDuckSound(now, vol);
          break;
        case 'goose':
          this.playGooseSound(now, vol);
          break;
        case 'heron':
          this.playHeronSound(now, vol);
          break;
        case 'crane':
          this.playCraneSound(now, vol);
          break;
        case 'flamingo':
          this.playFlamingoSound(now, vol);
          break;
        case 'parrot':
          this.playParrotSound(now, vol);
          break;
        case 'raven':
          this.playRavenSound(now, vol);
          break;
        case 'magpie':
          this.playMagpieSound(now, vol);
          break;
        case 'jay':
          this.playJaySound(now, vol);
          break;
        case 'condor':
          this.playCondorSound(now, vol);
          break;
        case 'falcon':
          this.playFalconSound(now, vol);
          break;
        case 'osprey':
          this.playOspreySound(now, vol);
          break;
        case 'kite':
          this.playKiteSound(now, vol);
          break;
        // BOSS BIRD SOUNDS
        case 'thunderbird':
          this.playThunderbirdSound(now, vol);
          break;
        case 'phoenix':
          this.playPhoenixSound(now, vol);
          break;
        case 'dragon':
          this.playDragonSound(now, vol);
          break;
        case 'pterodactyl':
          this.playPterodactylSound(now, vol);
          break;
        // WEAPON SOUNDS - Use real audio files
        case 'rifle':
          this.playRealAudio('buck_shoot', vol);
          break;
        case 'pistol':
          this.playRealAudio('tammy_shoot', vol);
          break;
        case 'machinegun':
          this.playRealAudio('machinegun_sound', vol);
          break;
        case 'sniper':
          this.playRealAudio('jolene_shoot', vol);
          break;
        case 'crossbow':
          this.playCrossbowSound(now, vol);
          break;
        case 'revolver':
          this.playRealAudio('buck_shoot', vol); // Use rifle sound for revolver
          break;
        case 'grenade':
          this.playGrenadeSound(now, vol);
          break;
        case 'flamethrower':
          this.playFlamethrowerSound(now, vol);
          break;
        case 'laser':
          this.playLaserSound(now, vol);
          break;
        // COIN SOUNDS
        case 'coin_drop':
          this.playCoinDropSound(now, vol);
          break;
        case 'coin_collect':
          this.playCoinCollectSound(now, vol);
          break;
        case 'coin_rain':
          this.playCoinRainSound(now, vol);
          break;
        // UI SOUNDS
        case 'button_click':
          this.playButtonClickSound(now, vol);
          break;
        case 'menu_open':
          this.playMenuOpenSound(now, vol);
          break;
        case 'purchase':
          this.playPurchaseSound(now, vol);
          break;
        case 'error':
          this.playErrorSound(now, vol);
          break;
        case 'success':
          this.playSuccessSound(now, vol);
          break;
        // ENVIRONMENTAL
        case 'wind':
          this.playWindSound(now, vol);
          break;
        case 'thunder':
          this.playThunderSound(now, vol);
          break;
        case 'rain':
          this.playRainSound(now, vol);
          break;
        // HUNTER CHARACTER SOUNDS
        case 'hunter_hurt':
          this.playRealAudio('hurt_sound', vol);
          break;
        case 'hunter_death':
          this.playRealAudio('gameover_sound', vol);
          break;
        case 'hunter_jump':
          this.playJumpSound(now, vol);
          break;
        case 'hunter_land':
          this.playHunterLandSound(now, vol);
          break;
        case 'hunter_reload':
          this.playRealAudio('reload_sound', vol);
          break;
        case 'footstep':
          this.playFootstepSound(now, vol);
          break;
      }
    } catch(e) {
      // Silently fail
    }
  }
  
  playShotgunSound(now, vol) {
    // PROPER GUNSHOT - 3-layer sound: crack + boom + punch
    
    // Layer 1: Sharp white noise CRACK (the gunshot snap)
    const noise = this.createNoise(0.05);
    const noiseGain = this.audioCtx.createGain();
    const noiseFilter = this.audioCtx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.gain.setValueAtTime(vol * 1.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    noiseGain.connect(this.masterVolume);
    
    // Layer 2: Low frequency BOOM (the bass punch)
    const boom = this.audioCtx.createOscillator();
    const boomGain = this.audioCtx.createGain();
    boom.type = 'sine';
    boom.frequency.setValueAtTime(80, now);
    boom.frequency.exponentialRampToValueAtTime(30, now + 0.12);
    boomGain.gain.setValueAtTime(vol * 0.9, now);
    boomGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    boom.connect(boomGain);
    boomGain.connect(this.masterVolume);
    boom.start(now);
    boom.stop(now + 0.15);
    
    // Layer 3: Mid-frequency PUNCH (body/impact)
    const punch = this.audioCtx.createOscillator();
    const punchGain = this.audioCtx.createGain();
    punch.type = 'triangle';
    punch.frequency.setValueAtTime(200, now);
    punch.frequency.exponentialRampToValueAtTime(60, now + 0.1);
    punchGain.gain.setValueAtTime(vol * 0.6, now);
    punchGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    punch.connect(punchGain);
    punchGain.connect(this.masterVolume);
    punch.start(now);
    punch.stop(now + 0.12);
  }
  
  // BUCK - Lever-Action Rifle: Sharp crack with metallic lever ring
  playRifleSound(now, vol) {
    // Sharp crack
    const noise = this.createNoise(0.04);
    const noiseGain = this.audioCtx.createGain();
    const noiseFilter = this.audioCtx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 2000;
    noiseFilter.Q.value = 1;
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.gain.setValueAtTime(vol * 1.0, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    noiseGain.connect(this.masterVolume);
    
    // Medium boom
    const boom = this.audioCtx.createOscillator();
    const boomGain = this.audioCtx.createGain();
    boom.type = 'sine';
    boom.frequency.setValueAtTime(120, now);
    boom.frequency.exponentialRampToValueAtTime(40, now + 0.1);
    boomGain.gain.setValueAtTime(vol * 0.7, now);
    boomGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    boom.connect(boomGain);
    boomGain.connect(this.masterVolume);
    boom.start(now);
    boom.stop(now + 0.12);
    
    // Metallic lever ring
    const ring = this.audioCtx.createOscillator();
    const ringGain = this.audioCtx.createGain();
    ring.type = 'sine';
    ring.frequency.setValueAtTime(800, now + 0.05);
    ring.frequency.exponentialRampToValueAtTime(400, now + 0.15);
    ringGain.gain.setValueAtTime(vol * 0.15, now + 0.05);
    ringGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    ring.connect(ringGain);
    ringGain.connect(this.masterVolume);
    ring.start(now + 0.05);
    ring.stop(now + 0.18);
  }
  
  // BUBBA - Pump-Action Shotgun: Heavy boom with pump rack
  playPumpShotgunSound(now, vol) {
    // Heavy noise burst
    const noise = this.createNoise(0.08);
    const noiseGain = this.audioCtx.createGain();
    const noiseFilter = this.audioCtx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 3000;
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.gain.setValueAtTime(vol * 1.3, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    noiseGain.connect(this.masterVolume);
    
    // Deep boom
    const boom = this.audioCtx.createOscillator();
    const boomGain = this.audioCtx.createGain();
    boom.type = 'sine';
    boom.frequency.setValueAtTime(60, now);
    boom.frequency.exponentialRampToValueAtTime(25, now + 0.15);
    boomGain.gain.setValueAtTime(vol * 1.0, now);
    boomGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    boom.connect(boomGain);
    boomGain.connect(this.masterVolume);
    boom.start(now);
    boom.stop(now + 0.18);
    
    // Pump rack sound (after shot)
    const rack = this.audioCtx.createOscillator();
    const rackGain = this.audioCtx.createGain();
    rack.type = 'sawtooth';
    rack.frequency.setValueAtTime(150, now + 0.15);
    rack.frequency.setValueAtTime(200, now + 0.2);
    rackGain.gain.setValueAtTime(0, now);
    rackGain.gain.setValueAtTime(vol * 0.2, now + 0.15);
    rackGain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    rack.connect(rackGain);
    rackGain.connect(this.masterVolume);
    rack.start(now + 0.15);
    rack.stop(now + 0.28);
  }
  
  // DAISY - Double-Barrel Shotgun: Two quick booms
  playDoubleBarrelSound(now, vol) {
    // First barrel - heavy boom
    const noise1 = this.createNoise(0.06);
    const noise1Gain = this.audioCtx.createGain();
    noise1Gain.gain.setValueAtTime(vol * 1.2, now);
    noise1Gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
    noise1.connect(noise1Gain);
    noise1Gain.connect(this.masterVolume);
    
    const boom1 = this.audioCtx.createOscillator();
    const boom1Gain = this.audioCtx.createGain();
    boom1.type = 'sine';
    boom1.frequency.setValueAtTime(70, now);
    boom1.frequency.exponentialRampToValueAtTime(30, now + 0.12);
    boom1Gain.gain.setValueAtTime(vol * 0.9, now);
    boom1Gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    boom1.connect(boom1Gain);
    boom1Gain.connect(this.masterVolume);
    boom1.start(now);
    boom1.stop(now + 0.15);
    
    // Second barrel (slightly delayed)
    const noise2 = this.createNoise(0.06);
    const noise2Gain = this.audioCtx.createGain();
    noise2Gain.gain.setValueAtTime(vol * 1.1, now + 0.08);
    noise2Gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);
    noise2.connect(noise2Gain);
    noise2Gain.connect(this.masterVolume);
    
    const boom2 = this.audioCtx.createOscillator();
    const boom2Gain = this.audioCtx.createGain();
    boom2.type = 'sine';
    boom2.frequency.setValueAtTime(65, now + 0.08);
    boom2.frequency.exponentialRampToValueAtTime(28, now + 0.2);
    boom2Gain.gain.setValueAtTime(vol * 0.85, now + 0.08);
    boom2Gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    boom2.connect(boom2Gain);
    boom2Gain.connect(this.masterVolume);
    boom2.start(now + 0.08);
    boom2.stop(now + 0.22);
  }
  
  // SIERRA - AR-15 Carbine: Quick sharp crack, rapid fire capable
  playARSound(now, vol) {
    // Sharp high crack
    const noise = this.createNoise(0.025);
    const noiseGain = this.audioCtx.createGain();
    const noiseFilter = this.audioCtx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 2500;
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.gain.setValueAtTime(vol * 1.1, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.025);
    noiseGain.connect(this.masterVolume);
    
    // Punchy mid
    const punch = this.audioCtx.createOscillator();
    const punchGain = this.audioCtx.createGain();
    punch.type = 'triangle';
    punch.frequency.setValueAtTime(300, now);
    punch.frequency.exponentialRampToValueAtTime(100, now + 0.05);
    punchGain.gain.setValueAtTime(vol * 0.6, now);
    punchGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    punch.connect(punchGain);
    punchGain.connect(this.masterVolume);
    punch.start(now);
    punch.stop(now + 0.06);
    
    // Quick low thump
    const boom = this.audioCtx.createOscillator();
    const boomGain = this.audioCtx.createGain();
    boom.type = 'sine';
    boom.frequency.setValueAtTime(150, now);
    boom.frequency.exponentialRampToValueAtTime(50, now + 0.04);
    boomGain.gain.setValueAtTime(vol * 0.5, now);
    boomGain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    boom.connect(boomGain);
    boomGain.connect(this.masterVolume);
    boom.start(now);
    boom.stop(now + 0.05);
  }
  
  // CLYDE - Semi-Auto Hunting Rifle: Medium crack
  playSemiAutoRifleSound(now, vol) {
    // Medium crack
    const noise = this.createNoise(0.035);
    const noiseGain = this.audioCtx.createGain();
    const noiseFilter = this.audioCtx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 1800;
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.gain.setValueAtTime(vol * 0.9, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.035);
    noiseGain.connect(this.masterVolume);
    
    // Solid boom
    const boom = this.audioCtx.createOscillator();
    const boomGain = this.audioCtx.createGain();
    boom.type = 'sine';
    boom.frequency.setValueAtTime(100, now);
    boom.frequency.exponentialRampToValueAtTime(35, now + 0.1);
    boomGain.gain.setValueAtTime(vol * 0.75, now);
    boomGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    boom.connect(boomGain);
    boomGain.connect(this.masterVolume);
    boom.start(now);
    boom.stop(now + 0.12);
    
    // Bolt click
    const click = this.audioCtx.createOscillator();
    const clickGain = this.audioCtx.createGain();
    click.type = 'square';
    click.frequency.setValueAtTime(2000, now + 0.06);
    clickGain.gain.setValueAtTime(vol * 0.1, now + 0.06);
    clickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    click.connect(clickGain);
    clickGain.connect(this.masterVolume);
    click.start(now + 0.06);
    click.stop(now + 0.09);
  }
  
  // GUNNER - AK Assault Rifle: Heavy distinctive thump
  playAKSound(now, vol) {
    // Heavy noise burst
    const noise = this.createNoise(0.04);
    const noiseGain = this.audioCtx.createGain();
    const noiseFilter = this.audioCtx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 4000;
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.gain.setValueAtTime(vol * 1.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    noiseGain.connect(this.masterVolume);
    
    // Distinctive heavy thump (AK sound)
    const thump = this.audioCtx.createOscillator();
    const thumpGain = this.audioCtx.createGain();
    thump.type = 'sine';
    thump.frequency.setValueAtTime(90, now);
    thump.frequency.exponentialRampToValueAtTime(40, now + 0.08);
    thumpGain.gain.setValueAtTime(vol * 0.9, now);
    thumpGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    thump.connect(thumpGain);
    thumpGain.connect(this.masterVolume);
    thump.start(now);
    thump.stop(now + 0.1);
    
    // Mid punch
    const punch = this.audioCtx.createOscillator();
    const punchGain = this.audioCtx.createGain();
    punch.type = 'triangle';
    punch.frequency.setValueAtTime(250, now);
    punch.frequency.exponentialRampToValueAtTime(80, now + 0.06);
    punchGain.gain.setValueAtTime(vol * 0.5, now);
    punchGain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
    punch.connect(punchGain);
    punchGain.connect(this.masterVolume);
    punch.start(now);
    punch.stop(now + 0.07);
  }
  
  // JOLENE - Bolt-Action Sniper: Heavy deep crack with echo
  playSniperSound(now, vol) {
    // Sharp crack
    const noise = this.createNoise(0.03);
    const noiseGain = this.audioCtx.createGain();
    const noiseFilter = this.audioCtx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1500;
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.gain.setValueAtTime(vol * 1.3, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
    noiseGain.connect(this.masterVolume);
    
    // Deep heavy boom (big caliber)
    const boom = this.audioCtx.createOscillator();
    const boomGain = this.audioCtx.createGain();
    boom.type = 'sine';
    boom.frequency.setValueAtTime(50, now);
    boom.frequency.exponentialRampToValueAtTime(20, now + 0.2);
    boomGain.gain.setValueAtTime(vol * 1.0, now);
    boomGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    boom.connect(boomGain);
    boomGain.connect(this.masterVolume);
    boom.start(now);
    boom.stop(now + 0.25);
    
    // Echo/reverb tail
    const echo = this.createNoise(0.3);
    const echoGain = this.audioCtx.createGain();
    const echoFilter = this.audioCtx.createBiquadFilter();
    echoFilter.type = 'lowpass';
    echoFilter.frequency.value = 800;
    echo.connect(echoFilter);
    echoFilter.connect(echoGain);
    echoGain.gain.setValueAtTime(0, now);
    echoGain.gain.setValueAtTime(vol * 0.15, now + 0.1);
    echoGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    echoGain.connect(this.masterVolume);
    
    // Bolt action sound
    const bolt = this.audioCtx.createOscillator();
    const boltGain = this.audioCtx.createGain();
    bolt.type = 'sawtooth';
    bolt.frequency.setValueAtTime(300, now + 0.3);
    bolt.frequency.setValueAtTime(150, now + 0.4);
    boltGain.gain.setValueAtTime(0, now);
    boltGain.gain.setValueAtTime(vol * 0.15, now + 0.3);
    boltGain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
    bolt.connect(boltGain);
    boltGain.connect(this.masterVolume);
    bolt.start(now + 0.3);
    bolt.stop(now + 0.5);
  }
  
  // TAMMY - Semi-Auto Pistol: Quick pop, higher pitch
  playPistolSound(now, vol) {
    // Quick sharp pop
    const noise = this.createNoise(0.02);
    const noiseGain = this.audioCtx.createGain();
    const noiseFilter = this.audioCtx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 3000;
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.gain.setValueAtTime(vol * 0.9, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.02);
    noiseGain.connect(this.masterVolume);
    
    // Higher pitch punch
    const punch = this.audioCtx.createOscillator();
    const punchGain = this.audioCtx.createGain();
    punch.type = 'triangle';
    punch.frequency.setValueAtTime(400, now);
    punch.frequency.exponentialRampToValueAtTime(150, now + 0.04);
    punchGain.gain.setValueAtTime(vol * 0.5, now);
    punchGain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    punch.connect(punchGain);
    punchGain.connect(this.masterVolume);
    punch.start(now);
    punch.stop(now + 0.05);
    
    // Light bass thump
    const bass = this.audioCtx.createOscillator();
    const bassGain = this.audioCtx.createGain();
    bass.type = 'sine';
    bass.frequency.setValueAtTime(180, now);
    bass.frequency.exponentialRampToValueAtTime(80, now + 0.03);
    bassGain.gain.setValueAtTime(vol * 0.4, now);
    bassGain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
    bass.connect(bassGain);
    bassGain.connect(this.masterVolume);
    bass.start(now);
    bass.stop(now + 0.04);
  }
  
  playHitSound(now, vol) {
    // Bird hit - quick thump
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
    
    gain.gain.setValueAtTime(vol * 0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    osc.connect(gain);
    gain.connect(this.masterVolume);
    
    osc.start(now);
    osc.stop(now + 0.1);
  }
  
  playCoinSound(now, vol) {
    // Coin collect - bright ding
    const osc = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1320, now + 0.05);
    
    gain.gain.setValueAtTime(vol * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    
    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterVolume);
    
    osc.start(now);
    osc2.start(now + 0.05);
    osc.stop(now + 0.15);
    osc2.stop(now + 0.3);
  }
  
  playSplatSound(now, vol) {
    // Turd splat - wet thud
    const noise = this.createNoise(0.15);
    const filter = this.audioCtx.createBiquadFilter();
    const gain = this.audioCtx.createGain();
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.15);
    
    gain.gain.setValueAtTime(vol * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterVolume);
  }
  
  playJumpSound(now, vol) {
    // Jump - rising tone
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
    
    gain.gain.setValueAtTime(vol * 0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    osc.connect(gain);
    gain.connect(this.masterVolume);
    
    osc.start(now);
    osc.stop(now + 0.15);
  }
  
  playReloadSound(now, vol) {
    // Reload - click clack
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.setValueAtTime(200, now + 0.1);
    
    gain.gain.setValueAtTime(vol * 0.3, now);
    gain.gain.setValueAtTime(vol * 0.4, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    osc.connect(gain);
    gain.connect(this.masterVolume);
    
    osc.start(now);
    osc.stop(now + 0.2);
  }
  
  playKnifeSound(now, vol) {
    // Knife slash - whoosh
    const noise = this.createNoise(0.2);
    const filter = this.audioCtx.createBiquadFilter();
    const gain = this.audioCtx.createGain();
    
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2000, now);
    filter.frequency.exponentialRampToValueAtTime(500, now + 0.2);
    
    gain.gain.setValueAtTime(vol * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterVolume);
  }
  
  playExplosionSound(now, vol) {
    // Explosion - big boom
    const osc = this.audioCtx.createOscillator();
    const noise = this.createNoise(0.5);
    const gain = this.audioCtx.createGain();
    const noiseGain = this.audioCtx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(20, now + 0.5);
    
    gain.gain.setValueAtTime(vol * 0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    
    noiseGain.gain.setValueAtTime(vol * 0.6, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    
    osc.connect(gain);
    noise.connect(noiseGain);
    gain.connect(this.masterVolume);
    noiseGain.connect(this.masterVolume);
    
    osc.start(now);
    osc.stop(now + 0.5);
  }
  
  playPowerupSound(now, vol) {
    // Powerup - ascending arpeggio
    const notes = [523, 659, 784, 1047]; // C, E, G, C
    notes.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(vol * 0.3, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.15);
      
      osc.connect(gain);
      gain.connect(this.masterVolume);
      
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.15);
    });
  }
  
  playHurtSound(now, vol) {
    // Hurt - low thud
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.2);
    
    gain.gain.setValueAtTime(vol * 0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    osc.connect(gain);
    gain.connect(this.masterVolume);
    
    osc.start(now);
    osc.stop(now + 0.2);
  }
  
  playBirdSound(now, vol) {
    // Random bird chirp
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    
    osc.type = 'sine';
    const baseFreq = 1000 + Math.random() * 1000;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.linearRampToValueAtTime(baseFreq * 1.2, now + 0.05);
    osc.frequency.linearRampToValueAtTime(baseFreq * 0.8, now + 0.1);
    
    gain.gain.setValueAtTime(vol * 0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    osc.connect(gain);
    gain.connect(this.masterVolume);
    
    osc.start(now);
    osc.stop(now + 0.15);
  }
  
  playTractorSound(now, vol) {
    // Tractor engine
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(60 + Math.random() * 20, now);
    
    gain.gain.setValueAtTime(vol * 0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    
    osc.connect(gain);
    gain.connect(this.masterVolume);
    
    osc.start(now);
    osc.stop(now + 0.3);
  }
  
  playGameOverSound(now, vol) {
    // Game over - descending sad notes
    const notes = [440, 392, 349, 330];
    notes.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0, now + i * 0.3);
      gain.gain.linearRampToValueAtTime(vol * 0.4, now + i * 0.3 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.3 + 0.3);
      
      osc.connect(gain);
      gain.connect(this.masterVolume);
      
      osc.start(now + i * 0.3);
      osc.stop(now + i * 0.3 + 0.35);
    });
  }
  
  playTransitionSound(now, vol) {
    // Scene transition - ascending whoosh with sparkle
    const osc = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const gain2 = this.audioCtx.createGain();
    
    // Whoosh sweep
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.3);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.5);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(vol * 0.3, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    
    // Sparkle high note
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1200, now + 0.2);
    osc2.frequency.exponentialRampToValueAtTime(1600, now + 0.4);
    
    gain2.gain.setValueAtTime(0, now + 0.2);
    gain2.gain.linearRampToValueAtTime(vol * 0.15, now + 0.25);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    
    osc.connect(gain);
    osc2.connect(gain2);
    gain.connect(this.masterVolume);
    gain2.connect(this.masterVolume);
    
    osc.start(now);
    osc.stop(now + 0.55);
    osc2.start(now + 0.2);
    osc2.stop(now + 0.55);
  }
  
  // NEW SOUND EFFECTS FOR v20
  playBadgeSound(now, vol) {
    // Badge earned - triumphant fanfare
    const notes = [523, 659, 784, 1047]; // C-E-G-C (major chord arpeggio)
    notes.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(vol * 0.4, now + i * 0.1 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.4);
      
      osc.connect(gain);
      gain.connect(this.masterVolume);
      
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.45);
    });
  }
  
  playLevelUpSound(now, vol) {
    // Level up - ascending triumphant scale
    const notes = [392, 440, 494, 523, 587, 659, 784]; // G major scale ascending
    notes.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'square';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(vol * 0.25, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.15);
      
      osc.connect(gain);
      gain.connect(this.masterVolume);
      
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.2);
    });
  }
  
  playZombieWakeSound(now, vol) {
    // Zombie awakening - ethereal rising tone with shimmer
    const osc = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.5);
    
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(400, now);
    osc2.frequency.exponentialRampToValueAtTime(1200, now + 0.5);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(vol * 0.3, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    
    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterVolume);
    
    osc.start(now);
    osc2.start(now);
    osc.stop(now + 0.6);
    osc2.stop(now + 0.6);
  }
  
  playScriptureSound(now, vol) {
    // Scripture popup - gentle heavenly chime
    const notes = [523, 659, 784]; // C-E-G chord
    notes.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(vol * 0.15, now + i * 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
      
      osc.connect(gain);
      gain.connect(this.masterVolume);
      
      osc.start(now + i * 0.02);
      osc.stop(now + 0.85);
    });
  }
  
  playDemonSound(now, vol) {
    // Demon appearance - dark ominous bass
    const osc = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.setValueAtTime(60, now + 0.2);
    osc.frequency.setValueAtTime(40, now + 0.4);
    
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(55, now);
    
    gain.gain.setValueAtTime(vol * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    
    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterVolume);
    
    osc.start(now);
    osc2.start(now);
    osc.stop(now + 0.6);
    osc2.stop(now + 0.6);
  }
  
  playAngelSound(now, vol) {
    // Angel protection - ethereal heavenly chord
    const notes = [523, 659, 784, 988, 1175]; // Extended major chord
    notes.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.linearRampToValueAtTime(freq * 1.01, now + 0.5); // Slight vibrato
      
      gain.gain.setValueAtTime(vol * 0.12, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
      
      osc.connect(gain);
      gain.connect(this.masterVolume);
      
      osc.start(now + i * 0.05);
      osc.stop(now + 1.3);
    });
  }
  
  playBibleThrowSound(now, vol) {
    // Bible throw - whoosh with holy shimmer
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const noise = this.createNoise(0.15);
    const noiseGain = this.audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.2);
    
    gain.gain.setValueAtTime(vol * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    
    noiseGain.gain.setValueAtTime(vol * 0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    osc.connect(gain);
    noise.connect(noiseGain);
    gain.connect(this.masterVolume);
    noiseGain.connect(this.masterVolume);
    
    osc.start(now);
    osc.stop(now + 0.25);
  }
  
  playShareSound(now, vol) {
    // Share action - cheerful ping
    const notes = [659, 784, 988]; // E-G-B
    notes.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(vol * 0.25, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.3);
      
      osc.connect(gain);
      gain.connect(this.masterVolume);
      
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.35);
    });
  }
  
  playVictorySound(now, vol) {
    // Victory - triumphant fanfare
    const melody = [
      { note: 523, dur: 0.15 }, // C
      { note: 523, dur: 0.15 }, // C
      { note: 523, dur: 0.15 }, // C
      { note: 523, dur: 0.3 },  // C (held)
      { note: 415, dur: 0.3 },  // Ab
      { note: 466, dur: 0.3 },  // Bb
      { note: 523, dur: 0.6 },  // C (finale)
    ];
    
    let time = now;
    melody.forEach((n) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'square';
      osc.frequency.value = n.note;
      
      gain.gain.setValueAtTime(vol * 0.25, time);
      gain.gain.setValueAtTime(vol * 0.25, time + n.dur * 0.8);
      gain.gain.exponentialRampToValueAtTime(0.01, time + n.dur);
      
      osc.connect(gain);
      gain.connect(this.masterVolume);
      
      osc.start(time);
      osc.stop(time + n.dur + 0.05);
      time += n.dur;
    });
  }
  
  playAnthemSound(now, vol) {
    // National anthem snippet - patriotic
    const melody = [
      { note: 392, dur: 0.4 },  // G
      { note: 330, dur: 0.2 },  // E
      { note: 262, dur: 0.4 },  // C
      { note: 330, dur: 0.4 },  // E
      { note: 392, dur: 0.4 },  // G
      { note: 523, dur: 0.8 },  // C (high)
    ];
    
    let time = now;
    melody.forEach((n) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.value = n.note;
      
      gain.gain.setValueAtTime(vol * 0.3, time);
      gain.gain.setValueAtTime(vol * 0.3, time + n.dur * 0.7);
      gain.gain.exponentialRampToValueAtTime(0.01, time + n.dur);
      
      osc.connect(gain);
      gain.connect(this.masterVolume);
      
      osc.start(time);
      osc.stop(time + n.dur + 0.05);
      time += n.dur;
    });
  }
  
  // ========== VEHICLE SOUNDS ==========
  playHelicopterSound(now, vol) {
    // Helicopter rotor chop - rapid low frequency pulses
    for (let i = 0; i < 8; i++) {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.value = 80 + Math.random() * 20;
      gain.gain.setValueAtTime(vol * 0.3, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.04);
      osc.connect(gain);
      gain.connect(this.masterVolume);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.05);
    }
  }
  
  playTankSound(now, vol) {
    // Tank engine - deep rumbling
    const osc = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 40;
    osc2.type = 'square';
    osc2.frequency.value = 60;
    gain.gain.setValueAtTime(vol * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc2.start(now);
    osc.stop(now + 0.5);
    osc2.stop(now + 0.5);
  }
  
  playJeepSound(now, vol) {
    // Jeep engine - mid rumble with variation
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.linearRampToValueAtTime(120, now + 0.15);
    osc.frequency.linearRampToValueAtTime(90, now + 0.3);
    gain.gain.setValueAtTime(vol * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.4);
  }
  
  playTruckSound(now, vol) {
    // Truck - big diesel engine
    const osc = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = 55;
    osc2.type = 'sawtooth';
    osc2.frequency.value = 110;
    gain.gain.setValueAtTime(vol * 0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc2.start(now);
    osc.stop(now + 0.6);
    osc2.stop(now + 0.6);
  }
  
  playATVSound(now, vol) {
    // ATV - higher pitched engine whine
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.linearRampToValueAtTime(280, now + 0.1);
    osc.frequency.linearRampToValueAtTime(220, now + 0.25);
    gain.gain.setValueAtTime(vol * 0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.3);
  }
  
  playPlaneSound(now, vol) {
    // Airplane - propeller drone
    const osc = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 150;
    osc2.type = 'triangle';
    osc2.frequency.value = 75;
    gain.gain.setValueAtTime(vol * 0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc2.start(now);
    osc.stop(now + 0.8);
    osc2.stop(now + 0.8);
  }
  
  playBiplaneSound(now, vol) {
    // Biplane - vintage propeller
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.linearRampToValueAtTime(130, now + 0.3);
    osc.frequency.linearRampToValueAtTime(110, now + 0.6);
    gain.gain.setValueAtTime(vol * 0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.7);
  }
  
  // ========== BIRD TYPE SOUNDS ==========
  playCrowSound(now, vol) {
    // Crow - harsh caw
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(250, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(350, now + 0.25);
    gain.gain.setValueAtTime(vol * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.3);
  }
  
  playSeagullSound(now, vol) {
    // Seagull - high pitched cry
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.3);
    gain.gain.setValueAtTime(vol * 0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.35);
  }
  
  playPigeonSound(now, vol) {
    // Pigeon - cooing
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(350, now + 0.1);
    osc.frequency.linearRampToValueAtTime(280, now + 0.2);
    gain.gain.setValueAtTime(vol * 0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.25);
  }
  
  playHawkSound(now, vol) {
    // Hawk - screech
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1000, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.2);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.35);
    gain.gain.setValueAtTime(vol * 0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.4);
  }
  
  playEagleSound(now, vol) {
    // Eagle - majestic cry
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(1000, now + 0.4);
    gain.gain.setValueAtTime(vol * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.5);
  }
  
  playOwlSound(now, vol) {
    // Owl - hoot
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.linearRampToValueAtTime(300, now + 0.2);
    gain.gain.setValueAtTime(vol * 0.3, now);
    gain.gain.setValueAtTime(0.01, now + 0.2);
    gain.gain.setValueAtTime(vol * 0.25, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.5);
  }
  
  playVultureSound(now, vol) {
    // Vulture - low hiss/growl
    const noise = this.createNoise(0.3);
    const noiseGain = this.audioCtx.createGain();
    noiseGain.gain.setValueAtTime(vol * 0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    noise.connect(noiseGain);
    noiseGain.connect(this.masterVolume);
  }
  
  playPelicanSound(now, vol) {
    // Pelican - low honk
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.linearRampToValueAtTime(150, now + 0.2);
    gain.gain.setValueAtTime(vol * 0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.3);
  }
  
  // ========== IMPACT SOUNDS ==========
  playBulletHitSound(now, vol) {
    // Bullet impact - sharp thwack
    const osc = this.audioCtx.createOscillator();
    const noise = this.createNoise(0.05);
    const gain = this.audioCtx.createGain();
    const noiseGain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
    gain.gain.setValueAtTime(vol * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    noiseGain.gain.setValueAtTime(vol * 0.3, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    osc.connect(gain);
    noise.connect(noiseGain);
    gain.connect(this.masterVolume);
    noiseGain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.08);
  }
  
  playBirdDeathSound(now, vol) {
    // Bird death - squawk + thud
    const osc = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.15);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(100, now + 0.1);
    osc2.frequency.exponentialRampToValueAtTime(50, now + 0.2);
    gain.gain.setValueAtTime(vol * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc2.start(now + 0.1);
    osc.stop(now + 0.15);
    osc2.stop(now + 0.25);
  }
  
  playBossHitSound(now, vol) {
    // Boss hit - heavy impact
    const osc = this.audioCtx.createOscillator();
    const noise = this.createNoise(0.15);
    const gain = this.audioCtx.createGain();
    const noiseGain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.15);
    gain.gain.setValueAtTime(vol * 0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    noiseGain.gain.setValueAtTime(vol * 0.4, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.connect(gain);
    noise.connect(noiseGain);
    gain.connect(this.masterVolume);
    noiseGain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.2);
  }
  
  playBossDeathSound(now, vol) {
    // Boss death - epic explosion + fanfare
    this.playExplosionSound(now, vol * 1.2);
    // Add triumphant chord
    const notes = [262, 330, 392, 523]; // C major
    notes.forEach((note, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = note;
      gain.gain.setValueAtTime(vol * 0.2, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1);
      osc.connect(gain);
      gain.connect(this.masterVolume);
      osc.start(now + 0.2);
      osc.stop(now + 1);
    });
  }
  
  playTurdBlockSound(now, vol) {
    // Turd blocked by shield - splat + ping
    this.playSplatSound(now, vol * 0.5);
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now + 0.05);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
    gain.gain.setValueAtTime(vol * 0.3, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now + 0.05);
    osc.stop(now + 0.15);
  }
  
  playTrumpSpeakSound(now, vol) {
    // Short fanfare before Trump speaks
    const notes = [392, 494, 587]; // G-B-D
    notes.forEach((note, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = note;
      gain.gain.setValueAtTime(vol * 0.25, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.15);
      osc.connect(gain);
      gain.connect(this.masterVolume);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.2);
    });
  }
  
  // ========== GROUND ANIMAL SOUNDS ==========
  playDeerSound(now, vol) {
    // Deer - soft bleat/snort
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.15);
    gain.gain.setValueAtTime(vol * 0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.2);
  }
  
  playBearSound(now, vol) {
    // Bear - deep growl
    const osc = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 80;
    osc2.type = 'square';
    osc2.frequency.value = 60;
    gain.gain.setValueAtTime(vol * 0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc2.start(now);
    osc.stop(now + 0.6);
    osc2.stop(now + 0.6);
  }
  
  playWolfSound(now, vol) {
    // Wolf - howl
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(500, now + 0.3);
    osc.frequency.linearRampToValueAtTime(450, now + 0.8);
    osc.frequency.linearRampToValueAtTime(350, now + 1.2);
    gain.gain.setValueAtTime(vol * 0.3, now);
    gain.gain.setValueAtTime(vol * 0.35, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 1.3);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 1.3);
  }
  
  playFoxSound(now, vol) {
    // Fox - yip/bark
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);
    gain.gain.setValueAtTime(vol * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.1);
  }
  
  playRabbitSound(now, vol) {
    // Rabbit - soft squeak
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.08);
    gain.gain.setValueAtTime(vol * 0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.1);
  }
  
  playSquirrelSound(now, vol) {
    // Squirrel - chirp/chatter
    for (let i = 0; i < 4; i++) {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 1200 + Math.random() * 300;
      gain.gain.setValueAtTime(vol * 0.2, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.06 + 0.04);
      osc.connect(gain);
      gain.connect(this.masterVolume);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.05);
    }
  }
  
  playRaccoonSound(now, vol) {
    // Raccoon - chittering
    for (let i = 0; i < 5; i++) {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = 500 + Math.random() * 200;
      gain.gain.setValueAtTime(vol * 0.2, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.04);
      osc.connect(gain);
      gain.connect(this.masterVolume);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.05);
    }
  }
  
  playSkunkSound(now, vol) {
    // Skunk - hiss/stomp
    const noise = this.createNoise(0.2);
    const noiseGain = this.audioCtx.createGain();
    noiseGain.gain.setValueAtTime(vol * 0.25, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    noise.connect(noiseGain);
    noiseGain.connect(this.masterVolume);
  }
  
  playArmadilloSound(now, vol) {
    // Armadillo - grunt/snuffle
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(120, now + 0.15);
    gain.gain.setValueAtTime(vol * 0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.2);
  }
  
  playAlligatorSound(now, vol) {
    // Alligator - deep bellow/hiss
    const osc = this.audioCtx.createOscillator();
    const noise = this.createNoise(0.3);
    const gain = this.audioCtx.createGain();
    const noiseGain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 50;
    gain.gain.setValueAtTime(vol * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    noiseGain.gain.setValueAtTime(vol * 0.2, now + 0.2);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    osc.connect(gain);
    noise.connect(noiseGain);
    gain.connect(this.masterVolume);
    noiseGain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.5);
  }
  
  playSnakeSound(now, vol) {
    // Snake - hiss
    const noise = this.createNoise(0.4);
    const filter = this.audioCtx.createBiquadFilter();
    const noiseGain = this.audioCtx.createGain();
    filter.type = 'highpass';
    filter.frequency.value = 3000;
    noiseGain.gain.setValueAtTime(vol * 0.25, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterVolume);
  }
  
  playFrogSound(now, vol) {
    // Frog - ribbit
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.1);
    osc.frequency.setValueAtTime(200, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);
    gain.gain.setValueAtTime(vol * 0.3, now);
    gain.gain.setValueAtTime(0.01, now + 0.12);
    gain.gain.setValueAtTime(vol * 0.25, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.3);
  }
  
  playCoyoteSound(now, vol) {
    // Coyote - yipping howl
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.linearRampToValueAtTime(700, now + 0.2);
    osc.frequency.linearRampToValueAtTime(500, now + 0.4);
    gain.gain.setValueAtTime(vol * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.5);
  }
  
  playMooseSound(now, vol) {
    // Moose - deep bellow
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.4);
    osc.frequency.linearRampToValueAtTime(120, now + 0.7);
    gain.gain.setValueAtTime(vol * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.8);
  }
  
  playBuffaloSound(now, vol) {
    // Buffalo - snort/grunt
    const osc = this.audioCtx.createOscillator();
    const noise = this.createNoise(0.15);
    const gain = this.audioCtx.createGain();
    const noiseGain = this.audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = 90;
    gain.gain.setValueAtTime(vol * 0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    noiseGain.gain.setValueAtTime(vol * 0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc.connect(gain);
    noise.connect(noiseGain);
    gain.connect(this.masterVolume);
    noiseGain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.3);
  }
  
  playTurkeySound(now, vol) {
    // Turkey - gobble
    for (let i = 0; i < 4; i++) {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300 + i * 50, now + i * 0.1);
      osc.frequency.exponentialRampToValueAtTime(200, now + i * 0.1 + 0.08);
      gain.gain.setValueAtTime(vol * 0.25, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.09);
      osc.connect(gain);
      gain.connect(this.masterVolume);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.1);
    }
  }
  
  playChickenSound(now, vol) {
    // Chicken - cluck
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(250, now + 0.05);
    gain.gain.setValueAtTime(vol * 0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.08);
  }
  
  playCowSound(now, vol) {
    // Cow - moo
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(180, now + 0.3);
    osc.frequency.linearRampToValueAtTime(140, now + 0.8);
    gain.gain.setValueAtTime(vol * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 1);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 1);
  }
  
  playHorseSound(now, vol) {
    // Horse - neigh
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(600, now + 0.2);
    osc.frequency.linearRampToValueAtTime(400, now + 0.5);
    osc.frequency.linearRampToValueAtTime(350, now + 0.8);
    gain.gain.setValueAtTime(vol * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.9);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.9);
  }
  
  playPigSound(now, vol) {
    // Pig - oink
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(250, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.1);
    gain.gain.setValueAtTime(vol * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.15);
  }
  
  playDogSound(now, vol) {
    // Dog - bark
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(250, now + 0.08);
    gain.gain.setValueAtTime(vol * 0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.12);
  }
  
  playCatSound(now, vol) {
    // Cat - meow
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(500, now);
    osc.frequency.linearRampToValueAtTime(700, now + 0.15);
    osc.frequency.linearRampToValueAtTime(400, now + 0.4);
    gain.gain.setValueAtTime(vol * 0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.45);
  }
  
  // ========== MORE ANIMALS ==========
  playElkSound(now, vol) {
    // Elk - bugle call
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.linearRampToValueAtTime(500, now + 0.3);
    osc.frequency.linearRampToValueAtTime(400, now + 0.6);
    osc.frequency.linearRampToValueAtTime(250, now + 1);
    gain.gain.setValueAtTime(vol * 0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 1.1);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 1.1);
  }
  
  playCougarSound(now, vol) {
    // Cougar - scream/growl
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.linearRampToValueAtTime(400, now + 0.2);
    osc.frequency.linearRampToValueAtTime(300, now + 0.5);
    gain.gain.setValueAtTime(vol * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.6);
  }
  
  // ========== MORE BIRD SPECIES ==========
  playSparrowSound(now, vol) {
    // Sparrow - chirp chirp
    for (let i = 0; i < 3; i++) {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 2500 + Math.random() * 500;
      gain.gain.setValueAtTime(vol * 0.15, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.05);
      osc.connect(gain);
      gain.connect(this.masterVolume);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.06);
    }
  }
  
  playRobinSound(now, vol) {
    // Robin - cheerful song
    const notes = [1200, 1400, 1000, 1300, 1100];
    notes.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol * 0.2, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.08);
      osc.connect(gain);
      gain.connect(this.masterVolume);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.1);
    });
  }
  
  playBluebirdSound(now, vol) {
    // Bluebird - soft warble
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800, now);
    osc.frequency.linearRampToValueAtTime(2200, now + 0.1);
    osc.frequency.linearRampToValueAtTime(1600, now + 0.2);
    gain.gain.setValueAtTime(vol * 0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.25);
  }
  
  playCardinalSound(now, vol) {
    // Cardinal - distinctive whistle
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2000, now);
    osc.frequency.linearRampToValueAtTime(1500, now + 0.15);
    osc.frequency.setValueAtTime(2000, now + 0.2);
    osc.frequency.linearRampToValueAtTime(1600, now + 0.35);
    gain.gain.setValueAtTime(vol * 0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.4);
  }
  
  playMockingbirdSound(now, vol) {
    // Mockingbird - varied calls
    const freqs = [1500, 2000, 1200, 1800, 2200];
    freqs.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol * 0.2, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.1);
      osc.connect(gain);
      gain.connect(this.masterVolume);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.11);
    });
  }
  
  playWoodpeckerSound(now, vol) {
    // Woodpecker - rapid drumming
    for (let i = 0; i < 8; i++) {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.value = 150;
      gain.gain.setValueAtTime(vol * 0.3, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.04 + 0.02);
      osc.connect(gain);
      gain.connect(this.masterVolume);
      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.03);
    }
  }
  
  playDuckSound(now, vol) {
    // Duck - quack
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(250, now + 0.1);
    gain.gain.setValueAtTime(vol * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.15);
  }
  
  playGooseSound(now, vol) {
    // Goose - honk
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(400, now + 0.1);
    osc.frequency.linearRampToValueAtTime(280, now + 0.25);
    gain.gain.setValueAtTime(vol * 0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.3);
  }
  
  playHeronSound(now, vol) {
    // Heron - squawk
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(500, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.2);
    gain.gain.setValueAtTime(vol * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.25);
  }
  
  playCraneSound(now, vol) {
    // Crane - rattling call
    for (let i = 0; i < 5; i++) {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = 400 + i * 30;
      gain.gain.setValueAtTime(vol * 0.25, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.06 + 0.05);
      osc.connect(gain);
      gain.connect(this.masterVolume);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.06);
    }
  }
  
  playFlamingoSound(now, vol) {
    // Flamingo - nasal honk
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(350, now + 0.15);
    gain.gain.setValueAtTime(vol * 0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.2);
  }
  
  playParrotSound(now, vol) {
    // Parrot - squawk
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.linearRampToValueAtTime(1200, now + 0.05);
    osc.frequency.linearRampToValueAtTime(600, now + 0.15);
    gain.gain.setValueAtTime(vol * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.2);
  }
  
  playRavenSound(now, vol) {
    // Raven - deep croak
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(250, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.2);
    gain.gain.setValueAtTime(vol * 0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.3);
  }
  
  playMagpieSound(now, vol) {
    // Magpie - chatter
    for (let i = 0; i < 4; i++) {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.value = 600 + Math.random() * 200;
      gain.gain.setValueAtTime(vol * 0.25, now + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.07 + 0.05);
      osc.connect(gain);
      gain.connect(this.masterVolume);
      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.06);
    }
  }
  
  playJaySound(now, vol) {
    // Blue Jay - harsh screech
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1000, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.15);
    gain.gain.setValueAtTime(vol * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.2);
  }
  
  playCondorSound(now, vol) {
    // Condor - low hiss/grunt
    const noise = this.createNoise(0.3);
    const filter = this.audioCtx.createBiquadFilter();
    const noiseGain = this.audioCtx.createGain();
    filter.type = 'lowpass';
    filter.frequency.value = 500;
    noiseGain.gain.setValueAtTime(vol * 0.25, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterVolume);
  }
  
  playFalconSound(now, vol) {
    // Falcon - kee-kee-kee
    for (let i = 0; i < 3; i++) {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2500, now + i * 0.1);
      osc.frequency.exponentialRampToValueAtTime(2000, now + i * 0.1 + 0.07);
      gain.gain.setValueAtTime(vol * 0.25, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.08);
      osc.connect(gain);
      gain.connect(this.masterVolume);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.09);
    }
  }
  
  playOspreySound(now, vol) {
    // Osprey - whistle chirp
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2000, now);
    osc.frequency.linearRampToValueAtTime(2500, now + 0.1);
    osc.frequency.linearRampToValueAtTime(1800, now + 0.2);
    gain.gain.setValueAtTime(vol * 0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.25);
  }
  
  playKiteSound(now, vol) {
    // Kite bird - high whistle
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2200, now);
    osc.frequency.linearRampToValueAtTime(1800, now + 0.2);
    gain.gain.setValueAtTime(vol * 0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.25);
  }
  
  // ========== BOSS BIRD SOUNDS ==========
  playThunderbirdSound(now, vol) {
    // Thunderbird - thunder crack + screech
    const noise = this.createNoise(0.3);
    const noiseGain = this.audioCtx.createGain();
    noiseGain.gain.setValueAtTime(vol * 0.5, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    noise.connect(noiseGain);
    noiseGain.connect(this.masterVolume);
    
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1500, now + 0.1);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.4);
    gain.gain.setValueAtTime(vol * 0.4, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now + 0.1);
    osc.stop(now + 0.5);
  }
  
  playPhoenixSound(now, vol) {
    // Phoenix - fiery screech + crackle
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.linearRampToValueAtTime(2000, now + 0.2);
    osc.frequency.linearRampToValueAtTime(1000, now + 0.5);
    gain.gain.setValueAtTime(vol * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.6);
    
    // Fire crackle
    for (let i = 0; i < 5; i++) {
      const noise = this.createNoise(0.05);
      const noiseGain = this.audioCtx.createGain();
      noiseGain.gain.setValueAtTime(vol * 0.2, now + i * 0.1);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.04);
      noise.connect(noiseGain);
      noiseGain.connect(this.masterVolume);
    }
  }
  
  playDragonSound(now, vol) {
    // Dragon - deep roar
    const osc = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.linearRampToValueAtTime(150, now + 0.3);
    osc.frequency.linearRampToValueAtTime(80, now + 0.8);
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(50, now);
    gain.gain.setValueAtTime(vol * 0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 1);
    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc2.start(now);
    osc.stop(now + 1);
    osc2.stop(now + 1);
  }
  
  playPterodactylSound(now, vol) {
    // Pterodactyl - prehistoric screech
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.linearRampToValueAtTime(1500, now + 0.15);
    osc.frequency.linearRampToValueAtTime(600, now + 0.4);
    gain.gain.setValueAtTime(vol * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.5);
  }
  
  // ========== SHOP WEAPON SOUNDS (Purchased) ==========
  playMachinegunBurstSound(now, vol) {
    // Machinegun - rapid fire burst with heavy punch
    const noise = this.createNoise(0.04);
    const noiseGain = this.audioCtx.createGain();
    noiseGain.gain.setValueAtTime(vol * 0.9, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    noise.connect(noiseGain);
    noiseGain.connect(this.masterVolume);
    
    const punch = this.audioCtx.createOscillator();
    const punchGain = this.audioCtx.createGain();
    punch.type = 'triangle';
    punch.frequency.setValueAtTime(200, now);
    punch.frequency.exponentialRampToValueAtTime(60, now + 0.05);
    punchGain.gain.setValueAtTime(vol * 0.5, now);
    punchGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    punch.connect(punchGain);
    punchGain.connect(this.masterVolume);
    punch.start(now);
    punch.stop(now + 0.06);
  }
  
  playMinigunSound(now, vol) {
    // Minigun - very rapid high-pitched burst
    const noise = this.createNoise(0.02);
    const noiseGain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 2000;
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.gain.setValueAtTime(vol * 0.7, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.02);
    noiseGain.connect(this.masterVolume);
    
    const whine = this.audioCtx.createOscillator();
    const whineGain = this.audioCtx.createGain();
    whine.type = 'sawtooth';
    whine.frequency.setValueAtTime(400, now);
    whine.frequency.exponentialRampToValueAtTime(300, now + 0.03);
    whineGain.gain.setValueAtTime(vol * 0.2, now);
    whineGain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
    whine.connect(whineGain);
    whineGain.connect(this.masterVolume);
    whine.start(now);
    whine.stop(now + 0.035);
  }
  
  playSniperShopSound(now, vol) {
    // Shop Sniper - big boom with long echo
    const noise = this.createNoise(0.05);
    const noiseGain = this.audioCtx.createGain();
    noiseGain.gain.setValueAtTime(vol * 1.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    noise.connect(noiseGain);
    noiseGain.connect(this.masterVolume);
    
    const boom = this.audioCtx.createOscillator();
    const boomGain = this.audioCtx.createGain();
    boom.type = 'sine';
    boom.frequency.setValueAtTime(60, now);
    boom.frequency.exponentialRampToValueAtTime(25, now + 0.25);
    boomGain.gain.setValueAtTime(vol * 1.0, now);
    boomGain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    boom.connect(boomGain);
    boomGain.connect(this.masterVolume);
    boom.start(now);
    boom.stop(now + 0.3);
    
    // Long echo
    const echo = this.createNoise(0.4);
    const echoGain = this.audioCtx.createGain();
    const echoFilter = this.audioCtx.createBiquadFilter();
    echoFilter.type = 'lowpass';
    echoFilter.frequency.value = 600;
    echo.connect(echoFilter);
    echoFilter.connect(echoGain);
    echoGain.gain.setValueAtTime(0, now);
    echoGain.gain.setValueAtTime(vol * 0.2, now + 0.1);
    echoGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    echoGain.connect(this.masterVolume);
  }
  
  playBarrettSound(now, vol) {
    // Barrett .50 cal - MASSIVE boom with screen shake
    const noise = this.createNoise(0.08);
    const noiseGain = this.audioCtx.createGain();
    noiseGain.gain.setValueAtTime(vol * 1.5, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    noise.connect(noiseGain);
    noiseGain.connect(this.masterVolume);
    
    const boom = this.audioCtx.createOscillator();
    const boomGain = this.audioCtx.createGain();
    boom.type = 'sine';
    boom.frequency.setValueAtTime(40, now);
    boom.frequency.exponentialRampToValueAtTime(15, now + 0.4);
    boomGain.gain.setValueAtTime(vol * 1.2, now);
    boomGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    boom.connect(boomGain);
    boomGain.connect(this.masterVolume);
    boom.start(now);
    boom.stop(now + 0.45);
    
    // Reverb tail
    const reverb = this.createNoise(0.6);
    const reverbGain = this.audioCtx.createGain();
    const reverbFilter = this.audioCtx.createBiquadFilter();
    reverbFilter.type = 'lowpass';
    reverbFilter.frequency.value = 400;
    reverb.connect(reverbFilter);
    reverbFilter.connect(reverbGain);
    reverbGain.gain.setValueAtTime(0, now);
    reverbGain.gain.setValueAtTime(vol * 0.3, now + 0.15);
    reverbGain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
    reverbGain.connect(this.masterVolume);
  }
  
  playDeagleSound(now, vol) {
    // Desert Eagle - heavy pistol boom
    const noise = this.createNoise(0.04);
    const noiseGain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1500;
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.gain.setValueAtTime(vol * 1.0, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    noiseGain.connect(this.masterVolume);
    
    const boom = this.audioCtx.createOscillator();
    const boomGain = this.audioCtx.createGain();
    boom.type = 'sine';
    boom.frequency.setValueAtTime(150, now);
    boom.frequency.exponentialRampToValueAtTime(50, now + 0.1);
    boomGain.gain.setValueAtTime(vol * 0.8, now);
    boomGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    boom.connect(boomGain);
    boomGain.connect(this.masterVolume);
    boom.start(now);
    boom.stop(now + 0.12);
  }
  
  playRevolverSound(now, vol) {
    // Revolver - classic western crack
    const noise = this.createNoise(0.03);
    const noiseGain = this.audioCtx.createGain();
    noiseGain.gain.setValueAtTime(vol * 0.8, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
    noise.connect(noiseGain);
    noiseGain.connect(this.masterVolume);
    
    const crack = this.audioCtx.createOscillator();
    const crackGain = this.audioCtx.createGain();
    crack.type = 'triangle';
    crack.frequency.setValueAtTime(350, now);
    crack.frequency.exponentialRampToValueAtTime(100, now + 0.08);
    crackGain.gain.setValueAtTime(vol * 0.6, now);
    crackGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    crack.connect(crackGain);
    crackGain.connect(this.masterVolume);
    crack.start(now);
    crack.stop(now + 0.1);
    
    // Metallic ring
    const ring = this.audioCtx.createOscillator();
    const ringGain = this.audioCtx.createGain();
    ring.type = 'sine';
    ring.frequency.setValueAtTime(1200, now + 0.02);
    ring.frequency.exponentialRampToValueAtTime(600, now + 0.12);
    ringGain.gain.setValueAtTime(vol * 0.1, now + 0.02);
    ringGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    ring.connect(ringGain);
    ringGain.connect(this.masterVolume);
    ring.start(now + 0.02);
    ring.stop(now + 0.15);
  }
  
  playCrossbowSound(now, vol) {
    // Crossbow - twang + whoosh
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
    gain.gain.setValueAtTime(vol * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.2);
  }
  
  playGrenadeSound(now, vol) {
    // Grenade - big explosion
    const noise = this.createNoise(0.5);
    const noiseGain = this.audioCtx.createGain();
    noiseGain.gain.setValueAtTime(vol * 0.7, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    noise.connect(noiseGain);
    noiseGain.connect(this.masterVolume);
    
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.3);
    gain.gain.setValueAtTime(vol * 0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.4);
  }
  
  playFlamethrowerSound(now, vol) {
    // Flamethrower - roaring fire
    const noise = this.createNoise(0.6);
    const filter = this.audioCtx.createBiquadFilter();
    const noiseGain = this.audioCtx.createGain();
    filter.type = 'bandpass';
    filter.frequency.value = 800;
    filter.Q.value = 2;
    noiseGain.gain.setValueAtTime(vol * 0.4, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterVolume);
  }
  
  playLaserSound(now, vol) {
    // Laser - pew pew
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1500, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.15);
    gain.gain.setValueAtTime(vol * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.18);
  }
  
  // ========== COIN SOUNDS ==========
  playCoinDropSound(now, vol) {
    // Coin dropping - metallic clink
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2000, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
    gain.gain.setValueAtTime(vol * 0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.15);
  }
  
  playCoinCollectSound(now, vol) {
    // Same as coin sound but more celebratory
    this.playCoinSound(now, vol * 1.2);
  }
  
  playCoinRainSound(now, vol) {
    // Multiple coins falling
    for (let i = 0; i < 6; i++) {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 1800 + Math.random() * 600;
      gain.gain.setValueAtTime(vol * 0.15, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.1);
      osc.connect(gain);
      gain.connect(this.masterVolume);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.12);
    }
  }
  
  // ========== UI SOUNDS ==========
  playButtonClickSound(now, vol) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 800;
    gain.gain.setValueAtTime(vol * 0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.05);
  }
  
  playMenuOpenSound(now, vol) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.linearRampToValueAtTime(800, now + 0.1);
    gain.gain.setValueAtTime(vol * 0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.12);
  }
  
  playPurchaseSound(now, vol) {
    // Cha-ching!
    const notes = [523, 659, 784, 1047]; // C-E-G-C
    notes.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol * 0.3, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.15);
      osc.connect(gain);
      gain.connect(this.masterVolume);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.2);
    });
  }
  
  playErrorSound(now, vol) {
    // Buzz/wrong
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 150;
    gain.gain.setValueAtTime(vol * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.2);
  }
  
  playSuccessSound(now, vol) {
    // Ding!
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 1200;
    gain.gain.setValueAtTime(vol * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.2);
  }
  
  // ========== ENVIRONMENTAL SOUNDS ==========
  playWindSound(now, vol) {
    const noise = this.createNoise(1);
    const filter = this.audioCtx.createBiquadFilter();
    const noiseGain = this.audioCtx.createGain();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.linearRampToValueAtTime(800, now + 0.5);
    filter.frequency.linearRampToValueAtTime(300, now + 1);
    noiseGain.gain.setValueAtTime(vol * 0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 1);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterVolume);
  }
  
  playThunderSound(now, vol) {
    const noise = this.createNoise(0.8);
    const noiseGain = this.audioCtx.createGain();
    noiseGain.gain.setValueAtTime(vol * 0.6, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
    noise.connect(noiseGain);
    noiseGain.connect(this.masterVolume);
    
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(60, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.5);
    gain.gain.setValueAtTime(vol * 0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.6);
  }
  
  playRainSound(now, vol) {
    // Continuous rain patter
    for (let i = 0; i < 20; i++) {
      const noise = this.createNoise(0.03);
      const filter = this.audioCtx.createBiquadFilter();
      const noiseGain = this.audioCtx.createGain();
      filter.type = 'highpass';
      filter.frequency.value = 2000 + Math.random() * 2000;
      noiseGain.gain.setValueAtTime(vol * 0.05, now + i * 0.05);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.02);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.masterVolume);
    }
  }
  
  // ========== HUNTER CHARACTER SOUNDS ==========
  playHunterHurtSound(now, vol) {
    // Grunt/oof
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.15);
    gain.gain.setValueAtTime(vol * 0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.2);
  }
  
  playHunterDeathSound(now, vol) {
    // Death cry
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(150, now + 0.5);
    gain.gain.setValueAtTime(vol * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.6);
  }
  
  playHunterLandSound(now, vol) {
    // Thud when landing
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.08);
    gain.gain.setValueAtTime(vol * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.1);
  }
  
  playFootstepSound(now, vol) {
    // Soft footstep
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = 80 + Math.random() * 40;
    gain.gain.setValueAtTime(vol * 0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    osc.connect(gain);
    gain.connect(this.masterVolume);
    osc.start(now);
    osc.stop(now + 0.05);
  }
  showBadgeNotification(badge) {
    this.playSound('badge');
    
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      background: linear-gradient(135deg, #ffd700, #ffaa00);
      padding: 30px 50px;
      border-radius: 20px;
      text-align: center;
      z-index: 99999;
      box-shadow: 0 0 50px rgba(255, 215, 0, 0.8);
      animation: badgePop 0.5s ease forwards;
      font-family: system-ui, sans-serif;
    `;
    
    notification.innerHTML = `
      <style>
        @keyframes badgePop { 
          0% { transform: translate(-50%, -50%) scale(0); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes badgeShine {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
        }
      </style>
      <div style="font-size: 60px; animation: badgeShine 1s ease infinite;">${badge.icon}</div>
      <h2 style="color: #1a1a2e; margin: 10px 0 5px; font-size: 24px;">BADGE EARNED!</h2>
      <h3 style="color: #333; margin: 0 0 10px; font-size: 20px;">${badge.name}</h3>
      <p style="color: #555; font-size: 14px; margin: 0 0 10px;">${badge.description}</p>
      <p style="color: #22c55e; font-size: 16px; font-weight: bold;">+${badge.coins} 🪙 Coins!</p>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'badgePop 0.3s ease reverse forwards';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  
  createNoise(duration) {
    const bufferSize = this.audioCtx.sampleRate * duration;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.start();
    return noise;
  }
  
  // ========== ENHANCED MUSIC SYSTEM ==========
  // Multiple music tracks with Gospel/Christian options
  
  initMusicSystem() {
    // Load user preferences
    this.musicChoice = localStorage.getItem('birdturds_musicChoice') || 'adventure';
    this.currentTrackIndex = 0;
    this.musicSequenceEnabled = localStorage.getItem('birdturds_musicSequence') === 'true'; // default: no auto-sequencing, single themed track
    
    // Define all music tracks
    this.musicTracks = {
      // ========== ADDICTIVE GAME MUSIC ==========
      adventure: {
        name: '🎵 Adventure Theme',
        category: 'game',
        tempo: 0.25,
        melody: [
          { note: 392, dur: 0.25 }, { note: 440, dur: 0.25 }, { note: 494, dur: 0.25 }, { note: 523, dur: 0.5 },
          { note: 494, dur: 0.25 }, { note: 440, dur: 0.25 }, { note: 392, dur: 0.5 },
          { note: 349, dur: 0.25 }, { note: 330, dur: 0.25 }, { note: 294, dur: 0.5 },
          { note: 330, dur: 0.25 }, { note: 349, dur: 0.25 }, { note: 392, dur: 0.5 }
        ],
        bass: [{ note: 196, dur: 1 }, { note: 262, dur: 1 }, { note: 220, dur: 1 }, { note: 147, dur: 1 }]
      },
      action: {
        name: '⚔️ Action Packed',
        category: 'game',
        tempo: 0.2,
        melody: [
          { note: 330, dur: 0.2 }, { note: 330, dur: 0.2 }, { note: 392, dur: 0.2 }, { note: 330, dur: 0.2 },
          { note: 294, dur: 0.4 }, { note: 262, dur: 0.4 },
          { note: 330, dur: 0.2 }, { note: 330, dur: 0.2 }, { note: 392, dur: 0.2 }, { note: 440, dur: 0.4 },
          { note: 392, dur: 0.2 }, { note: 330, dur: 0.4 }
        ],
        bass: [{ note: 165, dur: 0.8 }, { note: 196, dur: 0.8 }, { note: 147, dur: 0.8 }, { note: 131, dur: 0.8 }]
      },
      intense: {
        name: '🔥 Intense Battle',
        category: 'game',
        tempo: 0.15,
        melody: [
          { note: 262, dur: 0.15 }, { note: 311, dur: 0.15 }, { note: 262, dur: 0.15 }, { note: 392, dur: 0.3 },
          { note: 349, dur: 0.15 }, { note: 311, dur: 0.15 }, { note: 262, dur: 0.3 },
          { note: 233, dur: 0.15 }, { note: 262, dur: 0.15 }, { note: 311, dur: 0.3 }, { note: 262, dur: 0.3 }
        ],
        bass: [{ note: 131, dur: 0.6 }, { note: 156, dur: 0.6 }, { note: 117, dur: 0.6 }, { note: 131, dur: 0.6 }]
      },
      peaceful: {
        name: '🌅 Peaceful Journey',
        category: 'game',
        tempo: 0.4,
        melody: [
          { note: 523, dur: 0.4 }, { note: 587, dur: 0.4 }, { note: 659, dur: 0.8 },
          { note: 587, dur: 0.4 }, { note: 523, dur: 0.4 }, { note: 440, dur: 0.8 },
          { note: 494, dur: 0.4 }, { note: 523, dur: 0.4 }, { note: 587, dur: 0.8 }
        ],
        bass: [{ note: 262, dur: 1.6 }, { note: 220, dur: 1.6 }, { note: 247, dur: 1.6 }]
      },
      // NEW ADDICTIVE TRACKS
      arcade_fever: {
        name: '🕹️ Arcade Fever',
        category: 'game',
        tempo: 0.12,
        melody: [
          { note: 523, dur: 0.12 }, { note: 587, dur: 0.12 }, { note: 659, dur: 0.12 }, { note: 784, dur: 0.24 },
          { note: 659, dur: 0.12 }, { note: 587, dur: 0.12 }, { note: 523, dur: 0.24 },
          { note: 440, dur: 0.12 }, { note: 494, dur: 0.12 }, { note: 523, dur: 0.12 }, { note: 587, dur: 0.24 },
          { note: 523, dur: 0.12 }, { note: 494, dur: 0.12 }, { note: 440, dur: 0.24 }
        ],
        bass: [{ note: 262, dur: 0.48 }, { note: 196, dur: 0.48 }, { note: 220, dur: 0.48 }, { note: 175, dur: 0.48 }]
      },
      turbo_hunt: {
        name: '🚀 Turbo Hunt',
        category: 'game',
        tempo: 0.1,
        melody: [
          { note: 330, dur: 0.1 }, { note: 392, dur: 0.1 }, { note: 494, dur: 0.2 },
          { note: 440, dur: 0.1 }, { note: 392, dur: 0.1 }, { note: 330, dur: 0.2 },
          { note: 294, dur: 0.1 }, { note: 330, dur: 0.1 }, { note: 392, dur: 0.1 }, { note: 440, dur: 0.1 },
          { note: 494, dur: 0.2 }, { note: 523, dur: 0.2 }
        ],
        bass: [{ note: 165, dur: 0.4 }, { note: 131, dur: 0.4 }, { note: 147, dur: 0.4 }, { note: 196, dur: 0.4 }]
      },
      bird_blaster: {
        name: '🐦 Bird Blaster',
        category: 'game',
        tempo: 0.15,
        melody: [
          { note: 659, dur: 0.15 }, { note: 587, dur: 0.15 }, { note: 523, dur: 0.15 }, { note: 440, dur: 0.3 },
          { note: 494, dur: 0.15 }, { note: 523, dur: 0.15 }, { note: 587, dur: 0.3 },
          { note: 659, dur: 0.15 }, { note: 784, dur: 0.15 }, { note: 659, dur: 0.15 }, { note: 587, dur: 0.15 },
          { note: 523, dur: 0.3 }, { note: 440, dur: 0.3 }
        ],
        bass: [{ note: 220, dur: 0.6 }, { note: 247, dur: 0.6 }, { note: 262, dur: 0.6 }, { note: 196, dur: 0.6 }]
      },
      retro_wave: {
        name: '🌊 Retro Wave',
        category: 'game',
        tempo: 0.18,
        melody: [
          { note: 440, dur: 0.18 }, { note: 523, dur: 0.18 }, { note: 659, dur: 0.36 },
          { note: 587, dur: 0.18 }, { note: 523, dur: 0.18 }, { note: 440, dur: 0.36 },
          { note: 392, dur: 0.18 }, { note: 440, dur: 0.18 }, { note: 523, dur: 0.18 }, { note: 587, dur: 0.18 },
          { note: 659, dur: 0.36 }
        ],
        bass: [{ note: 220, dur: 0.72 }, { note: 262, dur: 0.72 }, { note: 196, dur: 0.72 }, { note: 175, dur: 0.72 }]
      },
      boss_battle: {
        name: '👹 Boss Battle',
        category: 'game',
        tempo: 0.12,
        melody: [
          { note: 196, dur: 0.12 }, { note: 233, dur: 0.12 }, { note: 262, dur: 0.12 }, { note: 311, dur: 0.24 },
          { note: 262, dur: 0.12 }, { note: 233, dur: 0.12 }, { note: 196, dur: 0.24 },
          { note: 175, dur: 0.12 }, { note: 196, dur: 0.12 }, { note: 233, dur: 0.12 }, { note: 262, dur: 0.12 },
          { note: 311, dur: 0.24 }, { note: 349, dur: 0.24 }
        ],
        bass: [{ note: 98, dur: 0.48 }, { note: 117, dur: 0.48 }, { note: 87, dur: 0.48 }, { note: 110, dur: 0.48 }]
      },
      victory_lap: {
        name: '🏆 Victory Lap',
        category: 'game',
        tempo: 0.2,
        melody: [
          { note: 523, dur: 0.2 }, { note: 659, dur: 0.2 }, { note: 784, dur: 0.4 },
          { note: 880, dur: 0.2 }, { note: 784, dur: 0.2 }, { note: 659, dur: 0.4 },
          { note: 523, dur: 0.2 }, { note: 587, dur: 0.2 }, { note: 659, dur: 0.2 }, { note: 784, dur: 0.2 },
          { note: 1047, dur: 0.6 }
        ],
        bass: [{ note: 262, dur: 0.8 }, { note: 330, dur: 0.8 }, { note: 262, dur: 0.8 }, { note: 392, dur: 0.8 }]
      },
      
      // ========== GOSPEL/CHRISTIAN WORSHIP (Youth-Oriented) ==========
      // Classic Hymns
      amazing_grace: {
        name: '🙏 Amazing Grace (Classic)',
        category: 'gospel',
        tempo: 0.5,
        melody: [
          { note: 392, dur: 0.5 }, { note: 523, dur: 1 }, { note: 494, dur: 0.25 }, { note: 523, dur: 0.25 },
          { note: 494, dur: 0.5 }, { note: 440, dur: 0.5 }, { note: 392, dur: 1 },
          { note: 330, dur: 0.5 }, { note: 392, dur: 1 }, { note: 440, dur: 0.25 }, { note: 392, dur: 0.25 },
          { note: 440, dur: 0.5 }, { note: 523, dur: 1.5 }
        ],
        bass: [{ note: 196, dur: 2 }, { note: 220, dur: 2 }, { note: 262, dur: 2 }, { note: 196, dur: 2 }]
      },
      how_great: {
        name: '✝️ How Great Thou Art',
        category: 'gospel',
        tempo: 0.5,
        melody: [
          { note: 392, dur: 0.5 }, { note: 440, dur: 0.5 }, { note: 523, dur: 1 },
          { note: 494, dur: 0.5 }, { note: 440, dur: 0.5 }, { note: 392, dur: 1 },
          { note: 440, dur: 0.5 }, { note: 494, dur: 0.5 }, { note: 523, dur: 0.5 }, { note: 587, dur: 0.5 },
          { note: 523, dur: 1.5 }
        ],
        bass: [{ note: 196, dur: 2 }, { note: 262, dur: 2 }, { note: 220, dur: 2 }, { note: 262, dur: 2 }]
      },
      mighty_fortress: {
        name: '🏰 A Mighty Fortress',
        category: 'gospel',
        tempo: 0.4,
        melody: [
          { note: 523, dur: 0.4 }, { note: 523, dur: 0.4 }, { note: 523, dur: 0.4 }, { note: 392, dur: 0.4 },
          { note: 440, dur: 0.4 }, { note: 440, dur: 0.4 }, { note: 392, dur: 0.8 },
          { note: 659, dur: 0.4 }, { note: 587, dur: 0.4 }, { note: 523, dur: 0.4 }, { note: 494, dur: 0.4 },
          { note: 523, dur: 1.2 }
        ],
        bass: [{ note: 262, dur: 1.6 }, { note: 220, dur: 1.6 }, { note: 196, dur: 1.6 }, { note: 262, dur: 1.6 }]
      },
      
      // Modern Youth Worship (Hillsong/Elevation/Bethel style)
      oceans_style: {
        name: '🌊 Oceans Style (Hillsong)',
        category: 'worship',
        tempo: 0.45,
        melody: [
          { note: 330, dur: 0.45 }, { note: 392, dur: 0.45 }, { note: 440, dur: 0.9 },
          { note: 392, dur: 0.45 }, { note: 330, dur: 0.45 }, { note: 294, dur: 0.9 },
          { note: 330, dur: 0.45 }, { note: 392, dur: 0.45 }, { note: 440, dur: 0.45 }, { note: 494, dur: 0.45 },
          { note: 440, dur: 1.35 }
        ],
        bass: [{ note: 165, dur: 1.8 }, { note: 147, dur: 1.8 }, { note: 165, dur: 1.8 }, { note: 196, dur: 1.8 }]
      },
      way_maker_style: {
        name: '🔥 Way Maker Style',
        category: 'worship',
        tempo: 0.35,
        melody: [
          { note: 392, dur: 0.35 }, { note: 440, dur: 0.35 }, { note: 523, dur: 0.7 },
          { note: 494, dur: 0.35 }, { note: 440, dur: 0.35 }, { note: 392, dur: 0.7 },
          { note: 440, dur: 0.35 }, { note: 523, dur: 0.35 }, { note: 587, dur: 0.7 },
          { note: 523, dur: 1.05 }
        ],
        bass: [{ note: 196, dur: 1.4 }, { note: 220, dur: 1.4 }, { note: 262, dur: 1.4 }, { note: 196, dur: 1.4 }]
      },
      reckless_love_style: {
        name: '💕 Reckless Love Style',
        category: 'worship',
        tempo: 0.4,
        melody: [
          { note: 440, dur: 0.4 }, { note: 494, dur: 0.4 }, { note: 523, dur: 0.8 },
          { note: 587, dur: 0.4 }, { note: 523, dur: 0.4 }, { note: 494, dur: 0.8 },
          { note: 440, dur: 0.4 }, { note: 392, dur: 0.4 }, { note: 440, dur: 0.8 },
          { note: 392, dur: 1.2 }
        ],
        bass: [{ note: 220, dur: 1.6 }, { note: 262, dur: 1.6 }, { note: 220, dur: 1.6 }, { note: 196, dur: 1.6 }]
      },
      goodness_of_god_style: {
        name: '🙌 Goodness of God Style',
        category: 'worship',
        tempo: 0.38,
        melody: [
          { note: 392, dur: 0.38 }, { note: 392, dur: 0.38 }, { note: 440, dur: 0.76 },
          { note: 392, dur: 0.38 }, { note: 330, dur: 0.38 }, { note: 294, dur: 0.76 },
          { note: 330, dur: 0.38 }, { note: 392, dur: 0.38 }, { note: 440, dur: 0.38 }, { note: 392, dur: 0.38 },
          { note: 330, dur: 1.14 }
        ],
        bass: [{ note: 196, dur: 1.52 }, { note: 147, dur: 1.52 }, { note: 165, dur: 1.52 }, { note: 196, dur: 1.52 }]
      },
      graves_into_gardens_style: {
        name: '🌱 Graves Into Gardens Style',
        category: 'worship',
        tempo: 0.32,
        melody: [
          { note: 330, dur: 0.32 }, { note: 392, dur: 0.32 }, { note: 440, dur: 0.64 },
          { note: 523, dur: 0.32 }, { note: 494, dur: 0.32 }, { note: 440, dur: 0.64 },
          { note: 392, dur: 0.32 }, { note: 440, dur: 0.32 }, { note: 494, dur: 0.64 },
          { note: 440, dur: 0.96 }
        ],
        bass: [{ note: 165, dur: 1.28 }, { note: 220, dur: 1.28 }, { note: 196, dur: 1.28 }, { note: 165, dur: 1.28 }]
      },
      
      // ========== COUNTRY (Conservative, Family-Friendly) ==========
      country_roads_style: {
        name: '🤠 Country Roads Style',
        category: 'country',
        tempo: 0.35,
        melody: [
          { note: 392, dur: 0.35 }, { note: 440, dur: 0.35 }, { note: 494, dur: 0.7 },
          { note: 440, dur: 0.35 }, { note: 392, dur: 0.35 }, { note: 330, dur: 0.7 },
          { note: 294, dur: 0.35 }, { note: 330, dur: 0.35 }, { note: 392, dur: 0.7 },
          { note: 330, dur: 1.05 }
        ],
        bass: [{ note: 196, dur: 1.4 }, { note: 165, dur: 1.4 }, { note: 147, dur: 1.4 }, { note: 165, dur: 1.4 }]
      },
      god_bless_usa_style: {
        name: '🇺🇸 God Bless USA Style',
        category: 'country',
        tempo: 0.4,
        melody: [
          { note: 392, dur: 0.4 }, { note: 392, dur: 0.2 }, { note: 440, dur: 0.2 }, { note: 494, dur: 0.8 },
          { note: 523, dur: 0.4 }, { note: 494, dur: 0.4 }, { note: 440, dur: 0.8 },
          { note: 392, dur: 0.4 }, { note: 440, dur: 0.4 }, { note: 494, dur: 0.4 }, { note: 523, dur: 0.4 },
          { note: 587, dur: 1.2 }
        ],
        bass: [{ note: 196, dur: 1.6 }, { note: 262, dur: 1.6 }, { note: 196, dur: 1.6 }, { note: 294, dur: 1.6 }]
      },
      amazing_grace_country: {
        name: '🎸 Amazing Grace (Country)',
        category: 'country',
        tempo: 0.42,
        melody: [
          { note: 294, dur: 0.42 }, { note: 392, dur: 0.84 }, { note: 370, dur: 0.21 }, { note: 392, dur: 0.21 },
          { note: 370, dur: 0.42 }, { note: 330, dur: 0.42 }, { note: 294, dur: 0.84 },
          { note: 262, dur: 0.42 }, { note: 294, dur: 0.84 }, { note: 330, dur: 0.21 }, { note: 294, dur: 0.21 },
          { note: 330, dur: 0.42 }, { note: 392, dur: 1.26 }
        ],
        bass: [{ note: 147, dur: 1.68 }, { note: 165, dur: 1.68 }, { note: 196, dur: 1.68 }, { note: 147, dur: 1.68 }]
      },
      simple_man_style: {
        name: '👨 Simple Man Style',
        category: 'country',
        tempo: 0.45,
        melody: [
          { note: 330, dur: 0.45 }, { note: 330, dur: 0.45 }, { note: 392, dur: 0.45 }, { note: 330, dur: 0.45 },
          { note: 294, dur: 0.9 }, { note: 262, dur: 0.9 },
          { note: 294, dur: 0.45 }, { note: 330, dur: 0.45 }, { note: 392, dur: 0.9 },
          { note: 330, dur: 1.35 }
        ],
        bass: [{ note: 165, dur: 1.8 }, { note: 131, dur: 1.8 }, { note: 147, dur: 1.8 }, { note: 165, dur: 1.8 }]
      },
      
      // ========== PATRIOTIC ==========
      patriotic: {
        name: '🇺🇸 Patriotic March',
        category: 'patriotic',
        tempo: 0.3,
        melody: [
          { note: 392, dur: 0.3 }, { note: 392, dur: 0.15 }, { note: 392, dur: 0.15 }, { note: 523, dur: 0.6 },
          { note: 440, dur: 0.3 }, { note: 392, dur: 0.3 }, { note: 330, dur: 0.6 },
          { note: 392, dur: 0.3 }, { note: 440, dur: 0.3 }, { note: 494, dur: 0.3 }, { note: 523, dur: 0.6 }
        ],
        bass: [{ note: 196, dur: 1.2 }, { note: 262, dur: 1.2 }, { note: 196, dur: 1.2 }]
      }
    };
    
    // Track sequences for variety
    this.trackSequences = {
      game: ['adventure', 'action', 'peaceful', 'intense'],
      gospel: ['amazing_grace', 'how_great', 'blessed_assurance', 'victory_jesus', 'mighty_fortress'],
      mixed: ['adventure', 'amazing_grace', 'action', 'blessed_assurance', 'peaceful', 'victory_jesus']
    };
  }
  
  // Start background music with selected track
  startBackgroundMusic() {
    if (!this.musicEnabled || !this.audioCtx || this.musicPlaying) return;
    if (this.musicChoice === 'none') return;
    
    this.initMusicSystem();
    this.musicPlaying = true;
    this.musicGain = this.audioCtx.createGain();
    this.musicGain.gain.value = this.musicVolume * 0.3;
    this.musicGain.connect(this.masterVolume);
    
    this.playCurrentTrack();
  }
  
  playCurrentTrack() {
    if (!this.musicPlaying || !this.audioCtx) return;
    
    const track = this.musicTracks[this.musicChoice];
    if (!track) return;
    
    this.playMusicLoop(track.melody, track.bass, track.tempo);
  }
  
  // Sequence to next track
  nextTrack() {
    if (!this.musicSequenceEnabled) return;
    
    const category = this.musicTracks[this.musicChoice]?.category || 'game';
    const sequence = this.trackSequences[category] || this.trackSequences.game;
    
    this.currentTrackIndex = (this.currentTrackIndex + 1) % sequence.length;
    this.musicChoice = sequence[this.currentTrackIndex];
    
    // Show track change notification
    const track = this.musicTracks[this.musicChoice];
    if (track) {
      this.showNotification(`🎵 Now Playing: ${track.name}`);
    }
  }
  
  // Change music track
  setMusicTrack(trackId) {
    this.musicChoice = trackId;
    localStorage.setItem('birdturds_musicChoice', trackId);
    
    // Restart music with new track
    this.stopBackgroundMusic();
    if (trackId !== 'none') {
      setTimeout(() => this.startBackgroundMusic(), 100);
    }
  }
  
  playMusicLoop(melody, bass, tempo = 0.25) {
    if (!this.musicPlaying || !this.audioCtx) return;
    
    const now = this.audioCtx.currentTime;
    let melodyTime = now;
    let bassTime = now;
    let loopDuration = 0;
    
    // Play melody
    melody.forEach(note => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'triangle'; // Softer tone for hymns
      osc.frequency.value = note.note;
      
      gain.gain.setValueAtTime(0.12, melodyTime);
      gain.gain.setValueAtTime(0.08, melodyTime + note.dur * 0.8);
      gain.gain.setValueAtTime(0, melodyTime + note.dur);
      
      osc.connect(gain);
      gain.connect(this.musicGain);
      
      osc.start(melodyTime);
      osc.stop(melodyTime + note.dur);
      
      melodyTime += note.dur;
      loopDuration = Math.max(loopDuration, melodyTime - now);
    });
    
    // Play bass
    bass.forEach(note => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = note.note;
      
      gain.gain.setValueAtTime(0.08, bassTime);
      gain.gain.setValueAtTime(0.05, bassTime + note.dur * 0.9);
      gain.gain.setValueAtTime(0, bassTime + note.dur);
      
      osc.connect(gain);
      gain.connect(this.musicGain);
      
      osc.start(bassTime);
      osc.stop(bassTime + note.dur);
      
      bassTime += note.dur;
    });
    
    // Loop and potentially sequence to next track
    this.loopCount = (this.loopCount || 0) + 1;
    
    // Every 4 loops, consider changing track
    if (this.musicSequenceEnabled && this.loopCount >= 4) {
      this.loopCount = 0;
      this.musicTimeout = setTimeout(() => {
        this.nextTrack();
        this.playCurrentTrack();
      }, loopDuration * 1000);
    } else {
      this.musicTimeout = setTimeout(() => this.playCurrentTrack(), loopDuration * 1000);
    }
  }
  
  stopBackgroundMusic() {
    this.musicPlaying = false;
    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout);
    }
  }
  
  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem('birdturds_sound', this.soundEnabled);
    this.showNotification(this.soundEnabled ? '🔊 Sound ON' : '🔇 Sound OFF');
  }
  
  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    localStorage.setItem('birdturds_music', this.musicEnabled);
    
    if (this.musicEnabled) {
      this.startBackgroundMusic();
      this.showNotification('🎵 Music ON');
    } else {
      this.stopBackgroundMusic();
      this.showNotification('🎵 Music OFF');
    }
  }

  createBackground() {
    // Create sky that fills the whole world - FIXED position (doesn't scroll)
    this.sky = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x87ceeb);
    this.sky.setDepth(-20);
    this.sky.setScrollFactor(0); // Sky stays fixed - no parallax gap issues
    this.currentSkyColor = 0x87ceeb;
    
    // Create ambient overlay for scene tinting effects
    this.ambientOverlay = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0xffffff);
    this.ambientOverlay.setDepth(100);
    this.ambientOverlay.setScrollFactor(0);
    this.ambientOverlay.setAlpha(0); // Start invisible
    this.ambientOverlay.setBlendMode(Phaser.BlendModes.MULTIPLY);
    
    // Create scene transition overlay (for crossfade effect)
    this.transitionOverlay = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000);
    this.transitionOverlay.setDepth(99);
    this.transitionOverlay.setScrollFactor(0);
    this.transitionOverlay.setAlpha(0);
    
    // Scene name banner (hidden by default)
    this.sceneBanner = this.add.text(GAME_WIDTH / 2, 80, '', {
      fontSize: '32px',
      fontStyle: 'bold',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 6,
      shadow: { offsetX: 2, offsetY: 2, color: '#000000', blur: 4, fill: true }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(150).setAlpha(0);
    
    // Scene subtitle (flavor text)
    this.sceneSubtitle = this.add.text(GAME_WIDTH / 2, 120, '', {
      fontSize: '18px',
      fontStyle: 'italic',
      color: '#fcd34d',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5).setScrollFactor(0).setDepth(150).setAlpha(0);
    
    // Create ground base - uses scene-specific colors that blend with Ludo landscapes
    const initialScene = sceneSequence[0];
    this.groundBase = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT - 30, GAME_WIDTH, 150, initialScene.groundColor || 0x4a7c23);
    this.groundBase.setDepth(-6);
    this.groundBase.setScrollFactor(0); // Fixed position
    
    // Ground highlight strip (lighter color for depth)
    this.groundHighlight = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT - 90, GAME_WIDTH, 20, initialScene.groundColorLight || 0x6b9b3a);
    this.groundHighlight.setDepth(-5);
    this.groundHighlight.setScrollFactor(0);
    this.groundHighlight.setAlpha(0.5);
    
    this.bgPanels = this.add.group();
    this.panelWidth = 1344; // Match actual landscape width
    const numScenes = sceneSequence.length;
    
    // Create ONE panel per scene - NO CYCLING
    // FIX: Scale proportionally to maintain aspect ratio, align bottoms to ground
    for (let i = 0; i < numScenes; i++) {
      const sceneData = sceneSequence[i];
      // Only add panel if texture exists
      if (this.textures.exists(sceneData.key)) {
        // Get actual texture dimensions for proper scaling
        const texture = this.textures.get(sceneData.key);
        const frame = texture.getSourceImage();
        const origWidth = frame.width || 1344;
        const origHeight = frame.height || 580;
        
        // Scale width to panel width, height proportionally (no stretching!)
        const scale = this.panelWidth / origWidth;
        const scaledHeight = origHeight * scale;
        
        const panel = this.add.image(i * this.panelWidth, this.groundY + 60, sceneData.key)
          .setOrigin(0, 1)  // Bottom-left anchor - ground level aligned!
          .setDisplaySize(this.panelWidth, scaledHeight)  // Proportional scaling
          .setDepth(-10)
          .setScrollFactor(1); // Scroll 1:1 with camera - no gaps!
        panel.sceneData = sceneData;
        panel.sceneIndex = i;
        this.bgPanels.add(panel);
      }
    }
    
    // Ground tiles now use colored rectangles that match scene (no grass.svg needed)
    // You can replace these with Ludo ground textures later
    this.groundTiles = [];
    const tileWidth = 512;
    const totalGroundWidth = numScenes * this.panelWidth;
    const tilesNeeded = Math.ceil(totalGroundWidth / tileWidth) + 5;
    for (let i = 0; i < tilesNeeded; i++) {
      // Calculate which scene this tile belongs to based on position
      const tileX = i * tileWidth;
      const sceneIdx = Math.min(Math.floor(tileX / this.panelWidth), numScenes - 1);
      const sceneData = sceneSequence[sceneIdx];
      
      // Create ground tile with scene-appropriate color
      const tile = this.add.rectangle(i * tileWidth + tileWidth/2, GAME_HEIGHT - 50, tileWidth, 100, sceneData.groundColor || 0x4a7c23)
        .setOrigin(0.5, 0.5)
        .setDepth(-5);
      tile.sceneIndex = sceneIdx;
      this.groundTiles.push(tile);
    }
    
    // Track last scene for transition detection
    this.lastSceneKey = sceneSequence[0].key;
    this.lastSceneIndex = 0;
  }

  // Update ground colors when scene changes
  updateGroundForScene(sceneData) {
    if (!sceneData) return;
    
    // Smoothly transition ground base color
    if (this.groundBase) {
      this.tweens.add({
        targets: this.groundBase,
        fillColor: { from: this.groundBase.fillColor, to: sceneData.groundColor || 0x4a7c23 },
        duration: 500,
        ease: 'Linear'
      });
      // Phaser doesn't tween fillColor directly, so we do it manually
      const startColor = this.groundBase.fillColor;
      const endColor = sceneData.groundColor || 0x4a7c23;
      this.groundBase.setFillStyle(endColor);
    }
    
    if (this.groundHighlight) {
      this.groundHighlight.setFillStyle(sceneData.groundColorLight || 0x6b9b3a);
    }
  }

  // ========== CHRISTMAS FALLING SNOW IN-GAME ==========
  createChristmasSnow() {
    if (!this.isChristmasMode) return;
    
    // Create snow particle group
    this.snowflakes = this.add.group();
    
    // Spawn snowflakes periodically
    this.time.addEvent({
      delay: 150, // Spawn every 150ms
      callback: () => this.spawnSnowflake(),
      loop: true
    });
    
    // Show Christmas welcome message
    this.time.delayedCall(2000, () => {
      this.showNotification("🎄 Merry Christmas! Jesus is the reason for the season!", 0x22c55e);
    });
    
    // Show Christmas scriptures periodically
    this.time.addEvent({
      delay: 30000, // Every 30 seconds
      callback: () => {
        if (this.isChristmasMode && !this.gameOver) {
          const scripture = CHRISTMAS_SCRIPTURES[Math.floor(Math.random() * CHRISTMAS_SCRIPTURES.length)];
          this.showScripturePopup(scripture);
        }
      },
      loop: true
    });
    
    // Show family/thankful messages periodically
    this.time.addEvent({
      delay: 45000, // Every 45 seconds
      callback: () => {
        if (this.isChristmasMode && !this.gameOver) {
          const msg = CHRISTMAS_MESSAGES[Math.floor(Math.random() * CHRISTMAS_MESSAGES.length)];
          this.showNotification(msg, 0xffd700);
        }
      },
      loop: true
    });
  }
  
  spawnSnowflake() {
    if (!this.isChristmasMode || this.gameOver) return;
    // ONLY spawn snow in Christmas scene - not in other scenes!
    if (!this.currentScene || !this.currentScene.isChristmas) return;
    if (this.snowflakes && this.snowflakes.getLength() > 80) return; // Limit snowflakes
    
    const x = this.cameras.main.scrollX + Math.random() * GAME_WIDTH;
    const size = Phaser.Math.Between(3, 8);
    
    // Create snowflake as white circle
    const flake = this.add.circle(x, -10, size, 0xffffff, 0.8);
    flake.setDepth(200); // Above everything
    
    // Add to group
    this.snowflakes.add(flake);
    
    // Animate falling with gentle sway
    const fallDuration = Phaser.Math.Between(4000, 7000);
    const drift = Phaser.Math.Between(-80, 80);
    
    this.tweens.add({
      targets: flake,
      y: GAME_HEIGHT + 20,
      x: x + drift,
      alpha: 0.3,
      duration: fallDuration,
      ease: 'Linear',
      onComplete: () => {
        flake.destroy();
      }
    });
  }

  createHunter() {
    // Create invisible ground platform for physics - matches current scene
    const initialScene = sceneSequence[0];
    this.ground = this.add.rectangle(WORLD_WIDTH / 2, this.groundY + 30, WORLD_WIDTH, 60, initialScene.groundColor || 0x4a7c23);
    this.ground.setDepth(-4);
    this.physics.add.existing(this.ground, true); // true = static body
    
    // Character already set in create()
    const charId = this.selectedCharacter;
    const idleKey = `${charId}_idle`;
    
    console.log('Creating animated hunter with character:', charId);
    
    // Create SHADOW under hunter's feet (ellipse for realistic look)
    this.hunterShadow = this.add.ellipse(300, this.groundY + 5, 60, 20, 0x000000, 0.3)
      .setOrigin(0.5)
      .setDepth(9); // Just below hunter
    
    // Create hunter with ANIMATED sprite sheet
    this.hunter = this.physics.add.sprite(300, this.groundY, `${charId}_idle`)
      .setOrigin(0.5, 1)
      .setScale(HUNTER_SCALE)
      .setDepth(10);
    
    
    // Apply white outline border effect
    if (this.hunter.preFX) {
      this.hunter.preFX.addGlow(0xFFFFFF, 2, 0, false, 0.05, 12);
    }
    
    // Initialize bot and sniper systems
    if (window.GameIntegration && this.currentScene) {
      const sceneName = this.currentScene.key || "park";
      GameIntegration.initScene(this, sceneName);
    }
    // ========== WEAPON SPRITE OVERLAY - REMOVED ==========
    // Weapon is now drawn as part of the hunter sprite animations
    // this.createWeaponSprite();
    
    // Play idle animation
    if (this.anims.exists(idleKey)) {
      this.hunter.play(idleKey);
    }
    
    // Track current animation state
    this.currentAnim = ANIM_IDLE;
    
    // Apply current skin tint
    this.applyHunterSkin();
    
    // Add player name label for multiplayer mode
    if (window.multiplayerClient && window.multiplayerClient.isConnected) {
      const playerName = window.multiplayerClient.localPlayerName || 'You';
      const initials = this.getPlayerInitials(playerName);
      this.hunterNameLabel = this.add.text(300, this.groundY - 110, initials, {
        fontSize: '14px',
        fontStyle: 'bold',
        color: '#ffffff',
        backgroundColor: '#22c55edd',
        padding: { x: 6, y: 3 },
        stroke: '#000000',
        strokeThickness: 2,
      }).setOrigin(0.5).setDepth(15);
    }
    
    if (this.hunter.body) {
      this.hunter.body.setSize(this.hunter.width * 0.5, this.hunter.height * 0.9);
      this.hunter.body.setOffset(this.hunter.width * 0.25, this.hunter.height * 0.1);
      this.hunter.body.setAllowRotation(false);
      this.hunter.body.setCollideWorldBounds(true);
      this.hunter.body.setGravityY(800);
    }
    
    // Hunter stands on ground
    this.physics.add.collider(this.hunter, this.ground);
    
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, GAME_HEIGHT);
    this.cameras.main.startFollow(this.hunter, true, 0.1, 0.1);
    
    // Collisions
    this.physics.add.overlap(this.bullets, this.birds, this.onBulletHitsBird, null, this);
    this.physics.add.overlap(this.bullets, this.animals, this.onBulletHitsAnimal, null, this);
    this.physics.add.overlap(this.bullets, this.turds, this.onBulletHitsTurd, null, this);
    this.physics.add.overlap(this.bullets, this.parachuters, this.onBulletHitsParachuter, null, this);
    this.physics.add.overlap(this.bullets, this.vehicles, this.onBulletHitsVehicle, null, this);
    this.physics.add.overlap(this.bullets, this.planes, this.onBulletHitsPlane, null, this);
    this.physics.add.overlap(this.turds, this.hunter, this.onTurdHitsHunter, null, this);
    this.physics.add.overlap(this.birds, this.hunter, this.onBirdHitsHunter, null, this);
    this.physics.add.overlap(this.vehicles, this.groundTurds, (v, turd) => { 
      if (turd && turd.active) turd.destroy(); 
    });
    this.physics.add.overlap(this.hunter, this.items, this.onCollectItem, null, this);
    this.physics.add.overlap(this.hunter, this.coins, this.onCollectCoin, null, this);
  }
  
  // ========== WEAPON SPRITE SYSTEM ==========
  // Maps purchased weapons to sprite keys
  getWeaponSpriteKey() {
    // Check owned weapons in priority order (best first)
    const owned = JSON.parse(localStorage.getItem('birdturds_owned') || '[]');
    
    // Weapon priority (best to worst)
    const weaponPriority = [
      { id: 'bazooka', sprite: 'rocketlauncher' },
      { id: 'rocketlauncher', sprite: 'rocketlauncher' },
      { id: 'minigun', sprite: 'machinegun' },
      { id: 'minigun_mounted', sprite: 'machinegun' },
      { id: 'machinegun', sprite: 'machinegun' },
      { id: 'barrett', sprite: 'sniper' },
      { id: 'sniper', sprite: 'sniper' },
      { id: 'auto_shotgun', sprite: 'shotgun' },
      { id: 'pump_action', sprite: 'shotgun' },
      { id: 'shotgun_12', sprite: 'shotgun' },
      { id: 'shotgun_20', sprite: 'shotgun' },
      { id: 'shotgun_410', sprite: 'shotgun' },
      { id: 'deagle', sprite: 'rifle' }, // Use rifle sprite for now
      { id: 'revolver', sprite: 'rifle' },
      { id: 'handgun', sprite: 'rifle' },
    ];
    
    // Find best owned weapon
    for (const weapon of weaponPriority) {
      if (owned.includes(weapon.id)) {
        btState.currentWeapon = weapon.id;
        return weapon.sprite;
      }
    }
    
    // Default to rifle
    btState.currentWeapon = 'rifle';
    return 'rifle';
  }
  
  // Create weapon sprite overlay
  createWeaponSprite() {
    const weaponKey = this.getWeaponSpriteKey();
    
    // Use PROPORTIONAL offset based on hunter's actual display size
    // This works correctly across all characters & scale changes
    this.weaponOffsetX = 30;           // Horizontal offset from center
    this.weaponHeightFactor = 0.40;    // Vertical anchor: 0 = feet, 1 = head (0.40 = upper torso / hands)
    
    // Generate fallback weapon texture if needed
    if (!this.textures.exists(weaponKey)) {
      console.log('🔫 Weapon texture not found, creating fallback:', weaponKey);
      this.createFallbackWeaponTexture(weaponKey);
    }
    
    // Create weapon sprite (either from loaded texture or fallback)
    if (this.textures.exists(weaponKey) && this.hunter) {
      const flipMult = this.hunter.flipX ? -1 : 1;
      
      // Hunter.y is FEET because origin = (0.5, 1)
      // So weapon Y = feet - (displayHeight * factor)
      const baseY = this.hunter.y - (this.hunter.displayHeight * this.weaponHeightFactor);
      
      this.hunterWeapon = this.add.image(
        this.hunter.x + (this.weaponOffsetX * flipMult),
        baseY,
        weaponKey
      )
      .setOrigin(0.3, 0.5)  // Anchor near grip
      .setScale(0.13)       // Fit character nicely
      .setDepth(this.hunter.depth + 1)  // Always just above hunter
      .setAngle(-12)       // Slight upward angle
      .setVisible(false);   // START HIDDEN - show after hunter is ready
      
      // Show weapon after short delay to ensure hunter is positioned correctly
      this.time.delayedCall(100, () => {
        if (this.hunterWeapon && this.hunter && this.hunter.displayHeight > 10) {
          this.hunterWeapon.setVisible(true);
        }
      });
      
      console.log('🔫 Weapon sprite created:', weaponKey, 'displayHeight:', this.hunter.displayHeight);
    } else {
      console.warn('🔫 Could not create weapon sprite - no texture or hunter');
    }
  }
  
  // Create fallback weapon texture if external file fails to load
  createFallbackWeaponTexture(key) {
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });
    
    // Draw a simple weapon shape based on type
    if (key.includes('rocket') || key.includes('bazooka')) {
      // Rocket launcher - long tube
      graphics.fillStyle(0x556655);
      graphics.fillRect(0, 20, 120, 25);
      graphics.fillStyle(0x333333);
      graphics.fillRect(110, 15, 30, 35);
    } else if (key.includes('machine') || key.includes('minigun')) {
      // Machine gun - boxy with barrel
      graphics.fillStyle(0x444444);
      graphics.fillRect(0, 20, 100, 20);
      graphics.fillRect(80, 15, 40, 30);
    } else if (key.includes('sniper') || key.includes('barrett')) {
      // Sniper - long barrel
      graphics.fillStyle(0x3a3a3a);
      graphics.fillRect(0, 22, 130, 16);
      graphics.fillStyle(0x5a5a5a);
      graphics.fillRect(100, 18, 30, 24);
    } else if (key.includes('shotgun')) {
      // Shotgun - shorter, thicker
      graphics.fillStyle(0x6b4423);
      graphics.fillRect(0, 18, 90, 24);
      graphics.fillStyle(0x333333);
      graphics.fillRect(70, 15, 30, 30);
    } else {
      // Default rifle shape
      graphics.fillStyle(0x5a4a3a);
      graphics.fillRect(0, 20, 80, 18);
      graphics.fillStyle(0x3a3a3a);
      graphics.fillRect(60, 16, 30, 26);
    }
    
    graphics.generateTexture(key, 150, 60);
    graphics.destroy();
  }
  
  // Update weapon position (call in update loop)
  updateWeaponSprite() {
    if (!this.hunterWeapon || !this.hunter) return;
    
    // Hide weapon if hunter isn't properly loaded yet
    if (this.hunter.displayHeight < 10) {
      this.hunterWeapon.setVisible(false);
      return;
    }
    
    // Show weapon once hunter is ready
    if (!this.hunterWeapon.visible) {
      this.hunterWeapon.setVisible(true);
    }
    
    // Flip weapon based on hunter direction
    const flipMult = this.hunter.flipX ? -1 : 1;
    
    // Calculate Y position using displayHeight (works with scale changes)
    // Hunter.y = feet, so weapon Y = feet - (height * factor)
    const baseY = this.hunter.y - (this.hunter.displayHeight * this.weaponHeightFactor);
    
    // Update position to follow hunter
    this.hunterWeapon.x = this.hunter.x + (this.weaponOffsetX * flipMult);
    this.hunterWeapon.y = baseY;
    this.hunterWeapon.flipX = this.hunter.flipX;
    
    // Adjust angle based on aim or flip direction
    if (this.aimAngle !== undefined) {
      this.hunterWeapon.setAngle(this.aimAngle * flipMult);
    } else {
      // Default slight upward angle when not aiming
      this.hunterWeapon.setAngle(-12 * flipMult);
    }
    
    // Keep weapon depth relative to hunter
    this.hunterWeapon.setDepth(this.hunter.depth + 1);
  }
  
  // Switch weapon (called when purchasing or equipping)
  switchWeapon(weaponId) {
    // Update btState
    btState.currentWeapon = weaponId;
    
    // Map weapon ID to sprite
    const spriteMap = {
      'bazooka': 'rocketlauncher',
      'rocketlauncher': 'rocketlauncher',
      'minigun': 'machinegun',
      'minigun_mounted': 'machinegun',
      'machinegun': 'machinegun',
      'barrett': 'sniper',
      'sniper': 'sniper',
      'auto_shotgun': 'shotgun',
      'pump_action': 'shotgun',
      'shotgun_12': 'shotgun',
      'shotgun_20': 'shotgun',
      'shotgun_410': 'shotgun',
      'deagle': 'rifle',
      'revolver': 'rifle',
      'handgun': 'rifle',
      'rifle': 'rifle'
    };
    
    const newSprite = spriteMap[weaponId] || 'rifle';
    
    // WEAPON SPRITES DISABLED - weapons are part of character animations
    // Just track which weapon is equipped for game logic
    btState.currentWeapon = weaponId;
    
    // Play weapon switch sound
    this.playSound('reload');
    
    // Show notification
    this.showNotification(`🔫 Equipped: ${weaponId.toUpperCase()}`, 0x22c55e);
    
    console.log('🔫 Weapon switched to:', weaponId, '(sprite disabled)');
  }
  
  // ========== ROCKET JETPACK SYSTEM ==========
  // Vivid 2D rocket jetpack with flames and full flight control
  
  activateJetpack(duration = 30) {
    if (this.jetpackActive) return; // Already active
    
    btState.jetpackActive = true;
    btState.jetpackFuel = duration;
    btState.jetpackMaxFuel = duration;
    this.jetpackActive = true;
    
    // Create jetpack graphics (on hunter's back)
    this.createJetpackGraphics();
    
    // Play activation sound
    this.playSound('powerup');
    
    // Disable gravity while jetpack active
    if (this.hunter && this.hunter.body) {
      this.hunter.body.setGravityY(0);
      this.hunter.body.setAllowGravity(false);
    }
    
    // Start fuel timer
    this.jetpackTimer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        btState.jetpackFuel--;
        
        // Update fuel bar
        this.updateJetpackFuelBar();
        
        // Warning at low fuel
        if (btState.jetpackFuel === 10) {
          this.showNotification('⚠️ JETPACK: 10 seconds remaining!', 0xf59e0b);
        }
        if (btState.jetpackFuel === 5) {
          this.showNotification('🚨 JETPACK ALMOST EMPTY!', 0xef4444);
        }
        
        // Deactivate when empty
        if (btState.jetpackFuel <= 0) {
          this.deactivateJetpack();
        }
      },
      repeat: duration - 1
    });
    
    console.log('🚀 Jetpack activated for', duration, 'seconds!');
  }
  
  createJetpackGraphics() {
    if (!this.hunter) return;
    
    // Main jetpack body (vivid red/orange metallic)
    this.jetpackBody = this.add.graphics();
    this.jetpackBody.setDepth(9); // Behind hunter
    
    // Draw jetpack shape
    this.drawJetpackBody();
    
    // Create flame emitters (left and right thrusters)
    this.jetpackFlames = [];
    
    // Left thruster flames
    this.leftFlame = this.add.graphics();
    this.leftFlame.setDepth(8);
    this.jetpackFlames.push(this.leftFlame);
    
    // Right thruster flames  
    this.rightFlame = this.add.graphics();
    this.rightFlame.setDepth(8);
    this.jetpackFlames.push(this.rightFlame);
    
    // Create fuel bar UI
    this.createJetpackFuelBar();
    
    // Flame animation timer
    this.flameAnimTimer = 0;
  }
  
  drawJetpackBody() {
    if (!this.jetpackBody || !this.hunter) return;
    
    const g = this.jetpackBody;
    g.clear();
    
    const x = this.hunter.x;
    const y = this.hunter.y - 50;
    const flipMult = this.hunter.flipX ? 1 : -1;
    
    // Main tank (vivid orange-red gradient effect)
    g.fillStyle(0xff4500, 1); // Orange-red
    g.fillRoundedRect(x + (15 * flipMult), y - 20, 25, 45, 8);
    
    // Tank highlight (metallic shine)
    g.fillStyle(0xff6b00, 1);
    g.fillRoundedRect(x + (17 * flipMult), y - 18, 10, 40, 5);
    
    // Tank outline
    g.lineStyle(2, 0x8b0000);
    g.strokeRoundedRect(x + (15 * flipMult), y - 20, 25, 45, 8);
    
    // Secondary tank (yellow accent)
    g.fillStyle(0xffd700, 1);
    g.fillRoundedRect(x + (20 * flipMult), y - 25, 15, 10, 4);
    
    // Thrusters (bottom nozzles)
    g.fillStyle(0x333333, 1);
    g.fillRoundedRect(x + (12 * flipMult), y + 20, 12, 15, 3);
    g.fillRoundedRect(x + (28 * flipMult), y + 20, 12, 15, 3);
    
    // Thruster rings (chrome effect)
    g.lineStyle(2, 0xc0c0c0);
    g.strokeRoundedRect(x + (12 * flipMult), y + 18, 12, 5, 2);
    g.strokeRoundedRect(x + (28 * flipMult), y + 18, 12, 5, 2);
    
    // Straps (connecting to hunter)
    g.lineStyle(3, 0x4a4a4a);
    g.lineBetween(x + (15 * flipMult), y - 10, x + (5 * flipMult), y - 20);
    g.lineBetween(x + (15 * flipMult), y + 10, x + (5 * flipMult), y + 5);
    
    // Fuel gauge on tank
    const fuelPercent = btState.jetpackFuel / btState.jetpackMaxFuel;
    g.fillStyle(0x00ff00, 0.8);
    g.fillRect(x + (35 * flipMult), y - 15, 5, 30 * fuelPercent);
    g.lineStyle(1, 0x000000);
    g.strokeRect(x + (35 * flipMult), y - 15, 5, 30);
  }
  
  drawJetpackFlames() {
    if (!this.jetpackFlames || !this.hunter || !btState.jetpackActive) return;
    
    const x = this.hunter.x;
    const y = this.hunter.y - 50;
    const flipMult = this.hunter.flipX ? 1 : -1;
    
    // Animate flame flicker
    this.flameAnimTimer = (this.flameAnimTimer || 0) + 0.3;
    const flicker = Math.sin(this.flameAnimTimer * 10) * 5;
    const flicker2 = Math.cos(this.flameAnimTimer * 8) * 4;
    
    // Left flame
    if (this.leftFlame) {
      this.leftFlame.clear();
      
      // Outer flame (orange)
      this.leftFlame.fillStyle(0xff6b00, 0.9);
      this.leftFlame.fillTriangle(
        x + (12 * flipMult), y + 35,
        x + (24 * flipMult), y + 35,
        x + (18 * flipMult), y + 70 + flicker
      );
      
      // Middle flame (yellow)
      this.leftFlame.fillStyle(0xffff00, 0.95);
      this.leftFlame.fillTriangle(
        x + (14 * flipMult), y + 35,
        x + (22 * flipMult), y + 35,
        x + (18 * flipMult), y + 60 + flicker2
      );
      
      // Inner flame (white-hot)
      this.leftFlame.fillStyle(0xffffff, 1);
      this.leftFlame.fillTriangle(
        x + (16 * flipMult), y + 35,
        x + (20 * flipMult), y + 35,
        x + (18 * flipMult), y + 50 + flicker
      );
    }
    
    // Right flame
    if (this.rightFlame) {
      this.rightFlame.clear();
      
      // Outer flame (orange)
      this.rightFlame.fillStyle(0xff6b00, 0.9);
      this.rightFlame.fillTriangle(
        x + (28 * flipMult), y + 35,
        x + (40 * flipMult), y + 35,
        x + (34 * flipMult), y + 70 + flicker2
      );
      
      // Middle flame (yellow)
      this.rightFlame.fillStyle(0xffff00, 0.95);
      this.rightFlame.fillTriangle(
        x + (30 * flipMult), y + 35,
        x + (38 * flipMult), y + 35,
        x + (34 * flipMult), y + 60 + flicker
      );
      
      // Inner flame (white-hot)
      this.rightFlame.fillStyle(0xffffff, 1);
      this.rightFlame.fillTriangle(
        x + (32 * flipMult), y + 35,
        x + (36 * flipMult), y + 35,
        x + (34 * flipMult), y + 50 + flicker2
      );
    }
    
    // Spawn flame particles occasionally
    if (Math.random() < 0.3) {
      this.spawnFlameParticle(x + (18 * flipMult), y + 60);
      this.spawnFlameParticle(x + (34 * flipMult), y + 60);
    }
  }
  
  spawnFlameParticle(x, y) {
    const colors = [0xff6b00, 0xffff00, 0xff0000, 0xff4500];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const particle = this.add.circle(
      x + Phaser.Math.Between(-5, 5),
      y,
      Phaser.Math.Between(2, 6),
      color,
      0.8
    ).setDepth(7);
    
    this.tweens.add({
      targets: particle,
      y: y + Phaser.Math.Between(20, 40),
      alpha: 0,
      scale: 0.3,
      duration: Phaser.Math.Between(200, 400),
      onComplete: () => particle.destroy()
    });
  }
  
  createJetpackFuelBar() {
    // Create fuel bar UI at top of screen
    this.jetpackFuelBg = this.add.rectangle(GAME_WIDTH / 2, 80, 200, 20, 0x333333, 0.8)
      .setScrollFactor(0)
      .setDepth(100);
    
    this.jetpackFuelFill = this.add.rectangle(GAME_WIDTH / 2 - 95, 80, 190, 14, 0xff6b00, 1)
      .setScrollFactor(0)
      .setDepth(101)
      .setOrigin(0, 0.5);
    
    this.jetpackFuelLabel = this.add.text(GAME_WIDTH / 2, 80, '🚀 JETPACK FUEL', {
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    }).setScrollFactor(0).setDepth(102).setOrigin(0.5);
    
    this.jetpackFuelTimer = this.add.text(GAME_WIDTH / 2 + 110, 80, btState.jetpackFuel + 's', {
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#ffff00',
      stroke: '#000000',
      strokeThickness: 2
    }).setScrollFactor(0).setDepth(102).setOrigin(0, 0.5);
  }
  
  updateJetpackFuelBar() {
    if (!this.jetpackFuelFill || !btState.jetpackActive) return;
    
    const fuelPercent = btState.jetpackFuel / btState.jetpackMaxFuel;
    this.jetpackFuelFill.setScale(fuelPercent, 1);
    
    // Change color based on fuel level
    if (fuelPercent > 0.5) {
      this.jetpackFuelFill.setFillStyle(0x00ff00); // Green
    } else if (fuelPercent > 0.25) {
      this.jetpackFuelFill.setFillStyle(0xffff00); // Yellow
    } else {
      this.jetpackFuelFill.setFillStyle(0xff0000); // Red
    }
    
    // Update timer text
    if (this.jetpackFuelTimer) {
      this.jetpackFuelTimer.setText(btState.jetpackFuel + 's');
    }
  }
  
  updateJetpack(dt) {
    if (!btState.jetpackActive || !this.hunter) return;
    
    // Redraw jetpack body (follows hunter)
    this.drawJetpackBody();
    
    // Animate flames
    this.drawJetpackFlames();
    
    // Handle flight movement (WASD or Arrow keys)
    const speed = 350;
    let vx = 0;
    let vy = 0;
    
    // Horizontal movement
    if (this.keys.LEFT.isDown || this.keys.A?.isDown) {
      vx = -speed;
      this.hunter.flipX = true;
    } else if (this.keys.RIGHT.isDown || this.keys.D?.isDown) {
      vx = speed;
      this.hunter.flipX = false;
    }
    
    // Vertical movement (UP/DOWN or W/S)
    if (this.keys.UP.isDown || this.keys.W?.isDown) {
      vy = -speed;
    } else if (this.keys.DOWN.isDown || this.keys.S?.isDown) {
      vy = speed;
    }
    
    // Apply velocity
    if (this.hunter.body) {
      this.hunter.body.setVelocity(vx, vy);
      
      // Clamp to screen bounds
      const minY = 50;
      const maxY = this.groundY - 20;
      
      if (this.hunter.y < minY) {
        this.hunter.y = minY;
        this.hunter.body.setVelocityY(0);
      }
      if (this.hunter.y > maxY) {
        this.hunter.y = maxY;
        this.hunter.body.setVelocityY(0);
      }
    }
    
    // Play jet sound occasionally
    if (Math.random() < 0.02) {
      this.playSound('helicopter'); // Use helicopter sound for jet
    }
    
    // Update shadow position (below hunter in the air)
    if (this.hunterShadow) {
      this.hunterShadow.x = this.hunter.x;
      this.hunterShadow.y = this.groundY + 5;
      // Shadow gets smaller when higher
      const heightRatio = 1 - ((this.groundY - this.hunter.y) / (this.groundY - 50)) * 0.6;
      this.hunterShadow.setScale(Math.max(0.3, heightRatio));
      this.hunterShadow.setAlpha(Math.max(0.1, heightRatio * 0.3));
    }
  }
  
  deactivateJetpack() {
    btState.jetpackActive = false;
    btState.jetpackFuel = 0;
    this.jetpackActive = false;
    
    // Stop timer
    if (this.jetpackTimer) {
      this.jetpackTimer.remove();
    }
    
    // Re-enable gravity
    if (this.hunter && this.hunter.body) {
      this.hunter.body.setAllowGravity(true);
      this.hunter.body.setGravityY(800);
    }
    
    // Clean up graphics
    if (this.jetpackBody) {
      this.jetpackBody.destroy();
      this.jetpackBody = null;
    }
    if (this.leftFlame) {
      this.leftFlame.destroy();
      this.leftFlame = null;
    }
    if (this.rightFlame) {
      this.rightFlame.destroy();
      this.rightFlame = null;
    }
    
    // Clean up fuel bar
    if (this.jetpackFuelBg) this.jetpackFuelBg.destroy();
    if (this.jetpackFuelFill) this.jetpackFuelFill.destroy();
    if (this.jetpackFuelLabel) this.jetpackFuelLabel.destroy();
    if (this.jetpackFuelTimer) this.jetpackFuelTimer.destroy();
    
    // Reset shadow
    if (this.hunterShadow) {
      this.hunterShadow.setScale(1);
      this.hunterShadow.setAlpha(0.3);
    }
    
    // Notification
    this.showNotification('🚀 Jetpack fuel depleted!', 0x666666);
    this.playSound('reload');
    
    console.log('🚀 Jetpack deactivated');
  }

  // Get player initials for multiplayer name labels
  getPlayerInitials(name) {
    if (!name) return '?';
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
      return name.substring(0, 3).toUpperCase();
    }
    return words.slice(0, 3).map(w => w[0]).join('').toUpperCase();
  }
  
  // ========== ANIMATION HELPER - Switch character animations ==========
  playHunterAnim(animName) {
    if (!this.hunter || this.currentAnim === animName) return;
    
    const charId = this.selectedCharacter;
    const animKey = `${charId}_${animName}`;
    
    if (this.anims.exists(animKey)) {
      this.hunter.play(animKey);
      this.currentAnim = animName;
    }
  }
  
  // Apply skin tint and armor based on btState
  applyHunterSkin() {
    if (!this.hunter) return;
    
    // Skin tints (applied to base hunter) - MUST MATCH STORE IDs
    const skinTints = {
      default: 0xffffff,           // No tint - default hunter
      skin_default: 0xffffff,      // Same
      skin_camo: 0x556b2f,         // Forest green camo
      skin_winter: 0xe0f0ff,       // Light blue winter
      skin_desert: 0xdeb887,       // Sandy tan desert
      skin_tactical: 0x2f2f2f,     // Dark tactical black
      skin_armor_light: 0xb0c4de,  // Light steel blue armor
      skin_armor_heavy: 0x708090,  // Slate gray heavy armor
      skin_hazmat: 0xffff00,       // Yellow hazmat
      skin_gold: 0xffd700,         // Golden bling
      skin_legendary: 0xff6b6b,    // Red legendary with glow
      // Legacy/fallback
      camo: 0x556b2f,
      desert: 0xdeb887,
      arctic: 0xe0ffff,
      ninja: 0x2f2f2f,
      gold: 0xffd700,
      neon: 0x00ff88,
      fire: 0xff4500,
      ice: 0x87ceeb,
      shadow: 0x4a0080
    };
    
    const currentSkin = btState.currentSkin || 'default';
    const tint = skinTints[currentSkin] || skinTints['skin_' + currentSkin] || 0xffffff;
    this.hunter.setTint(tint);
    
    // Special effect for legendary skin
    if (currentSkin === 'skin_legendary' || currentSkin === 'legendary') {
      // Add pulsing glow effect
      if (!this.legendaryGlow) {
        this.legendaryGlow = this.tweens.add({
          targets: this.hunter,
          alpha: { from: 1, to: 0.8 },
          duration: 500,
          yoyo: true,
          repeat: -1
        });
      }
    }
    
    // Apply armor overlay effect
    this.applyArmorOverlay();
  }
  
  applyArmorOverlay() {
    if (!this.hunterArmor) return;
    
    // Check armor level from upgrades
    const armorLevel = btState.upgrades.armor || 0;
    
    if (armorLevel >= 0.3) {
      // Heavy armor - golden glow
      this.hunterArmor.setAlpha(0.3);
      this.hunterArmor.setTint(0xffd700);
      this.hunterArmor.setBlendMode(Phaser.BlendModes.ADD);
    } else if (armorLevel >= 0.2) {
      // Medium armor - silver
      this.hunterArmor.setAlpha(0.25);
      this.hunterArmor.setTint(0xc0c0c0);
      this.hunterArmor.setBlendMode(Phaser.BlendModes.ADD);
    } else if (armorLevel >= 0.1) {
      // Light armor - bronze
      this.hunterArmor.setAlpha(0.2);
      this.hunterArmor.setTint(0xcd7f32);
      this.hunterArmor.setBlendMode(Phaser.BlendModes.ADD);
    } else {
      // No armor
      this.hunterArmor.setAlpha(0);
    }
  }
  
  // Bird hits hunter (falling birds cause damage)
  onBirdHitsHunter(bird, hunter) {
    if (!bird || !hunter || !bird.active || this.gameOver) return;
    if (btState.invincible) return;
    
    // Only falling birds (with gravity) cause damage
    if (bird.body && bird.body.allowGravity) {
      // Apply armor reduction from upgrades AND skin
      const armorMult = (1 - btState.upgrades.armor) * (1 - btState.armorReduction);
      const damage = Math.round(10 * armorMult);
      btState.health = Math.max(0, btState.health - damage);
      
      this.showPointIndicator(hunter.x, hunter.y - 50, '-10 HP BIRD HIT!', 0xef4444);
      this.cameras.main.shake(100, 0.005);
      
      bird.destroy();
      
      if (btState.health <= 0) {
        this.triggerDeathAnimation('bird');
      }
      this.updateHud();
    }
  }
  
  // Shooting down planes/helicopters - BIG PENALTY!
  onBulletHitsPlane(bullet, plane) {
    if (!bullet || !plane || !bullet.active || !plane.active) return;
    
    bullet.destroy();
    
    // Huge penalty!
    const penalty = -200;
    btState.score += penalty;
    
    this.showPointIndicator(plane.x, plane.y, `${penalty} DON'T SHOOT AIRCRAFT!`, 0xef4444);
    this.showNotification('✈️ YOU SHOT DOWN A PLANE! HUGE PENALTY!');
    this.cameras.main.shake(500, 0.02);
    
    // Plane crashes down
    plane.body.setAllowGravity(true);
    plane.body.setGravityY(400);
    plane.body.setVelocity(plane.direction * 50, 100);
    plane.isCrashing = true;
    
    this.tweens.add({
      targets: plane,
      rotation: plane.direction > 0 ? 2 : -2,
      duration: 1500,
      onComplete: () => {
        // Explosion on ground
        if (plane && plane.active) {
          this.createExplosion(plane.x, this.groundY - 20);
          plane.destroy();
        }
      }
    });
  }
  
  // Create explosion effect
  createExplosion(x, y) {
    // Flash
    const flash = this.add.circle(x, y, 80, 0xff6600, 0.8).setDepth(100);
    this.tweens.add({
      targets: flash,
      scale: 2,
      alpha: 0,
      duration: 300,
      onComplete: () => flash.destroy()
    });
    
    // Debris
    for (let i = 0; i < 12; i++) {
      const debris = this.add.rectangle(x, y, 10, 10, 0x333333).setDepth(99);
      const angle = (i / 12) * Math.PI * 2;
      this.tweens.add({
        targets: debris,
        x: x + Math.cos(angle) * 120,
        y: y + Math.sin(angle) * 80 - 50,
        alpha: 0,
        rotation: Math.random() * 6,
        duration: 600,
        onComplete: () => debris.destroy()
      });
    }
    
    // Check if hunter is near - damage!
    const dist = Math.hypot(this.hunter.x - x, this.hunter.y - y);
    if (dist < 150 && !btState.invincible) {
      const armorMult = (1 - btState.upgrades.armor) * (1 - btState.armorReduction);
      const damage = Math.round(30 * armorMult);
      btState.health = Math.max(0, btState.health - damage);
      this.showPointIndicator(this.hunter.x, this.hunter.y - 50, `-${damage} HP EXPLOSION!`, 0xef4444);
      if (btState.health <= 0) {
        this.triggerDeathAnimation('explosion');
      }
      this.updateHud();
    }
  }
  
  // DON'T SHOOT ALLIES! Penalty for hitting parachuters
  onBulletHitsParachuter(bullet, chuter) {
    if (!bullet || !chuter || !bullet.active || !chuter.active) return;
    
    bullet.destroy();
    
    // Big penalty for shooting allies!
    const penalty = -25;
    btState.score += penalty;
    
    // Show angry message
    this.showPointIndicator(chuter.x, chuter.y, `${penalty} DON'T SHOOT ALLIES!`, 0xef4444);
    this.showNotification('😡 FRIENDLY FIRE! -25 pts!');
    
    // Chuter is wounded but survives
    this.tweens.add({
      targets: chuter,
      alpha: 0.3,
      yoyo: true,
      duration: 100,
      repeat: 3
    });
  }
  
  // NEW: Shoot vehicle tires to stop them!
  onBulletHitsVehicle(bullet, vehicle) {
    if (!bullet || !vehicle || !bullet.active || !vehicle.active) return;
    
    // DON'T SHOOT HELPER VEHICLES!
    if (vehicle.isHelper) {
      bullet.destroy();
      const penalty = -25;
      btState.score = Math.max(0, btState.score + penalty);
      this.showPointIndicator(vehicle.x, vehicle.y - 30, `${penalty} DON'T SHOOT HELPERS!`, 0xef4444);
      this.showNotification('❌ That vehicle is helping you!', 0xef4444);
      return;
    }
    
    // Need multiple hits to stop vehicle
    vehicle.tireHits = (vehicle.tireHits || 0) + 1;
    bullet.destroy();
    
    const isTractor = vehicle.texture && vehicle.texture.key === 'tractor_good' || vehicle.texture.key === 'tractor_bad';
    
    // Show hit indicator
    this.showPointIndicator(vehicle.x, vehicle.y - 30, '🛞 HIT!', 0xfacc15);
    
    // Spark effect
    for (let i = 0; i < 3; i++) {
      const spark = this.add.circle(vehicle.x + Phaser.Math.Between(-20, 20), vehicle.y - 10, 3, 0xffff00).setDepth(20);
      this.tweens.add({
        targets: spark,
        x: spark.x + Phaser.Math.Between(-30, 30),
        y: spark.y - Phaser.Math.Between(10, 40),
        alpha: 0,
        duration: 200,
        onComplete: () => spark.destroy()
      });
    }
    
    // After 3 hits, tire blows out and vehicle stops!
    if (vehicle.tireHits >= 3) {
      vehicle.speed = 0; // STOP!
      
      // Points for stopping vehicle
      const points = 15;
      btState.score += points;
      
      // Funny message
      const msg = tireShotMessages[Math.floor(Math.random() * tireShotMessages.length)];
      this.showNotification(msg);
      this.showPointIndicator(vehicle.x, vehicle.y - 50, `+${points} FLAT TIRE!`, 0x22c55e);
      
      // Tire blowout visual
      const blowout = this.add.text(vehicle.x, vehicle.y - 20, '💨💥🛞', { fontSize: '24px' }).setOrigin(0.5).setDepth(25);
      this.tweens.add({
        targets: blowout,
        y: blowout.y - 50,
        alpha: 0,
        scale: 1.5,
        duration: 800,
        onComplete: () => blowout.destroy()
      });
      
      // Vehicle tilts when stopped
      this.tweens.add({
        targets: vehicle,
        rotation: isTractor ? 0.1 : 0.05,
        duration: 300
      });
      
      // Fade out stopped vehicle after a bit
      this.time.delayedCall(3000, () => {
        if (vehicle && vehicle.active) {
          this.tweens.add({
            targets: vehicle,
            alpha: 0,
            duration: 1000,
            onComplete: () => { if (vehicle) vehicle.destroy(); }
          });
        }
      });
    } else {
      // Show remaining hits needed
      const remaining = 3 - vehicle.tireHits;
      this.showNotification(`🛞 ${remaining} more hit${remaining > 1 ? 's' : ''} to blow tire!`);
    }
  }
  
  // NEW: Shoot falling turds out of the sky!
  onBulletHitsTurd(bullet, turd) {
    if (!bullet || !turd || !bullet.active || !turd.active) return;
    
    bullet.destroy();
    
    // Points for shooting turds!
    const points = 3;
    btState.score += points;
    
    // Funny messages for shooting turds
    const turdShotMessages = [
      "TURD SHOT! 💩🎯", "SPLATTERED! 💥💩", "NO TURD FOR YOU! 🚫💩",
      "TURD TERMINATED! 🎯💩", "TURD-B-GONE! ✨", "BULLSEYE! 🎯💩",
      "NICE SHOT! 💩", "TURD DEFLECTED! 🛡️", "TURD DOWN! 💩"
    ];
    const msg = turdShotMessages[Math.floor(Math.random() * turdShotMessages.length)];
    
    this.showPointIndicator(turd.x, turd.y, `+${points} ${msg}`, 0xd1d5db);
    
    // Splatter effect - whitish-grey particles
    for (let i = 0; i < 8; i++) {
      const splat = this.add.circle(turd.x, turd.y, 3, 0xd1d5db).setDepth(15);
      const angle = (i / 8) * Math.PI * 2;
      this.tweens.add({
        targets: splat,
        x: turd.x + Math.cos(angle) * 50,
        y: turd.y + Math.sin(angle) * 50,
        alpha: 0,
        scale: 0.3,
        duration: 350,
        onComplete: () => splat.destroy()
      });
    }
    
    turd.destroy();
  }
  
  // NEW: Shoot animals!
  onBulletHitsAnimal(bullet, animal) {
    if (!bullet || !animal || !bullet.active || !animal.active) return;
    
    bullet.destroy();
    
    const animalType = animal.animalType || 'animal';
    const animalData = groundAnimals[animalType];
    const isDangerous = animalData && animalData.dangerous;
    
    // Play the animal's sound when hit!
    this.playSound(animalType);
    
    // Get funny message
    const msgs = animalMessages[animalType] || [`${animalType.toUpperCase()}!`];
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    
    if (isDangerous) {
      // DANGEROUS animals = GOOD to shoot!
      const points = animalData.points || 25;
      const coins = animalData.coins || 5;
      
      btState.score += points;
      btState.animalKills++;
      
      this.showPointIndicator(animal.x, animal.y, `+${points} ${msg}`, 0x22c55e);
      this.spawnCoinDrop(animal.x, animal.y, coins);
    } else {
      // SAFE animals = BAD to shoot! PENALTY!
      const penalty = animalData.penalty || -20;
      
      btState.score += penalty; // Negative!
      
      this.showPointIndicator(animal.x, animal.y, `${penalty} DON'T SHOOT ${animalType.toUpperCase()}!`, 0xef4444);
      this.showNotification(`❌ ${animalType.toUpperCase()} is harmless! ${penalty} pts!`);
      this.cameras.main.shake(200, 0.01);
    }
    
    // Death animation for animal
    this.tweens.add({
      targets: animal,
      y: animal.y - 30,
      alpha: 0,
      rotation: Math.random() * 2 - 1,
      scaleX: 0.05,
      scaleY: 0.05,
      duration: 400,
      onComplete: () => animal.destroy()
    });
    
    // Blood splatter effect (cartoon style)
    for (let i = 0; i < 6; i++) {
      const splat = this.add.circle(animal.x, animal.y, 4, 0xff0000).setDepth(15);
      const angle = (i / 6) * Math.PI * 2;
      this.tweens.add({
        targets: splat,
        x: animal.x + Math.cos(angle) * 40,
        y: animal.y + Math.sin(angle) * 40,
        alpha: 0,
        duration: 300,
        onComplete: () => splat.destroy()
      });
    }
  }

  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      Z: Phaser.Input.Keyboard.KeyCodes.Z,  // Prone/lay down
      B: Phaser.Input.Keyboard.KeyCodes.B,  // Bible weapon!
      E: Phaser.Input.Keyboard.KeyCodes.E,  // Arrest villains!
      P: Phaser.Input.Keyboard.KeyCodes.P,  // Quick-buy ammo!
      SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
      SHIFT: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      C: Phaser.Input.Keyboard.KeyCodes.C,
      F: Phaser.Input.Keyboard.KeyCodes.F,
      K: Phaser.Input.Keyboard.KeyCodes.K,
      T: Phaser.Input.Keyboard.KeyCodes.T,  // Call lightning!
      G: Phaser.Input.Keyboard.KeyCodes.G   // Call wind/tornado!
    });
    
    // ========== GAMEPAD/CONTROLLER SUPPORT ==========
    this.gamepadInput = { left: false, right: false, up: false, down: false, shoot: false, jump: false };
    this.gamepadConnected = false;
    
    // Listen for gamepad connection
    window.addEventListener('gamepadconnected', (e) => {
      console.log('🎮 Gamepad connected:', e.gamepad.id);
      this.gamepadConnected = true;
      this.showNotification('🎮 Controller Connected!', 0x22c55e);
    });
    
    window.addEventListener('gamepaddisconnected', (e) => {
      console.log('🎮 Gamepad disconnected');
      this.gamepadConnected = false;
    });
    
    // Initialize knife cooldown and storm system
    this.knifeCooldown = 0;
    this.isJumping = false;
    this.isInAir = false;
    this.isProne = false;  // Laying down flat
    this.hunterBeingCarried = false; // Being carried by boss
    this.stormActive = false;
    this.stormTimer = 0;
    this.lightningCooldown = 0;
    this.lightningCharges = 3; // Start with 3 lightning calls
    this.windCooldown = 0;
    this.windCharges = 2; // Start with 2 wind/tornado calls
    this.inProtectedPark = false;
    
    // Villain/Globalist arrest system - DRAIN THE SWAMP!
    this.villains = this.physics.add.group();
    this.villainSpawnTimer = 0;
    this.arrestedCount = 0;
    
    // Track when splash/intro screens are showing
    this.splashActive = false;
    
    this.input.on('pointerdown', ptr => {
      // Don't shoot during splash screens, game over, or paused
      if (this.splashActive || this.gameOver || this.paused) return;
      this.handleShoot(ptr.worldX, ptr.worldY);
    });
    
    this.input.keyboard.on('keydown-L', () => this.showLeaderboard());
    this.input.keyboard.on('keydown-H', () => this.hideInstructions());
    this.input.keyboard.on('keydown-R', () => { 
      if (this.gameOver) {
        console.log('🔄 R key pressed - restarting...');
        if (typeof window.restartBirdTurds === 'function') {
          window.restartBirdTurds();
        } else {
          window.location.href = window.location.pathname + '?restart=' + Date.now();
        }
      }
    });
    
    // KNIFE ATTACK! Press F or K to slash nearby birds!
    this.input.keyboard.on('keydown-F', () => this.knifeAttack());
    this.input.keyboard.on('keydown-K', () => this.knifeAttack());
    
    // CALL LIGHTNING! Press T to call down lightning strike!
    this.input.keyboard.on('keydown-T', () => this.callLightning());
    
    // CALL WIND/TORNADO! Press G to sweep away birds!
    this.input.keyboard.on('keydown-G', () => this.callTornado());
    
    // QUICK BUY AMMO! Press P for instant ammo refill (100 TurdCoins)
    this.input.keyboard.on('keydown-P', () => {
      // Don't capture if typing in input or quick shop is open
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) return;
      if (this.quickShopOpen) return;
      this.quickBuyAmmo();
    });
    
    // ARREST GLOBALISTS! Press E to arrest nearby globalists!
    this.input.keyboard.on('keydown-E', () => this.tryArrestGlobalist());
    
    // SHAKE OFF TURDS! Press X or Q rapidly to shake off accumulated turds
    this.input.keyboard.on('keydown-X', () => this.shakeOffTurds());
    this.input.keyboard.on('keydown-Q', () => this.shakeOffTurds());
    
    // ========== DEVELOPER MODE ACTIVATION ==========
    // Type the secret code to activate developer mode
    this.devCodeBuffer = '';
    this.input.keyboard.on('keydown', (event) => {
      // Don't capture keys when typing in input fields
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.contentEditable === 'true')) {
        return; // Let the input field handle the key
      }
      if (event.key.length === 1) {
        this.devCodeBuffer += event.key.toUpperCase();
        // Keep only last 12 characters
        if (this.devCodeBuffer.length > 12) {
          this.devCodeBuffer = this.devCodeBuffer.slice(-12);
        }
        // Check if code matches
        if (this.devCodeBuffer.includes(btState.devModeCode)) {
          this.activateDevMode();
          this.devCodeBuffer = '';
        }
      }
    });
    
    // Double-tap on mobile to shake
    this.lastTapTime = 0;
    this.input.on('pointerdown', () => {
      const now = Date.now();
      if (now - this.lastTapTime < 300) {
        this.shakeOffTurds();
      }
      this.lastTapTime = now;
    });
    
    // MOBILE CONTROLS STATE - NEW TAP/DRAG SYSTEM
    this.mobileInput = { left: false, right: false, up: false, down: false, shoot: false, jump: false };
    this.touchState = {
      active: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      moveThreshold: 30, // pixels to trigger movement
      swipeThreshold: 50, // pixels for swipe up to jump
      isDragging: false
    };
    this.setupMobileControls();
  }
  
  // ========== GAMEPAD/CONTROLLER POLLING ==========
  pollGamepad() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    
    for (let i = 0; i < gamepads.length; i++) {
      const gp = gamepads[i];
      if (!gp) continue;
      
      // Reset gamepad input
      this.gamepadInput = { left: false, right: false, up: false, down: false, shoot: false, jump: false };
      
      // Left stick / D-pad for movement
      // Axis 0 = left stick horizontal (-1 left, +1 right)
      // Axis 1 = left stick vertical (-1 up, +1 down)
      const deadzone = 0.3;
      
      if (gp.axes[0] < -deadzone) this.gamepadInput.left = true;
      if (gp.axes[0] > deadzone) this.gamepadInput.right = true;
      if (gp.axes[1] < -deadzone) this.gamepadInput.up = true;
      if (gp.axes[1] > deadzone) this.gamepadInput.down = true;
      
      // D-pad buttons (buttons 12-15 on standard gamepad)
      if (gp.buttons[12] && gp.buttons[12].pressed) this.gamepadInput.up = true;
      if (gp.buttons[13] && gp.buttons[13].pressed) this.gamepadInput.down = true;
      if (gp.buttons[14] && gp.buttons[14].pressed) this.gamepadInput.left = true;
      if (gp.buttons[15] && gp.buttons[15].pressed) this.gamepadInput.right = true;
      
      // A button (button 0) = Jump
      if (gp.buttons[0] && gp.buttons[0].pressed) this.gamepadInput.jump = true;
      
      // Right trigger (button 7) or X button (button 2) = Shoot
      if ((gp.buttons[7] && gp.buttons[7].pressed) || (gp.buttons[2] && gp.buttons[2].pressed)) {
        this.gamepadInput.shoot = true;
      }
      
      // B button (button 1) = Crouch/Prone
      if (gp.buttons[1] && gp.buttons[1].pressed) this.gamepadInput.down = true;
      
      // Y button (button 3) = Knife attack
      if (gp.buttons[3] && gp.buttons[3].pressed) {
        this.knifeAttack();
      }
      
      // Left trigger (button 6) = Lightning
      if (gp.buttons[6] && gp.buttons[6].pressed) {
        this.callLightning();
      }
      
      // Bumpers (buttons 4,5) = Tornado
      if (gp.buttons[4] && gp.buttons[4].pressed) {
        this.callTornado();
      }
      
      // Handle shooting with right stick aim (axes 2,3)
      if (this.gamepadInput.shoot && this.hunter) {
        const aimX = gp.axes[2] || 0;
        const aimY = gp.axes[3] || 0;
        const aimDist = Math.sqrt(aimX * aimX + aimY * aimY);
        
        if (aimDist > deadzone) {
          // Aim with right stick
          const targetX = this.hunter.x + aimX * 300;
          const targetY = this.hunter.y + aimY * 300;
          this.handleShoot(targetX, targetY);
        } else {
          // Shoot forward
          const targetX = this.hunter.x + (this.hunter.flipX ? -300 : 300);
          this.handleShoot(targetX, this.hunter.y - 50);
        }
      }
      
      break; // Only use first connected gamepad
    }
  }
  
  // ========== DEVELOPER MODE ==========
  activateDevMode() {
    if (btState.devMode) return; // Already active
    
    btState.devMode = true;
    
    // Grant unlimited resources
    btState.coins = 999999;
    btState.ammo = 999;
    btState.maxAmmo = 999;
    btState.health = 1000;
    btState.maxHealth = 1000;
    btState.bibleAmmo = 999;
    btState.bibleMaxAmmo = 999;
    btState.hasBibleWeapon = true;
    btState.biblesHeld = 999;
    
    // Unlock all upgrades
    btState.upgrades.fireRate = 3;
    btState.upgrades.damage = 3;
    btState.upgrades.armor = 0.5;
    btState.upgrades.ammoCapacity = 100;
    btState.upgrades.coinMultiplier = 5;
    
    // Unlock angel protection
    btState.angelProtectionActive = true;
    btState.angelProtectionLevel = 3;
    btState.angelProtectionTimer = 99999;
    
    // Update localStorage
    localStorage.setItem('birdturds_coins', '999999');
    
    // Show activation message
    this.showNotification('🔧 DEVELOPER MODE ACTIVATED! 🔧', 0xff00ff);
    
    // Create dev mode indicator
    if (!this.devModeIndicator) {
      this.devModeIndicator = this.add.text(10, 10, '🔧 DEV MODE', {
        fontSize: '14px', fontWeight: 'bold', color: '#ff00ff',
        backgroundColor: 'rgba(0,0,0,0.8)', padding: { x: 8, y: 4 }
      }).setScrollFactor(0).setDepth(9999);
    }
    
    // Update UI
    this.updateCoins();
    this.updateAmmo();
    this.updateHealth();
    this.updateBibleCount();
    
    console.log('🔧 DEVELOPER MODE ACTIVATED');
    console.log('- Unlimited coins: 999,999');
    console.log('- Unlimited ammo: 999');
    console.log('- Max health: 1000');
    console.log('- All upgrades maxed');
    console.log('- Divine Angel protection');
    console.log('- Bible weapon unlocked');
  }
  
  setupMobileControls() {
    const self = this;
    const gameCanvas = this.game.canvas;
    
    // Detect if mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    if (!isMobile) {
      console.log('Not mobile, skipping touch controls');
      return;
    }
    
    console.log('Setting up NEW tap/drag mobile controls');
    
    // Show hint briefly then fade
    const hint = document.getElementById('mobile-touch-hint');
    if (hint) {
      hint.style.display = 'block';
      hint.style.opacity = '1';
      setTimeout(() => {
        hint.style.transition = 'opacity 2s';
        hint.style.opacity = '0';
        setTimeout(() => { hint.style.display = 'none'; }, 2000);
      }, 4000);
    }
    
    // TOUCH START - Record position
    gameCanvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      self.touchState.active = true;
      self.touchState.startX = touch.clientX;
      self.touchState.startY = touch.clientY;
      self.touchState.currentX = touch.clientX;
      self.touchState.isDragging = false;
      
      // Immediate shoot on tap - but only once per tap
      if (!self.mobileInput.shoot) {
        self.mobileInput.shoot = true;
        // Auto-reset shoot after one frame to prevent continuous fire
        setTimeout(() => { self.mobileInput.shoot = false; }, 100);
      }
    }, { passive: false });
    
    // TOUCH MOVE - Drag to move character
    gameCanvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!self.touchState.active) return;
      
      const touch = e.touches[0];
      const deltaX = touch.clientX - self.touchState.startX;
      const deltaY = touch.clientY - self.touchState.startY;
      
      self.touchState.currentX = touch.clientX;
      self.touchState.isDragging = true;
      
      // Horizontal movement based on drag direction
      if (Math.abs(deltaX) > self.touchState.moveThreshold) {
        if (deltaX < 0) {
          self.mobileInput.left = true;
          self.mobileInput.right = false;
        } else {
          self.mobileInput.right = true;
          self.mobileInput.left = false;
        }
      } else {
        self.mobileInput.left = false;
        self.mobileInput.right = false;
      }
      
      // Swipe UP to jump
      if (deltaY < -self.touchState.swipeThreshold && !self.mobileInput.jump) {
        self.mobileInput.jump = true;
        // Reset start Y so continued swipe doesn't re-trigger
        self.touchState.startY = touch.clientY;
      }
      
      // Swipe DOWN to crouch
      if (deltaY > self.touchState.swipeThreshold) {
        self.mobileInput.down = true;
      } else {
        self.mobileInput.down = false;
      }
      
    }, { passive: false });
    
    // TOUCH END - Stop everything
    gameCanvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      self.touchState.active = false;
      self.mobileInput.left = false;
      self.mobileInput.right = false;
      self.mobileInput.shoot = false;
      self.mobileInput.jump = false;
      self.mobileInput.down = false;
      self.touchState.isDragging = false;
    }, { passive: false });
    
    // TOUCH CANCEL
    gameCanvas.addEventListener('touchcancel', (e) => {
      self.touchState.active = false;
      self.mobileInput.left = false;
      self.mobileInput.right = false;
      self.mobileInput.shoot = false;
      self.mobileInput.jump = false;
      self.mobileInput.down = false;
    });
    
    console.log('Mobile touch controls ready: tap=shoot, drag=move, swipe up=jump');
    
    console.log('Mobile controls setup complete');
  }
  
  shakeOffTurds() {
    if (this.gameOver || btState.turdCount <= 0) return;
    
    // Shake animation
    this.tweens.add({
      targets: this.hunter,
      x: this.hunter.x - 15,
      duration: 50,
      yoyo: true,
      repeat: 3,
      ease: 'Sine.easeInOut'
    });
    
    // Remove visible turds from hunter
    if (this.hunterTurds && this.hunterTurds.length > 0) {
      this.hunterTurds.forEach(turd => {
        if (turd && turd.active) {
          // Fly off animation
          this.tweens.add({
            targets: turd,
            x: turd.x + Phaser.Math.Between(-100, 100),
            y: turd.y + 100,
            alpha: 0,
            rotation: Math.random() * 4,
            duration: 400,
            onComplete: () => turd.destroy()
          });
        }
      });
      this.hunterTurds = [];
    }
    
    // Reduce meter slightly (not fully, but helps)
    const reduction = Math.min(btState.turdCount * 3, 15);
    btState.turdMeter = Math.max(0, btState.turdMeter - reduction);
    btState.turdCount = 0;
    btState.shakesUsed++;
    
    this.updateHud();
  }
  
  // Helper for mobile auto-aim
  findNearestShootableBird() {
    if (!this.birds || !this.hunter) return null;
    
    let nearest = null;
    let minDist = Infinity;
    
    this.birds.getChildren().forEach(bird => {
      if (!bird || !bird.active || bird.isFriendly) return;
      
      const dist = Phaser.Math.Distance.Between(this.hunter.x, this.hunter.y, bird.x, bird.y);
      if (dist < minDist && dist < 800) { // Only within 800px
        minDist = dist;
        nearest = bird;
      }
    });
    
    return nearest;
  }

  shakeComplete() {
    // Show funny message
    const shakeMessages = ['Eww!', 'Gross!', 'Splat!', 'Nasty!', 'Yuck!'];
    const msg = shakeMessages[Math.floor(Math.random() * shakeMessages.length)];
    this.showNotification(msg);
  }

  setupHUD() {
    this.hudElements = {
      score: document.getElementById('hud-score'),
      healthFill: document.getElementById('hud-health-fill'),
      turdFill: document.getElementById('hud-turd-fill'),
      ammoFill: document.getElementById('hud-ammo-fill'),
      ammoText: document.getElementById('hud-ammo-text'),
      coins: document.getElementById('hud-coins'),
      weapon: document.getElementById('hud-weapon'),
      kills: document.getElementById('hud-kills'),
      accuracy: document.getElementById('hud-accuracy'),
      level: document.getElementById('hud-level'),
      levelFill: document.getElementById('hud-level-fill'),
      birdsLeft: document.getElementById('hud-birds-left')
    };
    
    // Initialize level state - Level 0 for Christmas, Level 1 otherwise
    const startLevel = isChristmasSeason() ? 0 : 1;
    btState.currentLevel = startLevel;
    btState.birdsKilledThisLevel = 0;
    btState.birdsNeededThisLevel = LEVEL_CONFIG[startLevel].birdsToKill;
    btState.levelComplete = false;
    btState.gameWon = false;
    
    // Music is started by initSoundSystem() - user must click first due to browser policy
    console.log('🎮 Game ready - click/tap to enable audio');
  }

  loadPlayerData() {
    try {
      const saved = localStorage.getItem('birdturds_coins');
      if (saved) btState.coins = parseInt(saved) || 0;
      
      // Load daily coin tracking
      const dailyData = localStorage.getItem('birdturds_daily');
      if (dailyData) {
        const data = JSON.parse(dailyData);
        const today = new Date().toDateString();
        if (data.date === today) {
          btState.coinsEarnedToday = data.earned || 0;
          btState.lastCoinDate = today;
        } else {
          // New day - reset
          btState.coinsEarnedToday = 0;
          btState.lastCoinDate = today;
        }
      }
    } catch(e) {}
    this.updateHud();
  }

  savePlayerData() {
    try { 
      localStorage.setItem('birdturds_coins', btState.coins.toString());
      
      // Save daily tracking
      localStorage.setItem('birdturds_daily', JSON.stringify({
        date: btState.lastCoinDate || new Date().toDateString(),
        earned: btState.coinsEarnedToday
      }));
    } catch(e) {}
  }

  update(time, delta) {
    if (this.gameOver || this.paused) return;
    
    // Safety check - ensure hunter exists
    if (!this.hunter || !this.hunter.active) return;
    if (!this.hunter.body) return;
    
    const dt = delta / 1000;
    
    // Update bot and sniper systems
    if (window.GameIntegration) {
      GameIntegration.updateScene(this, delta, this.hunter, this.birds);
    }
    
    // Sync coin display with localStorage every 60 frames (~1 second)
    if (!this.coinSyncCounter) this.coinSyncCounter = 0;
    this.coinSyncCounter++;
    if (this.coinSyncCounter >= 60) {
      this.coinSyncCounter = 0;
      this.updateCoinDisplay();
    }
    
    // Update shield position if active
    if (this.shieldActive && this.shieldSprite && this.hunter) {
      this.shieldSprite.setPosition(this.hunter.x, this.hunter.y);
    }
    
    // ========== GAMEPAD INPUT POLLING ==========
    try { this.pollGamepad(); } catch(e) { /* Gamepad not available */ }
    
    try {
      const slowFactor = btState.slowMotion ? 0.5 : 1;
      const adjustedDt = dt * slowFactor;
      
      // Wrap each update in its own try-catch to prevent cascading failures
      try { this.updateCurrentScene(); } catch(e) { console.warn('Scene update error:', e); }
      try { this.handleHunterMovement(dt); } catch(e) { console.warn('Movement error:', e); }
      try { this.animateHunter(dt); } catch(e) { console.warn('Animate error:', e); }
      try { this.handleSpawning(adjustedDt); } catch(e) { console.warn('Spawn error:', e); }
      try { this.handlePanelsLoop(); } catch(e) { console.warn('Panels error:', e); }
      try { this.updateBirds(adjustedDt, time); } catch(e) { console.warn('Birds error:', e); }
      try { this.updateTurds(); } catch(e) { console.warn('Turds error:', e); }
      try { this.updateBullets(); } catch(e) { console.warn('Bullets error:', e); }
      try { this.updateVehicles(adjustedDt); } catch(e) { console.warn('Vehicles error:', e); }
      try { this.updatePlanes(adjustedDt); } catch(e) { console.warn('Planes error:', e); }
      try { if (window.SpriteAnimationSystem) window.SpriteAnimationSystem.update(this, adjustedDt); } catch(e) { console.warn('SpriteAnim error:', e); }
      try { if (window.PerformanceSystem) window.PerformanceSystem.update(this, adjustedDt); } catch(e) { console.warn('Perf error:', e); }
      try { this.updateAnimals(adjustedDt); } catch(e) { console.warn('Animals error:', e); }
      try { this.updateNPCs(adjustedDt); } catch(e) { console.warn('NPCs error:', e); }
      try { this.updateTrump(adjustedDt); } catch(e) { console.warn('Trump error:', e); }
      try { this.updateItems(time); } catch(e) { console.warn('Items error:', e); }
      try { this.updateCoins(time); } catch(e) { console.warn('Coins error:', e); }
      try { this.updateParachuters(adjustedDt); } catch(e) { console.warn('Parachuters error:', e); }
      try { this.updateAmmoBoxes(); } catch(e) { console.warn('Ammo boxes error:', e); }
      try { this.updateStorm(adjustedDt); } catch(e) { console.warn('Storm error:', e); }
      try { this.updateBombs(); } catch(e) { console.warn('Bombs error:', e); }
      try { this.updateBots(adjustedDt); } catch(e) { console.warn('Bots error:', e); }
      try { this.checkLowAmmo(); } catch(e) { console.warn('Ammo check error:', e); }
      try { this.cleanupOffscreen(); } catch(e) { console.warn('Cleanup error:', e); }
      try { this.updateHud(); } catch(e) { console.warn('HUD error:', e); }
      // ========== NEW SYSTEMS ==========
      try { this.updateDemons(adjustedDt); } catch(e) { console.warn('Demons error:', e); }
      try { this.updateAngelProtection(adjustedDt); } catch(e) { console.warn('Angel error:', e); }
      try { this.updateSkyClarity(); } catch(e) { console.warn('Sky error:', e); }
      try { this.updateVillains(adjustedDt); } catch(e) { console.warn('Villains error:', e); }
      // ========== DEBUG OVERLAY (F3) ==========
      try { this.updateDebugOverlay(dt); } catch(e) { console.warn('Debug overlay error:', e); }
      // ========== WEAPON SPRITE - REMOVED (integrated into hunter animations) ==========
      // try { this.updateWeaponSprite(); } catch(e) { console.warn('Weapon update error:', e); }
      // ========== JETPACK SYSTEM ==========
      try { this.updateJetpack(adjustedDt); } catch(e) { /* Jetpack update error */ }
    } catch(e) {
      console.error('Update error:', e);
    }
    
    // ========== HUNTER SAFETY CHECK (Enhanced per Copilot review) ==========
    // Robust validation to prevent hunter from vanishing
    if (this.hunter) {
      // Check for NaN or Infinity positions - reset to safe spawn
      if (!isFinite(this.hunter.x) || !isFinite(this.hunter.y) || isNaN(this.hunter.x) || isNaN(this.hunter.y)) {
        console.warn('Hunter position invalid, resetting');
        this.hunter.setPosition(this.cameras.main.worldView.x + 400, this.groundY);
        if (this.hunter.body) this.hunter.setVelocity(0, 0);
      }
      
      // If no physics body or body disabled -> re-enable
      if (!this.hunter.body || this.hunter.body.enable === false) {
        try {
          this.physics.world.enable(this.hunter);
          this.hunter.body.setAllowGravity(true);
        } catch(e) { console.warn('Failed to re-enable hunter physics:', e); }
      }
      
      // Reset alpha if somehow invisible
      if (this.hunter.alpha < 0.5 || this.hunter.alpha === 0) {
        this.hunter.setAlpha(1);
      }
      
      // Ensure hunter is visible (not scaled to 0)
      if (this.hunter.scaleX === 0 || this.hunter.scaleY === 0 || this.hunter.scaleX < 0.1 || this.hunter.scaleY < 0.1) {
        this.hunter.setScale(0.24);
      }
      
      // Reset if below ground or too high (fell through floor or launched to sky)
      if (this.hunter.y > this.groundY + 50) {
        this.hunter.y = this.groundY;
        if (this.hunter.body) this.hunter.setVelocityY(0);
      }
      if (this.hunter.y < -800) {
        this.hunter.y = this.groundY;
        if (this.hunter.body) this.hunter.setVelocity(0, 0);
      }
      
      // Reset if off screen horizontally
      const view = this.cameras.main.worldView;
      if (this.hunter.x < view.x - 100) {
        this.hunter.x = view.x + 100;
      }
      if (this.hunter.x > view.right + 100) {
        this.hunter.x = view.right - 100;
      }
      
      // Check hunterBeingCarried flag - if carrier no longer exists, release
      if (this.hunterBeingCarried) {
        const carrier = this.birds ? this.birds.getChildren().find(b => b && b.active && b.isCarrying) : null;
        if (!carrier) {
          console.warn('Hunter carrier lost, releasing hunter');
          this.hunterBeingCarried = false;
          this.hunter.y = this.groundY;
          if (this.hunter.body) {
            this.hunter.body.enable = true;
            this.hunter.setVelocity(0, 0);
          }
        }
      }
    }
    
    if (this.fireRateCooldown > 0) this.fireRateCooldown -= dt;
    if (this.knifeCooldown > 0) this.knifeCooldown -= dt;
    if (this.windCooldown > 0) this.windCooldown -= dt;
    
    // Check for Angel menu key (A key)
    if (this.keys.A && Phaser.Input.Keyboard.JustDown(this.keys.A)) {
      this.showAngelMenu();
    }
    
    // Check for Bible weapon key (B key)
    if (this.keys.B && Phaser.Input.Keyboard.JustDown(this.keys.B)) {
      this.fireBibleWeapon();
    }
    
    // Update Bible bullets
    this.updateBibleBullets();
  }
  
  updateBibleBullets() {
    if (!this.bibleBullets) return;
    
    this.bibleBullets = this.bibleBullets.filter(bible => {
      if (!bible || !bible.active) return false;
      
      // Check if hit demon
      if (this.demons) {
        let hitDemon = false;
        this.demons.getChildren().forEach(demon => {
          if (!demon || !demon.active || hitDemon) return;
          
          const dist = Phaser.Math.Distance.Between(bible.x, bible.y, demon.x, demon.y);
          if (dist < 50) {
            // BIBLE HIT DEMON! Massive damage!
            demon.health -= bible.damage;
            hitDemon = true;
            
            // Show scripture explosion
            this.showPointIndicator(demon.x, demon.y, `📖 ${bible.scriptureRef}!`, 0xffd700);
            
            // Holy light effect
            for (let i = 0; i < 8; i++) {
              const angle = (i / 8) * Math.PI * 2;
              const spark = this.add.text(demon.x, demon.y, '✝️', { fontSize: '16px' })
                .setOrigin(0.5).setDepth(20);
              this.tweens.add({
                targets: spark,
                x: demon.x + Math.cos(angle) * 60,
                y: demon.y + Math.sin(angle) * 60,
                alpha: 0, scale: 0.5,
                duration: 500,
                onComplete: () => spark.destroy()
              });
            }
            
            // Check if demon killed
            if (demon.health <= 0) {
              this.onDemonKilled(demon);
            }
            
            bible.destroy();
          }
        });
        if (hitDemon) return false;
      }
      
      // Check if hit lies (destroy them instantly!)
      if (this.demonLies) {
        let hitLie = false;
        this.demonLies.getChildren().forEach(lie => {
          if (!lie || !lie.active || hitLie) return;
          
          const dist = Phaser.Math.Distance.Between(bible.x, bible.y, lie.x, lie.y);
          if (dist < 40) {
            btState.score += 50;
            this.showPointIndicator(lie.x, lie.y, '+50 TRUTH DESTROYS LIES!', 0xffd700);
            lie.destroy();
            hitLie = true;
          }
        });
      }
      
      // Remove if off screen
      const view = this.cameras.main.worldView;
      if (bible.x < view.x - 100 || bible.x > view.right + 100 || 
          bible.y < -100 || bible.y > GAME_HEIGHT + 100) {
        bible.destroy();
        return false;
      }
      
      return true;
    });
  }
  
  onDemonKilled(demon) {
    // Demon defeated by the power of God's Word!
    btState.score += DEMON_CONFIG.score;
    btState.kills++;
    
    // Drop coins
    for (let i = 0; i < DEMON_CONFIG.coinDrop; i++) {
      this.time.delayedCall(i * 50, () => {
        this.spawnCoinDrop(demon.x + Phaser.Math.Between(-30, 30), demon.y + Phaser.Math.Between(-30, 30), 1);
      });
    }
    
    this.showPointIndicator(demon.x, demon.y, `+${DEMON_CONFIG.score} DEMON VANQUISHED!`, 0xffd700);
    this.showNotification('✝️ THE WORD OF GOD PREVAILS! ✝️', 0xffd700);
    
    // Show victory scripture about God's power
    this.showVictoryScripture();
    
    // Epic holy light explosion
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const dist = 40 + Math.random() * 60;
      const isGold = Math.random() > 0.4;
      const particle = this.add.circle(
        demon.x, demon.y, 
        isGold ? 8 : 5, 
        isGold ? 0xffd700 : 0xffffff
      ).setDepth(15).setAlpha(1);
      
      this.tweens.add({
        targets: particle,
        x: demon.x + Math.cos(angle) * dist,
        y: demon.y + Math.sin(angle) * dist,
        alpha: 0, scale: 0.2,
        duration: 800,
        onComplete: () => particle.destroy()
      });
    }
    
    // Cross ascends to heaven
    const cross = this.add.text(demon.x, demon.y, '✝️', { fontSize: '50px' })
      .setOrigin(0.5).setDepth(16);
    this.tweens.add({
      targets: cross,
      y: demon.y - 150,
      alpha: 0,
      scale: 2,
      duration: 1500,
      ease: 'Sine.easeOut',
      onComplete: () => cross.destroy()
    });
    
    demon.destroy();
  }
  
  // ========== SKY CLARITY SYSTEM ==========
  // As birds are killed, skies become clearer
  updateSkyClarity() {
    if (!btState.currentLevel) return;
    
    const config = LEVEL_CONFIG[btState.currentLevel];
    if (!config) return;
    
    // Calculate clarity based on birds killed this level
    const progress = btState.birdsKilledThisLevel / config.birdsToKill;
    this.skyClarity = Math.min(1, progress);
    
    // Update sky visual
    if (this.skyOverlay) {
      // Reduce cloud opacity as clarity increases
      this.skyOverlay.setAlpha(0.3 * (1 - this.skyClarity));
    }
    
    // Create sun rays effect at high clarity
    if (this.skyClarity > 0.8 && !this.sunRaysActive) {
      this.createSunRays();
      this.sunRaysActive = true;
    }
  }
  
  createSunRays() {
    // Create beautiful sun ray effect
    const rays = [];
    for (let i = 0; i < 5; i++) {
      const ray = this.add.rectangle(
        GAME_WIDTH/2 + (i - 2) * 100,
        -50,
        20,
        GAME_HEIGHT + 100,
        0xffd700,
        0.1
      ).setScrollFactor(0).setDepth(3).setRotation(0.1 * (i - 2));
      
      this.tweens.add({
        targets: ray,
        alpha: { from: 0.05, to: 0.15 },
        duration: 2000,
        yoyo: true,
        repeat: -1,
        delay: i * 200
      });
      
      rays.push(ray);
    }
    this.sunRays = rays;
  }

  updateCurrentScene() {
    const hx = this.hunter.x;
    let wasInPark = this.inProtectedPark;
    let wasInWhiteHouse = this.inWhiteHouse;
    let newSceneData = null;
    let newSceneIndex = this.currentSceneIndex;
    
    this.bgPanels.getChildren().forEach(p => {
      if (p && hx >= p.x && hx < p.x + this.panelWidth) {
        newSceneData = p.sceneData;
        newSceneIndex = p.sceneIndex;
      }
    });
    
    if (newSceneData) {
      // Check if we've entered a NEW scene
      const sceneChanged = newSceneIndex !== this.lastSceneIndex;
      
      if (sceneChanged) {
        // Clean up swamp message if leaving swamp
        if (this.lastSceneKey === 'swamp') {
          if (this.swampMessage) { this.swampMessage.destroy(); this.swampMessage = null; }
          if (this.swampMessageBg) { this.swampMessageBg.destroy(); this.swampMessageBg = null; }
        }
        
        this.currentScene = newSceneData;
        this.currentSceneIndex = newSceneIndex;
        
        // Trigger the scene transition effect!
        this.triggerSceneTransition(newSceneData);
        
        // Update ground colors to match new scene's Ludo landscape
        this.updateGroundForScene(newSceneData);
        
        this.lastSceneIndex = newSceneIndex;
        this.lastSceneKey = newSceneData.key;
      }
      
      // Check for protected park
      this.inProtectedPark = newSceneData && newSceneData.isProtectedPark;
      
      // Check for White House scene
      this.inWhiteHouse = newSceneData && newSceneData.isWhiteHouse;
    }
    
    // Entering protected park warning
    if (this.inProtectedPark && !wasInPark) {
      this.showNotification('🏞️ ENTERING WILDLIFE SANCTUARY - NO HUNTING!');
      this.showParkOverlay();
    }
    
    // Leaving protected park
    if (!this.inProtectedPark && wasInPark) {
      this.showNotification('🎯 Back in hunting zone! Fire away!');
      this.hideParkOverlay();
    }
    
    // Entering White House - SPAWN TRUMP!
    if (this.inWhiteHouse && !wasInWhiteHouse) {
      this.showNotification('🇺🇸 WELCOME TO WASHINGTON D.C.! PROTECT THE PRESIDENT!', 0xffd700);
      this.time.delayedCall(1500, () => {
        this.spawnTrump();
      });
    }
    
    // Leaving White House - cleanup Trump
    if (!this.inWhiteHouse && wasInWhiteHouse) {
      this.cleanupTrump();
    }
  }
  
  // NEW: Smooth scene transition with visual effects
  triggerSceneTransition(sceneData) {
    if (!sceneData) return;
    
    // Clear snowflakes when leaving Christmas scene
    if (this.snowflakes && this.currentScene && this.currentScene.isChristmas && !sceneData.isChristmas) {
      this.snowflakes.clear(true, true);
      console.log('❄️ Cleared snowflakes - leaving Christmas scene');
    }
    
    // 1. Show scene name banner with animation
    const sceneName = sceneData.name || sceneData.key.toUpperCase();
    if (this.sceneBanner) {
      this.sceneBanner.setText(sceneName);
      this.sceneBanner.setAlpha(0);
      this.sceneBanner.setScale(0.5);
      
      // Animate banner in
      this.tweens.add({
        targets: this.sceneBanner,
        alpha: 1,
        scale: 1,
        duration: 400,
        ease: 'Back.easeOut',
        onComplete: () => {
          // Hold for a moment, then fade out
          this.time.delayedCall(1500, () => {
            this.tweens.add({
              targets: this.sceneBanner,
              alpha: 0,
              scale: 0.8,
              duration: 500,
              ease: 'Power2'
            });
          });
        }
      });
    }
    
    // ========== SPECIAL SWAMP MESSAGE - STAYS VISIBLE! ==========
    if (sceneData.key === 'swamp' || sceneData.isSwamp) {
      this.showSwampMessage();
    }
    
    // 2. Show flavor text subtitle
    const messages = sceneTransitionMessages[sceneData.key];
    if (messages && this.sceneSubtitle) {
      const flavorText = messages[Math.floor(Math.random() * messages.length)];
      this.sceneSubtitle.setText(flavorText);
      this.sceneSubtitle.setAlpha(0);
      
      this.tweens.add({
        targets: this.sceneSubtitle,
        alpha: 1,
        duration: 600,
        delay: 200,
        onComplete: () => {
          this.time.delayedCall(1800, () => {
            this.tweens.add({
              targets: this.sceneSubtitle,
              alpha: 0,
              duration: 400
            });
          });
        }
      });
    }
    
    // 3. Smooth sky color transition
    if (sceneData.skyColor && this.sky) {
      this.transitionSkyColor(sceneData.skyColor);
    }
    
    // 4. Apply ambient tint for atmosphere
    if (sceneData.ambientTint && this.ambientOverlay) {
      this.applyAmbientTint(sceneData);
    }
    
    // 5. Special effects for hazardous/night scenes
    if (sceneData.hazard) {
      this.triggerHazardWarning();
    }
    if (sceneData.night) {
      this.triggerNightMode();
    }
    
    // 6. Play scene transition sound
    this.playSound('transition');
  }
  
  // ========== SWAMP SPECIAL MESSAGE ==========
  showSwampMessage() {
    // Remove any existing swamp message
    if (this.swampMessage) {
      this.swampMessage.destroy();
    }
    if (this.swampMessageBg) {
      this.swampMessageBg.destroy();
    }
    
    // Create dramatic "DRAIN THE SWAMP" message that stays visible
    const messageText = "LET'S DRAIN THE SWAMP OF THESE TURDS!";
    
    // Background bar
    this.swampMessageBg = this.add.rectangle(GAME_WIDTH / 2, 150, 700, 60, 0x000000, 0.8)
      .setScrollFactor(0)
      .setDepth(500)
      .setStrokeStyle(3, 0xff0000);
    
    // Main message text
    this.swampMessage = this.add.text(GAME_WIDTH / 2, 150, messageText, {
      fontSize: '28px',
      fontStyle: 'bold',
      fontFamily: 'Impact, Arial Black, sans-serif',
      color: '#ff0000',
      stroke: '#ffff00',
      strokeThickness: 4,
      shadow: { offsetX: 3, offsetY: 3, color: '#000000', blur: 5, fill: true }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(501);
    
    // Pulsing animation
    this.tweens.add({
      targets: [this.swampMessage, this.swampMessageBg],
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // Also show notification
    this.showNotification('🐊 DRAIN THE SWAMP! Arrest the globalists!', 0xff0000);
  }
  
  // Smoothly interpolate sky color
  transitionSkyColor(targetColor) {
    // Convert hex to RGB components
    const fromR = (this.currentSkyColor >> 16) & 0xff;
    const fromG = (this.currentSkyColor >> 8) & 0xff;
    const fromB = this.currentSkyColor & 0xff;
    
    const toR = (targetColor >> 16) & 0xff;
    const toG = (targetColor >> 8) & 0xff;
    const toB = targetColor & 0xff;
    
    // Tween the sky color
    const colorObj = { r: fromR, g: fromG, b: fromB };
    this.tweens.add({
      targets: colorObj,
      r: toR,
      g: toG,
      b: toB,
      duration: 1000,
      ease: 'Sine.easeInOut',
      onUpdate: () => {
        const newColor = (Math.round(colorObj.r) << 16) | (Math.round(colorObj.g) << 8) | Math.round(colorObj.b);
        this.sky.setFillStyle(newColor);
        this.currentSkyColor = newColor;
      }
    });
  }
  
  // Apply ambient tint overlay for different atmospheres
  applyAmbientTint(sceneData) {
    if (!this.ambientOverlay) return;
    
    // Night scenes get darker overlay
    if (sceneData.night) {
      this.ambientOverlay.setFillStyle(0x1a1a3e);
      this.tweens.add({
        targets: this.ambientOverlay,
        alpha: 0.4,
        duration: 1500,
        ease: 'Sine.easeInOut'
      });
    }
    // Hazard scenes get red tint
    else if (sceneData.hazard) {
      this.ambientOverlay.setFillStyle(0xff4444);
      this.tweens.add({
        targets: this.ambientOverlay,
        alpha: 0.15,
        duration: 800,
        ease: 'Sine.easeInOut'
      });
    }
    // Normal scenes fade out any overlay
    else {
      this.tweens.add({
        targets: this.ambientOverlay,
        alpha: 0,
        duration: 1000,
        ease: 'Sine.easeInOut'
      });
    }
  }
  
  // Warning effect for hazardous zones
  triggerHazardWarning() {
    this.showNotification('⚠️ DANGER ZONE! Increased hazards ahead!');
    
    // Flash the screen red briefly
    if (this.transitionOverlay) {
      this.transitionOverlay.setFillStyle(0xff0000);
      this.transitionOverlay.setAlpha(0.3);
      this.tweens.add({
        targets: this.transitionOverlay,
        alpha: 0,
        duration: 500,
        yoyo: true,
        repeat: 2
      });
    }
  }
  
  // Night mode visual effect
  triggerNightMode() {
    this.showNotification('🌙 Night falls... stay sharp!');
  }
  
  showParkOverlay() {
    if (this.parkBanner) this.parkBanner.destroy();
    this.parkBanner = this.add.text(
      this.cameras.main.worldView.centerX,
      100,
      '🏞️ NO HUNTING ZONE 🚫',
      { fontSize: '24px', fontStyle: 'bold', color: '#ff0000', backgroundColor: '#000000aa', padding: { x: 20, y: 10 } }
    ).setOrigin(0.5).setScrollFactor(0).setDepth(200);
  }
  
  hideParkOverlay() {
    if (this.parkBanner) {
      this.tweens.add({
        targets: this.parkBanner,
        alpha: 0,
        duration: 500,
        onComplete: () => { if (this.parkBanner) this.parkBanner.destroy(); }
      });
    }
  }

  handleHunterMovement(dt) {
    // Safety check - ensure hunter and body exist
    if (!this.hunter || !this.hunter.body) return;
    
    const baseSpeed = this.isProne ? 30 : (this.isCrouching ? 100 : 250);
    const runSpeed = 350; // Faster for running
    const crouchPressed = this.keys.S.isDown || this.keys.C.isDown || this.keys.SHIFT.isDown || (this.mobileInput && this.mobileInput.down) || (this.gamepadInput && this.gamepadInput.down);
    const pronePressed = this.keys.Z && this.keys.Z.isDown; // Z = lay down (prone)
    const runPressed = this.keys.SHIFT && this.keys.SHIFT.isDown;
    
    // PRONE - lay flat on ground (best for dodging diving bosses!)
    if (pronePressed && this.isOnGround() && !this.isProne) {
      this.isProne = true;
      this.isCrouching = false;
      this.hunter.setScale(HUNTER_SCALE, HUNTER_SCALE * 0.25); // Very flat!
      this.hunter.y = this.groundY + 15; // Lower to ground
      this.showNotification('🛡️ PRONE! Very low profile!');
    } else if (!pronePressed && this.isProne) {
      this.isProne = false;
      this.hunter.setScale(HUNTER_SCALE);
      this.hunter.y = this.groundY;
    }
    // CROUCH - duck under turds
    else if (crouchPressed && !this.isCrouching && !this.isProne && this.isOnGround() && !runPressed) {
      this.isCrouching = true;
      this.hunter.setScale(HUNTER_SCALE, HUNTER_SCALE * 0.65);
    } else if (!crouchPressed && this.isCrouching && !this.isProne) {
      this.isCrouching = false;
      this.hunter.setScale(HUNTER_SCALE);
    }
    
    // MOVEMENT - keyboard OR mobile OR gamepad
    let vx = 0;
    const moveLeft = this.cursors.left.isDown || this.keys.A.isDown || (this.mobileInput && this.mobileInput.left) || (this.gamepadInput && this.gamepadInput.left);
    const moveRight = this.cursors.right.isDown || this.keys.D.isDown || (this.mobileInput && this.mobileInput.right) || (this.gamepadInput && this.gamepadInput.right);
    const isRunning = runPressed && (moveLeft || moveRight);
    
    if (moveLeft) {
      vx = isRunning ? -runSpeed : -baseSpeed;
      this.lastDirection = -1;
    } else if (moveRight) {
      vx = isRunning ? runSpeed : baseSpeed;
      this.lastDirection = 1;
    }
    this.hunter.body.setVelocityX(vx);
    
    // JUMP - keyboard OR mobile OR gamepad
    const jumpPressed = this.cursors.up.isDown || this.keys.W.isDown || (this.mobileInput && this.mobileInput.jump) || (this.gamepadInput && this.gamepadInput.jump);
    if (jumpPressed && this.isOnGround() && !this.isProne) {
      this.hunter.body.setVelocityY(-420);
      this.playSound('jump');
    }
    
    // ========== ANIMATION STATE MACHINE ==========
    const onGround = this.isOnGround();
    
    if (!onGround) {
      // In air - play jump animation
      this.playHunterAnim(ANIM_JUMP);
    } else if (this.isShooting) {
      // Shooting animation (set by handleShoot)
      this.playHunterAnim(ANIM_SHOOT);
    } else if (isRunning) {
      // Running
      this.playHunterAnim(ANIM_RUN);
    } else if (vx !== 0) {
      // Walking
      this.playHunterAnim(ANIM_WALK);
    } else {
      // Standing still
      this.playHunterAnim(ANIM_IDLE);
    }
    
    // MOBILE SHOOT
    if (this.mobileInput && this.mobileInput.shoot && this.fireRateCooldown <= 0) {
      // Shoot toward nearest bird or straight up
      const nearestBird = this.findNearestShootableBird();
      const targetX = nearestBird ? nearestBird.x : this.hunter.x + (this.lastDirection * 200);
      const targetY = nearestBird ? nearestBird.y : this.hunter.y - 300;
      this.handleShoot(targetX, targetY);
    }
    
    // Track if in air
    this.isInAir = !onGround;
    
    // Ground collision
    if (this.hunter.y > this.groundY) {
      this.hunter.y = this.groundY;
      if (this.hunter.body.velocity.y > 0) this.hunter.body.setVelocityY(0);
      this.isJumping = false;
    }
    
    // LEVEL ZONE LOCKING - Player can't advance until level complete
    const levelZoneWidth = this.panelWidth || 1344;
    const currentLevelIndex = btState.currentLevel - (isChristmasSeason() ? 0 : 1); // Adjust for Christmas
    const levelLeftBound = Math.max(50, currentLevelIndex * levelZoneWidth);
    const levelRightBound = (currentLevelIndex + 1) * levelZoneWidth - 50;
    
    // Left boundary - can't go backwards past start of current level
    if (this.hunter.x < levelLeftBound) {
      this.hunter.x = levelLeftBound;
      if (this.hunter.body) this.hunter.body.setVelocityX(0);
    }
    
    // Right boundary - blocked until level complete
    if (this.hunter.x > levelRightBound) {
      if (btState.levelComplete) {
        // Level complete - advance to next level!
        this.advanceToNextLevel();
        // Teleport player to start of next level zone
        this.hunter.x = (currentLevelIndex + 1) * levelZoneWidth + 100;
      } else {
        // Not complete - block and show message
        this.hunter.x = levelRightBound;
        if (this.hunter.body) this.hunter.body.setVelocityX(0);
        
        // Show reminder (throttled to once per 3 seconds)
        if (!this.lastBoundaryWarning || Date.now() - this.lastBoundaryWarning > 3000) {
          const config = LEVEL_CONFIG[btState.currentLevel];
          if (config && config.birdsToKill > 0) {
            const remaining = config.birdsToKill - btState.birdsKilledThisLevel;
            this.showNotification(`🚧 Kill ${remaining} more birds to advance! 🚧`, 0xffd700);
          }
          this.lastBoundaryWarning = Date.now();
        }
      }
    }
    
    // HUNTER FACING AND AIMING
    // FlipX controls left/right facing
    const ptr = this.input.activePointer;
    let aimX, aimY;
    
    if (ptr && ptr.worldX !== undefined) {
      aimX = ptr.worldX;
      aimY = ptr.worldY;
    } else {
      // Default aim: forward and up
      aimX = this.hunter.x + (this.lastDirection * 200);
      aimY = this.hunter.y - 200;
    }
    
    // Calculate direction to target
    const aimDx = aimX - this.hunter.x;
    const aimDy = aimY - this.hunter.y;
    
    // TURN/SPIN: Flip sprite based on movement or aim direction
    // Hunter turns to face the direction they're moving or aiming
    if (vx !== 0) {
      // Moving - face movement direction
      this.hunter.flipX = vx < 0;
    } else if (Math.abs(aimDx) > 30) {
      // Standing still - face aim direction
      this.hunter.flipX = aimDx < 0;
    }
    
    // GUN AIM ROTATION: Tilt hunter to point gun UP at birds
    // Since sprite has gun raised, we tilt the whole sprite
    // aimDy negative = aiming up (birds are above hunter)
    
    let tiltAngle = 0;
    
    if (aimDy < 0) {
      // Aiming UP at birds - tilt back to point gun higher
      const upRatio = Math.min(1, Math.abs(aimDy) / 350);
      tiltAngle = -upRatio * 0.35; // Max ~20 degrees backward
    } else {
      // Aiming down or level
      const downRatio = Math.min(1, aimDy / 200);
      tiltAngle = downRatio * 0.1;
    }
    
    // Flip tilt direction when facing left
    if (this.hunter.flipX) {
      tiltAngle = -tiltAngle;
    }
    
    // Smooth rotation transition
    const currentRot = this.hunter.rotation || 0;
    this.hunter.setRotation(currentRot + (tiltAngle - currentRot) * 0.2);
    
    // Sync armor overlay
    if (this.hunterArmor) {
      this.hunterArmor.setPosition(this.hunter.x, this.hunter.y);
      this.hunterArmor.setScale(this.hunter.scaleX, this.hunter.scaleY);
      this.hunterArmor.setFlipX(this.hunter.flipX);
      this.hunterArmor.setRotation(this.hunter.rotation);
    }
    
    // Sync hunter shadow position (stays on ground, shrinks when jumping)
    if (this.hunterShadow) {
      this.hunterShadow.setPosition(this.hunter.x, this.groundY + 5);
      // Shadow gets smaller and more transparent when hunter is in air
      const airHeight = Math.max(0, this.groundY - this.hunter.y);
      const shadowScale = Math.max(0.3, 1 - (airHeight / 200));
      const shadowAlpha = Math.max(0.1, 0.3 - (airHeight / 500));
      this.hunterShadow.setScale(shadowScale, shadowScale * 0.5);
      this.hunterShadow.setAlpha(shadowAlpha);
    }
    
    // Sync multiplayer name label position
    if (this.hunterNameLabel) {
      this.hunterNameLabel.setPosition(this.hunter.x, this.hunter.y - 100);
    }
    
    // MOBILE SHOOT
    if (this.mobileInput && this.mobileInput.shoot && this.fireRateCooldown <= 0) {
      const nearestBird = this.findNearestShootableBird();
      const targetX = nearestBird ? nearestBird.x : this.hunter.x + (this.lastDirection * 200);
      const targetY = nearestBird ? nearestBird.y : this.hunter.y - 300;
      this.handleShoot(targetX, targetY);
    }
    
    // Shoot with spacebar (works in air too!)
    if (this.keys.SPACE.isDown && this.fireRateCooldown <= 0) {
      this.handleShoot(aimX, aimY);
    }
  }
  
  isOnGround() {
    return this.hunter.body.blocked.down || Math.abs(this.hunter.y - this.groundY) < 5;
  }
  
  // KNIFE ATTACK - Kill birds in melee range while jumping!
  knifeAttack() {
    if (this.gameOver || this.knifeCooldown > 0) return;
    
    this.knifeCooldown = 0.4; // Cooldown between knife attacks
    
    // Visual knife slash effect
    const slashX = this.hunter.x + (this.hunter.flipX ? -40 : 40);
    const slashY = this.hunter.y - 20;
    
    const slash = this.add.text(slashX, slashY, '🔪', { fontSize: '32px' })
      .setDepth(100)
      .setRotation(this.hunter.flipX ? -0.5 : 0.5);
    
    this.tweens.add({
      targets: slash,
      x: slashX + (this.hunter.flipX ? -60 : 60),
      y: slashY - 30,
      rotation: this.hunter.flipX ? -2 : 2,
      alpha: 0,
      scale: 1.5,
      duration: 250,
      onComplete: () => slash.destroy()
    });
    
    // Check for birds in knife range
    const knifeRange = 80;
    let knifeKills = 0;
    
    this.birds.getChildren().forEach(bird => {
      if (!bird || !bird.active) return;
      const dist = Phaser.Math.Distance.Between(this.hunter.x, this.hunter.y, bird.x, bird.y);
      
      if (dist < knifeRange) {
        const species = speciesConfig[bird.species];
        if (!species) return;
        
        if (species.shootable) {
          // Kill the bird with knife!
          const points = Math.round(species.score * 1.5); // 50% bonus for knife kills!
          btState.score += points;
          btState.kills++;
          knifeKills++;
          
          // Level progression tracking
          this.onBirdKilled();
          
          // Coin drop
          if (species.coinDrop > 0) {
            this.spawnCoinDrop(bird.x, bird.y, species.coinDrop);
          }
          
          // Death effect
          this.showPointIndicator(bird.x, bird.y, `+${points} 🔪 SLICED!`, 0xef4444);
          
          // Blood splatter
          for (let i = 0; i < 5; i++) {
            const splat = this.add.circle(bird.x, bird.y, 3, 0xff0000).setDepth(15);
            this.tweens.add({
              targets: splat,
              x: bird.x + Phaser.Math.Between(-40, 40),
              y: bird.y + Phaser.Math.Between(-40, 40),
              alpha: 0,
              duration: 300,
              onComplete: () => splat.destroy()
            });
          }
          
          bird.destroy();
        } else {
          // Hit a protected bird with knife - penalty!
          btState.score += species.score; // Negative score
          this.showPointIndicator(bird.x, bird.y, `${species.score} DON'T KNIFE THAT!`, 0xef4444);
        }
      }
    });
    
    // Bonus for multi-kills
    if (knifeKills >= 3) {
      btState.score += 20;
      this.showNotification('🔪 TRIPLE SLICE! +20 BONUS!');
    } else if (knifeKills >= 2) {
      btState.score += 10;
      this.showNotification('🔪 DOUBLE SLICE! +10 BONUS!');
    } else if (knifeKills === 1) {
      this.showNotification('🔪 KNIFE KILL!');
    } else {
      this.showNotification('🔪 SWOOSH!');
    }
  }
  
  // ========== LEVEL PROGRESSION SYSTEM ==========
  onBirdKilled() {
    // Don't count kills in protected park (no hunting zone)
    if (this.currentScene && this.currentScene.isProtectedPark) {
      return;
    }
    
    btState.birdsKilledThisLevel++;
    
    const config = LEVEL_CONFIG[btState.currentLevel];
    const remaining = config.birdsToKill - btState.birdsKilledThisLevel;
    
    // Update HUD with birds remaining
    if (remaining > 0 && remaining <= 10) {
      this.showNotification(`🎯 ${remaining} BIRDS LEFT!`, 0xffff00);
    }
    
    // Check if level complete
    if (btState.birdsKilledThisLevel >= config.birdsToKill && !btState.levelComplete) {
      btState.levelComplete = true;
      this.onLevelComplete();
    }
  }
  
  onLevelComplete() {
    const currentLevel = btState.currentLevel;
    
    // Show level complete message
    this.showNotification(`🎉 ZONE ${currentLevel} CLEARED! 🎉`, 0x22c55e);
    
    // Bonus points for completing level (increases per level)
    const bonus = currentLevel * 150;
    btState.score += bonus;
    this.showPointIndicator(GAME_WIDTH/2, GAME_HEIGHT/2, `+${bonus} ZONE BONUS!`, 0xffd700);
    
    // ========== LEVEL COMPLETE FIREWORKS ==========
    this.createLevelCompleteFireworks();
    
    // Clear the sky completely
    this.skyClarity = 1;
    if (this.skyOverlay) this.skyOverlay.setAlpha(0);
    
    // Reset sun rays for next level
    if (this.sunRays) {
      this.sunRays.forEach(r => r.destroy());
      this.sunRays = null;
    }
    this.sunRaysActive = false;
    
    // Check if this was the final level (White House - Level 12)
    if (currentLevel >= 12) {
      btState.gameWon = true;
      btState.reachedWhiteHouse = true;
      this.onGameWon();
      return;
    }
    
    // Advance to next level after delay
    this.time.delayedCall(3000, () => {
      this.advanceToNextLevel();
    });
  }
  
  // Handle State Park (NO HUNTING ZONE) - auto-advance after walking through
  checkStateParkProgress() {
    if (!this.currentScene || !this.currentScene.isProtectedPark) return;
    
    // Player advances by walking to the right edge without shooting
    if (this.hunter && this.hunter.x > GAME_WIDTH * 0.9 && !btState.levelComplete) {
      btState.levelComplete = true;
      this.showNotification(`✅ STATE PARK CLEARED! You didn't shoot!`, 0x22c55e);
      const bonus = 500; // Bonus for not shooting
      btState.score += bonus;
      this.showPointIndicator(GAME_WIDTH/2, GAME_HEIGHT/2, `+${bonus} NO-HUNT BONUS!`, 0x22c55e);
      this.createLevelCompleteFireworks();
      this.time.delayedCall(3000, () => {
        this.advanceToNextLevel();
      });
    }
  }
  
  createLevelCompleteFireworks() {
    // Create celebratory fireworks display
    const colors = [0xff0000, 0xffffff, 0x0000ff, 0xffd700, 0x22c55e, 0xff00ff];
    
    // Launch 10 fireworks over 2 seconds
    for (let i = 0; i < 10; i++) {
      this.time.delayedCall(i * 200, () => {
        const x = Phaser.Math.Between(100, GAME_WIDTH - 100);
        const y = Phaser.Math.Between(80, 200);
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Firework explosion
        for (let j = 0; j < 15; j++) {
          const angle = (j / 15) * Math.PI * 2;
          const speed = 60 + Math.random() * 40;
          const particle = this.add.circle(x, y, 4 + Math.random() * 3, color)
            .setDepth(100).setAlpha(1);
          
          this.tweens.add({
            targets: particle,
            x: x + Math.cos(angle) * speed,
            y: y + Math.sin(angle) * speed + 30, // Gravity effect
            alpha: 0,
            scale: 0.3,
            duration: 800 + Math.random() * 400,
            onComplete: () => particle.destroy()
          });
        }
        
        // Center flash
        const flash = this.add.circle(x, y, 20, 0xffffff, 0.9).setDepth(101);
        this.tweens.add({
          targets: flash,
          alpha: 0,
          scale: 3,
          duration: 300,
          onComplete: () => flash.destroy()
        });
      });
    }
    
    // Play celebration sound
    this.playSound('powerup');
  }
  
  advanceToNextLevel() {
    const currentConfig = LEVEL_CONFIG[btState.currentLevel];
    const isProtectedPark = this.currentScene && this.currentScene.isProtectedPark;
    if (currentConfig && !isProtectedPark && !btState.levelComplete) {
      const remaining = currentConfig.birdsToKill - btState.birdsKilledThisLevel;
      if (remaining > 0) {
        console.warn('Blocked premature level advance', { level: btState.currentLevel, remaining });
        this.showNotification(`You still need to shoot ${remaining} birds to advance!`, 0xffd700);
        return;
      }
    }

    btState.currentLevel++;
    btState.birdsKilledThisLevel = 0;
    btState.levelComplete = false;

    const config = LEVEL_CONFIG[btState.currentLevel];
    btState.birdsNeededThisLevel = config ? config.birdsToKill : 100;
    
    // Update scene index - account for Christmas mode offset
    const levelOffset = isChristmasSeason() ? 0 : 1;
    this.currentSceneIndex = btState.currentLevel - levelOffset;
    this.currentScene = sceneSequence[this.currentSceneIndex] || sceneSequence[sceneSequence.length - 1];
    
    // TELEPORT player to start of new level zone
    const zoneWidth = this.panelWidth || 1344;
    const newZoneStart = this.currentSceneIndex * zoneWidth + 100;
    if (this.hunter) {
      this.hunter.x = newZoneStart;
      // Smoothly pan camera to new position
      this.cameras.main.pan(newZoneStart, GAME_HEIGHT/2, 500, 'Sine.easeInOut');
    }
    
    // Show level intro
    this.showLevelIntro();
    
    // Transition to new background
    this.transitionBackground();
    
    // Heal player slightly between levels
    btState.health = Math.min(btState.maxHealth, btState.health + 25);
    btState.turdMeter = Math.max(0, btState.turdMeter - 20);
    
    // Restore some ammo
    btState.ammo = Math.min(btState.ammoMax, btState.ammo + 30);
  }
  
  onGameWon() {
    // Player reached the White House and completed final level!
    
    // Show victory screen
    const overlay = this.add.rectangle(GAME_WIDTH/2, GAME_HEIGHT/2, GAME_WIDTH, GAME_HEIGHT, 0x000055, 0.9)
      .setScrollFactor(0).setDepth(1000);
    
    const title = this.add.text(GAME_WIDTH/2, GAME_HEIGHT/2 - 150,
      '🇺🇸 VICTORY! 🇺🇸', {
      fontSize: '64px',
      fontStyle: 'bold',
      color: '#ffd700',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
    
    const welcome = this.add.text(GAME_WIDTH/2, GAME_HEIGHT/2 - 70,
      'YOU REACHED THE WHITE HOUSE!', {
      fontSize: '32px',
      fontStyle: 'bold',
      color: '#ffffff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
    
    // Trump welcomes the player
    const trumpMsg = this.add.text(GAME_WIDTH/2, GAME_HEIGHT/2,
      `"${TRUMP_QUOTES.welcome[Math.floor(Math.random() * TRUMP_QUOTES.welcome.length)]}"`, {
      fontSize: '24px',
      fontStyle: 'italic',
      color: '#ffd700'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
    
    const invite = this.add.text(GAME_WIDTH/2, GAME_HEIGHT/2 + 50,
      '🏛️ You are invited into the White House! 🏛️', {
      fontSize: '22px',
      fontStyle: 'bold',
      color: '#88ff88'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
    
    const scoreText = this.add.text(GAME_WIDTH/2, GAME_HEIGHT/2 + 100,
      `FINAL SCORE: ${btState.score.toLocaleString()}`, {
      fontSize: '28px',
      fontStyle: 'bold',
      color: '#ffffff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
    
    const scripture = this.add.text(GAME_WIDTH/2, GAME_HEIGHT/2 + 150,
      'Romans 8:31 - "If God is for us, who can be against us?"', {
      fontSize: '16px',
      fontStyle: 'italic',
      color: '#ffd700'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
    
    // Animate
    [title, welcome, trumpMsg, invite, scoreText, scripture].forEach((txt, i) => {
      txt.setAlpha(0);
      this.tweens.add({
        targets: txt,
        alpha: 1,
        duration: 500,
        delay: i * 200
      });
    });
    
    // Fireworks effect
    for (let i = 0; i < 20; i++) {
      this.time.delayedCall(i * 300, () => {
        const x = Phaser.Math.Between(100, GAME_WIDTH - 100);
        const y = Phaser.Math.Between(100, 300);
        this.createFirework(x, y);
      });
    }
  }
  
  createFirework(x, y) {
    const colors = [0xff0000, 0xffffff, 0x0000ff, 0xffd700];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const particle = this.add.circle(x, y, 4, color).setDepth(1002);
      
      this.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * 80,
        y: y + Math.sin(angle) * 80,
        alpha: 0,
        scale: 0.5,
        duration: 800,
        onComplete: () => particle.destroy()
      });
    }
  }

  animateHunter(dt) {
    // Safety check
    if (!this.hunter || !this.hunter.body) return;

    const onGround = this.hunter.body.blocked.down && !this.isInAir;
    const moving = Math.abs(this.hunter.body.velocity.x) > 10;

    if (onGround && moving) {
      // Anchor walk cycle to a base Y so we don't fight physics
      if (this.hunter.baseWalkY == null) {
        this.hunter.baseWalkY = this.hunter.y;
      }
      this.walkFrame += dt * 10;
      const bobAmount = this.isCrouching ? 0.5 : 1;
      const bobOffset = Math.sin(this.walkFrame) * bobAmount;
      this.hunter.y = this.hunter.baseWalkY + bobOffset;
    } else {
      this.walkFrame = 0;
      this.hunter.baseWalkY = this.hunter.y;
    }
  }

  handleShoot(targetX, targetY) {
    if (this.gameOver || this.fireRateCooldown > 0) return;
    if (!this.hunter || !this.hunter.active) return; // Can't shoot without hunter!
    if (this.hunterBeingCarried) return; // Let the carrying code handle shooting
    
    // Check which weapon to use
    let weaponUsed = 'rifle';
    let bulletColor = 0xFFFF00;
    let bulletSize = 5;
    let bulletSpeed = 1000;
    let bulletEmoji = null;
    let bulletTrail = true;
    
    // Get character-specific weapon properties
    const charId = btState.currentCharacter || 'buck';
    
    if (btState.ammo > 0) {
      // Use character's primary weapon with unique visuals
      btState.ammo--;
      weaponUsed = 'rifle';
      
      // CHARACTER-SPECIFIC BULLET VISUALS
      switch(charId) {
        case 'buck': // Lever-Action Rifle - brass bullet
          bulletColor = 0xD4A017; // Brass/gold
          bulletSize = 4;
          bulletSpeed = 950;
          this.fireRateCooldown = 0.25 / btState.upgrades.fireRate; // Medium rate
          break;
          
        case 'bubba': // Pump-Action Shotgun - pellet spread
          this.fireShotgunSpread(targetX, targetY, 6, 0.35, 0x666666, 750); // 6 pellets
          this.fireRateCooldown = 0.7 / btState.upgrades.fireRate;
          return;
          
        case 'daisy': // Double-Barrel Shotgun - wide spread
          this.fireShotgunSpread(targetX, targetY, 8, 0.5, 0x888888, 700); // 8 pellets, wider
          this.fireRateCooldown = 0.9 / btState.upgrades.fireRate;
          return;
          
        case 'sierra': // AR-15 Carbine - rapid small bullets
          bulletColor = 0xFFD700; // Gold
          bulletSize = 3;
          bulletSpeed = 1100;
          this.fireRateCooldown = 0.08 / btState.upgrades.fireRate; // Fast!
          break;
          
        case 'clyde': // Semi-Auto Hunting Rifle - medium bullets
          bulletColor = 0xCD7F32; // Bronze
          bulletSize = 5;
          bulletSpeed = 1000;
          this.fireRateCooldown = 0.2 / btState.upgrades.fireRate;
          break;
          
        case 'gunner': // AK Assault Rifle - large copper bullets
          bulletColor = 0xB87333; // Copper
          bulletSize = 5;
          bulletSpeed = 1050;
          this.fireRateCooldown = 0.1 / btState.upgrades.fireRate; // Fast
          // Add slight spread for AK
          targetX += (Math.random() - 0.5) * 30;
          targetY += (Math.random() - 0.5) * 30;
          break;
          
        case 'jolene': // Bolt-Action Sniper - large red tracer
          bulletColor = 0xFF4444; // Red tracer
          bulletSize = 6;
          bulletSpeed = 1400; // Very fast
          this.fireRateCooldown = 1.0 / btState.upgrades.fireRate; // Slow but powerful
          this.createSniperTrail(targetX, targetY);
          break;
          
        case 'tammy': // Semi-Auto Pistol - small quick bullets
          bulletColor = 0xFFFF88; // Light yellow
          bulletSize = 3;
          bulletSpeed = 900;
          this.fireRateCooldown = 0.12 / btState.upgrades.fireRate;
          break;
          
        default:
          bulletColor = 0xFFFF00;
          bulletSize = 4;
          bulletSpeed = 1000;
          this.fireRateCooldown = 0.15 / btState.upgrades.fireRate;
      }
      
      this.playSound('shoot');
    } else if (btState.hasShotgun && btState.shotgunShells > 0) {
      // Use shotgun pickup - spread of pellets!
      btState.shotgunShells--;
      weaponUsed = 'shotgun';
      this.fireRateCooldown = 0.8; // Slow pump action
      this.playSound('shoot', { volume: 1.2 });
      
      // Fire spread of pellets (5 pellets)
      const startX = this.hunter.x + (this.hunter.flipX ? -25 : 25);
      const startY = this.hunter.y - (this.isCrouching ? 20 : 35);
      const baseAngle = Math.atan2(targetY - startY, targetX - startX);
      
      for (let i = 0; i < 5; i++) {
        const spreadAngle = baseAngle + (Math.random() - 0.5) * 0.4; // 0.4 radian spread
        const pellet = this.add.circle(startX, startY, 3, 0x888888).setDepth(15);
        this.physics.add.existing(pellet);
        pellet.body.setAllowGravity(false);
        pellet.body.setCircle(3);
        this.bullets.add(pellet);
        pellet.body.setVelocity(Math.cos(spreadAngle) * 800, Math.sin(spreadAngle) * 800);
        pellet.spawnTime = this.time.now;
        pellet.damage = btState.upgrades.damage * 0.6; // Less per pellet but more pellets
        pellet.weaponType = 'shotgun';
      }
      
      // Muzzle flash for shotgun
      this.createMuzzleFlash(startX, startY);
      if (btState.shotgunShells <= 0) btState.hasShotgun = false;
      return; // Already fired
    } else if (btState.hasMinigun && btState.minigunAmmo > 0) {
      // MINIGUN - Extreme rapid fire!
      btState.minigunAmmo--;
      weaponUsed = 'minigun';
      bulletColor = 0xFF6600; // Orange tracer
      bulletSize = 3;
      bulletSpeed = 1200;
      this.fireRateCooldown = 0.03; // VERY FAST
      targetX += (Math.random() - 0.5) * 40; // Spray
      targetY += (Math.random() - 0.5) * 40;
      this.playSound('minigun');
      if (btState.minigunAmmo <= 0) btState.hasMinigun = false;
    } else if (btState.hasMachinegun && btState.machinegunAmmo > 0) {
      // MACHINEGUN - Rapid fire
      btState.machinegunAmmo--;
      weaponUsed = 'machinegun';
      bulletColor = 0xFFAA00; // Yellow-orange
      bulletSize = 4;
      bulletSpeed = 1100;
      this.fireRateCooldown = 0.06; // Fast
      targetX += (Math.random() - 0.5) * 25; // Some spray
      targetY += (Math.random() - 0.5) * 25;
      this.playSound('machinegun');
      if (btState.machinegunAmmo <= 0) btState.hasMachinegun = false;
    } else if (btState.hasBarrett && btState.barrettAmmo > 0) {
      // BARRETT .50 CAL - Massive damage sniper
      btState.barrettAmmo--;
      weaponUsed = 'barrett';
      bulletColor = 0xFF0000; // Bright red
      bulletSize = 8;
      bulletSpeed = 1600;
      this.fireRateCooldown = 1.5; // Very slow
      bulletTrail = true;
      this.createSniperTrail(targetX, targetY);
      this.playSound('barrett');
      // Screen shake for big gun
      this.cameras.main.shake(100, 0.01);
      if (btState.barrettAmmo <= 0) btState.hasBarrett = false;
    } else if (btState.hasSniper && btState.sniperAmmo > 0) {
      // SNIPER RIFLE - High damage, slow
      btState.sniperAmmo--;
      weaponUsed = 'sniper';
      bulletColor = 0xFF4444; // Red
      bulletSize = 6;
      bulletSpeed = 1400;
      this.fireRateCooldown = 1.0; // Slow
      this.createSniperTrail(targetX, targetY);
      this.playSound('sniper_shop');
      if (btState.sniperAmmo <= 0) btState.hasSniper = false;
    } else if (btState.hasDeagle && btState.deagleAmmo > 0) {
      // DESERT EAGLE - Powerful pistol
      btState.deagleAmmo--;
      weaponUsed = 'deagle';
      bulletColor = 0xFFD700; // Gold
      bulletSize = 5;
      bulletSpeed = 1000;
      this.fireRateCooldown = 0.4; // Medium-slow
      this.playSound('deagle');
      if (btState.deagleAmmo <= 0) btState.hasDeagle = false;
    } else if (btState.hasRevolver && btState.revolverAmmo > 0) {
      // REVOLVER - Classic 6-shooter
      btState.revolverAmmo--;
      weaponUsed = 'revolver';
      bulletColor = 0xC0C0C0; // Silver
      bulletSize = 4;
      bulletSpeed = 900;
      this.fireRateCooldown = 0.5; // Slow but powerful
      this.playSound('revolver');
      if (btState.revolverAmmo <= 0) btState.hasRevolver = false;
    } else if (btState.hasBazooka && btState.bazookaAmmo > 0) {
      // BAZOOKA - Explosive rocket!
      btState.bazookaAmmo--;
      weaponUsed = 'bazooka';
      bulletEmoji = '🚀';
      bulletSpeed = 600; // Slower but explosive
      bulletTrail = false;
      this.fireRateCooldown = 2.0; // Very slow
      this.playSound('explosion', { volume: 0.5 });
      if (btState.bazookaAmmo <= 0) btState.hasBazooka = false;
    } else if (btState.hasRocketLauncher && btState.rocketAmmo > 0) {
      // ROCKET LAUNCHER - Big explosion
      btState.rocketAmmo--;
      weaponUsed = 'rocket';
      bulletEmoji = '💥';
      bulletSpeed = 500;
      bulletTrail = false;
      this.fireRateCooldown = 2.5;
      this.playSound('explosion', { volume: 0.6 });
      if (btState.rocketAmmo <= 0) btState.hasRocketLauncher = false;
    } else {
      // No ammo at all!
      this.showNotification('❌ NO AMMO! Use knife (F) or find a weapon!');
      return;
    }
    
    btState.shots++;
    
    const startX = this.hunter.x + (this.hunter.flipX ? -25 : 25);
    const startY = this.hunter.y - (this.isCrouching ? 20 : 35);
    
    let bullet;
    if (bulletEmoji) {
      bullet = this.add.text(startX, startY, bulletEmoji, { fontSize: '16px' }).setDepth(15);
    } else {
      bullet = this.add.circle(startX, startY, bulletSize, bulletColor).setDepth(15);
    }
    
    this.physics.add.existing(bullet);
    bullet.body.setAllowGravity(false);
    if (!bulletEmoji) bullet.body.setCircle(bulletSize);
    this.bullets.add(bullet);
    
    const dx = targetX - startX;
    const dy = targetY - startY;
    const dist = Math.max(1, Math.hypot(dx, dy));
    bullet.body.setVelocity((dx / dist) * bulletSpeed, (dy / dist) * bulletSpeed);
    bullet.spawnTime = this.time.now;
    
    // Calculate damage based on weapon type
    let damageMultiplier = 1;
    switch(weaponUsed) {
      case 'crossbow': damageMultiplier = 1.5; break;
      case 'revolver': damageMultiplier = btState.revolverDamage || 2; break;
      case 'deagle': damageMultiplier = btState.deagleDamage || 2.5; break;
      case 'sniper': damageMultiplier = btState.sniperDamage || 3; break;
      case 'barrett': damageMultiplier = btState.barrettDamage || 5; break;
      case 'bazooka': damageMultiplier = 10; break; // Explosive!
      case 'rocket': damageMultiplier = 15; break; // Big boom!
      case 'machinegun': damageMultiplier = 0.8; break; // Rapid but weaker
      case 'minigun': damageMultiplier = 0.5; break; // Very rapid, weaker per shot
      default:
        // Character-specific damage
        if (charId === 'jolene') damageMultiplier = 2.0; // Sniper rifle
        break;
    }
    bullet.damage = btState.upgrades.damage * damageMultiplier;
    bullet.weaponType = weaponUsed;
    
    // Rotate arrow/bolt towards target
    if (bulletEmoji) {
      bullet.setRotation(Math.atan2(dy, dx));
    }
    
    // Muzzle flash
    if (bulletTrail) {
      this.createMuzzleFlash(startX, startY);
    }
  }
  
  // Fire shotgun spread (for Bubba and Daisy)
  fireShotgunSpread(targetX, targetY, pelletCount, spreadAngle, color, speed) {
    const startX = this.hunter.x + (this.hunter.flipX ? -25 : 25);
    const startY = this.hunter.y - (this.isCrouching ? 20 : 35);
    const baseAngle = Math.atan2(targetY - startY, targetX - startX);
    
    btState.ammo--;
    btState.shots++;
    this.playSound('shoot', { volume: 1.2 });
    
    for (let i = 0; i < pelletCount; i++) {
      const angle = baseAngle + (Math.random() - 0.5) * spreadAngle;
      const pellet = this.add.circle(startX, startY, 3, color).setDepth(15);
      this.physics.add.existing(pellet);
      pellet.body.setAllowGravity(false);
      pellet.body.setCircle(3);
      this.bullets.add(pellet);
      pellet.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
      pellet.spawnTime = this.time.now;
      pellet.damage = btState.upgrades.damage * (0.5 + Math.random() * 0.3);
      pellet.weaponType = 'shotgun';
    }
    
    this.createShotgunFlash(startX, startY);
  }
  
  // Big muzzle flash for shotguns
  createShotgunFlash(x, y) {
    const flash = this.add.circle(x, y, 25, 0xFFAA00, 0.9).setDepth(16);
    const flash2 = this.add.circle(x, y, 15, 0xFFFFFF, 0.8).setDepth(17);
    const flash3 = this.add.circle(x, y, 8, 0xFFFF00, 1).setDepth(18);
    
    this.tweens.add({
      targets: [flash, flash2, flash3], 
      alpha: 0, 
      scale: 2.5, 
      duration: 100,
      onComplete: () => { flash.destroy(); flash2.destroy(); flash3.destroy(); }
    });
  }
  
  // Sniper tracer trail effect (for Jolene)
  createSniperTrail(targetX, targetY) {
    const startX = this.hunter.x + (this.hunter.flipX ? -25 : 25);
    const startY = this.hunter.y - (this.isCrouching ? 20 : 35);
    
    // Red laser line effect
    const line = this.add.graphics().setDepth(14);
    line.lineStyle(2, 0xFF0000, 0.8);
    line.lineBetween(startX, startY, targetX, targetY);
    
    this.tweens.add({
      targets: line,
      alpha: 0,
      duration: 150,
      onComplete: () => line.destroy()
    });
  }
  
  // Create muzzle flash effect for any gun
  createMuzzleFlash(x, y) {
    const flash = this.add.circle(x, y, 15, 0xFFFFFF, 0.9).setDepth(16);
    const flash2 = this.add.circle(x, y, 8, 0xFFFF00, 0.8).setDepth(17);
    
    this.tweens.add({
      targets: [flash, flash2], 
      alpha: 0, 
      scale: 2, 
      duration: 80,
      onComplete: () => { flash.destroy(); flash2.destroy(); }
    });
  }

  handleSpawning(dt) {
    // Get current level config for difficulty scaling
    const levelConfig = LEVEL_CONFIG[btState.currentLevel] || LEVEL_CONFIG[1];
    const spawnRate = levelConfig.spawnRate;
    
    this.spawnTimer += dt;
    this.vehicleTimer += dt;
    this.itemTimer += dt;
    this.planeTimer += dt;
    this.animalTimer += dt;
    this.npcTimer += dt;
    this.bossTimer += dt;
    
    // Don't spawn more birds if level is complete
    if (btState.levelComplete) return;
    
    // Birds: spawn based on level difficulty (faster = harder)
    if (this.spawnTimer >= spawnRate) { this.spawnTimer = 0; this.spawnBirdWave(); }
    // Vehicles: every 15 seconds (tractors, etc on ground)
    if (this.vehicleTimer >= 15) { this.vehicleTimer = 0; this.spawnVehicle(); }
    // Planes/helicopters: every 35 seconds (sky traffic)
    if (this.planeTimer >= 35) { this.planeTimer = 0; this.spawnPlane(); }
    // Pickups: every 12 seconds (ammo, health, coins)
    if (this.itemTimer >= 12) { this.itemTimer = 0; this.spawnPickup(); }
    // Animals: every 20 seconds (deer, dogs, etc)
    if (this.animalTimer >= 20) { this.animalTimer = 0; this.spawnAnimal(); }
    // NPCs: every 40 seconds (hikers, farmers)
    if (this.npcTimer >= 40) { this.npcTimer = 0; this.spawnNPC(); }
    // Shelters: every 60 seconds during storms
    if (!this.shelterTimer) this.shelterTimer = 0;
    this.shelterTimer += dt;
    if (this.shelterTimer >= 60 && this.stormActive) { this.shelterTimer = 0; this.spawnShelter(); }
    // Bosses: based on level difficulty
    const bossInterval = 90 - (btState.currentLevel * 10); // Faster bosses at higher levels
    if (this.bossTimer >= 30 && !this.firstBossSpawned) { 
      this.bossTimer = 0; 
      this.firstBossSpawned = true;
      this.spawnBossBird(); 
      this.showNotification('🐉 FIRST BOSS APPEARED! Use heavy weapons!');
    } else if (this.firstBossSpawned && this.bossTimer >= bossInterval && Math.random() < levelConfig.bossChance) { 
      this.bossTimer = 0; 
      this.spawnBossBird(); 
    }
    
    // ========== DEMON SPAWNING - starts at level 3 ==========
    if (btState.currentLevel >= DEMON_CONFIG.minLevel) {
      this.demonTimer += dt;
      // Demons spawn every 15 seconds with increasing chance
      if (this.demonTimer >= 15) {
        this.demonTimer = 0;
        const demonChance = DEMON_CONFIG.spawnChance + (btState.currentLevel - 3) * 0.05;
        if (Math.random() < demonChance) {
          this.spawnDemon();
        }
      }
    }
    
    // ========== OWNED VEHICLE HELPERS ==========
    btState.vehicleHelperTimer = (btState.vehicleHelperTimer || 0) + dt;
    if (btState.vehicleHelperTimer >= 30) { // Every 30 seconds
      btState.vehicleHelperTimer = 0;
      this.spawnOwnedVehicleHelper();
    }
    
    // ========== OWNED BIRD HELPERS ==========
    if (!this.birdHelperTimer) this.birdHelperTimer = 0;
    this.birdHelperTimer += dt;
    if (this.birdHelperTimer >= 20) { // Every 20 seconds
      this.birdHelperTimer = 0;
      this.spawnOwnedBirdHelper();
    }
    
    // ========== COIN MAGNET ==========
    if (btState.hasCoinMagnet) {
      this.attractCoinsToPlayer();
    }
  }
  
  // ========== SPAWN OWNED VEHICLE HELPERS ==========
  spawnOwnedVehicleHelper() {
    const view = this.cameras.main.worldView;
    const helpers = [];
    
    // Check which vehicles player owns
    if (btState.hasHelicopter) helpers.push('helicopter');
    if (btState.hasTank) helpers.push('tank');
    if (btState.hasJeep) helpers.push('jeep');
    if (btState.hasTruck) helpers.push('truck');
    if (btState.hasATV) helpers.push('atv');
    if (btState.hasDirtbike) helpers.push('dirtbike');
    
    if (helpers.length === 0) return;
    
    // Pick random owned vehicle
    const vehicleType = helpers[Math.floor(Math.random() * helpers.length)];
    const fromLeft = Math.random() > 0.5;
    const startX = fromLeft ? view.left - 100 : view.right + 100;
    
    if (vehicleType === 'helicopter') {
      // Helicopter flies overhead and shoots birds
      this.spawnHelperHelicopter(startX, fromLeft);
    } else if (vehicleType === 'tank') {
      // Tank rolls through and blasts birds
      this.spawnHelperTank(startX, fromLeft);
    } else if (vehicleType === 'jeep') {
      // Jeep with mounted gun
      this.spawnHelperJeep(startX, fromLeft);
    } else {
      // Other vehicles block turds
      this.spawnHelperGroundVehicle(vehicleType, startX, fromLeft);
    }
    
    this.showNotification(`🚗 Your ${vehicleType.toUpperCase()} is helping!`, 0x22c55e);
  }
  
  spawnHelperHelicopter(startX, fromLeft) {
    const heli = this.add.sprite(startX, 60, 'helicopter').setDepth(15);
    heli.setScale(0.12);
    heli.setFlipX(!fromLeft);
    heli.isHelper = true; // Don't shoot helpers!
    heli.setTint(0x22c55e); // Green tint = friendly
    
    // Fly across screen
    this.tweens.add({
      targets: heli,
      x: fromLeft ? this.cameras.main.worldView.right + 100 : this.cameras.main.worldView.left - 100,
      duration: 8000,
      onUpdate: () => {
        // Shoot at birds every second
        if (Math.random() < 0.02 && heli.active) {
          this.helperShootNearestBird(heli);
        }
      },
      onComplete: () => heli.destroy()
    });
  }
  
  spawnHelperTank(startX, fromLeft) {
    const tank = this.add.rectangle(startX, this.groundY - 25, 80, 40, 0x22c55e).setDepth(8);
    tank.isHelper = true;
    
    // Tank cannon
    const cannon = this.add.rectangle(startX + (fromLeft ? 30 : -30), this.groundY - 35, 40, 10, 0x166534).setDepth(9);
    
    this.tweens.add({
      targets: [tank, cannon],
      x: fromLeft ? '+=800' : '-=800',
      duration: 10000,
      onUpdate: () => {
        cannon.x = tank.x + (fromLeft ? 30 : -30);
        // Fire at birds
        if (Math.random() < 0.015 && tank.active) {
          this.helperShootNearestBird(tank, true); // AOE
        }
      },
      onComplete: () => { tank.destroy(); cannon.destroy(); }
    });
  }
  
  spawnHelperJeep(startX, fromLeft) {
    const jeep = this.add.rectangle(startX, this.groundY - 20, 60, 30, 0x22c55e).setDepth(8);
    jeep.isHelper = true;
    
    this.tweens.add({
      targets: jeep,
      x: fromLeft ? '+=700' : '-=700',
      duration: 6000,
      onUpdate: () => {
        if (Math.random() < 0.03 && jeep.active) {
          this.helperShootNearestBird(jeep);
        }
      },
      onComplete: () => jeep.destroy()
    });
  }
  
  spawnHelperGroundVehicle(type, startX, fromLeft) {
    const vehicle = this.add.rectangle(startX, this.groundY - 15, 50, 25, 0x22c55e).setDepth(8);
    vehicle.isHelper = true;
    
    // Ground vehicles block turds that hit them
    this.tweens.add({
      targets: vehicle,
      x: fromLeft ? '+=600' : '-=600',
      duration: 8000,
      onComplete: () => vehicle.destroy()
    });
    
    // Add to turd blocking
    if (!this.helperVehicles) this.helperVehicles = [];
    this.helperVehicles.push(vehicle);
  }
  
  // Helper shoots nearest bird
  helperShootNearestBird(helper, isAOE = false) {
    if (!this.birds || this.birds.getChildren().length === 0) return;
    
    let nearestBird = null;
    let nearestDist = 400;
    
    this.birds.getChildren().forEach(bird => {
      if (!bird || !bird.active) return;
      const dist = Phaser.Math.Distance.Between(helper.x, helper.y, bird.x, bird.y);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestBird = bird;
      }
    });
    
    if (nearestBird) {
      // Visual shot
      const bullet = this.add.circle(helper.x, helper.y, 4, 0x22c55e).setDepth(20);
      this.tweens.add({
        targets: bullet,
        x: nearestBird.x,
        y: nearestBird.y,
        duration: 150,
        onComplete: () => {
          bullet.destroy();
          if (nearestBird && nearestBird.active) {
            // Kill the bird - give half points to player
            const points = Math.floor((nearestBird.points || 5) * 0.5);
            btState.score += points;
            btState.kills++;
            this.showPointIndicator(nearestBird.x, nearestBird.y, `+${points} HELPER!`, 0x22c55e);
            nearestBird.destroy();
            
            // AOE kills nearby birds too
            if (isAOE) {
              this.birds.getChildren().forEach(b => {
                if (b && b.active && Phaser.Math.Distance.Between(nearestBird.x, nearestBird.y, b.x, b.y) < 80) {
                  btState.score += 3;
                  btState.kills++;
                  b.destroy();
                }
              });
            }
          }
        }
      });
    }
  }
  
  // ========== SPAWN OWNED BIRD HELPERS ==========
  spawnOwnedBirdHelper() {
    const totalHelpers = btState.extraEagles + btState.goldenEagles + (btState.hasFalcon ? 1 : 0) + (btState.hasOwlHelper ? 1 : 0);
    if (totalHelpers === 0) return;
    
    const view = this.cameras.main.worldView;
    const helpers = [];
    
    for (let i = 0; i < btState.extraEagles; i++) helpers.push('eagle');
    for (let i = 0; i < btState.goldenEagles; i++) helpers.push('golden_eagle');
    if (btState.hasFalcon) helpers.push('falcon');
    if (btState.hasOwlHelper) helpers.push('owl');
    
    // Spawn one helper
    const helperType = helpers[Math.floor(Math.random() * helpers.length)];
    const startX = view.right + 50;
    const startY = 50 + Math.random() * 100;
    
    const helper = this.add.circle(startX, startY, 15, helperType === 'golden_eagle' ? 0xffd700 : 0x22c55e).setDepth(12);
    helper.isHelper = true;
    
    // Helper bird attacks enemy birds
    const attackPattern = this.tweens.add({
      targets: helper,
      x: view.left - 50,
      y: { value: startY + Math.sin(Date.now() * 0.01) * 50, duration: 500, yoyo: true, repeat: -1 },
      duration: 6000,
      onUpdate: () => {
        if (Math.random() < 0.05 && helper.active) {
          this.helperShootNearestBird(helper);
        }
      },
      onComplete: () => helper.destroy()
    });
    
    this.showNotification(`🦅 Your ${helperType.toUpperCase()} is attacking birds!`, 0x22c55e);
  }
  
  // ========== COIN MAGNET ==========
  attractCoinsToPlayer() {
    if (!this.coins || !this.hunter) return;
    
    this.coins.getChildren().forEach(coin => {
      if (!coin || !coin.active) return;
      const dist = Phaser.Math.Distance.Between(this.hunter.x, this.hunter.y, coin.x, coin.y);
      if (dist < 200) { // 200px magnet range
        // Move coin toward player
        const angle = Phaser.Math.Angle.Between(coin.x, coin.y, this.hunter.x, this.hunter.y);
        coin.x += Math.cos(angle) * 5;
        coin.y += Math.sin(angle) * 3;
      }
    });
  }

  // ========== DEMON ENEMY SYSTEM ==========
  spawnDemon() {
    const view = this.cameras.main.worldView;
    
    // Spawn from right side (like birds)
    const startX = view.right + 100;
    const startY = 80 + Math.random() * 100;
    
    // ========== SHOW EMPOWERING SCRIPTURE ==========
    if (!btState.silentMode) {
      this.showDemonScripture();
    }
    
    // Create demon sprite with animated frames
    let demon;
    const demonScale = 0.15; // Scale to ~70px tall
    
    if (this.textures.exists('demon_fly')) {
      demon = this.add.sprite(startX, startY, 'demon_fly').setScale(demonScale);
      
      // Create fly animation if not exists
      if (!this.anims.exists('demon_fly_anim')) {
        this.anims.create({
          key: 'demon_fly_anim',
          frames: this.anims.generateFrameNumbers('demon_fly', { start: 0, end: 3 }),
          frameRate: 10,
          repeat: -1
        });
      }
      demon.play('demon_fly_anim');
      demon.isAnimatedSprite = true;
      this.physics.world.enable(demon);
    } else {
      // Fallback: create a red menacing circle with horns
      demon = this.add.container(startX, startY);
      const body = this.add.circle(0, 0, 25, 0x660000);
      const horn1 = this.add.triangle(-15, -20, 0, 0, 5, -15, 10, 0, 0x330000);
      const horn2 = this.add.triangle(15, -20, 0, 0, 5, -15, 10, 0, 0x330000);
      const eye1 = this.add.circle(-8, -5, 5, 0xff0000);
      const eye2 = this.add.circle(8, -5, 5, 0xff0000);
      const mouth = this.add.rectangle(0, 10, 20, 5, 0x000000);
      demon.add([body, horn1, horn2, eye1, eye2, mouth]);
      demon.isAnimatedSprite = false;
      this.physics.world.enable(demon);
    }
    
    demon.health = DEMON_CONFIG.health;
    demon.direction = -1; // Flying left toward player
    demon.lieTimer = 0;
    demon.isDemon = true;
    demon.demonScale = demonScale;
    demon.setDepth(12);
    
    // Add to tracking
    this.demons.add(demon);
    
    this.showNotification('😈 DEMON APPROACHES! Use Bible (B) to defeat!', 0xff4444);
    
    // Play demon voice!
    if (window.onDemonSpawn) window.onDemonSpawn();
  }
  
  // Play demon attack animation
  playDemonAttack(demon) {
    if (!demon || !demon.active || !demon.isAnimatedSprite) return;
    
    if (!this.anims.exists('demon_attack_anim')) {
      if (this.textures.exists('demon_attack')) {
        this.anims.create({
          key: 'demon_attack_anim',
          frames: this.anims.generateFrameNumbers('demon_attack', { start: 0, end: 3 }),
          frameRate: 12,
          repeat: 0
        });
      }
    }
    
    if (this.anims.exists('demon_attack_anim')) {
      demon.play('demon_attack_anim');
      // Return to fly animation after attack
      demon.once('animationcomplete', () => {
        if (demon.active && !demon.fleeing) {
          demon.play('demon_fly_anim');
        }
      });
    }
  }
  
  // Play demon hit animation
  playDemonHit(demon) {
    if (!demon || !demon.active || !demon.isAnimatedSprite) return;
    
    if (!this.anims.exists('demon_hit_anim')) {
      if (this.textures.exists('demon_hit')) {
        this.anims.create({
          key: 'demon_hit_anim',
          frames: this.anims.generateFrameNumbers('demon_hit', { start: 0, end: 3 }),
          frameRate: 12,
          repeat: 0
        });
      }
    }
    
    if (this.anims.exists('demon_hit_anim')) {
      demon.play('demon_hit_anim');
      // Return to fly after hit
      demon.once('animationcomplete', () => {
        if (demon.active && !demon.fleeing) {
          demon.play('demon_fly_anim');
        }
      });
    }
  }
  
  // Play demon flee animation and show scripture
  playDemonFlee(demon) {
    if (!demon || !demon.active) return;
    
    if (demon.isAnimatedSprite) {
      if (!this.anims.exists('demon_flee_anim')) {
        if (this.textures.exists('demon_flee')) {
          this.anims.create({
            key: 'demon_flee_anim',
            frames: this.anims.generateFrameNumbers('demon_flee', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
          });
        }
      }
      
      if (this.anims.exists('demon_flee_anim')) {
        demon.play('demon_flee_anim');
        // Flip sprite to face flee direction
        demon.setFlipX(true);
      }
    }
    
    // Show demon flee scripture!
    if (!btState.silentMode) {
      const scripture = DEMON_FLEE_SCRIPTURES[Math.floor(Math.random() * DEMON_FLEE_SCRIPTURES.length)];
      this.showScripturePopup(scripture, 0x22c55e, 4000); // Green, 4 seconds
    }
  }
  
  updateDemons(dt) {
    if (!this.demons) return;
    
    this.demons.getChildren().forEach(demon => {
      if (!demon || !demon.active) return;
      
      const view = this.cameras.main.worldView;
      
      // ========== DEMON FLEES FROM ANGEL! ==========
      if (btState.angelProtectionActive && !demon.fleeing) {
        // Angel power makes demons flee!
        demon.fleeing = true;
        demon.direction = 1; // Reverse direction - flee right!
        this.playDemonFlee(demon); // Use new animated flee
      }
      
      // Move demon (left toward player normally, right if fleeing)
      const speed = demon.fleeing ? DEMON_CONFIG.speed * 2 : DEMON_CONFIG.speed;
      demon.x += speed * demon.direction * dt;
      
      // Sinister hovering motion (erratic if fleeing)
      const hoverAmount = demon.fleeing ? 2 : 0.5;
      demon.y += Math.sin(this.time.now / 300) * hoverAmount;
      
      // Throw lies periodically (but not when fleeing!)
      if (!demon.fleeing) {
        demon.lieTimer += dt;
        if (demon.lieTimer >= DEMON_CONFIG.lieInterval) {
          demon.lieTimer = 0;
          this.playDemonAttack(demon); // Play attack animation
          this.throwLie(demon.x, demon.y);
        }
      }
      
      // Remove if off screen (left or right)
      if (demon.x < view.x - 100 || demon.x > view.right + 200) {
        if (demon.fleeing) {
          this.showVictoryScripture();
        }
        demon.destroy();
      }
    });
    
    // Update lies (falling toward player)
    this.updateDemonLies(dt);
  }
  
  showDemonFlee(demon) {
    // Demon freaks out and flees!
    this.showNotification('😈➡️ DEMON FLEES FROM THE ANGEL! 😇', 0xffd700);
    
    // Show scripture about power over darkness
    const scripture = DEMON_SCRIPTURES[Math.floor(Math.random() * DEMON_SCRIPTURES.length)];
    this.showScripturePopup(scripture, 0x44ff44);
    
    // Visual effect - demon turns pale and shrinks
    if (demon.setTint) demon.setTint(0x888888);
    this.tweens.add({
      targets: demon,
      scaleX: 0.7,
      scaleY: 0.7,
      duration: 500
    });
    
    // Scream text
    this.showPointIndicator(demon.x, demon.y - 30, '😱 NOOO!', 0xff0000);
  }
  
  throwLie(x, y) {
    // Create a "lie" projectile
    const lieText = DEMON_LIES[Math.floor(Math.random() * DEMON_LIES.length)];
    
    const lie = this.add.container(x, y);
    const bg = this.add.rectangle(0, 0, lieText.length * 8 + 20, 24, 0x330000, 0.9)
      .setStrokeStyle(2, 0xff0000);
    const text = this.add.text(0, 0, lieText, {
      fontSize: '12px', fontStyle: 'bold', color: '#ff4444'
    }).setOrigin(0.5);
    lie.add([bg, text]);
    lie.setDepth(13);
    
    this.physics.world.enable(lie);
    lie.body.setVelocity(
      Phaser.Math.Between(-50, 50), // Slight horizontal spread
      DEMON_CONFIG.lieSpeed
    );
    lie.isLie = true;
    lie.lieText = lieText;
    
    this.demonLies.add(lie);
  }
  
  updateDemonLies(dt) {
    if (!this.demonLies) return;
    
    this.demonLies.getChildren().forEach(lie => {
      if (!lie || !lie.active) return;
      
      // Check if lie hit player
      if (this.hunter && this.hunter.active) {
        const dist = Phaser.Math.Distance.Between(lie.x, lie.y, this.hunter.x, this.hunter.y);
        if (dist < 40) {
          // Lie hit player!
          this.onLieHit(lie);
          return;
        }
      }
      
      // Remove if below ground
      if (lie.y > this.groundY + 50) {
        lie.destroy();
      }
    });
  }
  
  onLieHit(lie) {
    // Angel protection can block lies
    if (btState.angelProtectionActive) {
      const protection = ANGEL_PROTECTION[btState.angelProtectionLevel];
      if (Math.random() < protection.turdBlock) {
        this.showPointIndicator(lie.x, lie.y, '😇 LIE BLOCKED!', 0xffd700);
        lie.destroy();
        return;
      }
    }
    
    // Lie damages player
    const damage = DEMON_CONFIG.lieDamage;
    btState.health -= damage;
    this.showPointIndicator(this.hunter.x, this.hunter.y - 30, `${lie.lieText}`, 0xff4444);
    this.showNotification('😈 DEMON LIE HIT YOU! -' + damage + ' HP', 0xff4444);
    this.cameras.main.shake(100, 0.01);
    lie.destroy();
    
    // Check if player died
    if (btState.health <= 0) {
      btState.health = 0;
      this.triggerDeathAnimation('demon');
    }
  }
  
  // Check if bullet hit demon
  checkDemonHit(bullet) {
    if (!this.demons) return false;
    
    let hitDemon = false;
    this.demons.getChildren().forEach(demon => {
      if (!demon || !demon.active) return;
      
      const dist = Phaser.Math.Distance.Between(bullet.x, bullet.y, demon.x, demon.y);
      if (dist < 45) { // Bigger hitbox for boss
        const damage = bullet.damage || 1;
        demon.health -= damage;
        this.showPointIndicator(demon.x, demon.y, `-${damage}`, 0xffff00);
        
        // Boss health bar indicator
        const healthPct = Math.max(0, demon.health / DEMON_CONFIG.health);
        this.showPointIndicator(demon.x, demon.y + 30, `HP: ${'█'.repeat(Math.ceil(healthPct * 8))}${'░'.repeat(8 - Math.ceil(healthPct * 8))}`, 0xff4444);
        
        if (demon.health <= 0) {
          this.onDemonKilled(demon);
        }
        
        hitDemon = true;
      }
    });
    
    // Also check if bullet hit lies (shoot them down!)
    if (this.demonLies) {
      this.demonLies.getChildren().forEach(lie => {
        if (!lie || !lie.active) return;
        
        const dist = Phaser.Math.Distance.Between(bullet.x, bullet.y, lie.x, lie.y);
        if (dist < 30) {
          // Shot down a lie!
          btState.score += 25;
          this.showPointIndicator(lie.x, lie.y, '+25 TRUTH WINS!', 0x22c55e);
          lie.destroy();
          hitDemon = true;
        }
      });
    }
    
    return hitDemon;
  }

  // ========== CORRUPT GLOBALIST VILLAIN SYSTEM ==========
  // DRAIN THE SWAMP! Arrest corrupt politicians and globalists!
  
  updateVillains(dt) {
    if (!this.villains) return;
    
    // Get level-based spawn settings
    const level = btState.currentLevel || 1;
    const levelConfig = VILLAIN_CONFIG.levelMultipliers[level] || { chance: 0, interval: 999 };
    const spawnChance = levelConfig.chance;
    const spawnInterval = levelConfig.interval;
    
    // Spawn timer
    this.villainSpawnTimer += dt;
    if (this.villainSpawnTimer >= spawnInterval) {
      this.villainSpawnTimer = 0;
      if (level >= VILLAIN_CONFIG.minLevel && Math.random() < spawnChance) {
        this.spawnVillain();
        
        // Swamp level messages (level 7)
        if (level === 7 && Math.random() < 0.35) {
          const msg = SWAMP_MESSAGES[Math.floor(Math.random() * SWAMP_MESSAGES.length)];
          this.showNotification(msg, 0xff4444);
        }
        
        // White House level messages (level 8)
        if (level === 8 && Math.random() < 0.25) {
          const msg = WHITEHOUSE_SWAMP_MESSAGES[Math.floor(Math.random() * WHITEHOUSE_SWAMP_MESSAGES.length)];
          this.showNotification(msg, 0xff4444);
        }
      }
    }
    
    // SWAMP LEVEL INTRO - spawn massive wave!
    if (level === 7 && !this.swampWaveTriggered) {
      this.swampWaveTriggered = true;
      this.showNotification('WELCOME TO THE SWAMP!', 0x4a5d23);
      this.showNotification('DRAIN THE SWAMP FROM THESE WOKE TURD GLOBALISTS!', 0xff0000);
      this.showNotification('STOP THEM FROM GETTING TO THE WHITE HOUSE!', 0xffd700);
      this.showNotification('PRESS E TO ARREST FOR BIG POINTS!', 0x22c55e);
      this.showScripturePopup({ 
        verse: "When the righteous thrive, the people rejoice; when the wicked rule, the people groan.", 
        ref: "Proverbs 29:2" 
      }, 0xffd700);
      
      // Spawn 8 villains in quick succession - IT'S THE SWAMP!
      for (let i = 0; i < 8; i++) {
        this.time.delayedCall(i * 600, () => this.spawnVillain());
      }
    }
    
    // White House intro (level 8)
    if (level === 8 && !this.whiteHouseIntroTriggered) {
      this.whiteHouseIntroTriggered = true;
      this.showNotification('YOU MADE IT TO THE WHITE HOUSE!', 0x1e40af);
      this.showNotification('CATCH THE STRAGGLERS FROM THE SWAMP!', 0xffd700);
    }
    
    // Update existing villains
    this.villains.getChildren().forEach(villain => {
      if (!villain || !villain.active || villain.arrested) return;
      
      // Move villain - trying to reach the White House!
      const speedMult = level === 7 ? 1.2 : 1.0;
      villain.x += villain.direction * villain.villainSpeed * speedMult * dt;
      
      // Bobbing walk animation (only for non-animated sprites)
      if (!villain.isAnimatedSprite) {
        villain.y = villain.baseY + Math.sin(Date.now() / 200) * 3;
      }
      
      // Move title tag with villain
      if (villain.titleTag) {
        villain.titleTag.x = villain.x;
        villain.titleTag.y = villain.y - 60;
      }
      
      // Update escape timer
      villain.escapeTimer -= dt;
      if (villain.escapeTimer <= 0) {
        // Villain escaped!
        this.showNotification('WOKE TURD GLOBALIST ESCAPED!', 0xff4444);
        if (villain.titleTag) villain.titleTag.destroy();
        villain.destroy();
        return;
      }
      
      // Remove if off screen
      const view = this.cameras.main.worldView;
      if (villain.x < view.x - 100 || villain.x > view.right + 100) {
        if (villain.titleTag) villain.titleTag.destroy();
        villain.destroy();
        return;
      }
      
      // GLOBALISTS SHOOT TURDS AT THE PLAYER!
      villain.lastTurdShot = (villain.lastTurdShot || 0) + dt;
      if (villain.lastTurdShot >= villain.turdCooldown) {
        villain.lastTurdShot = 0;
        villain.turdCooldown = 2 + Math.random() * 3; // Reset cooldown
        
        // Only shoot if player is nearby (within 300 pixels)
        if (this.hunter && Phaser.Math.Distance.Between(villain.x, villain.y, this.hunter.x, this.hunter.y) < 300) {
          this.globalistShootTurd(villain);
        }
      }
      
      // Swamp level - villains taunt more with their own quotes!
      if (level === 7 && Math.random() < 0.002) {
        const quotes = villain.globalistQuotes || GLOBALIST_QUOTES;
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        this.showVillainQuote(villain, quote);
      }
    });
  }
  
  spawnVillain() {
    const view = this.cameras.main.worldView;
    
    // Pick random globalist type (1-4)
    const globalistType = WOKE_GLOBALIST_TYPES[Math.floor(Math.random() * WOKE_GLOBALIST_TYPES.length)];
    const typeNum = globalistType.type;
    
    // Spawn from left or right
    const fromLeft = Math.random() > 0.5;
    const x = fromLeft ? view.x - 50 : view.right + 50;
    const y = this.groundY - 50;
    
    // Create animated globalist sprite
    const walkKey = `globalist_${typeNum}_walk`;
    let villain;
    
    // Scale factors for each type to normalize size (target ~80px tall)
    const scaleFactors = {
      1: 0.15,  // Globalist 1: 508px tall -> 0.15 = ~76px
      2: 0.20,  // Globalist 2: 396px tall -> 0.20 = ~79px
      3: 0.15,  // Globalist 3: 532px tall -> 0.15 = ~80px
      4: 0.17   // Globalist 4: 480px tall -> 0.17 = ~82px
    };
    const scale = scaleFactors[typeNum] || 0.15;
    
    // Try to use animated sprite, fallback to container
    if (this.textures.exists(walkKey)) {
      villain = this.add.sprite(x, y, walkKey).setScale(scale);
      
      // Create walk animation if not exists
      const walkAnimKey = `globalist_${typeNum}_walk_anim`;
      if (!this.anims.exists(walkAnimKey)) {
        const texture = this.textures.get(walkKey);
        const frameCount = texture.frameTotal - 1; // Subtract 1 for __BASE frame
        this.anims.create({
          key: walkAnimKey,
          frames: this.anims.generateFrameNumbers(walkKey, { start: 0, end: Math.max(0, frameCount - 1) }),
          frameRate: 8,
          repeat: -1
        });
      }
      villain.play(walkAnimKey);
      villain.isAnimatedSprite = true;
    } else {
      // Fallback to drawn container
      villain = this.add.container(x, y);
      this.drawCartoonGlobalist(villain, globalistType);
      villain.isAnimatedSprite = false;
    }
    
    // Title tag above head
    const titleTag = this.add.text(x, y - 50, globalistType.title, {
      fontSize: '11px', fontStyle: 'bold', color: '#ff4444',
      backgroundColor: 'rgba(0,0,0,0.85)', padding: { x: 5, y: 3 }
    }).setOrigin(0.5).setDepth(15);
    villain.titleTag = titleTag;
    
    villain.setDepth(12);
    
    // Physics
    this.physics.world.enable(villain);
    if (villain.body) {
      villain.body.setSize(40, 60);
      villain.body.setOffset(-20, -30);
    }
    
    // Store globalist data
    villain.globalistType = typeNum;
    villain.globalistConfig = globalistType;
    villain.globalistTitle = globalistType.title;
    villain.villainPoints = globalistType.points;
    villain.villainCoins = globalistType.coins;
    villain.villainSpeed = globalistType.speed;
    villain.direction = fromLeft ? 1 : -1;
    villain.baseY = y;
    villain.escapeTimer = VILLAIN_CONFIG.escapeTime;
    villain.arrested = false;
    villain.isGlobalist = true;
    villain.lastTurdShot = 0;
    villain.turdCooldown = 3 + Math.random() * 4; // 3-7 seconds between shots
    villain.globalistQuotes = globalistType.quotes || GLOBALIST_QUOTES;
    villain.spriteScale = scale;
    
    // Flip if walking left
    if (!fromLeft) {
      if (villain.setFlipX) villain.setFlipX(true);
      else if (villain.setScale) villain.setScale(-scale, scale);
    }
    
    this.villains.add(villain);
    
    // Announcement with scripture
    const scripture = SPIRITUAL_WARFARE_SCRIPTURES[Math.floor(Math.random() * SPIRITUAL_WARFARE_SCRIPTURES.length)];
    this.showNotification(`${globalistType.title.toUpperCase()} SPOTTED! Press E to ARREST!`, 0xff4444);
    
    // Show scripture on first spawn in swamp
    if (!this.shownSwampScripture && btState.currentLevel === 7) {
      this.shownSwampScripture = true;
      this.time.delayedCall(500, () => {
        this.showScripturePopup(scripture, 0xffd700);
      });
    }
    
    // Random quote bubble from their specific quotes
    this.time.delayedCall(2000 + Math.random() * 2000, () => {
      if (villain && villain.active && !villain.arrested) {
        const quotes = villain.globalistQuotes;
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        this.showVillainQuote(villain, quote);
      }
    });
  }
  
  // Globalist shoots a turd at the player!
  globalistShootTurd(villain) {
    if (!villain || !villain.active || villain.arrested || !this.hunter) return;
    
    const turdX = villain.x;
    const turdY = villain.y - 20;
    
    // Create the turd projectile
    const turd = this.add.text(turdX, turdY, '💩', { fontSize: '24px' }).setOrigin(0.5).setDepth(50);
    
    // Calculate direction to player
    const dx = this.hunter.x - turdX;
    const dy = (this.hunter.y - 30) - turdY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const speed = 200;
    const vx = (dx / dist) * speed;
    const vy = (dy / dist) * speed;
    
    // Animate the turd flying
    const turdLife = { time: 0 };
    const turdUpdate = this.time.addEvent({
      delay: 16,
      callback: () => {
        turdLife.time += 0.016;
        turd.x += vx * 0.016;
        turd.y += vy * 0.016;
        
        // Spin the turd!
        turd.angle += 15;
        
        // Check collision with player
        if (this.hunter && Phaser.Math.Distance.Between(turd.x, turd.y, this.hunter.x, this.hunter.y - 30) < 30) {
          // HIT THE PLAYER!
          this.globalistTurdHit(turd);
          turdUpdate.destroy();
          return;
        }
        
        // Remove if off screen or too old
        if (turdLife.time > 3 || turd.y > this.groundY || turd.y < 0) {
          turd.destroy();
          turdUpdate.destroy();
        }
      },
      loop: true
    });
  }
  
  globalistTurdHit(turd) {
    if (!this.hunter) return;
    
    // Splat effect
    this.showNotification('WOKE TURD HIT! Globalist got you!', 0x8B4513);
    
    // Damage player
    btState.turdMeter += 8;
    btState.turdCount++;
    
    // Show splat
    const splat = this.add.text(this.hunter.x, this.hunter.y - 50, '💩 SPLAT!', {
      fontSize: '16px', color: '#8B4513', fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(100);
    
    this.tweens.add({
      targets: splat,
      y: splat.y - 30,
      alpha: 0,
      duration: 1000,
      onComplete: () => splat.destroy()
    });
    
    // Destroy the turd
    turd.destroy();
    
    // Check for game over
    if (btState.turdMeter >= btState.maxTurdMeter) {
      this.triggerTurdDeath();
    }
  }
  
  drawCartoonGlobalist(container, config) {
    // Body (suit/outfit)
    const body = this.add.ellipse(0, 0, 35, 50, config.bodyColor).setStrokeStyle(2, 0x000000);
    
    // Head
    const head = this.add.circle(0, -35, 18, config.headColor).setStrokeStyle(2, 0x000000);
    
    // Eyes (beady, shifty)
    const eyeL = this.add.circle(-6, -38, 4, 0xffffff).setStrokeStyle(1, 0x000000);
    const eyeR = this.add.circle(6, -38, 4, 0xffffff).setStrokeStyle(1, 0x000000);
    const pupilL = this.add.circle(-5, -38, 2, 0x000000);
    const pupilR = this.add.circle(7, -38, 2, 0x000000);
    
    // Smug mouth
    const mouth = this.add.graphics();
    mouth.lineStyle(2, 0x000000);
    mouth.beginPath();
    mouth.moveTo(-6, -28);
    mouth.quadraticCurveTo(0, -24, 6, -28);
    mouth.strokePath();
    
    // Smug eyebrows (raised)
    const browL = this.add.rectangle(-6, -45, 8, 2, config.hairColor || 0x333333).setAngle(-10);
    const browR = this.add.rectangle(6, -45, 8, 2, config.hairColor || 0x333333).setAngle(10);
    
    container.add([body, head, eyeL, eyeR, pupilL, pupilR, mouth, browL, browR]);
    
    // Draw hair based on style
    this.drawGlobalistHair(container, config);
    
    // Draw accessory
    this.drawGlobalistAccessory(container, config);
    
    // Tie (always has one - they're fancy)
    const tie = this.add.polygon(0, -10, [[0,-12],[6,12],[-6,12]], 0xff0000).setStrokeStyle(1, 0x880000);
    container.add(tie);
  }
  
  drawGlobalistHair(container, config) {
    const hairColor = config.hairColor || 0x333333;
    
    switch(config.hairStyle) {
      case 'bald':
        // Just a shine spot
        const shine = this.add.circle(-3, -50, 4, 0xffffff, 0.3);
        container.add(shine);
        break;
      case 'combover':
        const comb = this.add.ellipse(-5, -50, 20, 8, hairColor).setAngle(-20);
        container.add(comb);
        break;
      case 'wavy':
        for (let i = -12; i <= 12; i += 6) {
          const wave = this.add.circle(i, -52 + Math.sin(i/3)*2, 5, hairColor);
          container.add(wave);
        }
        break;
      case 'slick':
        const slick = this.add.ellipse(0, -50, 22, 10, hairColor);
        container.add(slick);
        break;
      case 'curly':
        for (let i = 0; i < 8; i++) {
          const curl = this.add.circle(-10 + i*3, -50 + (i%2)*3, 4, hairColor);
          container.add(curl);
        }
        break;
      case 'ponytail':
        const base = this.add.ellipse(0, -50, 18, 8, hairColor);
        const tail = this.add.ellipse(12, -45, 6, 15, hairColor).setAngle(30);
        container.add([base, tail]);
        break;
      case 'mohawk':
        for (let i = 0; i < 5; i++) {
          const spike = this.add.triangle(0, -55 - i*3, -4, 5, 4, 5, 0, -5, hairColor);
          container.add(spike);
        }
        break;
      case 'spiky':
        for (let i = -10; i <= 10; i += 5) {
          const spike = this.add.triangle(i, -52, -3, 5, 3, 5, 0, -8, hairColor);
          container.add(spike);
        }
        break;
      case 'afro':
        const afro = this.add.circle(0, -48, 22, hairColor);
        container.add(afro);
        break;
      case 'parted':
        const left = this.add.ellipse(-8, -50, 12, 8, hairColor);
        const right = this.add.ellipse(8, -50, 12, 8, hairColor);
        container.add([left, right]);
        break;
      case 'messy':
        for (let i = 0; i < 10; i++) {
          const mess = this.add.circle(Phaser.Math.Between(-12, 12), Phaser.Math.Between(-55, -48), 4, hairColor);
          container.add(mess);
        }
        break;
      case 'bowlcut':
        const bowl = this.add.ellipse(0, -48, 24, 12, hairColor);
        container.add(bowl);
        break;
      case 'bun':
        const bunBase = this.add.ellipse(0, -50, 18, 6, hairColor);
        const bunTop = this.add.circle(0, -58, 8, hairColor);
        container.add([bunBase, bunTop]);
        break;
      case 'flat':
        const flat = this.add.rectangle(0, -52, 24, 8, hairColor);
        container.add(flat);
        break;
      case 'hipster':
        const hipBase = this.add.ellipse(0, -50, 20, 8, hairColor);
        const hipSide = this.add.rectangle(-14, -42, 4, 12, hairColor);
        container.add([hipBase, hipSide]);
        break;
      case 'dyed':
        for (let i = -10; i <= 10; i += 4) {
          const dye = this.add.circle(i, -52, 5, hairColor);
          container.add(dye);
        }
        break;
      case 'punk':
        const punkBase = this.add.ellipse(0, -50, 20, 6, hairColor);
        for (let i = -8; i <= 8; i += 4) {
          const pSpike = this.add.triangle(i, -55, -2, 4, 2, 4, 0, -10, hairColor);
          container.add(pSpike);
        }
        container.add(punkBase);
        break;
      case 'shaved':
        const shaved = this.add.ellipse(0, -50, 20, 6, hairColor).setAlpha(0.5);
        container.add(shaved);
        break;
      case 'wild':
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          const wild = this.add.circle(Math.cos(angle) * 14, -48 + Math.sin(angle) * 8, 5, hairColor);
          container.add(wild);
        }
        break;
      default:
        const defaultHair = this.add.ellipse(0, -50, 18, 8, hairColor);
        container.add(defaultHair);
    }
  }
  
  drawGlobalistAccessory(container, config) {
    switch(config.accessory) {
      case 'glasses':
        const glassL = this.add.circle(-6, -38, 6, 0x000000, 0).setStrokeStyle(2, 0x000000);
        const glassR = this.add.circle(6, -38, 6, 0x000000, 0).setStrokeStyle(2, 0x000000);
        const bridge = this.add.rectangle(0, -38, 6, 2, 0x000000);
        container.add([glassL, glassR, bridge]);
        break;
      case 'sunglasses':
        const sunL = this.add.ellipse(-6, -38, 8, 6, 0x000000);
        const sunR = this.add.ellipse(6, -38, 8, 6, 0x000000);
        const sunBridge = this.add.rectangle(0, -38, 4, 2, 0x000000);
        container.add([sunL, sunR, sunBridge]);
        break;
      case 'monocle':
        const mono = this.add.circle(6, -38, 7, 0x000000, 0).setStrokeStyle(2, 0xffd700);
        const chain = this.add.rectangle(10, -30, 1, 12, 0xffd700);
        container.add([mono, chain]);
        break;
      case 'bowtie':
        const bowL = this.add.triangle(-5, -15, 0, 0, 8, 4, 8, -4, 0xff0000);
        const bowR = this.add.triangle(5, -15, 0, 0, -8, 4, -8, -4, 0xff0000);
        const bowC = this.add.circle(0, -15, 3, 0xaa0000);
        container.add([bowL, bowR, bowC]);
        break;
      case 'earpiece':
        const ear = this.add.rectangle(14, -38, 3, 8, 0x222222);
        const wire = this.add.rectangle(14, -28, 1, 15, 0x222222);
        container.add([ear, wire]);
        break;
      case 'scarf':
        const scarf = this.add.rectangle(0, -18, 30, 6, 0x884400);
        const scarfEnd = this.add.rectangle(12, -10, 6, 12, 0x884400);
        container.add([scarf, scarfEnd]);
        break;
      case 'gold_chain':
        const chainG = this.add.ellipse(0, -8, 20, 8, 0x000000, 0).setStrokeStyle(3, 0xffd700);
        container.add(chainG);
        break;
      case 'headset':
        const headband = this.add.ellipse(0, -50, 26, 12, 0x000000, 0).setStrokeStyle(3, 0x333333);
        const mic = this.add.rectangle(-14, -35, 3, 10, 0x333333);
        const micEnd = this.add.circle(-14, -28, 4, 0x333333);
        container.add([headband, mic, micEnd]);
        break;
      case 'clipboard':
        const clip = this.add.rectangle(18, -5, 10, 14, 0x886644).setStrokeStyle(1, 0x000000);
        const paper = this.add.rectangle(18, -3, 8, 10, 0xffffff);
        container.add([clip, paper]);
        break;
      case 'badge':
        const badge = this.add.rectangle(-12, -5, 8, 10, 0xffd700).setStrokeStyle(1, 0x000000);
        container.add(badge);
        break;
      case 'labcoat':
        const coat = this.add.rectangle(0, 5, 40, 20, 0xffffff, 0.7).setStrokeStyle(1, 0xcccccc);
        container.add(coat);
        break;
      case 'lanyard':
        const lany = this.add.rectangle(0, -5, 2, 25, 0x0000ff);
        const lanyBadge = this.add.rectangle(0, 12, 10, 14, 0xffffff).setStrokeStyle(1, 0x000000);
        container.add([lany, lanyBadge]);
        break;
      case 'phone':
        const phone = this.add.rectangle(16, -35, 6, 10, 0x222222).setStrokeStyle(1, 0x000000);
        container.add(phone);
        break;
      case 'mic':
        const micStand = this.add.rectangle(16, -30, 3, 15, 0x333333);
        const micTop = this.add.circle(16, -40, 5, 0x444444);
        container.add([micStand, micTop]);
        break;
      case 'camera':
        const cam = this.add.rectangle(16, -35, 12, 8, 0x222222).setStrokeStyle(1, 0x000000);
        const lens = this.add.circle(16, -35, 3, 0x444444);
        container.add([cam, lens]);
        break;
      case 'tablet':
        const tab = this.add.rectangle(16, -30, 10, 14, 0x333333).setStrokeStyle(1, 0x000000);
        const screen = this.add.rectangle(16, -30, 8, 11, 0x4488ff);
        container.add([tab, screen]);
        break;
      case 'vr_headset':
        const vr = this.add.rectangle(0, -38, 20, 10, 0x222222);
        const vrStrap = this.add.ellipse(0, -42, 26, 8, 0x000000, 0).setStrokeStyle(2, 0x333333);
        container.add([vr, vrStrap]);
        break;
      case 'pin':
        const pin = this.add.circle(-10, -8, 4, 0xff0000).setStrokeStyle(1, 0xffd700);
        container.add(pin);
        break;
      default:
        // No accessory
        break;
    }
  }
  
  showVillainQuote(villain, quote) {
    if (!villain || !villain.active) return;
    
    const bubble = this.add.container(villain.x, villain.y - 90);
    
    const bg = this.add.rectangle(0, 0, quote.length * 5 + 20, 30, 0x000000, 0.8)
      .setStrokeStyle(2, 0xff4444);
    const text = this.add.text(0, 0, `"${quote}"`, {
      fontSize: '10px', color: '#ffffff', fontStyle: 'italic'
    }).setOrigin(0.5);
    
    bubble.add([bg, text]);
    bubble.setDepth(100);
    
    // Float up and fade
    this.tweens.add({
      targets: bubble,
      y: bubble.y - 30,
      alpha: 0,
      duration: 3000,
      onComplete: () => bubble.destroy()
    });
  }
  
  // ========== NET GUN SYSTEM ==========
  // ========== ARREST SYSTEM - Press E to arrest globalists! ==========
  
  tryArrestGlobalist() {
    if (!this.hunter || this.gameOver) return;
    
    // Find nearest globalist within arrest range
    let nearestVillain = null;
    let nearestDist = VILLAIN_CONFIG.arrestRange;
    
    this.villains.getChildren().forEach(villain => {
      if (!villain || !villain.active || villain.arrested) return;
      
      const dist = Phaser.Math.Distance.Between(this.hunter.x, this.hunter.y, villain.x, villain.y);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestVillain = villain;
      }
    });
    
    if (nearestVillain) {
      this.arrestGlobalist(nearestVillain);
    } else {
      // Check if any globalists on screen
      const hasVillains = this.villains.getChildren().some(v => v && v.active && !v.arrested);
      if (hasVillains) {
        this.showNotification('Get closer to arrest! Press E when near!', 0xffaa00);
      }
    }
  }
  
  arrestGlobalist(villain) {
    if (!villain || villain.arrested) return;
    
    villain.arrested = true;
    this.arrestedCount++;
    
    // Stop movement
    if (villain.body) villain.body.setVelocity(0, 0);
    
    // Random arrest quote
    const arrestQuote = ARREST_QUOTES[Math.floor(Math.random() * ARREST_QUOTES.length)];
    
    // Points and coins - BIG POINTS!
    btState.score += villain.villainPoints;
    this.addCoins(villain.villainCoins, 'Villain arrested!');
    
    // Show arrest effects
    this.showNotification(`${arrestQuote} +${villain.villainPoints} pts!`, 0x22c55e);
    this.showPointIndicator(villain.x, villain.y - 30, `+${villain.villainPoints}`, 0xffd700);
    
    // Globalist's reaction
    const reaction = GLOBALIST_QUOTES[Math.floor(Math.random() * GLOBALIST_QUOTES.length)];
    this.showVillainQuote(villain, reaction);
    
    // Handcuff animation
    const cuffs = this.add.text(villain.x, villain.y - 20, 'ARRESTED!', { 
      fontSize: '14px', fontStyle: 'bold', color: '#ff0000',
      backgroundColor: '#ffffff', padding: { x: 4, y: 2 }
    }).setOrigin(0.5).setDepth(101);
    
    // Flash red/blue like police lights
    let flashCount = 0;
    const flashInterval = setInterval(() => {
      if (flashCount >= 10) {
        clearInterval(flashInterval);
        return;
      }
      const color = flashCount % 2 === 0 ? 0xff0000 : 0x0000ff;
      villain.list.forEach(child => {
        if (child.setTint) child.setTint(color);
      });
      flashCount++;
    }, 150);
    
    this.playSound('powerup');
    
    // After flashing, show jail cell
    this.time.delayedCall(1500, () => {
      cuffs.destroy();
      this.showJailCell(villain);
    });
    
    // Bonus for multiple arrests
    if (this.arrestedCount >= 3 && this.arrestedCount % 3 === 0) {
      this.showNotification(`SWAMP DRAINER BONUS! ${this.arrestedCount} arrested! +500 pts`, 0xffd700);
      btState.score += 500;
    }
    
    // SWAMP LEVEL MEGA BONUS (Level 7)!
    if (btState.currentLevel === 7) {
      const swampBonus = 300;
      btState.score += swampBonus;
      this.addCoins(15, 'Swamp drained!');
      this.showPointIndicator(villain.x, villain.y - 80, `SWAMP BONUS +${swampBonus}!`, 0x4a5d23);
      
      // Track Swamp arrests
      if (!this.swampArrests) this.swampArrests = 0;
      this.swampArrests++;
      
      // Special milestones
      if (this.swampArrests === 5) {
        this.showNotification('SWAMP 25% DRAINED! Keep going patriot!', 0xffd700);
        btState.score += 500;
      } else if (this.swampArrests === 10) {
        this.showNotification('SWAMP 50% DRAINED! Halfway there!', 0xffd700);
        btState.score += 1000;
      } else if (this.swampArrests === 15) {
        this.showNotification('SWAMP 75% DRAINED! Almost clean!', 0xffd700);
        btState.score += 1500;
      } else if (this.swampArrests === 20) {
        this.showNotification('MASTER SWAMP DRAINER! SWAMP IS CLEAN! +3000!', 0xffd700);
        btState.score += 3000;
        this.createLevelCompleteFireworks();
      }
    }
    
    // WHITE HOUSE BONUS (Level 8)
    if (btState.currentLevel === 8) {
      const whBonus = 200;
      btState.score += whBonus;
      this.addCoins(10, 'White House!');
      this.showPointIndicator(villain.x, villain.y - 80, `WHITE HOUSE BONUS +${whBonus}!`, 0x1e40af);
    }
  }
  
  showJailCell(villain) {
    const cellX = villain.x;
    const cellY = this.groundY - 60;
    
    // Create jail cell
    const cell = this.add.container(cellX, cellY);
    
    // Bars
    const barColor = 0x444444;
    for (let i = -30; i <= 30; i += 15) {
      const bar = this.add.rectangle(i, 0, 4, 80, barColor);
      cell.add(bar);
    }
    
    // Top and bottom bars
    const topBar = this.add.rectangle(0, -40, 70, 6, barColor);
    const bottomBar = this.add.rectangle(0, 40, 70, 6, barColor);
    cell.add([topBar, bottomBar]);
    
    // JAIL sign
    const sign = this.add.text(0, -55, 'JAIL', {
      fontSize: '12px', fontStyle: 'bold', color: '#ffffff',
      backgroundColor: '#ff0000', padding: { x: 6, y: 3 }
    }).setOrigin(0.5);
    cell.add(sign);
    
    cell.setDepth(99);
    
    // Move villain into cell
    this.tweens.add({
      targets: villain,
      x: cellX,
      y: cellY,
      scale: 0.5,
      alpha: 0.8,
      duration: 500
    });
    
    // Cell + villain rises up and away (to jail!)
    this.time.delayedCall(1500, () => {
      this.showNotification('OFF TO JAIL! DRAINING THE SWAMP!', 0xffd700);
      
      this.tweens.add({
        targets: [cell, villain],
        y: '-=300',
        alpha: 0,
        duration: 2000,
        ease: 'Power1',
        onComplete: () => {
          cell.destroy();
          villain.destroy();
        }
      });
    });
  }

  spawnBirdWave() {
    const view = this.cameras.main.worldView;
    const isNight = this.currentScene && this.currentScene.night;
    const levelConfig = LEVEL_CONFIG[btState.currentLevel] || LEVEL_CONFIG[1];
    
    let species = Object.keys(speciesConfig).filter(k => {
      const cfg = speciesConfig[k];
      if (cfg.boss || cfg.groundBird) return false;
      if (cfg.nightOnly && !isNight) return false;
      return true;
    });
    
    // Spawn more birds at higher levels
    const baseCount = 1 + Math.floor(Math.random() * 3);
    const count = Math.min(5, baseCount + Math.floor(btState.currentLevel / 2));
    
    for (let i = 0; i < count; i++) {
      const key = species[Math.floor(Math.random() * species.length)];
      const cfg = speciesConfig[key];
      if (!cfg || !this.textures.exists(cfg.sprite)) continue;
      
      // BIRDS COME FROM THE RIGHT (player goes right toward White House)
      // Occasional bird from left for variety (20% chance)
      const fromLeft = Math.random() < 0.2;
      const startX = fromLeft ? view.x - 100 - i * 60 : view.right + 100 + i * 60;
      // Birds fly at reasonable height, not too high
      const startY = 100 + Math.random() * 150;
      const direction = fromLeft ? 1 : -1;
      
      // Bird size scaling - cfg.size is the intended scale (0.04-0.15)
      const depthScale = 0.9 + Math.random() * 0.2;
      // Use cfg.size with 2x multiplier for proper visibility
      const size = cfg.size * 2 * depthScale;
      
      const bird = this.birds.create(startX, startY, cfg.sprite)
        .setOrigin(0.5).setScale(size).setFlipX(direction > 0).setDepth(5 + depthScale * 5);
      
      if (bird.preFX) bird.preFX.addGlow(0xFFFFFF, 1, 0, false, 0.03, 6);
      bird.config = cfg;
      bird.direction = direction;
      bird.depthScale = depthScale; // Store for update loop
      bird.speed = cfg.speed + Math.random() * 30;
      bird.turdCooldown = 0.5 + Math.random() * 1.0; // Drop turds more often
      bird.phase = Math.random() * Math.PI * 2;
      bird.flapPhase = Math.random() * Math.PI * 2;
      bird.health = cfg.health || 1;
      bird.depthScale = depthScale;
      bird.body.setAllowGravity(false);
    }
  }

  spawnBossBird() {
    const view = this.cameras.main.worldView;
    // Only Pterodactyl spawns naturally - others must be purchased!
    const key = 'pterodactyl';
    const cfg = speciesConfig[key];
    if (!cfg || !this.textures.exists(cfg.sprite)) return;
    
    const fromLeft = Math.random() < 0.5;
    const bossScale = cfg.size * 2.5; // Boss is slightly larger than normal
    const bird = this.birds.create(fromLeft ? view.x - 200 : view.right + 200, 100, cfg.sprite)
      .setOrigin(0.5).setScale(bossScale).setFlipX(fromLeft).setDepth(20);
    
    bird.config = cfg;
    bird.direction = fromLeft ? 1 : -1;
    bird.speed = cfg.speed;
    bird.turdCooldown = 0.5;
    bird.phase = 0;
    bird.flapPhase = 0;
    bird.health = cfg.health || 1;
    bird.isBoss = true;
    bird.body.setAllowGravity(false);
    
    this.showNotification(`⚠️ BOSS: PTERODACTYL! (Buy others in Shop!)`);
  }

  // ========== WHITE HOUSE FINALE - RELEASE ALL BOSSES! ==========
  releaseAllBossesAtWhiteHouse() {
    if (btState.whiteHouseBossesReleased) return;
    btState.whiteHouseBossesReleased = true;
    
    // Epic announcement
    this.showNotification('🦅⚠️ ALL BOSS BIRDS RELEASED! PROTECT TRUMP! ⚠️🦅', 0xff0000);
    this.cameras.main.shake(500, 0.02);
    
    // Show scripture
    if (!btState.silentMode) {
      const scripture = { verse: "The battle is not yours, but God's!", ref: "2 Chronicles 20:15" };
      this.time.delayedCall(1000, () => {
        this.showScripturePopup(scripture, 0xffd700, 5000);
      });
    }
    
    // Spawn all 8 boss birds with staggered timing
    ALL_BOSS_BIRDS.forEach((boss, index) => {
      this.time.delayedCall(index * 2000, () => {
        this.spawnWhiteHouseBoss(boss, index);
      });
    });
  }
  
  spawnWhiteHouseBoss(bossData, index) {
    const view = this.cameras.main.worldView;
    const difficulty = DIFFICULTY_MODES[btState.difficulty] || DIFFICULTY_MODES.intermediate;
    
    // Check if texture exists
    const spriteKey = bossData.key;
    if (!this.textures.exists(spriteKey)) {
      console.log(`Boss sprite ${spriteKey} not found, using fallback`);
      return;
    }
    
    // Alternate spawn sides
    const fromLeft = index % 2 === 0;
    const startX = fromLeft ? view.x - 300 : view.right + 300;
    const startY = 50 + (index * 30) % 150; // Stagger heights
    
    const bird = this.birds.create(startX, startY, spriteKey)
      .setOrigin(0.5)
      .setScale(bossData.size * BIRD_SCALE * 2) // Bigger bosses!
      .setFlipX(fromLeft)
      .setDepth(20);
    
    // Apply difficulty modifier to health
    bird.health = Math.floor(bossData.health * difficulty.bossHealth);
    bird.maxHealth = bird.health;
    bird.direction = fromLeft ? 1 : -1;
    bird.speed = bossData.speed * difficulty.enemySpeed;
    bird.turdCooldown = 1.5;
    bird.phase = 0;
    bird.flapPhase = 0;
    bird.isBoss = true;
    bird.isWhiteHouseBoss = true;
    bird.bossName = bossData.name;
    bird.bossAbility = bossData.ability;
    bird.abilityTimer = 0;
    bird.body.setAllowGravity(false);
    
    // Add boss health bar
    this.createBossHealthBar(bird, bossData.name, bossData.color);
    
    // Announce this boss
    this.showNotification(`🦅 ${bossData.name.toUpperCase()} ATTACKS! ${bossData.desc}`, bossData.color);
  }
  
  createBossHealthBar(boss, name, color) {
    const barWidth = 80;
    const barHeight = 8;
    
    // Background
    const bgBar = this.add.rectangle(boss.x, boss.y - 50, barWidth + 4, barHeight + 4, 0x000000)
      .setOrigin(0.5).setDepth(25);
    
    // Health bar
    const healthBar = this.add.rectangle(boss.x, boss.y - 50, barWidth, barHeight, color)
      .setOrigin(0.5).setDepth(26);
    
    // Name tag
    const nameTag = this.add.text(boss.x, boss.y - 65, name, {
      fontSize: '10px', fontWeight: 'bold', color: '#ffffff',
      backgroundColor: 'rgba(0,0,0,0.8)', padding: { x: 4, y: 2 }
    }).setOrigin(0.5).setDepth(25);
    
    boss.healthBarBg = bgBar;
    boss.healthBar = healthBar;
    boss.nameTag = nameTag;
    boss.healthBarWidth = barWidth;
  }
  
  updateBossHealthBar(boss) {
    if (!boss.healthBar || !boss.active) return;
    
    // Update position
    boss.healthBarBg.setPosition(boss.x, boss.y - 50);
    boss.healthBar.setPosition(boss.x, boss.y - 50);
    boss.nameTag.setPosition(boss.x, boss.y - 65);
    
    // Update health bar width
    const healthPercent = boss.health / boss.maxHealth;
    boss.healthBar.setSize(boss.healthBarWidth * healthPercent, 8);
    
    // Change color based on health
    if (healthPercent < 0.3) {
      boss.healthBar.setFillStyle(0xff0000);
    } else if (healthPercent < 0.6) {
      boss.healthBar.setFillStyle(0xffaa00);
    }
  }
  
  destroyBossHealthBar(boss) {
    if (boss.healthBarBg) boss.healthBarBg.destroy();
    if (boss.healthBar) boss.healthBar.destroy();
    if (boss.nameTag) boss.nameTag.destroy();
  }
  
  onWhiteHouseBossDefeated(boss) {
    btState.bossesDefeated++;
    
    // Scripture on boss defeat
    if (!btState.silentMode) {
      const scriptures = [
        { verse: "The Lord is my strength and my shield!", ref: "Psalm 28:7" },
        { verse: "Thanks be to God who gives us the victory!", ref: "1 Corinthians 15:57" },
        { verse: "Greater is He that is in you!", ref: "1 John 4:4" }
      ];
      const scripture = scriptures[Math.floor(Math.random() * scriptures.length)];
      this.showScripturePopup(scripture, 0x22c55e, 3000);
    }
    
    this.showNotification(`✅ ${boss.bossName} DEFEATED! (${btState.bossesDefeated}/${btState.totalBossesToDefeat})`, 0x22c55e);
    
    // Clean up health bar
    this.destroyBossHealthBar(boss);
    
    // Check if all bosses defeated
    if (btState.bossesDefeated >= btState.totalBossesToDefeat) {
      this.triggerVictory();
    }
  }
  
  triggerVictory() {
    btState.gameWon = true;
    
    // Epic victory message
    this.showNotification('🏆🇺🇸 VICTORY! AMERICA IS SAVED! 🇺🇸🏆', 0xffd700);
    
    // Trump fist pump celebration
    this.trumpVictoryCelebration();
    
    // Victory scripture
    if (!btState.silentMode) {
      const scripture = VICTORY_SCRIPTURES[Math.floor(Math.random() * VICTORY_SCRIPTURES.length)];
      this.time.delayedCall(2000, () => {
        this.showScripturePopup(scripture, 0xffd700, 8000);
      });
    }
  }
  
  trumpVictoryCelebration() {
    // Make Trump do victory animation
    if (this.trumpNPC && this.trumpNPC.active) {
      // Fist pump animation
      const originalY = this.trumpNPC.y;
      this.tweens.add({
        targets: this.trumpNPC,
        y: originalY - 20,
        duration: 300,
        yoyo: true,
        repeat: 3,
        ease: 'Bounce.easeOut'
      });
      
      // Victory text above Trump
      const victoryText = this.add.text(this.trumpNPC.x, this.trumpNPC.y - 100, 
        'GOD BLESS AMERICA!', {
        fontSize: '18px', fontWeight: 'bold', color: '#ffd700',
        backgroundColor: 'rgba(0,0,0,0.9)', padding: { x: 10, y: 5 }
      }).setOrigin(0.5).setDepth(100);
      
      // Quote from Trump
      this.time.delayedCall(1500, () => {
        const trumpQuote = this.add.text(this.trumpNPC.x, this.trumpNPC.y - 130,
          '"We will NEVER stop fighting for America!"', {
          fontSize: '12px', fontStyle: 'italic', color: '#ffffff',
          backgroundColor: 'rgba(0,0,0,0.8)', padding: { x: 8, y: 4 }
        }).setOrigin(0.5).setDepth(100);
        
        // Fade out
        this.tweens.add({
          targets: [victoryText, trumpQuote],
          alpha: 0,
          duration: 5000,
          delay: 5000
        });
      });
    }
  }

  // Spawn specific boss type (called from shop purchases)
  spawnSpecificBoss(bossType) {
    const view = this.cameras.main.worldView;
    const cfg = speciesConfig[bossType];
    if (!cfg) return;
    
    const fromLeft = Math.random() < 0.5;
    const bossScale = cfg.size * 2.5; // Proper boss size
    const bird = this.birds.create(fromLeft ? view.x - 200 : view.right + 200, 100, cfg.sprite || bossType)
      .setOrigin(0.5).setScale(bossScale).setFlipX(fromLeft).setDepth(20);
    
    bird.config = cfg;
    bird.direction = fromLeft ? 1 : -1;
    bird.depthScale = 1; // Boss has fixed depth scale
    bird.speed = cfg.speed;
    bird.turdCooldown = 0.5;
    bird.phase = 0;
    bird.flapPhase = 0;
    bird.health = cfg.health || 1;
    bird.isBoss = true;
    bird.body.setAllowGravity(false);
    
    this.showNotification(`🎯 BOSS SUMMONED: ${bossType.toUpperCase()}!`);
    this.cameras.main.shake(300, 0.015);
  }

  spawnVehicle() {
    // Limit max vehicles on screen to prevent stacking
    if (this.vehicles && this.vehicles.getLength() >= 2) return;
    
    const view = this.cameras.main.worldView;
    
    const fromLeft = Math.random() < 0.5;
    const isGoodTractor = Math.random() < 0.4; // 40% chance of friendly cleanup tractor
    const startX = fromLeft ? view.x - 200 : view.right + 200;
    
    // Use STATIC sprites - more reliable, less crash-prone
    const spriteKey = isGoodTractor ? 'tractor_good' : 'tractor_bad';
    
    if (!this.textures.exists(spriteKey)) {
      console.warn('Tractor sprite not found:', spriteKey);
      return;
    }
    
    // Create shadow under vehicle
    const shadow = this.add.ellipse(startX, this.groundY + 4, 100, 30, 0x000000, 0.3)
      .setOrigin(0.5).setDepth(5);
    
    // Create tractor with static sprite
    const vehicle = this.vehicles.create(startX, this.groundY, spriteKey)
      .setOrigin(0.5, 1).setScale(0.3).setDepth(8);
    
    // Flip based on direction - sprites face LEFT by default
    // fromLeft = going right, so flip
    vehicle.setFlipX(fromLeft);
    
    if (vehicle.preFX) vehicle.preFX.addGlow(0xFFFFFF, 1.5, 0, false, 0.04, 8);
    vehicle.shadow = shadow;
    
    // === COPILOT SAFETY: Proper physics setup ===
    vehicle.body.setAllowGravity(false);
    vehicle.body.setImmovable(true);
    
    vehicle.speed = isGoodTractor ? 80 : (100 + Math.random() * 50);
    vehicle.direction = fromLeft ? 1 : -1;
    vehicle.bouncePhase = Math.random() * Math.PI * 2;
    vehicle.isGoodTractor = isGoodTractor;
    vehicle.tireHealth = 3;
    vehicle._isVehicle = true; // Tag for debug inspection
    
    // === COPILOT SAFETY: Cleanup handler for destroy ===
    vehicle.on('destroy', () => {
      // Clean up shadow when vehicle is destroyed
      if (vehicle.shadow && vehicle.shadow.active) {
        vehicle.shadow.destroy();
      }
      // Kill any pending tweens on this vehicle
      if (this.tweens) {
        this.tweens.killTweensOf(vehicle);
      }
    });
    
    // Play driver audio
    if (isGoodTractor) {
      this.playRealAudio('tractor_driver_good', 0.8);
      this.showNotification('🚜✨ CLEANUP TRACTOR! Scoops turds!');
    } else {
      this.playRealAudio('tractor_driver_bad', 0.8);
      this.showNotification('🚜⚠️ BAD TRACTOR! Jump or shoot tires!');
      
      // Add smoke puff effect for bad tractor
      vehicle.smokeOffset = fromLeft ? -30 : 30;
      vehicle.lastSmokeTime = 0;
    }
  }

  // ========== PHONE ZOMBIES - WAKE THEM UP! ==========
  spawnPhoneZombie() {
    if (!this.phoneZombies) {
      this.phoneZombies = this.add.group();
    }
    
    // Check max on screen
    if (this.phoneZombies.getLength() >= PHONE_ZOMBIE_CONFIG.maxOnScreen) return;
    
    const view = this.cameras.main.worldView;
    const zombieType = PHONE_ZOMBIE_TYPES[Math.floor(Math.random() * PHONE_ZOMBIE_TYPES.length)];
    
    // Spawn from either side
    const fromLeft = Math.random() > 0.5;
    const x = fromLeft ? view.x + 100 + Math.random() * 400 : view.right - 100 - Math.random() * 400;
    const y = this.groundY - 10;
    
    // Use Ludo zombie sprite - map type to sprite key
    let zombie;
    const spriteKey = `zombie_${zombieType.type}`;
    
    if (this.textures.exists(spriteKey)) {
      zombie = this.add.sprite(x, y, spriteKey).setScale(0.15).setOrigin(0.5, 1);
      zombie.isAnimatedSprite = true;
      zombie.setFlipX(fromLeft); // Face direction of movement
    } else {
      // Fallback: drawn phone zombie (shouldn't happen with Ludo assets)
      zombie = this.add.container(x, y);
      this.drawPhoneZombie(zombie, zombieType);
      zombie.isAnimatedSprite = false;
    }
    
    zombie.setDepth(10);
    this.physics.world.enable(zombie);
    if (zombie.body) {
      zombie.body.setAllowGravity(false);
      zombie.body.setSize(60, 100);
    }
    
    // Zombie properties
    zombie.zombieType = zombieType;
    zombie.isPhoneZombie = true;
    zombie.isAwake = false;
    zombie.isHelper = false;
    zombie.wanderDirection = fromLeft ? 1 : -1;
    zombie.wanderTimer = 0;
    zombie.quoteTimer = 5 + Math.random() * 5;
    zombie.helpTimer = 0;
    
    this.phoneZombies.add(zombie);
    
    // Initial quote
    this.time.delayedCall(1000, () => {
      if (zombie && zombie.active && !zombie.isAwake) {
        const quote = zombieType.quotes[Math.floor(Math.random() * zombieType.quotes.length)];
        this.showZombieQuote(zombie, quote, 0x888888);
      }
    });
  }
  
  drawPhoneZombie(container, zombieType) {
    const isFemale = zombieType.type.includes('girl') || zombieType.type.includes('woman');
    const isTeen = zombieType.type.includes('teen');
    const isAdult = !isTeen;
    
    // Scale - make them visible and cartoon-like (matching Ludo sprite sizes)
    const baseScale = isAdult ? 1.2 : 1.0;
    
    // ========== ZOMBIE STATE COLORS (Gray, Lifeless, Hypnotized) ==========
    const zombieSkinColor = 0x8a8a8a;      // Gray lifeless skin
    const zombieClothesMain = 0x4a4a4a;    // Dark gray clothes
    const zombieClothesAlt = 0x3a3a3a;     // Darker gray
    const zombieHairColor = isFemale ? 0x5a4a4a : 0x3a3a3a;  // Grayish hair
    const zombieEyeColor = 0xdddddd;       // Glazed, dead eyes
    const phoneGlowColor = 0x3b82f6;       // Hypnotic blue phone glow
    
    // ========== BODY PARTS (Cartoonish Style) ==========
    
    // Shadow under character
    const shadow = this.add.ellipse(0, 35 * baseScale, 30 * baseScale, 8 * baseScale, 0x000000, 0.3);
    
    // LEGS (slightly apart, shuffling pose)
    const legLeft = this.add.ellipse(-7 * baseScale, 25 * baseScale, 10 * baseScale, 22 * baseScale, zombieClothesAlt);
    const legRight = this.add.ellipse(7 * baseScale, 28 * baseScale, 10 * baseScale, 22 * baseScale, zombieClothesAlt);
    
    // SHOES
    const shoeLeft = this.add.ellipse(-8 * baseScale, 38 * baseScale, 12 * baseScale, 6 * baseScale, 0x2a2a2a);
    const shoeRight = this.add.ellipse(8 * baseScale, 40 * baseScale, 12 * baseScale, 6 * baseScale, 0x2a2a2a);
    
    // BODY (hunched forward - zombie posture)
    const bodyMain = this.add.ellipse(2 * baseScale, 0, 28 * baseScale, 35 * baseScale, zombieClothesMain);
    bodyMain.setAngle(8); // Hunched forward
    
    // ARMS
    const armLeft = this.add.ellipse(-16 * baseScale, 5 * baseScale, 8 * baseScale, 24 * baseScale, zombieSkinColor);
    armLeft.setAngle(-10);
    
    // Right arm holding phone up
    const armRight = this.add.ellipse(18 * baseScale, -8 * baseScale, 8 * baseScale, 26 * baseScale, zombieSkinColor);
    armRight.setAngle(-40); // Raised up holding phone
    
    // HANDS
    const handLeft = this.add.circle(-18 * baseScale, 18 * baseScale, 6 * baseScale, zombieSkinColor);
    const handRight = this.add.circle(28 * baseScale, -20 * baseScale, 7 * baseScale, zombieSkinColor);
    
    // HEAD (tilted down looking at phone)
    const headBase = this.add.ellipse(5 * baseScale, -28 * baseScale, 28 * baseScale, 32 * baseScale, zombieSkinColor);
    headBase.setAngle(15); // Looking down at phone
    
    // HAIR
    let hair;
    if (isFemale) {
      // Female: longer hair
      hair = this.add.ellipse(5 * baseScale, -42 * baseScale, 32 * baseScale, 18 * baseScale, zombieHairColor);
      const hairSide1 = this.add.ellipse(-10 * baseScale, -25 * baseScale, 10 * baseScale, 25 * baseScale, zombieHairColor);
      const hairSide2 = this.add.ellipse(20 * baseScale, -22 * baseScale, 8 * baseScale, 20 * baseScale, zombieHairColor);
      container.add([hairSide1, hairSide2]);
      
      // Ponytail for teen girl
      if (isTeen) {
        const ponytail = this.add.ellipse(20 * baseScale, -35 * baseScale, 10 * baseScale, 18 * baseScale, zombieHairColor);
        ponytail.setAngle(30);
        container.add(ponytail);
      }
    } else {
      // Male: short hair
      hair = this.add.ellipse(5 * baseScale, -42 * baseScale, 26 * baseScale, 12 * baseScale, zombieHairColor);
    }
    
    // FACE FEATURES
    // Eye whites
    const eyeWhite1 = this.add.ellipse(-2 * baseScale, -28 * baseScale, 8 * baseScale, 10 * baseScale, 0xffffff);
    const eyeWhite2 = this.add.ellipse(12 * baseScale, -26 * baseScale, 8 * baseScale, 10 * baseScale, 0xffffff);
    
    // Pupils (glazed over - dead stare - looking at phone)
    const pupil1 = this.add.circle(0 * baseScale, -26 * baseScale, 3 * baseScale, zombieEyeColor);
    const pupil2 = this.add.circle(14 * baseScale, -24 * baseScale, 3 * baseScale, zombieEyeColor);
    pupil1.zombieEye = true;
    pupil2.zombieEye = true;
    
    // Dark circles under eyes (tired from screen time)
    const eyeBag1 = this.add.ellipse(-2 * baseScale, -22 * baseScale, 10 * baseScale, 4 * baseScale, 0x555555, 0.4);
    const eyeBag2 = this.add.ellipse(12 * baseScale, -20 * baseScale, 10 * baseScale, 4 * baseScale, 0x555555, 0.4);
    
    // Mouth (slack-jawed, slightly open)
    const mouth = this.add.ellipse(6 * baseScale, -14 * baseScale, 8 * baseScale, 5 * baseScale, 0x333333);
    
    // ========== THE PHONE (Hypnotic Device) ==========
    const phoneX = 30 * baseScale;
    const phoneY = -22 * baseScale;
    
    // Phone glow (hypnotic effect)
    const phoneGlow = this.add.ellipse(phoneX, phoneY, 28 * baseScale, 32 * baseScale, phoneGlowColor, 0.35);
    
    // Phone body
    const phone = this.add.roundedRect ? 
      this.add.rectangle(phoneX, phoneY, 14 * baseScale, 24 * baseScale, 0x1a1a1a) :
      this.add.rectangle(phoneX, phoneY, 14 * baseScale, 24 * baseScale, 0x1a1a1a);
    phone.setStrokeStyle(1, 0x333333);
    
    // Phone screen (bright blue - the addiction)
    const phoneScreen = this.add.rectangle(phoneX, phoneY, 11 * baseScale, 19 * baseScale, phoneGlowColor);
    
    // Screen content (scrolling lines)
    const screenLine1 = this.add.rectangle(phoneX, phoneY - 5 * baseScale, 8 * baseScale, 2 * baseScale, 0xffffff, 0.5);
    const screenLine2 = this.add.rectangle(phoneX, phoneY, 8 * baseScale, 2 * baseScale, 0xffffff, 0.5);
    const screenLine3 = this.add.rectangle(phoneX, phoneY + 5 * baseScale, 8 * baseScale, 2 * baseScale, 0xffffff, 0.5);
    
    // Phone light reflection on face
    const faceGlow = this.add.ellipse(8 * baseScale, -25 * baseScale, 20 * baseScale, 25 * baseScale, phoneGlowColor, 0.15);
    
    // Animate phone glow (pulsing hypnotic effect)
    this.tweens.add({
      targets: phoneGlow,
      alpha: { from: 0.35, to: 0.55 },
      scaleX: { from: 1, to: 1.15 },
      scaleY: { from: 1, to: 1.15 },
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // Add clothing details based on character type
    if (isTeen && isFemale) {
      // Teen girl: add hair accessory (scrunchie)
      const scrunchie = this.add.circle(18 * baseScale, -38 * baseScale, 4 * baseScale, 0x666666);
      container.add(scrunchie);
    }
    if (isAdult && !isFemale) {
      // Adult man: add collar/tie hint
      const collar = this.add.triangle(2 * baseScale, -8 * baseScale, 0, 0, 8, 0, 4, 8, 0x555555);
      container.add(collar);
    }
    
    // ========== ADD ALL PARTS TO CONTAINER ==========
    container.add([
      shadow, legLeft, legRight, shoeLeft, shoeRight,
      bodyMain, armLeft, handLeft, armRight, handRight,
      hair, headBase, eyeWhite1, eyeWhite2, pupil1, pupil2,
      eyeBag1, eyeBag2, mouth,
      faceGlow, phoneGlow, phone, phoneScreen, screenLine1, screenLine2, screenLine3
    ]);
    
    // Store elements for transformation
    container.zombieElements = {
      body: bodyMain,
      head: headBase,
      armRight: armRight,
      handRight: handRight,
      pupil1: pupil1,
      pupil2: pupil2,
      eyeBag1: eyeBag1,
      eyeBag2: eyeBag2,
      phone: phone,
      phoneScreen: phoneScreen,
      phoneGlow: phoneGlow,
      faceGlow: faceGlow,
      screenLine1: screenLine1,
      screenLine2: screenLine2,
      screenLine3: screenLine3,
      hair: hair
    };
    
    // Name tag with zombie emoji
    const nameTag = this.add.text(0, -65 * baseScale, '📱 ' + zombieType.name, {
      fontSize: '10px', color: '#888888', fontStyle: 'bold',
      backgroundColor: 'rgba(0,0,0,0.85)', padding: { x: 5, y: 3 }
    }).setOrigin(0.5);
    container.add(nameTag);
    container.nameTag = nameTag;
    
    // Store info for later
    container.isFemale = isFemale;
    container.isTeen = isTeen;
    container.baseScale = baseScale;
  }
  
  showZombieQuote(zombie, quote, color = 0x888888) {
    if (!zombie || !zombie.active) return;
    
    const bubble = this.add.text(zombie.x, zombie.y - 70, quote, {
      fontSize: '10px', color: color === 0x888888 ? '#888888' : '#22c55e',
      backgroundColor: 'rgba(0,0,0,0.8)', padding: { x: 6, y: 4 },
      wordWrap: { width: 120 }
    }).setOrigin(0.5).setDepth(20);
    
    this.tweens.add({
      targets: bubble,
      y: bubble.y - 20,
      alpha: 0,
      duration: 3000,
      onComplete: () => bubble.destroy()
    });
  }
  
  // Spawn Bible pickup on ground
  spawnBiblePickup() {
    if (!this.biblePickups) {
      this.biblePickups = this.add.group();
    }
    
    // Check max on screen
    if (this.biblePickups.getLength() >= BIBLE_PICKUP_CONFIG.maxOnScreen) return;
    
    const view = this.cameras.main.worldView;
    const x = view.x + 200 + Math.random() * (view.width - 400);
    const y = this.groundY - 5;
    
    // Create Bible pickup
    let bible;
    if (this.textures.exists('bible_pickup')) {
      bible = this.add.sprite(x, y, 'bible_pickup').setScale(0.08);
    } else {
      // Fallback: drawn Bible
      bible = this.add.container(x, y);
      const book = this.add.rectangle(0, 0, 20, 25, 0x8b4513).setOrigin(0.5);
      const cross = this.add.text(0, 0, '✝', { fontSize: '14px', color: '#ffd700' }).setOrigin(0.5);
      const glow = this.add.circle(0, 0, 20, BIBLE_PICKUP_CONFIG.glowColor, 0.3);
      bible.add([glow, book, cross]);
    }
    
    bible.setDepth(8);
    bible.isBiblePickup = true;
    
    // Floating animation
    this.tweens.add({
      targets: bible,
      y: y - 8,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // Glow pulse
    if (bible.type === 'Container') {
      const glow = bible.list[0];
      this.tweens.add({
        targets: glow,
        alpha: 0.6,
        scaleX: 1.3,
        scaleY: 1.3,
        duration: 800,
        yoyo: true,
        repeat: -1
      });
    }
    
    this.biblePickups.add(bible);
    
    if (!btState.silentMode) {
      this.showNotification('📖 BIBLE appeared! Pick it up to wake people!', 0xffd700);
    }
  }
  
  // Player picks up Bible
  pickupBible(bible) {
    if (!bible || !bible.active) return;
    
    btState.biblesHeld = (btState.biblesHeld || 0) + 1;
    bible.destroy();
    
    this.showNotification(`📖 BIBLE COLLECTED! (${btState.biblesHeld} held) - Give to phone zombies!`, 0xffd700);
    
    // Update HUD
    this.updateBibleCount();
  }
  
  updateBibleCount() {
    if (this.bibleCountText) {
      this.bibleCountText.setText(`📖 ${btState.biblesHeld || 0}`);
    }
  }
  
  // Give Bible to phone zombie - WAKE THEM UP!
  wakeUpZombie(zombie) {
    if (!zombie || !zombie.active || zombie.isAwake) return;
    if (!btState.biblesHeld || btState.biblesHeld <= 0) {
      this.showNotification('📖 No Bibles! Find one on the ground first!', 0xff6666);
      return;
    }
    
    // Use a Bible
    btState.biblesHeld--;
    this.updateBibleCount();
    
    // WAKE UP!
    zombie.isAwake = true;
    btState.zombiesAwakened = (btState.zombiesAwakened || 0) + 1;
    
    // ========== DRAMATIC VISUAL TRANSFORMATION - SWAP TO AWAKENED SPRITE ==========
    const awakenedSpriteKey = `person_${zombie.zombieType.type}`;
    
    if (this.textures.exists(awakenedSpriteKey) && zombie.isAnimatedSprite) {
      // Flash effect before transformation
      this.tweens.add({
        targets: zombie,
        alpha: 0,
        duration: 150,
        yoyo: true,
        onYoyo: () => {
          // Swap to awakened sprite!
          zombie.setTexture(awakenedSpriteKey);
          zombie.setScale(0.15);
          
          // Celebration effect - bounce and glow
          this.tweens.add({
            targets: zombie,
            scaleX: 0.18,
            scaleY: 0.18,
            duration: 200,
            yoyo: true,
            ease: 'Bounce.easeOut'
          });
          
          // Golden glow around awakened person
          const glow = this.add.circle(zombie.x, zombie.y - 40, 60, 0xffd700, 0.3).setDepth(9);
          this.tweens.add({
            targets: glow,
            alpha: 0,
            scaleX: 2,
            scaleY: 2,
            duration: 1000,
            onComplete: () => glow.destroy()
          });
        }
      });
    } else if (!zombie.isAnimatedSprite) {
      // Fallback for drawn zombies - transform colors
      this.transformDrawnZombie(zombie);
    }
    
    // Points and coins!
    btState.score += PHONE_ZOMBIE_CONFIG.pointsForWaking;
    this.addCoins(PHONE_ZOMBIE_CONFIG.coinsForWaking);
    
    // Show woken quote
    const wokenQuote = zombie.zombieType.wokenQuotes[Math.floor(Math.random() * zombie.zombieType.wokenQuotes.length)];
    this.showZombieQuote(zombie, wokenQuote, 0x22c55e);
    
    // Brief on-screen notification (floating text, not intrusive popup)
    const notifyText = this.add.text(zombie.x, zombie.y - 80, '✝ SOUL AWAKENED!', {
      fontSize: '14px', fontWeight: 'bold', color: '#22c55e',
      stroke: '#000000', strokeThickness: 3
    }).setOrigin(0.5).setDepth(85);
    
    this.tweens.add({
      targets: notifyText,
      y: zombie.y - 140,
      alpha: 0,
      duration: 2000,
      ease: 'Power2',
      onComplete: () => notifyText.destroy()
    });
    
    // Scripture popup - show in SIDEBAR BANNER (not on game screen!)
    if (!btState.silentMode) {
      const wakeupScripture = WAKEUP_SCRIPTURES[Math.floor(Math.random() * WAKEUP_SCRIPTURES.length)];
      this.showScriptureInBanner(wakeupScripture, 'wake');
      
      // RAPTURE WARNING - Show every 3rd awakening in the sidebar
      if (btState.zombiesAwakened % 3 === 0) {
        this.time.delayedCall(7000, () => {
          const raptureScripture = RAPTURE_SCRIPTURES[Math.floor(Math.random() * RAPTURE_SCRIPTURES.length)];
          this.showScriptureInBanner(raptureScripture, 'rapture');
        });
      }
      
      // END TIMES SIGNS - Show every 5th awakening
      if (btState.zombiesAwakened % 5 === 0 && btState.zombiesAwakened > 0) {
        this.time.delayedCall(14000, () => {
          if (typeof END_TIMES_SIGNS_SCRIPTURES !== 'undefined') {
            const signsScripture = END_TIMES_SIGNS_SCRIPTURES[Math.floor(Math.random() * END_TIMES_SIGNS_SCRIPTURES.length)];
            this.showScriptureInBanner(signsScripture, 'signs');
          }
        });
      }
      
      // HOPE SCRIPTURE - Show every 7th awakening
      if (btState.zombiesAwakened % 7 === 0 && btState.zombiesAwakened > 0) {
        this.time.delayedCall(21000, () => {
          const hopeScripture = HOPE_SCRIPTURES[Math.floor(Math.random() * HOPE_SCRIPTURES.length)];
          this.showScriptureInBanner(hopeScripture, 'hope');
        });
      }
    }
    
    // Notification
    this.showNotification(`✝ ${zombie.zombieType.name} AWAKENED! +${PHONE_ZOMBIE_CONFIG.pointsForWaking} pts!`, 0x22c55e);
    
    // Celebration effect
    this.cameras.main.flash(200, 255, 215, 0, 0.3);
    
    // ✨ DIVINE GOLDEN POWDER EFFECT ✨
    // Gentle heavenly sparkles rain down on the awakened person
    this.createDivineGoldenPowder(zombie.x, zombie.y - 50);
    
    // After short delay, they become a helper!
    this.time.delayedCall(2000, () => {
      if (zombie && zombie.active) {
        this.convertToHelper(zombie);
      }
    });
  }
  
  // Show end times warning with scripture and message
  // Positioned at BOTTOM of screen to not interrupt gameplay
  showEndTimesWarning(scriptureData) {
    if (!scriptureData || btState.silentMode) return;
    
    const view = this.cameras.main.worldView;
    const centerX = view.centerX;
    const bottomY = view.bottom - 80; // Bottom of screen
    
    // Create warning box at bottom
    const warningBg = this.add.rectangle(centerX, bottomY, 450, 100, 0x000000, 0.9)
      .setOrigin(0.5).setDepth(90).setStrokeStyle(2, 0xffd700);
    
    // Header (smaller)
    const header = this.add.text(centerX, bottomY - 35, '⚠️ END TIMES WARNING', {
      fontSize: '11px', fontWeight: 'bold', color: '#ff6666'
    }).setOrigin(0.5).setDepth(91);
    
    // Scripture
    const verse = this.add.text(centerX, bottomY - 5, `"${scriptureData.verse}"`, {
      fontSize: '10px', fontStyle: 'italic', color: '#ffffff',
      wordWrap: { width: 420 }, align: 'center'
    }).setOrigin(0.5).setDepth(91);
    
    // Reference
    const ref = this.add.text(centerX, bottomY + 25, `— ${scriptureData.ref}`, {
      fontSize: '9px', color: '#ffd700'
    }).setOrigin(0.5).setDepth(91);
    
    // Message
    const message = this.add.text(centerX, bottomY + 42, scriptureData.message || '', {
      fontSize: '10px', fontWeight: 'bold', color: '#22c55e'
    }).setOrigin(0.5).setDepth(91);
    
    // Fade out after 5 seconds (shorter)
    this.time.delayedCall(5000, () => {
      this.tweens.add({
        targets: [warningBg, header, verse, ref, message],
        alpha: 0,
        duration: 800,
        onComplete: () => {
          warningBg.destroy();
          header.destroy();
          verse.destroy();
          ref.destroy();
          message.destroy();
        }
      });
    });
  }
  
  // ⚡ RAPTURE WARNING - God doesn't want anyone left behind! ⚡
  // Positioned at top-right corner to not interrupt gameplay
  showRaptureWarning(scriptureData) {
    if (!scriptureData || btState.silentMode) return;
    
    const view = this.cameras.main.worldView;
    const rightX = view.right - 220;  // Top right corner
    const topY = view.top + 100;
    
    // Subtle golden glow effect (not disruptive)
    this.cameras.main.flash(200, 255, 215, 0, 0.2);
    
    // Create rapture warning box - positioned at top right, smaller
    const warningBg = this.add.rectangle(rightX, topY, 400, 140, 0x000000, 0.92)
      .setOrigin(0.5).setDepth(90).setStrokeStyle(3, 0xffd700);
    
    // Subtle pulsing border
    this.tweens.add({
      targets: warningBg,
      strokeAlpha: { from: 1, to: 0.6 },
      duration: 800,
      yoyo: true,
      repeat: 4
    });
    
    // Header
    const header = this.add.text(rightX, topY - 50, '☁️ RAPTURE WARNING ☁️', {
      fontSize: '14px', fontWeight: 'bold', color: '#ffd700'
    }).setOrigin(0.5).setDepth(91);
    
    // Main message
    const mainMsg = this.add.text(rightX, topY - 30, 'God doesn\'t want ANYONE left behind!', {
      fontSize: '11px', fontWeight: 'bold', color: '#22c55e'
    }).setOrigin(0.5).setDepth(91);
    
    // Scripture
    const verse = this.add.text(rightX, topY + 5, `"${scriptureData.verse}"`, {
      fontSize: '10px', fontStyle: 'italic', color: '#ffffff',
      wordWrap: { width: 370 }, align: 'center'
    }).setOrigin(0.5).setDepth(91);
    
    // Reference
    const ref = this.add.text(rightX, topY + 40, `— ${scriptureData.ref}`, {
      fontSize: '9px', color: '#ffd700'
    }).setOrigin(0.5).setDepth(91);
    
    // Call to action
    const cta = this.add.text(rightX, topY + 58, scriptureData.message || 'Are YOU ready?', {
      fontSize: '11px', fontWeight: 'bold', color: '#f87171'
    }).setOrigin(0.5).setDepth(91);
    
    // Fade out after 6 seconds (shorter to not distract)
    this.time.delayedCall(6000, () => {
      this.tweens.add({
        targets: [warningBg, header, mainMsg, verse, ref, cta],
        alpha: 0,
        duration: 1000,
        onComplete: () => {
          warningBg.destroy();
          header.destroy();
          mainMsg.destroy();
          verse.destroy();
          ref.destroy();
          cta.destroy();
        }
      });
    });
  }
  
  // ✨ DIVINE GOLDEN POWDER EFFECT ✨
  // Creates gentle heavenly golden sparkles that rain down on awakened person
  createDivineGoldenPowder(x, y) {
    const numParticles = 40; // Number of sparkle particles
    const spreadX = 80; // Horizontal spread
    const spreadY = 120; // Vertical fall distance
    
    for (let i = 0; i < numParticles; i++) {
      // Stagger the creation for flowing effect
      this.time.delayedCall(i * 50, () => {
        // Random starting position above the zombie
        const startX = x + Phaser.Math.Between(-spreadX/2, spreadX/2);
        const startY = y - Phaser.Math.Between(0, 30);
        
        // Create golden sparkle particle
        const size = Phaser.Math.Between(3, 8);
        const particle = this.add.circle(startX, startY, size, 0xffd700);
        particle.setDepth(150);
        particle.setAlpha(0.9);
        
        // Add inner white glow for divine effect
        if (size > 5) {
          const innerGlow = this.add.circle(startX, startY, size * 0.5, 0xffffff);
          innerGlow.setDepth(151);
          innerGlow.setAlpha(0.8);
          
          // Animate inner glow with particle
          this.tweens.add({
            targets: innerGlow,
            y: startY + spreadY + Phaser.Math.Between(-20, 40),
            x: startX + Phaser.Math.Between(-30, 30),
            alpha: 0,
            scale: 0.3,
            duration: Phaser.Math.Between(1500, 2500),
            ease: 'Sine.easeIn',
            onComplete: () => innerGlow.destroy()
          });
        }
        
        // Gentle swaying fall animation
        const swayAmount = Phaser.Math.Between(-25, 25);
        const fallDuration = Phaser.Math.Between(1800, 3000);
        
        this.tweens.add({
          targets: particle,
          y: startY + spreadY + Phaser.Math.Between(-20, 50),
          x: { 
            value: startX + swayAmount, 
            duration: fallDuration / 3,
            yoyo: true,
            repeat: 2,
            ease: 'Sine.easeInOut'
          },
          alpha: { value: 0, duration: fallDuration, ease: 'Cubic.easeIn' },
          scale: { value: 0.2, duration: fallDuration, ease: 'Cubic.easeIn' },
          duration: fallDuration,
          ease: 'Sine.easeIn',
          onComplete: () => particle.destroy()
        });
        
        // Add occasional larger "star" sparkles
        if (i % 8 === 0) {
          this.createDivineStar(startX, startY - 20);
        }
      });
    }
    
    // Add a soft golden glow circle that fades
    const glowCircle = this.add.circle(x, y, 60, 0xffd700, 0.3);
    glowCircle.setDepth(100);
    this.tweens.add({
      targets: glowCircle,
      scale: 1.5,
      alpha: 0,
      duration: 2000,
      ease: 'Cubic.easeOut',
      onComplete: () => glowCircle.destroy()
    });
  }
  
  // Create a divine star burst effect
  createDivineStar(x, y) {
    const star = this.add.star(x, y, 4, 4, 12, 0xffffff);
    star.setDepth(152);
    star.setAlpha(0);
    
    // Fade in, spin, and fade out
    this.tweens.add({
      targets: star,
      alpha: { value: 1, duration: 200 },
      scale: { value: 1.5, duration: 500, yoyo: true },
      rotation: Math.PI * 2,
      y: y + 50,
      duration: 1200,
      ease: 'Cubic.easeOut',
      onComplete: () => star.destroy()
    });
  }
  
  // Convert awakened zombie to helper
  convertToHelper(zombie) {
    if (!zombie || !zombie.active) return;
    
    zombie.isHelper = true;
    zombie.helpTimer = PHONE_ZOMBIE_CONFIG.helpDuration;
    zombie.attackCooldown = 0;
    
    // Helper quote
    const helpQuote = zombie.zombieType.helpQuotes[Math.floor(Math.random() * zombie.zombieType.helpQuotes.length)];
    this.showZombieQuote(zombie, helpQuote, 0x22c55e);
    
    // Change appearance to show they're fighting
    if (!zombie.isAnimatedSprite && zombie.nameTag) {
      zombie.nameTag.setText('⚔️ HELPER!');
    }
    
    this.showNotification(`⚔️ ${zombie.zombieType.name} is now HELPING YOU FIGHT!`, 0x22c55e);
  }
  
  // Update phone zombies
  updatePhoneZombies(dt) {
    if (!this.phoneZombies) return;
    
    const view = this.cameras.main.worldView;
    const playerX = this.hunter ? this.hunter.x : view.centerX;
    
    this.phoneZombies.getChildren().forEach(zombie => {
      if (!zombie || !zombie.active) return;
      
      if (zombie.isHelper) {
        // HELPER BEHAVIOR - Attack nearby enemies!
        zombie.helpTimer -= dt;
        zombie.attackCooldown -= dt;
        
        if (zombie.helpTimer <= 0) {
          // Helper time expired
          this.showZombieQuote(zombie, "I must go spread the word!", 0x22c55e);
          this.tweens.add({
            targets: zombie,
            alpha: 0,
            x: zombie.x + (zombie.wanderDirection * 200),
            duration: 2000,
            onComplete: () => zombie.destroy()
          });
          return;
        }
        
        // Move toward nearest enemy
        let nearestEnemy = null;
        let nearestDist = 300;
        
        // Check demons
        if (this.demons) {
          this.demons.getChildren().forEach(demon => {
            if (demon && demon.active) {
              const dist = Phaser.Math.Distance.Between(zombie.x, zombie.y, demon.x, demon.y);
              if (dist < nearestDist) {
                nearestDist = dist;
                nearestEnemy = demon;
              }
            }
          });
        }
        
        // Check villains
        if (this.villains) {
          this.villains.getChildren().forEach(villain => {
            if (villain && villain.active && !villain.arrested) {
              const dist = Phaser.Math.Distance.Between(zombie.x, zombie.y, villain.x, villain.y);
              if (dist < nearestDist) {
                nearestDist = dist;
                nearestEnemy = villain;
              }
            }
          });
        }
        
        if (nearestEnemy) {
          // Move toward enemy
          const dir = nearestEnemy.x > zombie.x ? 1 : -1;
          zombie.x += dir * 60 * dt;
          if (zombie.setFlipX) zombie.setFlipX(dir > 0);
          
          // Attack if close enough
          if (nearestDist < 50 && zombie.attackCooldown <= 0) {
            zombie.attackCooldown = 1.5;
            this.helperAttack(zombie, nearestEnemy);
          }
        }
        
      } else if (!zombie.isAwake) {
        // ZOMBIE BEHAVIOR - Wander mindlessly
        zombie.wanderTimer -= dt;
        zombie.quoteTimer -= dt;
        
        if (zombie.wanderTimer <= 0) {
          zombie.wanderTimer = 3 + Math.random() * 4;
          zombie.wanderDirection = Math.random() > 0.5 ? 1 : -1;
        }
        
        // Slow mindless shuffle
        zombie.x += zombie.wanderDirection * 15 * dt;
        
        // Occasional zombie quote
        if (zombie.quoteTimer <= 0) {
          zombie.quoteTimer = 8 + Math.random() * 8;
          const quote = zombie.zombieType.quotes[Math.floor(Math.random() * zombie.zombieType.quotes.length)];
          this.showZombieQuote(zombie, quote, 0x888888);
        }
        
        // Check if player is near with Bible
        if (this.hunter && btState.biblesHeld > 0) {
          const dist = Phaser.Math.Distance.Between(zombie.x, zombie.y, this.hunter.x, this.hunter.y);
          if (dist < PHONE_ZOMBIE_CONFIG.wakeRange) {
            // Show prompt
            if (!zombie.promptShown) {
              zombie.promptShown = true;
              this.showZombieQuote(zombie, "Press V to give Bible!", 0xffd700);
            }
          } else {
            zombie.promptShown = false;
          }
        }
      }
      
      // Remove if off screen
      if (zombie.x < view.x - 200 || zombie.x > view.right + 200) {
        zombie.destroy();
      }
    });
  }
  
  // Helper attacks enemy
  helperAttack(helper, enemy) {
    // Visual attack effect
    const attackLine = this.add.line(0, 0, helper.x, helper.y, enemy.x, enemy.y, 0x22c55e)
      .setOrigin(0).setDepth(15).setLineWidth(2);
    
    this.time.delayedCall(200, () => attackLine.destroy());
    
    // Damage enemy
    if (enemy.isDemon) {
      enemy.health -= PHONE_ZOMBIE_CONFIG.helpDamage;
      if (enemy.health <= 0) {
        this.playDemonFlee(enemy);
        this.showNotification('✝ Helper defeated a demon!', 0x22c55e);
      }
    } else if (enemy.isGlobalist) {
      // Helper "arrests" globalist
      this.arrestVillain(enemy);
      this.showNotification('✝ Helper arrested a globalist!', 0x22c55e);
    }
    
    // Helper shout
    const shouts = ["Take that!", "For God!", "Truth wins!", "Freedom!"];
    this.showZombieQuote(helper, shouts[Math.floor(Math.random() * shouts.length)], 0x22c55e);
  }
  
  // Check for Bible pickup collision
  checkBiblePickups() {
    if (!this.biblePickups || !this.hunter) return;
    
    this.biblePickups.getChildren().forEach(bible => {
      if (!bible || !bible.active) return;
      
      const dist = Phaser.Math.Distance.Between(
        bible.x, bible.y,
        this.hunter.x, this.hunter.y
      );
      
      if (dist < BIBLE_PICKUP_CONFIG.pickupRange) {
        this.pickupBible(bible);
      }
    });
  }

  spawnPlane() {
    const view = this.cameras.main.worldView;
    const isHelicopter = Math.random() < 0.3;
    const isFighter = !isHelicopter && Math.random() < 0.4; // 40% of planes are fighters
    const texture = isHelicopter ? 'helicopter' : 'plane';
    if (!this.textures.exists(texture)) return;
    
    const fromLeft = Math.random() < 0.5;
    const depth = 0.3 + Math.random() * 0.7;
    const scale = 0.15 + depth * 0.25;
    const y = 30 + (1 - depth) * 100;
    
    const plane = this.planes.create(fromLeft ? view.x - 300 : view.right + 300, y, texture)
      .setOrigin(0.5).setScale(scale).setFlipX(fromLeft).setAlpha(0.6 + depth * 0.4).setDepth(-3 + depth * 5);
    
    plane.body.setAllowGravity(false);
    plane.speed = 150 + depth * 150;
    plane.direction = fromLeft ? 1 : -1;
    plane.isHelicopter = isHelicopter;
    plane.isFighter = isFighter;
    plane.bobPhase = Math.random() * Math.PI * 2;
    plane.hasDeployed = false;
    plane.shootCooldown = 0;
    plane.bombCooldown = 0;
    
    // Tint fighters red
    if (isFighter) {
      plane.setTint(0xff6666);
      this.showNotification('✈️ FIGHTER JET INCOMING!');
    }
  }

  spawnAnimal() {
    if (!this.currentScene || !this.currentScene.animals || this.currentScene.animals.length === 0) return;
    const key = this.currentScene.animals[Math.floor(Math.random() * this.currentScene.animals.length)];
    if (!groundAnimals[key] || !this.textures.exists(key)) return;
    
    const view = this.cameras.main.worldView;
    const fromLeft = Math.random() < 0.5;
    const startX = fromLeft ? view.x - 100 : view.right + 100;
    
    // Create shadow under animal
    const shadow = this.add.ellipse(startX, this.groundY + 3, 40, 15, 0x000000, 0.25)
      .setOrigin(0.5).setDepth(5);
    
    const animal = this.animals.create(startX, this.groundY - 10, key)
      .setOrigin(0.5, 1).setScale(0.15).setFlipX(fromLeft).setDepth(6);
    
    if (animal.preFX) animal.preFX.addGlow(0xFFFFFF, 1.5, 0, false, 0.04, 8);
    animal.shadow = shadow; // Link shadow to animal
    animal.body.setAllowGravity(false);
    animal.speed = groundAnimals[key].speed + Math.random() * 20;
    animal.direction = fromLeft ? 1 : -1;
    animal.walkPhase = Math.random() * Math.PI * 2;
    animal.animalType = key;
    animal.hasAttacked = false;
  }

  spawnNPC() {
    if (!this.currentScene || !this.currentScene.npcs || this.currentScene.npcs.length === 0) return;
    const key = this.currentScene.npcs[Math.floor(Math.random() * this.currentScene.npcs.length)];
    if (!npcTypes[key] || !this.textures.exists(key)) return;
    
    const view = this.cameras.main.worldView;
    const fromLeft = Math.random() < 0.5;
    const startX = fromLeft ? view.x - 80 : view.right + 80;
    
    // Create shadow under NPC
    const shadow = this.add.ellipse(startX, this.groundY + 3, 30, 12, 0x000000, 0.25)
      .setOrigin(0.5).setDepth(5);
    
    const npc = this.npcs.create(startX, this.groundY, key)
      .setOrigin(0.5, 1).setScale(0.15).setFlipX(fromLeft).setDepth(7);
    
    if (npc.preFX) npc.preFX.addGlow(0xFFFFFF, 1.5, 0, false, 0.04, 8);
    npc.shadow = shadow; // Link shadow to NPC
    npc.body.setAllowGravity(false);
    npc.speed = npcTypes[key].speed + Math.random() * 10;
    npc.direction = fromLeft ? 1 : -1;
    npc.walkPhase = Math.random() * Math.PI * 2;
    npc.npcType = key;
  }
  
  // ========== TRUMP SYSTEM - Commander in Chief Protection ==========
  spawnTrump() {
    if (this.trump && this.trump.active) return; // Already spawned
    if (!this.textures.exists('trump_walk')) return;
    
    const view = this.cameras.main.worldView;
    const startX = view.x - 100;
    
    // Create Trump
    this.trump = this.add.sprite(startX, this.groundY, 'trump_walk')
      .setOrigin(0.5, 1).setScale(0.24).setDepth(15);
    
    if (this.trump.preFX) this.trump.preFX.addGlow(0xFFFFFF, 2, 0, false, 0.05, 12);
    this.trump.direction = 1; // Moving right
    this.trump.speed = 80;
    this.trump.quoteTimer = 0;
    this.trump.fistShakeTimer = 0;
    this.trump.isInvincible = true; // Trump is ALWAYS protected
    
    // Create shadow under Trump
    this.trump.shadow = this.add.ellipse(startX, this.groundY + 5, 50, 18, 0x000000, 0.3)
      .setOrigin(0.5).setDepth(14);
    
    // Spawn bodyguards
    this.spawnBodyguards();
    
    // Spawn angel above Trump
    this.spawnAngel();
    
    // Spawn American eagles
    this.spawnAmericanEagles();
    
    // ========== DIVINE SHIELD - Glowing protection over all ==========
    this.spawnDivineShield();
    
    // Show entrance quote
    const quote = TRUMP_QUOTES.entrance[Math.floor(Math.random() * TRUMP_QUOTES.entrance.length)];
    this.showTrumpQuote(quote);
    
    // Play Star Spangled Banner
    this.playSound('anthem');
    
    // Show patriotic notification
    this.showNotification('🇺🇸 THE PRESIDENT HAS ARRIVED! PROTECT HIM!', 0xffd700);
  }
  
  // ========== DIVINE SHIELD - Animated glowing protection ==========
  spawnDivineShield() {
    if (this.divineShield) return; // Already exists
    
    const trumpX = this.trump ? this.trump.x : this.cameras.main.worldView.centerX;
    
    // Create container for all shield elements
    this.divineShield = this.add.container(trumpX, this.groundY - 80).setDepth(20);
    
    // Main shield dome - large golden ellipse
    const shieldDome = this.add.ellipse(0, -20, 250, 180, 0xffd700, 0.15)
      .setStrokeStyle(3, 0xffd700, 0.6);
    
    // Inner glow ring
    const innerGlow = this.add.ellipse(0, -20, 200, 150, 0xffee88, 0.1)
      .setStrokeStyle(2, 0xffee88, 0.4);
    
    // Divine cross at top of shield
    const crossV = this.add.rectangle(0, -100, 6, 30, 0xffffff, 0.8);
    const crossH = this.add.rectangle(0, -90, 20, 6, 0xffffff, 0.8);
    
    // ========== ROMANS 8:31 SCRIPTURE ==========
    // Scripture reference
    const scriptureRef = this.add.text(0, -140, 'Romans 8:31', {
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#ffd700',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5);
    
    // Full verse text
    const scriptureVerse = this.add.text(0, -125, '"If God is for us, who can be against us?"', {
      fontSize: '11px',
      fontStyle: 'italic',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);
    
    // Sparkle particles around shield
    const sparkles = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const x = Math.cos(angle) * 110;
      const y = Math.sin(angle) * 80 - 20;
      const sparkle = this.add.star(x, y, 4, 3, 6, 0xffffff, 0.7);
      sparkles.push(sparkle);
    }
    
    // Add all elements to container
    this.divineShield.add([shieldDome, innerGlow, crossV, crossH, scriptureRef, scriptureVerse, ...sparkles]);
    
    // Store references for animation
    this.divineShield.shieldDome = shieldDome;
    this.divineShield.innerGlow = innerGlow;
    this.divineShield.sparkles = sparkles;
    this.divineShield.scriptureRef = scriptureRef;
    this.divineShield.scriptureVerse = scriptureVerse;
    
    // Pulsing glow animation on main dome
    this.tweens.add({
      targets: shieldDome,
      alpha: 0.25,
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // Inner glow pulse (offset timing)
    this.tweens.add({
      targets: innerGlow,
      alpha: 0.2,
      scaleX: 1.08,
      scaleY: 1.08,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
      delay: 300
    });
    
    // Scripture glow effect
    this.tweens.add({
      targets: [scriptureRef, scriptureVerse],
      alpha: { from: 0.8, to: 1 },
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // Rotating sparkles
    sparkles.forEach((sparkle, i) => {
      this.tweens.add({
        targets: sparkle,
        alpha: { from: 0.3, to: 1 },
        scale: { from: 0.8, to: 1.2 },
        duration: 800,
        yoyo: true,
        repeat: -1,
        delay: i * 100
      });
    });
    
    // NOTE: Don't rotate shield anymore so scripture stays readable
    // Instead, just pulse the dome for divine effect
  }
  
  spawnBodyguards() {
    // Use NEW bodyguard_shoot sprite - only ONE bodyguard in front of Trump
    if (!this.textures.exists('bodyguard_shoot')) return;
    if (this.bodyguard && this.bodyguard.active) return; // Already spawned
    
    const trumpX = this.trump ? this.trump.x : this.cameras.main.worldView.x;
    
    // Create animation for bodyguard shooting
    if (!this.anims.exists('bodyguard_shoot_anim')) {
      this.anims.create({
        key: 'bodyguard_shoot_anim',
        frames: this.anims.generateFrameNumbers('bodyguard_shoot', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: 0
      });
    }
    
    // Single bodyguard in front of Trump
    this.bodyguard = this.add.sprite(trumpX + 70, this.groundY, 'bodyguard_shoot')
      .setOrigin(0.5, 1).setScale(0.1).setDepth(14);
    this.bodyguard.isBodyguard = true;
    this.bodyguard.shootCooldown = 0;
    this.bodyguard.isInvincible = true; // IMMUNE TO FRIENDLY FIRE
  }
  
  spawnAngel() {
    // Use NEW angel_protect sprite - hovers over Trump as shield
    if (!this.textures.exists('angel_protect')) return;
    if (this.angel && this.angel.active) return; // Already spawned
    
    const trumpX = this.trump ? this.trump.x : this.cameras.main.worldView.centerX;
    
    // Create animation for angel protection
    if (!this.anims.exists('angel_protect_anim')) {
      this.anims.create({
        key: 'angel_protect_anim',
        frames: this.anims.generateFrameNumbers('angel_protect', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
      });
    }
    
    // Angel hovers DIRECTLY over Trump, leaned forward in protective stance
    this.angel = this.add.sprite(trumpX, this.groundY - 120, 'angel_protect')
      .setOrigin(0.5, 1).setScale(0.24).setDepth(16);
    
    // Play protection animation
    this.angel.play('angel_protect_anim');
    
    // Angel is a turd shield!
    this.angel.isAngelShield = true;
    this.angel.isInvincible = true; // IMMUNE TO FRIENDLY FIRE
    this.angel.shieldRadius = 180; // Blocks turds within this radius of Trump
    
    // Leaned forward rotation (protective hover stance)
    this.angel.setRotation(-0.15); // Slight lean forward
    
    // Gentle hovering bob animation
    this.tweens.add({
      targets: this.angel,
      y: this.groundY - 130,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // Golden divine glow
    this.angel.setTint(0xffeebb);
  }
  
  // Single bodyguard auto-shoots birds threatening Trump!
  updateBodyguardShooting(dt) {
    if (!this.bodyguard || !this.trump || !this.trump.active) return;
    if (!this.bodyguard.active) return;
    
    this.bodyguard.shootCooldown -= dt;
    if (this.bodyguard.shootCooldown > 0) return;
    
    // Find nearest shootable bird near Trump
    let nearestBird = null;
    let nearestDist = 350; // Max range
    
    this.birds.getChildren().forEach(bird => {
      if (!bird || !bird.active) return;
      const cfg = speciesConfig[bird.species];
      if (!cfg || cfg.protected || cfg.helper) return; // Don't shoot protected/helper birds
      
      const distToTrump = Phaser.Math.Distance.Between(bird.x, bird.y, this.trump.x, this.trump.y - 50);
      if (distToTrump < nearestDist) {
        nearestDist = distToTrump;
        nearestBird = bird;
      }
    });
    
    if (nearestBird) {
      // SHOOT THE BIRD!
      this.bodyguardShoot(this.bodyguard, nearestBird);
      this.bodyguard.shootCooldown = 0.6; // Fire rate
    }
  }
  
  bodyguardShoot(guard, targetBird) {
    if (!guard || !targetBird) return;
    
    // Play shooting animation
    guard.play('bodyguard_shoot_anim');
    
    // Create bullet from guard to bird
    const bullet = this.add.circle(guard.x + 30, guard.y - 50, 5, 0xffff00)
      .setDepth(15);
    
    // Animate bullet
    this.tweens.add({
      targets: bullet,
      x: targetBird.x,
      y: targetBird.y,
      duration: 120,
      onComplete: () => {
        bullet.destroy();
        
        // Kill the bird!
        if (targetBird && targetBird.active) {
          const cfg = speciesConfig[targetBird.species];
          const points = cfg ? cfg.points : 10;
          
          // Award points to player for bodyguard kill
          btState.score += Math.floor(points * 0.5); // Half points for bodyguard kills
          this.showPointIndicator(targetBird.x, targetBird.y, `+${Math.floor(points * 0.5)} SECRET SERVICE!`, 0x1e40af);
          
          // Explosion effect
          this.createBirdExplosion(targetBird.x, targetBird.y, cfg ? cfg.color : 0x888888);
          
          // Remove bird
          if (targetBird.shadow) targetBird.shadow.destroy();
          targetBird.destroy();
          
          this.playSound('hit');
        }
      }
    });
    
    // Muzzle flash effect
    const flash = this.add.circle(guard.x + 40, guard.y - 55, 12, 0xffaa00)
      .setDepth(15).setAlpha(0.9);
    this.time.delayedCall(100, () => flash.destroy());
    
    this.playSound('shoot');
  }
  
  // Angel blocks all turds heading toward Trump!
  checkAngelTurdBlock(turd) {
    if (!this.angel || !this.trump || !this.trump.active) return false;
    if (!turd || turd.active === false) return false;
    
    // Check if turd is heading toward Trump
    const distToTrump = Phaser.Math.Distance.Between(turd.x, turd.y, this.trump.x, this.trump.y);
    
    if (distToTrump < this.angel.shieldRadius) {
      // ANGEL BLOCKS THE TURD!
      
      // Divine flash effect
      const flash = this.add.circle(turd.x, turd.y, 20, 0xffd700, 0.7)
        .setDepth(17);
      this.tweens.add({
        targets: flash,
        scale: 2,
        alpha: 0,
        duration: 300,
        onComplete: () => flash.destroy()
      });
      
      // Destroy the turd
      turd.destroy();
      
      // Show divine message occasionally
      if (Math.random() < 0.3) {
        this.showPointIndicator(this.trump.x, this.trump.y - 100, '✨ DIVINE PROTECTION! ✨', 0xffd700);
      }
      
      return true;
    }
    return false;
  }
  
  spawnAmericanEagles() {
    if (!this.textures.exists('americaneagle')) return;
    if (!this.americanEagles) this.americanEagles = [];
    
    const trumpX = this.trump ? this.trump.x : this.cameras.main.worldView.centerX;
    
    // Left eagle
    const leftEagle = this.add.sprite(trumpX - 100, this.groundY - 120, 'americaneagle')
      .setOrigin(0.5).setScale(0.1).setDepth(13);
    leftEagle.isAmericanEagle = true;
    leftEagle.side = 'left';
    this.americanEagles.push(leftEagle);
    
    // Right eagle
    const rightEagle = this.add.sprite(trumpX + 100, this.groundY - 120, 'americaneagle')
      .setOrigin(0.5).setScale(0.1).setDepth(13).setFlipX(true);
    rightEagle.isAmericanEagle = true;
    rightEagle.side = 'right';
    this.americanEagles.push(rightEagle);
  }
  
  showTrumpQuote(quote) {
    if (!this.trump) return;
    
    // Play Trump voice with ElevenLabs
    this.playSound('trump_speak');
    this.speakTrumpQuote(quote);
    
    // Create CARTOON CLOUD speech bubble
    const bubble = this.add.container(this.trump.x, this.trump.y - 140);
    bubble.setDepth(20);
    
    // Calculate bubble size based on text
    const maxWidth = 280;
    const padding = 20;
    const textWidth = Math.min(quote.length * 7, maxWidth);
    const bubbleWidth = textWidth + padding * 2;
    const bubbleHeight = 60;
    
    // Create cloud bubble using graphics (cartoon style with bumps)
    const graphics = this.add.graphics();
    graphics.fillStyle(0xffffff, 0.98);
    graphics.lineStyle(3, 0x3b82f6);
    
    // Main cloud body - multiple overlapping circles for cloud effect
    const cx = 0, cy = 0;
    const hw = bubbleWidth / 2;
    const hh = bubbleHeight / 2;
    
    // Draw cloud bumps around the edge
    graphics.fillCircle(cx - hw * 0.7, cy - hh * 0.3, hh * 0.6);
    graphics.fillCircle(cx - hw * 0.4, cy - hh * 0.5, hh * 0.7);
    graphics.fillCircle(cx, cy - hh * 0.4, hh * 0.8);
    graphics.fillCircle(cx + hw * 0.4, cy - hh * 0.5, hh * 0.7);
    graphics.fillCircle(cx + hw * 0.7, cy - hh * 0.3, hh * 0.6);
    graphics.fillCircle(cx + hw * 0.8, cy, hh * 0.5);
    graphics.fillCircle(cx + hw * 0.7, cy + hh * 0.3, hh * 0.6);
    graphics.fillCircle(cx + hw * 0.4, cy + hh * 0.4, hh * 0.65);
    graphics.fillCircle(cx, cy + hh * 0.3, hh * 0.7);
    graphics.fillCircle(cx - hw * 0.4, cy + hh * 0.4, hh * 0.65);
    graphics.fillCircle(cx - hw * 0.7, cy + hh * 0.3, hh * 0.6);
    graphics.fillCircle(cx - hw * 0.8, cy, hh * 0.5);
    
    // Fill center
    graphics.fillRoundedRect(-hw * 0.7, -hh * 0.4, hw * 1.4, hh * 0.8, 10);
    
    // Cloud "thought" trail (small circles leading to Trump)
    graphics.fillCircle(cx, cy + hh + 15, 12);
    graphics.fillCircle(cx + 5, cy + hh + 32, 8);
    graphics.fillCircle(cx + 8, cy + hh + 45, 5);
    
    // Add outline to clouds
    graphics.strokeCircle(cx - hw * 0.7, cy - hh * 0.3, hh * 0.6);
    graphics.strokeCircle(cx - hw * 0.4, cy - hh * 0.5, hh * 0.7);
    graphics.strokeCircle(cx, cy - hh * 0.4, hh * 0.8);
    graphics.strokeCircle(cx + hw * 0.4, cy - hh * 0.5, hh * 0.7);
    graphics.strokeCircle(cx + hw * 0.7, cy - hh * 0.3, hh * 0.6);
    
    // Text with word wrap
    const text = this.add.text(0, -5, quote, {
      fontSize: '13px',
      fontFamily: 'Comic Sans MS, cursive, sans-serif',
      fontStyle: 'bold',
      color: '#1e40af',
      wordWrap: { width: maxWidth },
      align: 'center'
    }).setOrigin(0.5);
    
    bubble.add([graphics, text]);
    
    // Gentle floating animation
    this.tweens.add({
      targets: bubble,
      y: bubble.y - 8,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // Pop-in animation
    bubble.setScale(0);
    this.tweens.add({
      targets: bubble,
      scale: 1,
      duration: 300,
      ease: 'Back.easeOut'
    });
    
    // Link to Trump for position updates
    this.trump.speechBubble = bubble;
    
    // Fade out after 5 seconds
    this.time.delayedCall(5000, () => {
      if (bubble && bubble.active !== false) {
        this.tweens.add({
          targets: bubble,
          alpha: 0,
          scale: 0.5,
          duration: 400,
          onComplete: () => bubble.destroy()
        });
      }
    });
  }
  
  updateTrump(dt) {
    if (!this.trump || !this.trump.active) return;
    
    const view = this.cameras.main.worldView;
    
    // Move Trump across screen
    this.trump.x += this.trump.speed * dt;
    
    // Update shadow position
    if (this.trump.shadow) {
      this.trump.shadow.setPosition(this.trump.x, this.groundY + 5);
    }
    
    // Update speech bubble position
    if (this.trump.speechBubble && this.trump.speechBubble.active !== false) {
      this.trump.speechBubble.setPosition(this.trump.x, this.trump.y - 120);
    }
    
    // Update SINGLE bodyguard position AND shooting
    if (this.bodyguard && this.bodyguard.active !== false) {
      this.bodyguard.x = this.trump.x + 70; // In front of Trump
      // Bodyguard auto-shoots threatening birds!
      this.updateBodyguardShooting(dt);
    }
    
    // Update angel position - hovers DIRECTLY over Trump as shield
    if (this.angel && this.angel.active !== false) {
      this.angel.x = this.trump.x;
      // Angel stays directly over Trump, bobbing handled by tween
    }
    
    // Update DIVINE SHIELD position - follows Trump and covers everyone
    if (this.divineShield && this.divineShield.active !== false) {
      this.divineShield.x = this.trump.x;
    }
    
    // Update American eagles
    if (this.americanEagles) {
      this.americanEagles.forEach(eagle => {
        if (eagle && eagle.active !== false) {
          const offset = eagle.side === 'left' ? -100 : 100;
          eagle.x = this.trump.x + offset;
        }
      });
    }
    
    // Random fist shake at birds
    this.trump.fistShakeTimer += dt;
    if (this.trump.fistShakeTimer > 8) {
      this.trump.fistShakeTimer = 0;
      if (Math.random() < 0.5) {
        const quote = TRUMP_QUOTES.fistShake[Math.floor(Math.random() * TRUMP_QUOTES.fistShake.length)];
        this.showTrumpQuote(quote);
      }
    }
    
    // Award points for staying near Trump
    if (this.hunter) {
      const distToTrump = Math.abs(this.hunter.x - this.trump.x);
      if (distToTrump < 200) {
        btState.trumpProximityBonus = (btState.trumpProximityBonus || 0) + dt * 2;
        if (btState.trumpProximityBonus >= 1) {
          btState.score += 2;
          btState.trumpProximityBonus = 0;
          this.showPointIndicator(this.hunter.x, this.hunter.y - 50, '+2 PROTECTING!', 0x22c55e);
        }
      }
    }
    
    // Trump exits screen - bonus!
    if (this.trump.x > view.right + 150) {
      const quote = TRUMP_QUOTES.protected[Math.floor(Math.random() * TRUMP_QUOTES.protected.length)];
      this.showTrumpQuote(quote);
      btState.score += 100;
      this.showNotification('🇺🇸 PRESIDENT SAFE! +100 BONUS!', 0xffd700);
      
      // Cleanup
      this.time.delayedCall(2000, () => {
        this.cleanupTrump();
      });
    }
  }
  
  cleanupTrump() {
    if (this.trump) {
      if (this.trump.shadow) this.trump.shadow.destroy();
      if (this.trump.speechBubble) this.trump.speechBubble.destroy();
      this.trump.destroy();
      this.trump = null;
    }
    // Single bodyguard cleanup
    if (this.bodyguard) {
      this.bodyguard.destroy();
      this.bodyguard = null;
    }
    if (this.angel) {
      this.angel.destroy();
      this.angel = null;
    }
    // Divine shield cleanup
    if (this.divineShield) {
      this.divineShield.destroy();
      this.divineShield = null;
    }
    if (this.americanEagles) {
      this.americanEagles.forEach(e => e && e.destroy());
      this.americanEagles = [];
    }
  }
  
  // Check if player shot Trump, Angel, or Bodyguard - FRIENDLY FIRE IMMUNITY!
  checkTrumpShot(bullet) {
    if (!this.trump || !this.trump.active) return false;
    
    // Check if bullet hit ANGEL - IMMUNE, just deflect!
    if (this.angel && this.angel.active) {
      const angelDist = Phaser.Math.Distance.Between(bullet.x, bullet.y, this.angel.x, this.angel.y - 50);
      if (angelDist < 60) {
        // Angel deflects the bullet with divine power!
        this.showPointIndicator(this.angel.x, this.angel.y - 80, '✨ DIVINE DEFLECTION! ✨', 0xffd700);
        
        // Create deflection effect
        const flash = this.add.circle(bullet.x, bullet.y, 15, 0xffd700, 0.8).setDepth(17);
        this.tweens.add({
          targets: flash,
          scale: 2,
          alpha: 0,
          duration: 300,
          onComplete: () => flash.destroy()
        });
        
        bullet.destroy();
        return true; // Bullet consumed, but no penalty
      }
    }
    
    // Check if bullet hit BODYGUARD - IMMUNE, he's tough!
    if (this.bodyguard && this.bodyguard.active) {
      const bgDist = Phaser.Math.Distance.Between(bullet.x, bullet.y, this.bodyguard.x, this.bodyguard.y - 40);
      if (bgDist < 40) {
        // Bodyguard shrugs it off!
        this.showPointIndicator(this.bodyguard.x, this.bodyguard.y - 60, '🕴️ FRIENDLY FIRE BLOCKED!', 0x1e40af);
        bullet.destroy();
        return true; // Bullet consumed, but no penalty
      }
    }
    
    // Check if bullet hit TRUMP - DIVINE PROTECTION!
    const dist = Phaser.Math.Distance.Between(bullet.x, bullet.y, this.trump.x, this.trump.y - 50);
    if (dist < 50) {
      // Trump is PROTECTED by God! No damage, special quote!
      this.showTrumpQuote("God has me, this is nothing! Making America Great Again, Cleaning Out The Turds!");
      this.showPointIndicator(this.trump.x, this.trump.y - 100, '🙏 DIVINE PROTECTION! 🙏', 0xffd700);
      
      // Divine flash effect
      const flash = this.add.circle(this.trump.x, this.trump.y - 50, 40, 0xffd700, 0.6).setDepth(17);
      this.tweens.add({
        targets: flash,
        scale: 3,
        alpha: 0,
        duration: 500,
        onComplete: () => flash.destroy()
      });
      
      // Play divine sound
      this.playSound('powerup');
      
      bullet.destroy();
      return true; // Bullet consumed, NO GAME OVER - Trump is protected!
    }
    return false;
  }
  
  spawnShelter() {
    const view = this.cameras.main.worldView;
    
    // Create a simple shelter/bus stop structure
    const shelterX = view.x + GAME_WIDTH / 2 + Math.random() * 200 - 100;
    const shelterY = this.groundY;
    
    // Shelter graphics (simple roof structure)
    const shelter = this.add.container(shelterX, shelterY);
    shelter.setDepth(3);
    
    // Roof
    const roof = this.add.rectangle(0, -80, 120, 15, 0x8b4513);
    // Posts
    const postL = this.add.rectangle(-50, -40, 8, 80, 0x654321);
    const postR = this.add.rectangle(50, -40, 8, 80, 0x654321);
    // Back panel
    const back = this.add.rectangle(0, -40, 100, 70, 0x4a3728, 0.7);
    
    shelter.add([back, postL, postR, roof]);
    
    // Mark as shelter for collision
    shelter.isShelter = true;
    shelter.shelterBounds = { x: shelterX - 50, y: shelterY - 90, width: 100, height: 90 };
    
    if (!this.shelters) this.shelters = [];
    this.shelters.push(shelter);
    
    this.showNotification('🏠 SHELTER APPEARED! Hide from lightning!');
    
    // Remove shelter after 30 seconds
    this.time.delayedCall(30000, () => {
      if (shelter && shelter.active !== false) {
        this.tweens.add({
          targets: shelter,
          alpha: 0,
          duration: 1000,
          onComplete: () => { 
            shelter.destroy();
            const idx = this.shelters.indexOf(shelter);
            if (idx > -1) this.shelters.splice(idx, 1);
          }
        });
      }
    });
  }

  spawnPickup() {
    const view = this.cameras.main.worldView;
    const types = ['ammo', 'firstaid', 'coin'];
    const type = types[Math.floor(Math.random() * types.length)];
    if (!this.textures.exists(type)) return;
    
    // Different scales per item type
    const itemScales = { ammo: 0.06, firstaid: 0.05, coin: 0.04 };
    const scale = itemScales[type] || 0.05;
    
    const item = this.items.create(view.x + view.width * (0.3 + Math.random() * 0.5), this.groundY - 60 - Math.random() * 50, type)
      .setOrigin(0.5).setScale(scale).setDepth(9);
    item.type = type;
    item.baseScale = scale; // Store for bobbing animation
    item.phase = Math.random() * Math.PI * 2;
    item.body.setAllowGravity(false);
  }

  updateBirds(dt, time) {
    const view = this.cameras.main.worldView;
    const allBirds = this.birds.getChildren().filter(b => b && b.active);
    
    this.birds.getChildren().forEach(bird => {
      if (!bird || !bird.active || !bird.config) return;
      const cfg = bird.config;
      
      // COLLISION AVOIDANCE - birds avoid each other
      let avoidX = 0, avoidY = 0;
      allBirds.forEach(other => {
        if (other === bird || !other.active) return;
        const dx = bird.x - other.x;
        const dy = bird.y - other.y;
        const dist = Math.hypot(dx, dy);
        const minDist = 60; // Minimum distance between birds
        if (dist < minDist && dist > 0) {
          // Push away from nearby birds
          const force = (minDist - dist) / minDist;
          avoidX += (dx / dist) * force * 80;
          avoidY += (dy / dist) * force * 40;
        }
      });
      
      // Apply movement with avoidance
      bird.x += (bird.speed * bird.direction + avoidX) * dt;
      bird.y += Math.sin(time / 400 + bird.phase) * 0.6 + avoidY * dt;
      
      // BOSS DIVING BEHAVIOR - dives at player!
      if (bird.isBoss && this.hunter && this.hunter.active) {
        const distToHunter = Math.hypot(bird.x - this.hunter.x, bird.y - this.hunter.y);
        
        // If carrying hunter
        if (bird.isCarrying && this.hunterBeingCarried) {
          // Move hunter with bird
          this.hunter.x = bird.x;
          this.hunter.y = bird.y + 40;
          this.hunter.body.setVelocity(0, 0);
          
          // Hunter can fight back! Knife or shoot
          if (this.keys.K && this.keys.K.isDown || this.keys.F && this.keys.F.isDown) {
            // Knife attack - instant escape!
            bird.health -= 3;
            this.showPointIndicator(bird.x, bird.y, '🔪 STAB! -3 HP', 0xef4444);
            if (bird.health <= 0) {
              this.hunterBeingCarried = false;
              bird.isCarrying = false;
              this.hunter.y = this.groundY; // Reset hunter to ground!
              this.hunter.x = Math.max(100, Math.min(this.hunter.x, WORLD_WIDTH - 100)); // Keep in bounds
              this.createDeathEffect(bird.x, bird.y);
              const pts = bird.config.score;
              btState.score += pts;
              btState.kills++;
              this.onBirdKilled(); // Level progression
              this.showPointIndicator(bird.x, bird.y, `+${pts} ESCAPE KILL!`, 0x22c55e);
              bird.destroy();
            } else {
              // Dropped after stabbing
              this.hunterBeingCarried = false;
              bird.isCarrying = false;
              this.hunter.y = this.groundY;
              this.showNotification('🔪 STABBED! You escaped!');
            }
          }
          
          // Shooting while carried
          if (this.input.activePointer.isDown || this.keys.SPACE.isDown) {
            bird.health -= 0.5;
            if (bird.health <= 0) {
              this.hunterBeingCarried = false;
              bird.isCarrying = false;
              this.hunter.y = this.groundY;
              this.hunter.x = Math.max(100, Math.min(this.hunter.x, WORLD_WIDTH - 100));
              this.createDeathEffect(bird.x, bird.y);
              const pts = bird.config.score;
              btState.score += pts;
              btState.kills++;
              this.onBirdKilled();
              this.showPointIndicator(bird.x, bird.y, `+${pts} SHOT FREE!`, 0x22c55e);
              bird.destroy();
              return; // Exit early - bird is dead
            }
          }
          
          // If bird flies too high, hunter takes damage
          if (bird.y < 50) {
            btState.health -= 0.3;
            this.updateHud();
            if (btState.health <= 0) {
              this.hunterBeingCarried = false;
              bird.isCarrying = false;
              this.triggerDeathAnimation('carried');
            }
          }
          return; // Skip normal bird movement while carrying
        }
        
        // Start dive when close enough horizontally
        if (!bird.isDiving && !bird.isCarrying && Math.abs(bird.x - this.hunter.x) < 200 && bird.y < this.hunter.y - 50) {
          bird.isDiving = true;
          bird.diveTarget = { x: this.hunter.x, y: this.groundY - 20 };
          this.showNotification('⚠️ BOSS DIVING! Duck or go PRONE (Z)!');
        }
        
        // Execute dive
        if (bird.isDiving) {
          const dx = bird.diveTarget.x - bird.x;
          const dy = bird.diveTarget.y - bird.y;
          const diveSpeed = 400;
          bird.x += (dx / Math.max(Math.abs(dx), 1)) * diveSpeed * dt * 0.5;
          bird.y += diveSpeed * dt;
          bird.rotation = bird.direction > 0 ? 0.5 : -0.5;
          
          // Hit ground - pull up
          if (bird.y >= this.groundY - 30) {
            bird.isDiving = false;
            bird.y = this.groundY - 30;
            // Swoop back up
            this.tweens.add({
              targets: bird,
              y: 100,
              duration: 1000,
              ease: 'Sine.easeOut'
            });
          }
          
          // Check if hit hunter during dive (if not prone/crouching)
          if (distToHunter < 50 && !this.isProne && !this.isCrouching && !btState.invincible && !this.hunterBeingCarried) {
            // 30% chance to grab and carry!
            if (Math.random() < 0.3) {
              bird.isCarrying = true;
              this.hunterBeingCarried = true;
              bird.isDiving = false;
              this.showNotification('🦅 GRABBED! Press K to STAB or keep shooting!');
              this.cameras.main.shake(500, 0.03);
              // Start flying up
              this.tweens.add({
                targets: bird,
                y: 80,
                duration: 1500,
                ease: 'Sine.easeOut'
              });
            } else {
              // Normal hit damage
              const damage = 25 * (1 - btState.upgrades.armor);
              btState.health = Math.max(0, btState.health - damage);
              this.showPointIndicator(this.hunter.x, this.hunter.y - 50, '-25 HP BOSS HIT!', 0xef4444);
              this.cameras.main.shake(300, 0.02);
              if (btState.health <= 0) {
                this.triggerDeathAnimation('boss');
              }
              this.updateHud();
            }
          }
        }
      }
      
      // CRITICAL: Flip bird sprite based on direction
      // Sprites are drawn facing LEFT, so flip when moving RIGHT (direction > 0)
      bird.setFlipX(bird.direction > 0);
      
      // Keep birds in valid Y range
      bird.y = Math.max(50, Math.min(280, bird.y));
      
      // Wing flap animation - more visible!
      bird.flapPhase += dt * (bird.isBoss ? 6 : 10);
      const baseScale = cfg.size * 2 * (bird.depthScale || 1); // Match spawn multiplier (2x)
      // Scale Y to simulate wing flapping (squish/stretch)
      const flapY = 1 + Math.sin(bird.flapPhase) * 0.25; // More visible flapping // 15% vertical squish
      const flapX = 1 + Math.sin(bird.flapPhase) * 0.15; // More visible flapping // 8% horizontal
      bird.setScale(baseScale * flapX, baseScale * flapY);
      // Slight rotation wobble
      bird.rotation = Math.sin(bird.flapPhase * 0.5) * 0.15; // More visible wobble
      
      // Turd dropping OR coin dropping for helpers
      bird.turdCooldown -= dt;
      if (bird.turdCooldown <= 0) {
        if (cfg.helper) {
          // HELPERS drop COINS, not turds!
          if (Math.random() < (cfg.coinDropRate || 0.12)) {
            this.spawnCoinDrop(bird.x, bird.y + 10, 1);
          }
        } else {
          // Regular birds drop turds
          if (Math.random() < cfg.turdRate) this.spawnTurd(bird.x, bird.y + 10);
        }
        bird.turdCooldown = 0.8 + Math.random() * 1.4;
      }
      
      // Helper AI
      if (cfg.helper) {
        const target = this.getNearestShootableBird(bird.x, bird.y);
        if (target && target.active) {
          const dx = target.x - bird.x, dy = target.y - bird.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 1) { bird.x += (dx/dist) * dt * 120; bird.y += (dy/dist) * dt * 120; bird.setFlipX(dx > 0); }
          if (dist < 40) {
            this.showPointIndicator(target.x, target.y, '+5 HELPER', 0x22c55e);
            btState.score += btState.doublePoints ? 10 : 5;
            this.spawnCoinDrop(target.x, target.y, 1);
            target.destroy();
          }
        }
      }
      
      const buffer = bird.isBoss ? 800 : 500;
      if ((bird.direction > 0 && bird.x > view.right + buffer) || (bird.direction < 0 && bird.x < view.x - buffer)) {
        // If this bird was carrying the hunter, release them!
        if (bird.isCarrying && this.hunterBeingCarried) {
          this.hunterBeingCarried = false;
          if (this.hunter && this.hunter.active) {
            this.hunter.x = Math.max(100, Math.min(view.x + 200, WORLD_WIDTH - 100));
            this.hunter.y = this.groundY;
          }
        }
        bird.destroy();
      }
    });
    
    // SAFETY: If hunterBeingCarried but no bird is carrying, reset!
    if (this.hunterBeingCarried) {
      const carryingBird = this.birds.getChildren().find(b => b && b.active && b.isCarrying);
      if (!carryingBird) {
        this.hunterBeingCarried = false;
        if (this.hunter && this.hunter.active) {
          this.hunter.y = this.groundY;
        }
      }
    }
  }

  updateTurds() {
    this.turds.getChildren().forEach(t => {
      if (!t || !t.active) return;
      
      // ANGEL BLOCKS TURDS NEAR TRUMP!
      if (this.checkAngelTurdBlock(t)) return;
      
      t.body.setGravityY(600);
      
      // Track stink effect position
      if (t.stinkEffect && t.stinkEffect.active) {
        t.stinkEffect.setPosition(t.x, t.y - 15);
      }
      
      // When hitting ground, spawn ground turd and clean up
      if (t.y >= this.groundY - 8) { 
        this.spawnGroundTurd(t.x); 
        if (t.stinkEffect) t.stinkEffect.destroy();
        t.destroy(); 
      }
    });
    
    // Clean up ground turds that are too old (30 seconds)
    this.groundTurds.getChildren().forEach(gt => {
      if (!gt || !gt.active) return;
      if (!gt.spawnTime) gt.spawnTime = this.time.now;
      if (this.time.now - gt.spawnTime > 30000) {
        if (gt.fliesEffect) gt.fliesEffect.destroy();
        gt.destroy();
      }
    });
  }

  updateBullets() {
    const now = this.time.now;
    this.bullets.getChildren().forEach(b => {
      if (!b || !b.active) return;
      if (now - b.spawnTime > 1200 || b.x < -100 || b.x > WORLD_WIDTH + 100 || b.y < -100 || b.y > GAME_HEIGHT + 100) b.destroy();
    });
  }

  updateVehicles(dt) {
    const view = this.cameras.main.worldView;
    this.vehicles.getChildren().forEach(v => {
      if (!v || !v.active) return;
      
      // CRITICAL: Always flip sprite to face movement direction
      // Sprites are drawn facing LEFT, so flip when moving RIGHT (direction > 0)
      v.setFlipX(v.direction > 0);
      
      // Check for good tractor lifting behavior
      if (v.isGoodTractor && this.hunter && this.hunter.active) {
        const dist = v.x - this.hunter.x;
        const absDist = Math.abs(dist);
        
        // When approaching hunter, lift up!
        if (absDist < 150 && absDist > 30) {
          // Rising up to go over hunter
          if (!v.isLifting) {
            v.isLifting = true;
            this.tweens.add({
              targets: v,
              y: this.groundY - 100,
              duration: 400,
              ease: 'Sine.easeOut'
            });
          }
        } else if (absDist <= 30) {
          // Passing over - stay high
          v.y = this.groundY - 100;
        } else if (v.isLifting && absDist > 150) {
          // Past hunter, lower back down
          v.isLifting = false;
          this.tweens.add({
            targets: v,
            y: this.groundY + 2,
            duration: 400,
            ease: 'Sine.easeIn'
          });
        }
        
        // Move bucket/scoop with tractor
        if (v.bucket) {
          v.bucket.setPosition(v.x + v.bucketOffset, v.y - 20);
        }
        if (v.scoop) {
          v.scoop.setPosition(v.x + v.scoopOffset, v.y - 10);
        }
        
        // SCOOP UP TURDS! Good tractor cleans up ground turds
        if (this.groundTurds) {
          this.groundTurds.getChildren().forEach(turd => {
            if (!turd || !turd.active) return;
            const bucketX = v.x + v.bucketOffset;
            const turdDist = Math.abs(bucketX - turd.x);
            if (turdDist < 60 && Math.abs(turd.y - (v.y - 10)) < 50) {
              // Scoop it up with better visual!
              this.tweens.add({
                targets: turd,
                x: bucketX, // Move TO the bucket
                y: v.y - 40, // Lift into bucket
                scale: 0.03,
                duration: 200,
                ease: 'Power2',
                onComplete: () => {
                  // Show "+1 CLEANED" indicator
                  this.showPointIndicator(bucketX, v.y - 50, '💩➡️🪣', 0x22c55e);
                  turd.destroy();
                }
              });
            }
          });
        }
      }
      
      v.x += v.speed * dt * v.direction;
      if (!v.isLifting && !v.isGoodTractor) {
        v.bouncePhase += dt * 8;
        v.y = this.groundY + 2 + Math.sin(v.bouncePhase) * 3;
      }
      
      // Sync shadow position
      if (v.shadow && v.shadow.active) {
        v.shadow.setPosition(v.x, this.groundY + 5);
      }
      
      // Spawn smoke puffs for bad tractors
      if (!v.isGoodTractor && v.smokeOffset) {
        const now = this.time.now;
        if (!v.lastSmokeTime || now - v.lastSmokeTime > 200) {
          v.lastSmokeTime = now;
          const smokeX = v.x + v.smokeOffset;
          const smokeY = v.y - 70;
          const puff = this.add.circle(smokeX, smokeY, 8, 0x555555, 0.6).setDepth(7);
          this.tweens.add({
            targets: puff,
            y: smokeY - 40,
            alpha: 0,
            scale: 2,
            duration: 600,
            onComplete: () => puff.destroy()
          });
        }
      }
      
      // Warning when vehicle approaching!
      if (!v.hasWarned && this.hunter && this.hunter.active) {
        const dist = Math.abs(v.x - this.hunter.x);
        if (dist < 300 && dist > 100) {
          if (v.isGoodTractor) {
            this.showNotification('🚜✅ CLEANUP TRACTOR! Stay still - scoops turds!');
          } else {
            this.showNotification('🚜⚠️ BAD TRACTOR! JUMP (W) or SHOOT TIRES!');
          }
          v.hasWarned = true;
        }
      }
      
      // Check collision with hunter - only BAD tractors damage
      // SAFETY: Double-check isGoodTractor AND texture key
      const isGreen = v.isGoodTractor || (v.texture && v.texture.key === 'tractor_good');
      if (!isGreen && this.hunter && this.hunter.active && !this.gameOver) {
        const dist = Math.abs(v.x - this.hunter.x);
        // Can jump over if high enough!
        const isAbove = this.hunter.y < this.groundY - 60;
        if (dist < 50 && !btState.invincible && !isAbove) {
          this.triggerVehicleHit(v);
        }
      }
      
      // Cleanup bucket/scoop/shadow when vehicle destroyed
      const buffer = 400;
      if ((v.direction > 0 && v.x > view.right + buffer) || (v.direction < 0 && v.x < view.x - buffer)) {
        if (v.bucket) v.bucket.destroy();
        if (v.scoop) v.scoop.destroy();
        if (v.shadow) v.shadow.destroy();
        v.destroy();
      }
    });
  }
  
  // Update falling bombs
  updateBombs() {
    if (!this.bombs) return;
    this.bombs.getChildren().forEach(bomb => {
      if (!bomb || !bomb.active) return;
      // Explode when hitting ground
      if (bomb.y >= this.groundY - 20) {
        this.explodeBomb(bomb);
      }
    });
  }

  updatePlanes(dt) {
    const view = this.cameras.main.worldView;
    this.planes.getChildren().forEach(p => {
      if (!p || !p.active) return;
      
      // CRITICAL: Always flip sprite to face movement direction
      // Sprites are drawn facing LEFT, so flip when moving RIGHT (direction > 0)
      p.setFlipX(p.direction > 0);
      
      p.x += p.speed * dt * p.direction;
      p.bobPhase += dt * (p.isHelicopter ? 10 : 2);
      if (p.isHelicopter) p.y += Math.sin(p.bobPhase) * 2; // More visible bob
      else p.rotation = Math.sin(p.bobPhase) * 0.08; // More visible wobble
      
      // Randomly deploy parachuters from planes/helicopters (not fighters)!
      if (!p.isFighter && !p.hasDeployed && Math.random() < 0.003) {
        this.deployParachuter(p.x, p.y + 30);
        p.hasDeployed = true;
      }
      
      // Fighter jets shoot birds and drop bombs!
      if (p.isFighter) {
        p.shootCooldown -= dt;
        p.bombCooldown -= dt;
        
        // Shoot at birds
        if (p.shootCooldown <= 0) {
          const target = this.findNearestShootableBird(p.x, p.y, 400);
          if (target) {
            this.fighterShoot(p, target);
            p.shootCooldown = 0.8;
          }
        }
        
        // Drop bombs occasionally
        if (p.bombCooldown <= 0 && Math.random() < 0.01) {
          this.dropBomb(p.x, p.y);
          p.bombCooldown = 3;
        }
      }
      
      const buffer = 500;
      if ((p.direction > 0 && p.x > view.right + buffer) || (p.direction < 0 && p.x < view.x - buffer)) p.destroy();
    });
  }
  
  // Fighter jet shoots a bird
  fighterShoot(fighter, bird) {
    const species = speciesConfig[bird.species];
    if (!species || !species.shootable) return;
    
    // Tracer bullet visual
    const bullet = this.add.circle(fighter.x, fighter.y, 3, 0xff0000).setDepth(20);
    this.tweens.add({
      targets: bullet,
      x: bird.x,
      y: bird.y,
      duration: 100,
      onComplete: () => {
        bullet.destroy();
        // Kill bird - player gets 30% points
        const points = Math.round(species.score * 0.3);
        btState.score += points;
        this.showPointIndicator(bird.x, bird.y, `+${points} ✈️ FIGHTER!`, 0xff6666);
        bird.destroy();
      }
    });
  }
  
  // Drop a bomb from aircraft
  dropBomb(x, y) {
    const bomb = this.add.text(x, y, '💣', { fontSize: '24px' }).setOrigin(0.5).setDepth(25);
    this.physics.world.enable(bomb);
    bomb.body.setVelocityY(200);
    bomb.body.setGravityY(400);
    bomb.isBomb = true;
    
    // Track for collision
    this.bombs = this.bombs || this.physics.add.group();
    this.bombs.add(bomb);
    
    this.showNotification('💣 BOMB INCOMING! TAKE COVER!');
    
    // Explode when hits ground or after timeout
    this.time.delayedCall(3000, () => {
      if (bomb.active) this.explodeBomb(bomb);
    });
  }
  
  // Bomb explosion
  explodeBomb(bomb) {
    const x = bomb.x;
    const y = bomb.y;
    bomb.destroy();
    
    // Explosion visual
    const explosion = this.add.text(x, y, '💥', { fontSize: '64px' }).setOrigin(0.5).setDepth(30);
    this.tweens.add({
      targets: explosion,
      scale: 2,
      alpha: 0,
      duration: 500,
      onComplete: () => explosion.destroy()
    });
    
    // Kill birds in blast radius
    const blastRadius = 150;
    let birdsKilled = 0;
    this.birds.getChildren().forEach(bird => {
      if (!bird || !bird.active) return;
      const dist = Phaser.Math.Distance.Between(x, y, bird.x, bird.y);
      if (dist < blastRadius) {
        const species = speciesConfig[bird.species];
        if (species && species.shootable) {
          btState.score += Math.round(species.score * 0.2);
          birdsKilled++;
        }
        bird.destroy();
      }
    });
    
    if (birdsKilled > 0) {
      this.showPointIndicator(x, y, `💥 ${birdsKilled} BIRDS!`, 0xff6600);
    }
    
    // Damage hunter if too close!
    if (this.hunter && this.hunter.active) {
      const hunterDist = Phaser.Math.Distance.Between(x, y, this.hunter.x, this.hunter.y);
      if (hunterDist < blastRadius) {
        const damage = Math.round((1 - hunterDist / blastRadius) * 30);
        btState.turdMeter += damage;
        this.showPointIndicator(this.hunter.x, this.hunter.y - 50, `💣 -${damage}% BOMB HIT!`, 0xff0000);
        this.cameras.main.shake(300, 0.02);
        if (btState.turdMeter >= 100) {
          this.triggerDeathAnimation('bomb');
        }
      }
    }
  }
  
  // ========== STORM & LIGHTNING SYSTEM ==========
  
  // Update storm system
  updateStorm(dt) {
    this.stormTimer += dt;
    
    // Random storm starts every 45-90 seconds
    if (!this.stormActive && this.stormTimer > 45 + Math.random() * 45) {
      this.startStorm();
      this.stormTimer = 0;
    }
    
    // During storm, random lightning strikes
    if (this.stormActive) {
      this.stormDuration -= dt;
      
      // Random lightning during storm
      if (Math.random() < 0.005) {
        this.randomLightningStrike();
      }
      
      // Storm ends
      if (this.stormDuration <= 0) {
        this.endStorm();
      }
    }
    
    // Cooldown for player-called lightning
    if (this.lightningCooldown > 0) this.lightningCooldown -= dt;
  }
  
  // Start a storm
  startStorm() {
    this.stormActive = true;
    this.stormDuration = 15 + Math.random() * 10; // 15-25 seconds
    
    // Darken screen
    this.stormOverlay = this.add.rectangle(
      this.cameras.main.worldView.centerX,
      this.cameras.main.worldView.centerY,
      GAME_WIDTH * 2, GAME_HEIGHT * 2,
      0x000033, 0.3
    ).setScrollFactor(0).setDepth(50);
    
    // Storm warning
    const msg = stormMessages[Math.floor(Math.random() * stormMessages.length)];
    this.showNotification(msg);
    
    // Rain effect (simple particles)
    this.rainEmitter = this.add.particles(0, 0, 'turd', {
      x: { min: 0, max: GAME_WIDTH },
      y: -20,
      lifespan: 1000,
      speedY: { min: 300, max: 500 },
      scale: 0.02,
      alpha: 0.3,
      frequency: 20,
      tint: 0x6699ff
    }).setScrollFactor(0).setDepth(49);
  }
  
  // End storm
  endStorm() {
    this.stormActive = false;
    
    if (this.stormOverlay) {
      this.tweens.add({
        targets: this.stormOverlay,
        alpha: 0,
        duration: 2000,
        onComplete: () => { if (this.stormOverlay) this.stormOverlay.destroy(); }
      });
    }
    
    if (this.rainEmitter) {
      this.rainEmitter.stop();
      this.time.delayedCall(2000, () => { if (this.rainEmitter) this.rainEmitter.destroy(); });
    }
    
    this.showNotification('☀️ Storm passed!');
    this.lightningCharges = Math.min(this.lightningCharges + 2, 5); // Recharge lightning
  }
  
  // Random lightning strike during storm
  randomLightningStrike() {
    const view = this.cameras.main.worldView;
    const x = view.x + Math.random() * view.width;
    this.strikeLightning(x, true);
  }
  
  // Player calls lightning (T key)
  callLightning() {
    if (this.gameOver) return;
    
    if (this.lightningCharges <= 0) {
      this.showNotification('⚡ No lightning charges! Wait for storm!');
      return;
    }
    
    if (this.lightningCooldown > 0) {
      this.showNotification('⚡ Lightning recharging...');
      return;
    }
    
    this.lightningCharges--;
    this.lightningCooldown = 3; // 3 second cooldown
    
    // Strike at mouse position or random nearby
    const ptr = this.input.activePointer;
    const targetX = ptr.worldX || this.hunter.x + Phaser.Math.Between(-200, 200);
    
    this.strikeLightning(targetX, false);
    this.showNotification(`⚡ LIGHTNING CALLED! (${this.lightningCharges} left)`);
  }
  
  // Execute lightning strike
  strikeLightning(x, isRandom) {
    // Lightning visual
    const lightning = this.add.text(x, -50, '⚡', { fontSize: '80px' })
      .setOrigin(0.5)
      .setDepth(100);
    
    // Flash effect
    this.cameras.main.flash(100, 255, 255, 255);
    this.cameras.main.shake(100, 0.01);
    
    // Animate lightning strike
    this.tweens.add({
      targets: lightning,
      y: this.groundY,
      duration: 80,
      ease: 'Linear',
      onComplete: () => {
        // Ground impact
        const impact = this.add.text(x, this.groundY - 20, '💥', { fontSize: '48px' })
          .setOrigin(0.5).setDepth(100);
        
        this.tweens.add({
          targets: [lightning, impact],
          alpha: 0,
          scale: 1.5,
          duration: 300,
          onComplete: () => { lightning.destroy(); impact.destroy(); }
        });
        
        // Kill birds in strike area
        const strikeRadius = 120;
        let birdsHit = 0;
        this.birds.getChildren().forEach(bird => {
          if (!bird || !bird.active) return;
          const dist = Math.abs(bird.x - x);
          if (dist < strikeRadius && bird.y > 50) {
            const species = speciesConfig[bird.species];
            if (species && species.shootable) {
              const points = isRandom ? Math.round(species.score * 0.5) : species.score;
              btState.score += points;
              birdsHit++;
              
              // Zap effect on bird
              bird.setTint(0xffff00);
              this.tweens.add({
                targets: bird,
                alpha: 0,
                scale: 0.1,
                duration: 200,
                onComplete: () => bird.destroy()
              });
            }
          }
        });
        
        if (birdsHit > 0) {
          const msg = lightningHitMessages[Math.floor(Math.random() * lightningHitMessages.length)];
          this.showPointIndicator(x, this.groundY - 80, `${msg} ${birdsHit} BIRDS!`, 0xffff00);
        }
        
        // Damage hunter if too close!
        if (this.hunter && this.hunter.active && !btState.invincible) {
          const hunterDist = Math.abs(this.hunter.x - x);
          if (hunterDist < 80) {
            const damage = 20;
            btState.turdMeter += damage;
            this.showPointIndicator(this.hunter.x, this.hunter.y - 50, `⚡ SHOCKED! -${damage}%`, 0xffff00);
            this.hunter.setTint(0xffff00);
            this.time.delayedCall(300, () => { if (this.hunter) this.hunter.clearTint(); });
            
            if (btState.turdMeter >= 100) {
              this.triggerDeathAnimation('lightning');
            }
          }
        }
      }
    });
  }
  
  // ========== WIND & TORNADO SYSTEM ==========
  
  // Player calls tornado (G key)
  callTornado() {
    if (this.gameOver) return;
    
    if (this.windCharges <= 0) {
      this.showNotification('🌪️ No wind charges! Wait for them to recharge!');
      return;
    }
    
    if (this.windCooldown > 0) {
      this.showNotification('💨 Wind recharging...');
      return;
    }
    
    this.windCharges--;
    this.windCooldown = 5; // 5 second cooldown
    
    const msg = windMessages[Math.floor(Math.random() * windMessages.length)];
    this.showNotification(msg);
    
    this.spawnTornado();
  }
  
  // Spawn tornado that sweeps across screen
  spawnTornado() {
    const view = this.cameras.main.worldView;
    const fromLeft = Math.random() < 0.5;
    const startX = fromLeft ? view.x - 100 : view.right + 100;
    
    // Tornado visual
    const tornado = this.add.text(startX, 200, '🌪️', { fontSize: '64px' })
      .setOrigin(0.5)
      .setDepth(90);
    
    // Wind particles
    const windDir = fromLeft ? 1 : -1;
    
    // Animate tornado across screen
    this.tweens.add({
      targets: tornado,
      x: fromLeft ? view.right + 100 : view.x - 100,
      duration: 3000,
      ease: 'Linear',
      onUpdate: () => {
        // Spin animation
        tornado.rotation += 0.2;
        tornado.y = 200 + Math.sin(tornado.rotation * 2) * 50;
        
        // Sweep birds as tornado passes
        this.birds.getChildren().forEach(bird => {
          if (!bird || !bird.active) return;
          const dist = Math.abs(bird.x - tornado.x);
          
          if (dist < 150) {
            const species = speciesConfig[bird.species];
            
            // Only sweep SHOOTABLE birds!
            if (species && species.shootable) {
              // Push bird away
              bird.x += windDir * 20;
              bird.y -= 10;
              bird.rotation += 0.3;
              
              // If pushed far enough, destroy and give points
              if (dist < 60) {
                const points = Math.round(species.score * 0.7);
                btState.score += points;
                
                const killMsg = tornadoKillMessages[Math.floor(Math.random() * tornadoKillMessages.length)];
                this.showPointIndicator(bird.x, bird.y, `+${points} ${killMsg}`, 0x60a5fa);
                
                // Spiral death animation
                this.tweens.add({
                  targets: bird,
                  x: bird.x + windDir * 200,
                  y: bird.y - 150,
                  rotation: bird.rotation + Math.PI * 4,
                  alpha: 0,
                  scale: 0.1,
                  duration: 500,
                  onComplete: () => bird.destroy()
                });
              }
            }
          }
        });
      },
      onComplete: () => {
        tornado.destroy();
        this.showNotification('💨 Tornado passed! Birds swept away!');
      }
    });
    
    // Recharge wind after some time
    this.time.delayedCall(15000, () => {
      if (this.windCharges < 3) {
        this.windCharges++;
        this.showNotification('💨 Wind charge restored!');
      }
    });
  }
  
  // Deploy a friendly parachuter from aircraft
  deployParachuter(x, y) {
    const chuter = this.add.container(x, y).setDepth(25);
    
    // Parachute
    const chute = this.add.text(0, -30, '🪂', { fontSize: '36px' });
    chute.setOrigin(0.5);
    
    // Soldier
    const soldier = this.add.text(0, 10, '🧑‍✈️', { fontSize: '24px' });
    soldier.setOrigin(0.5);
    
    chuter.add([chute, soldier]);
    chuter.fallSpeed = 60 + Math.random() * 30;
    chuter.swayPhase = Math.random() * Math.PI * 2;
    chuter.shootCooldown = 0;
    chuter.isAlly = true; // DON'T SHOOT!
    chuter.hasLanded = false;
    
    this.parachuters.add(chuter);
    this.physics.world.enable(chuter);
    chuter.body.setSize(40, 60);
    
    // Show deployment message
    const msg = parachuterMessages[Math.floor(Math.random() * parachuterMessages.length)];
    this.showNotification(msg);
  }
  
  // Update parachuters - they fall, sway, and shoot birds!
  updateParachuters(dt) {
    this.parachuters.getChildren().forEach(p => {
      if (!p || !p.active) return;
      
      // Fall slowly with sway
      if (!p.hasLanded) {
        p.y += p.fallSpeed * dt;
        p.swayPhase += dt * 2;
        p.x += Math.sin(p.swayPhase) * 30 * dt;
        
        // Land on ground
        if (p.y >= this.groundY - 20) {
          p.y = this.groundY - 20;
          p.hasLanded = true;
          // Remove parachute when landed
          if (p.list && p.list[0]) p.list[0].setAlpha(0);
        }
      }
      
      // Shoot at nearby shootable birds!
      p.shootCooldown -= dt;
      if (p.shootCooldown <= 0) {
        const nearestBird = this.findNearestShootableBird(p.x, p.y, 300);
        if (nearestBird) {
          this.parachuterShoot(p, nearestBird);
          p.shootCooldown = 1.5 + Math.random(); // Shoot every 1.5-2.5 seconds
        }
      }
      
      // Despawn after 15 seconds on ground
      if (p.hasLanded) {
        p.groundTime = (p.groundTime || 0) + dt;
        if (p.groundTime > 15) {
          // Wave goodbye
          this.showPointIndicator(p.x, p.y - 30, '👋 MISSION COMPLETE!', 0x22c55e);
          p.destroy();
        }
      }
      
      // Cleanup if too far off screen
      const view = this.cameras.main.worldView;
      if (p.x < view.x - 500 || p.x > view.right + 500) p.destroy();
    });
  }
  
  // Find nearest shootable bird for parachuter
  findNearestShootableBird(x, y, range) {
    let nearest = null;
    let nearestDist = range;
    
    this.birds.getChildren().forEach(bird => {
      if (!bird || !bird.active) return;
      const species = speciesConfig[bird.species];
      if (!species || !species.shootable) return;
      
      const dist = Phaser.Math.Distance.Between(x, y, bird.x, bird.y);
      if (dist < nearestDist) {
        nearest = bird;
        nearestDist = dist;
      }
    });
    
    return nearest;
  }
  
  // Parachuter shoots a bird (gives player bonus!)
  parachuterShoot(chuter, bird) {
    const species = speciesConfig[bird.species];
    if (!species) return;
    
    // Visual bullet trail
    const bullet = this.add.circle(chuter.x, chuter.y - 10, 3, 0x22c55e).setDepth(20);
    this.tweens.add({
      targets: bullet,
      x: bird.x,
      y: bird.y,
      duration: 150,
      onComplete: () => {
        bullet.destroy();
        
        // Kill the bird - player gets half points!
        const points = Math.round(species.score * 0.5);
        btState.score += points;
        
        // Show assist indicator
        this.showPointIndicator(bird.x, bird.y, `+${points} 🪂 ALLY ASSIST!`, 0x22c55e);
        
        // Destroy bird
        bird.destroy();
      }
    });
  }

  // Check for low ammo and spawn ammo boxes
  checkLowAmmo() {
    // Only check occasionally
    this.lowAmmoCheckTimer = (this.lowAmmoCheckTimer || 0) + 1;
    if (this.lowAmmoCheckTimer < 180) return; // Check every 3 seconds
    this.lowAmmoCheckTimer = 0;
    
    // If ammo is low (below 10), maybe spawn an ammo box
    if (btState.ammo < 10) {
      // 15% chance to spawn ammo box (not too easy!)
      if (Math.random() < 0.15) {
        this.spawnAmmoBox();
      }
    }
    
    // Low ammo warning with quick-buy option
    if (btState.ammo < 10 && btState.ammo > 0) {
      if (!this.lowAmmoWarned) {
        this.showNotification('⚠️ LOW AMMO! Press [P] to quick-buy refill!');
        this.showQuickBuyHint();
        this.lowAmmoWarned = true;
      }
    } else if (btState.ammo === 0 && !this.noAmmoWarned) {
      this.showNotification('🚫 OUT OF AMMO! Press [P] to buy refill!');
      this.showQuickBuyHint();
      this.noAmmoWarned = true;
    } else if (btState.ammo >= 10) {
      this.lowAmmoWarned = false;
      this.noAmmoWarned = false;
      this.hideQuickBuyHint();
    }
  }
  
  // Spawn ammo box pickup
  spawnAmmoBox() {
    if (!this.ammoPickups) {
      this.ammoPickups = this.physics.add.group();
    }
    
    // Don't spawn too many
    if (this.ammoPickups.getChildren().length >= 2) return;
    
    const view = this.cameras.main.worldView;
    const x = view.right + 100 + Math.random() * 200;
    const y = GAME_HEIGHT - this.groundHeight - 20;
    
    // Create ammo box using the ammo sprite
    const ammoBox = this.add.sprite(x, y, 'ammo')
      .setOrigin(0.5)
      .setDepth(15)
      .setScale(0.08);
    
    ammoBox.baseY = y;
    ammoBox.bobPhase = 0;
    
    this.ammoPickups.add(ammoBox);
    this.physics.world.enable(ammoBox);
    ammoBox.body.setAllowGravity(false);
    
    // Add glow effect
    this.tweens.add({
      targets: ammoBox,
      alpha: { from: 0.7, to: 1 },
      yoyo: true,
      repeat: -1,
      duration: 500
    });
    
    this.showNotification('📦 AMMO BOX spotted! Go get it!');
  }
  
  // Update ammo boxes (bob and check collection)
  updateAmmoBoxes() {
    if (!this.ammoPickups) return;
    
    this.ammoPickups.getChildren().forEach(box => {
      if (!box || !box.active) return;
      
      // Bob up and down
      box.bobPhase = (box.bobPhase || 0) + 0.05;
      box.y = box.baseY + Math.sin(box.bobPhase) * 5;
      
      // Check if player collected it
      if (this.hunter && this.hunter.active) {
        const dist = Math.hypot(box.x - this.hunter.x, box.y - this.hunter.y);
        if (dist < 50) {
          this.collectAmmoBox(box);
        }
      }
      
      // Remove if too far left
      const view = this.cameras.main.worldView;
      if (box.x < view.left - 100) {
        box.destroy();
      }
    });
  }
  
  // Collect ammo box
  collectAmmoBox(box) {
    // Give 10-20 ammo
    const ammoGain = 10 + Math.floor(Math.random() * 11);
    btState.ammo += ammoGain;
    
    this.showNotification(`📦 +${ammoGain} AMMO!`);
    this.showPointIndicator(box.x, box.y, `+${ammoGain} 🔫`, 0x22c55e);
    this.playSound('coin');
    
    // Pickup effect
    this.tweens.add({
      targets: box,
      y: box.y - 50,
      scale: 1.5,
      alpha: 0,
      duration: 300,
      onComplete: () => box.destroy()
    });
  }
  
  // ========== IN-GAME TURDCOIN DISPLAY & QUICK SHOP ==========
  
  setupCoinDisplay() {
    // Persistent coin display in top-right corner (discrete)
    this.coinDisplayContainer = this.add.container(GAME_WIDTH - 10, 10);
    this.coinDisplayContainer.setDepth(999);
    this.coinDisplayContainer.setScrollFactor(0);
    
    // Background pill shape
    const coinBg = this.add.rectangle(0, 0, 120, 28, 0x1e293b, 0.85);
    coinBg.setStrokeStyle(1, 0xffd700, 0.5);
    coinBg.setOrigin(1, 0);
    
    // Coin icon
    const coinIcon = this.add.text(-100, 14, '💩', { fontSize: '14px' }).setOrigin(0.5);
    
    // Coin amount text
    this.coinDisplayText = this.add.text(-55, 14, '0', {
      fontSize: '13px',
      fontFamily: 'Arial',
      color: '#ffd700',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);
    
    // Quick shop hint
    const shopHint = this.add.text(-10, 14, '[TAB]', {
      fontSize: '9px',
      fontFamily: 'Arial',
      color: '#6b7280'
    }).setOrigin(1, 0.5);
    
    this.coinDisplayContainer.add([coinBg, coinIcon, this.coinDisplayText, shopHint]);
    
    // Update display
    this.updateCoinDisplay();
    
    // Coin change animation container
    this.coinAnimations = [];
  }
  
  updateCoinDisplay() {
    if (!this.coinDisplayText) return;
    const coins = parseInt(localStorage.getItem('birdturds_coins') || '0');
    btState.coins = coins;
    this.coinDisplayText.setText(coins.toLocaleString());
  }
  
  // Animate coin change (+ green for earn, - red for spend)
  animateCoinChange(amount, isEarning = true) {
    if (!this.coinDisplayContainer) return;
    
    const color = isEarning ? '#22c55e' : '#ef4444';
    const prefix = isEarning ? '+' : '-';
    
    const changeText = this.add.text(
      GAME_WIDTH - 65, 40,
      `${prefix}${Math.abs(amount)} 💩`,
      {
        fontSize: '14px',
        fontFamily: 'Arial',
        color: color,
        fontStyle: 'bold',
        stroke: '#000',
        strokeThickness: 2
      }
    ).setOrigin(0.5).setScrollFactor(0).setDepth(1000);
    
    // Animate up and fade
    this.tweens.add({
      targets: changeText,
      y: changeText.y - 30,
      alpha: 0,
      duration: 1200,
      ease: 'Power2',
      onComplete: () => changeText.destroy()
    });
    
    // Pulse the main display
    if (this.coinDisplayContainer) {
      this.tweens.add({
        targets: this.coinDisplayContainer,
        scaleX: 1.15,
        scaleY: 1.15,
        yoyo: true,
        duration: 150,
        ease: 'Quad.easeOut'
      });
    }
    
    // Update the display
    this.updateCoinDisplay();
  }
  
  // Add coins with animation
  addCoins(amount, reason = '') {
    let coins = parseInt(localStorage.getItem('birdturds_coins') || '0');
    coins += amount;
    localStorage.setItem('birdturds_coins', coins.toString());
    btState.coins = coins;
    
    this.animateCoinChange(amount, true);
    
    if (reason) {
      this.showNotification(`+${amount} 🪙 ${reason}`);
    }
    
    // Sync to cloud if user is logged in (debounced save)
    if (window.saveUserData && !window._coinSaveDebounce) {
      window._coinSaveDebounce = setTimeout(() => {
        window.saveUserData();
        window._coinSaveDebounce = null;
      }, 2000); // Save after 2 seconds of no coin changes
    }
  }
  
  // Spend coins with animation
  spendCoins(amount) {
    let coins = parseInt(localStorage.getItem('birdturds_coins') || '0');
    if (coins < amount) return false;
    
    coins -= amount;
    localStorage.setItem('birdturds_coins', coins.toString());
    btState.coins = coins;
    
    this.animateCoinChange(amount, false);
    
    // Sync to cloud immediately on purchase
    if (window.saveUserData) {
      window.saveUserData();
    }
    
    return true;
  }
  
  // Quick shop items for in-game purchase
  getQuickShopItems() {
    return {
      consumables: [
        { id: 'ammo_refill', name: '🔄 Ammo Refill', desc: 'Refill all ammo', cost: 100, key: '1' },
        { id: 'health_pack', name: '❤️ Health +50', desc: '+50 HP', cost: 200, key: '2' },
        { id: 'full_heal', name: '❤️❤️ Full Heal', desc: '100% HP', cost: 500, key: '3' },
        { id: 'shield_temp', name: '🌟 Shield 10s', desc: 'Invincible 10s', cost: 500, key: '4' },
        { id: 'double_points', name: '⭐ 2x Points', desc: '30s double score', cost: 300, key: '5' },
        { id: 'slow_motion', name: '⏱️ Slow-Mo', desc: '15s slow birds', cost: 400, key: '6' },
        { id: 'sturdy_hat', name: '🎩 Turd Hat', desc: 'Block turds 45s', cost: 800, key: '7' },
        { id: 'jetpack', name: '🚀 Jetpack', desc: 'Fly 30 seconds!', cost: 5000, key: '8' },
        { id: 'airstrike', name: '✈️ Airstrike', desc: 'Bomb all birds', cost: 2000, key: '9' },
        { id: 'nuke', name: '☢️ NUKE', desc: 'Clear screen!', cost: 5000, key: '0' }
      ],
      weapons: [
        { id: 'shotgun_12', name: '💥 12ga Shotgun', desc: '8-pellet spread', cost: 8000, key: 'F1' },
        { id: 'machinegun', name: '⚡ M249 SAW', desc: 'Full auto 200rds', cost: 15000, key: 'F2' },
        { id: 'sniper', name: '🎯 .308 Sniper', desc: '3x damage scope', cost: 12000, key: 'F3' },
        { id: 'bazooka', name: '🚀 Bazooka', desc: 'AOE explosions', cost: 40000, key: 'F4' }
      ],
      bosses: [
        { id: 'boss_pterodactyl', name: '🦖 Pterodactyl', desc: '+100pts +25💩', cost: 500, key: 'B' },
        { id: 'boss_phoenix', name: '🔥 Phoenix', desc: '+150pts +50💩', cost: 1000, key: 'N' },
        { id: 'boss_thunderbird', name: '⚡ Thunderbird', desc: '+300pts +75💩', cost: 2000, key: 'M' }
      ]
    };
  }
  
  // Toggle quick shop overlay
  toggleQuickShop() {
    if (this.quickShopOpen) {
      this.closeQuickShop();
    } else {
      this.openQuickShop();
    }
  }
  
  openQuickShop() {
    if (this.quickShopOpen) return;
    this.quickShopOpen = true;
    this.paused = true; // Pause game while shopping
    
    const coins = parseInt(localStorage.getItem('birdturds_coins') || '0');
    const items = this.getQuickShopItems();
    
    // Create overlay
    this.quickShopOverlay = this.add.container(GAME_WIDTH / 2, GAME_HEIGHT / 2);
    this.quickShopOverlay.setDepth(2000);
    this.quickShopOverlay.setScrollFactor(0);
    
    // Dark background
    const darkBg = this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.85);
    
    // Main panel
    const panelWidth = Math.min(700, GAME_WIDTH - 40);
    const panelHeight = Math.min(500, GAME_HEIGHT - 40);
    const panel = this.add.rectangle(0, 0, panelWidth, panelHeight, 0x1e293b, 0.98);
    panel.setStrokeStyle(3, 0xffd700);
    
    // Title
    const title = this.add.text(0, -panelHeight/2 + 25, '⚡ QUICK SHOP ⚡', {
      fontSize: '22px',
      fontFamily: 'Arial',
      color: '#ffd700',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    // Coin balance
    const balanceText = this.add.text(0, -panelHeight/2 + 55, `💩 ${coins.toLocaleString()} TurdCoins`, {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: '#22c55e',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    // Close hint
    const closeHint = this.add.text(panelWidth/2 - 10, -panelHeight/2 + 15, '[TAB] or [ESC] to close', {
      fontSize: '10px',
      fontFamily: 'Arial',
      color: '#6b7280'
    }).setOrigin(1, 0);
    
    this.quickShopOverlay.add([darkBg, panel, title, balanceText, closeHint]);
    
    // Add item sections
    let yOffset = -panelHeight/2 + 90;
    
    // Consumables section
    const consLabel = this.add.text(-panelWidth/2 + 20, yOffset, '🎁 CONSUMABLES (Press number key)', {
      fontSize: '12px', fontFamily: 'Arial', color: '#f472b6', fontStyle: 'bold'
    });
    this.quickShopOverlay.add(consLabel);
    yOffset += 22;
    
    // Grid of consumables (2 rows of 5)
    items.consumables.forEach((item, i) => {
      const col = i % 5;
      const row = Math.floor(i / 5);
      const x = -panelWidth/2 + 70 + col * 130;
      const y = yOffset + row * 55;
      
      const canAfford = coins >= item.cost;
      const itemContainer = this.createShopItemButton(item, x, y, canAfford);
      this.quickShopOverlay.add(itemContainer);
    });
    
    yOffset += 130;
    
    // Weapons section
    const weapLabel = this.add.text(-panelWidth/2 + 20, yOffset, '🔫 WEAPONS (Press F1-F4)', {
      fontSize: '12px', fontFamily: 'Arial', color: '#60a5fa', fontStyle: 'bold'
    });
    this.quickShopOverlay.add(weapLabel);
    yOffset += 22;
    
    items.weapons.forEach((item, i) => {
      const x = -panelWidth/2 + 90 + i * 160;
      const canAfford = coins >= item.cost;
      const itemContainer = this.createShopItemButton(item, x, yOffset + 20, canAfford);
      this.quickShopOverlay.add(itemContainer);
    });
    
    yOffset += 80;
    
    // Boss summons section
    const bossLabel = this.add.text(-panelWidth/2 + 20, yOffset, '🦖 SUMMON BOSSES (B/N/M keys) - Kill for bonus coins!', {
      fontSize: '12px', fontFamily: 'Arial', color: '#a855f7', fontStyle: 'bold'
    });
    this.quickShopOverlay.add(bossLabel);
    yOffset += 22;
    
    items.bosses.forEach((item, i) => {
      const x = -panelWidth/2 + 120 + i * 180;
      const canAfford = coins >= item.cost;
      const itemContainer = this.createShopItemButton(item, x, yOffset + 20, canAfford);
      this.quickShopOverlay.add(itemContainer);
    });
    
    // Fade in
    this.quickShopOverlay.setAlpha(0);
    this.tweens.add({
      targets: this.quickShopOverlay,
      alpha: 1,
      duration: 150
    });
  }
  
  createShopItemButton(item, x, y, canAfford) {
    const container = this.add.container(x, y);
    
    const bgColor = canAfford ? 0x374151 : 0x1f2937;
    const borderColor = canAfford ? 0x22c55e : 0x4b5563;
    
    const bg = this.add.rectangle(0, 0, 120, 50, bgColor, 0.9);
    bg.setStrokeStyle(canAfford ? 2 : 1, borderColor);
    
    const keyBg = this.add.rectangle(-45, -15, 22, 18, 0x000000, 0.5);
    const keyText = this.add.text(-45, -15, `[${item.key}]`, {
      fontSize: '9px', fontFamily: 'Arial', color: '#ffd700'
    }).setOrigin(0.5);
    
    const nameText = this.add.text(0, -5, item.name, {
      fontSize: '10px', fontFamily: 'Arial', color: canAfford ? '#fff' : '#6b7280', fontStyle: 'bold'
    }).setOrigin(0.5);
    
    const costText = this.add.text(0, 12, `${item.cost.toLocaleString()} 💩`, {
      fontSize: '10px', fontFamily: 'Arial', color: canAfford ? '#22c55e' : '#ef4444'
    }).setOrigin(0.5);
    
    container.add([bg, keyBg, keyText, nameText, costText]);
    
    // Make interactive
    bg.setInteractive({ useHandCursor: canAfford });
    if (canAfford) {
      bg.on('pointerover', () => {
        bg.setFillStyle(0x4b5563);
        bg.setStrokeStyle(2, 0xffd700);
      });
      bg.on('pointerout', () => {
        bg.setFillStyle(0x374151);
        bg.setStrokeStyle(2, 0x22c55e);
      });
      bg.on('pointerdown', () => {
        this.quickBuyItem(item.id, item.cost, item.name);
      });
    }
    
    return container;
  }
  
  closeQuickShop() {
    if (!this.quickShopOpen) return;
    this.quickShopOpen = false;
    this.paused = false;
    
    if (this.quickShopOverlay) {
      this.tweens.add({
        targets: this.quickShopOverlay,
        alpha: 0,
        duration: 100,
        onComplete: () => {
          this.quickShopOverlay.destroy();
          this.quickShopOverlay = null;
        }
      });
    }
  }
  
  // Quick buy any item
  quickBuyItem(itemId, cost, itemName) {
    const coins = parseInt(localStorage.getItem('birdturds_coins') || '0');
    
    if (coins < cost) {
      this.showNotification(`❌ Need ${cost} 💩, have ${coins}!`);
      this.playSound('error');
      return false;
    }
    
    // Deduct coins
    if (!this.spendCoins(cost)) return false;
    
    // Apply the item effect
    this.applyQuickBuyItem(itemId);
    
    // Success feedback
    this.showNotification(`✅ ${itemName} ACTIVATED!`);
    this.playSound('powerup');
    
    // Close shop after purchase
    this.closeQuickShop();
    
    return true;
  }
  
  applyQuickBuyItem(itemId) {
    switch(itemId) {
      case 'ammo_refill':
        btState.ammo = btState.ammoMax;
        this.showPointIndicator(this.hunter.x, this.hunter.y - 20, 'FULL AMMO! 🔫', 0x22c55e);
        break;
        
      case 'health_pack':
        btState.health = Math.min(100, btState.health + 50);
        this.showPointIndicator(this.hunter.x, this.hunter.y - 20, '+50 HP ❤️', 0xef4444);
        break;
        
      case 'full_heal':
        btState.health = 100;
        this.showPointIndicator(this.hunter.x, this.hunter.y - 20, 'FULL HP! ❤️', 0xef4444);
        break;
        
      case 'shield_temp':
        this.activateShield(10);
        break;
        
      case 'shield_long':
        this.activateShield(30);
        break;
        
      case 'double_points':
        this.activateScoreMultiplier(2, 30);
        break;
        
      case 'triple_points':
        this.activateScoreMultiplier(3, 30);
        break;
        
      case 'slow_motion':
        this.activateSlowMotion(15);
        break;
        
      case 'freeze':
        this.freezeAllBirds(10);
        break;
        
      case 'sturdy_hat':
        this.activateTurdHat(45);
        break;
        
      case 'sturdy_hat_xl':
        this.activateTurdHat(90);
        break;
        
      case 'jetpack':
        this.activateJetpack(30);
        break;
        
      case 'jetpack_xl':
        this.activateJetpack(60);
        break;
        
      case 'airstrike':
        this.callAirstrike();
        break;
        
      case 'nuke':
        this.callNuke();
        break;
        
      case 'boss_pterodactyl':
        this.summonBoss('pterodactyl');
        break;
        
      case 'boss_phoenix':
        this.summonBoss('phoenix');
        break;
        
      case 'boss_thunderbird':
        this.summonBoss('thunderbird');
        break;
        
      case 'boss_dragon':
        this.summonBoss('dragon');
        break;
        
      // Weapons - switch to purchased weapon
      case 'shotgun_12':
      case 'machinegun':
      case 'sniper':
      case 'bazooka':
      case 'minigun':
      case 'barrett':
        // Add to owned items
        let owned = JSON.parse(localStorage.getItem('birdturds_owned') || '[]');
        if (!owned.includes(itemId)) {
          owned.push(itemId);
          localStorage.setItem('birdturds_owned', JSON.stringify(owned));
        }
        // Switch to weapon
        if (typeof this.switchWeapon === 'function') {
          this.switchWeapon(itemId);
        }
        break;
        
      default:
        console.log('Unknown quick buy item:', itemId);
    }
    
    this.updateHud();
  }
  
  // Helper methods for power-ups
  activateShield(duration) {
    this.shieldActive = true;
    this.shieldEndTime = this.time.now + duration * 1000;
    
    // Visual effect
    if (!this.shieldSprite) {
      this.shieldSprite = this.add.circle(0, 0, 50, 0x3b82f6, 0.3);
      this.shieldSprite.setStrokeStyle(3, 0x60a5fa);
    }
    this.shieldSprite.setVisible(true);
    
    this.showNotification(`🌟 SHIELD ACTIVE ${duration}s!`);
    
    // Auto-disable after duration
    this.time.delayedCall(duration * 1000, () => {
      this.shieldActive = false;
      if (this.shieldSprite) this.shieldSprite.setVisible(false);
      this.showNotification('🌟 Shield expired!');
    });
  }
  
  activateScoreMultiplier(multiplier, duration) {
    this.scoreMultiplier = multiplier;
    this.showNotification(`⭐ ${multiplier}x POINTS for ${duration}s!`);
    
    this.time.delayedCall(duration * 1000, () => {
      this.scoreMultiplier = 1;
      this.showNotification('⭐ Score multiplier ended');
    });
  }
  
  activateSlowMotion(duration) {
    this.slowMotionActive = true;
    this.physics.world.timeScale = 2; // Slow physics
    this.showNotification(`⏱️ SLOW-MO ${duration}s!`);
    
    this.time.delayedCall(duration * 1000, () => {
      this.slowMotionActive = false;
      this.physics.world.timeScale = 1;
      this.showNotification('⏱️ Normal speed resumed');
    });
  }
  
  freezeAllBirds(duration) {
    this.showNotification(`❄️ FREEZE ${duration}s!`);
    
    if (this.birds) {
      this.birds.getChildren().forEach(bird => {
        if (bird && bird.active) {
          bird.frozen = true;
          bird.setTint(0x87CEEB);
          bird.body.setVelocity(0, 0);
        }
      });
    }
    
    this.time.delayedCall(duration * 1000, () => {
      if (this.birds) {
        this.birds.getChildren().forEach(bird => {
          if (bird && bird.active) {
            bird.frozen = false;
            bird.clearTint();
          }
        });
      }
      this.showNotification('❄️ Birds unfrozen!');
    });
  }
  
  activateTurdHat(duration) {
    this.turdHatActive = true;
    this.showNotification(`🎩 TURD HAT ${duration}s - Turds blocked!`);
    
    this.time.delayedCall(duration * 1000, () => {
      this.turdHatActive = false;
      this.showNotification('🎩 Hat wore off!');
    });
  }
  
  callAirstrike() {
    this.showNotification('✈️ AIRSTRIKE INCOMING!');
    
    // Kill all birds on screen
    if (this.birds) {
      let killCount = 0;
      this.birds.getChildren().forEach(bird => {
        if (bird && bird.active) {
          this.createExplosion(bird.x, bird.y);
          this.addScore(bird.birdPoints || 10);
          bird.destroy();
          killCount++;
        }
      });
      this.showNotification(`✈️ Airstrike killed ${killCount} birds!`);
    }
  }
  
  callNuke() {
    this.showNotification('☢️ TACTICAL NUKE LAUNCHED!');
    
    // Screen flash
    const flash = this.add.rectangle(GAME_WIDTH/2, GAME_HEIGHT/2, GAME_WIDTH, GAME_HEIGHT, 0xffffff, 1);
    flash.setScrollFactor(0).setDepth(9999);
    this.tweens.add({
      targets: flash,
      alpha: 0,
      duration: 1000,
      onComplete: () => flash.destroy()
    });
    
    // Kill EVERYTHING
    let totalKills = 0;
    
    if (this.birds) {
      this.birds.getChildren().forEach(bird => {
        if (bird && bird.active) {
          this.addScore((bird.birdPoints || 10) * 2);
          bird.destroy();
          totalKills++;
        }
      });
    }
    
    // Clear turds too
    if (this.turds) {
      this.turds.clear(true, true);
    }
    
    this.showNotification(`☢️ NUKE! ${totalKills} kills! Screen cleared!`);
  }
  
  // Override activateJetpack if not exists
  activateJetpack(duration) {
    if (this.jetpackActive) return;
    
    this.jetpackActive = true;
    this.jetpackEndTime = this.time.now + duration * 1000;
    this.showNotification(`🚀 JETPACK ${duration}s! Use W/S to fly!`);
    
    this.time.delayedCall(duration * 1000, () => {
      this.jetpackActive = false;
      this.showNotification('🚀 Jetpack fuel empty!');
    });
  }
  
  // Setup keyboard shortcuts for quick shop
  setupQuickShopKeys() {
    // TAB to open/close quick shop
    this.input.keyboard.on('keydown-TAB', (event) => {
      event.preventDefault();
      this.toggleQuickShop();
    });
    
    // ESC also closes
    this.input.keyboard.on('keydown-ESC', () => {
      if (this.quickShopOpen) this.closeQuickShop();
    });
    
    // Number keys for quick buy when shop is open
    const items = this.getQuickShopItems();
    
    // 1-0 for consumables
    for (let i = 1; i <= 9; i++) {
      this.input.keyboard.on(`keydown-${i}`, () => {
        if (this.quickShopOpen && items.consumables[i-1]) {
          const item = items.consumables[i-1];
          this.quickBuyItem(item.id, item.cost, item.name);
        }
      });
    }
    this.input.keyboard.on('keydown-ZERO', () => {
      if (this.quickShopOpen && items.consumables[9]) {
        const item = items.consumables[9];
        this.quickBuyItem(item.id, item.cost, item.name);
      }
    });
    
    // B, N, M for boss summons
    this.input.keyboard.on('keydown-B', () => {
      // Don't capture if typing in input
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) return;
      
      if (this.quickShopOpen) {
        const item = items.bosses[0];
        this.quickBuyItem(item.id, item.cost, item.name);
      }
    });
    
    this.input.keyboard.on('keydown-N', () => {
      if (this.quickShopOpen && items.bosses[1]) {
        const item = items.bosses[1];
        this.quickBuyItem(item.id, item.cost, item.name);
      }
    });
    
    this.input.keyboard.on('keydown-M', () => {
      if (this.quickShopOpen && items.bosses[2]) {
        const item = items.bosses[2];
        this.quickBuyItem(item.id, item.cost, item.name);
      }
    });
  }
  
  showQuickBuyHint() {
    if (this.quickBuyHint) return;
    
    this.quickBuyHint = this.add.container(GAME_WIDTH / 2, 100);
    this.quickBuyHint.setDepth(1000);
    this.quickBuyHint.setScrollFactor(0);
    
    const bg = this.add.rectangle(0, 0, 280, 50, 0x1e293b, 0.95);
    bg.setStrokeStyle(2, 0x22c55e);
    
    const coins = parseInt(localStorage.getItem('birdturds_coins') || '0');
    const text = this.add.text(0, 0, `⚠️ LOW AMMO! [TAB] Quick Shop | [P] Refill (100💩)`, {
      fontSize: '12px',
      fontFamily: 'Arial',
      color: '#22c55e',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    this.quickBuyHint.add([bg, text]);
    
    // Pulse animation
    this.tweens.add({
      targets: this.quickBuyHint,
      alpha: { from: 0.7, to: 1 },
      yoyo: true,
      repeat: -1,
      duration: 500
    });
  }
  
  hideQuickBuyHint() {
    if (this.quickBuyHint) {
      this.quickBuyHint.destroy();
      this.quickBuyHint = null;
    }
  }
  
  // P key for instant ammo refill (quick access)
  quickBuyAmmo() {
    const AMMO_COST = 100;
    let coins = parseInt(localStorage.getItem('birdturds_coins') || '0');
    
    if (coins < AMMO_COST) {
      this.showNotification(`❌ Need ${AMMO_COST}💩, have ${coins}!`);
      this.playSound('error');
      return;
    }
    
    // Deduct coins with animation
    this.spendCoins(AMMO_COST);
    
    // Refill ammo to max
    btState.ammo = btState.ammoMax;
    
    // Update displays
    this.showNotification(`✅ AMMO REFILLED! 🔫 ${btState.ammoMax} rounds!`);
    this.playSound('powerup');
    
    // Update HUD
    this.updateHud();
    this.hideQuickBuyHint();
  }

  updateAnimals(dt) {
    const view = this.cameras.main.worldView;
    const allAnimals = this.animals.getChildren().filter(a => a && a.active);
    const allNPCs = this.npcs.getChildren().filter(n => n && n.active);
    
    this.animals.getChildren().forEach(a => {
      if (!a || !a.active) return;
      
      const animalData = groundAnimals[a.animalType];
      
      // CRITICAL: Always flip sprite to face movement direction
      // Sprites are drawn facing LEFT, so flip when moving RIGHT (direction > 0)
      a.setFlipX(a.direction > 0);
      
      // DEER & ELK CHARGING BEHAVIOR!
      if (animalData && animalData.canCharge && this.hunter && this.hunter.active && !a.isCharging) {
        const distToHunter = Math.abs(a.x - this.hunter.x);
        // Start charging when animal gets close
        const chargeChance = a.animalType === 'elk' ? 0.01 : 0.008; // Elk charges more often
        if (distToHunter < 300 && distToHunter > 50 && Math.random() < chargeChance) {
          a.isCharging = true;
          a.chargeDirection = a.x < this.hunter.x ? 1 : -1;
          a.speed = a.animalType === 'elk' ? 200 : 180; // Elk slightly faster
          a.setTint(0xff6666); // Red tint when charging
          const emoji = a.animalType === 'elk' ? '🦌' : '🦌';
          this.showNotification(`${emoji} ${a.animalType.toUpperCase()} CHARGING! JUMP OVER IT!`);
        }
      }
      
      // If animal is charging, move faster toward player
      if (a.isCharging) {
        a.direction = a.chargeDirection;
        a.setFlipX(a.direction > 0); // Update flip when charging direction changes
        a.x += a.speed * a.direction * dt;
        
        // Check if animal hits hunter (must jump to avoid!)
        if (this.hunter && this.hunter.active && !btState.invincible) {
          const distToHunter = Math.abs(a.x - this.hunter.x);
          if (distToHunter < 35 && !a.hasAttacked) {
            // Hunter must be jumping to avoid!
            if (!this.isInAir && !this.isProne) {
              // Hit by charging animal - apply armor reduction
              const baseDamage = animalData.chargeDamage || 15;
              const armorMult = (1 - btState.upgrades.armor) * (1 - btState.armorReduction);
              const damage = Math.round(baseDamage * armorMult);
              btState.health = Math.max(0, btState.health - damage);
              this.showPointIndicator(this.hunter.x, this.hunter.y - 50, `-${damage} HP ${a.animalType.toUpperCase()} HIT!`, 0xef4444);
              this.showNotification(`🦌 TRAMPLED! Jump over charging ${a.animalType}!`);
              this.cameras.main.shake(300, 0.02);
              a.hasAttacked = true;
              if (btState.health <= 0) {
                this.triggerDeathAnimation(a.animalType);
              }
              this.updateHud();
            } else {
              // Successfully jumped over!
              const jumpBonus = a.animalType === 'elk' ? 15 : 10;
              this.showPointIndicator(this.hunter.x, this.hunter.y - 80, `+${jumpBonus} NICE JUMP!`, 0x22c55e);
              btState.score += jumpBonus;
              a.hasAttacked = true;
            }
          }
        }
        
        // Stop charging after going past
        if ((a.chargeDirection > 0 && a.x > this.hunter.x + 100) || 
            (a.chargeDirection < 0 && a.x < this.hunter.x - 100)) {
          a.isCharging = false;
          a.speed = animalData.speed || 80;
          a.clearTint();
        }
      } else {
        // Normal movement with collision avoidance
        let avoidX = 0;
        [...allAnimals, ...allNPCs].forEach(other => {
          if (other === a || !other.active) return;
          const dx = a.x - other.x;
          const dist = Math.abs(dx);
          const minDist = 80;
          if (dist < minDist && dist > 0) {
            const force = (minDist - dist) / minDist;
            avoidX += (dx > 0 ? 1 : -1) * force * 60;
          }
        });
        
        a.x += (a.speed * a.direction + avoidX) * dt;
      }
      
      a.walkPhase += dt * 8;
      a.y = this.groundY + Math.sin(a.walkPhase) * 2;
      
      // Sync shadow position
      if (a.shadow && a.shadow.active) {
        a.shadow.setPosition(a.x, this.groundY + 3);
      }
      
      // Check collision with hunter (dangerous animals attack!)
      if (this.hunter && this.hunter.active && !this.gameOver && a.animalType && !a.hasAttacked && !a.isCharging) {
        const dist = Math.abs(a.x - this.hunter.x);
        if (dist < 40 && animalData && animalData.dangerous && !btState.invincible) {
          this.triggerAnimalAttack(a);
        }
      }
      
      const buffer = 300;
      if ((a.direction > 0 && a.x > view.right + buffer) || (a.direction < 0 && a.x < view.x - buffer)) {
        if (a.shadow) a.shadow.destroy(); // Clean up shadow
        a.destroy();
      }
    });
  }

  updateNPCs(dt) {
    const view = this.cameras.main.worldView;
    const allAnimals = this.animals.getChildren().filter(a => a && a.active);
    const allNPCs = this.npcs.getChildren().filter(n => n && n.active);
    
    this.npcs.getChildren().forEach(npc => {
      if (!npc || !npc.active) return;
      
      // CRITICAL: Always flip sprite to face movement direction
      // Sprites are drawn facing LEFT, so flip when moving RIGHT (direction > 0)
      npc.setFlipX(npc.direction > 0);
      
      // COLLISION AVOIDANCE - NPCs avoid each other and animals
      let avoidX = 0;
      [...allAnimals, ...allNPCs].forEach(other => {
        if (other === npc || !other.active) return;
        const dx = npc.x - other.x;
        const dist = Math.abs(dx);
        const minDist = 60;
        if (dist < minDist && dist > 0) {
          const force = (minDist - dist) / minDist;
          avoidX += (dx > 0 ? 1 : -1) * force * 40;
        }
      });
      
      npc.x += (npc.speed * npc.direction + avoidX) * dt;
      npc.walkPhase += dt * 6;
      npc.y = this.groundY + Math.sin(npc.walkPhase) * 1.5;
      
      // Sync shadow position
      if (npc.shadow && npc.shadow.active) {
        npc.shadow.setPosition(npc.x, this.groundY + 3);
      }
      
      const buffer = 200;
      if ((npc.direction > 0 && npc.x > view.right + buffer) || (npc.direction < 0 && npc.x < view.x - buffer)) {
        if (npc.shadow) npc.shadow.destroy(); // Clean up shadow
        npc.destroy();
      }
    });
  }
  
  // REALISTIC DEATH/HIT ANIMATIONS
  triggerVehicleHit(vehicle) {
    if (this.gameOver || this.hunterHitCooldown) return;
    if (!this.hunter || !this.hunter.active) return; // Safety check
    
    this.hunterHitCooldown = true;
    this.time.delayedCall(2000, () => { this.hunterHitCooldown = false; });
    
    const throwDir = vehicle.direction;
    const startX = this.hunter.x;
    const startY = this.hunter.y;
    this.hunter.setTint(0xff0000);
    
    // Store reference for safety
    const hunter = this.hunter;
    const groundY = this.groundY;
    
    // Flying animation with safety checks
    this.tweens.add({
      targets: hunter,
      x: Math.max(100, Math.min(startX + throwDir * 150, 3900)), // Keep in bounds
      y: startY - 100,
      rotation: throwDir * Math.PI * 2,
      duration: 400,
      ease: 'Quad.easeOut',
      onComplete: () => {
        if (!hunter || !hunter.active) return; // Safety
        this.tweens.add({
          targets: hunter,
          y: groundY,
          rotation: 0,
          duration: 300,
          ease: 'Bounce.easeOut',
          onComplete: () => {
            if (hunter && hunter.active) {
              hunter.clearTint();
              hunter.setAlpha(1); // Ensure visible
              hunter.y = groundY; // Force ground position
            }
          }
        });
      }
    });
    
    btState.turdMeter = Math.min(100, btState.turdMeter + 35);
    this.showNotification('🚜 HIT BY VEHICLE!');
    this.createImpactEffect(startX, startY, 0xff6600);
    
    if (btState.turdMeter >= 100) this.triggerDeathAnimation('vehicle');
  }
  
  triggerAnimalAttack(animal) {
    if (this.gameOver || this.hunterHitCooldown) return;
    this.hunterHitCooldown = true;
    this.time.delayedCall(1500, () => { this.hunterHitCooldown = false; });
    
    const animalName = animal.animalType ? animal.animalType.toUpperCase() : 'ANIMAL';
    const pushDir = animal.direction * -1;
    this.hunter.setTint(0xff0000);
    
    this.tweens.add({
      targets: this.hunter,
      x: this.hunter.x + pushDir * 80,
      y: this.hunter.y - 30,
      duration: 200,
      ease: 'Quad.easeOut',
      yoyo: true,
      onComplete: () => { this.hunter.clearTint(); }
    });
    
    const damage = animal.animalType === 'bear' ? 40 : 
                   animal.animalType === 'cougar' ? 35 : 
                   animal.animalType === 'wolf' ? 25 : 20;
    
    btState.turdMeter = Math.min(100, btState.turdMeter + damage);
    this.showNotification(`🐾 ${animalName} ATTACK!`);
    
    animal.speed *= 2;
    animal.hasAttacked = true;
    
    this.createImpactEffect(this.hunter.x, this.hunter.y - 20, 0xff0000);
    
    if (btState.turdMeter >= 100) this.triggerDeathAnimation('animal', animalName);
  }
  
  triggerDeathAnimation(cause, extra = '') {
    if (this.gameOver) return;
    this.gameOver = true;
    this.physics.pause();
    btState.funnyDeaths++;
    
    // STOP ALL SOUNDS immediately
    try {
      this.sound.stopAll();
    } catch(e) { console.warn('Error stopping sounds:', e); }
    
    // Play game over sound and stop music
    this.playSound('gameover');
    this.stopBackgroundMusic();
    
    if (cause === 'vehicle') {
      this.tweens.add({
        targets: this.hunter,
        scaleY: 0.02,
        duration: 300,
        onComplete: () => { this.showDeathMessage('🚜 ROAD KILL!', 'Flattened like a pancake!'); }
      });
    } else if (cause === 'animal') {
      this.tweens.add({
        targets: this.hunter,
        rotation: Math.PI * 4,
        alpha: 0.5,
        y: this.groundY + 20,
        duration: 500,
        onComplete: () => { this.showDeathMessage(`🐻 MAULED!`, `Attacked by a ${extra.toLowerCase()}!`); }
      });
    } else if (cause === 'buried') {
      // Sinking into turd pile animation
      this.hunter.setTint(0xd1d5db);
      this.tweens.add({
        targets: this.hunter,
        scaleY: 0.3,
        y: this.groundY + 30,
        duration: 800,
        ease: 'Sine.easeIn',
        onComplete: () => { 
          this.showDeathMessage('💩 BURIED ALIVE!', 'Covered in so many turds you couldn\'t escape!'); 
        }
      });
      // Add turd pile
      for (let i = 0; i < 10; i++) {
        const turd = this.add.image(this.hunter.x + Phaser.Math.Between(-40, 40), this.groundY - 10, 'turd')
          .setScale(TURD_SCALE * 1.5).setDepth(15);
        this.tweens.add({
          targets: turd,
          y: turd.y - 30,
          alpha: 0.8,
          duration: 300,
          delay: i * 50
        });
      }
    } else {
      this.hunter.setTint(0xd1d5db);
      this.showDeathMessage('💩 GAME OVER DUDE!', 'Turd Happens!');
    }
    
    this.time.delayedCall(2000, () => {
      this.checkLeaderboard();
      this.showGameOverScreen();
    });
  }
  
  showDeathMessage(title, subtitle) {
    const msg = document.createElement('div');
    msg.innerHTML = `<div style="font-size:48px;margin-bottom:10px;">${title}</div><div style="font-size:20px;color:#94a3b8;">${subtitle}</div>`;
    msg.style.cssText = 'position:fixed;top:40%;left:50%;transform:translate(-50%,-50%);text-align:center;color:#ef4444;font-weight:bold;z-index:9999;text-shadow:0 4px 20px rgba(0,0,0,0.8);';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  }
  
  createImpactEffect(x, y, color) {
    for (let i = 0; i < 12; i++) {
      const particle = this.add.circle(x, y, 6, color).setDepth(20);
      const angle = (i / 12) * Math.PI * 2;
      this.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * 80,
        y: y + Math.sin(angle) * 80,
        alpha: 0,
        scale: 0.3,
        duration: 400,
        onComplete: () => particle.destroy()
      });
    }
  }

  updateItems(time) {
    this.items.getChildren().forEach(item => {
      if (!item || !item.active) return;
      item.y += Math.sin(time / 400 + item.phase) * 0.4;
      // Preserve original scale with slight pulse
      const baseScale = item.baseScale || 0.05;
      item.setScale(baseScale + Math.sin(time / 250) * 0.005);
      if (item.type === 'coin') item.rotation += 0.05;
    });
  }

  updateCoins(time) {
    const view = this.cameras.main.worldView;
    
    this.coins.getChildren().forEach(coin => {
      if (!coin || !coin.active) return;
      
      // Coin rotation and bob
      coin.rotation += 0.12;
      coin.y += Math.sin(time / 250 + coin.phase) * 0.3;
      
      // Track coin lifetime - coins disappear after 8 seconds
      if (!coin.spawnTime) coin.spawnTime = time;
      const age = (time - coin.spawnTime) / 1000;
      
      // Start flashing at 5 seconds
      if (age > 5) {
        coin.setAlpha(Math.sin(time / 100) * 0.5 + 0.5);
      }
      
      // Disappear at 8 seconds
      if (age > 8) {
        this.showPointIndicator(coin.x, coin.y, '💨 COIN GONE!', 0x9ca3af);
        coin.destroy();
        return;
      }
      
      // Cleanup offscreen coins
      if (coin.x < view.x - 200 || coin.x > view.right + 200) {
        coin.destroy();
      }
    });
  }

  handlePanelsLoop() {
    if (!this.bgPanels || !this.cameras || !this.cameras.main) return;
    
    // DISABLED - Panels are now fixed per level zone, no recycling needed
    // const camX = this.cameras.main.scrollX;
    // const panels = this.bgPanels.getChildren().filter(p => p && p.active);
    
    // Ground tiles also don't need recycling with zone-based levels
  }

  cleanupOffscreen() {
    const view = this.cameras.main.worldView;
    this.groundTurds.getChildren().forEach(gt => { if (gt && gt.active && gt.x < view.x - 800) gt.destroy(); });
    this.items.getChildren().forEach(item => { if (item && item.active && item.x < view.x - 800) item.destroy(); });
  }

  onBulletHitsBird(bullet, bird) {
    if (!bullet || !bird || !bullet.active || !bird.active) return;
    
    // Check if bullet hit a demon or lie first
    if (this.checkDemonHit(bullet)) {
      bullet.destroy();
      return;
    }
    
    const cfg = bird.config;
    if (!cfg) return;
    
    // Check if in protected park - BIG PENALTY!
    if (this.inProtectedPark) {
      bullet.destroy();
      btState.score -= 100;
      const msg = protectedParkMessages[Math.floor(Math.random() * protectedParkMessages.length)];
      this.showNotification(msg);
      this.showPointIndicator(bird.x, bird.y, '-100 NO HUNTING!', 0xef4444);
      this.cameras.main.shake(200, 0.01);
      return; // Don't kill bird in protected park
    }
    
    bullet.destroy();
    bird.health = (bird.health || 1) - (bullet.damage || 1);
    
    // Play hit sound
    this.playSound('hit');
    
    // Play bird species sound when hit!
    const birdType = cfg.sprite || 'bird';
    this.playSound(birdType);
    
    if (bird.health <= 0) {
      // Play bird death sound
      this.playSound('bird_death');
      
      // Random chance to play combat line (20% chance)
      if (Math.random() < 0.20) {
        this.playRandomCombatLine();
      }
      
      let points = cfg.score;
      if (btState.doublePoints) points *= 2;
      btState.score += points;
      btState.kills++;
      
      // Level progression - only count shootable birds
      if (cfg.shootable && points > 0) {
        this.onBirdKilled();
      }
      
      // Show point indicator - BIGGER and CLEARER for penalties
      if (points < 0) {
        // PENALTY - show big red warning
        this.showPointIndicator(bird.x, bird.y - 20, `${points} POINTS!`, 0xef4444);
        this.showPointIndicator(bird.x, bird.y + 20, `DON'T SHOOT ${cfg.helper ? 'HELPERS' : 'PROTECTED'}!`, 0xef4444);
        this.cameras.main.shake(150, 0.008);
      } else {
        this.showPointIndicator(bird.x, bird.y, `+${points}`, 0x22c55e);
      }
      
      // FUNNY COMMENTS based on bird type!
      if (cfg.shootable && points > 0) {
        // Shootable bird - celebrate!
        const msg = shootableBirdKillMessages[Math.floor(Math.random() * shootableBirdKillMessages.length)];
        this.showNotification(msg);
      } else if (!cfg.shootable || points < 0) {
        // Protected bird - scold player!
        const msg = protectedBirdHitMessages[Math.floor(Math.random() * protectedBirdHitMessages.length)];
        this.showNotification(msg);
      }
      
      if (cfg.coinDrop && cfg.coinDrop > 0) this.spawnCoinDrop(bird.x, bird.y, cfg.coinDrop * btState.upgrades.coinMultiplier);
      
      if (cfg.respawns && !bird.hasRespawned) { bird.hasRespawned = true; bird.health = cfg.health || 3; return; }
      
      // BIRD FALLS TO GROUND animation
      this.createDeathEffect(bird.x, bird.y);
      bird.body.setAllowGravity(true);
      bird.body.setGravityY(800);
      bird.body.setVelocity(Phaser.Math.Between(-50, 50), -100);
      bird.setTint(0x666666);
      
      // Rotate as it falls
      this.tweens.add({
        targets: bird,
        rotation: bird.direction > 0 ? 3 : -3,
        alpha: 0.7,
        duration: 800,
        onComplete: () => { if (bird && bird.active) bird.destroy(); }
      });
      
      btState.accuracy = btState.shots > 0 ? Math.round((btState.kills / btState.shots) * 100) : 0;
    } else {
      bird.setTint(0xff0000);
      this.time.delayedCall(100, () => { if (bird && bird.active) bird.clearTint(); });
    }
  }

  onTurdHitsHunter(hunter, turd) {
    if (!turd || !turd.active) return;
    if (btState.invincible) { turd.destroy(); return; }
    
    // ========== ANGEL PROTECTION - blocks turds! ==========
    if (btState.angelProtectionActive) {
      const protection = ANGEL_PROTECTION[btState.angelProtectionLevel];
      if (Math.random() < protection.turdBlock) {
        turd.destroy();
        this.showPointIndicator(hunter.x, hunter.y - 80, '😇 ANGEL BLOCKED!', 0xffd700);
        // Golden flash effect
        const flash = this.add.circle(hunter.x, hunter.y - 40, 30, 0xffd700, 0.5).setDepth(25);
        this.tweens.add({
          targets: flash,
          alpha: 0, scale: 2,
          duration: 300,
          onComplete: () => flash.destroy()
        });
        return;
      }
    }
    
    // Play splat sound
    this.playSound('splat');
    
    // Play turd-specific reaction line (30% chance to not spam)
    if (Math.random() < 0.30) {
      this.playTurdReactionLine();
    }
    
    // HAT PROTECTION - blocks turds!
    if (btState.hatProtection) {
      turd.destroy();
      this.showPointIndicator(hunter.x, hunter.y - 80, '🎩 HAT BLOCKED!', 0xfacc15);
      // Small bounce animation on hat
      return;
    }
    
    // Turd meter damage (not health!) - affected by armor AND angel protection
    let damage = 8 * (1 - btState.upgrades.armor);
    if (btState.angelProtectionActive) {
      const protection = ANGEL_PROTECTION[btState.angelProtectionLevel];
      damage *= (1 - protection.damageReduction);
    }
    btState.turdMeter = Math.min(btState.maxTurdMeter, btState.turdMeter + damage);
    btState.turdCount++;
    turd.destroy();
    
    // Create visible turd stuck to hunter
    if (!this.hunterTurds) this.hunterTurds = [];
    const stuckTurd = this.add.image(
      hunter.x + Phaser.Math.Between(-20, 20), 
      hunter.y - Phaser.Math.Between(20, 60), 
      'turd'
    ).setScale(TURD_SCALE * 0.8).setDepth(12).setAlpha(0.9);
    this.hunterTurds.push(stuckTurd);
    
    // Splat animation
    this.tweens.add({
      targets: stuckTurd,
      scaleX: TURD_SCALE * 1.2,
      scaleY: TURD_SCALE * 0.6,
      duration: 100,
      yoyo: true
    });
    
    // Flash hunter whitish-grey (covered in turd)
    hunter.setTint(0xd1d5db);
    this.time.delayedCall(150, () => { if (hunter && hunter.active) hunter.clearTint(); });
    
    // Funny exclamation
    const exclaim = turdExclamations[Math.floor(Math.random() * turdExclamations.length)];
    this.showPointIndicator(hunter.x, hunter.y - 80, exclaim, 0xd1d5db);
    
    // Turd meter warnings
    if (btState.turdMeter >= 80 && btState.turdMeter < 100) {
      this.showNotification('⚠️ SHAKE IT OFF! Press X or Q!');
    }
    
    // Death if turd meter full (buried in turds!)
    if (btState.turdMeter >= 100) {
      this.triggerDeathAnimation('buried');
    }
    
    this.updateHud();
  }

  onCollectItem(hunter, item) {
    if (!item || !item.active) return;
    if (item.type === 'ammo') { 
      btState.ammo = Math.min(btState.ammoMax, btState.ammo + 30); 
      this.showNotification('📦 +30 AMMO!'); 
    }
    else if (item.type === 'firstaid') { 
      const healAmount = 35;
      btState.health = Math.min(btState.maxHealth, btState.health + healAmount);
      btState.turdCount = Math.max(0, btState.turdCount - 3);
      // Clear some visible turds
      if (this.hunterTurds) {
        const toRemove = this.hunterTurds.splice(0, 3);
        toRemove.forEach(t => t && t.destroy());
      }
      this.showNotification(`❤️ +${healAmount} HEALTH!`);
      this.showPointIndicator(hunter.x, hunter.y - 50, `+${healAmount} HP`, 0x22c55e);
      this.updateHud();
    }
    else if (item.type === 'coin') { 
      this.addCoins(5);
    }
    item.destroy();
  }

  onCollectCoin(hunter, coin) {
    // Multiple safety checks to prevent crashes
    if (!coin) return;
    if (!coin.active) return;
    if (!hunter || !hunter.active) return;
    
    try {
      // Check if it's a new day - reset daily counter
      const today = new Date().toDateString();
      if (btState.lastCoinDate !== today) {
        btState.coinsEarnedToday = 0;
        btState.lastCoinDate = today;
      }
      
      // Check daily limit
      if (btState.coinsEarnedToday >= btState.dailyCoinLimit) {
        // Show limit reached message (only once per session)
        if (!this.dailyLimitShown) {
          this.showMessage('Daily coin limit reached! (500/day)', '#f59e0b');
          this.dailyLimitShown = true;
        }
        coin.destroy();
        return;
      }
      
      // Actually collect the coin
      btState.coins++;
      btState.coinsEarnedToday++;
      btState.score += 5; // Coins give score too!
      
      // VISIBLE FEEDBACK - Show coin collected!
      this.showPointIndicator(coin.x, coin.y - 20, '+1 🪙', 0xfacc15);
      
      // Also show score added
      this.showPointIndicator(coin.x + 30, coin.y - 40, '+5 PTS', 0x22c55e);
      
      // Play coin sound
      this.playSound('coin');
      
      // Sparkle effect
      if (this.add && this.add.particles) {
        try {
          const sparkle = this.add.circle(coin.x, coin.y, 15, 0xfacc15, 0.8).setDepth(20);
          this.tweens.add({
            targets: sparkle,
            scale: 2,
            alpha: 0,
            duration: 300,
            onComplete: () => sparkle.destroy()
          });
        } catch(e) {}
      }
      
      this.savePlayerData();
      coin.destroy();
      
      // Show progress toward daily limit every 50 coins
      if (btState.coinsEarnedToday % 50 === 0 && btState.coinsEarnedToday < btState.dailyCoinLimit) {
        this.showNotification(`🪙 ${btState.coinsEarnedToday}/${btState.dailyCoinLimit} daily coins!`);
      }
    } catch(e) {
      console.error('Coin collection error:', e);
      if (coin && coin.active) coin.destroy();
    }
  }

  spawnTurd(x, y) {
    if (!this.textures.exists('turd')) return;
    const turd = this.turds.create(x, y, 'turd').setOrigin(0.5).setScale(TURD_SCALE).setDepth(11);
    turd.body.setAllowGravity(true);
    turd.body.setVelocityX(Phaser.Math.Between(-20, 20));
    
    // ANIMATE THE TURD! Spin and wobble as it falls
    this.tweens.add({
      targets: turd,
      rotation: Math.PI * 2 * (Math.random() > 0.5 ? 1 : -1), // Full spin
      duration: 800,
      repeat: -1,
      ease: 'Linear'
    });
    
    // Wobble scale for gross effect
    this.tweens.add({
      targets: turd,
      scaleX: TURD_SCALE * 1.2,
      scaleY: TURD_SCALE * 0.8,
      duration: 150,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // Add stink lines emoji that follows the turd
    const stink = this.add.text(x, y - 15, '💨', { fontSize: '12px' }).setOrigin(0.5).setDepth(10).setAlpha(0.6);
    turd.stinkEffect = stink;
  }

  spawnGroundTurd(x) {
    if (!this.textures.exists('turd')) return;
    const gt = this.groundTurds.create(x, this.groundY - 5, 'turd').setOrigin(0.5, 1).setScale(TURD_SCALE * 1.2).setAlpha(0.8).setDepth(4);
    gt.body.setAllowGravity(false);
    
    // Ground turds get flies!
    const flies = this.add.text(x, this.groundY - 20, '🪰', { fontSize: '10px' }).setOrigin(0.5).setDepth(5);
    this.tweens.add({
      targets: flies,
      x: x + 10,
      y: this.groundY - 25,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    gt.fliesEffect = flies;
  }

  spawnCoinDrop(x, y, count) {
    if (!this.textures.exists('coin')) return;
    for (let i = 0; i < count; i++) {
      // Coins at reasonable size
      const coin = this.coins.create(x + (Math.random() - 0.5) * 30, y, 'coin').setOrigin(0.5).setScale(0.04).setDepth(12);
      coin.phase = Math.random() * Math.PI * 2;
      coin.body.setAllowGravity(false);
      coin.body.setVelocity(Phaser.Math.Between(-60, 60), Phaser.Math.Between(-120, -40));
      
      // Add 💰 emoji above coin for extra visibility
      const label = this.add.text(coin.x, coin.y - 15, '💰', { fontSize: '12px' }).setOrigin(0.5).setDepth(13);
      
      this.tweens.add({ 
        targets: coin.body.velocity, 
        y: 80, 
        duration: 600, 
        onComplete: () => { 
          if (coin && coin.active) coin.body.setVelocity(0, 0);
          if (label && label.active) label.destroy();
        }
      });
      
      // Fade out label
      this.tweens.add({
        targets: label,
        alpha: 0,
        y: label.y - 20,
        duration: 800,
        onComplete: () => { if (label) label.destroy(); }
      });
    }
  }

  getNearestShootableBird(x, y) {
    let nearest = null, minDist = Infinity;
    this.birds.getChildren().forEach(bird => {
      if (!bird || !bird.active || !bird.config || !bird.config.shootable) return;
      const dist = Math.hypot(bird.x - x, bird.y - y);
      if (dist < minDist) { minDist = dist; nearest = bird; }
    });
    return nearest;
  }

  createDeathEffect(x, y) {
    for (let i = 0; i < 8; i++) {
      const feather = this.add.ellipse(x, y, 8, 4, 0xffffff, 0.7).setDepth(15);
      const angle = (i / 8) * Math.PI * 2;
      this.tweens.add({ targets: feather, x: x + Math.cos(angle) * 60, y: y + Math.sin(angle) * 60, alpha: 0, rotation: Math.random() * 4, duration: 500, onComplete: () => feather.destroy() });
    }
  }

  showPointIndicator(x, y, text, color = 0xffffff) {
    const indicator = this.add.text(x, y - 30, text, { fontSize: '28px', fontFamily: 'system-ui', color: '#' + color.toString(16).padStart(6, '0'), fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5).setDepth(25);
    this.tweens.add({ targets: indicator, y: indicator.y - 80, alpha: 0, scale: 1.5, duration: 1200, onComplete: () => indicator.destroy() });
  }

  showNotification(message) {
    // On mobile, route to popup below game instead of overlay
    if (window.GameUIText && GameUIText.isMobile && GameUIText.isMobile()) {
      GameUIText.show(message, { title: '📢 Alert', timeout: 3000 });
      return;
    }
    
    // Desktop: use standard notification
    const notif = document.createElement('div');
    notif.textContent = message;
    notif.style.cssText = 'position:fixed;top:100px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.85);color:#facc15;padding:12px 28px;border-radius:8px;font-size:18px;font-weight:bold;z-index:9999;';
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2000);
  }
  
  // ========== SCRIPTURE DISPLAY SYSTEM ==========
  showScripturePopup(scripture, color = 0xffd700, duration = 5000) {
    // RATE LIMITING: Only show scripture once every 60 seconds
    const now = Date.now();
    if (this.lastScriptureTime && (now - this.lastScriptureTime) < 60000) {
      console.log('Scripture rate limited - wait 60s between popups');
      return; // Skip if less than 60 seconds since last scripture
    }
    this.lastScriptureTime = now;
    
    // Handle both string format and object format
    let verseText, refText;
    if (typeof scripture === 'string') {
      // Parse string format: "\"verse text\" — Reference"
      const match = scripture.match(/^"?(.+?)"?\s*[—-]\s*(.+)$/);
      if (match) {
        verseText = match[1].replace(/^"|"$/g, '');
        refText = match[2];
      } else {
        verseText = scripture;
        refText = '';
      }
    } else if (scripture && typeof scripture === 'object') {
      verseText = scripture.verse || scripture.text || 'Scripture';
      refText = scripture.ref || scripture.reference || '';
    } else {
      console.warn('Invalid scripture format:', scripture);
      return; // Don't show popup for invalid data
    }
    
    // On mobile, route to popup below game
    if (window.GameUIText && GameUIText.isMobile && GameUIText.isMobile()) {
      const mobileMsg = `✝️ "${verseText}"${refText ? ' — ' + refText : ''}`;
      GameUIText.show(mobileMsg, { title: '📖 Scripture', timeout: 6000 });
      return;
    }
    
    // Create beautiful scripture banner at top of screen
    const colorHex = '#' + color.toString(16).padStart(6, '0');
    
    const banner = document.createElement('div');
    banner.id = 'scripture-popup';
    banner.innerHTML = `
      <button onclick="this.parentElement.remove()" style="position:absolute;top:8px;right:8px;background:#ef4444;color:#fff;border:none;width:24px;height:24px;border-radius:50%;cursor:pointer;font-size:16px;line-height:1;">×</button>
      <div style="font-size:18px;font-weight:bold;margin-bottom:8px;">✝️ ${verseText} ✝️</div>
      ${refText ? `<div style="font-size:14px;font-style:italic;color:#ffd700;">— ${refText}</div>` : ''}
    `;
    banner.style.cssText = `
      position:fixed;top:40px;left:50%;transform:translateX(-50%);
      background:linear-gradient(135deg, rgba(0,30,60,0.95), rgba(0,15,30,0.95));
      color:${colorHex};padding:20px 40px;border-radius:10px;
      font-size:16px;z-index:10000;text-align:center;
      border:2px solid ${colorHex};box-shadow:0 0 30px ${colorHex}40;
      animation: scriptureGlow 2s ease-in-out infinite;
      max-width:80vw;
    `;
    
    // Add glow animation
    if (!document.getElementById('scripture-style')) {
      const style = document.createElement('style');
      style.id = 'scripture-style';
      style.textContent = `
        @keyframes scriptureGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,215,0,0.3); }
          50% { box-shadow: 0 0 40px rgba(255,215,0,0.6); }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(banner);
    
    // Fade in
    banner.style.opacity = '0';
    banner.style.transition = 'opacity 0.5s ease-out';
    setTimeout(() => banner.style.opacity = '1', 50);
    
    // SPEAK THE SCRIPTURE using ElevenLabs
    const speakText = verseText + (refText ? '. ' + refText : '');
    this.speakText(speakText, 'scripture');
    
    // Remove after duration (default 5 seconds)
    setTimeout(() => {
      banner.style.opacity = '0';
      setTimeout(() => banner.remove(), 500);
    }, duration);
  }
  
  showDemonScripture() {
    // Show empowering scripture when demon appears
    const scripture = DEMON_SCRIPTURES[Math.floor(Math.random() * DEMON_SCRIPTURES.length)];
    this.showScripturePopup(scripture, 0x44ff44);
    this.showNotification('😈 DEMON APPROACHES! Stand firm in faith!', 0xff4444);
  }
  
  showAngelScripture() {
    // Show protection scripture when angel is called
    const scripture = ANGEL_SCRIPTURES[Math.floor(Math.random() * ANGEL_SCRIPTURES.length)];
    this.showScripturePopup(scripture, 0xffd700);
  }
  
  showVictoryScripture() {
    // Show victory scripture when demon is defeated/flees
    const scripture = VICTORY_SCRIPTURES[Math.floor(Math.random() * VICTORY_SCRIPTURES.length)];
    this.showScripturePopup(scripture, 0x22c55e);
  }
  
  showWarriorScripture() {
    // Show warrior scripture for encouragement
    const scripture = WARRIOR_SCRIPTURES[Math.floor(Math.random() * WARRIOR_SCRIPTURES.length)];
    this.showScripturePopup(scripture, 0x88ccff);
  }
  
  showLoveScripture() {
    // Show God's love scripture
    const scripture = LOVE_SCRIPTURES[Math.floor(Math.random() * LOVE_SCRIPTURES.length)];
    this.showScripturePopup(scripture, 0xff88cc);
  }

  showRandomJoke() {
    if (this.gameOver || this.paused) return;
    
    // Check if user bought no-jokes mode
    if (localStorage.getItem('birdturds_noJokes') === 'true') {
      // Schedule next check but don't show joke
      this.time.delayedCall(this.jokeInterval * 1000, () => this.showRandomJoke());
      return;
    }
    
    // 30% chance to show scripture instead of joke
    if (Math.random() < 0.30) {
      this.showEncouragementScripture();
      this.time.delayedCall(this.jokeInterval * 1000, () => this.showRandomJoke());
      return;
    }
    
    // Pick a random joke (different from last one)
    let idx;
    do {
      idx = Math.floor(Math.random() * this.jokes.length);
    } while (idx === this.lastJokeIndex && this.jokes.length > 1);
    this.lastJokeIndex = idx;
    
    const joke = this.jokes[idx];
    
    // SPEAK THE JOKE using ElevenLabs
    this.speakText(joke.setup + '... ' + joke.punchline, 'joke');
    
    // Show in the joke banner - overlays ad temporarily then auto-hides
    const banner = document.getElementById('joke-banner');
    const content = document.getElementById('joke-content');
    
    if (banner && content) {
      // 50% chance to include a scripture with the joke
      let scriptureHtml = '';
      if (Math.random() < 0.5) {
        const scripture = ENCOURAGEMENT_SCRIPTURES[Math.floor(Math.random() * ENCOURAGEMENT_SCRIPTURES.length)];
        scriptureHtml = `<div style="font-size:11px;color:#ffd700;margin-top:12px;font-style:italic;border-top:1px solid #333;padding-top:8px;">✝️ "${scripture.verse}" — ${scripture.ref}</div>`;
      }
      
      content.innerHTML = `
        <button onclick="document.getElementById('joke-banner').style.display='none'" style="position:absolute;top:8px;right:8px;background:#ef4444;color:#fff;border:none;width:24px;height:24px;border-radius:50%;cursor:pointer;font-size:16px;line-height:1;">×</button>
        <div style="color:#facc15;font-weight:bold;font-size:14px;margin-bottom:8px;">😂 DAILY GIGGLE 😂</div>
        <div style="font-size:15px;margin-bottom:8px;">${joke.setup}</div>
        <div style="color:#facc15;font-size:17px;font-weight:bold;">${joke.punchline}</div>
        ${scriptureHtml}
        <div style="font-size:10px;color:#9ca3af;margin-top:10px;font-style:italic;">Brought to you by Dude.com 😂</div>
      `;
      
      // Ensure banner has relative positioning for close button
      banner.style.position = 'relative';
      
      // Show joke banner overlaying the GermProof ad
      banner.style.display = 'block';
      banner.style.opacity = '1';
      banner.style.transition = 'opacity 0.5s ease-out';
      
      // Auto-fade after 6 seconds, then hide completely
      setTimeout(() => {
        banner.style.opacity = '0';
        setTimeout(() => {
          banner.style.display = 'none';
        }, 500);
      }, 6000);
    }
    
    // Schedule next joke
    this.time.delayedCall(this.jokeInterval * 1000, () => this.showRandomJoke());
  }
  
  showEncouragementScripture() {
    // Pick random encouragement scripture
    const scripture = ENCOURAGEMENT_SCRIPTURES[Math.floor(Math.random() * ENCOURAGEMENT_SCRIPTURES.length)];
    
    // Show in the joke banner area
    const banner = document.getElementById('joke-banner');
    const content = document.getElementById('joke-content');
    
    if (banner && content) {
      // Mix it up - sometimes warrior, sometimes love
      const titles = [
        '✝️ GOD\'S WORD FOR YOU ✝️',
        '⚔️ WARRIOR\'S WORD ⚔️',
        '❤️ GOD LOVES YOU ❤️',
        '🛡️ STAND FIRM IN FAITH 🛡️',
        '✨ TRUTH & LIGHT ✨'
      ];
      const title = titles[Math.floor(Math.random() * titles.length)];
      
      content.innerHTML = `
        <div style="color:#ffd700;font-weight:bold;font-size:16px;margin-bottom:12px;">${title}</div>
        <div style="font-size:16px;margin-bottom:10px;line-height:1.4;">"${scripture.verse}"</div>
        <div style="color:#88ccff;font-size:14px;font-style:italic;">— ${scripture.ref}</div>
        <div style="font-size:10px;color:#9ca3af;margin-top:12px;">Jesus is Lord • God wants warriors for truth!</div>
      `;
      
      banner.style.display = 'block';
      banner.style.opacity = '1';
      banner.style.transition = 'opacity 0.5s ease-out';
      
      setTimeout(() => {
        banner.style.opacity = '0';
        setTimeout(() => { banner.style.display = 'none'; }, 500);
      }, 7000); // Longer display for scripture
    }
  }
  
  // SHOW SCRIPTURE IN SIDEBAR BANNER - Non-intrusive display
  // Type: 'wake' | 'rapture' | 'signs' | 'hope' | 'family' | 'teen'
  showScriptureInBanner(scripture, type = 'wake') {
    if (!scripture) return;
    
    const banner = document.getElementById('joke-banner');
    const content = document.getElementById('joke-content');
    
    if (!banner || !content) return;
    
    // Different styles based on scripture type
    let headerColor, headerText, borderColor, messageColor, footerText;
    
    switch(type) {
      case 'rapture':
        headerColor = '#ffd700';
        headerText = '☁️ THE RAPTURE IS COMING ☁️';
        borderColor = '#ffd700';
        messageColor = '#22c55e';
        footerText = 'God doesn\'t want ANYONE left behind! Are YOU ready?';
        break;
      case 'signs':
        headerColor = '#ff6666';
        headerText = '⚠️ END TIMES SIGNS ⚠️';
        borderColor = '#ff4444';
        messageColor = '#ffa500';
        footerText = 'The signs are all around us - Wake up!';
        break;
      case 'hope':
        headerColor = '#22c55e';
        headerText = '💚 HOPE IN CHRIST 💚';
        borderColor = '#22c55e';
        messageColor = '#88ccff';
        footerText = 'Jesus overcame the world - You can too!';
        break;
      case 'family':
        headerColor = '#f472b6';
        headerText = '👨‍👩‍👧‍👦 FAMILY WARNING 👨‍👩‍👧‍👦';
        borderColor = '#f472b6';
        messageColor = '#ff88cc';
        footerText = 'Unite your family in Christ before it\'s too late!';
        break;
      case 'teen':
        headerColor = '#3b82f6';
        headerText = '📱 WAKE UP GENERATION! 📱';
        borderColor = '#3b82f6';
        messageColor = '#60a5fa';
        footerText = 'Put down the phone. Pick up the Bible!';
        break;
      default: // wake
        headerColor = '#22c55e';
        headerText = '✝️ SOUL AWAKENED! ✝️';
        borderColor = '#22c55e';
        messageColor = '#88ff88';
        footerText = 'Another soul set free from distraction!';
    }
    
    // Build scripture content with TPUSA Faith link for youth resources
    const resourceLink = type === 'teen' || type === 'wake' 
      ? '<div style="font-size:9px;margin-top:8px;"><a href="https://tpusafaith.com" target="_blank" style="color:#60a5fa;text-decoration:underline;">Learn more at TPUSA Faith</a> - Equipping youth for biblical truth!</div>'
      : '';
    
    content.innerHTML = `
      <div style="border:2px solid ${borderColor};border-radius:10px;padding:12px;background:rgba(0,0,0,0.3);">
        <div style="color:${headerColor};font-weight:bold;font-size:14px;margin-bottom:10px;text-align:center;">${headerText}</div>
        <div style="font-size:13px;margin-bottom:8px;line-height:1.4;color:#ffffff;font-style:italic;">"${scripture.verse}"</div>
        <div style="color:#ffd700;font-size:12px;text-align:right;margin-bottom:8px;">— ${scripture.ref}</div>
        ${scripture.message ? `<div style="color:${messageColor};font-size:11px;font-weight:bold;text-align:center;margin-bottom:6px;">${scripture.message}</div>` : ''}
        <div style="font-size:10px;color:#9ca3af;text-align:center;border-top:1px solid #333;padding-top:8px;margin-top:8px;">${footerText}</div>
        ${resourceLink}
      </div>
    `;
    
    banner.style.display = 'block';
    banner.style.opacity = '1';
    banner.style.transition = 'opacity 0.5s ease-out';
    
    // Display time based on type (rapture gets longer)
    const displayTime = type === 'rapture' ? 10000 : 7000;
    
    setTimeout(() => {
      banner.style.opacity = '0';
      setTimeout(() => { banner.style.display = 'none'; }, 500);
    }, displayTime);
  }
  
  // WELLNESS SYSTEM - Encourage healthy gaming habits
  checkWellness() {
    if (this.gameOver) return;
    
    const now = Date.now();
    const sessionMinutes = Math.floor((now - this.sessionStartTime) / 60000);
    
    // Check if it's time for a wellness reminder (every 20 minutes)
    if (now - this.lastBreakReminder >= this.breakInterval) {
      this.lastBreakReminder = now;
      this.showWellnessReminder();
    }
    
    // Save total play time periodically
    const totalMinutes = this.totalPlayTime + sessionMinutes;
    localStorage.setItem('birdturds_totalPlayTime', totalMinutes.toString());
    
    // Schedule next check
    this.time.delayedCall(60000, () => this.checkWellness()); // Check every minute
  }
  
  showWellnessReminder() {
    // Pick random wellness message
    let idx;
    do {
      idx = Math.floor(Math.random() * this.wellnessMessages.length);
    } while (idx === this.lastWellnessIndex && this.wellnessMessages.length > 1);
    this.lastWellnessIndex = idx;
    
    const wellness = this.wellnessMessages[idx];
    const sessionMinutes = Math.floor((Date.now() - this.sessionStartTime) / 60000);
    
    // Create wellness popup
    const popup = document.createElement('div');
    popup.id = 'wellness-popup';
    popup.innerHTML = `
      <div style="background:linear-gradient(135deg,#1e3a5f,#0f172a);padding:25px;border-radius:16px;max-width:400px;text-align:center;border:2px solid #3b82f6;box-shadow:0 10px 40px rgba(59,130,246,0.3);">
        <div style="font-size:50px;margin-bottom:15px;">${wellness.icon}</div>
        <h3 style="color:#60a5fa;font-size:18px;margin-bottom:10px;">Healthy Gaming Reminder</h3>
        <p style="color:#e2e8f0;font-size:14px;margin-bottom:15px;">${wellness.msg}</p>
        <p style="color:#94a3b8;font-size:12px;margin-bottom:20px;">You've been playing for ${sessionMinutes} minutes this session.</p>
        <div style="display:flex;gap:10px;justify-content:center;">
          <button onclick="document.getElementById('wellness-popup').remove()" style="background:#3b82f6;color:#fff;border:none;padding:10px 25px;border-radius:999px;font-weight:bold;cursor:pointer;">Got it! 👍</button>
          <button onclick="document.getElementById('wellness-popup').remove();if(typeof pauseGame==='function')pauseGame();" style="background:#22c55e;color:#fff;border:none;padding:10px 20px;border-radius:999px;font-weight:bold;cursor:pointer;">Take a Break 🧘</button>
        </div>
        <p style="color:#64748b;font-size:10px;margin-top:15px;">💡 Tip: Regular breaks improve focus and performance!</p>
      </div>
    `;
    popup.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:15000;';
    document.body.appendChild(popup);
    
    // Auto-dismiss after 15 seconds
    setTimeout(() => {
      const el = document.getElementById('wellness-popup');
      if (el) el.remove();
    }, 15000);
  }
  
  // BOT SYSTEM - AI players that hunt alongside or compete
  initBots(count = 2) {
    this.bots = [];
    console.log('🤖 initBots called with count:', count);
    
    const botNames = ['TurdHunterBot', 'BirdSlayer99', 'PoopDodger', 'SkyShooter', 'FeatherFury', 'WingClipper'];
    const botColors = [0x3b82f6, 0x22c55e, 0xf59e0b, 0xec4899, 0x8b5cf6];
    
    // Get camera view to spawn bots near player
    const view = this.cameras.main.worldView;
    const spawnX = view.x + view.width / 2;
    
    for (let i = 0; i < Math.min(count, this.maxBots); i++) {
      // Spawn bots near center of current view (near player)
      const offsetX = (i === 0) ? -150 : 150; // One on each side of player
      
      const bot = {
        id: 'bot_' + i,
        name: botNames[i % botNames.length],
        x: spawnX + offsetX,
        y: this.groundY,
        score: 0,
        kills: 0,
        health: 100,
        direction: Math.random() < 0.5 ? -1 : 1,
        targetBird: null,
        shootCooldown: 0,
        moveCooldown: 0,
        color: botColors[i % botColors.length],
        sprite: null,
        nameTag: null,
        _isBot: true // Tag for debug
      };
      
      // Create bot sprite (tinted hunter)
      if (this.textures.exists('hunter')) {
        bot.sprite = this.add.sprite(bot.x, bot.y, 'hunter')
          .setOrigin(0.5, 1)
          .setScale(0.22) // Slightly smaller than player
          .setTint(bot.color)
          .setAlpha(0.85)
          .setDepth(9)
          .setVisible(true)
          .setActive(true);
        
        // Name tag above bot
        bot.nameTag = this.add.text(bot.x, bot.y - 80, `🤖 ${bot.name}`, {
          fontSize: '10px',
          color: '#' + bot.color.toString(16).padStart(6, '0'),
          backgroundColor: '#000000aa',
          padding: { x: 4, y: 2 }
        }).setOrigin(0.5).setDepth(10);
        
        console.log(`🤖 Bot ${i} created:`, bot.name, 'at', bot.x, bot.y, 'sprite:', bot.sprite ? 'OK' : 'FAILED');
      } else {
        console.warn('🤖 Hunter texture not found for bot!');
      }
      
      this.bots.push(bot);
    }
    
    console.log(`Initialized ${this.bots.length} bots`);
  }
  
  updateBots(dt) {
    if (!this.bots || this.bots.length === 0) return;
    
    try {
      this.bots.forEach(bot => {
        if (!bot || bot.health <= 0) return;
        
        // Update cooldowns
        bot.shootCooldown = Math.max(0, bot.shootCooldown - dt);
        bot.moveCooldown = Math.max(0, bot.moveCooldown - dt);
        
        // Find nearest shootable bird
        if (!bot.targetBird || !bot.targetBird.active) {
          bot.targetBird = this.getNearestShootableBird(bot.x, bot.y);
        }
        
        // AI MOVEMENT
        if (bot.moveCooldown <= 0) {
          if (bot.targetBird && bot.targetBird.active) {
            // Move toward bird's X position
            const dx = bot.targetBird.x - bot.x;
            if (Math.abs(dx) > 50) {
              bot.direction = dx > 0 ? 1 : -1;
              bot.x += bot.direction * 150 * dt;
            }
          } else {
            // Wander randomly
            if (Math.random() < 0.02) {
              bot.direction = -bot.direction;
            }
            bot.x += bot.direction * 80 * dt;
          }
          
          // Keep in bounds
          bot.x = Math.max(100, Math.min(WORLD_WIDTH - 100, bot.x));
        }
        
        // AI SHOOTING
        if (bot.targetBird && bot.targetBird.active && bot.shootCooldown <= 0) {
          const dist = Math.hypot(bot.targetBird.x - bot.x, bot.targetBird.y - bot.y);
        
        if (dist < 500) { // Within range
          // Bot shoots! (with some inaccuracy)
          const accuracy = 0.7 + Math.random() * 0.2; // 70-90% accurate
          
          if (Math.random() < accuracy) {
            // Hit!
            const bird = bot.targetBird;
            if (!bird || !bird.active) {
              bot.targetBird = null;
              return;
            }
            bird.health = (bird.health || 1) - 1;
            
            if (bird.health <= 0) {
              const points = (bird.config && bird.config.score) ? bird.config.score : 10;
              bot.score += points;
              bot.kills++;
              
              // Show bot kill indicator
              this.showPointIndicator(bird.x, bird.y, `🤖 +${points}`, bot.color);
              
              // Kill bird
              this.tweens.add({
                targets: bird,
                y: bird.y + 100,
                alpha: 0,
                rotation: Math.random() * 2,
                duration: 300,
                onComplete: () => bird.destroy()
              });
              
              bot.targetBird = null;
            }
          }
          
          // Muzzle flash for bot
          if (bot.sprite) {
            const flash = this.add.circle(bot.x + (bot.direction * 30), bot.y - 60, 8, 0xffff00).setDepth(15);
            this.tweens.add({ targets: flash, alpha: 0, scale: 2, duration: 100, onComplete: () => flash.destroy() });
          }
          
          bot.shootCooldown = 0.8 + Math.random() * 0.4; // Vary timing
        }
      }
      
      // Update bot sprite position
      if (bot.sprite) {
        bot.sprite.setPosition(bot.x, bot.y);
        bot.sprite.setFlipX(bot.direction > 0);
        
        // Aim tilt toward target
        if (bot.targetBird) {
          const aimDy = bot.targetBird.y - bot.y;
          const tilt = aimDy < 0 ? -0.2 : 0.05;
          bot.sprite.setRotation(bot.direction < 0 ? -tilt : tilt);
        }
      }
      
      // Update name tag
      if (bot.nameTag) {
        bot.nameTag.setPosition(bot.x, bot.y - 80);
        bot.nameTag.setText(`🤖 ${bot.name} (${bot.score})`);
      }
    });
    } catch(e) {
      console.error('Bot update error:', e);
    }
  }
  
  // Get bot leaderboard
  getBotScores() {
    return this.bots.map(b => ({ name: b.name, score: b.score, kills: b.kills, isBot: true }));
  }

  showInstructions() { const el = document.getElementById('instructions'); if (el) el.style.display = 'block'; }
  hideInstructions() { const el = document.getElementById('instructions'); if (el) el.style.display = 'none'; }
  showLeaderboard() { if (typeof window.showLeaderboardModal === 'function') window.showLeaderboardModal(); }

  updateHud() {
    if (this.hudElements.score) this.hudElements.score.textContent = btState.score.toLocaleString();
    
    // Health bar (green/yellow/red based on level)
    if (this.hudElements.healthFill) {
      this.hudElements.healthFill.style.width = btState.health + '%';
      if (btState.health > 60) {
        this.hudElements.healthFill.style.background = 'linear-gradient(90deg, #22c55e, #16a34a)';
      } else if (btState.health > 30) {
        this.hudElements.healthFill.style.background = 'linear-gradient(90deg, #facc15, #eab308)';
      } else {
        this.hudElements.healthFill.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)';
      }
    }
    
    // Turd-O-Meter bar (grey to brown as it fills)
    if (this.hudElements.turdFill) {
      this.hudElements.turdFill.style.width = btState.turdMeter + '%';
      if (btState.turdMeter < 50) {
        this.hudElements.turdFill.style.background = 'linear-gradient(90deg, #9ca3af, #6b7280)';
      } else if (btState.turdMeter < 80) {
        this.hudElements.turdFill.style.background = 'linear-gradient(90deg, #a16207, #854d0e)';
      } else {
        this.hudElements.turdFill.style.background = 'linear-gradient(90deg, #7c2d12, #451a03)';
      }
    }
    
    if (this.hudElements.ammoFill) this.hudElements.ammoFill.style.width = (btState.ammo / btState.ammoMax * 100) + '%';
    if (this.hudElements.ammoText) this.hudElements.ammoText.textContent = `${btState.ammo}/${btState.ammoMax}`;
    if (this.hudElements.coins) this.hudElements.coins.textContent = btState.coins.toLocaleString();
    if (this.hudElements.weapon) this.hudElements.weapon.textContent = btState.weaponName;
    if (this.hudElements.kills) this.hudElements.kills.textContent = btState.kills;
    if (this.hudElements.accuracy) this.hudElements.accuracy.textContent = btState.accuracy + '%';
    
    // ========== LEVEL PROGRESS DISPLAY (12 Zones) ==========
    if (this.hudElements.level) {
      this.hudElements.level.textContent = `${btState.currentLevel}/12`;
    }
    if (this.hudElements.birdsLeft) {
      const config = LEVEL_CONFIG[btState.currentLevel];
      if (config.birdsToKill === 0) {
        // State Park - no hunting zone
        this.hudElements.birdsLeft.textContent = `🚫 NO HUNTING`;
      } else {
        this.hudElements.birdsLeft.textContent = `${btState.birdsKilledThisLevel}/${config.birdsToKill}`;
      }
    }
    if (this.hudElements.levelFill) {
      const config = LEVEL_CONFIG[btState.currentLevel];
      if (config.birdsToKill === 0) {
        // State Park - show full bar (walk through)
        this.hudElements.levelFill.style.width = '100%';
        this.hudElements.levelFill.style.background = 'linear-gradient(90deg, #ff6600, #ff4400)';
      } else {
        const progress = Math.min(100, (btState.birdsKilledThisLevel / config.birdsToKill) * 100);
        this.hudElements.levelFill.style.width = progress + '%';
        if (progress >= 100) {
          this.hudElements.levelFill.style.background = 'linear-gradient(90deg, #22c55e, #16a34a)';
        } else {
          this.hudElements.levelFill.style.background = 'linear-gradient(90deg, #facc15, #f59e0b)';
        }
      }
    }
  }

  triggerGameOver() {
    if (this.gameOver) return;
    // Use the new death animation system for turd death
    this.triggerDeathAnimation('turd');
  }

  checkLeaderboard() {
    try {
      // Check if user is logged in
      const isLoggedIn = typeof isGuest === 'function' ? !isGuest() : false;
      
      // Submit to Firebase if logged in
      if (typeof submitHighScore === 'function' && isLoggedIn) {
        submitHighScore(btState.score, btState.kills, btState.accuracy);
      }
      
      // For local leaderboard - only ask for initials if NOT logged in
      const leaderboard = JSON.parse(localStorage.getItem('birdturds_leaderboard') || '[]');
      if (leaderboard.length < 10 || btState.score > leaderboard[leaderboard.length - 1].score) {
        let playerName;
        let city = 'Unknown';
        
        if (isLoggedIn && typeof getCurrentUserName === 'function') {
          // Use logged-in user's display name
          playerName = getCurrentUserName() || 'Player';
        } else {
          // Guest - ask for initials (but don't annoy with prompts)
          playerName = 'Guest';
        }
        
        leaderboard.push({ 
          initials: playerName.slice(0, 10), 
          city, 
          score: btState.score, 
          kills: btState.kills, 
          accuracy: btState.accuracy, 
          date: new Date().toISOString().split('T')[0] 
        });
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard.splice(100);
        localStorage.setItem('birdturds_leaderboard', JSON.stringify(leaderboard));
      }
      
      // Save user data (coins, etc) to Firebase
      if (typeof saveUserData === 'function' && isLoggedIn) {
        saveUserData();
      }
    } catch(e) { console.error('Leaderboard error:', e); }
  }

  showGameOverScreen() {
    // Funny death messages
    const funnyMessages = [
      { title: "POOPED OUT!", sub: "You got crapped on... literally." },
      { title: "BIRD BRAIN!", sub: "Even pigeons outsmarted you." },
      { title: "TURD HAPPENS!", sub: "Should've brought an umbrella." },
      { title: "FOWL PLAY!", sub: "The birds won this round." },
      { title: "PLUCKED!", sub: "You were the sitting duck." },
      { title: "SPLAT!", sub: "Death by doo-doo. Tragic." },
      { title: "POULTRY IN MOTION!", sub: "And you weren't fast enough." },
      { title: "EGGS-TERMINATED!", sub: "The birds had the last laugh." },
      { title: "WELL... CRAP.", sub: "That's what you get for standing still." },
      { title: "PECKED TO DEATH!", sub: "By angry bird turds. Ironic." },
      { title: "GAME OVER, MAN!", sub: "The turds were too powerful." },
      { title: "FLEW THE COOP!", sub: "Your dignity, that is." },
      { title: "WING AND A PRAYER!", sub: "Prayer didn't work." },
      { title: "RUFFLED FEATHERS!", sub: "Yours, specifically." },
      { title: "DUCK... DIDN'T!", sub: "Should've ducked. Or something." }
    ];
    const msg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    
    // Check if guest for message
    const isGuestPlayer = typeof isGuest === 'function' ? isGuest() : true;
    const guestMessage = isGuestPlayer ? '<p style="color:#fde68a;font-size:13px;margin-top:15px;">⚠️ Playing as Guest - Score not saved to global leaderboard.<br/><a href="#" onclick="showAuthModal();return false;" style="color:#22c55e;">Create account</a> to compete!</p>' : '<p style="color:#22c55e;font-size:13px;margin-top:15px;">✅ Score saved to global leaderboard!</p>';
    
    // Heavenly scriptures for the moment
    const heavenlyScriptures = [
      { verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", ref: "John 3:16" },
      { verse: "I am the way and the truth and the life. No one comes to the Father except through me.", ref: "John 14:6" },
      { verse: "Come to me, all you who are weary and burdened, and I will give you rest.", ref: "Matthew 11:28" },
      { verse: "Behold, I stand at the door and knock. If anyone hears my voice and opens the door, I will come in.", ref: "Revelation 3:20" },
      { verse: "For the Son of Man came to seek and to save the lost.", ref: "Luke 19:10" },
      { verse: "The Lord is not slow in keeping his promise... not wanting anyone to perish, but everyone to come to repentance.", ref: "2 Peter 3:9" },
      { verse: "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved.", ref: "Romans 10:9" },
      { verse: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.", ref: "Ephesians 2:8" }
    ];
    const scripture = heavenlyScriptures[Math.floor(Math.random() * heavenlyScriptures.length)];
    
    // Dead hunter SVG - X eyes and tongue sticking out
    const deadHunterSVG = `<svg viewBox="0 0 100 120" width="80" height="96" style="margin-bottom:10px;">
      <!-- Body lying down -->
      <ellipse cx="50" cy="100" rx="40" ry="12" fill="#4b5320"/>
      <!-- Legs sticking up -->
      <rect x="25" y="85" width="12" height="25" rx="5" fill="#1a365d" transform="rotate(-15 31 97)"/>
      <rect x="63" y="85" width="12" height="25" rx="5" fill="#1a365d" transform="rotate(15 69 97)"/>
      <!-- Boots -->
      <ellipse cx="22" cy="82" rx="8" ry="5" fill="#4a3728"/>
      <ellipse cx="78" cy="82" rx="8" ry="5" fill="#4a3728"/>
      <!-- Head -->
      <circle cx="50" cy="45" r="28" fill="#fcd9b6"/>
      <!-- X Eyes -->
      <g stroke="#1f2937" stroke-width="4" stroke-linecap="round">
        <line x1="35" y1="38" x2="45" y2="48"/>
        <line x1="45" y1="38" x2="35" y2="48"/>
        <line x1="55" y1="38" x2="65" y2="48"/>
        <line x1="65" y1="38" x2="55" y2="48"/>
      </g>
      <!-- Tongue sticking out -->
      <ellipse cx="50" cy="62" rx="8" ry="12" fill="#ef4444"/>
      <ellipse cx="50" cy="68" rx="6" ry="5" fill="#dc2626"/>
      <!-- Hat falling off -->
      <ellipse cx="75" cy="25" rx="18" ry="8" fill="#4b5320" transform="rotate(25 75 25)"/>
      <rect x="65" y="15" width="20" height="12" rx="2" fill="#4b5320" transform="rotate(25 75 21)"/>
      <!-- Stars around head (dizzy) -->
      <text x="20" y="25" font-size="14">⭐</text>
      <text x="75" y="20" font-size="12">💫</text>
      <text x="85" y="45" font-size="10">✨</text>
      <!-- Turd on body -->
      <text x="45" y="105" font-size="20">💩</text>
    </svg>`;
    
    // ========== JESUS IN CLOUDS SVG ==========
    const jesusInCloudsSVG = `
    <svg viewBox="0 0 400 200" width="100%" height="180" style="position:absolute;top:0;left:0;pointer-events:none;opacity:0.9;">
      <!-- Sky gradient background -->
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#fef3c7;stop-opacity:0.8"/>
          <stop offset="50%" style="stop-color:#fcd34d;stop-opacity:0.4"/>
          <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:0.1"/>
        </linearGradient>
        <radialGradient id="gloryGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#fff;stop-opacity:1"/>
          <stop offset="40%" style="stop-color:#fef3c7;stop-opacity:0.8"/>
          <stop offset="100%" style="stop-color:#fcd34d;stop-opacity:0"/>
        </radialGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      
      <!-- Heavenly background glow -->
      <rect x="0" y="0" width="400" height="200" fill="url(#skyGrad)"/>
      
      <!-- Glory rays -->
      <g opacity="0.6" filter="url(#softGlow)">
        <line x1="200" y1="80" x2="50" y2="200" stroke="#fcd34d" stroke-width="3"/>
        <line x1="200" y1="80" x2="100" y2="200" stroke="#fef3c7" stroke-width="2"/>
        <line x1="200" y1="80" x2="150" y2="200" stroke="#fcd34d" stroke-width="3"/>
        <line x1="200" y1="80" x2="250" y2="200" stroke="#fcd34d" stroke-width="3"/>
        <line x1="200" y1="80" x2="300" y2="200" stroke="#fef3c7" stroke-width="2"/>
        <line x1="200" y1="80" x2="350" y2="200" stroke="#fcd34d" stroke-width="3"/>
      </g>
      
      <!-- Clouds layer 1 (back) -->
      <g fill="#fff" opacity="0.7">
        <ellipse cx="60" cy="140" rx="50" ry="25"/>
        <ellipse cx="100" cy="135" rx="40" ry="20"/>
        <ellipse cx="340" cy="145" rx="45" ry="22"/>
        <ellipse cx="300" cy="140" rx="35" ry="18"/>
      </g>
      
      <!-- Central glory circle -->
      <circle cx="200" cy="80" r="60" fill="url(#gloryGlow)" filter="url(#softGlow)"/>
      
      <!-- Jesus figure (reverent silhouette) -->
      <g transform="translate(200,80)" filter="url(#softGlow)">
        <!-- Halo -->
        <circle cx="0" cy="-25" r="18" fill="none" stroke="#fcd34d" stroke-width="3" opacity="0.8"/>
        
        <!-- Head -->
        <circle cx="0" cy="-25" r="12" fill="#fef3c7"/>
        
        <!-- Hair/beard suggestion -->
        <ellipse cx="0" cy="-18" rx="10" ry="8" fill="#92400e" opacity="0.3"/>
        
        <!-- Robe body -->
        <path d="M-25,0 Q-20,-15 0,-15 Q20,-15 25,0 L20,50 Q0,55 -20,50 Z" fill="#fff" opacity="0.9"/>
        
        <!-- Arms extended (welcoming) -->
        <path d="M-25,0 Q-40,5 -50,0" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M25,0 Q40,5 50,0" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>
        
        <!-- Hands -->
        <circle cx="-50" cy="0" r="6" fill="#fef3c7"/>
        <circle cx="50" cy="0" r="6" fill="#fef3c7"/>
        
        <!-- Gentle face suggestion -->
        <circle cx="-4" cy="-28" r="1.5" fill="#92400e" opacity="0.5"/>
        <circle cx="4" cy="-28" r="1.5" fill="#92400e" opacity="0.5"/>
        <path d="M-3,-22 Q0,-20 3,-22" stroke="#92400e" stroke-width="1" fill="none" opacity="0.4"/>
      </g>
      
      <!-- Clouds layer 2 (front) -->
      <g fill="#fff" opacity="0.9">
        <ellipse cx="150" cy="160" rx="60" ry="30"/>
        <ellipse cx="200" cy="170" rx="50" ry="25"/>
        <ellipse cx="250" cy="160" rx="55" ry="28"/>
        <ellipse cx="80" cy="180" rx="40" ry="20"/>
        <ellipse cx="320" cy="175" rx="45" ry="22"/>
      </g>
      
      <!-- "Come to Me" text -->
      <text x="200" y="195" text-anchor="middle" fill="#92400e" font-size="11" font-style="italic" opacity="0.8">"Come to me, all who are weary..."</text>
    </svg>`;
    
    const overlay = document.createElement('div');
    overlay.id = 'gameover-overlay';
    
    // Check if logged in for leaderboard button
    const isLoggedIn = typeof isGuest === 'function' ? !isGuest() : false;
    const leaderboardBtn = isLoggedIn 
      ? `<button id="gameover-leaderboard-btn" style="background:linear-gradient(135deg,#3b82f6,#1d4ed8);color:#fff;border:none;padding:12px 25px;font-size:14px;font-weight:bold;border-radius:999px;cursor:pointer;margin:5px;box-shadow:0 4px 15px rgba(59,130,246,0.4);touch-action:manipulation;">🏆 Leaderboard</button>`
      : `<p style="color:#9ca3af;font-size:11px;margin-top:5px;">Login to view leaderboard</p>`;
    
    overlay.innerHTML = `
      <div style="background:linear-gradient(135deg,#1e293b,#0f172a);padding:25px 40px;border-radius:20px;text-align:center;border:2px solid #facc15;max-width:550px;position:relative;overflow:hidden;">
        <!-- Close Button -->
        <button id="gameover-close-btn" style="position:absolute;top:10px;right:10px;background:#374151;color:#9ca3af;border:none;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:16px;line-height:1;touch-action:manipulation;z-index:10;">✕</button>
        
        <!-- JESUS IN CLOUDS - Heavenly scene at top -->
        <div style="position:relative;margin:-25px -40px 15px -40px;height:180px;overflow:hidden;border-radius:18px 18px 0 0;">
          ${jesusInCloudsSVG}
        </div>
        
        <!-- Dead Hunter (smaller) -->
        ${deadHunterSVG}
        
        <!-- Funny Title -->
        <h1 style="font-size:32px;color:#ef4444;margin-bottom:5px;">🎯 ${msg.title}</h1>
        <p style="color:#fbbf24;font-size:14px;margin-bottom:15px;font-style:italic;">${msg.sub}</p>
        
        <!-- Stats -->
        <div style="margin:15px 0;font-size:16px;color:#cbd5e1;">
          <p>Score: <strong style="color:#facc15;font-size:20px;">${btState.score.toLocaleString()}</strong> | 
          Kills: <strong style="color:#facc15;">${btState.kills}</strong> | 
          Accuracy: <strong style="color:#facc15;">${btState.accuracy}%</strong></p>
          ${guestMessage}
        </div>
        
        <!-- SCRIPTURE MESSAGE -->
        <div style="background:linear-gradient(135deg,rgba(254,243,199,0.15),rgba(252,211,77,0.1));border:1px solid #fcd34d;border-radius:12px;padding:15px;margin:15px 0;">
          <p style="color:#fef3c7;font-size:13px;line-height:1.5;margin-bottom:8px;font-style:italic;">"${scripture.verse}"</p>
          <p style="color:#fcd34d;font-size:12px;font-weight:bold;">— ${scripture.ref}</p>
          <p style="color:#22c55e;font-size:11px;margin-top:8px;">✝️ God doesn't want anyone left behind! Will you accept His invitation?</p>
        </div>
        
        <!-- Buttons -->
        <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:5px;">
          <button id="gameover-playagain-btn" style="background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;border:none;padding:12px 25px;font-size:14px;font-weight:bold;border-radius:999px;cursor:pointer;box-shadow:0 4px 15px rgba(34,197,94,0.4);touch-action:manipulation;">🔄 Play Again</button>
          <button id="gameover-hunter-btn" style="background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:#fff;border:none;padding:12px 25px;font-size:14px;font-weight:bold;border-radius:999px;cursor:pointer;box-shadow:0 4px 15px rgba(139,92,246,0.4);touch-action:manipulation;">👤 Choose Hunter</button>
          ${leaderboardBtn}
          <button id="gameover-video-btn" style="background:linear-gradient(135deg,#ef4444,#dc2626);color:#fff;border:none;padding:12px 25px;font-size:14px;font-weight:bold;border-radius:999px;cursor:pointer;box-shadow:0 4px 15px rgba(239,68,68,0.4);touch-action:manipulation;">✝️ Learn About Jesus</button>
        </div>
        
        <!-- Share prompt -->
        <p style="color:#9ca3af;font-size:10px;margin-top:12px;">Share this game with someone who needs to hear the message! 📢</p>
      </div>`;
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);display:flex;align-items:center;justify-content:center;z-index:10000;padding:10px;';
    document.body.appendChild(overlay);
    
    // Add touch-friendly event listeners
    const closeBtn = document.getElementById('gameover-close-btn');
    const playAgainBtn = document.getElementById('gameover-playagain-btn');
    const hunterBtn = document.getElementById('gameover-hunter-btn');
    const leaderboardBtnEl = document.getElementById('gameover-leaderboard-btn');
    const videoBtnEl = document.getElementById('gameover-video-btn');
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => overlay.remove());
      closeBtn.addEventListener('touchend', (e) => { e.preventDefault(); overlay.remove(); });
    }
    if (playAgainBtn) {
      console.log('✅ Play Again button found, attaching restart handlers...');
      const doRestart = () => {
        console.log('🔄 Restarting game...');
        if (typeof window.restartBirdTurds === 'function') {
          window.restartBirdTurds();
        } else {
          overlay.remove();
          window.location.href = window.location.pathname + '?restart=' + Date.now();
        }
      };
      playAgainBtn.addEventListener('click', doRestart);
      playAgainBtn.addEventListener('touchend', (e) => { e.preventDefault(); e.stopPropagation(); doRestart(); });
    } else {
      console.warn('⚠️ Play Again button NOT found!');
    }
    if (hunterBtn) {
      const goToChooseHunter = () => {
        overlay.remove();
        window.location.href = '/?chooseHunter=1';
      };
      hunterBtn.addEventListener('click', goToChooseHunter);
      hunterBtn.addEventListener('touchend', (e) => { e.preventDefault(); goToChooseHunter(); });
    }
    if (leaderboardBtnEl) {
      leaderboardBtnEl.addEventListener('click', () => showLeaderboardModal());
      leaderboardBtnEl.addEventListener('touchend', (e) => { e.preventDefault(); showLeaderboardModal(); });
    }
    if (videoBtnEl) {
      const showSalvationVideo = () => { 
        // Show embedded Jack Hibbs salvation video
        const videoOverlay = document.createElement('div');
        videoOverlay.id = 'salvation-video-overlay';
        videoOverlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);display:flex;align-items:center;justify-content:center;z-index:20000;';
        videoOverlay.innerHTML = `
          <div style="background:#1e293b;padding:20px;border-radius:15px;max-width:800px;width:95%;border:2px solid #ffd700;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;">
              <h2 style="color:#ffd700;margin:0;">✝️ How To Be Saved</h2>
              <button onclick="document.getElementById('salvation-video-overlay').remove()" style="background:#ef4444;color:#fff;border:none;padding:8px 15px;border-radius:8px;cursor:pointer;font-weight:bold;">✕ Close</button>
            </div>
            <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;">
              <iframe src="https://www.youtube-nocookie.com/embed/qHGZlhJBKg8?rel=0" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>
            </div>
            <p style="color:#9ca3af;font-size:12px;margin-top:10px;text-align:center;">Pastor Jack Hibbs explains how to receive salvation through Jesus Christ</p>
          </div>
        `;
        document.body.appendChild(videoOverlay);
      };
      videoBtnEl.addEventListener('click', showSalvationVideo);
      videoBtnEl.addEventListener('touchend', (e) => { e.preventDefault(); showSalvationVideo(); });
    }
  }
}

// Show global leaderboard modal
async function showLeaderboardModal() {
  let leaderboardHTML = '<div style="text-align:center;color:#9ca3af;">Loading...</div>';
  
  // Try to get Firebase leaderboard
  if (typeof getLeaderboard === 'function') {
    try {
      const scores = await getLeaderboard(20);
      if (scores.length > 0) {
        leaderboardHTML = '<table style="width:100%;border-collapse:collapse;"><thead><tr style="color:#facc15;"><th style="padding:10px;text-align:left;">#</th><th style="padding:10px;text-align:left;">Player</th><th style="padding:10px;text-align:right;">Score</th><th style="padding:10px;text-align:right;">Kills</th></tr></thead><tbody>';
        scores.forEach((s, i) => {
          const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}`;
          leaderboardHTML += `<tr style="border-top:1px solid #374151;"><td style="padding:10px;">${medal}</td><td style="padding:10px;color:#e5e7eb;">${s.displayName || 'Anonymous'}</td><td style="padding:10px;text-align:right;color:#facc15;font-weight:bold;">${s.score.toLocaleString()}</td><td style="padding:10px;text-align:right;color:#9ca3af;">${s.kills || 0}</td></tr>`;
        });
        leaderboardHTML += '</tbody></table>';
      } else {
        leaderboardHTML = '<div style="text-align:center;color:#9ca3af;padding:20px;">No scores yet! Be the first!</div>';
      }
    } catch(e) {
      console.error('Error loading leaderboard:', e);
      leaderboardHTML = '<div style="text-align:center;color:#ef4444;padding:20px;">Error loading leaderboard</div>';
    }
  }
  
  const modal = document.createElement('div');
  modal.id = 'leaderboard-modal';
  modal.innerHTML = `<div style="background:linear-gradient(135deg,#1e293b,#0f172a);padding:30px;border-radius:20px;max-width:600px;width:90%;max-height:80vh;overflow-y:auto;border:2px solid #facc15;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;"><h2 style="color:#facc15;font-size:24px;">🏆 Global Leaderboard</h2><button onclick="document.getElementById('leaderboard-modal').remove()" style="background:#374151;border:none;color:#fff;width:36px;height:36px;border-radius:50%;font-size:20px;cursor:pointer;">×</button></div>${leaderboardHTML}</div>`;
  modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:20000;';
  document.body.appendChild(modal);
}

// Global game reference for shop integration
let gameInstance = null;

// Global function to spawn boss from shop
function summonBoss(bossType) {
  if (gameInstance && gameInstance.scene && gameInstance.scene.scenes[0]) {
    gameInstance.scene.scenes[0].spawnSpecificBoss(bossType);
    return true;
  }
  return false;
}

// Global function to change hunter skin (called from store)
function changeHunterSkin(skinName) {
  btState.currentSkin = skinName;
  localStorage.setItem('birdturds_skin', skinName);
  
  if (gameInstance && gameInstance.scene && gameInstance.scene.scenes[0]) {
    gameInstance.scene.scenes[0].applyHunterSkin();
    return true;
  }
  return false;
}

// Global function to upgrade armor (called from store)
function upgradeArmor(amount) {
  btState.upgrades.armor = Math.min(0.5, (btState.upgrades.armor || 0) + amount);
  localStorage.setItem('birdturds_armor', btState.upgrades.armor);
  
  if (gameInstance && gameInstance.scene && gameInstance.scene.scenes[0]) {
    gameInstance.scene.scenes[0].applyArmorOverlay();
    return true;
  }
  return false;
}

// Load saved skin on startup
const savedSkin = localStorage.getItem('birdturds_skin');
if (savedSkin) btState.currentSkin = savedSkin;
const savedArmor = localStorage.getItem('birdturds_armor');
if (savedArmor) btState.upgrades.armor = parseFloat(savedArmor);

// ========== APPLY OWNED UPGRADES ON GAME START ==========
function applyOwnedUpgrades() {
  const owned = JSON.parse(localStorage.getItem('birdturds_owned') || '[]');
  
  console.log('🎮 Loading owned items:', owned);
  
  // ===== UPGRADES =====
  // Fire Rate upgrades (stacks - use highest)
  if (owned.includes('fire_rate_4')) btState.upgrades.fireRate = 2.0;
  else if (owned.includes('fire_rate_3')) btState.upgrades.fireRate = 1.5;
  else if (owned.includes('fire_rate_2')) btState.upgrades.fireRate = 1.25;
  
  // Damage upgrades
  if (owned.includes('damage_4')) btState.upgrades.damage = 2.0;
  else if (owned.includes('damage_3')) btState.upgrades.damage = 1.5;
  else if (owned.includes('damage_2')) btState.upgrades.damage = 1.25;
  
  // Armor upgrades
  if (owned.includes('armor_3')) btState.upgrades.armor = 0.5;
  else if (owned.includes('armor_2')) btState.upgrades.armor = 0.3;
  else if (owned.includes('armor_1')) btState.upgrades.armor = 0.15;
  
  // Ammo capacity (cumulative)
  if (owned.includes('ammo_1')) btState.ammoMax += 30;
  if (owned.includes('ammo_2')) btState.ammoMax += 60;
  if (owned.includes('ammo_3')) btState.ammoMax += 120;
  
  // Coin multiplier (use highest)
  if (owned.includes('coin_3x')) btState.upgrades.coinMultiplier = 3;
  else if (owned.includes('coin_2x')) btState.upgrades.coinMultiplier = 2;
  
  // Coin Magnet
  if (owned.includes('magnet')) btState.hasCoinMagnet = true;
  
  // Lucky Charm
  if (owned.includes('lucky')) btState.hasLuckyCharm = true;
  
  // ===== WEAPONS =====
  // Handguns
  if (owned.includes('handgun')) { btState.hasHandgun = true; btState.handgunAmmo = 15; }
  if (owned.includes('revolver')) { btState.hasRevolver = true; btState.revolverAmmo = 6; btState.revolverDamage = 2; }
  if (owned.includes('deagle')) { btState.hasDeagle = true; btState.deagleAmmo = 7; btState.deagleDamage = 2.5; }
  
  // Shotguns
  if (owned.includes('shotgun_410')) { btState.hasShotgun = true; btState.shotgunPellets = 3; }
  if (owned.includes('shotgun_20')) { btState.hasShotgun = true; btState.shotgunPellets = 5; }
  if (owned.includes('shotgun_12')) { btState.hasShotgun = true; btState.shotgunPellets = 8; }
  if (owned.includes('pump_action')) { btState.hasShotgun = true; btState.shotgunPellets = 10; btState.shotgunDamage = 1.5; }
  if (owned.includes('auto_shotgun')) { btState.hasShotgun = true; btState.shotgunPellets = 8; btState.shotgunAuto = true; }
  
  // Heavy weapons
  if (owned.includes('machinegun')) { btState.hasMachinegun = true; btState.machinegunAmmo = 200; }
  if (owned.includes('minigun')) { btState.hasMinigun = true; btState.minigunAmmo = 1000; }
  if (owned.includes('sniper')) { btState.hasSniper = true; btState.sniperAmmo = 20; btState.sniperDamage = 3; }
  if (owned.includes('barrett')) { btState.hasBarrett = true; btState.barrettAmmo = 10; btState.barrettDamage = 5; }
  if (owned.includes('bazooka')) { btState.hasBazooka = true; btState.bazookaAmmo = 5; }
  if (owned.includes('rocketlauncher')) { btState.hasRocketLauncher = true; btState.rocketAmmo = 3; }
  if (owned.includes('minigun_mounted')) btState.hasMountedMinigun = true;
  
  // ===== VEHICLES =====
  if (owned.includes('dirtbike')) { btState.hasDirtbike = true; btState.dirtbikeSpeed = 1.5; }
  if (owned.includes('atv')) { btState.hasATV = true; btState.atvSpeed = 1.3; btState.atvArmor = 0.1; }
  if (owned.includes('truck')) { btState.hasTruck = true; btState.truckArmor = 0.3; }
  if (owned.includes('jeep')) { btState.hasJeep = true; btState.jeepSpeed = 1.4; btState.jeepArmor = 0.25; btState.jeepMounted = true; }
  if (owned.includes('tank')) { btState.hasTank = true; btState.tankArmor = 0.6; btState.tankCannon = true; }
  if (owned.includes('helicopter')) { btState.hasHelicopter = true; btState.canFly = true; btState.heliRockets = true; }
  
  // ===== SKINS =====
  // Apply current equipped skin effects
  const currentSkin = localStorage.getItem('birdturds_skin') || 'default';
  btState.currentSkin = currentSkin;
  
  if (currentSkin === 'camo' && owned.includes('skin_camo')) btState.camoActive = true;
  if (currentSkin === 'winter' && owned.includes('skin_winter')) btState.damageModifier = 1.1; // +10% in snow
  if (currentSkin === 'desert' && owned.includes('skin_desert')) btState.speedModifier = 1.1; // +10% in desert
  if (currentSkin === 'tactical' && owned.includes('skin_tactical')) btState.fireRateModifier = 1.15;
  if (currentSkin === 'armor_light' && owned.includes('skin_armor_light')) btState.armorReduction = Math.max(btState.armorReduction, 0.15);
  if (currentSkin === 'armor_heavy' && owned.includes('skin_armor_heavy')) { btState.armorReduction = 0.30; btState.speedModifier = 0.9; }
  if (currentSkin === 'hazmat' && owned.includes('skin_hazmat')) btState.hazmatImmune = true;
  if (currentSkin === 'gold' && owned.includes('skin_gold')) btState.coinDropModifier = 1.25;
  if (currentSkin === 'legendary' && owned.includes('skin_legendary')) {
    btState.damageModifier = 1.1;
    btState.armorReduction = Math.max(btState.armorReduction, 0.1);
    btState.speedModifier = 1.1;
    btState.coinDropModifier = 1.1;
  }
  
  // ===== BOSS BIRDS (helpers) =====
  if (owned.includes('extra_eagle')) btState.extraEagles = 1;
  if (owned.includes('golden_eagle')) btState.goldenEagles = 2;
  if (owned.includes('falcon')) btState.hasFalcon = true;
  if (owned.includes('owl_helper')) btState.hasOwlHelper = true;
  
  console.log('✅ All upgrades applied!');
  console.log('  - Fire Rate:', btState.upgrades.fireRate);
  console.log('  - Damage:', btState.upgrades.damage);
  console.log('  - Armor:', btState.upgrades.armor);
  console.log('  - Ammo Max:', btState.ammoMax);
  console.log('  - Coin Mult:', btState.upgrades.coinMultiplier);
  console.log('  - Skin:', btState.currentSkin);
}

// ========== APPLY CONSUMABLE ITEMS (called from UI) ==========
function applyConsumable(itemId) {
  if (!gameInstance || !gameInstance.scene.scenes[0]) {
    console.log('Game not ready');
    return false;
  }
  const scene = gameInstance.scene.scenes[0];
  
  switch(itemId) {
    case 'sturdy_hat':
      btState.hatProtection = true;
      btState.hatTimer = 45;
      scene.showNotification('🎩 Hat Protection: 45 seconds!', 0x22c55e);
      break;
    case 'sturdy_hat_xl':
      btState.hatProtection = true;
      btState.hatTimer = 90;
      scene.showNotification('🎩🎩 ULTRA Hat: 90 seconds!', 0x22c55e);
      break;
    case 'ammo_refill':
      btState.ammo = btState.ammoMax;
      scene.showNotification('🔄 Ammo Refilled!', 0x3b82f6);
      break;
    case 'health_pack':
      btState.health = Math.min(btState.maxHealth, btState.health + 50);
      scene.showNotification('❤️ +50 Health!', 0xef4444);
      break;
    case 'full_heal':
      btState.health = btState.maxHealth;
      btState.turdMeter = 0;
      scene.showNotification('❤️❤️ Fully Healed!', 0xef4444);
      break;
    case 'shield_temp':
      btState.invincible = true;
      scene.time.delayedCall(10000, () => { btState.invincible = false; });
      scene.showNotification('🌟 Invincible: 10 seconds!', 0xffd700);
      break;
    case 'shield_long':
      btState.invincible = true;
      scene.time.delayedCall(30000, () => { btState.invincible = false; });
      scene.showNotification('🌟🌟 Invincible: 30 seconds!', 0xffd700);
      break;
    case 'double_points':
      btState.doublePoints = true;
      scene.time.delayedCall(30000, () => { btState.doublePoints = false; });
      scene.showNotification('⭐ Double Points: 30 seconds!', 0xfacc15);
      break;
    case 'triple_points':
      btState.doublePoints = true;
      btState.triplePoints = true;
      scene.time.delayedCall(30000, () => { btState.doublePoints = false; btState.triplePoints = false; });
      scene.showNotification('⭐⭐ Triple Points: 30 seconds!', 0xfacc15);
      break;
    case 'slow_motion':
      btState.slowMotion = true;
      scene.time.delayedCall(15000, () => { btState.slowMotion = false; });
      scene.showNotification('⏱️ Slow-Mo: 15 seconds!', 0xa855f7);
      break;
    case 'freeze':
      btState.timeFrozen = true;
      scene.time.delayedCall(10000, () => { btState.timeFrozen = false; });
      scene.showNotification('❄️ Time Frozen: 10 seconds!', 0x60a5fa);
      break;
    case 'grenade':
    case 'grenade_pack':
      btState.grenades = (btState.grenades || 0) + (itemId === 'grenade_pack' ? 10 : 5);
      scene.showNotification('💣 Grenades: ' + btState.grenades, 0xf59e0b);
      break;
    case 'molotov':
      btState.molotovs = (btState.molotovs || 0) + 3;
      scene.showNotification('🔥 Molotovs: ' + btState.molotovs, 0xef4444);
      break;
    case 'flashbang':
      btState.flashbangs = (btState.flashbangs || 0) + 1;
      scene.showNotification('💥 Flashbang Ready!', 0xffffff);
      break;
    // ========== JETPACK ==========
    case 'jetpack':
      btState.jetpackActive = true;
      btState.jetpackFuel = 30;
      btState.jetpackMaxFuel = 30;
      scene.activateJetpack(30);
      scene.showNotification('🚀 JETPACK ACTIVATED! 30 seconds of flight!', 0xff6b00);
      break;
    case 'jetpack_xl':
      btState.jetpackActive = true;
      btState.jetpackFuel = 60;
      btState.jetpackMaxFuel = 60;
      scene.activateJetpack(60);
      scene.showNotification('🚀🚀 MEGA JETPACK! 60 seconds of flight!', 0xff6b00);
      break;
    default:
      console.log('Unknown consumable:', itemId);
      return false;
  }
  return true;
}

// Apply upgrades on load
applyOwnedUpgrades();

const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#1a1a2e',  // Matches page gradient - no ugly black bars!
  
  // PERFORMANCE OPTIMIZATIONS
  render: {
    pixelArt: false,
    antialias: !(window.IS_LOW_POWER_DEVICE),
    antialiasGL: !(window.IS_LOW_POWER_DEVICE),
    powerPreference: 'high-performance',
    roundPixels: true,
    transparent: false
  },
  fps: {
    target: 60,
    forceSetTimeOut: false,
    smoothStep: true
  },
  physics: { 
    default: 'arcade', 
    arcade: { 
      gravity: { y: 0 }, 
      fps: 60,
      debug: false,
      tileBias: 16
    } 
  },
  scene: BirdTurdsScene,
  scale: { 
    mode: Phaser.Scale.FIT,  // FIT keeps whole game visible; use ENVELOP to fill (may crop)
    autoCenter: Phaser.Scale.CENTER_BOTH,  // Center both axes for mobile
    width: GAME_WIDTH,
    height: GAME_HEIGHT
  },
  audio: {
    disableWebAudio: window.IS_LOW_POWER_DEVICE || false,
    noAudio: false
  }
};

// Start game only when called (after PLAY button is clicked)
window.startBirdTurdsGame = function() {
  if (!gameInstance) {
    console.log('🎮 Starting BirdTurds game...');
    gameInstance = new Phaser.Game(config);
  }
};

// Don't auto-start - wait for PLAY button
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎮 BirdTurds ready - waiting for PLAY button...');
});
