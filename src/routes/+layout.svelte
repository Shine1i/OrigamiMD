<script lang="ts">
	import '../app.pcss';
	import * as Menubar from '$lib/components/ui/menubar';
	import '@milkdown/theme-nord/style.css';
	import Sidebar from '$lib/Layout/Sidebar.svelte';
	let bookmarks = false;
	let fullUrls = true;
	const profileRadioValue = 'benoit';
	let show = false;
</script>

<Menubar.Root class="fixed z-[60] w-full !border-b border-x-background border-t-background">
	<Menubar.Menu>
		<Menubar.Trigger>File</Menubar.Trigger>
		<Menubar.Content class="w-60">
			<Menubar.Item>
				New File <Menubar.Shortcut>Ctrl+N</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item>
				New Window <Menubar.Shortcut>Ctrl+Shift+N</Menubar.Shortcut>
			</Menubar.Item>

			<Menubar.Separator />
			<Menubar.Item>
				Close <Menubar.Shortcut>Ctrl + Q</Menubar.Shortcut>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>Edit</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>
				Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item>
				Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Sub>
				<Menubar.SubTrigger>Find</Menubar.SubTrigger>
				<Menubar.SubContent>
					<Menubar.Item>Search the web</Menubar.Item>
					<Menubar.Separator />
					<Menubar.Item>Find...</Menubar.Item>
					<Menubar.Item>Find Next</Menubar.Item>
					<Menubar.Item>Find Previous</Menubar.Item>
				</Menubar.SubContent>
			</Menubar.Sub>
			<Menubar.Separator />
			<Menubar.Item>Cut</Menubar.Item>
			<Menubar.Item>Copy</Menubar.Item>
			<Menubar.Item>Paste</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>View</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.CheckboxItem bind:checked={bookmarks}>Always Show Bookmarks Bar</Menubar.CheckboxItem
			>
			<Menubar.CheckboxItem bind:checked={fullUrls}>Always Show Full URLs</Menubar.CheckboxItem>
			<Menubar.Separator />
			<Menubar.Item inset>
				Reload <Menubar.Shortcut>⌘R</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item inset>
				Force Reload <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item inset>Toggle Fullscreen</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item inset>Hide Sidebar</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>

<Sidebar {show} />

<div class="h-full overflow-x-hidden">
	<main
		class:expanded={show}
		class=" h-full w-full translate-x-0 transform pl-72 pt-10 transition duration-300 ease-in-out"
	>
		<div class="h-full w-full overflow-hidden px-4 sm:px-6 lg:px-8">
			<slot />
		</div>
	</main>
</div>
<div
	class:!-translate-x-72={show}
	class="fixed inset-x-0 bottom-0 z-10 flex h-6 translate-x-0 transform items-center bg-background px-4 shadow-sm transition duration-300 ease-in-out sm:gap-x-6 lg:ml-72"
>
	<button
		on:click={() => {
			show = !show;
		}}
	>
		<svg
			class="cursor-pointer opacity-70 hover:opacity-100"
			width="15"
			height="15"
			viewBox="0 0 15 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			><path
				d="M8 2H13.5C13.7761 2 14 2.22386 14 2.5V12.5C14 12.7761 13.7761 13 13.5 13H8V2ZM7 2H1.5C1.22386 2 1 2.22386 1 2.5V12.5C1 12.7761 1.22386 13 1.5 13H7V2ZM0 2.5C0 1.67157 0.671573 1 1.5 1H13.5C14.3284 1 15 1.67157 15 2.5V12.5C15 13.3284 14.3284 14 13.5 14H1.5C0.671573 14 0 13.3284 0 12.5V2.5Z"
				fill="currentColor"
				fill-rule="evenodd"
				clip-rule="evenodd"
			></path></svg
		>
	</button>
</div>

<style>
</style>
