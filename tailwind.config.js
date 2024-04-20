import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                secondary: {
                    DEFAULT: colors.neutral[800],
                    hover: colors.neutral[800],
                    border: colors.neutral[700],
                    text: colors.neutral[500],
                    dark: colors.neutral[700],
                    ["dark-hover"]: colors.neutral[900],
                },
            },
        },
    },
    plugins: [],
};
