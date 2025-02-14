/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        sidebar: "var(--sidebar)",
        card: "var(--card)",
        primary: "var(--purple-400)",
        "text-1": "var(--text-1)",
        "text-2": "var(--text-2)",
        subtle: "var(--text-subtle)",
      },
      fontFamily: {
        body: ["Lato"],
      },
    },
  },
  plugins: [],
};
