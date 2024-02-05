<script>
	import { appWindow } from '@tauri-apps/api/window';
	import { onMount } from 'svelte';
	onMount(() => {
		document
			.getElementById('titlebar-minimize')
			.addEventListener('click', () => appWindow.minimize());
		document
			.getElementById('titlebar-maximize')
			.addEventListener('click', () => appWindow.toggleMaximize());
		document.getElementById('titlebar-close').addEventListener('click', () => appWindow.close());
	});
</script>

<div
	data-tauri-drag-region
	class="titlebar bg-dracula-background flex h-8 items-center justify-between"
>
	<div class="titlebar-appname pointer-events-none mx-auto w-fit text-center font-black">
		Origami
	</div>
	<div class="controls flex items-center">
		<div class="titlebar-button group cursor-pointer" id="titlebar-minimize">
			<svg width="30" height="30" class="fill-dracula-yellow group-hover:fill-dracula-yellow/70">
				<circle cx="15" cy="15" r="6" />
			</svg>
		</div>
		<div class="titlebar-button group cursor-pointer" id="titlebar-maximize">
			<svg width="30" height="30" class="fill-dracula-green group-hover:fill-dracula-green/70">
				<circle cx="15" cy="15" r="6" />
			</svg>
		</div>
		<div class="titlebar-button group cursor-pointer" id="titlebar-close">
			<svg width="30" height="30" class="fill-dracula-red group-hover:fill-dracula-red/70">
				<circle cx="15" cy="15" r="6" />
			</svg>
		</div>
	</div>
</div>

<style>
	.titlebar {
		user-select: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
	}
</style>
