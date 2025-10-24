<script lang="ts">
	import { page } from '$app/stores';

	// Check if current path matches the link
	function isActive(path: string): boolean {
		return $page.url.pathname === path;
	}
</script>

<nav
	class="sticky top-0 z-50 border-b border-white/20 bg-black/95 backdrop-blur-sm"
	style="height: 72px;"
>
	<div class="mx-auto flex h-full max-w-[1353px] items-center justify-between px-4 md:px-16">
		<!-- Logo -->
		<a href="/" class="flex items-center gap-2">
			<div class="flex h-8 w-8 items-center justify-center rounded-full bg-white">
				<span class="text-xs font-bold text-black">D</span>
			</div>
			<span class="text-lg font-bold text-white">DeCode</span>
		</a>

		<!-- Navigation Links - Hidden on mobile -->
		<div class="hidden items-center gap-8 md:flex">
			<a
				href="/problems"
				class="text-sm transition {isActive('/problems') ? 'text-white' : 'text-gray-300 hover:text-white'}"
			>
				Problems
			</a>
			<a
				href="/explore"
				class="text-sm transition {isActive('/explore') ? 'text-white' : 'text-gray-300 hover:text-white'}"
			>
				Explore
			</a>
			<a
				href="/pricing"
				class="text-sm transition {isActive('/pricing') ? 'text-white' : 'text-gray-300 hover:text-white'}"
			>
				Pricing
			</a>
		</div>

		<!-- Auth Buttons -->
		<div class="flex items-center gap-3">
			<a
				href="/login"
				class="rounded-lg border border-gray-600 px-5 py-2.5 text-sm font-medium text-white transition hover:border-gray-400"
			>
				Login
			</a>
			<a
				href="/signup"
				class="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary/90"
			>
				Sign Up
			</a>
		</div>
	</div>
</nav>
