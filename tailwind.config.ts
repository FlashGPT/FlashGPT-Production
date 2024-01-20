import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        white: "#ffffff",
        whitish: "#f5f7ff",
        transparent: "transparent",
        black: "#0f0f14",
        lightblue: "#edfdff",
        purple: "#bb9af7",
        orange: "#ff9e64",
        pink: "#f7768e",
        blue: "#7aa2f7",
        green: "#9ece6a",
        navy: "#344054",
        yellow: "#E0AF68",
        gray: "#BEC9CB",
        darkGray: "#6B6B6B",
        firstCardBackgroundFront: "#9AB1D1", 
        firstCardBackgroundBack: "##013B8C",
        secondCardBackgroundFront: "#F2F2F2",
        darkBlue: "#003B8C"
      }
    },
  },
  plugins: [],
}
export default config
