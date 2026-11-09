// test_brawl_engine_v2.test.mjs
// Automated test suite for 1GB Game Engine (Showdown Poison, Boss Fight, Gadgets, 6 Brawlers, Brawl Pass)

import assert from 'node:assert';
import {
  BRAWLER_PRESETS_EXTENDED,
  BrawlEngine1GB,
  calculateUpgradeStats1GB,
  calculatePoisonDamage,
  calculateBossPhase,
  BRAWL_PASS_TIERS
} from './brawl_engine_core_v2.mjs';

console.log('Running 1GB Game Engine TDD Test Suite...');

// Test 1: 6 Brawlers Presets
const brawlerKeys = Object.keys(BRAWLER_PRESETS_EXTENDED);
assert.strictEqual(brawlerKeys.length >= 6, true, 'Must have at least 6 playable brawlers');
assert.strictEqual(brawlerKeys.includes('colt'), true);
assert.strictEqual(brawlerKeys.includes('shelly'), true);
assert.strictEqual(brawlerKeys.includes('el_primo'), true);
assert.strictEqual(brawlerKeys.includes('leon'), true);
assert.strictEqual(brawlerKeys.includes('crow'), true);
assert.strictEqual(brawlerKeys.includes('spike'), true);
console.log('✓ Test 1: 6 Extended Brawlers verified.');

// Test 2: Gadget Mechanics
const colt = BRAWLER_PRESETS_EXTENDED.colt;
assert.strictEqual(colt.gadgetName, 'Speed Reload');
assert.strictEqual(colt.gadgetCharges, 3);

const engine = new BrawlEngine1GB();
assert.strictEqual(engine.gadgetCharges, 3);
const gadgetUsed = engine.useGadget('colt');
assert.strictEqual(gadgetUsed, true);
assert.strictEqual(engine.gadgetCharges, 2);
assert.strictEqual(engine.ammo, 3, 'Colt gadget should instantly fill ammo to 3');
console.log('✓ Test 2: Gadget activation verified.');

// Test 3: Showdown Poison Gas Circle calculation
// Arena radius starts at 22, shrinks to 5
const safePos = { x: 0, z: 0 };
const outsidePos = { x: 18, z: 12 }; // dist = sqrt(18^2 + 12^2) = sqrt(468) ~= 21.63
const gasRadius = 15; // Safe radius is 15

const safeDmg = calculatePoisonDamage(safePos, gasRadius, 400);
const poisonDmg = calculatePoisonDamage(outsidePos, gasRadius, 400);

assert.strictEqual(safeDmg, 0, 'Inside safe circle should take 0 poison damage');
assert.strictEqual(poisonDmg > 0, true, 'Outside safe circle must take poison damage');
console.log('✓ Test 3: Showdown poison gas math verified.');

// Test 4: Mega Mecha Boss Fight Phases
const phase1 = calculateBossPhase(40000, 40000); // 100% HP
const phase2 = calculateBossPhase(22000, 40000); // 55% HP
const phase3 = calculateBossPhase(8000, 40000);  // 20% HP

assert.strictEqual(phase1.phase, 1);
assert.strictEqual(phase1.name, 'Gatling Volley');
assert.strictEqual(phase2.phase, 2);
assert.strictEqual(phase2.name, 'Rocket Barrage');
assert.strictEqual(phase3.phase, 3);
assert.strictEqual(phase3.name, 'Enraged Slam');
console.log('✓ Test 4: Mega Mecha Boss Phases verified.');

// Test 5: Brawl Pass Progression Tiers
assert.strictEqual(BRAWL_PASS_TIERS.length >= 10, true, 'Brawl Pass must have at least 10 tiers');
const tier1 = BRAWL_PASS_TIERS[0];
const tier10 = BRAWL_PASS_TIERS[9];
assert.strictEqual(tier1.tokensRequired < tier10.tokensRequired, true);
assert.strictEqual(typeof tier10.reward, 'string');
console.log('✓ Test 5: Brawl Pass Tiers verified.');

console.log('ALL 1GB GAME ENGINE TESTS PASSED!');
