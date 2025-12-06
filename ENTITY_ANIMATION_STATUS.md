# BIRDTURDS v41 - ENTITY ANIMATION STATUS
## Complete List of All Sprites and Their Animation Status

---

## ✅ FULLY ANIMATED (Sprite Sheets)

### Hunters (8 characters - all have full sprite sheets)
| Character | Actions Available |
|-----------|------------------|
| **Buck** | idle, walk, run, shoot, jump, hurt |
| **Daisy** | idle, walk, run, shoot, jump, hurt |
| **Bubba** | idle, walk, run, shoot, jump, hurt |
| **Clyde** | idle, walk, run, shoot, jump, hurt |
| **Gunner** | idle, walk, run, shoot, jump, hurt |
| **Jolene** | idle, walk, run, shoot, jump, hurt |
| **Sierra** | idle, walk, run, shoot, jump, hurt |
| **Tammy** | idle, walk, run, shoot, jump, hurt |

### Trump & Allies
| Character | Actions Available |
|-----------|------------------|
| **Trump** | walk, run, hurt |
| **Bodyguard** | walk, shoot |
| **Angel** | fly, protect |
| **American Eagle** | fly |

### Enemies
| Enemy | Actions Available |
|-------|------------------|
| **Demon** | fly, attack, hit, flee |
| **Globalist 1** | walk, throw, arrested |
| **Globalist 2** | walk, throw, arrested |
| **Globalist 3** | walk, throw, arrested |
| **Globalist 4** | walk, throw, arrested |

### Bot Hunters (4 characters)
| Bot | Files Found |
|-----|------------|
| **Bot 1** | strip, strip_left |
| **Bot 2** | strip, strip_left |
| **Bot 3** | strip, strip_left |
| **Bot 4** | strip, strip_left |

---

## 🎬 CODE-ANIMATED (Static sprites with code animations)

### Birds (40 species - all animated via code)
All birds use **scale oscillation** for wing flapping and **rotation wobble** for natural flight.

**Shootable Birds:**
- Duck, Mallard, Goose, Canada Goose, Chicken, Pigeon
- Turkey, Wild Turkey, Seagull, Magpie, Crow, Raven
- Vulture, Owl, Pheasant, Quail, Grouse, Partridge
- Dove, Woodcock, Snipe, Teal, Pintail, Woodduck

