<script lang="ts">
	import { Navbar } from '$lib/components';

	let openFaqIndex: number | null = null;

	function toggleFaq(index: number) {
		openFaqIndex = openFaqIndex === index ? null : index;
	}

	const faqs = [
		{
			question: "Is this one of those 'tech influencer' cash-grab courses?",
			answer: "No, this is a comprehensive DSA learning platform with carefully curated problems and expert-designed curriculum."
		},
		{
			question: "Why is this cohort so expensive? Can't I just read blog posts?",
			answer: "Our cohort includes live sessions, personalized mentorship, career support, and a structured learning path that's proven to help students succeed in technical interviews."
		},
		{
			question: "I've already watched 50 hours of YouTube videos. Do I really need this?",
			answer: "While YouTube videos are helpful, our platform offers hands-on practice, real-time feedback, and a structured curriculum that ensures you master all essential DSA concepts."
		},
		{
			question: "I've read Designing Data-Intensive Applications twice. Is this just that in disguise?",
			answer: "This is focused on data structures and algorithms for coding interviews and competitive programming, not system design."
		},
		{
			question: "Is this just slides and lectures? Will I fall asleep?",
			answer: "No! Our platform is interactive with coding challenges, live sessions, and hands-on problem-solving to keep you engaged."
		},
		{
			question: "Will this help me crack FAANG interviews?",
			answer: "Yes! Our curriculum is specifically designed to prepare you for technical interviews at top tech companies."
		},
		{
			question: "What if I'm the dumbest person in the cohort?",
			answer: "Our community is supportive and collaborative. We have problems ranging from easy to hard, so everyone can learn at their own pace."
		},
		{
			question: "Do I need to code during the cohort?",
			answer: "Yes! Hands-on coding practice is essential for mastering DSA. You'll solve problems in our built-in code editor."
		},
		{
			question: "Will this Visualization course help me get into Cohort?",
			answer: "The visualization tools help you understand algorithms better, which will improve your problem-solving skills for any course or interview."
		}
	];
</script>

