import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// Resolve paths
const workspaceRoot = process.cwd();
const sourceNecklacesDir = path.join(workspaceRoot, 'jewellery photoshoot ai gen', 'necklaces and earrings');
const sourceBanglesDir = path.join(workspaceRoot, 'jewellery photoshoot ai gen', 'bangles');
const sourceEarringsDir = path.join(workspaceRoot, 'jewellery photoshoot ai gen', 'earrings');
const sourceChainsDir = path.join(workspaceRoot, 'jewellery photoshoot ai gen', 'chains');
const sourceRingsDir = path.join(workspaceRoot, 'jewellery photoshoot ai gen', 'Rings');
const sourceMangalsutraDir = path.join(workspaceRoot, 'jewellery photoshoot ai gen', 'Mangal sutra');
const sourcePendantsDir = path.join(workspaceRoot, 'jewellery photoshoot ai gen', 'pendants');
const sourceNathDir = path.join(workspaceRoot, 'jewellery photoshoot ai gen', 'garwhali Nath');

const targetNecklacesDir = path.join(workspaceRoot, 'public', 'catalog', 'necklaces-earrings');
const targetBanglesDir = path.join(workspaceRoot, 'public', 'catalog', 'bangles');
const targetEarringsDir = path.join(workspaceRoot, 'public', 'catalog', 'earrings');
const targetChainsDir = path.join(workspaceRoot, 'public', 'catalog', 'chains');
const targetRingsDir = path.join(workspaceRoot, 'public', 'catalog', 'rings');
const targetMangalsutraDir = path.join(workspaceRoot, 'public', 'catalog', 'mangalsutra');
const targetPendantsDir = path.join(workspaceRoot, 'public', 'catalog', 'pendants');
const targetNathDir = path.join(workspaceRoot, 'public', 'catalog', 'nath');

// Make sure target directories exist and are clean of old files
const allTargetDirs = [targetNecklacesDir, targetBanglesDir, targetEarringsDir, targetChainsDir, targetRingsDir, targetMangalsutraDir, targetPendantsDir, targetNathDir];
allTargetDirs.forEach(dir => {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
});

console.log('Reading photoshoot files...');
const necklaceEarringFilesRaw = fs.readdirSync(sourceNecklacesDir).filter(f => f.endsWith('.webp'));
const bangleFilesRaw = fs.readdirSync(sourceBanglesDir).filter(f => f.endsWith('.webp'));
const earringFilesRaw = fs.readdirSync(sourceEarringsDir).filter(f => f.endsWith('.webp'));
const chainFilesRaw = fs.readdirSync(sourceChainsDir).filter(f => f.endsWith('.webp'));
const ringFilesRaw = fs.readdirSync(sourceRingsDir).filter(f => f.endsWith('.webp'));
const mangalsutraFilesRaw = fs.readdirSync(sourceMangalsutraDir).filter(f => f.endsWith('.webp'));
const pendantFilesRaw = fs.readdirSync(sourcePendantsDir).filter(f => f.endsWith('.webp'));
const nathFilesRaw = fs.readdirSync(sourceNathDir).filter(f => f.endsWith('.webp'));

// De-duplication logic using SHA-256 hashes
const seenHashes = new Set<string>();
let skippedCount = 0;

