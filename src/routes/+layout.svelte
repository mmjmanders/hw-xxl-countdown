<script lang="ts">
	import '@fontsource-variable/open-sans';
	import '@fontsource-variable/google-sans-code';
	import './layout.css';
	import { pwaInfo } from 'virtual:pwa-info';

	let { children } = $props();
	const webManifestHref = $derived(pwaInfo?.webManifest?.href || undefined);
</script>

<svelte:head>
	{#if webManifestHref}
		<link rel="manifest" href={webManifestHref} />
	{/if}
</svelte:head>

{@render children()}