<div class="min-h-screen bg-black">
	<Navbar />

	<!-- Premium Header -->
	<section class="mx-auto max-w-[1280px] px-6 py-16 text-center">
		<h1 class="mb-4 text-4xl font-bold text-white md:text-5xl">Premium</h1>
		<p class="text-lg text-gray-400">Get started with a De-Code Subscription that works for you.</p>
	</section>

	<!-- Pricing Cards -->
	<section class="relative mx-auto max-w-[1280px] px-6 pb-20">
		<!-- Background glow effect for Pro Cohort card -->
		<div
			class="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[100px]"
			style="background: radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 100%);"
		></div>

		<div class="relative grid gap-6 md:grid-cols-3">
			<!-- Essentials Card -->
			<div class="rounded-3xl bg-gradient-to-b from-gray-800/60 to-gray-900/60 p-8 backdrop-blur-xl">
				<h3 class="mb-6 text-2xl font-bold text-white">Essentials</h3>
				<div class="mb-8 flex items-baseline gap-3">
					<span class="text-sm text-gray-500 line-through">$800</span>
					<span class="text-4xl font-bold text-white">$399</span>
				</div>

				<!-- Features List -->
				<ul class="mb-10 space-y-4">
					<li class="flex items-start gap-3 text-sm text-gray-300">
						<div class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-gray-500 bg-gray-700">
							<svg class="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
								<path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
							</svg>
						</div>
						<span>Preview-only curriculum access<br /><span class="text-xs text-gray-500">(no content taught live)</span></span>
					</li>
					<li class="flex items-start gap-3 text-sm text-gray-500">
						<svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
						</svg>
						No live classes
					</li>
					<li class="flex items-start gap-3 text-sm text-gray-500">
						<svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
						</svg>
						No Community access
					</li>
					<li class="flex items-start gap-3 text-sm text-gray-500">
						<svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
						</svg>
						No feedback or AMA
					</li>
					<li class="flex items-start gap-3 text-sm text-gray-500">
						<svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
						</svg>
						No resume support
					</li>
					<li class="flex items-start gap-3 text-sm text-gray-500">
						<svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
						</svg>
						No certificate
					</li>
				</ul>

				<button
					class="w-full rounded-xl bg-gray-700 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-gray-600"
				>
					Join Free Preview
				</button>
			</div>

			<!-- Pro Cohort Card (Featured) -->
			<div class="rounded-3xl p-10 shadow-2xl shadow-purple-500/30" style="background: linear-gradient(180deg, #4C1D95 0%, #2E1065 100%);">
				<h3 class="mb-8 text-3xl font-bold text-white">Pro Cohort</h3>
				<div class="mb-10 flex items-baseline gap-3">
					<span class="text-base text-purple-300/60 line-through">$1200</span>
					<span class="text-5xl font-bold text-white">$899</span>
				</div>

				<!-- Features List -->
				<ul class="mb-12 space-y-5">
					<li class="flex items-center gap-4 text-base text-white">
						<svg class="h-6 w-6 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
							<path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
						</svg>
						Full curriculum via weekly live sessions
					</li>
					<li class="flex items-center gap-4 text-base text-white">
						<svg class="h-6 w-6 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
							<path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
						</svg>
						Weekly deep-dive sessions
					</li>
					<li class="flex items-center gap-4 text-base text-white">
						<svg class="h-6 w-6 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
							<path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
						</svg>
						Private community + peer discussions
					</li>
					<li class="flex items-center gap-4 text-base text-white">
						<svg class="h-6 w-6 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
							<path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
						</svg>
						Weekly AMA + guidance
					</li>
					<li class="flex items-center gap-4 text-base text-red-400">
						<svg class="h-6 w-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
						</svg>
						Not included
					</li>
					<li class="flex items-center gap-4 text-base text-white">
						<svg class="h-6 w-6 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
							<path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
						</svg>
						certificate
					</li>
				</ul>

				<button
					class="w-full rounded-2xl bg-gradient-to-r from-purple-500 via-purple-600 to-fuchsia-600 px-6 py-4 text-base font-semibold text-white transition hover:from-purple-600 hover:via-purple-700 hover:to-fuchsia-700"
				>
					Experience a Free Session
				</button>
			</div>

			<!-- Elite+ Card -->
			<div class="rounded-3xl bg-gradient-to-b from-gray-800/60 to-gray-900/60 p-8 backdrop-blur-xl">
				<h3 class="mb-6 text-2xl font-bold text-white">Elite +</h3>
				<div class="mb-8 flex items-baseline gap-3">
					<span class="text-sm text-gray-500 line-through">$2000</span>
					<span class="text-4xl font-bold text-white">$1499</span>
				</div>

				<!-- Features List -->
				<ul class="mb-10 space-y-4">
					<li class="flex items-start gap-3 text-sm text-gray-300">
						<svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
							<path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
						</svg>
						Everything in Pro
					</li>
					<li class="flex items-start gap-3 text-sm text-gray-300">
						<svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
							<path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
						</svg>
						1:1 mentorship & support
					</li>
					<li class="flex items-start gap-3 text-sm text-gray-300">
						<svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
							<path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
						</svg>
						Exclusive expert feedback loop
					</li>
					<li class="flex items-start gap-3 text-sm text-gray-300">
						<svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
							<path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
						</svg>
						Personalized project reviews
					</li>
					<li class="flex items-start gap-3 text-sm text-gray-300">
						<svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
							<path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
						</svg>
						Resume + career support
					</li>
					<li class="flex items-start gap-3 text-sm text-gray-300">
						<svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
							<path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
						</svg>
						Certificate + LinkedIn proof
					</li>
				</ul>

				<button
					class="w-full rounded-xl bg-gray-700 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-gray-600"
				>
					Book My Free Spot
				</button>
			</div>
		</div>
	</section>

	<!-- How Premium Looks Like -->
	<section class="mx-auto max-w-[1280px] px-6 py-20">
		<h2 class="mb-12 text-center text-3xl font-bold text-white">How Premium Looks Like?</h2>

		<div class="grid gap-6 md:grid-cols-3">
			<div class="rounded-2xl border border-purple-500/30 bg-purple-950/30 p-8 text-center">
				<div class="mb-2 text-5xl font-bold text-white">75%</div>
				<p class="text-sm text-gray-400">Senior Engineers</p>
			</div>

			<div class="rounded-2xl border border-purple-500/30 bg-purple-950/30 p-8 text-center">
				<div class="mb-2 text-5xl font-bold text-white">22%</div>
				<p class="text-sm text-gray-400">Principal and Staff Engineers</p>
			</div>

			<div class="rounded-2xl border border-purple-500/30 bg-purple-950/30 p-8 text-center">
				<div class="mb-2 text-5xl font-bold text-white">10 Years</div>
				<p class="text-sm text-gray-400">Median Work Experience</p>
			</div>
		</div>
	</section>

	<!-- Scholarship and Testimonial Section -->
	<section class="mx-auto max-w-[1280px] px-6 py-20">
		<div class="grid gap-6 md:grid-cols-2">
			<!-- Scholarship Card -->
			<div class="rounded-2xl border border-gray-700 bg-gray-900/50 p-8">
				<h3 class="mb-4 text-2xl font-bold text-white">
					Win a 15% Scholarship with our #LearnInPublic challenge
				</h3>
				<p class="mb-6 text-sm leading-relaxed text-gray-300">
					Post 10 system design insights or breakdowns on LinkedIn or Twitter during this cohort to win back
					15% of your fellowship fees
				</p>
			</div>

			<!-- Testimonial Card -->
			<div class="rounded-2xl border border-primary bg-gradient-to-br from-purple-600 to-purple-800 p-8">
				<div class="mb-4 flex items-center gap-3">
					<div class="h-12 w-12 rounded-full bg-white"></div>
					<div>
						<div class="font-semibold text-white">Shweta Kumari</div>
					</div>
				</div>

				<p class="mb-4 text-sm leading-relaxed text-white">
					I was looking an incredible learning journey with Arpit, and I couldn't be more grateful for this experience!
				</p>

				<p class="mb-4 text-sm leading-relaxed text-white">
					The cohort offered a perfect mix of structured learning, real-world applications, and plenty of concepts. What stood out the most was how practical and thoughtfully designed everything was — from the content to the guidance and mentorship throughout.
				</p>

				<p class="mb-6 text-sm leading-relaxed text-white">
					Learning with Arpitto felt like leveling up your skills with a program that actually delivers on depth and relevance. Biggest in track while exceeding job!
				</p>

				<div class="flex flex-wrap gap-2">
					<span class="rounded-full bg-white/20 px-3 py-1 text-xs text-white">#systemdesign</span>
					<span class="rounded-full bg-white/20 px-3 py-1 text-xs text-white">#learninpublic</span>
					<span class="rounded-full bg-white/20 px-3 py-1 text-xs text-white">#system3</span>
					<span class="rounded-full bg-white/20 px-3 py-1 text-xs text-white">#learningjourney</span>
					<span class="rounded-full bg-white/20 px-3 py-1 text-xs text-white">#onlineeducation</span>
				</div>

				<div class="mt-4 flex items-center gap-2 text-xs text-white/80">
					<div class="flex -space-x-2">
						<div class="h-6 w-6 rounded-full border-2 border-purple-800 bg-white"></div>
						<div class="h-6 w-6 rounded-full border-2 border-purple-800 bg-white"></div>
						<div class="h-6 w-6 rounded-full border-2 border-purple-800 bg-white"></div>
					</div>
					<span>Usha, Neerajm and 166 others</span>
					<span class="ml-auto">120 reposts</span>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQ Section -->
	<section class="mx-auto max-w-[1280px] px-6 py-20">
		<h2 class="mb-12 text-center text-3xl font-bold text-white">Frequently Asked Questions</h2>

		<div class="space-y-4">
			{#each faqs as faq, index}
				<div class="rounded-lg border border-gray-700 bg-gray-900/50">
					<button
						class="flex w-full items-center justify-between p-6 text-left"
						on:click={() => toggleFaq(index)}
					>
						<span class="text-sm text-gray-300">
							{index + 1}. {faq.question}
						</span>
						<svg
							class="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform {openFaqIndex === index ? 'rotate-45' : ''}"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
						</svg>
					</button>
					{#if openFaqIndex === index}
						<div class="border-t border-gray-700 px-6 py-4">
							<p class="text-sm text-gray-400">{faq.answer}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- Footer -->
	<footer class="border-t border-gray-800 bg-black/30 py-12">
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
