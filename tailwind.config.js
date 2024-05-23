/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "primary-light": "#10A37F", // OpenAI green color
        "primary-dark": "#10A37F", // Same for dark mode
        "secondary-light": "#1F2937",
        "secondary-dark": "#4B5563",
        "background-light": "#F3F4F6",
        "background-dark": "#1F2937",
        "text-light": "#374151",
        "text-dark": "#D1D5DB",
      },
      boxShadow: {
        button: "0 4px 14px 0 rgba(0, 0, 0, 0.1)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
