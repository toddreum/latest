/*!
 * BirdTurds - Character Hover Voice Lines
 * v38.0 - Funny personality-driven lines for character selection
 * 
 * INSTALLATION:
 * Add these to the HUNTER_VOICES object in play.html (around line 876)
 * Add "hover" array to each character
 */

// ========== UPDATED HUNTER_VOICES WITH HOVER LINES ==========

const HUNTER_VOICES = {
  buck: {
    voiceId: 'pNInz6obpgDQGcFmaJgB', // Adam - Deep Southern Male
    hover: [
      "Well howdy there! You eyeballin' me?",
      "I've shot birds since I was knee-high to a grasshopper!",
      "My granddaddy says I got the gift!",
      "Pick me and I'll show ya how we do it in Texas!",
      "These birds don't stand a chance, partner!",
      "You want a winner? You're lookin' at him!",
      "I once shot a duck blindfolded... okay I was hungover but still!"
    ],
    pickMe: [
      "Howdy partner, pick me!",
      "I'm your huckleberry!",
      "Ready to bag some birds!",
      "Pick ol' Buck here!"
    ],
    selected: "Alright! Let's go huntin'!",
    kill: ["Got 'em!", "Yeehaw!", "That's how it's done!", "Another one bites the dust!"],
    hurt: ["Dagnabbit!", "Ow! That's gonna leave a mark!"],
    death: "Tell my horse... I loved her...",
    levelUp: "Now we're cookin' with grease!",
    bossKill: "That's what happens when you mess with Texas!"
  },
  
  daisy: {
    voiceId: 'EXAVITQu4vr4xnSDxMaL', // Bella - Sweet Southern Female  
    hover: [
      "Hey sugar, you checkin' me out?",
      "Don't let the bows fool ya - I'm deadly!",
      "I won three shooting championships, thank you very much!",
      "My shotgun's name is Dolly. After Parton, obviously.",
      "I do my nails AND reload in under 10 seconds!",
      "Pick me and I'll make you proud, darlin'!",
      "These birds are about to learn what girl power means!"
    ],
    pickMe: [
      "Hey y'all, pick me!",
      "Choose me sugar!",
      "I'm the best shot here!",
      "C'mon, pick Daisy!"
    ],
    selected: "Let's show 'em how it's done!",
    kill: ["Gotcha!", "Boom baby!", "Next!", "Sorry not sorry!"],
    hurt: ["Ouch! My hair!", "Hey watch it!"],
    death: "Tell mama I tried...",
    levelUp: "That's what I'm talkin' about!",
    bossKill: "Size don't matter when you got skills, honey!"
  },
  
  bubba: {
    voiceId: 'VR6AewLTigWG4xSOukaG', // Arnold - Deep Heavy Male
    hover: [
      "You want the big guns? You found 'em!",
      "I wrestled a gator once. We're friends now.",
      "My shotgun Bertha here weighs more than my ex-wife!",
      "I eat birds for breakfast! Well, chicken anyway...",
      "Been huntin' these swamps for thirty years, son!",
      "Pick me and we'll have us a REAL good time!",
      "I'm built different... mostly from biscuits and gravy!"
    ],
    pickMe: [
      "Well shoot, pick me!",
      "Bubba's ready to hunt!",
      "I got the big guns!",
      "Pick the Gator man!"
    ],
    selected: "Time to get 'er done!",
    kill: ["Ka-boom!", "Haha got 'em!", "That's what I'm talkin' about!", "SPLAT!"],
    hurt: ["Oof! That tickled!", "You're gonna pay for that!"],
    death: "Bertha... avenge me...",
    levelUp: "Now THAT'S what I call progress!",
    bossKill: "Bigger they are, harder they splat!"
  },
  
  clyde: {
    voiceId: 'TxGEqnHWrfWFTfGW9XjX', // Josh - Gruff Male
    hover: [
      "...",
      "I don't miss. Ever.",
      "Been tracking since before you were born, kid.",
      "The mountains taught me patience. And violence.",
      "One shot. One kill. That's the Clyde way.",
      "I've seen things in these woods... terrible things...",
      "You want the job done right? You want me."
    ],
    pickMe: [
      "Pick me. I never miss.",
      "Choose wisely. Choose Clyde.",
      "Mountains are calling...",
      "I'll get the job done."
    ],
    selected: "Let's move.",
    kill: ["Target down.", "Clean shot.", "Next.", "Efficient."],
    hurt: ["Grr...", "That all you got?"],
    death: "Finally... peace...",
    levelUp: "Adequate.",
    bossKill: "Even the mighty fall."
  },
  
  sierra: {
    voiceId: 'jsCqWAovK2LkecY7zXl4', // Freya - Spicy Latina Female
    hover: [
      "¡Hola guapo! You like what you see?",
      "Fastest hands in the West... and the best manicure!",
      "My family's been on this border seven generations!",
      "I can draw faster than you can blink, amigo!",
      "Pick me and we'll dance... the dance of BULLETS!",
      "These birds think they're fast? ¡Por favor!",
      "My abuela says I shoot better than my cooking... that's not a compliment!"
    ],
    pickMe: [
      "¡Vamos! Pick me!",
      "I'm the fastest draw!",
      "Choose Sierra!",
      "Let's dance amigo!"
    ],
    selected: "¡Perfecto! Let's go!",
    kill: ["¡Boom!", "Adios!", "Too easy!", "¡Otra más!"],
    hurt: ["¡Ay caramba!", "You're gonna regret that!"],
    death: "¡No puede ser!",
    levelUp: "¡Así se hace!",
    bossKill: "¡El jefe está muerto!"
  },
  
  gunner: {
    voiceId: 'onwK4e9ZLuTAKqWW03F9', // Daniel - Military Male
    hover: [
      "Sir! Sergeant Gunner Williams reporting for duty, sir!",
      "Three tours overseas. These birds are a vacation!",
      "I've got more medals than these birds have feathers!",
      "Suppressive fire is my middle name. Actually it's Marcus.",
      "Once cleared a whole compound with a spork. Long story.",
      "Pick me and I'll treat this like a military operation!",
      "These birds are about to experience SHOCK AND AWE!"
    ],
    pickMe: [
      "Lock and load, soldier!",
      "Choose Gunner!",
      "Ready for combat!",
      "Let's do this!"
    ],
    selected: "Mission accepted!",
    kill: ["Hostile down!", "Target eliminated!", "Oorah!", "Get some!"],
    hurt: ["Medic!", "Taking fire!", "Just a scratch!"],
    death: "Tell... my country... I served...",
    levelUp: "Objective complete! Moving to next!",
    bossKill: "High value target neutralized!"
  },
  
  jolene: {
    voiceId: 'XB0fDUnXU5powFXDhCwa', // Charlotte - Warm Female
    hover: [
      "This ranch has been in my family since 1847!",
      "Four kids, five thousand acres, and I still find time to hunt!",
      "You want someone who gets things done? That's me, honey.",
      "I run this ranch AND the PTA. Fear me.",
      "My great-great-grandma fought off bandits with this same rifle!",
      "Pick me and I'll protect this land like it's my own... 'cause it IS!",
      "Soccer mom by day, sharpshooter by... also day. I'm busy."
    ],
    pickMe: [
      "Pick me, partner!",
      "This is my land to protect!",
      "Choose Jolene!",
      "I've got what it takes!"
    ],
    selected: "Let's protect this land!",
    kill: ["Got one!", "For the ranch!", "Perfect!", "That's for my petunias!"],
    hurt: ["Ouch! Not the good arm!", "You'll pay for that!"],
    death: "The ranch... take care of it...",
    levelUp: "Just like harvest season - always delivering!",
    bossKill: "Nobody threatens MY land!"
  },
  
  tammy: {
    voiceId: 'Xb7hH8MSUJpSbSDYk0k2', // Alice - Soft Female
    hover: [
      "Shh... you'll scare the birds...",
      "I was an Olympic archery hopeful. Then I discovered guns.",
      "Silent but deadly... wait, that came out wrong.",
      "I believe in ethical hunting. And lots of it.",
      "They never hear me coming... neither will you.",
      "Pick me for precision. And really good vibes.",
      "I once snuck up on a deer... for a selfie. We're Instagram friends now."
    ],
    pickMe: [
      "Shh... pick me quietly.",
      "Choose the silent hunter.",
      "I never miss.",
      "Pick Tammy!"
    ],
    selected: "Let's do this... quietly.",
    kill: ["Silent kill.", "Clean.", "Gone.", "They never knew."],
    hurt: ["Ow...", "Okay now I'm mad..."],
    death: "So... close...",
    levelUp: "Moving like a ghost...",
    bossKill: "The bigger they are, the quieter I am."
  }
};

