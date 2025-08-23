const Logo = ({ w = 200, h = 60, ...props }) => (
  <svg
    width={w}
    height={h}
    viewBox="0 0 640 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="title desc"
    {...props}
  >
    <title id="title">EventFuze Logo</title>
    <desc id="desc">
      Rounded hexagon with a lightning-bolt F inside, followed by the EventFuze
      wordmark.
    </desc>
    <style>
      {`
        :root {
          --ef-primary: #28A745; /* vibrant green */
          --ef-accent: #FFD166;  /* golden spark */
          --ef-text: #0B0B0F;    /* dark wordmark */
          --ef-bg: transparent; /* background */
        }
        .shadow {
          filter: url(#efShadow);
        }
      `}
    </style>

    <defs>
      <filter
        id="efShadow"
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
        colorInterpolationFilters="sRGB"
      >
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.18" />
      </filter>
      <linearGradient id="efGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3CCF4E" />
        <stop offset="100%" stopColor="var(--ef-primary)" />
      </linearGradient>
      <clipPath id="shieldClip">
        <path d="M100 18 L176 62 Q182 65 182 72 L182 128 Q182 135 176 138 L100 182 Q96 184 92 182 L16 138 Q10 135 10 128 L10 72 Q10 65 16 62 L92 18 Q96 16 100 18 Z" />
      </clipPath>
    </defs>

    <rect width="100%" height="100%" fill="var(--ef-bg)" />

    {/* ICON */}
    <g transform="translate(24,10)">
      <path
        className="shadow"
        d="M100 18 L176 62 Q182 65 182 72 L182 128 Q182 135 176 138 L100 182 Q96 184 92 182 L16 138 Q10 135 10 128 L10 72 Q10 65 16 62 L92 18 Q96 16 100 18 Z"
        fill="url(#efGrad)"
      />
      <g clipPath="url(#shieldClip)">
        <path
          d="M58 66 H124 c6 0 10 4 10 10 s-4 10-10 10 H88 l18 18 c3 3 3 8-0 11 l-11 11 h29 c6 0 10 4 10 10 s-4 10-10 10 H83 l-29 29 c-3 3-8 3-11 0 c-3-3-3-8 0-11 l23-23 H52 c-6 0-10-4-10-10 s4-10 10-10 h28 l-18-18 c-3-3-3-8 0-11 l18-18 H58 c-6 0-10-4-10-10 s4-10 10-10 Z"
          fill="#FFFFFF"
          opacity="0.98"
        />
      </g>
    </g>

    {/* WORDMARK - Centered */}
    <g transform="translate(320,100)">
      <text
        x="32"
        y="16"
        fontSize="48"
        fontFamily="Poppins, Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
        fontWeight="700"
        textAnchor="end"
        dominantBaseline="middle"
        fill="var(--ef-text)"
      >
        Event
      </text>
      <text
        x="36"
        y="16"
        fontSize="48"
        fontFamily="Poppins, Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
        fontWeight="800"
        textAnchor="start"
        dominantBaseline="middle"
        fill="var(--ef-primary)"
      >
        Fuze
      </text>
      <text
        y="40"
        fontSize="16"
        fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
        fontWeight="500"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#5A5F6A"
        opacity="0.85"
      ></text>
    </g>
  </svg>
);

export default Logo;
