/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#9333EA',
					light: '#C084FC',
					dark: '#2F144A'
				},
				success: {
					DEFAULT: '#16A34A'
				},
				purple: {
					400: '#C084FC',
					600: '#9333EA',
					900: '#2F144A',
					950: '#581C87'
				}
			},
			fontFamily: {
				sans: ['Inter', '-apple-system', 'Roboto', 'Helvetica', 'sans-serif']
			},
			backgroundImage: {
				'purple-gradient': 'linear-gradient(90deg, #A269DE 0%, #FFF 100%)',
				'white-green-gradient': 'linear-gradient(90deg, #FFF 0%, #16A34A 100%)'
			}
		}
	},
	plugins: []
};
