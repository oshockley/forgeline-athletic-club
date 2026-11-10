/**
 * Lightweight stylized map (no third-party embed, no cookies, no layout
 * shift). Swap for a Google Maps / Mapbox iframe if the client prefers;
 * see README.
 */
export function MapIllustration() {
  return (
    <svg
      viewBox="0 0 600 440"
      role="img"
      aria-labelledby="map-title"
      preserveAspectRatio="xMidYMid slice"
      className="size-full"
    >
      <title id="map-title">
        Stylized map showing Forgeline Athletic Club on Ironworks Avenue in Denver's River North Art District
      </title>
      <rect width="600" height="440" fill="var(--color-surface)" />

      {/* blocks */}
      <g fill="var(--color-surface-2)">
        {[0, 1, 2, 3, 4].flatMap((row) =>
          [0, 1, 2, 3, 4, 5].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={col * 104 - 20}
              y={row * 96 - 10}
              width="84"
              height="76"
              rx="6"
              transform="rotate(-8 300 220)"
            />
          )),
        )}
      </g>

      {/* park */}
      <rect x="392" y="40" width="150" height="110" rx="10" fill="var(--color-success)" fillOpacity="0.09" transform="rotate(-8 300 220)" />

      {/* river */}
      <path
        d="M-20 330 C 90 300, 140 360, 250 330 S 420 250, 620 300"
        fill="none"
        stroke="var(--color-water)"
        strokeOpacity="0.28"
        strokeWidth="22"
        strokeLinecap="round"
      />

      {/* main roads */}
      <g fill="none" stroke="var(--color-line-strong)" strokeLinecap="round">
        <path d="M-20 190 L 620 105" strokeWidth="14" />
        <path d="M150 -20 L 205 460" strokeWidth="10" />
        <path d="M420 -20 L 470 460" strokeWidth="10" />
      </g>
      <path d="M-20 190 L 620 105" stroke="var(--color-accent)" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="10 10" />

      {/* labels */}
      <g fontFamily="var(--font-sans)" fontSize="13" fill="var(--color-muted)">
        <text x="30" y="170" transform="rotate(-7.5 30 170)">Ironworks Ave</text>
        <text x="420" y="92" fontSize="12">Foundry Park</text>
        <text x="60" y="355" fontSize="12">South Platte River</text>
      </g>

      {/* pin */}
      <g transform="translate(300 148)">
        <circle r="38" fill="var(--color-accent)" fillOpacity="0.12" />
        <circle r="22" fill="var(--color-accent)" fillOpacity="0.2" />
        <path d="M0 -34c-11 0-19 8-19 18 0 13 19 30 19 30s19-17 19-30c0-10-8-18-19-18Z" fill="var(--color-accent)" />
        <circle cy="-16" r="7" fill="var(--color-ink)" />
      </g>
    </svg>
  )
}
