/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                slate: {
                    850: '#151f32',
                    900: '#0f172a',
                    950: '#020617',
                },
                nebula: {
                    void: '#0B0B15', // Deepest background
                    purple: '#6D28D9',
                    cyan: '#06B6D4',
                    pink: '#EC4899',
                    amber: '#F59E0B',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite reverse',
                'glow': 'glow 3s ease-in-out infinite alternate',
                'shimmer': 'shimmer 2.5s linear infinite',
                'spin-slow': 'spin 12s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' },
                },
                glow: {
                    'from': { boxShadow: '0 0 15px -5px rgba(59, 130, 246, 0.3)' },
                    'to': { boxShadow: '0 0 30px 5px rgba(59, 130, 246, 0.6)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                }
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
                'nebula-gradient': "radial-gradient(circle at 50% 0%, rgba(109, 40, 217, 0.15), transparent 60%), radial-gradient(circle at 100% 0%, rgba(6, 182, 212, 0.1), transparent 50%)",
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
