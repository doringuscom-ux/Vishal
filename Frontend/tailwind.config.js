/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: '#0c2444',
        brandOrange: '#f37a1f',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px) rotate(-3deg)' },
          '75%': { transform: 'translateX(2px) rotate(3deg)' },
        },
        swing: {
          '0%, 100%': { transform: 'rotate(-15deg)' },
          '50%': { transform: 'rotate(15deg)' },
        },
        dust: {
          '0%': { opacity: '0', transform: 'translateX(0) scale(0.5)' },
          '30%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateX(-15px) scale(1.5)' },
        },
        drive: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      },
      animation: {
        shake: 'shake 0.4s ease-in-out infinite',
        swing: 'swing 2s ease-in-out infinite',
        dust: 'dust 1s ease-out infinite',
        drive: 'drive 0.3s ease-in-out infinite',
        breathe: 'breathe 2s ease-in-out infinite',
        'spin-slow': 'spinSlow 4s linear infinite',
        scan: 'scan 3s linear infinite',
      }
    },
  },
  plugins: [],
}
