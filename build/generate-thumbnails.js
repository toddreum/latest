#!/usr/bin/env node
/**
 * BIRDTURDS v43 - FIX38 Hunter Portrait Thumbnail Generator
 * 
 * Generates clean PNG thumbnails with 1px white outline for each hunter.
 * Run at build time to avoid runtime canvas processing and CORS issues.
 * 
 * USAGE:
 *   npm install sharp
 *   Edit HUNTERS array below to match your spritesheet data
 *   node build/generate-thumbnails.js
 * 
 * OUTPUT:
 *   /sprites/characters/{hunterId}_thumb.png for each hunter
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// ============================================================
// CONFIGURATION - Edit these to match your sprites
// ============================================================

const HUNTERS = [
  { id: 'buck', spritesheet: 'buck_idle.png', frameWidth: 64, frameHeight: 128, frameIndex: 0 },
  { id: 'daisy', spritesheet: 'daisy_idle.png', frameWidth: 64, frameHeight: 128, frameIndex: 0 },
  { id: 'bubba', spritesheet: 'bubba_idle.png', frameWidth: 64, frameHeight: 128, frameIndex: 0 },
  { id: 'clyde', spritesheet: 'clyde_idle.png', frameWidth: 64, frameHeight: 128, frameIndex: 0 },
  { id: 'sierra', spritesheet: 'sierra_idle.png', frameWidth: 64, frameHeight: 128, frameIndex: 0 },
  { id: 'gunner', spritesheet: 'gunner_idle.png', frameWidth: 64, frameHeight: 128, frameIndex: 0 },
  { id: 'jolene', spritesheet: 'jolene_idle.png', frameWidth: 64, frameHeight: 128, frameIndex: 0 },
  { id: 'tammy', spritesheet: 'tammy_idle.png', frameWidth: 64, frameHeight: 128, frameIndex: 0 },
];

// Paths (relative to this script)
const SPRITES_DIR = path.join(__dirname, '..', 'sprites', 'characters');
const OUTPUT_DIR = path.join(__dirname, '..', 'sprites', 'characters');

// Settings
const OUTLINE_COLOR = { r: 255, g: 255, b: 255 }; // White
const OUTLINE_WIDTH = 2;
const OUTPUT_SIZE = 96;

// ============================================================
// FUNCTIONS
// ============================================================

/**
 * Extract a frame from a spritesheet
 */
async function extractFrame(spritesheetPath, frameWidth, frameHeight, frameIndex) {
  const metadata = await sharp(spritesheetPath).metadata();
  
  // Calculate frame position
  const framesPerRow = Math.floor(metadata.width / frameWidth);
  const row = Math.floor(frameIndex / framesPerRow);
  const col = frameIndex % framesPerRow;
  
  const left = col * frameWidth;
  const top = row * frameHeight;
  
  // Handle case where frame dimensions match image
  const extractWidth = Math.min(frameWidth, metadata.width - left);
  const extractHeight = Math.min(frameHeight, metadata.height - top);
  
  return sharp(spritesheetPath)
    .extract({ left, top, width: extractWidth, height: extractHeight })
    .toBuffer();
}

/**
 * Add white outline by expanding alpha mask
 */
async function addOutline(imageBuffer, outlineWidth = 2) {
  const image = sharp(imageBuffer);
  const metadata = await image.metadata();
  const { width, height } = metadata;
  
  // Get raw pixel data
  const { data } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  
  // Create larger canvas for outline
  const newWidth = width + (outlineWidth * 2);
  const newHeight = height + (outlineWidth * 2);
  const outlineData = Buffer.alloc(newWidth * newHeight * 4);
  
  // Direction offsets for outline
  const offsets = [];
  for (let dy = -outlineWidth; dy <= outlineWidth; dy++) {
    for (let dx = -outlineWidth; dx <= outlineWidth; dx++) {
      if (dx !== 0 || dy !== 0) {
        offsets.push([dx, dy]);
      }
    }
  }
  
  // Create silhouette expanded by outlineWidth
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4;
      const alpha = data[srcIdx + 3];
      
      if (alpha > 128) {
        // Paint white outline in all directions
        for (const [dx, dy] of offsets) {
          const outX = x + outlineWidth + dx;
          const outY = y + outlineWidth + dy;
          
          if (outX >= 0 && outX < newWidth && outY >= 0 && outY < newHeight) {
            const outIdx = (outY * newWidth + outX) * 4;
            outlineData[outIdx] = OUTLINE_COLOR.r;
            outlineData[outIdx + 1] = OUTLINE_COLOR.g;
            outlineData[outIdx + 2] = OUTLINE_COLOR.b;
            outlineData[outIdx + 3] = 255;
          }
        }
      }
    }
  }
  
  // Create outline image
  const outlineImage = await sharp(outlineData, {
    raw: { width: newWidth, height: newHeight, channels: 4 }
  }).png().toBuffer();
  
  // Composite original on top
  return sharp(outlineImage)
    .composite([{
      input: imageBuffer,
      left: outlineWidth,
      top: outlineWidth
    }])
    .png()
    .toBuffer();
}

/**
 * Generate thumbnail for one hunter
 */
async function generateThumbnail(hunter) {
  const spritesheetPath = path.join(SPRITES_DIR, hunter.spritesheet);
  
  if (!fs.existsSync(spritesheetPath)) {
    console.warn(`⚠️  Spritesheet not found: ${spritesheetPath}`);
    return false;
  }
  
  try {
    console.log(`Processing ${hunter.id}...`);
    
    // Extract frame
    const frameBuffer = await extractFrame(
      spritesheetPath,
      hunter.frameWidth,
      hunter.frameHeight,
      hunter.frameIndex
    );
    
    // Add outline
    const outlinedBuffer = await addOutline(frameBuffer, OUTLINE_WIDTH);
    
    // Resize to output size
    const finalBuffer = await sharp(outlinedBuffer)
      .resize(OUTPUT_SIZE, OUTPUT_SIZE, { 
        fit: 'contain', 
        background: { r: 0, g: 0, b: 0, alpha: 0 } 
      })
      .png()
      .toBuffer();
    
    // Save
    const outputPath = path.join(OUTPUT_DIR, `${hunter.id}_thumb.png`);
    await sharp(finalBuffer).toFile(outputPath);
    
    console.log(`✅ Created ${outputPath}`);
    return true;
    
  } catch (err) {
    console.error(`❌ Error processing ${hunter.id}:`, err.message);
    return false;
  }
}

/**
 * Main
 */
async function main() {
  console.log('═'.repeat(60));
  console.log('BIRDTURDS v43 - FIX38 Hunter Portrait Thumbnail Generator');
  console.log('═'.repeat(60));
  console.log('');
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  let success = 0;
  let failed = 0;
  
  for (const hunter of HUNTERS) {
    const result = await generateThumbnail(hunter);
    if (result) success++;
    else failed++;
  }
  
  console.log('');
  console.log('═'.repeat(60));
  console.log(`Complete: ${success} thumbnails created, ${failed} failed`);
  console.log('═'.repeat(60));
  
  if (failed > 0) {
    console.log('');
    console.log('Note: Edit HUNTERS array in this script to match your sprite data.');
    console.log('Required: npm install sharp');
  }
}

main().catch(console.error);
