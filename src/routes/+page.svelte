<script lang="ts">
	import { PUBLIC_HW_DATE } from '$env/static/public';
	import dayjs from 'dayjs';

	const departureDate = $state(dayjs(PUBLIC_HW_DATE));
	let now = $state(dayjs());
	const diff = $derived.by(() => departureDate.diff(now));
	const days = $derived.by(() => Math.floor(diff / (24 * 60 * 60 * 1000)));
	const hours = $derived.by(() => Math.floor((diff / (60 * 60 * 1000)) % 24));
	const minutes = $derived.by(() => Math.floor((diff / (60 * 1000)) % 60));
	const seconds = $derived.by(() => Math.floor((diff / 1000) % 60));

	const daysText = $derived.by(() => (days === 1 ? 'dag' : 'dagen'));
	const hoursText = $derived.by(() => (hours === 1 ? 'uur' : 'uren'));
	const minutesText = $derived.by(() => (minutes === 1 ? 'minuut' : 'minuten'));
	const secondsText = $derived.by(() => (seconds === 1 ? 'seconde' : 'seconden'));

	$effect(() => {
		const interval = setInterval(() => {
			now = dayjs();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="flex flex-col items-center gap-4 p-2 text-ireland sm:gap-6">
	<h1 class="text-3xl font-bold sm:text-5xl">HW XX(L) Countdown</h1>
	<div class="flex w-full max-w-2xl">
		<div class="flex flex-1 flex-col items-center gap-4 sm:gap-6">
			<span class="font-mono text-6xl sm:text-8xl">{days}</span>
			<span class="text-xl sm:text-3xl">{daysText}</span>
		</div>
		<div class="flex flex-1 flex-col items-center gap-4 sm:gap-6">
			<span class="font-mono text-6xl sm:text-8xl">{hours}</span>
			<span class="text-xl sm:text-3xl">{hoursText}</span>
		</div>
		<div class="flex flex-1 flex-col items-center gap-4 sm:gap-6">
			<span class="font-mono text-6xl sm:text-8xl">{minutes}</span>
			<span class="text-xl sm:text-3xl">{minutesText}</span>
		</div>
		<div class="flex flex-1 flex-col items-center gap-4 sm:gap-6">
			<span class="font-mono text-6xl sm:text-8xl">{seconds}</span>
			<span class="text-xl sm:text-3xl">{secondsText}</span>
		</div>
	</div>
</div>