// ========== HOW TO USE IN play.html ==========
/*
1. Replace the existing HUNTER_VOICES object (around line 876) with this one

2. Add this hover sound function after playHunterVoice:

// Play random hover voice when mouse enters character card
async function playHoverVoice(characterId) {
  const hunter = HUNTER_VOICES[characterId];
  if (!hunter || !hunter.hover) return;
  
  // Don't spam - only play if not already playing
  if (currentVoiceAudio && !currentVoiceAudio.paused) return;
  
  // Random hover line
  const text = hunter.hover[Math.floor(Math.random() * hunter.hover.length)];
  
  // Use the voice proxy (secure)
  try {
    const response = await fetch('/api/voice-proxy.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ characterId, text })
    });
    
    if (response.ok) {
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      currentVoiceAudio = new Audio(audioUrl);
      currentVoiceAudio.volume = 0.8;
      currentVoiceAudio.play();
    }
  } catch (err) {
    // Fallback to Web Speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  }
}

3. Add mouseenter event to character cards:

// In the character card rendering (around line 1200-1300):
charCard.addEventListener('mouseenter', () => {
  playHoverVoice(char.id);
});

// Add a cooldown to prevent spam:
let lastHoverTime = 0;
charCard.addEventListener('mouseenter', () => {
  const now = Date.now();
  if (now - lastHoverTime > 2000) { // 2 second cooldown
    lastHoverTime = now;
    playHoverVoice(char.id);
  }
});
*/

// ========== EXPORT FOR MODULE USE ==========
export { HUNTER_VOICES };