**Helper Birds (Don't Shoot!):**
- Bald Eagle, Golden Eagle, Hawk, Falcon, Osprey

**Protected Birds:**
- Parrot, Peacock, Pelican, Stork, Flamingo
- Heron, Crane, Swan, Dodo, Toucan, Penguin, Bat

**Boss Birds:**
- Pterodactyl, Phoenix, Dragon, Thunderbird

### Vehicles (current animations)
| Vehicle | Current Animation | Enhancement Added |
|---------|------------------|-------------------|
| **Plane** | Rotation wobble | ✅ Spinning propeller overlay |
| **Helicopter** | Y-axis bob | ✅ Spinning rotor overlay |
| **Tractor (Good)** | None | ✅ Bounce + exhaust smoke |
| **Tractor (Bad)** | None | ✅ Bounce + exhaust smoke |
| **Dirtbike** | None | ✅ Dust trail particles |

---

## ⚠️ STATIC SPRITES (Now enhanced with code animations)

### Ground Animals (10 types)
| Animal | Sprite | NEW Animation Added |
|--------|--------|---------------------|
| **Deer** | deer.png | ✅ Walk cycle (leg squish + bob) |
| **Elk** | elk.png | ✅ Walk cycle (heavier gait) |
| **Bear** | bear.png | ✅ Lumbering walk |
| **Cougar** | cougar.png | ✅ Sleek stalking motion |
| **Wolf** | wolf.png | ✅ Trotting animation |
| **Dog** | dog.png | ✅ Happy walk bounce |
| **Cat** | cat.png | ✅ Slinky walk |
| **Rabbit** | rabbit.png | ✅ Hopping motion |
| **Fox** | fox.png | ✅ Trotting animation |
| **Skunk** | skunk.png | ✅ Waddle walk |

### NPCs (6 types)
| NPC | Sprite | NEW Animation Added |
|-----|--------|---------------------|
| **Hiker** | hiker.png | ✅ Walking sway |
| **Farmer** | farmer.png | ✅ Slow amble |
| **Jogger** | jogger.png | ✅ Running bounce |
| **Cyclist** | cyclist.png | ✅ Pedaling lean |
| **Child** | child.png | ✅ Skipping motion |
| **Fisherman** | fisherman.png | ✅ Slow shuffle |

### Phone Zombies & Awakened (8 types)
| Entity | Sprite | NEW Animation Added |
|--------|--------|---------------------|
| **Zombie Teen Boy** | zombie_teen_boy.png | ✅ Shamble/lurch |
| **Zombie Teen Girl** | zombie_teen_girl.png | ✅ Shamble/lurch |
| **Zombie Adult Man** | zombie_adult_man.png | ✅ Shamble/lurch |
| **Zombie Adult Woman** | zombie_adult_woman.png | ✅ Shamble/lurch |
| **Person Teen Boy** | person_teen_boy.png | ✅ Normal walk |
| **Person Teen Girl** | person_teen_girl.png | ✅ Normal walk |
| **Person Adult Man** | person_adult_man.png | ✅ Normal walk |
| **Person Adult Woman** | person_adult_woman.png | ✅ Normal walk |

---

## 📦 AVAILABLE SPRITE STRIPS (Not currently used!)

These animation strips exist in the package but aren't connected to gameplay yet:

### Farm Animals (potential additions)
| Animal | Files Available |
|--------|-----------------|
| Cow | cow_strip.png, cow_strip_right.png |
| Horse | horse_strip.png, horse_strip_right.png |
| Pig | pig_strip.png, pig_strip_right.png |
| Sheep | sheep_strip.png, sheep_strip_right.png |
| Goat | goat_strip.png, goat_strip_right.png |
| Rooster | rooster_strip.png, rooster_strip_right.png |

### Characters with strips
| Character | Files Available |
|-----------|-----------------|
| Farmer | farmer_strip.png, farmer_strip_right.png |
| Child | child_strip.png, child_strip_right.png |
| Sniper | sniper_strip.png, sniper_strip_right.png |
| Demon | demon_strip.png, demon_strip_left.png |

### Vehicles with strips
| Vehicle | Files Available |
|---------|-----------------|
| Tractor Good | tractor_good_strip.png, tractor_good_strip_left.png |
| Tractor Bad | tractor_bad_strip.png, tractor_bad_strip_left.png |

---

## 🎯 FIGHTER JET STATUS

**Current Implementation:** ✅ EXISTS IN CODE!
- Fighter jets are a variant of planes (40% of non-helicopter planes)
- Automatically spawn as part of normal plane spawning
- Tinted red to distinguish from regular planes
- Can shoot birds and drop bombs
- Player gets 30% of points when fighter kills birds

**To manually call fighter jet:**
Currently spawns automatically. Could add a powerup or command to summon one.

---

## 🚁 HELICOPTER ROTOR

**NEW:** Spinning rotor overlay added via code!
- Creates Graphics object positioned above helicopter
- 3-blade rotor spinning at ~4 rotations/second
- Perspective-flattened (elliptical) for realism
- Motion blur circle effect
- Automatically cleans up when helicopter destroyed

---

## 📝 RECOMMENDATIONS FOR NEW ANIMATIONS

### Priority 1 - High Impact
1. ✅ Helicopter rotor spin - DONE
2. ✅ Plane propeller spin - DONE  
3. ✅ Tractor wheel/bounce - DONE
4. ✅ Animal walk cycles - DONE
5. ✅ NPC walk animations - DONE

### Priority 2 - Would Be Nice
1. Use existing farm animal strips (cow, horse, pig, etc.)
2. Add more ground animals to levels
3. Fighter jet missile trails
4. Bomb explosion particle effects
5. Bird death spiral animations

### Priority 3 - Future Consideration
1. Weather effects (rain, wind)
2. Day/night cycle shadows
3. Water reflections on lake level
4. Dust clouds from running animals
5. Smoke from gunfire

---

## 🎨 FILES CREATED

1. **js/systems/sprite-animations.js** - Master animation system
   - HelicopterRotorSystem (spinning rotor overlay)
   - PlanePropellerSystem (spinning propeller)
   - TractorAnimationSystem (bounce + exhaust)
   - AnimalWalkSystem (leg squish + bob)
   - NPCWalkSystem (body sway)
   - ZombieShambleSystem (lurch animation)
   - DirtbikeAnimationSystem (dust particles)

2. **css/polished-game.css** - Professional styling
   - Toned-down Christmas accents
   - Polished game container frame
   - Enhanced HUD styling
   - Game over screen polish
   - Mobile responsive polish

3. **js/systems/game-over-fixes.js** - Audio bug fix (previous)
   - Stops all sounds on game over
   - Removes skull emoji
