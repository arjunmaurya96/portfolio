/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Mona Sans Variable"', "system-ui", "sans-serif"],
      },
      colors: {
        shell: "var(--shell)",
        mist: "var(--mist)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        marigold: "var(--marigold)",
        link: "var(--link)",
      },
      screens: { shell: "1080px" },
    },
  },
  plugins: [],
};
