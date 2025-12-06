# BirdTurds Game - Complete Project Context
## For AI Assistants & Developers

**Last Updated:** December 5, 2025  
**Current Version:** v37.8.1 - Custom BirdTurd Emoji Update  
**Website:** https://birdturds.com  
**Contact:** support@birdturds.com

---

## 🆕 v37.8.1 CHANGES (Latest)

### Custom BirdTurd Emoji:
- Replaced ALL brown previous brown emoji emojis with custom grey-white BirdTurd image
- Replaced "old wording/old wording" wording with "Turd/Turds"
- New icon: `sprites/icons/birdturd-64.png` (optimized 64x64)
- Original high-res: `sprites/icons/birdturd.png` (1024x1024)
- CSS class `.birdturd-emoji` added for proper sizing

### Usage:
```html
<img src="sprites/icons/birdturd-64.png" alt="BirdTurd" class="birdturd-emoji">
```

---

## 🎯 THE MISSION (CRITICAL - READ FIRST!)

This is NOT just a game. This is a **ministry tool** disguised as entertainment.

### The Owner's Personal Testimony:
The owner watched their own kids spending too much time online, glued to screens, becoming "phone zombies." Like most parents, they tried nagging: "Get off that phone!" "Put down that game!" But nagging only drove the kids online MORE.

**The breakthrough insight:** Instead of fighting against games, bring GOD'S WORD INTO the games. Meet youth where they are — on their screens — and plant seeds of biblical truth while they're having fun.

### Core Purpose:
- Reach today's youth with the Gospel through gaming
- Plant seeds of Scripture in every play session
- Wake up the "phone zombie" generation
- Share end times warnings and rapture awareness
- Provide family-friendly entertainment with PURPOSE
- Create a safe space for young people online

### Key Scripture:
> "Don't let anyone look down on you because you are young, but set an example for the believers..." — 1 Timothy 4:12

---

## 🛡️ CHILD SAFETY - ZERO TOLERANCE POLICY

The owner has a STRONG stance on protecting children:

- **Predator Warning:** The About page contains a direct warning to predators that the team WILL track them down and take action
- **Content Moderation:** All user-generated content (testimonies, blog posts, usernames) goes through ContentModerator system
- **No Contact Info Allowed:** Email, phone, social media handles are blocked in user submissions
- **Biblical Foundation:** Multiple scriptures about protecting children (Matthew 18:6, Mark 10:14, Luke 17:2, Psalm 82:3-4, etc.)

**Key quote from About page:**
> "You will WISH you never saw this site by the time we are done with what we're going to do to you."

---

## 🎮 GAME OVERVIEW

**Genre:** Side-scrolling shooter with biblical themes  
**Platform:** Web-based (desktop + mobile)  
**Engine:** Phaser 3  

### Core Gameplay:
1. Player controls a hunter character
2. Shoot birds that turd on you (humor element)
3. Collect Bibles for health, strength, and Holy Shield
4. Wake up "phone zombies" by giving them Bibles
5. Battle demons at the White House level with Scripture
6. Progress through 8 themed levels across America

### The 8 Levels:
1. **Suburbs** - Starting area
2. **Farm** - Rural America
3. **Forest** - Wilderness
4. **Desert** - Southwest
5. **Beach** - Coastal
6. **Snow Mountain** - Winter wonderland
7. **Swamp** - Fight Globalist villains
8. **White House** - Final boss, fight Demons

---

## 📖 BIBLICAL INTEGRATION

### Scripture Display:
- 78+ Bible verses integrated throughout
- Scriptures appear when collecting Bibles
- End times prophecy warnings (Matthew 24 signs)
- Rapture awareness messages
- Victory scriptures when defeating demons

### Phone Zombies Feature:
- NPCs walking around staring at phones
- Player can "wake them up" by giving them a Bible
- Represents reaching the screen-addicted generation
- Awards points and shows encouraging messages

### Holy Shield System (v37.8):
- Collect 3 Bibles to activate 45-second protection
- Golden glowing shield around player
- Complete immunity from demon attacks
- Demons become ENRAGED (visual effects + messages)
- Represents the power of God's Word for protection

### Bible Weapon:
- Purchasable weapon that shoots Scripture
- 5x damage against demons
- Shows Bible verses when fired
- Represents using God's Word as a weapon (Ephesians 6)

---

## 🏗️ VERSION HISTORY

### v37.1 - Base Game
- Core shooting mechanics
- 8 levels with landscapes
- Bird spawning and collision

### v37.2 - Phone Zombies
- Added phone zombie NPCs
- Bible giving mechanic
- Awakening animations

### v37.3 - Demons & Spiritual Warfare
- Demon enemies at White House
- Bible weapon system
- Demon "lies" projectiles

### v37.4 - Economy & Store
- Coin system (<img src="sprites/icons/birdturd.png" alt="BirdTurd" /> turd coins)
- In-game store
- Angel Protection powerups

