import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: ({ colors }) => {
                return {
					...colors,
					slate: {
						...colors.slate,
						"750": "#283548", // color-mix(in oklab, ${colors.slate["700"]}, ${colors.slate["800"]})
					}
				};
			}
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
