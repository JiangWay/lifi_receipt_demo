module.exports = {
    purge: [
        './public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundImage: {
                'header-logo': "url('./img/Header.png')"

            }
        },

        colors: { // Configure your color palette here
            transparent: 'transparent',
            current: 'currentColor',
            'lifi': {
                'yellow': '#FFCE33',
                'red': '#FF5C5C',
                'gray': '#F2F2F2',
                'text-gray': '#999999'
            }

        }

    },
    variants: {
        extend: {}
    },
    plugins: [require('daisyui')],
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        center: true
    }
}
