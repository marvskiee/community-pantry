module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        "screen-nav": "calc(100vh - 64px)",
        sidebar: "calc(100vh - 20rem)",
      },
      maxHeight: {
        sidebar: "calc(100vh - 20rem)",
        modal: "calc(100vh - 5rem)",
      },
      maxWidth: {
        laptop: "900px",
        authCard: "800px",
      },
    },
  },
  plugins: [],
};
