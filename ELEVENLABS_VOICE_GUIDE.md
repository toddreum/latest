# ELEVENLABS VOICE SELECTION GUIDE
## BirdTurds v41 - Finding the Perfect Character Voices

Your API Key: `sk_b554551c62c1ccb46e475312cf4eb7a31ff2a0d229ba76ae`

---

## 🎯 HOW TO FIND VOICES

### Step 1: Go to Voice Library
1. Open https://elevenlabs.io/voice-library
2. Log in with your account

### Step 2: Search for Each Character
Use the search terms below to find appropriate voices.

### Step 3: Preview and Copy Voice ID
1. Click on a voice to preview it
2. Click the "+" button to add to your library
3. Go to "My Voices" to see the Voice ID
4. Copy the ID (looks like: `2EiwWnXFnvU5JabPnv8n`)

### Step 4: Paste into Code
Open `js/systems/elevenlabs-voice.js` and paste each Voice ID into the `voices` config.

---

## 🎤 RECOMMENDED VOICE SEARCHES

### PASTOR (Warm Southern Preacher)
**Search terms:** `southern preacher`, `warm male narrator`, `pastor`, `southern gentleman`

**Look for:**
- Warm, authoritative tone
- Southern or American accent
- Kind but firm delivery
- Middle-aged to older male

**Try these voices:**
- "Adam" - Deep American male
- "George" - Warm British (can work)
- Search "pastor" or "preacher" in community voices

---

### BUCK (Experienced Hunter - Main Character)
**Search terms:** `southern male`, `country`, `confident male`, `hunter`

**Look for:**
- Confident, experienced tone
- Southern/country accent
- Middle-aged male
- Rugged but likeable

**Default voice suggestion:** "Josh" or "Arnold"

---

### BUBBA (Deep Gruff Country)
**Search terms:** `deep male`, `gruff`, `southern`, `country`, `redneck`

**Look for:**
- Very deep voice
- Thick Southern drawl
- Gruff/rough delivery
- Working man vibes

**Try:** Search "bubba" or "big guy" in community

---

### DAISY (Southern Belle)
**Search terms:** `southern belle`, `sweet female`, `country woman`, `feminine southern`

**Look for:**
- Sweet but with an edge
- Clear Southern accent
- Young to middle-aged female
- Could sass you if needed

**Default voice suggestion:** "Grace" (has Southern accent)

---

### CLYDE (Western Cowboy)
**Search terms:** `cowboy`, `western`, `texas`, `drawl`, `old west`

**Look for:**
- Western/cowboy drawl
- Confident, laid-back
- Male, any age
- "Yippee ki-yay" energy

---

### HANK (Older Country Gentleman)
**Search terms:** `old man`, `grandfather`, `wise`, `southern elder`

**Look for:**
- Older male voice
- Wise, experienced tone
- Southern or country accent
- Grandpa vibes

---

### SALLY (Friendly Country Woman)
**Search terms:** `country female`, `motherly`, `warm woman`, `friendly female`

**Look for:**
- Warm, friendly
- Country/Southern accent
- Middle-aged female
- Approachable, nurturing

---

### TEX (Texas Accent)
**Search terms:** `texas`, `cowboy`, `confident male`, `american`

**Look for:**
- Strong Texas accent
- Confident, bold
- Male
- Big personality

---

### JOLENE (Sassy Southern)
**Search terms:** `sassy female`, `confident woman`, `southern`, `fierce`

**Look for:**
- Sassy attitude
- Southern accent
- Confident, bold female
- Could be flirty or fierce

---

### SIERRA (Athletic Country Gal)
**Search terms:** `athletic female`, `confident`, `young woman`, `energetic`

**Look for:**
- Energetic, athletic vibe
- Young adult female
- Confident
- Slight country accent

---

### TAMMY (Sweet Country Girl)
**Search terms:** `sweet female`, `young`, `innocent`, `southern`

