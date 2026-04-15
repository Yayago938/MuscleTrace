/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#fbf9f5",
        surface: "#fbf9f5",
        "surface-dim": "#dbdad6",
        "surface-bright": "#fbf9f5",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f3ef",
        "surface-container": "#efeeea",
        "surface-container-high": "#eae8e4",
        "surface-container-highest": "#e4e2de",
        "surface-variant": "#e4e2de",
        primary: "#944a00",
        "primary-container": "#e67e22",
        secondary: "#b02d21",
        "secondary-container": "#fc6451",
        tertiary: "#00658f",
        "tertiary-container": "#00a3e4",
        outline: "#897365",
        "outline-variant": "#dcc1b1",
        "on-surface": "#1b1c1a",
        "on-surface-variant": "#564337",
        "on-primary": "#ffffff",
        "primary-fixed": "#ffdcc5",
        "primary-fixed-dim": "#ffb783",
        "secondary-fixed": "#ffdad5"
      },
      fontFamily: {
        headline: ["Noto Serif", "serif"],
        body: ["Manrope", "sans-serif"],
        label: ["Manrope", "sans-serif"]
      },
      borderRadius: {
        editorial: "2rem",
        shell: "3rem"
      },
      boxShadow: {
        ambient: "0 30px 60px -24px rgba(27, 28, 26, 0.12)",
        soft: "0 20px 50px -30px rgba(148, 74, 0, 0.35)"
      },
      backgroundImage: {
        ember: "linear-gradient(135deg, #944a00 0%, #e67e22 100%)",
        haze: "radial-gradient(circle at top, rgba(230,126,34,0.18), transparent 42%)"
      }
    }
  },
  plugins: []
};
