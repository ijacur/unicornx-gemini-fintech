// brawl_engine_core.mjs
// Core logic module for Brawl Stars / Roblox / Yandex Games hybrid arena

export const BRAWLER_PRESETS = {
  colt: {
    id: 'colt',
    name: 'Colt Blaster',
    title: 'Dual Laser Ranger',
    role: 'Sharpshooter',
    hp: 3600,
    damage: 380,
    speed: 3.2,
    range: 14,
    reloadSpeed: 1.4,
    superName: 'Bullet Storm',
    superDesc: 'Fires a massive 12-round destructive piercing laser barrage that shreds obstacles.'
  },
  shelly: {
    id: 'shelly',
    name: 'Shelly Shotgun',
    title: 'Buckshot Specialist',
    role: 'Damage Dealer',
    hp: 4400,
    damage: 420,
    speed: 3.0,
    range: 9,
    reloadSpeed: 1.5,
    superName: 'Super Shell',
    superDesc: 'Blasts a devastating cone of heavy buckshot that knocks enemies back and tears down walls.'
  },
  el_primo: {
    id: 'el_primo',
    name: 'El Primo Titan',
    title: 'Heavyweight Luchador',
    role: 'Tank & Brawler',
    hp: 6200,
    damage: 460,
    speed: 3.4,
    range: 4.5,
    reloadSpeed: 1.1,
    superName: 'Flying Meteor Slam',
    superDesc: 'Leaps high into the sky and crashes down on target area, causing huge AoE shockwave damage.'
  },
  leon: {
    id: 'leon',
    name: 'Leon Cyber Ninja',
    title: 'Stealth Shinobi',
    role: 'Assassin',
    hp: 3800,
    damage: 520,
    speed: 3.5,
    range: 11,
    reloadSpeed: 1.6,
    superName: 'Smoke Bomb',
    superDesc: 'Drops a smoke bomb to become invisible for 6 seconds with +30% movement speed.'
  }
};

export function calculateUpgradeStats(brawlerId, level = 1) {
  const base = BRAWLER_PRESETS[brawlerId] || BRAWLER_PRESETS.colt;
  const multiplier = 1 + 0.08 * (Math.max(1, Math.min(10, level)) - 1);
  return {
    ...base,
    level,
    hp: Math.round(base.hp * multiplier),
    damage: Math.round(base.damage * multiplier)
  };
}

export function simulateMegaBoxOpen() {
  const coins = 80 + Math.floor(Math.random() * 150);
  const powerPoints = 15 + Math.floor(Math.random() * 45);
  const gems = Math.random() > 0.4 ? 3 + Math.floor(Math.random() * 8) : 0;
  
  const items = [
    { type: 'coins', amount: coins, name: 'Gold Coins', icon: 'coin' },
    { type: 'powerPoints', amount: powerPoints, name: 'Power Points', icon: 'zap' }
  ];

  if (gems > 0) {
    items.push({ type: 'gems', amount: gems, name: 'Emerald Gems', icon: 'gem' });
  }

  // Bonus token doubler or brawler card
  if (Math.random() > 0.6) {
    items.push({ type: 'tokenDoubler', amount: 200, name: '200x Token Doubler', icon: 'award' });
  }

  return {
    coins,
    powerPoints,
    gems,
    items
  };
}

export class BrawlEngine {
  constructor() {
    this.ammo = 3;
    this.maxAmmo = 3;
    this.superCharge = 0; // 0 to 100
    this.countdownActive = false;
    this.countdownLeadingTeam = null;
    this.countdownRemaining = 15.0;
  }

  consumeAmmo() {
    if (this.ammo >= 1) {
      this.ammo -= 1;
      return true;
    }
    return false;
  }

  reload(deltaSeconds = 0.016, reloadTime = 1.4) {
    if (this.ammo < this.maxAmmo) {
      this.ammo = Math.min(this.maxAmmo, this.ammo + deltaSeconds / reloadTime);
    }
  }

  addSuperDamage(damageDealt, damageRequired = 4000) {
    const chargeInc = (damageDealt / damageRequired) * 100;
    this.superCharge = Math.min(100, Math.max(0, this.superCharge + chargeInc));
  }

  isSuperReady() {
    return this.superCharge >= 100;
  }

  useSuper() {
    if (this.isSuperReady()) {
      this.superCharge = 0;
      return true;
    }
    return false;
  }

  updateGems(teams = { blue: 0, red: 0 }) {
    const blueCount = teams.blue || 0;
    const redCount = teams.red || 0;

    if (blueCount >= 10 && blueCount > redCount) {
      this.countdownActive = true;
      this.countdownLeadingTeam = 'blue';
    } else if (redCount >= 10 && redCount > blueCount) {
      this.countdownActive = true;
      this.countdownLeadingTeam = 'red';
    } else {
      this.countdownActive = false;
      this.countdownLeadingTeam = null;
      this.countdownRemaining = 15.0;
    }
  }
}
