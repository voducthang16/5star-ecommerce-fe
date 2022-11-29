/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#319795',
                secondary: '#748ACC',
                hover: '#dfe6e9',
                tblack: '#262834', // text-black
                tbase: '##767676', // text-gray
                input: '#F5F8FA', //ebf0f6
                icon: '#050505',
            },
            keyframes: {
                appear: {
                    '0%': {
                        transform: 'translateY(-50px)',
                        opacity: 0,
                    },
                    // '20%': {
                    //     transform: 'translateY(-40px)',
                    //     opacity: 0.2,
                    // },
                    // '40%': {
                    //     transform: 'translateY(-30px)',
                    //     opacity: 0.4,
                    // },
                    // '60%': {
                    //     transform: 'translateY(-20px)',
                    //     opacity: 0.6,
                    // },
                    // '80%': {
                    //     transform: 'translateY(-10px)',
                    //     opacity: 0.8,
                    // },
                    '100%': {
                        transform: 'translateY(0)',
                        opacity: 1,
                    },
                },
            },
            animation: {
                navbarShow: 'appear 0.3s',
            },
            fontFamily: {
                plusJakartaSans: ['Plus Jakarta Sans'],
            },
        },
    },
    plugins: [],
};