### v37.5 - Community Features
- Testimonies section
- Blog/devotional posts
- Content moderation

### v37.6 - Church Finder
- Find local churches
- Featured churches display
- Church submission form

### v37.7 - UI Enhancements
- Church Bulletins feature
- Time Steward app (productivity)
- Competitions system

### v37.8 - Holy Shield & Mission (CURRENT)
- Bible pickups build Holy Strength
- 3 Bibles = Holy Shield (45s demon immunity)
- Demons get enraged when shield activates
- Mission Nudges system (periodic messages about purpose)
- Comprehensive About page with owner's testimony
- Predator warning section
- "WHY THIS GAME?" banner in play.html

---

## 📁 FILE STRUCTURE

```
deploy-to-server/
├── index.html          # Landing page
├── play.html           # Main game page (5100+ lines)
├── game.js             # Game engine (18,700+ lines)
├── game_min.js         # Minified version
├── about.html          # Mission & testimony page
├── time-steward-app.html # Productivity tool
├── service-worker.js   # PWA offline support
├── manifest.json       # PWA manifest
└── sprites/
    └── landscapes/     # Level background images
```

---

## 🔧 KEY CODE LOCATIONS

### game.js Important Sections:

| Feature | Approximate Line |
|---------|-----------------|
| Game Config | 50-200 |
| btState (game state) | 700-850 |
| Difficulty settings | 50-150 |
| Badge definitions | 1000-1050 |
| Angel Protection | 1060-1100 |
| Bible types | 1140-1180 |
| Demon config | 1480-1510 |
| Demon scriptures | 1520-1600 |
| Asset loading | 2000-2200 |
| Game initialization | 2200-2300 |
| Quick Store | 16240-16450 |
| **Mission Nudges** | 16250-16450 |
| Bible pickup collection | 3050-3150 |
| **Holy Shield system** | 3170-3290 |
| Phone zombie awakening | 13200-13350 |
| Demon updates | 11550-11720 |
| Lie hit detection | 11666-11720 |

### play.html Important Sections:

| Feature | Approximate Line |
|---------|-----------------|
| CSS Styles | 1-500 |
| Header/Navigation | 1100-1200 |
| Game container | 1300-1500 |
| Start screen | 1600-1800 |
| **Mission banner** | 2345-2420 |
| Youth section | 2420-2500 |
| Community section | 2500-2700 |
| Church finder | 2800-3000 |
| JavaScript functions | 3000-5100 |

---

## 🎨 DESIGN LANGUAGE

### Colors:
- **Primary Purple:** #a855f7 (youth/gaming)
- **Gold/Yellow:** #ffd700 (divine/scripture)
- **Green:** #22c55e (success/positive)
- **Red:** #ef4444 (warnings/demons)
- **Dark backgrounds:** #0f172a, #1e293b

### Typography:
- Sans-serif fonts (Arial, system fonts)
- Bold for emphasis
- Italic for scripture quotes

### UI Elements:
- Rounded corners (12-16px border-radius)
- Gradient backgrounds
- Glowing effects for divine elements
- Shake animations for demons/danger

---

## 💬 TONE & VOICE

### For Players:
- Fun, energetic, humorous
- Youth-friendly language
- Encouraging and uplifting
- Never preachy or judgmental

### For Scripture:
- Reverent but accessible
- Clear modern translations (NIV preferred)
- Applied to gameplay context

### For Warnings (predators, demons):
- Serious and direct
- No-nonsense
- Backed by Scripture

---

## 🚀 FUTURE FEATURE IDEAS

(Not yet implemented, but discussed):
- Multiplayer mode
- Mobile app versions (iOS/Android)
- More levels (Israel, Rome, etc.)
- Character customization
- Daily devotional push notifications
- Youth group leaderboards
- Pastor dashboard for youth leaders

---

## ⚠️ IMPORTANT NOTES FOR AI ASSISTANTS

1. **Never remove or weaken** the biblical content - it's the core purpose
2. **Never remove or soften** the predator warning - it's non-negotiable
3. **Keep the humor** - bird turd is intentional (makes it appealing to youth)
4. **Maintain the balance** - fun gameplay WITH spiritual purpose
5. **Test on mobile** - many youth play on phones
6. **Content moderation** is critical - protect the kids
7. **End times themes** are intentional - the owner believes we're in the last days

---

## 📞 SUPPORT

- **Email:** support@birdturds.com
- **Website:** https://birdturds.com
- **Youth Group Inquiries:** Welcome!

---

## 🙏 CLOSING SCRIPTURE

> "For the Son of Man came to seek and to save the lost." — Luke 19:10

This game exists because God loves young people and wants them to know Him. Every feature, every Scripture, every silly bird turd joke is designed to open hearts to the Gospel.

**The harvest is plentiful. The workers are few. Let's reach this generation!**

---

*Document created for AI assistant handoff - December 2025*
