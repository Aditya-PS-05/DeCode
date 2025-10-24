<script lang="ts">
	import { Navbar } from '$lib/components';
</script>

<div class="min-h-screen bg-black">
	<Navbar />

	<!-- Hero Section -->
	<section class="relative mx-auto max-w-[1280px] overflow-hidden px-6 py-20 md:px-6 lg:px-6">
		<!-- Background Blur Effect -->
		<div
			class="pointer-events-none absolute left-1/2 top-0 h-[456px] w-[680px] -translate-x-1/4 rounded-full blur-[75px]"
			style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(147, 51, 234, 0.2) 100%);"
		></div>

		<div class="relative grid gap-8 lg:grid-cols-2 lg:gap-12">
			<!-- Left Column: Hero Content -->
			<div class="flex flex-col justify-center space-y-6">
				<!-- Heading -->
				<div class="space-y-2">
					<h1 class="text-4xl font-normal leading-tight text-white md:text-5xl lg:text-[51px]">
						Master Your
					</h1>
					<h1
						class="text-4xl font-light leading-tight text-purple-400 md:text-5xl lg:text-[51px]"
					>
						Coding Skills.
					</h1>
				</div>

				<!-- Description -->
				<p class="max-w-[460px] text-base leading-7 text-gray-300 md:text-lg">
					Solve curated DSA problems in our powerful code editor. Master data structures and
					algorithms to excel in technical interviews and competitive programming.
				</p>

				<!-- Stats Grid -->
				<div class="grid grid-cols-2 gap-6 py-4 md:grid-cols-4">
					<div class="text-center">
						<div class="text-sm font-semibold text-purple-400">500+</div>
						<div class="text-xs text-gray-400">DSA Problems</div>
					</div>
					<div class="text-center">
						<div class="text-sm font-semibold text-purple-400">15+</div>
						<div class="text-xs text-gray-400">Languages</div>
					</div>
					<div class="text-center">
						<div class="text-sm font-semibold text-purple-400">Real-time</div>
						<div class="text-xs text-gray-400">Code Execution</div>
					</div>
					<div class="text-center">
						<div class="text-sm font-semibold text-purple-400">Instant</div>
						<div class="text-xs text-gray-400">Feedback</div>
					</div>
				</div>

				<!-- CTA Buttons -->
				<div class="flex flex-col gap-4 sm:flex-row">
					<a
						href="/signup"
						class="rounded-lg bg-primary-dark px-10 py-3 text-center text-sm font-medium text-white transition hover:bg-primary-dark/90"
					>
						Start Coding Now
					</a>
					<a
						href="/problems"
						class="rounded-lg border border-gray-600 px-10 py-3 text-center text-sm font-medium text-white transition hover:border-gray-400"
					>
						Browse Problems
					</a>
				</div>
			</div>

			<!-- Right Column: Daily Challenge Card -->
			<div
				class="rounded-2xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm lg:mt-2"
			>
				<div class="space-y-4">
					<div class="text-xs text-gray-400">You can practice</div>

					<h3 class="text-xl font-bold text-white">Daily Coding Challenge</h3>

					<div class="text-xs text-gray-400">Problem of the Day</div>

					<!-- Features List -->
					<div class="space-y-3 pt-2">
						<div class="flex items-start gap-2">
							<svg class="mt-0.5 h-6 w-6 flex-shrink-0" viewBox="0 0 24 24" fill="none">
								<path
									d="M9.55 18.0001L3.85 12.3001L5.275 10.8751L9.55 15.1501L18.725 5.9751L20.15 7.4001L9.55 18.0001Z"
									fill="#FEF7FF"
								/>
							</svg>
							<span class="text-xs text-gray-400">Solve in Built-in Code Editor</span>
						</div>
						<div class="flex items-start gap-2">
							<svg class="mt-0.5 h-6 w-6 flex-shrink-0" viewBox="0 0 24 24" fill="none">
								<path
									d="M9.55 18.0001L3.85 12.3001L5.275 10.8751L9.55 15.1501L18.725 5.9751L20.15 7.4001L9.55 18.0001Z"
									fill="#FEF7FF"
								/>
							</svg>
							<span class="text-xs text-gray-400">Test Cases & Submissions</span>
						</div>
						<div class="flex items-start gap-2">
							<svg class="mt-0.5 h-6 w-6 flex-shrink-0" viewBox="0 0 24 24" fill="none">
								<path
									d="M9.55 18.0001L3.85 12.3001L5.275 10.8751L9.55 15.1501L18.725 5.9751L20.15 7.4001L9.55 18.0001Z"
									fill="#FEF7FF"
								/>
							</svg>
							<span class="text-xs text-gray-400">Detailed Solutions & Explanations</span>
						</div>
					</div>

					<!-- User Avatars & Stats -->
					<div class="flex items-center gap-3 pt-4">
						<div class="flex -space-x-2">
							<div class="h-8 w-8 rounded-full border-2 border-gray-800 bg-gray-600"></div>
							<div class="h-8 w-8 rounded-full border-2 border-gray-800 bg-gray-600"></div>
							<div class="h-8 w-8 rounded-full border-2 border-gray-800 bg-gray-600"></div>
						</div>
						<div>
							<div class="text-sm font-semibold text-white">50k+ Solved Today</div>
							<div class="text-xs text-yellow-400">Continuously Growing</div>
						</div>
					</div>

					<!-- Solve Button -->
					<a
						href="/problem/daily"
						class="mt-4 block w-full rounded-lg bg-primary-dark py-3 text-center text-sm font-medium text-white transition hover:bg-primary-dark/90"
					>
						Solve Today's Problem
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Everything You Need to Excel Section -->
	<section class="relative mx-auto max-w-[1280px] px-6 py-20">
		<!-- Background Blur Effect -->
		<div
			class="pointer-events-none absolute -left-52 top-96 h-[456px] w-[680px] rounded-full blur-[75px]"
			style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(147, 51, 234, 0.2) 100%);"
		></div>

		<h2 class="relative mb-16 text-center text-3xl font-bold text-white lg:text-[31px]">
			Everything You Need to Excel
		</h2>

		<!-- Feature Cards Grid -->
		<div class="relative space-y-8">
			<!-- Top Row -->
			<div class="grid gap-8 md:gap-12 lg:grid-cols-2">
				<!-- Algorithm & Data Structure Mastery -->
				<div
					class="rounded-2xl border border-purple-500/30 bg-purple-950/30 p-8"
					style="min-height: 253px;"
				>
					<h3
						class="bg-purple-gradient mb-6 bg-clip-text text-lg font-bold text-transparent md:text-xl"
					>
						Algorithm & Data Structure Mastery
					</h3>
					<p class="text-sm leading-6 text-gray-300">
						Comprehensive problem sets covering Arrays, Linked Lists, Trees, Graphs, Dynamic
						Programming, Greedy Algorithms, and more. Each topic includes easy to hard problems to
						build your skills progressively.
					</p>
				</div>

				<!-- Code Editor -->
				<div
					class="rounded-2xl border border-purple-500/30 bg-gray-900/50 p-8"
					style="min-height: 253px;"
				>
					<h3 class="mb-6 text-center text-lg font-bold text-white md:text-xl">
						Powerful Code Editor
					</h3>
					<p class="mb-4 text-center text-sm leading-6 text-gray-300">
						Write, test, and submit code directly in the browser with our feature-rich editor.
					</p>
					<ul class="space-y-2 text-sm text-gray-400">
						<li>• Syntax highlighting & auto-completion</li>
						<li>• 15+ languages: Python, Java, C++, JavaScript & more</li>
						<li>• Run test cases instantly</li>
						<li>• Debug with custom inputs</li>
					</ul>
				</div>
			</div>

			<!-- Bottom Row -->
			<div class="grid gap-8 md:gap-12 lg:grid-cols-2">
				<!-- Problem Selection -->
				<div class="rounded-2xl border border-gray-700 bg-gray-900/50 p-8" style="min-height: 253px;">
					<div class="mb-6">
						<h3 class="text-xl font-bold text-white">Browse & Filter Problems</h3>
					</div>
					<p class="mb-4 text-sm leading-6 text-gray-300">
						Find the perfect problem to solve with our advanced filtering and search features.
					</p>
					<ul class="space-y-2 text-sm text-gray-400">
						<li>• Filter by difficulty: Easy, Medium, Hard</li>
						<li>• Search by topic or algorithm type</li>
						<li>• Track solved vs. unsolved problems</li>
						<li>• Company-tagged questions for interview prep</li>
					</ul>
				</div>

				<!-- Progress Tracking -->
				<div
					class="rounded-2xl border border-purple-500/30 bg-purple-950/30 p-8"
					style="min-height: 253px;"
				>
					<h3 class="bg-white-green-gradient mb-4 bg-clip-text text-center text-lg text-transparent">
						Progress Tracking
					</h3>
					<p class="text-right text-sm leading-6 text-white">
						Monitor your coding journey with detailed analytics, problem-solving streaks, and skill
						progression across different algorithm categories.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="border-t border-gray-800 bg-black/30 py-12">
		<div class="mx-auto max-w-[1353px] px-6">
			<div class="grid gap-8 md:grid-cols-3">
				<!-- Brand -->
				<div class="space-y-4">
					<div class="flex items-center gap-2">
						<div class="flex h-8 w-8 items-center justify-center rounded-full bg-white">
							<span class="text-xs font-bold text-black">D</span>
						</div>
						<span class="text-lg font-bold text-white">DeCode</span>
					</div>
					<p class="text-sm text-gray-400">
						Master data structures and algorithms with our comprehensive problem-solving platform.
					</p>
				</div>

				<!-- Quick Links -->
				<div>
					<h4 class="mb-4 text-sm font-semibold text-white">Quick Links</h4>
					<ul class="space-y-2 text-sm text-gray-400">
						<li><a href="/problems" class="hover:text-white">Problems</a></li>
						<li><a href="/explore" class="hover:text-white">Explore</a></li>
						<li><a href="/learn" class="hover:text-white">Learn DSA</a></li>
						<li><a href="/contests" class="hover:text-white">Contests</a></li>
					</ul>
				</div>

				<!-- Community -->
				<div>
					<h4 class="mb-4 text-sm font-semibold text-white">Community</h4>
					<ul class="space-y-2 text-sm text-gray-400">
						<li><a href="/discuss" class="hover:text-white">Discussions</a></li>
						<li><a href="/leaderboard" class="hover:text-white">Leaderboard</a></li>
						<li><a href="/about" class="hover:text-white">About Us</a></li>
						<li><a href="/contact" class="hover:text-white">Contact</a></li>
					</ul>
				</div>
			</div>

			<!-- Bottom Bar -->
			<div class="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
				© 2025 DeCode. All rights reserved. Built for developers, by developers.
			</div>
		</div>
	</footer>
</div>
