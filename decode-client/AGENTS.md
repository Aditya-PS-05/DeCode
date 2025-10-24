# Fusion SvelteKit Tailwind Starter

A production-ready SvelteKit application template with TypeScript, TailwindCSS 3, and modern tooling.

## Tech Stack

- **Frontend**: SvelteKit 2 + Svelte 5 + TypeScript + TailwindCSS 3.4.11
- **Styling**: TailwindCSS 3 with PostCSS + Autoprefixer
- **Testing**: Vitest with Playwright for browser testing
- **Build Tool**: Vite 7 with SvelteKit
- **Package Manager**: npm
- **Linting**: ESLint 9 + Prettier
- **Type Checking**: TypeScript 5 + svelte-check

## Project Structure

```
src/                     # SvelteKit application source
├── app.html             # Main app template
├── app.css              # Global styles with TailwindCSS imports
├── app.d.ts             # TypeScript declarations
├── routes/              # SvelteKit file-based routing
│   ├── +layout.svelte   # Root layout component
│   └── +page.svelte     # Home page component
├── lib/                 # Shared components and utilities
└── demo.spec.ts         # Example test file

static/                  # Static assets
├── favicon.svg          # Site favicon
└── ...                  # Other static files
```

## Key Features

### SvelteKit File-Based Routing

The application uses SvelteKit's modern file-based routing system:

- `+page.svelte` files define page components
- `+layout.svelte` files define layout components
- Automatic route generation based on file structure
- Server-side rendering (SSR) and static site generation (SSG) support

### Styling System

- **Primary**: TailwindCSS 3.4.11 utility classes
- **PostCSS**: Autoprefixer for cross-browser compatibility
- **Configuration**: `tailwind.config.js` for custom theming

```svelte
<!-- Example of TailwindCSS usage in Svelte components -->
<script>
	// Component logic here
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200"
>
	<div class="text-center">
		<h1 class="text-2xl font-semibold text-slate-800">Welcome to Fusion</h1>
	</div>
</div>
```

### Development Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build
npm run check        # Type check with svelte-check
npm run test         # Run tests with Vitest
npm run lint         # Lint with ESLint and Prettier
```

## Adding Features

### New Pages

1. Create page in `src/routes/`:

```svelte
<!-- src/routes/about/+page.svelte -->
<script>
	// Page logic here
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold text-gray-900">About Us</h1>
	<p class="mt-4 text-gray-600">This is the about page.</p>
</div>
```

2. Access via `/about` route automatically

### New Components

1. Create component in `src/lib/components/`:

```svelte
<!-- src/lib/components/MyComponent.svelte -->
<script>
	export let title = 'Default Title';
	export let description = 'Default description';
</script>

<div class="rounded-lg bg-white p-4 shadow">
	<h2 class="text-xl font-bold text-gray-900">{title}</h2>
	<p class="text-gray-600">{description}</p>
</div>
```

2. Import in your pages:

```svelte
<script>
	import MyComponent from '$lib/components/MyComponent.svelte';
</script>

<MyComponent title="Custom Title" description="Custom description" />
```

### Custom TailwindCSS Configuration

1. Update `tailwind.config.js` for custom theming:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#3b82f6',
				secondary: '#64748b'
			}
		}
	},
	plugins: []
};
```

2. Add custom styles in `src/app.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
	.btn-primary {
		@apply rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700;
	}
}
```

## Testing

The project includes comprehensive testing setup:

- **Unit Testing**: Vitest for fast unit tests
- **Browser Testing**: Playwright for browser-based testing
- **Type Checking**: svelte-check for TypeScript validation

```bash
npm run test         # Run all tests
npm run test:unit    # Run unit tests only
```

## Production Deployment

- **Development**: `npm run dev` for local development
- **Build**: `npm run build` creates optimized production build
- **Preview**: `npm run preview` to preview production build
- **Type Check**: `npm run check` for TypeScript validation

## Architecture Notes

- SvelteKit 2 with Svelte 5 for modern reactive components
- TypeScript throughout the application
- TailwindCSS 3.4.11 for utility-first styling
- Vite 7 for fast development and optimized builds
- Vitest + Playwright for comprehensive testing
- ESLint + Prettier for code quality
- File-based routing with automatic route generation
- Server-side rendering (SSR) and static site generation (SSG) support
