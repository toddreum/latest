/**
 * ELEVENLABS VOICE INTEGRATION SYSTEM
 * ====================================
 * BirdTurds v41 - Custom Character Voices
 * 
 * This system integrates ElevenLabs TTS for character voices.
 * Supports both pre-generated audio files AND live API generation.
 */

(function() {
  'use strict';
  
  // ========================================
  // CONFIGURATION - UPDATE THESE WITH YOUR VOICE IDs!
  // ========================================
  
  const ELEVENLABS_CONFIG = {
    // Your API key (for live generation - optional if using pre-generated files)
    apiKey: 'sk_b554551c62c1ccb46e475312cf4eb7a31ff2a0d229ba76ae',
    
    // API endpoint
    apiUrl: 'https://api.elevenlabs.io/v1/text-to-speech',
    
    // Model to use (eleven_multilingual_v2 is recommended)
    model: 'eleven_multilingual_v2',
    
    // Voice settings
    voiceSettings: {
      stability: 0.5,
      similarity_boost: 0.75,
      style: 0.5,
      use_speaker_boost: true
    },
    
    // ========================================
    // VOICE IDs - FILL THESE IN FROM ELEVENLABS!
    // ========================================
    // Go to: https://elevenlabs.io/voice-library
    // Search for voices and copy their IDs
    // 
    // RECOMMENDED SEARCHES:
    // - "Southern" for country accents
    // - "Texas" for cowboy voices  
    // - "Deep male" for gruff characters
    // - "Sweet female" for female characters
    // - "Sinister" or "Dark" for demon
    
    voices: {
      // PASTOR - Warm, authoritative Southern male
      // Search: "southern male warm pastor preacher"
      pastor: {
        voiceId: '', // PASTE VOICE ID HERE
        name: 'Pastor',
        description: 'Warm Southern preacher voice',
        // Pre-generated file path (if using files instead of API)
        audioPath: '/sounds/voices/pastor/'
      },
      
      // BUCK - Main hunter, experienced Southern male
      // Search: "southern male middle-aged confident"
      buck: {
        voiceId: '',
        name: 'Buck',
        description: 'Experienced Southern hunter',
        audioPath: '/sounds/voices/buck/'
      },
      
      // BUBBA - Deep, gruff Southern male
      // Search: "deep male southern gruff country"
      bubba: {
        voiceId: '',
        name: 'Bubba',
        description: 'Deep gruff country voice',
        audioPath: '/sounds/voices/bubba/'
      },
      
      // DAISY - Southern belle, sweet but tough
      // Search: "southern female sweet belle country"
      daisy: {
        voiceId: '',
        name: 'Daisy',
        description: 'Southern belle voice',
        audioPath: '/sounds/voices/daisy/'
      },
      
      // CLYDE - Western/cowboy drawl
      // Search: "cowboy western male texas drawl"
      clyde: {
        voiceId: '',
        name: 'Clyde',
        description: 'Western cowboy voice',
        audioPath: '/sounds/voices/clyde/'
      },
      
      // HANK - Older country male
      // Search: "old man southern country wise"
      hank: {
        voiceId: '',
        name: 'Hank',
        description: 'Older country gentleman',
        audioPath: '/sounds/voices/hank/'
      },
      
      // SALLY - Country female
      // Search: "country female friendly warm"
      sally: {
        voiceId: '',
        name: 'Sally',
        description: 'Friendly country woman',
        audioPath: '/sounds/voices/sally/'
      },
      
      // TEX - Texas accent male
      // Search: "texas male confident cowboy"
      tex: {
        voiceId: '',
        name: 'Tex',
        description: 'Texas cowboy voice',
        audioPath: '/sounds/voices/tex/'
      },
      
      // JOLENE - Sassy Southern female
      // Search: "southern female sassy confident"
      jolene: {
        voiceId: '',
        name: 'Jolene',
        description: 'Sassy Southern woman',
        audioPath: '/sounds/voices/jolene/'
      },
      
      // SIERRA - Athletic country female
      // Search: "female athletic confident american"
      sierra: {
        voiceId: '',
        name: 'Sierra',
        description: 'Athletic country gal',
        audioPath: '/sounds/voices/sierra/'
      },
      
      // TAMMY - Sweet country female
      // Search: "sweet female country young"
      tammy: {
        voiceId: '',
        name: 'Tammy',
        description: 'Sweet country voice',
        audioPath: '/sounds/voices/tammy/'
      },
      
      // GUNNER - Tough military male
      // Search: "military male tough confident"
      gunner: {
        voiceId: '',
        name: 'Gunner',
        description: 'Tough military voice',
        audioPath: '/sounds/voices/gunner/'
      },
      
      // GOOD TRACTOR DRIVER - Friendly country male
      // ✅ ALREADY HAVE AUDIO FILE!
      tractorGood: {
        voiceId: '',
        name: 'Good Tractor Driver',
        description: 'Friendly farmer voice',
        audioFile: '/sounds/goodtractordriveraudio.mp3', // Single file
        audioPath: '/sounds/voices/tractor_good/'
      },
      
      // BAD TRACTOR DRIVER - Grumpy angry male
      // ✅ ALREADY HAVE AUDIO FILE!
      tractorBad: {
        voiceId: '',
        name: 'Bad Tractor Driver',
        description: 'Grumpy farmer voice',
        audioFile: '/sounds/badtractordrivervoice.mp3', // Single file
        audioPath: '/sounds/voices/tractor_bad/'
      },
      
      // DEMON - Deep, sinister voice
      // ✅ ALREADY HAVE AUDIO FILE!
      demon: {
        voiceId: '',
        name: 'Demon',
        description: 'Sinister demon voice',
        audioFile: '/sounds/demonscreech.mp3', // Single file
        audioPath: '/sounds/voices/demon/'
      },
      
      // TRUMP - Distinctive speaking style
      // Note: May need voice cloning or custom voice design
      trump: {
        voiceId: '',
        name: 'Trump',
        description: 'Presidential voice',
        audioPath: '/sounds/voices/trump/'
      }
    }
  };
  
  // ========================================
  // VOICE LINES - What each character says
  // ========================================
  
  const VOICE_LINES = {
    // Pastor commentary lines
    pastor: {
      birdKill: [
        "Bless his heart, that bird never saw it comin'!",
        "The Lord provides... and takes away!",
        "Nice shot! Even the disciples were fishermen!",
        "That's what I call divine intervention!",
        "Praise the Lord and pass the ammunition!"
      ],
      playerHit: [
        "Shake it off, child! God's got your back!",
        "That's just a test of faith right there!",
        "The good Lord never gives us more than we can handle!"
      ],
      levelComplete: [
        "Glory be! You made it through!",
        "The Lord has blessed your aim today!",
        "Well done, good and faithful hunter!"
      ],
      demonSpawn: [
        "Get behind me, Satan!",
        "The devil's minions are among us!",
        "Time to cast out some demons!"
      ],
      scripture: [
        "For God has not given us a spirit of fear! - 2 Timothy 1:7",
        "I can do all things through Christ who strengthens me! - Philippians 4:13",
        "The Lord is my shepherd, I shall not want! - Psalm 23:1",
        "Be strong and courageous! - Joshua 1:9",
        "No weapon formed against you shall prosper! - Isaiah 54:17"
      ]
    },
    
    // Hunter reaction lines (when shooting)
    hunterShoot: {
      buck: ["Got 'em!", "Take that!", "Yeehaw!", "Right between the eyes!"],
      bubba: ["That's how we do it!", "Boom!", "Git some!", "Hoo-wee!"],
      daisy: ["Nailed it!", "Too easy, sugar!", "Bye bye birdie!", "That's for my garden!"],
      clyde: ["Yippee ki-yay!", "Adios, amigo!", "Draw!", "Fastest gun in the West!"],
      hank: ["Still got it!", "Back in my day...", "That's how it's done!", "Experience wins!"],
      sally: ["Gotcha!", "Sorry little fella!", "Bullseye!", "Mama's got aim!"],
      tex: ["Everything's bigger in Texas!", "Howdy and goodbye!", "Don't mess with Texas!"],
      jolene: ["Beauty AND brains!", "Too slow, honey!", "That's what happens!", "Girl power!"],
      sierra: ["Target down!", "On point!", "Training pays off!", "Next!"],
      tammy: ["Oh my stars!", "Did I do that?", "Bless its heart!", "Whoopsie!"],
      gunner: ["Target eliminated!", "Tango down!", "Hostile neutralized!", "Clean shot!"]
    },
    
    // Hunter reaction when hit
    hunterHit: {
      buck: ["Ow! That smarts!", "I've had worse!", "Just a scratch!"],
      bubba: ["Aw, shoot!", "That ain't right!", "Now I'm mad!"],
      daisy: ["Watch the hair!", "Oh no you didn't!", "That's gonna leave a mark!"],
      clyde: ["Dag nabbit!", "They got me!", "I ain't done yet!"],
      jolene: ["Rude!", "My outfit!", "Oh HELL no!"],
      tammy: ["Owwie!", "Mean old bird!", "That hurt!"],
      gunner: ["Taking fire!", "I'm hit!", "Nothing critical!"]
    },
    
    // Tractor driver lines
    tractorGood: {
      greeting: ["Howdy, friend!", "Need a lift?", "Watch out for them birds!"],
      helping: ["I gotcha covered!", "Leave it to me!", "Happy to help!"],
      leaving: ["Y'all take care now!", "God bless!", "Keep huntin'!"]
    },
    tractorBad: {
      greeting: ["Outta my way!", "Move it!", "I got work to do!"],
      angry: ["Dang city folk!", "Learn to drive!", "Watch where you're goin'!"],
      threat: ["I'll run ya over!", "This is MY field!", "Git off my land!"]
    },
    
    // Demon lines
    demon: {
      spawn: ["Your soul is MINE!", "Fear me, mortal!", "Darkness comes!"],
      attack: ["SUFFER!", "No escape!", "Join us!"],
      hit: ["ARGH! That burns!", "Cursed light!", "You'll pay for that!"],
      flee: ["This isn't over!", "I'll be back!", "You got lucky!"]
    }
  };
  
  // ========================================
  // AUDIO CACHE & PLAYBACK SYSTEM
  // ========================================
  
  const audioCache = new Map();
  let audioContext = null;
  
  function getAudioContext() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
  }
  
  // ========================================
  // MAIN API
  // ========================================
  
  window.ElevenLabsVoice = {
    config: ELEVENLABS_CONFIG,
    lines: VOICE_LINES,
    
    /**
     * Play a pre-generated voice file
     * @param {string} character - Character key (e.g., 'buck', 'pastor')
     * @param {string} category - Line category (e.g., 'hunterShoot', 'birdKill')
     * @param {number} [index] - Specific line index, or random if omitted
     */
    playLine: function(character, category, index) {
      try {
        const voiceConfig = ELEVENLABS_CONFIG.voices[character];
        if (!voiceConfig) {
          console.warn(`No voice configured for ${character}`);
          return null;
        }
        
        // If character has a single audio file, just play it
        if (voiceConfig.audioFile) {
          return this.playAudioFile(voiceConfig.audioFile, voiceConfig.name);
        }
        
        const lines = this.getLines(character, category);
        if (!lines || lines.length === 0) {
          console.warn(`No lines found for ${character}/${category}`);
          return null;
        }
        
        const lineIndex = (typeof index === 'number') ? index : Math.floor(Math.random() * lines.length);
        const text = lines[lineIndex % lines.length];
        
        // Try to play pre-generated file first
        if (voiceConfig.audioPath) {
          const audioPath = `${voiceConfig.audioPath}${category}_${lineIndex}.mp3`;
          return this.playAudioFile(audioPath, text);
        }
        
        // Fall back to API generation if no file
        if (voiceConfig.voiceId) {
          return this.generateAndPlay(voiceConfig.voiceId, text);
        }
        
        console.warn(`No audio source for ${character}`);
        return null;
      } catch (e) {
        console.error('ElevenLabsVoice.playLine error:', e);
        return null;
      }
    },
    
    /**
     * Get voice lines for a character/category
     */
    getLines: function(character, category) {
      // Check character-specific lines
      if (VOICE_LINES[character] && VOICE_LINES[character][category]) {
        return VOICE_LINES[character][category];
      }
      // Check category with character subdivision
      if (VOICE_LINES[category] && VOICE_LINES[category][character]) {
        return VOICE_LINES[category][character];
      }
      return null;
    },
    
    /**
     * Play an audio file (no looping, auto-cleanup)
     */
    playAudioFile: function(path, fallbackText) {
      return new Promise((resolve, reject) => {
        // Check cache first
        if (audioCache.has(path)) {
          const cached = audioCache.get(path);
          cached.currentTime = 0;
          cached.loop = false;
          cached.play().then(resolve).catch(e => resolve()); // Don't reject on play fail
          return;
        }
        
        const audio = new Audio(path);
        audio.volume = 0.7;
        audio.loop = false; // NEVER loop
        
        // Track for cleanup on scene change
        if (!window._activeVoiceAudios) window._activeVoiceAudios = [];
        window._activeVoiceAudios.push(audio);
        
        audio.onended = () => {
          const idx = window._activeVoiceAudios.indexOf(audio);
          if (idx > -1) window._activeVoiceAudios.splice(idx, 1);
          resolve();
        };
        
        audio.oncanplaythrough = () => {
          audioCache.set(path, audio);
          audio.play().catch(e => resolve());
        };
        
        audio.onerror = () => {
          console.warn(`Audio not found: ${path}`);
          resolve(); // Don't break game flow
        };
        
        audio.load();
      });
    },
    
    /**
     * Stop all playing voice audio (call on game over/scene change)
     */
    stopAll: function() {
      if (window._activeVoiceAudios) {
        window._activeVoiceAudios.forEach(a => {
          try { a.pause(); a.currentTime = 0; } catch(e) {}
        });
        window._activeVoiceAudios = [];
      }
    },
    
    /**
     * Generate speech using ElevenLabs API and play it
     * Note: This makes API calls and uses credits!
     */
    generateAndPlay: async function(voiceId, text) {
      if (!ELEVENLABS_CONFIG.apiKey || !voiceId) {
        console.warn('ElevenLabs API key or voice ID not configured');
        return null;
      }
      
      try {
        const response = await fetch(`${ELEVENLABS_CONFIG.apiUrl}/${voiceId}`, {
          method: 'POST',
          headers: {
            'xi-api-key': ELEVENLABS_CONFIG.apiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: text,
            model_id: ELEVENLABS_CONFIG.model,
            voice_settings: ELEVENLABS_CONFIG.voiceSettings
          })
        });
        
        if (!response.ok) {
          throw new Error(`ElevenLabs API error: ${response.status}`);
        }
        
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.volume = 0.8;
        
        return new Promise((resolve, reject) => {
          audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
            resolve();
          };
          audio.onerror = reject;
          audio.play();
        });
      } catch (e) {
        console.error('ElevenLabs generateAndPlay error:', e);
        return null;
      }
    },
    
    /**
     * Pre-generate all voice lines and download as files
     * Run this once to create audio files for your server
     */
    generateAllLines: async function() {
      console.log('🎤 Starting bulk voice generation...');
      const results = [];
      
      for (const [charKey, voiceConfig] of Object.entries(ELEVENLABS_CONFIG.voices)) {
        if (!voiceConfig.voiceId) {
          console.warn(`Skipping ${charKey} - no voice ID configured`);
          continue;
        }
        
        console.log(`Generating lines for ${charKey}...`);
        
        // Find all lines for this character
        for (const [catKey, lines] of Object.entries(VOICE_LINES)) {
          let linesToGenerate = null;
          
          if (typeof lines === 'object' && lines[charKey]) {
            linesToGenerate = lines[charKey];
          } else if (catKey === charKey && typeof lines === 'object') {
            for (const [subCat, subLines] of Object.entries(lines)) {
              if (Array.isArray(subLines)) {
                for (let i = 0; i < subLines.length; i++) {
                  results.push({
                    character: charKey,
                    category: subCat,
                    index: i,
                    text: subLines[i],
                    voiceId: voiceConfig.voiceId
                  });
                }
              }
            }
            continue;
          }
          
          if (Array.isArray(linesToGenerate)) {
            for (let i = 0; i < linesToGenerate.length; i++) {
              results.push({
                character: charKey,
                category: catKey,
                index: i,
                text: linesToGenerate[i],
                voiceId: voiceConfig.voiceId
              });
            }
          }
        }
      }
      
      console.log(`Found ${results.length} lines to generate`);
      console.log('Line manifest:', results);
      
      // Return manifest - actual generation would need to happen on server
      // or in small batches due to API rate limits
      return results;
    },
    
    /**
     * Test a specific voice
     */
    testVoice: async function(voiceId, testText = "Howdy partner! Let's go huntin'!") {
      console.log(`Testing voice ${voiceId}...`);
      return this.generateAndPlay(voiceId, testText);
    },
    
    /**
     * Simply play a character's voice (for characters with single audio file)
     * @param {string} character - Character key (e.g., 'tractorGood', 'demon')
     */
    playVoice: function(character) {
      const voiceConfig = ELEVENLABS_CONFIG.voices[character];
      if (voiceConfig && voiceConfig.audioFile) {
        return this.playAudioFile(voiceConfig.audioFile, voiceConfig.name);
      }
      console.warn(`No single audio file for ${character}, use playLine() instead`);
      return null;
    }
  };
  
  // ========================================
  // GAME INTEGRATION HOOKS
  // ========================================
  
  // Hook into game events if game is available
  function setupGameHooks() {
    // Called when bird is killed
    window.onBirdKilled = function(birdType, hunterName) {
      // 30% chance to play pastor commentary
      if (Math.random() < 0.3) {
        ElevenLabsVoice.playLine('pastor', 'birdKill');
      }
      // 50% chance for hunter to say something
      else if (Math.random() < 0.5 && hunterName) {
        ElevenLabsVoice.playLine(hunterName.toLowerCase(), 'hunterShoot');
      }
    };
    
    // Called when player is hit
    window.onPlayerHit = function(hunterName, damageSource) {
      if (hunterName && Math.random() < 0.4) {
        ElevenLabsVoice.playLine(hunterName.toLowerCase(), 'hunterHit');
      }
      if (Math.random() < 0.2) {
        ElevenLabsVoice.playLine('pastor', 'playerHit');
      }
    };
    
    // Called when demon spawns - USES EXISTING AUDIO!
    window.onDemonSpawn = function() {
      // Play existing demon screech!
      ElevenLabsVoice.playVoice('demon');
      
      if (Math.random() < 0.5) {
        ElevenLabsVoice.playLine('pastor', 'demonSpawn');
      }
    };
    
    // Called when tractor appears - USES EXISTING AUDIO!
    window.onTractorSpawn = function(isGood) {
      if (isGood) {
        // Play existing good tractor driver voice!
        ElevenLabsVoice.playVoice('tractorGood');
      } else {
        // Play existing bad tractor driver voice!
        ElevenLabsVoice.playVoice('tractorBad');
      }
    };
    
    // Called when level completes
    window.onLevelComplete = function() {
      ElevenLabsVoice.playLine('pastor', 'levelComplete');
    };
  }
  
  // Initialize when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupGameHooks);
  } else {
    setupGameHooks();
  }
  
  console.log('🎤 ElevenLabs Voice System loaded');
  console.log('📝 Configure voice IDs in ELEVENLABS_CONFIG.voices');
  console.log('🔊 Use ElevenLabsVoice.playLine(character, category) to play voices');
  console.log('🧪 Use ElevenLabsVoice.testVoice(voiceId) to test a voice');
  
})();
