module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        customgreen: "#0C3B2E",
        customlightgreen: "#6D9773",
      },
      minHeight: {
        "screen-nav": "calc(100vh - 64px)",
        sidebar: "calc(100vh - 20rem)",
      },
      maxHeight: {
        homeimage: "calc(100vh - 64px)",
        sidebar: "calc(100vh - 20rem)",
        modal: "calc(100vh - 5rem)",
      },
      maxWidth: {
        about: "500px",
        laptop: "900px",
        authCard: "800px",
      },
    },
  },
  plugins: [],
};