**Look for:**
- Sweet, innocent tone
- Young female
- Light Southern accent
- Wholesome

---

### GUNNER (Military Tough Guy)
**Search terms:** `military`, `soldier`, `tough male`, `commanding`

**Look for:**
- Commanding presence
- Military/tactical speech
- Confident male
- Action hero vibes

---

### TRACTOR DRIVERS

**Good Tractor (Friendly):**
Search: `friendly farmer`, `cheerful male`, `helper`
- Warm, helpful
- Country accent
- Happy to help

**Bad Tractor (Grumpy):**
Search: `grumpy old man`, `angry`, `curmudgeon`
- Irritable, angry
- Growling voice
- "Get off my lawn" energy

---

### DEMON (Evil/Sinister)
**Search terms:** `demon`, `evil`, `dark`, `sinister`, `villain`

**Look for:**
- Deep, menacing
- Otherworldly quality
- Could be raspy or booming
- Scary!

**Tip:** Use Voice Design with prompt:
"A deep, sinister demon voice, otherworldly and menacing, with a growling undertone"

---

## 🛠️ VOICE DESIGN (Create Custom Voice)

If you can't find a perfect match, use Voice Design:

1. Go to **Voices → My Voices → Add a new voice → Voice Design**
2. Enter a description like:
   - "A gruff Southern man in his 50s with a thick country drawl and deep voice"
   - "A young Southern belle with a sweet but sassy personality"
   - "A menacing demon voice, deep and otherworldly"
3. Click Generate - you'll get 3 options
4. Save the one you like best

---

## 📋 VOICE ID TEMPLATE

Once you have all your voices, fill in this template and paste into the code:

```javascript
voices: {
  pastor:     { voiceId: 'PASTE_ID_HERE' },
  buck:       { voiceId: 'PASTE_ID_HERE' },
  bubba:      { voiceId: 'PASTE_ID_HERE' },
  daisy:      { voiceId: 'PASTE_ID_HERE' },
  clyde:      { voiceId: 'PASTE_ID_HERE' },
  hank:       { voiceId: 'PASTE_ID_HERE' },
  sally:      { voiceId: 'PASTE_ID_HERE' },
  tex:        { voiceId: 'PASTE_ID_HERE' },
  jolene:     { voiceId: 'PASTE_ID_HERE' },
  sierra:     { voiceId: 'PASTE_ID_HERE' },
  tammy:      { voiceId: 'PASTE_ID_HERE' },
  gunner:     { voiceId: 'PASTE_ID_HERE' },
  tractorGood:{ voiceId: 'PASTE_ID_HERE' },
  tractorBad: { voiceId: 'PASTE_ID_HERE' },
  demon:      { voiceId: 'PASTE_ID_HERE' },
  trump:      { voiceId: 'PASTE_ID_HERE' }
}
```

---

## 💰 COST ESTIMATE

ElevenLabs charges by character count:
- Each voice line is ~50-150 characters
- ~80 total voice lines defined
- Total: ~8,000 characters for full generation
- Free tier: 10,000 chars/month

You can generate all voices for free on the starter plan!

---

## 🔊 TESTING

After pasting Voice IDs, test in browser console:

```javascript
// Test a specific voice
ElevenLabsVoice.testVoice('YOUR_VOICE_ID', "Howdy partner!")

// Play a line
ElevenLabsVoice.playLine('pastor', 'birdKill')
ElevenLabsVoice.playLine('buck', 'hunterShoot')
```

---

## 📁 PRE-GENERATING FILES (Recommended)

For best performance, pre-generate all audio files:

1. Run in console: `ElevenLabsVoice.generateAllLines()`
2. This shows you all lines that need generating
3. Use ElevenLabs website to generate each one
4. Save as: `/sounds/voices/{character}/{category}_{index}.mp3`
5. Example: `/sounds/voices/pastor/birdKill_0.mp3`

This way the game loads instant audio instead of making API calls!
