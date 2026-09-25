/**
 * Generator Ilustrasi Vektor SVG untuk Bangun Ruang Sisi Datar
 * Digunakan pada soal dan pembahasan game Lompat Katak.
 */
(function (root) {
  'use strict';

  const SVG_STYLE = `
    <defs>
      <linearGradient id="geom-grad-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="#d7f5a2" stop-opacity="0.85"/>
      </linearGradient>
      <linearGradient id="geom-grad-front" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#a4dc47" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#72aa1b" stop-opacity="0.95"/>
      </linearGradient>
      <linearGradient id="geom-grad-side" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#609712" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="#46730a" stop-opacity="0.95"/>
      </linearGradient>
      <linearGradient id="geom-grad-accent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffd54f" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="#ff9800" stop-opacity="0.9"/>
      </linearGradient>
      <filter id="geom-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#142802" flood-opacity="0.3"/>
      </filter>
    </defs>
  `;

  function wrapSvg(content, viewBox = '0 0 160 140') {
    return `<svg class="geom-svg" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">${SVG_STYLE}${content}</svg>`;
  }

  const illustrations = {
    // 1. Kubus 3D dengan rusuk s = 4 cm atau 5 cm
    'kubus-3d': () => wrapSvg(`
      <g filter="url(#geom-shadow)" stroke="#233a05" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
        <!-- Hidden dashed edges -->
        <line x1="35" y1="105" x2="35" y2="45" stroke="#48681e" stroke-width="1.8" stroke-dasharray="4 3" opacity="0.65"/>
        <line x1="35" y1="105" x2="65" y2="125" stroke="#48681e" stroke-width="1.8" stroke-dasharray="4 3" opacity="0.65"/>
        <line x1="35" y1="45" x2="65" y2="65" stroke="#48681e" stroke-width="1.8" stroke-dasharray="4 3" opacity="0.65"/>
        
        <!-- Faces -->
        <!-- Side face -->
        <polygon points="125,125 125,65 95,45 95,105" fill="url(#geom-grad-side)"/>
        <!-- Front face -->
        <polygon points="65,125 125,125 125,65 65,65" fill="url(#geom-grad-front)"/>
        <!-- Top face -->
        <polygon points="65,65 125,65 95,45 35,45" fill="url(#geom-grad-top)"/>
      </g>
      <!-- Label dimension -->
      <g font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#1b2e04">
        <text x="95" y="137" text-anchor="middle">s</text>
        <text x="133" y="100" text-anchor="start">s</text>
        <text x="50" y="52" text-anchor="end">s</text>
      </g>
    `),

    // 2. Jaring-jaring kubus (6 persegi)
    'jaring-kubus': () => wrapSvg(`
      <g stroke="#233a05" stroke-width="1.8" fill="url(#geom-grad-top)">
        <!-- 6 squares: top, left, center, right, bottom1, bottom2 -->
        <rect x="65" y="12" width="28" height="28" rx="2" fill="#ebffc6"/>
        <rect x="37" y="40" width="28" height="28" rx="2" fill="#d5fa91"/>
        <rect x="65" y="40" width="28" height="28" rx="2" fill="#b9f05a"/>
        <rect x="93" y="40" width="28" height="28" rx="2" fill="#d5fa91"/>
        <rect x="65" y="68" width="28" height="28" rx="2" fill="#a0e038"/>
        <rect x="65" y="96" width="28" height="28" rx="2" fill="#88cf20"/>
      </g>
      <text x="79" y="133" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#203408" text-anchor="middle">6 sisi persegi kongruen</text>
    `, '0 0 160 140'),

    // 3. Kubus dengan Diagonal Ruang d = s√3
    'kubus-diagonal': () => wrapSvg(`
      <g filter="url(#geom-shadow)" stroke="#233a05" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
        <!-- Hidden back edges -->
        <line x1="35" y1="105" x2="35" y2="45" stroke="#5d8227" stroke-width="1.5" stroke-dasharray="4 3"/>
        <line x1="35" y1="105" x2="65" y2="125" stroke="#5d8227" stroke-width="1.5" stroke-dasharray="4 3"/>
        <line x1="35" y1="45" x2="65" y2="65" stroke="#5d8227" stroke-width="1.5" stroke-dasharray="4 3"/>

        <!-- Semi-transparent faces -->
        <polygon points="125,125 125,65 95,45 95,105" fill="url(#geom-grad-side)" opacity="0.65"/>
        <polygon points="65,125 125,125 125,65 65,65" fill="url(#geom-grad-front)" opacity="0.65"/>
        <polygon points="65,65 125,65 95,45 35,45" fill="url(#geom-grad-top)" opacity="0.75"/>

        <!-- Diagonal Ruang -->
        <line x1="65" y1="125" x2="95" y2="45" stroke="#e62e05" stroke-width="3.2" stroke-linecap="round"/>
        <circle cx="65" cy="125" r="4" fill="#e62e05" stroke="#fff" stroke-width="1.5"/>
        <circle cx="95" cy="45" r="4" fill="#e62e05" stroke="#fff" stroke-width="1.5"/>
      </g>
      <!-- Label -->
      <g font-family="Arial, sans-serif" font-size="11" font-weight="bold">
        <text x="88" y="82" fill="#c41a00">d = s√3</text>
        <text x="95" y="137" fill="#1b2e04" text-anchor="middle">s = 6 cm</text>
      </g>
    `),

    // 4. Balok 3D Standar (p, l, t)
    'balok-3d': () => wrapSvg(`
      <g filter="url(#geom-shadow)" stroke="#233a05" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
        <!-- Hidden dashed edges -->
        <line x1="25" y1="110" x2="25" y2="55" stroke="#567923" stroke-width="1.6" stroke-dasharray="4 3"/>
        <line x1="25" y1="110" x2="55" y2="125" stroke="#567923" stroke-width="1.6" stroke-dasharray="4 3"/>
        <line x1="25" y1="55" x2="55" y2="70" stroke="#567923" stroke-width="1.6" stroke-dasharray="4 3"/>

        <!-- Faces -->
        <polygon points="135,125 135,70 105,55 105,110" fill="url(#geom-grad-side)"/>
        <polygon points="55,125 135,125 135,70 55,70" fill="url(#geom-grad-front)"/>
        <polygon points="55,70 135,70 105,55 25,55" fill="url(#geom-grad-top)"/>
      </g>
      <!-- Dimensions -->
      <g font-family="Arial, sans-serif" font-size="10.5" font-weight="bold" fill="#1b2e04">
        <text x="95" y="138" text-anchor="middle">panjang (p)</text>
        <text x="140" y="102" text-anchor="start">t</text>
        <text x="40" y="60" text-anchor="end">lebar (l)</text>
      </g>
    `),

    // 5. Balok dengan Diagonal Ruang (d = √(p² + l² + t²))
    'balok-diagonal': () => wrapSvg(`
      <g filter="url(#geom-shadow)" stroke="#233a05" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
        <!-- Hidden lines -->
        <line x1="25" y1="115" x2="25" y2="50" stroke="#567923" stroke-width="1.5" stroke-dasharray="4 3"/>
        <line x1="25" y1="115" x2="60" y2="128" stroke="#567923" stroke-width="1.5" stroke-dasharray="4 3"/>
        <line x1="25" y1="50" x2="60" y2="63" stroke="#567923" stroke-width="1.5" stroke-dasharray="4 3"/>

        <!-- Faces semi-transparent -->
        <polygon points="135,128 135,63 100,50 100,115" fill="url(#geom-grad-side)" opacity="0.6"/>
        <polygon points="60,128 135,128 135,63 60,63" fill="url(#geom-grad-front)" opacity="0.6"/>
        <polygon points="60,63 135,63 100,50 25,50" fill="url(#geom-grad-top)" opacity="0.7"/>

        <!-- Diagonal ruang merah -->
        <line x1="60" y1="128" x2="100" y2="50" stroke="#d82200" stroke-width="3" stroke-linecap="round"/>
        <circle cx="60" cy="128" r="3.5" fill="#d82200" stroke="#fff" stroke-width="1.5"/>
        <circle cx="100" cy="50" r="3.5" fill="#d82200" stroke="#fff" stroke-width="1.5"/>
      </g>
      <!-- Labels -->
      <g font-family="Arial, sans-serif" font-size="10" font-weight="bold">
        <text x="98" y="139" fill="#1b2e04" text-anchor="middle">p = 6</text>
        <text x="140" y="98" fill="#1b2e04">t = 24</text>
        <text x="38" y="55" fill="#1b2e04" text-anchor="end">l = 8</text>
        <text x="86" y="86" fill="#c01700">d = 26 cm</text>
      </g>
    `),

    // 6. Limas Segi Empat (Volume & Rusuk: alas + tinggi t)
    'limas-3d': () => wrapSvg(`
      <g filter="url(#geom-shadow)" stroke="#233a05" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
        <!-- Alas persegi perspektif -->
        <line x1="45" y1="100" x2="80" y2="85" stroke="#5c7e26" stroke-width="1.6" stroke-dasharray="4 3"/>
        <line x1="80" y1="85" x2="135" y2="92" stroke="#5c7e26" stroke-width="1.6" stroke-dasharray="4 3"/>
        <!-- Height line (tinggi limas t) -->
        <line x1="85" y1="20" x2="85" y2="102" stroke="#d82200" stroke-width="2" stroke-dasharray="3 3"/>
        <polygon points="85,102 85,96 91,96 91,102" fill="none" stroke="#d82200" stroke-width="1.2"/>

        <!-- Faces -->
        <polygon points="85,20 25,115 100,123" fill="url(#geom-grad-front)" opacity="0.85"/>
        <polygon points="85,20 100,123 135,92" fill="url(#geom-grad-side)" opacity="0.9"/>
      </g>
      <!-- Labels -->
      <g font-family="Arial, sans-serif" font-size="10.5" font-weight="bold">
        <text x="63" y="132" fill="#1b2e04" text-anchor="middle">sisi alas (s)</text>
        <text x="91" y="58" fill="#c41a00">tinggi (t)</text>
        <text x="85" y="15" fill="#1b2e04" text-anchor="middle">Puncak</text>
      </g>
    `),

    // 7. Limas Segi Empat dengan Apotema / Tinggi Sisi Tegak
    'limas-slant': () => wrapSvg(`
      <g filter="url(#geom-shadow)" stroke="#233a05" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
        <!-- Base and faces -->
        <polygon points="80,18 20,115 100,122" fill="url(#geom-grad-front)" opacity="0.85"/>
        <polygon points="80,18 100,122 140,94" fill="url(#geom-grad-side)" opacity="0.9"/>

        <!-- Slant height (tinggi sisi tegak / apotema pada segitiga depan) -->
        <line x1="80" y1="18" x2="60" y2="118.5" stroke="#ffd600" stroke-width="3" stroke-linecap="round"/>
        <circle cx="60" cy="118.5" r="3" fill="#ffd600" stroke="#233a05"/>
        <path d="M 57,105 L 67,106.5 L 70,119.5" fill="none" stroke="#ffffff" stroke-width="1.5"/>
      </g>
      <!-- Labels -->
      <g font-family="Arial, sans-serif" font-size="10" font-weight="bold">
        <text x="60" y="134" fill="#1b2e04" text-anchor="middle">s = 12 cm</text>
        <text x="77" y="65" fill="#8f5b00">t sisi tegak = 10 cm</text>
      </g>
    `),

    // 8. Prisma Segitiga Siku-siku
    'prisma-segitiga': () => wrapSvg(`
      <g filter="url(#geom-shadow)" stroke="#233a05" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
        <!-- Hidden base lines -->
        <line x1="30" y1="110" x2="30" y2="40" stroke="#5c7e26" stroke-width="1.6" stroke-dasharray="4 3"/>
        <line x1="30" y1="110" x2="75" y2="125" stroke="#5c7e26" stroke-width="1.6" stroke-dasharray="4 3"/>

        <!-- Front & side rectangular faces -->
        <polygon points="75,125 135,80 135,20 75,65" fill="url(#geom-grad-front)"/>
        <!-- Top triangle -->
        <polygon points="30,40 75,65 135,20" fill="url(#geom-grad-top)"/>
        <!-- Bottom triangle (visible edge) -->
        <line x1="75" y1="125" x2="135" y2="80" stroke="#233a05" stroke-width="2"/>
        <line x1="30" y1="110" x2="135" y2="80" stroke="#5c7e26" stroke-width="1.5" stroke-dasharray="4 3"/>

        <!-- Right angle mark at top triangle -->
        <polygon points="40,45 46,55 36,60" fill="none" stroke="#233a05" stroke-width="1.2"/>
      </g>
      <!-- Labels -->
      <g font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#1b2e04">
        <text x="50" y="63" text-anchor="end">9 cm</text>
        <text x="110" y="38" text-anchor="start">12 cm</text>
        <text x="115" y="112" text-anchor="start">panjang = 10 cm</text>
      </g>
    `),

    // 9. Prisma Trapesium
    'prisma-trapesium': () => wrapSvg(`
      <g filter="url(#geom-shadow)" stroke="#233a05" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
        <!-- Front trapezoid -->
        <polygon points="55,70 95,70 115,115 35,115" fill="url(#geom-grad-front)"/>
        <!-- Top face extrusion -->
        <polygon points="55,70 95,70 120,40 80,40" fill="url(#geom-grad-top)"/>
        <!-- Right slope face -->
        <polygon points="95,70 115,115 140,85 120,40" fill="url(#geom-grad-side)"/>
      </g>
      <!-- Dimensions -->
      <g font-family="Arial, sans-serif" font-size="9.5" font-weight="bold" fill="#1b2e04">
        <text x="75" y="64" text-anchor="middle">8 cm</text>
        <text x="75" y="128" text-anchor="middle">14 cm</text>
        <text x="135" y="60" text-anchor="start">t prisma = 10 cm</text>
      </g>
    `),

    // 10. Pemotongan Kubus menjadi 8 Kubus Kecil (2x2x2)
    'kubus-potong-8': () => wrapSvg(`
      <g filter="url(#geom-shadow)" stroke="#233a05" stroke-width="1.8" stroke-linejoin="round">
        <!-- Top face with grid 2x2 -->
        <polygon points="65,65 125,65 95,35 35,35" fill="url(#geom-grad-top)"/>
        <line x1="50" y1="50" x2="110" y2="50" stroke="#233a05" stroke-width="1.8"/>
        <line x1="95" y1="65" x2="65" y2="35" stroke="#233a05" stroke-width="1.8"/>

        <!-- Front face with grid 2x2 -->
        <polygon points="65,125 125,125 125,65 65,65" fill="url(#geom-grad-front)"/>
        <line x1="65" y1="95" x2="125" y2="95" stroke="#233a05" stroke-width="1.8"/>
        <line x1="95" y1="125" x2="95" y2="65" stroke="#233a05" stroke-width="1.8"/>

        <!-- Side face with grid 2x2 -->
        <polygon points="125,125 125,65 95,35 95,95" fill="url(#geom-grad-side)"/>
        <line x1="125" y1="95" x2="95" y2="65" stroke="#233a05" stroke-width="1.8"/>
        <line x1="110" y1="110" x2="110" y2="50" stroke="#233a05" stroke-width="1.8"/>
      </g>
      <text x="80" y="137" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#1b2e04" text-anchor="middle">8 kubus kecil (s = 6 cm)</text>
    `),

    'icon-kubus': () => wrapSvg(`
  <g stroke="#233a05" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" filter="url(#geom-shadow)">
    <polygon points="35,35 75,35 95,18 55,18" fill="url(#geom-grad-top)"/>
    <polygon points="35,35 75,35 75,75 35,75" fill="url(#geom-grad-front)"/>
    <polygon points="75,35 95,18 95,58 75,75" fill="url(#geom-grad-side)"/>
  </g>
`, '0 0 120 100'),

    'icon-balok': () => wrapSvg(`
  <g stroke="#233a05" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" filter="url(#geom-shadow)">
    <polygon points="15,45 85,45 100,30 30,30" fill="url(#geom-grad-top)"/>
    <polygon points="15,45 85,45 85,72 15,72" fill="url(#geom-grad-front)"/>
    <polygon points="85,45 100,30 100,57 85,72" fill="url(#geom-grad-side)"/>
  </g>
`, '0 0 120 100'),

    'icon-prisma': () => wrapSvg(`
  <g stroke="#233a05" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" filter="url(#geom-shadow)">
    <polygon points="25,30 70,80 92,66 47,16" fill="url(#geom-grad-top)"/>
    <polygon points="25,80 25,30 47,16 47,66" fill="url(#geom-grad-side)"/>
    <polygon points="25,80 25,30 70,80" fill="url(#geom-grad-front)"/>
  </g>
`, '0 0 120 100'),

    'icon-limas': () => wrapSvg(`
  <g stroke="#233a05" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" filter="url(#geom-shadow)">
    <polygon points="60,15 15,68 45,90" fill="url(#geom-grad-front)"/>
    <polygon points="60,15 45,90 95,60" fill="url(#geom-grad-side)"/>
  </g>
`, '0 0 120 100'),

    'icon-semua': () => wrapSvg(`
  <g stroke="#233a05" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" filter="url(#geom-shadow)">
    <!-- Mini Cube on left -->
    <polygon points="20,44 48,44 62,32 34,32" fill="url(#geom-grad-top)"/>
    <polygon points="20,44 48,44 48,72 20,72" fill="url(#geom-grad-front)"/>
    <polygon points="48,44 62,32 62,60 48,72" fill="url(#geom-grad-side)"/>
    <!-- Mini Pyramid on right -->
    <polygon points="90,24 64,68 84,82" fill="url(#geom-grad-accent)"/>
    <polygon points="90,24 84,82 108,62" fill="url(#geom-grad-side)"/>
  </g>
`, '0 0 120 100')
  };

  function getIllustration(id) {
    if (!id || !illustrations[id]) return '';
    try {
      return illustrations[id]();
    } catch (_) {
      return '';
    }
  }

  const api = { illustrations, getIllustration };
  root.FrogIllustrations = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
