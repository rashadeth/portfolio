import sharp from 'sharp'

const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0c0c0c"/>
  <rect width="1200" height="630" fill="url(#grad)" opacity="0.6"/>
  <defs>
    <radialGradient id="grad" cx="70%" cy="30%" r="60%">
      <stop offset="0%" style="stop-color:#7B3F00;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0c0c0c;stop-opacity:1" />
    </radialGradient>
  </defs>
  <text x="80" y="200" font-family="Georgia, serif" font-size="96"
    font-weight="300" fill="#e8e4dc" letter-spacing="-2">Ian Okpoko</text>
  <text x="80" y="300" font-family="Georgia, serif" font-size="40"
    font-weight="300" fill="#d4c9a8" font-style="italic">Designing and building digital products.</text>
  <text x="80" y="380" font-family="monospace" font-size="20"
    fill="#6b6860" letter-spacing="4">PRODUCT DESIGNER &amp; FRONTEND DEVELOPER</text>
  <text x="80" y="430" font-family="monospace" font-size="20"
    fill="#6b6860" letter-spacing="4">ABUJA, NIGERIA</text>
  <circle cx="1100" cy="530" r="6" fill="#7ec87e"/>
  <text x="1120" y="536" font-family="monospace" font-size="18"
    fill="#e8e4dc" letter-spacing="2">AVAILABLE</text>
  <text x="80" y="580" font-family="monospace" font-size="18"
    fill="#6b6860" letter-spacing="2">yohanan.design</text>
</svg>
`

await sharp(Buffer.from(svg))
  .png()
  .toFile('public/og-image.png')

console.log('OG image generated!')
