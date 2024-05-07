import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
                slate: {
                    // slate.750 = color-mix(in oklab, ${colors.slate["700"]}, ${colors.slate["800"]})
                    "750": "#283548",
                }
            },
			fontFamily: {
				serif: ['Noto Serif Variable', ...defaultTheme.fontFamily.serif],
			},
			keyframes: {
				typewriter: {
					"0%, 80%, 100%": {
						opacity: '0', 
					},
					"10%, 20%": {
						opacity: '1',
					}
				}
			},
			animation: {
				typewriter: "typewriter 1s linear infinite"
			}
        },
	},
	plugins: [],
}
