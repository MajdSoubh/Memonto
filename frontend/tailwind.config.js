/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: "#f5c32c",
        orange: "#f95f35",
        black: "#242d49",
        gray: "rgba(36, 45, 73, 0.65)",
        hrColor: "#cfcdcd",
        cardColor: "rgba(255, 255, 255, 0.64)",
        inputColor: "rgba(40, 52, 62, 0.053)",
        photo: "#4cb256",
        video: "#4a4eb7",
        location: "#ef5757",
        schedule: "#e1ae4a",
      },
      boxShadow: {
        inputShadow: "0 0 0 1.8px #fca71fe4",
        profileShadow: "0px 4px 17px 2px rgba(0, 0, 0, 0.25)",
      },
      backgroundImage: {
        buttonBg: "linear-gradient(98.63deg, #f9a225 0%, #f95f35 100%)",
        blueGradient: "linear-gradient(98.63deg, #15cbf8 0%, #2892ff 100%);",
      },
      height: {
        screen: "var(--real-vh)",
      },
    },
  },
  plugins: [],
};