function getFileHash(filePath: string): string {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

function filterDuplicates(files: string[], sourceDir: string): string[] {
  return files.filter(file => {
    const fullPath = path.join(sourceDir, file);
    try {
      const hash = getFileHash(fullPath);
      if (seenHashes.has(hash)) {
        skippedCount++;
        return false;
      }
      seenHashes.add(hash);
      return true;
    } catch (e) {
      console.error(`Error hashing file ${file}:`, e);
      return true;
    }
  });
}

const necklaceEarringFiles = filterDuplicates(necklaceEarringFilesRaw, sourceNecklacesDir);
const bangleFiles = filterDuplicates(bangleFilesRaw, sourceBanglesDir);
const earringFiles = filterDuplicates(earringFilesRaw, sourceEarringsDir);
const chainFiles = filterDuplicates(chainFilesRaw, sourceChainsDir);
const ringFiles = filterDuplicates(ringFilesRaw, sourceRingsDir);
const mangalsutraFiles = filterDuplicates(mangalsutraFilesRaw, sourceMangalsutraDir);
const pendantFiles = filterDuplicates(pendantFilesRaw, sourcePendantsDir);
const nathFiles = filterDuplicates(nathFilesRaw, sourceNathDir);

console.log(`De-duplication completed:
- Found and skipped ${skippedCount} duplicate image listings.
- Active items remaining:
  - Necklaces: ${necklaceEarringFiles.length} (out of ${necklaceEarringFilesRaw.length})
  - Bangles/Bracelets: ${bangleFiles.length} (out of ${bangleFilesRaw.length})
  - Earrings: ${earringFiles.length} (out of ${earringFilesRaw.length})
  - Chains: ${chainFiles.length} (out of ${chainFilesRaw.length})
  - Rings: ${ringFiles.length} (out of ${ringFilesRaw.length})
  - Mangalsutra: ${mangalsutraFiles.length} (out of ${mangalsutraFilesRaw.length})
  - Pendants: ${pendantFiles.length} (out of ${pendantFilesRaw.length})
  - Nath: ${nathFiles.length} (out of ${nathFilesRaw.length})`);

// Copy files to target directories
const copyPairs: [string[], string, string][] = [
  [necklaceEarringFiles, sourceNecklacesDir, targetNecklacesDir],
  [bangleFiles, sourceBanglesDir, targetBanglesDir],
  [earringFiles, sourceEarringsDir, targetEarringsDir],
  [chainFiles, sourceChainsDir, targetChainsDir],
  [ringFiles, sourceRingsDir, targetRingsDir],
  [mangalsutraFiles, sourceMangalsutraDir, targetMangalsutraDir],
  [pendantFiles, sourcePendantsDir, targetPendantsDir],
  [nathFiles, sourceNathDir, targetNathDir],
];
copyPairs.forEach(([files, srcDir, tgtDir]) => {
  files.forEach(file => {
    fs.copyFileSync(path.join(srcDir, file), path.join(tgtDir, file));
  });
});

console.log('Successfully copied all unique images to project public directory.');

// Metadata generation arrays (All Gold terminologies)
const goldNecklaceNames = [
  "Rajputana Royal Gold Choker Set", "Navratna Heritage Gold Necklace Set", "Swarna Floral Gold Choker Set",
  "Mughal Pearl Gold Haar Set", "Devi Antique Gold Choker Set", "Mayur Temple Gold Choker Set",
  "Vedic Emerald Gold Necklace Set", "Aura Gold Filigree Choker Set", "Aishwarya Guttapusalu Gold Haar Set",
  "Gulabi Meenakari Gold Necklace Set", "Jaipur Royal Gold Bridal Set", "Kalyana Antique Gold Choker Set",
  "Chandra Lekha Gold Pearl Choker Set", "Antique Gold Peacock Choker Set", "Vaikuntha Gold Temple Set",
  "Swarna Blossom Gold Choker Set", "Padmavati Royal Gold Bridal Haar Set", "Anarkali Ruby Gold Choker Set",
  "Vasundhara Gold Necklace Set", "Gulabi Blossom Gold Choker Set", "Imperial Gold Collar Set",
  "Maharani Emerald Gold Mala Set", "Deccan Royalty Gold & Pearl Choker Set", "Kashmiri Gold Filigree Haar Set"
];

const goldEarringNames = [
  "Mughal Blossom Gold Jhumkas", "Imperial Pearl Chandbalis", "Meenakari Lotus Gold Jhumkas",
  "Royal Gold Drop Earrings", "Mayur Temple Jhumkas", "Vedic Ruby Gold Chandbalis", 
  "Nizam Pearl Gold Earrings", "Padma Lotus Gold Jhumkas", "Swarna Blossom Gold Studs", 
  "Rajputana Antique Gold Jhumkas", "Kalyana Antique Gold Earrings", "Gulabi Meenakari Chandbalis", 
  "Elysian Emerald Gold Drops", "Anarkali Ruby Gold Jhumkas", "Devi Temple Gold Drop Earrings", 
  "Gold Jhumka Drops", "Nizam Filigree Chandbalis"
];

const goldBangleNames = [
  "Elysian Filigree Gold Kada", "Ganga-Jamuni Gold Kada", "Royal Peacock Gold Bangle",
  "Imperial Ruby Gold Kada Set", "Gold Eternity Bangles", "Traditional Gold Temple Kada",
  "Golden Grace Filigree Bangle", "Vedic Gold Floral Kada", "Mayur Gold Bangles",
  "Maharani Classic Gold Kada Set", "Swarna Blossom Gold Bangles", "Nizam Pearl Gold Kada Set",
  "Padmavati Royal Gold Kada", "Anarkali Ruby Gold Bangles", "Vasundhara Gold Kada",
  "Chandra Pearl Gold Bangles", "Devi Temple Gold Kada", "Aura Gold Eternity Bangle",
  "Kalyana Antique Gold Kada Set", "Gulabi Meenakari Gold Bangles"
];

const goldChainNames = [
  "Royal Heritage Gold Chain", "Swarna Link Gold Chain", "Mughal Blossom Gold Chain",
  "Vedic Temple Gold Chain", "Aura Golden Rope Chain", "Nizam Gold Curb Chain",
  "Imperial Gold Box Chain", "Chandra Lekha Gold Bead Chain", "Devi Antique Gold Chain",
  "Kalyana Classic Gold Chain"
];

const goldRingNames = [
  "Navratna Heritage Gold Ring", "Swarna Blossom Gold Band", "Mughal Filigree Gold Ring",
  "Imperial Ruby Gold Ring", "Maharani Emerald Gold Ring", "Vedic Temple Gold Ring",
  "Royal Peacock Gold Ring", "Chandra Gold Dome Ring", "Padmavati Gold Signet Ring",
  "Aura Gold Eternity Band", "Nizam Pearl Gold Ring", "Kalyana Antique Gold Ring",
  "Devi Temple Gold Ring", "Anarkali Gold Cocktail Ring", "Rajputana Gold Statement Ring",
  "Gulabi Meenakari Gold Ring", "Vasundhara Gold Band", "Classic Gold Solitaire Ring",
  "Swarna Heritage Gold Stackable Ring", "Golden Grace Filigree Ring"
];

const goldMangalsutraNames = [
  "Shakti Gold Mangalsutra", "Divya Heritage Gold Mangalsutra", "Vedic Gold Mangalsutra",
  "Swarna Classic Gold Mangalsutra", "Padmavati Gold Mangalsutra", "Aura Gold Mangalsutra",
  "Royal Heritage Gold Mangalsutra", "Chandra Gold Mangalsutra", "Nizam Filigree Gold Mangalsutra",
  "Kalyana Temple Gold Mangalsutra", "Devi Antique Gold Mangalsutra", "Mughal Pearl Gold Mangalsutra"
];

const goldPendantNames = [
  "Swarna Lotus Gold Pendant", "Vedic Temple Gold Pendant", "Mughal Blossom Gold Pendant",
  "Royal Peacock Gold Pendant", "Chandra Gold Moon Pendant", "Padmavati Gold Heart Pendant",
  "Aura Gold Drop Pendant", "Nizam Filigree Gold Pendant", "Imperial Ruby Gold Pendant",
  "Devi Antique Gold Pendant", "Kalyana Gold Om Pendant", "Maharani Emerald Gold Pendant"
];

const goldNathNames = [
  "Garhwali Heritage Gold Nath", "Rajputana Bridal Gold Nath", "Swarna Filigree Gold Nath",
  "Mughal Pearl Gold Nath", "Vedic Temple Gold Nath", "Imperial Gold Nath",
  "Padmavati Royal Gold Nath", "Chandra Gold Nath", "Devi Antique Gold Nath",
  "Kalyana Classic Gold Nath", "Nizam Gold Bridal Nath", "Aura Gold Drop Nath"
];

const gemstonePool = ["simulated South-sea Pearl", "synthetic Burmese Ruby", "synthetic Zambian Emerald", "simulated Basra Pearl", "synthetic Kashmiri Sapphire", "simulated Navratna Gems"];

// We want exactly 9 featured items from the new ones (spread across different categories)
let featuredCount = 0;

const generatedItems: any[] = [];

// Helper to get a random item from array
function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 1. Process necklaces and earrings sets (69 items) -> category: 'Necklaces', metal: 'Gold'
necklaceEarringFiles.forEach((file, index) => {
  const category = 'Necklaces';
  const metal = 'Gold';
  const purity = getRandom(["22K Gold (916 Hallmark)", "22K Yellow Gold (916)", "18K Hallmark Gold"]);
  
  const nameBase = goldNecklaceNames[index % goldNecklaceNames.length];
  const name = `${nameBase}`;
  const suffixIndex = Math.floor(index / goldNecklaceNames.length);
  const finalName = suffixIndex > 0 ? `${name} ${String.fromCharCode(64 + suffixIndex)}` : name;

  const gemstone = getRandom(gemstonePool);
  const description = `A magnificent bespoke ${finalName} handcrafted in ${purity}. This premium gold necklace is beautifully paired with matching designer gold earrings, accented with ${gemstone} beads and delicate filigree carvings.`;

  // Weights
  const weight = `${(35 + (index % 8) * 6.5).toFixed(1)} grams`;

  // Estimates
  const priceEstimate = `₹${(190 + (index % 6) * 35).toLocaleString('en-IN')},000 - ₹${(210 + (index % 6) * 35).toLocaleString('en-IN')},000`;

  // Determine if featured
  let isFeatured = false;
  if (featuredCount < 3 && index > 0 && index % 15 === 0) {
    isFeatured = true;
    featuredCount++;
  }

  generatedItems.push({
    id: `sj-nke-${index + 1}`,
    name: finalName,
    category,
    sku: `SJ-NEC-${String(index + 1).padStart(3, '0')}`,
    description,
    image: `/jewellery-showcase-website/catalog/necklaces-earrings/${file}`,
    metal,
    purity,
    weight,
    isFeatured,
    isNewArrival: index < 8,
    isTrending: index % 7 === 3,
    priceEstimate
  });
});

// 2. Process bangles (41 items -> bracelets) -> category: 'Bracelets', metal: 'Gold'
bangleFiles.forEach((file, index) => {
  const category = 'Bracelets';
  const metal = 'Gold';
  const purity = getRandom(["22K Gold (916 Hallmark)", "22K Yellow Gold (916)", "18K Hallmark Gold"]);
  
  const nameBase = goldBangleNames[index % goldBangleNames.length];
  const name = `${nameBase}`;
  const suffixIndex = Math.floor(index / goldBangleNames.length);
  const finalName = suffixIndex > 0 ? `${name} ${String.fromCharCode(64 + suffixIndex)}` : name;

  const gemstone = getRandom(gemstonePool);
  const description = `A grand luxury ${finalName} in ${purity}, featuring hand-detailed gold floral carvings, beautiful ${gemstone} settings, and custom comfort edges. Fits perfectly with formal wedding wear.`;

  // Weights
  const weight = `${(22 + (index % 5) * 4.5).toFixed(1)} grams`;

  // Estimates
  const priceEstimate = `₹${(160 + (index % 4) * 25).toLocaleString('en-IN')},000 - ₹${(180 + (index % 4) * 25).toLocaleString('en-IN')},000`;

  // Determine if featured
  let isFeatured = false;
  if (featuredCount < 5 && index > 0 && index % 5 === 0) {
    isFeatured = true;
    featuredCount++;
  }

  generatedItems.push({
    id: `sj-bgl-${index + 1}`,
    name: finalName,
    category,
    sku: `SJ-BGL-${String(index + 1).padStart(3, '0')}`,
    description,
    image: `/jewellery-showcase-website/catalog/bangles/${file}`,
    metal,
    purity,
    weight,
    isFeatured,
    isNewArrival: index < 4,
    isTrending: index % 5 === 2,
    priceEstimate
  });
});

// 3. Process standalone earrings (14 items) -> category: 'Earrings', metal: 'Gold'
earringFiles.forEach((file, index) => {
  const category = 'Earrings';
  const metal = 'Gold';
  const purity = getRandom(["22K Gold (916 Hallmark)", "22K Yellow Gold (916)", "18K Hallmark Gold"]);
  
  const nameBase = goldEarringNames[index % goldEarringNames.length];
  const name = `${nameBase}`;
  const suffixIndex = Math.floor(index / goldEarringNames.length);
  const finalName = suffixIndex > 0 ? `${name} ${String.fromCharCode(64 + suffixIndex)}` : name;

  const gemstone = getRandom(gemstonePool);
  const description = `A stunning pair of gold earrings: ${finalName} in ${purity}, featuring hand-detailed filigree carvings, beautiful ${gemstone} drops, and comfortable traditional screw backing.`;

  // Weights
  const weight = `${(12 + (index % 4) * 3.5).toFixed(1)} grams`;

  // Estimates
  const priceEstimate = `₹${(80 + (index % 3) * 20).toLocaleString('en-IN')},000 - ₹${(95 + (index % 3) * 20).toLocaleString('en-IN')},000`;

  // Determine if featured
  let isFeatured = false;
  if (featuredCount < 7 && index > 0 && index % 4 === 0) {
    isFeatured = true;
    featuredCount++;
  }

  generatedItems.push({
    id: `sj-ear-${index + 1}`,
    name: finalName,
    category,
    sku: `SJ-EAR-${String(index + 1).padStart(3, '0')}`,
    description,
    image: `/jewellery-showcase-website/catalog/earrings/${file}`,
    metal,
    purity,
    weight,
    isFeatured,
    isNewArrival: index < 3,
    isTrending: index % 4 === 1,
    priceEstimate
  });
});

// 4. Process chains (25 items) -> category: 'Chains', metal: 'Gold'
chainFiles.forEach((file, index) => {
  const category = 'Chains';
  const metal = 'Gold';
  const purity = getRandom(["22K Gold (916 Hallmark)", "22K Yellow Gold (916)", "18K Hallmark Gold"]);
  
  const nameBase = goldChainNames[index % goldChainNames.length];
  const name = `${nameBase}`;
  const suffixIndex = Math.floor(index / goldChainNames.length);
  const finalName = suffixIndex > 0 ? `${name} ${String.fromCharCode(64 + suffixIndex)}` : name;

  const gemstone = getRandom(gemstonePool);
  const description = `An elegant gold chain: ${finalName} in ${purity}, displaying standard flexibility and polished link architecture. Ideal for layering or highlighting premium gold charms.`;

  // Weights
  const weight = `${(15 + (index % 6) * 4.2).toFixed(1)} grams`;

  // Estimates
  const priceEstimate = `₹${(110 + (index % 4) * 22).toLocaleString('en-IN')},000 - ₹${(125 + (index % 4) * 22).toLocaleString('en-IN')},000`;

  // Determine if featured
  let isFeatured = false;
  if (featuredCount < 9 && index > 0 && index % 6 === 0) {
    isFeatured = true;
    featuredCount++;
  }

  generatedItems.push({
    id: `sj-chn-${index + 1}`,
    name: finalName,
    category,
    sku: `SJ-CHN-${String(index + 1).padStart(3, '0')}`,
    description,
    image: `/jewellery-showcase-website/catalog/chains/${file}`,
    metal,
    purity,
    weight,
    isFeatured,
    isNewArrival: index < 4,
    isTrending: index % 5 === 1,
    priceEstimate
  });
});

// 5. Process rings (70 items) -> category: 'Rings', metal: 'Gold'
ringFiles.forEach((file, index) => {
  const category = 'Rings';
  const metal = 'Gold';
  const purity = getRandom(["22K Gold (916 Hallmark)", "22K Yellow Gold (916)", "18K Hallmark Gold"]);
  
  const nameBase = goldRingNames[index % goldRingNames.length];
  const name = `${nameBase}`;
  const suffixIndex = Math.floor(index / goldRingNames.length);
  const finalName = suffixIndex > 0 ? `${name} ${String.fromCharCode(64 + suffixIndex)}` : name;

  const gemstone = getRandom(gemstonePool);
  const description = `An exquisite gold ring: ${finalName} in ${purity}, featuring intricate hand-crafted detailing, ${gemstone} accents, and a comfortable custom fit. Perfect for weddings and special occasions.`;

  const weight = `${(4 + (index % 6) * 1.8).toFixed(1)} grams`;
  const priceEstimate = `\u20b9${(25 + (index % 5) * 12).toLocaleString('en-IN')},000 - \u20b9${(35 + (index % 5) * 12).toLocaleString('en-IN')},000`;

  let isFeatured = false;
  if (featuredCount < 12 && index > 0 && index % 15 === 0) {
    isFeatured = true;
    featuredCount++;
  }

  generatedItems.push({
    id: `sj-rng-${index + 1}`,
    name: finalName,
    category,
    sku: `SJ-RNG-${String(index + 1).padStart(3, '0')}`,
    description,
    image: `/jewellery-showcase-website/catalog/rings/${file}`,
    metal,
    purity,
    weight,
    isFeatured,
    isNewArrival: index < 6,
    isTrending: index % 7 === 2,
    priceEstimate
  });
});

// 6. Process mangalsutra (24 items) -> category: 'Mangalsutra', metal: 'Gold'
mangalsutraFiles.forEach((file, index) => {
  const category = 'Mangalsutra';
  const metal = 'Gold';
  const purity = getRandom(["22K Gold (916 Hallmark)", "22K Yellow Gold (916)", "18K Hallmark Gold"]);
  
  const nameBase = goldMangalsutraNames[index % goldMangalsutraNames.length];
  const name = `${nameBase}`;
  const suffixIndex = Math.floor(index / goldMangalsutraNames.length);
  const finalName = suffixIndex > 0 ? `${name} ${String.fromCharCode(64 + suffixIndex)}` : name;

  const gemstone = getRandom(gemstonePool);
  const description = `A sacred and elegant ${finalName} in ${purity}, featuring traditional black bead strands with ${gemstone} accents and handcrafted gold pendant. A timeless symbol of marital blessing.`;

  const weight = `${(18 + (index % 5) * 3.5).toFixed(1)} grams`;
  const priceEstimate = `\u20b9${(120 + (index % 4) * 20).toLocaleString('en-IN')},000 - \u20b9${(140 + (index % 4) * 20).toLocaleString('en-IN')},000`;

  let isFeatured = false;
  if (featuredCount < 14 && index > 0 && index % 8 === 0) {
    isFeatured = true;
    featuredCount++;
  }

  generatedItems.push({
    id: `sj-mgs-${index + 1}`,
    name: finalName,
    category,
    sku: `SJ-MGS-${String(index + 1).padStart(3, '0')}`,
    description,
    image: `/jewellery-showcase-website/catalog/mangalsutra/${file}`,
    metal,
    purity,
    weight,
    isFeatured,
    isNewArrival: index < 4,
    isTrending: index % 5 === 1,
    priceEstimate
  });
});

// 7. Process pendants (15 items) -> category: 'Pendants', metal: 'Gold'
pendantFiles.forEach((file, index) => {
  const category = 'Pendants';
  const metal = 'Gold';
  const purity = getRandom(["22K Gold (916 Hallmark)", "22K Yellow Gold (916)", "18K Hallmark Gold"]);
  
  const nameBase = goldPendantNames[index % goldPendantNames.length];
  const name = `${nameBase}`;
  const suffixIndex = Math.floor(index / goldPendantNames.length);
  const finalName = suffixIndex > 0 ? `${name} ${String.fromCharCode(64 + suffixIndex)}` : name;

  const gemstone = getRandom(gemstonePool);
  const description = `A beautifully crafted ${finalName} in ${purity}, featuring delicate ${gemstone} detailing and premium gold finishing. Ideal for daily wear or gifting.`;

  const weight = `${(5 + (index % 4) * 2.5).toFixed(1)} grams`;
  const priceEstimate = `\u20b9${(30 + (index % 4) * 10).toLocaleString('en-IN')},000 - \u20b9${(40 + (index % 4) * 10).toLocaleString('en-IN')},000`;

  generatedItems.push({
    id: `sj-pnd-${index + 1}`,
    name: finalName,
    category,
    sku: `SJ-PND-${String(index + 1).padStart(3, '0')}`,
    description,
    image: `/jewellery-showcase-website/catalog/pendants/${file}`,
    metal,
    purity,
    weight,
    isFeatured: false,
    isNewArrival: index < 3,
    isTrending: index % 4 === 0,
    priceEstimate
  });
});

// 8. Process nath (16 items) -> category: 'Nath', metal: 'Gold'
nathFiles.forEach((file, index) => {
  const category = 'Nath';
  const metal = 'Gold';
  const purity = getRandom(["22K Gold (916 Hallmark)", "22K Yellow Gold (916)", "18K Hallmark Gold"]);
  
  const nameBase = goldNathNames[index % goldNathNames.length];
  const name = `${nameBase}`;
  const suffixIndex = Math.floor(index / goldNathNames.length);
  const finalName = suffixIndex > 0 ? `${name} ${String.fromCharCode(64 + suffixIndex)}` : name;

  const gemstone = getRandom(gemstonePool);
  const description = `A stunning traditional ${finalName} in ${purity}, featuring classic Garhwali craftsmanship with ${gemstone} drops and intricate gold filigree work. An essential bridal ornament.`;

  const weight = `${(8 + (index % 4) * 2.0).toFixed(1)} grams`;
  const priceEstimate = `\u20b9${(55 + (index % 4) * 15).toLocaleString('en-IN')},000 - \u20b9${(70 + (index % 4) * 15).toLocaleString('en-IN')},000`;

  generatedItems.push({
    id: `sj-nth-${index + 1}`,
    name: finalName,
    category,
    sku: `SJ-NTH-${String(index + 1).padStart(3, '0')}`,
    description,
    image: `/jewellery-showcase-website/catalog/nath/${file}`,
    metal,
    purity,
    weight,
    isFeatured: false,
    isNewArrival: index < 3,
    isTrending: index % 5 === 2,
    priceEstimate
  });
});

console.log(`Generated ${generatedItems.length} products. Featured items: ${featuredCount}`);

// Only keep the generated items (no originalCatalog)
const fullCatalog = generatedItems;

const fileContent = `import { JewelleryItem, MetalRate } from './types';

export const CATALOG: JewelleryItem[] = ${JSON.stringify(fullCatalog, null, 2)};

export const METAL_RATES: MetalRate[] = [
  {
    metal: 'Gold (24 Karat)',
    purity: '99.9% Pure',
    ratePerGram: 7250,
    change: '+₹45',
    isUp: true
  },
  {
    metal: 'Gold (22 Karat)',
    purity: '91.6% Pure (Standard)',
    ratePerGram: 6646,
    change: '+₹41',
    isUp: true
  },
  {
    metal: 'Gold (18 Karat)',
    purity: '75.0% Pure',
    ratePerGram: 5438,
    change: '-₹18',
    isUp: false
  },
  {
    metal: 'Silver',
    purity: '99.0% Sterling',
    ratePerGram: 88,
    change: '+₹0.80',
    isUp: true
  }
];

export const DEALER_INFO = {
  name: 'Shyam Jewellers',
  headline: 'Legacy of Trust, Purity & Exquisite Artistry',
  tagline: 'Crafting royal moments in gold & silver',
  address: 'Shastri Nagar, Roorkee',
  whatsappNumber: '+918630659061',
  whatsappDirectLink: 'https://wa.me/918630659061',
  phone: '01332-272424',
  timing: '10:30 AM - 8:30 PM (Closed on Tuesdays)',
  hallmarkInfo: '100% BIS Hallmarked Pure Gold & Sterling Silver Jewellery.'
};
`;

fs.writeFileSync(path.join(workspaceRoot, 'src', 'data.ts'), fileContent);
console.log('Successfully wrote combined catalog to src/data.ts!');
