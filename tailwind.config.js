module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        "screen-nav": "calc(100vh - 64px)",
      },
      maxWidth: {
        laptop: "900px",
        authCard: "800px",
      },
    },
  },
  plugins: [],
};
