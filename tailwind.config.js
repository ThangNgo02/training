/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      screens: {
        desktopXL: "1920px",
      },
      fontFamily: {
        mont: ["Montserrat", "sans-serif"],
      },
      borderRadius: {
        "4xl": "180px",
      },
      boxShadow: {
        btnGroup: "0px 2px 4px 0px rgba(0, 0, 0, 0.12);",
      },
      fontSize: {
        '18x22': {
          'font-size': '18px',
          'line-height': '22px',
        },
        '14x18': {
          'font-size': '14px',
          'line-height': '18px',
        },
        '12x18': {
          'font-size': '12px',
          'line-height': '18px',
        }
      },
      colors: {
        neutral: {
          110: "#F2F2F2",
        },
        dark: {
          500: "#101316",
        },
        primary: {
          pressed: "#AD1D2F",
        },
        secondary: {
          pressed: "#00645C",
        },
        warning: {
          pressed: "#B77D09",
        },
        danger: {
          pressed: "#920101",
        },
        info: {
          pressed: "#023480",
        },
        orange: {
          pressed: "#A14603",
        },
        purple: {
          pressed: "#5D1C7B",
        },
        green: {
          pressed: "#155E25",
        },
      },
      animation: {
        transRight: "transRightOut 0.4s",
      },
      keyframes: {
        transRightOut: {
          "0%": {
            transform: "translateX(-20px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0px)",
            opacity: 1,
          },
        },
      },
      backgroundImage: {
        'main': "url('src/assets/images/background-main.jpg')",
      },
      width: {
        'login': '440px',
      },
      height: {
        'login': '40px',
      },
      margin: {
        '17' : '68px',
        '18' : '72px',
      },
      textColor: {
        'custom-0': '#1A1A1A',
        'primary' : '#2DB976',
        'secondary' : '#484848',
      },
      backgroundColor: {
        'primary' : '#2DB976',
        'sidebar' : '#289E65',
        'private-background' : '#F5F5F5'
      },
      borderColor: {
        'devider' : '#E0E0E0'
      }
    },
  },
  plugins: [],
};
