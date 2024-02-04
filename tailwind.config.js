import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			typography: ({ theme }) => ({
				white: {
					css: {
						'--tw-prose-body': 'hsl(var(--foreground))', // Main text color, dark gray
						'--tw-prose-headings': theme('colors.dracula-purple'),
						'--tw-prose-lead': theme('colors.gray[700]'), // Leading paragraph text color
						'--tw-prose-links': 'hsl(var(--primary))', // Link color
						'--tw-prose-bold': theme('colors.gray[900]'), // Bold text color, same as body color
						'--tw-prose-counters': theme('colors.dracula-purple'),
						'--tw-prose-bullets': theme('colors.dracula-purple'),
						'--tw-prose-hr': theme('colors.slate[300]'), // Horizontal Rule color
						'--tw-prose-quotes': theme('colors.slate[600]'), // Quotes color
						'--tw-prose-quote-borders': theme('colors.dracula-purple'),
						'--tw-prose-captions': theme('colors.gray[500]'), // Caption text color
						'--tw-prose-code': theme('colors.slate[900]'), // Inline code text color
						'--tw-prose-pre-code': 'hsl(var(--foreground))',
						'--tw-prose-pre-bg': theme('colors.slate[300]'),
						'--tw-prose-th-borders': theme('colors.gray[200]'), // Table Header border color
						'--tw-prose-td-borders': theme('colors.gray[200]'), // Table Data border color
						'--tw-prose-invert-body': 'hsl(var(--foreground))',
						'--tw-prose-invert-headings': theme('colors.dracula-purple'),
						'--tw-prose-invert-lead': theme('colors.gray[300]'),
						'--tw-prose-invert-links': 'hsl(var(--primary))',
						'--tw-prose-invert-bold': theme('colors.white'),
						'--tw-prose-invert-counters': theme('colors.dracula-purple'),
						'--tw-prose-invert-bullets': theme('colors.dracula-purple'),
						'--tw-prose-invert-hr': theme('colors.dracula-selection'),
						'--tw-prose-invert-quotes': theme('colors.gray[100]'),
						'--tw-prose-invert-quote-borders': theme('colors.dracula-purple'),
						'--tw-prose-invert-captions': theme('colors.gray[400]'),
						'--tw-prose-invert-code': theme('colors.white'),
						'--tw-prose-invert-pre-code': theme('colors.gray[300]'),
						'--tw-prose-invert-pre-bg': 'hsl(var(--secondary))',
						'--tw-prose-invert-th-borders': theme('colors.gray[600]'),
						'--tw-prose-invert-td-borders': theme('colors.gray[700]')
					}
				}
			}),
			colors: {
				'dracula-background': '#0B0D0F',
				'dracula-comment': '#708CA9',
				'dracula-selection': '#414D58',
				'dracula-foreground': '#F8F8F2',
				'dracula-cyan': '#80FFEA',
				'dracula-green': '#8AFF80',
				'dracula-orange': '#FFCA80',
				'dracula-pink': '#FF80BF',
				'dracula-purple': '#9580FF',
				'dracula-red': '#FF9580',
				'dracula-yellow': '#FFFF80',
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography')
		// ...
	]
};

export default config;
