// brawl_engine_core_v2.mjs
// Core 1GB Game Engine Module: 6 Brawlers, Gadgets, Showdown Poison, Boss Fight, Brawl Pass

export const BRAWLER_PRESETS_EXTENDED = {
  colt: {
    id: 'colt',
    name: 'Colt Blaster',
    role: 'Sharpshooter',
    hp: 3600,
    damage: 380,
    bulletsPerShot: 6,
    bulletSpread: 0.08,
    bulletSpeed: 28,
    range: 16,
    speed: 5.6,
    reloadTime: 1.35,
    color: 0x3b82f6,
    superName: 'Bullet Storm',
    superDesc: '12-Round Destructive Laser Barrage',
    gadgetName: 'Speed Reload',
    gadgetDesc: 'Instantly reloads 3 ammo slots',
    gadgetCharges: 3
  },
  shelly: {
    id: 'shelly',
    name: 'Shelly Shotgun',
    role: 'Damage Dealer',
    hp: 4400,
    damage: 420,
    bulletsPerShot: 5,
    bulletSpread: 0.28,
    bulletSpeed: 24,
    range: 11,
    speed: 5.3,
    reloadTime: 1.45,
    color: 0xa855f7,
    superName: 'Super Shell',
    superDesc: 'Massive Knockback Wall-Breaker Blast',
    gadgetName: 'Fast Forward',
    gadgetDesc: 'Dashes 6 units forward at high speed',
    gadgetCharges: 3
  },
  el_primo: {
    id: 'el_primo',
    name: 'El Primo Titan',
    role: 'Heavyweight Tank',
    hp: 6200,
    damage: 460,
    bulletsPerShot: 4,
    bulletSpread: 0.12,
    bulletSpeed: 20,
    range: 6.5,
    speed: 5.8,
    reloadTime: 1.1,
    color: 0xef4444,
    superName: 'Flying Meteor Slam',
    superDesc: 'Flying Meteor Slam with Shockwave',
    gadgetName: 'Suplex Throw',
    gadgetDesc: 'Hurls nearest enemy backwards',
    gadgetCharges: 3
  },
  leon: {
    id: 'leon',
    name: 'Leon Shinobi',
    role: 'Stealth Assassin',
    hp: 3800,
    damage: 520,
    bulletsPerShot: 4,
    bulletSpread: 0.15,
    bulletSpeed: 27,
    range: 13,
    speed: 6.2,
    reloadTime: 1.5,
    color: 0x10b981,
    superName: 'Smoke Bomb',
    superDesc: '6s Invisibility & +30% Speed Boost',
    gadgetName: 'Clone Projector',
    gadgetDesc: 'Creates a decoy holographic clone',
    gadgetCharges: 3
  },
  crow: {
    id: 'crow',
    name: 'Crow Cyber Dagger',
    role: 'Toxic Assassin',
    hp: 3400,
    damage: 410,
    bulletsPerShot: 3,
    bulletSpread: 0.22,
    bulletSpeed: 30,
    range: 14,
    speed: 6.3,
    reloadTime: 1.25,
    color: 0xf59e0b,
    superName: 'Swoop & Poison Cloud',
    superDesc: 'Takes flight, throwing 14 poison daggers on launch and landing',
    gadgetName: 'Defense Shield',
    gadgetDesc: 'Grants 50% damage reduction for 4s',
    gadgetCharges: 3
  },
  spike: {
    id: 'spike',
    name: 'Spike Cactus Lord',
    role: 'Sharpshooter & Controller',
    hp: 3400,
    damage: 540,
    bulletsPerShot: 6,
    bulletSpread: 0.35,
    bulletSpeed: 23,
    range: 12,
    speed: 5.3,
    reloadTime: 1.6,
    color: 0x22c55e,
    superName: 'Stick Around Thorn Field',
    superDesc: 'Creates an AoE thorny field slowing enemies by 50% and damaging over time',
    gadgetName: 'Popping Pincushion',
    gadgetDesc: 'Fires 3 waves of needles in 360 degrees',
    gadgetCharges: 3
  }
};

export function calculateUpgradeStats1GB(brawlerId, level = 1) {
  const base = BRAWLER_PRESETS_EXTENDED[brawlerId] || BRAWLER_PRESETS_EXTENDED.colt;
  const multiplier = 1 + 0.08 * (Math.max(1, Math.min(10, level)) - 1);
  return {
    ...base,
    level,
    hp: Math.round(base.hp * multiplier),
    damage: Math.round(base.damage * multiplier)
  };
}

export function calculatePoisonDamage(pos, safeRadius, baseDamagePerSecond = 400, deltaSeconds = 1.0) {
  const dist = Math.hypot(pos.x, pos.z);
  if (dist > safeRadius) {
    const excess = dist - safeRadius;
    return Math.round(baseDamagePerSecond * deltaSeconds * (1 + excess * 0.05));
  }
  return 0;
}

export function calculateBossPhase(currentHp, maxHp = 40000) {
  const ratio = currentHp / maxHp;
  if (ratio > 0.6) {
    return { phase: 1, name: 'Gatling Volley', color: '#3b82f6', attackInterval: 2.2 };
  } else if (ratio > 0.3) {
    return { phase: 2, name: 'Rocket Barrage', color: '#f59e0b', attackInterval: 1.8 };
  } else {
    return { phase: 3, name: 'Enraged Slam', color: '#ef4444', attackInterval: 1.2 };
  }
}

export const BRAWL_PASS_TIERS = [
  { tier: 1, tokensRequired: 100, reward: '100 Gold Coins' },
  { tier: 2, tokensRequired: 250, reward: 'Big Box' },
  { tier: 3, tokensRequired: 450, reward: '50 Power Points' },
  { tier: 4, tokensRequired: 700, reward: '15 Emerald Gems' },
  { tier: 5, tokensRequired: 1000, reward: 'Mega Box' },
  { tier: 6, tokensRequired: 1350, reward: '250 Gold Coins' },
  { tier: 7, tokensRequired: 1750, reward: 'Big Box' },
  { tier: 8, tokensRequired: 2200, reward: '100 Power Points' },
  { tier: 9, tokensRequired: 2700, reward: '30 Emerald Gems' },
  { tier: 10, tokensRequired: 3300, reward: 'Omega Box & Cyber Skin' }
];

export class BrawlEngine1GB {
  constructor() {
    this.ammo = 0; // Starts empty or 3
    this.maxAmmo = 3;
    this.ammo = 3;
    this.superCharge = 0;
    this.gadgetCharges = 3;
    this.safeRadius = 24.0;
  }

  useGadget(brawlerId) {
    if (this.gadgetCharges > 0) {
      this.gadgetCharges -= 1;
      if (brawlerId === 'colt') {
        this.ammo = this.maxAmmo;
      }
      return true;
    }
    return false;
  }
}
