<script lang="ts">
	import { Navbar } from '$lib/components';

	let email = '';
	let password = '';

	function handleLogin(e: Event) {
		e.preventDefault();
		// Handle login logic here
		console.log('Login:', { email, password });
	}
</script>

<div class="min-h-screen bg-black">
	<Navbar />

	<!-- Login Container -->
	<div class="flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-12">
		<!-- Login Card -->
		<div
			class="w-full max-w-md rounded-3xl border border-purple-500/20 p-10"
			style="background: linear-gradient(180deg, rgba(88, 28, 135, 0.3) 0%, rgba(76, 29, 149, 0.2) 50%, rgba(30, 27, 75, 0.3) 100%);"
		>
			<!-- Welcome Text -->
			<p class="mb-2 text-sm text-gray-400">Welcome Back</p>
			<h1 class="mb-8 text-3xl font-bold text-white">Login to your account</h1>

			<!-- Login Form -->
			<form on:submit={handleLogin} class="space-y-5">
				<!-- Email -->
				<div>
					<label for="email" class="mb-2 block text-sm text-gray-300">Email</label>
					<input
						type="email"
						id="email"
						bind:value={email}
						required
						class="w-full rounded-lg border border-purple-500/30 bg-transparent px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
						placeholder=""
					/>
				</div>

				<!-- Password -->
				<div>
					<label for="password" class="mb-2 block text-sm text-gray-300">Password</label>
					<input
						type="password"
						id="password"
						bind:value={password}
						required
						class="w-full rounded-lg border border-purple-500/30 bg-transparent px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
						placeholder=""
					/>
				</div>

				<!-- Forgot Password Link -->
				<div class="text-right">
					<a href="/forgot-password" class="text-sm text-purple-400 hover:text-purple-300"
						>Forgot Password?</a
					>
				</div>

				<!-- Login Button -->
				<button
					type="submit"
					class="w-full rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 py-3.5 font-semibold text-white transition hover:from-purple-700 hover:to-purple-800"
				>
					Login
				</button>
			</form>

			<!-- Divider -->
			<div class="my-6 flex items-center gap-4">
				<div class="h-px flex-1 bg-gray-700"></div>
				<span class="text-sm text-gray-400">Continue With</span>
				<div class="h-px flex-1 bg-gray-700"></div>
			</div>

			<!-- Social Login Buttons -->
			<div class="grid grid-cols-2 gap-4">
				<!-- GitHub Button -->
				<button
					type="button"
					class="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-100"
				>
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
						/>
					</svg>
					GitHub
				</button>

				<!-- Google Button -->
				<button
					type="button"
					class="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-100"
				>
					<svg class="h-5 w-5" viewBox="0 0 24 24">
						<path
							fill="#4285F4"
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
						/>
						<path
							fill="#34A853"
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
						/>
						<path
							fill="#FBBC05"
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
						/>
						<path
							fill="#EA4335"
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
						/>
					</svg>
					Google
				</button>
			</div>

			<!-- Signup Link -->
			<p class="mt-6 text-center text-sm text-gray-400">
				Don't have an account?
				<a href="/signup" class="font-medium text-white underline hover:text-gray-200"
					>Sign Up Now</a
				>
			</p>
		</div>
	</div>

	<!-- Footer -->
	<footer class="border-t border-gray-800 bg-black/30 py-8">
		<div class="mx-auto max-w-[1353px] px-6">
			<div
				class="flex flex-col items-center justify-between gap-6 lg:flex-row lg:items-center lg:gap-0"
			>
				<!-- Left: Airplane Mode -->
				<div class="flex items-center gap-2 text-sm text-gray-400">
					<svg class="h-4 w-4" viewBox="0 0 16 16" fill="none">
						<path
							d="M11.8667 12.8L10.6667 7.33333L13 5C14 4 14.3333 2.66667 14 2C13.3333 1.66667 12 2 11 3L8.66667 5.33333L3.2 4.13333C2.86667 4.06667 2.6 4.2 2.46667 4.46667L2.26667 4.8C2.13333 5.13333 2.2 5.46667 2.46667 5.66667L6 8L4.66667 10H2.66667L2 10.6667L4 12L5.33333 14L6 13.3333V11.3333L8 10L10.3333 13.5333C10.5333 13.8 10.8667 13.8667 11.2 13.7333L11.5333 13.6C11.8 13.4 11.9333 13.1333 11.8667 12.8Z"
							stroke="#9CA3AF"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<span>Airplane mode enabled</span>
				</div>

				<!-- Right: Cohort Info & CTA -->
				<div class="flex flex-col items-center gap-6 md:flex-row md:gap-16">
					<!-- Cohort Details -->
					<div class="flex flex-wrap justify-center gap-8 md:gap-16">
						<div class="text-center">
							<div class="text-xs text-gray-400">Cohort Start on</div>
							<div class="text-sm font-semibold text-white">27th June</div>
						</div>
						<div class="text-center">
							<div class="text-xs text-gray-400">Time Commitment</div>
							<div class="text-sm font-semibold text-white">6-8 Hours / Week</div>
						</div>
						<div class="text-center">
							<div class="text-xs text-gray-400">Cost</div>
							<div class="text-sm font-semibold text-white">$999</div>
						</div>
					</div>

					<!-- Join Free Session Button -->
					<button
						class="whitespace-nowrap rounded-full bg-primary px-8 py-3 text-sm font-medium text-white transition hover:bg-primary/90"
					>
						Join Free Session
					</button>
				</div>
			</div>
		</div>
	</footer>
</div>
