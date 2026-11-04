/**
 * Unicorn Health Uzbekistan — Linear.app / Apple Pro Ambient Surface Engine
 * 60-30-10 Acid Palette: 60% Obsidian Void (#06080D), 30% Pure White (#FFFFFF), 10% Acid Cyan (#00F5D4)
 * Strict Rule: ZERO floating dot particles, ZERO emojis, 2% SVG Film Grain, Top Radial Spotlight.
 */

(function () {
  'use strict';

  // 1. Mount Ambient Film Grain & Atmospheric Spotlight Layer
  function initAtmosphere() {
    let existing = document.getElementById('pro-ambient-atmosphere');
    if (existing) existing.remove();

    const layer = document.createElement('div');
    layer.id = 'pro-ambient-atmosphere';
    layer.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:0;overflow:hidden;';

    // Top subtle radial spotlight with Acid Cyan hue
    const spotlight = document.createElement('div');
    spotlight.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:radial-gradient(ellipse 85% 55% at 50% -20%, rgba(0, 245, 212, 0.08), transparent 70%);';
    layer.appendChild(spotlight);

    // Architectural 64px grid with center radial mask
    const grid = document.createElement('div');
    grid.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background-size:64px 64px;background-image:linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);mask-image:radial-gradient(ellipse 70% 60% at 50% 35%, black 20%, transparent 80%);-webkit-mask-image:radial-gradient(ellipse 70% 60% at 50% 35%, black 20%, transparent 80%);';
    layer.appendChild(grid);

    // 2.5% Film Grain SVG Filter
    const svgGrain = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgGrain.setAttribute('style', 'position:fixed;top:0;left:0;width:100%;height:100%;opacity:0.025;pointer-events:none;z-index:9999;');
    svgGrain.innerHTML = `
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
    `;
    layer.appendChild(svgGrain);

    document.body.prepend(layer);
  }

  // 2. Specular Mouse Tracking on Bento Cards
  function initSpecularHighlights() {
    window.addEventListener('mousemove', (e) => {
      const cards = document.querySelectorAll('.apple-card, .bento-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initAtmosphere();
      initSpecularHighlights();
    });
  } else {
    initAtmosphere();
    initSpecularHighlights();
  }
})();
