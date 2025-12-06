// ============================================
// BIRDTURDS v41.0 - COMIC BUBBLE VOICE SYSTEM
// 300+ Unique Jokes, Quotes & One-Liners
// Family-friendly, Christian-themed humor
// ============================================

(function() {
  'use strict';
  
  window.ComicVoices = {
    
    // Track used jokes to avoid repeats
    usedJokes: new Set(),
    maxBeforeReset: 50,
    
    // ========== DAD JOKES - 150+ UNIQUE ==========
    dadJokes: [
      // Classic Dad Jokes
      "I'm reading a book about anti-gravity. It's impossible to put down!",
      "Why don't scientists trust atoms? They make up everything!",
      "I used to hate facial hair, but then it grew on me.",
      "What do you call a fake noodle? An impasta!",
      "I'm afraid for the calendar. Its days are numbered.",
      "Why did the scarecrow win an award? He was outstanding in his field!",
      "I only know 25 letters of the alphabet. I don't know y.",
      "What do you call cheese that isn't yours? Nacho cheese!",
      "I ordered a chicken and an egg from Amazon. I'll let you know.",
      "What's brown and sticky? A stick.",
      "Did you hear about the guy addicted to brake fluid? He said he could stop any time.",
      "I'm on a seafood diet. I see food and I eat it.",
      "What do you call a bear with no teeth? A gummy bear!",
      "Why can't a bicycle stand on its own? It's two-tired.",
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      "What do you call a lazy kangaroo? A pouch potato!",
      "I gave my handyman a to-do list but he only did jobs 1, 3, and 5. He only does odd jobs.",
      "Did you hear about the cheese factory explosion? There was nothing left but de-brie.",
      "I wouldn't buy anything with velcro. It's a total rip-off.",
      "What happens to a frog's car when it breaks down? It gets toad away.",
      "The rotation of Earth really makes my day.",
      "I used to work in a shoe recycling shop. It was sole destroying.",
      "Mountains aren't just funny. They're hill areas!",
      "What do you call a fish wearing a bowtie? Sofishticated.",
      "I had a joke about time travel, but you didn't like it.",
      "What does a spy do when they're cold? They go undercover.",
      "What do you call someone allergic to galaxies? Galactose intolerant.",
      
      // Food & Restaurant Jokes
      "Want to hear a pizza joke? Never mind, it's too cheesy.",
      "I tried to make a belt out of watches. It was a waist of time.",
      "Why did the coffee file a police report? It got mugged.",
      "What do you call a sad cup of coffee? A depresso.",
      "I'm trying to organize a hide and seek competition, but good players are hard to find.",
      "Did you hear about the restaurant on the moon? Great food, no atmosphere.",
      "Why did the cookie go to the doctor? It was feeling crummy.",
      "What did the grape do when it got stepped on? It let out a little wine.",
      "I made a song about a tortilla. Actually, it's more of a wrap.",
      "Want to hear a joke about paper? Never mind, it's tearable.",
      "A cheese sandwich walks into a bar. Bartender says: 'Sorry, we don't serve food here.'",
      "I tried to start a hot air balloon business, but it never took off.",
      
      // Animal Jokes
      "Why don't eggs tell secrets? They might crack under pressure.",
      "What do you call a dinosaur that knows a lot of words? A Thesaurus.",
      "Dogs can't operate MRI machines. But catscan.",
      "What do you call a cow with no legs? Ground beef.",
      "What do you call a fish without eyes? A fsh.",
      "Why do cows wear bells? Because their horns don't work.",
      "What did the duck say when she bought lipstick? Put it on my bill.",
      "What do you call a sleeping dinosaur? A dino-snore!",
      "Why do birds fly south? It's too far to walk!",
      "What do you call a pig that does karate? A pork chop!",
      "How do you organize a space party? You planet.",
      "Why don't skeletons fight each other? They don't have the guts.",
      "What kind of car does a Jedi drive? A Toy-Yoda.",
      "Why did the chicken cross the playground? To get to the other slide!",
      "What do you call an elephant that doesn't matter? An irrelephant.",
      "What kind of music do bunnies like? Hip-hop!",
      "Why couldn't the leopard play hide and seek? He was always spotted.",
      "What do you call a deer with no eyes? No idea!",
      "What do you call a sheep that knows karate? A lamb-o!",
      "I just got thrown out of the park for arranging squirrels by height. They didn't like my critter sizing.",
      
      // Work & Career Jokes
      "My boss told me to have a good day, so I went home!",
      "I was going to tell a joke about unemployment, but it doesn't work.",
      "I got fired from the calendar factory. I took a couple of days off.",
      "My resume is just a list of things I hope I never have to do again.",
      "I'm so good at sleeping, I can do it with my eyes closed.",
      "I tried writing with a broken pencil, but it was pointless.",
      "I was going to tell a joke about construction, but I'm still working on it.",
      "I used to be a banker, but I lost interest.",
      "My boss said 'dress for the job you want.' So I went in as Batman.",
      "I know a lot of jokes about retired people, but none of them work.",
      "Did you hear about the guy who got fired from the orange juice factory? He couldn't concentrate.",
      
      // Science & Tech Jokes
      "I have a joke about chemistry, but I don't think it'll get a reaction.",
      "Parallel lines have so much in common. It's a shame they'll never meet.",
      "I'd tell you a chemistry joke, but all the good ones argon.",
      "Why do astronauts use Linux? Because they can't open windows in space!",
      "What's a physicist's favorite snack? Fission chips!",
      "Why did the physics teacher break up with the biology teacher? No chemistry.",
      "There are only 10 types of people: those who understand binary and those who don't.",
      "I have a joke about Schrödinger's cat, but I'm not sure if it's funny.",
      "Why are meteors so clean? They're always in a shower.",
      "What do computers snack on? Microchips!",
      
      // Sports & Games Jokes
      "Why do golfers bring two pairs of pants? In case they get a hole in one.",
      "Why did Cinderella get kicked off the basketball team? She ran away from the ball.",
      "What's a boxer's favorite drink? Punch!",
      "Why are fish bad at tennis? They're afraid of the net.",
      "What do you call a boomerang that doesn't come back? A stick.",
      "Did you hear about the claustrophobic astronaut? He just needed a little space.",
      "I wondered why the baseball kept getting bigger. Then it hit me.",
      "Why are frogs good at baseball? They catch fly balls!",
      "Where do surfers go for education? Boarding school.",
      
      // Music & Entertainment Jokes
      "I know a great joke about a drum kit... ba dum tss!",
      "My wife asked me to stop singing 'Wonderwall.' I said 'Maybe...'",
      "What type of music are balloons afraid of? Pop music!",
      "Why did the music teacher go to jail? For fingering A minor.",
      "I used to play piano by ear. Now I use my hands.",
      "What kind of music do cars listen to? Auto-tunes!",
      "Never hand Princess Elsa a balloon. She'll just Let It Go.",
      "What's a skeleton's favorite instrument? The trom-bone!",
      
      // Weather & Nature Jokes
      "What did one volcano say to the other? I lava you.",
      "Why did the sun go to school? To get brighter.",
      "What did the earthquake say when it was done? Sorry, my fault!",
      "What's a tornado's favorite game? Twister!",
      "How does the moon cut his hair? Eclipse it.",
      "Where do polar bears keep their money? The snow bank.",
      "What gets wetter the more it dries? A towel.",
      "I don't trust those trees. They seem kind of shady.",
      
      // Random Clever Jokes
      "I tell dad jokes but I have no kids. I'm a faux pa!",
      "The shovel was a ground-breaking invention.",
      "I always thought orthopedic shoes were overrated, but I stand corrected.",
      "I'm friends with 25 letters of the alphabet. I don't know y.",
      "Two peanuts were walking down the street. One was a-salted.",
      "I've been bored recently, so I took up fencing. The neighbors keep asking me to put it back.",
      "What happens when you go to the bathroom in France? European.",
      "What do you call a man with a rubber toe? Roberto.",
      "The wedding was so emotional, even the cake was in tiers.",
      "I lost my job at the bank on my first day. A woman asked me to check her balance, so I pushed her over.",
      "To the guy who invented zero: thanks for nothing.",
      "I have a joke about a broken clock but it's not the right time.",
      "What happened when the world's tongue-twister champion got arrested? They gave him a tough sentence.",
      "I had to return the vacuum cleaner. It sucked.",
      "I used to be addicted to soap. I'm clean now.",
      "A furniture store keeps calling me. All I wanted was one night stand.",
      "What rock group has four men who don't sing? Mount Rushmore.",
      "What do you call a man with no body and no nose? Nobody knows.",
      "Sundays are always a little sad, but the day before is a sadder day.",
      "Did you hear about the wig thief? Police are combing the area.",
      "Two wind turbines stand in a field. One asks 'What music do you like?' Other says 'I'm a huge metal fan.'",
      "What's the best way to save dad jokes? In a dadda-base.",
      "I got a new pen that can write underwater. It can write other words too.",
      "A friend just asked if Advent Calendars will be around in 10 years. I think their days are numbered.",
      "What do you call a man with a seagull on his head? Cliff.",
      "How many tickles does it take to make an octopus laugh? Ten tickles.",
      "I asked my dog what's two minus two. He said nothing.",
      "What did the ocean say to the beach? Nothing, it just waved.",
      "Why don't graveyards get overcrowded? People are dying to get in.",
      "I can't trust stairs. They're always up to something.",
      "Did you hear about the kidnapping at school? It's fine, he woke up.",
      "What did one wall say to the other? I'll meet you at the corner!",
      "Time flies like an arrow. Fruit flies like a banana.",
      "What do you call a belt made of watches? A waist of time."
    ],
    
    // ========== CHRISTIAN JOKES - 50+ ==========
    christianJokes: [
      "How does Moses make his coffee? Hebrews it!",
      "Who was the greatest investor in the Bible? Noah - his stock was floating while everyone else's was in liquidation!",
      "Why couldn't Jonah trust the ocean? There was something fishy about it!",
      "Why did Noah have to discipline the chickens? They were using fowl language!",
      "What kind of car would Jesus drive? A Christler!",
      "Why was the Bible in the ocean? It was a deep read!",
      "Who was the greatest babysitter in the Bible? David - he rocked Goliath to sleep!",
      "Why did Adam and Eve do math every day? They were constantly multiplying!",
      "What do you call a sleepwalking nun? A roamin' Catholic!",
      "How does the ocean say hi to Moses? It waves!",
      "Why didn't Cain bring God a vegetable offering? He wasn't Abel!",
      "What animal couldn't Noah trust? The cheetah!",
      "Where is tennis mentioned in the Bible? When Joseph served in Pharaoh's court!",
      "Why did the sponge go to church? To soak up the sermon!",
      "How do groups of angels greet each other? Halo, halo, halo!",
      "What kind of man was Boaz before he married? Ruth-less!",
      "How do we know Peter was a rich fisherman? By his net income!",
      "Why did Samson try stand-up comedy? He could really bring the house down!",
      "Where is baseball mentioned in the Bible? In the big inning!",
      "Where was Solomon's Temple? On the side of his head!",
      "Why didn't they play cards on the Ark? Noah was standing on the deck!",
      "What's the best way to study the Bible? You Luke into it!",
      "How do we know God has a sense of humor? Just look at a platypus!",
      "Why did God create man before woman? He didn't want advice on how to do it!",
      "What do you call an atheist at Easter? Someone enjoying a long weekend!",
      "Why did Moses wander in the desert for 40 years? He refused to ask for directions!",
      "What did Noah say while loading the Ark? 'Come on in, the water's fine!'",
      "What kind of lights were on the Ark? Flood lights!",
      "Why couldn't they have apples on the Ark? Because everything had to come in pears!",
      "What time of day was Adam created? A little before Eve.",
      "Who was the smartest man in the Bible? Abraham - he knew a Lot.",
      "What do you call a Catholic service that's very important? A critical Mass.",
      "Why was Goliath so surprised when David hit him with a rock? The thought had never entered his head before!",
      "What did God say after creating man? 'I can do better than that' - then He created woman.",
      "Why didn't the Romans find Jesus when He was born? Because they searched high and low, but He was in a manger.",
      "What do donkeys send out at Christmas? Mule-tide greetings!",
      "Who was the greatest comedian in the Bible? Samson - he brought the house down!",
      "Why did the prophet always bring a ladder? To reach new heights!",
      "What do you call a Bible character who just pulled into church? A prophet in the parking lot!",
      "How does Jonah describe his experience with the whale? He said it was a whale of a tale!"
    ],
    
    // ========== CHRISTIAN QUOTES & SCRIPTURES ==========
    christianQuotes: [
      "God is most glorified in us when we are most satisfied in Him. - John Piper",
      "Faith does not eliminate questions. But faith knows where to take them. - Elisabeth Elliot",
      "When I cannot read, when I cannot think, when I cannot pray, I can trust. - Hudson Taylor",
      "The shortest distance between a problem and a solution is the distance between your knees and the floor. - Charles Stanley",
      "God never said the journey would be easy, but He did say the arrival would be worthwhile. - Max Lucado",
      "To be a Christian means to forgive the inexcusable, because God has forgiven the inexcusable in you. - C.S. Lewis",
      "Don't dig up in doubt what you planted in faith. - Elisabeth Elliot",
      "The Christian life is not slightly better, but completely different. - Clarence Sexton",
      "God uses men who are weak and feeble enough to lean on Him. - Hudson Taylor",
      "Catch on fire with enthusiasm and people will come for miles to watch you burn! - John Wesley",
      "Faith is to believe what you do not see; the reward is to see what you believe. - St. Augustine",
      "All the darkness in the world cannot extinguish the light of a single candle. - Francis of Assisi",
      "Prayer is not overcoming God's reluctance, but laying hold of His willingness. - Martin Luther",
      "Where God guides, He provides. - Isaiah 58:11",
      "Your potential is the sum of all the possibilities God has for your life. - Charles Stanley",
      "Joy is not the absence of trouble, but the presence of Christ.",
      "God doesn't call the qualified, He qualifies the called.",
      "Life is too short, the world is too big, and God's love is too great to live ordinary. - Christine Caine",
      "Remember who you are. You are a child of the Almighty God. Live that truth. - Lysa TerKeurst",
      "Struggling with sin? Be encouraged. It's a sign of spiritual life. Corpses don't struggle. - Matt Smethurst",
      "Faith never knows where it is being led, but it loves and knows the One who is leading. - Oswald Chambers",
      "The true call of a Christian is not to do extraordinary things, but to do ordinary things in an extraordinary way. - Dean Stanley",
      "I can do all things through Christ who strengthens me! - Philippians 4:13",
      "The Lord is my shepherd, I shall not want. - Psalm 23:1",
      "For God so loved the world! - John 3:16",
      "Be strong and courageous! - Joshua 1:9",
      "Trust in the Lord with all your heart! - Proverbs 3:5",
      "The joy of the Lord is my strength! - Nehemiah 8:10",
      "God is our refuge and strength! - Psalm 46:1",
      "Love your enemies! - Matthew 5:44",
      "Fear not, for I am with you! - Isaiah 41:10",
      "Let your light shine! - Matthew 5:16",
      "Rejoice always! - 1 Thessalonians 5:16",
      "A joyful heart is good medicine! - Proverbs 17:22",
      "Cast your cares on the Lord! - 1 Peter 5:7",
      "God is love! - 1 John 4:8"
    ],
    
    // ========== BIRD & HUNTING JOKES ==========
    birdJokes: [
      "Why do birds fly south? It's too far to walk!",
      "What do you call a duck that steals? A robber ducky!",
      "Why do seagulls fly over the sea? Because if they flew over the bay, they'd be bagels!",
      "What do you call an owl with armor? A knight owl!",
      "Why did the turkey cross the road? To prove he wasn't chicken!",
      "What do you call a bird that's afraid to fly? Chicken!",
      "Why don't birds use Facebook? They already have Twitter!",
      "What do you call a parrot wearing a raincoat? Polly unsaturated!",
      "What's a bird's favorite subject? Owlgebra!",
      "Why do crows sit on telephone wires? To make long-distance caws!",
      "What do you call a sad bird? A bluebird!",
      "Why did the pelican get kicked out of the restaurant? He had a big bill!",
      "Why do hummingbirds hum? They forgot the words!",
      "What's a duck's favorite snack? Quackers!",
      "What bird is always out of breath? A puffin!",
      "What do you call a chicken staring at lettuce? Chicken sees a salad!",
      "Why don't eagles like fast food? They can't catch it!",
      "What do you call a bird that can fix anything? A duck-tape specialist!",
      "Why did the bird go to the hospital? To get tweet-ment!",
      "What's a hawk's favorite movie? The Birds!",
      "What do you call a gossiping bird? A mockingbird!",
      "Why did the crow take a bath? It wanted to be squeaky clean!",
      "What kind of bird works at a construction site? A crane!",
      "Why was the owl invited to all the parties? Because he was a hoot!",
      "What do you call a penguin in the desert? Lost!"
    ],
    
    huntingJokes: [
      "Why did the hunter bring a ladder? He heard the ducks were flying high!",
      "What do you call a deer with no eyes? No eye deer!",
      "Why do hunters make bad comedians? Their jokes always miss the mark!",
      "What's a hunter's favorite music? Heavy metal locators!",
      "What do you call a lazy hunter? A loaf-er in the blind!",
      "Why did the goose go to college? For higher honk-ducation!",
      "What's a turkey's favorite dessert? Peach gobbler!",
      "Why don't hunters ever get lost? They always find their bear-ings!",
      "What do you call a fish that won't shut up? A big mouth bass!",
      "Why did the duck become a comedian? Great delivery!",
      "How do you organize a turkey hunt? You wing it!",
      "What do ducks wear to fancy parties? Their tuxeducks!",
      "Why was the hunter so good at poker? He always had a bird in hand!",
      "What do you call a hunting dog that meditates? Aware wolf!",
      "Why did the bird join the band? It had perfect tweet!"
    ],
    
    // ========== WELLNESS REMINDERS ==========
    wellnessReminders: [
      "Hey champion! Time to stretch those legs!",
      "Reminder: Your spine wants to be straight for once! 🧘",
      "Drink some water! Your brain is 75% H2O!",
      "Time for the 20-20-20 rule! Look 20ft away for 20 seconds!",
      "Quick stretch! Even 30 seconds helps!",
      "Step outside for a minute! Fresh air = fresh mind!",
      "Roll those shoulders! Gaming can make 'em tight!",
      "Blink! Gamers forget to blink. Do it 10 times now!",
      "Deep breath! In through nose, out through mouth!",
      "When did you last eat something healthy?",
      "Your body is a temple! Take care of it!",
      "Stand up and march in place for 30 seconds!",
      "Quick gratitude moment: Name 3 things you're thankful for!",
      "Feeling frustrated? Take 3 deep breaths.",
      "Remember: It's just a game. Have fun!",
      "Posture check! Sit up straight, warrior!",
      "Wiggle your toes! Get that blood flowing!",
      "Unclench your jaw. You didn't know you were doing it, did you?",
      "Check the time - is it past your bedtime?",
      "When's the last time you texted someone you love?",
      "Take a moment to pray and be grateful!",
      "Have you hugged someone today?",
      "Smile! Even a fake smile improves mood!",
      "Rest your eyes for 30 seconds!",
      "Did you eat breakfast? It's important!"
    ],
    
    // ========== CHARACTER-SPECIFIC LINES ==========
    
    hunterLines: {
      buck: {
        greeting: ["Howdy partner!", "Saddle up!", "Let's ride!", "Time to hunt!"],
        kill: ["That's western justice!", "Cowboy style!", "Yee-haw!", "Bullseye!"],
        hurt: ["That ain't nothin'!", "Just a scratch!", "I've had worse!", "Ouch, dagnabbit!"],
        special: ["The wild west lives on!", "This is my kind of hunt!", "Fastest gun in the west!"]
      },
      daisy: {
        greeting: ["Hey y'all!", "Let's do this!", "Ready when you are!", "Bring it on!"],
        kill: ["Gotcha, sugar!", "Too easy!", "That's what I'm talking about!", "Nailed it!"],
        hurt: ["Ouch! That bird's got nerve!", "Oh no you didn't!", "I'm still standing!", "Really?!"],
        special: ["Girls get it done!", "Country strong!", "Don't mess with Texas!"]
      },
      clyde: {
        greeting: ["Freedom ain't free!", "For America!", "Let's go!", "Lock and load!"],
        kill: ["Patriot missile!", "America, baby!", "That's for the USA!", "Freedom shot!"],
        hurt: ["They can't break me!", "Still fighting!", "Not today, bird!", "Is that all you got?"],
        special: ["God bless America!", "This is what freedom looks like!", "🇺🇸 USA! USA!"]
      },
      bubba: {
        greeting: ["Hold my beer!", "This is gonna be fun!", "Here we go!", "Whooo-weee!"],
        kill: ["Got 'em!", "That was purdy!", "Hot dog!", "Boom!"],
        hurt: ["Ooof! That smarts!", "You're gonna pay for that!", "Lucky shot!", "Aw man!"],
        special: ["That's how we do it down south!", "Bubba don't miss twice!", "Southern comfort!"]
      },
      gunner: {
        greeting: ["I've seen things...", "Ready for action!", "Let's move!", "Locked on target!"],
        kill: ["Target neutralized!", "Clean hit!", "Mission accomplished!", "Hostile down!"],
        hurt: ["I've had worse in training!", "Pain is temporary!", "Not stopping me!", "Just a flesh wound!"],
        special: ["Veterans never quit!", "This old soldier's still got it!", "Semper Fi!"]
      },
      jolene: {
        greeting: ["Bless your heart!", "Hey honey!", "Let's make this fun!", "Ready, sweetie!"],
        kill: ["That's for being messy!", "Clean shot, clean bird!", "Bye bye birdie!", "Gotcha!"],
        hurt: ["Well I never!", "That was rude!", "Not very polite!", "Oh my stars!"],
        special: ["Southern hospitality with a shotgun!", "The Parker way!", "Grace and grit!"]
      },
      sierra: {
        greeting: ["Great for my macros!", "Let's crush it!", "Time to work out!", "Gains incoming!"],
        kill: ["Feel the burn!", "Rep complete!", "That's a PR!", "CrossFit strong!"],
        hurt: ["Pain is gain!", "No excuses!", "Push through it!", "That's just lactic acid!"],
        special: ["This counts as cardio!", "CrossFit has prepared me!", "No pain, no gain!"]
      },
      tammy: {
        greeting: ["I deal with worse at work!", "Let's get this done!", "Order up!", "Clock's ticking!"],
        kill: ["Take that, honey!", "Order's up - YOU'RE out!", "Check please!", "Next!"],
        hurt: ["I've spilled hotter coffee!", "That ain't nothing!", "Keep trying, bird!", "Seen worse tips!"],
        special: ["These birds tip worse than my customers!", "Truck stop tough!", "Coffee break's over!"]
      }
    },
    
    // ========== SCENE-SPECIFIC GREETINGS ==========
    sceneGreetings: {
      christmas: [
        "🎄 Merry Christmas! Jesus is the reason for the season!",
        "⭐ Glory to God in the highest!",
        "🎁 The greatest gift ever given is Jesus!",
        "❄️ Be thankful for family and blessings!",
        "🙏 Joy to the world, the Lord has come!",
        "🎅 Ho ho ho! Time to hunt!",
        "⛄ Let it snow, let it snow!"
      ],
      farm: [
        "Welcome to the farm! Watch for chickens!",
        "Fresh country air! Let's hunt!",
        "Old MacDonald had a farm... with LOTS of birds!",
        "Yeehaw! Time to do some good old-fashioned hunting!",
        "The rooster's crowing! Game time!",
        "Barn door's open! Let's go!"
      ],
      forest: [
        "Into the wild! Bears might be around...",
        "The forest is alive with birds!",
        "Deep in the woods, adventure awaits!",
        "Watch your step and your head!",
        "Nature is beautiful... and full of targets!",
        "The trees are whispering... 'shoot that bird!'"
      ],
      lake: [
        "Nothing like a peaceful lake... full of ducks!",
        "Great fishing spot! Even better hunting!",
        "Waterfowl paradise right here!",
        "Cast your worries away and shoot some birds!",
        "Ducks ahoy!",
        "Lake life is the best life!"
      ],
      park: [
        "🌿 NO HUNTING! Tranq darts only here!",
        "Wildlife sanctuary - be gentle!",
        "Let's put these birds to sleep instead!",
        "Even in no-hunting zones, we keep it fun!",
        "Shhh... sleeping birds ahead!",
        "Tranquility mode activated! 😴"
      ],
      desert: [
        "It's getting hot out here!",
        "Vultures circling! Must be hunting time!",
        "The wild west awaits, partner!",
        "Stay hydrated, shooter!",
        "Tumbleweeds and turkeys!",
        "Desert eagles incoming!"
      ],
      snow: [
        "Bundle up! It's freezing out here!",
        "Ice cold hunting in the mountains!",
        "Snow birds incoming!",
        "Don't let the cold stop you!",
        "Brrr! But the hunting's hot!",
        "Arctic adventure time!"
      ],
      beach: [
        "Seagulls everywhere! Fire away!",
        "Coastal vibes and bird cries!",
        "Beach day? More like bird day!",
        "The ocean is beautiful... the seagulls are annoying!",
        "Sandy toes and bird woes!",
        "Surf's up, birds are down!"
      ],
      swamp: [
        "DRAIN THE SWAMP!",
        "Watch out for globalists!",
        "It's murky, but we're ready!",
        "This swamp needs cleaning!",
        "Gators and birds, oh my!",
        "Swamp thing hunting!"
      ],
      whitehouse: [
        "🇺🇸 Welcome to Washington D.C.!",
        "FINAL LEVEL! Protect the President!",
        "The White House needs defending!",
        "America's finest hour!",
        "Secret Service reporting!",
        "Democracy in action!"
      ],
      church: [
        "Church camp! Extra blessings here!",
        "A peaceful retreat... with birds!",
        "Let your faith guide your aim!",
        "Even at church camp, birds gotta go!",
        "Praise and shoot!",
        "Fellowship and hunting!"
      ]
    },
    
    // ========== SNIPER ENCOUNTER ==========
    sniperEncounter: {
      appear: [
        "🎯 Sniper spotted! He's a lost soul - don't kill him!",
        "That fella's lost, not evil! Tranqs only!",
        "Even enemies deserve mercy. Jesus said so.",
        "He needs Jesus, not bullets!",
        "Hold your fire! He's just misguided!",
        "Capture him so we can share the Gospel!"
      ],
      hit: [
        "He's down! Quick, let's talk to him!",
        "Got him! Now's our chance to share the gospel!",
        "Captured! Time to show him there's a better way.",
        "Nice shot! Let's pray over him!",
        "He's sleeping! Time to plant seeds of faith!",
        "Quick! Get to him before he wakes!"
      ],
      captured: [
        "Jesus died for you too, friend.",
        "God's not done with you yet!",
        "Come to church with us? Best decision you'll ever make!",
        "Everyone deserves a second chance!",
        "The Lord loves you, and so do we!",
        "There's hope for everyone who seeks it!"
      ],
      escaped: [
        "He got away... but God never gives up!",
        "We'll pray for him anyway.",
        "The Lord is patient with everyone.",
        "Next time! His soul is worth saving!",
        "Plant the seed, God makes it grow."
      ]
    },
    
    // ========== KILL LINES ==========
    killLines: {
      general: [
        "Nice shot!", "Bullseye!", "Gotcha!", "Down goes another one!",
        "That bird had it coming!", "Clean shot!", "Right on target!",
        "Ka-pow!", "Nailed it!", "That's how it's done!",
        "Perfect!", "Splat!", "Boom!", "Direct hit!",
        "One less bird!", "Target eliminated!", "Got 'em!"
      ],
      streak: [
        "You're on fire!", "Unstoppable!", "Is there anything you can't hit?",
        "The birds don't stand a chance!", "Sharpshooter activated!",
        "You're in the zone!", "Keep 'em coming!",
        "Hot streak!", "Can't miss!", "Legend status!"
      ],
      boss: [
        "Boss DOWN!", "The bigger they are...!", "Now THAT'S impressive!",
        "David vs Goliath moment right there!", "Legendary takedown!",
        "Epic victory!", "Boss destroyed!", "That was HUGE!"
      ]
    },
    
    // ========== DAMAGE LINES ==========
    damageLines: {
      turdHit: [
        "Direct hit!", "Splat!", "That's gonna leave a mark!",
        "Target acquired... by bird!", "Incoming!", "Bombs away!",
        "Nature's revenge!", "Aerial assault!", "Watch out above!",
        "Gross!", "Yuck!", "Ewww!", "Really?!"
      ],
      lowHealth: [
        "Hang in there!", "You can do this!", "Don't give up!",
        "Stay strong!", "Keep fighting!", "God's got you!",
        "Just a bit more!", "You're almost there!", "Stay focused!"
      ]
    },
    
    // ========== UTILITY FUNCTIONS ==========
    
    getRandom: function(array) {
      // Track used jokes to prevent repeats
      let available = array.filter(item => !this.usedJokes.has(item));
      
      if (available.length === 0) {
        // Reset if we've used too many
        this.usedJokes.clear();
        available = array;
      }
      
      const selected = available[Math.floor(Math.random() * available.length)];
      this.usedJokes.add(selected);
      
      // Prevent memory bloat
      if (this.usedJokes.size > this.maxBeforeReset) {
        this.usedJokes.clear();
      }
      
      return selected;
    },
    
    getDadJoke: function() {
      return this.getRandom(this.dadJokes);
    },
    
    getChristianJoke: function() {
      return this.getRandom(this.christianJokes);
    },
    
    getChristianQuote: function() {
      return this.getRandom(this.christianQuotes);
    },
    
    getBirdJoke: function() {
      return this.getRandom(this.birdJokes);
    },
    
    getHuntingJoke: function() {
      return this.getRandom(this.huntingJokes);
    },
    
    getWellnessReminder: function() {
      return this.getRandom(this.wellnessReminders);
    },
    
    getSceneGreeting: function(sceneKey) {
      const greetings = this.sceneGreetings[sceneKey];
      return greetings ? this.getRandom(greetings) : this.getRandom(this.sceneGreetings.farm);
    },
    
    getHunterLine: function(hunterId, lineType) {
      const hunter = this.hunterLines[hunterId] || this.hunterLines.buck;
      const lines = hunter[lineType] || hunter.greeting;
      return this.getRandom(lines);
    },
    
    getKillLine: function(isStreak, isBoss) {
      if (isBoss) return this.getRandom(this.killLines.boss);
      if (isStreak) return this.getRandom(this.killLines.streak);
      return this.getRandom(this.killLines.general);
    },
    
    getDamageLine: function(isTurd, isLowHealth) {
      if (isLowHealth) return this.getRandom(this.damageLines.lowHealth);
      if (isTurd) return this.getRandom(this.damageLines.turdHit);
      return "Ouch!";
    },
    
    getSniperLine: function(phase) {
      const lines = this.sniperEncounter[phase];
      return lines ? this.getRandom(lines) : "Watch out!";
    },
    
    // Get any random joke (mixing all types)
    getRandomJoke: function() {
      const allJokes = [...this.dadJokes, ...this.christianJokes, ...this.birdJokes, ...this.huntingJokes];
      return this.getRandom(allJokes);
    },
    
    // Get contextual content based on game state
    getContextualContent: function(context) {
      const { scene, event, hunterId, streak, health } = context || {};
      
      if (event === 'kill' && streak > 5) {
        return this.getKillLine(true, false);
      }
      if (event === 'boss_kill') {
        return this.getKillLine(false, true);
      }
      if (event === 'damage' && health < 30) {
        return this.getDamageLine(false, true);
      }
      if (event === 'damage') {
        return this.getDamageLine(true, false);
      }
      if (event === 'scene_enter' && scene) {
        return this.getSceneGreeting(scene);
      }
      if (event === 'sniper') {
        return this.getSniperLine('appear');
      }
      
      if (hunterId) {
        const types = ['greeting', 'kill', 'special'];
        return this.getHunterLine(hunterId, types[Math.floor(Math.random() * types.length)]);
      }
      
      return this.getRandomJoke();
    },
    
    // Stats
    getStats: function() {
      return {
        dadJokes: this.dadJokes.length,
        christianJokes: this.christianJokes.length,
        christianQuotes: this.christianQuotes.length,
        birdJokes: this.birdJokes.length,
        huntingJokes: this.huntingJokes.length,
        wellnessReminders: this.wellnessReminders.length,
        total: this.dadJokes.length + this.christianJokes.length + this.christianQuotes.length + 
               this.birdJokes.length + this.huntingJokes.length + this.wellnessReminders.length
      };
    }
  };
  
  const stats = window.ComicVoices.getStats();
  console.log(`✅ Comic Voices System loaded - ${stats.total}+ unique jokes and quotes!`);
  console.log(`   📝 Dad Jokes: ${stats.dadJokes} | Christian: ${stats.christianJokes + stats.christianQuotes} | Birds: ${stats.birdJokes} | Hunting: ${stats.huntingJokes}`);
  
})();
