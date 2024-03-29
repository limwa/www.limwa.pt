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
	// 		keyframes: {
	// 			pulse: {
	// 				"0%, 100%": {
	// 					opacity: '1', 
	// 				},
	// 				"50%": {
	// 					opacity: '0.6',
	// 				}
	// 			}
	// 		},
	// 		animation: {
	// 			pulse: "pulse 5s ease-in-out infinite"
	// 		}
        },
	},
	plugins: [],
}
