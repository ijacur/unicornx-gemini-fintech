// test_brawl_engine.test.mjs
// Automated test suite for Brawl Stars / Roblox / Yandex Games hybrid engine

import assert from 'node:assert';
import {
  BrawlEngine,
  calculateUpgradeStats,
  simulateMegaBoxOpen,
  BRAWLER_PRESETS
} from './brawl_engine_core.mjs';

console.log('Running Brawl Arena TDD Test Suite...');

// Test 1: Brawler Presets exist and have valid stats
assert.strictEqual(Object.keys(BRAWLER_PRESETS).length >= 4, true, 'Must have at least 4 playable brawlers');
assert.strictEqual(BRAWLER_PRESETS.colt.hp, 3600);
assert.strictEqual(BRAWLER_PRESETS.shelly.hp, 4400);
assert.strictEqual(BRAWLER_PRESETS.el_primo.hp, 6200);
assert.strictEqual(BRAWLER_PRESETS.leon.hp, 3800);
console.log('✓ Test 1: Brawler Presets verified.');

// Test 2: Upgrade scaling formula (Level 1 to 10)
const coltLvl1 = calculateUpgradeStats('colt', 1);
const coltLvl5 = calculateUpgradeStats('colt', 5);
const coltLvl10 = calculateUpgradeStats('colt', 10);
assert.strictEqual(coltLvl1.hp, 3600);
assert.strictEqual(coltLvl5.hp, Math.round(3600 * (1 + 0.08 * 4))); // 4752
assert.strictEqual(coltLvl10.hp, Math.round(3600 * (1 + 0.08 * 9))); // 6192
assert.strictEqual(coltLvl10.damage > coltLvl1.damage, true);
console.log('✓ Test 2: Upgrade scaling verified.');

// Test 3: BrawlEngine Ammo & Super charging
const engine = new BrawlEngine();
assert.strictEqual(engine.ammo, 3);
assert.strictEqual(engine.superCharge, 0);

// Fire weapon
const fired = engine.consumeAmmo();
assert.strictEqual(fired, true);
assert.strictEqual(engine.ammo, 2);

// Add damage to charge super
engine.addSuperDamage(2000, 4000); // 2000 dmg against 4000 needed for full super = 50%
assert.strictEqual(engine.superCharge, 50);

engine.addSuperDamage(3000, 4000); // Should cap at 100%
assert.strictEqual(engine.superCharge, 100);
assert.strictEqual(engine.isSuperReady(), true);

// Test 4: Gem Grab countdown
assert.strictEqual(engine.countdownActive, false);
engine.updateGems({ blue: 9, red: 4 });
assert.strictEqual(engine.countdownActive, false);

engine.updateGems({ blue: 10, red: 4 });
assert.strictEqual(engine.countdownActive, true);
assert.strictEqual(engine.countdownLeadingTeam, 'blue');

// Drop gems below 10 -> cancel countdown
engine.updateGems({ blue: 8, red: 4 });
assert.strictEqual(engine.countdownActive, false);
assert.strictEqual(engine.countdownLeadingTeam, null);
console.log('✓ Test 3 & 4: Ammo, Super, and Gem Countdown verified.');

// Test 5: Mega Box Chest Unboxing Rewards
const loot = simulateMegaBoxOpen();
assert.strictEqual(Array.isArray(loot.items), true);
assert.strictEqual(loot.items.length >= 3, true);
assert.strictEqual(loot.coins >= 80, true);
assert.strictEqual(loot.powerPoints >= 15, true);
console.log('✓ Test 5: Mega Box Chest rewards verified.');

console.log('ALL BRAWL ENGINE TESTS PASSED!');
