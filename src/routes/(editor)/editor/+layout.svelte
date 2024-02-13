<script lang="ts">
	import * as Menubar from '$lib/components/ui/menubar';
	import Sidebar from '$lib/components/Layout/sidebar/Sidebar.svelte';
	import Titlebar from '$lib/components/Layout/Titlebar.svelte';
	import * as Command from '$lib/components/ui/command';
	import { Toaster } from '$lib/components/ui/sonner';
	import { editorStore } from '$lib/stores';
	import { onMount } from 'svelte';

	import CommandMeny from '$lib/components/Layout/CommandMeny.svelte';
	import {
		FileMinus,
		FilePlus,
		FileText,
		Heart,
		HeartFilled,
		LockClosed,
		LockOpen2
	} from 'radix-icons-svelte';
	let bookmarks = false;
	let fullUrls = true;
	// const profileRadioValue = 'benoit';
	let show = false;
	let open = false;
	onMount(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				console.log('open');
				e.preventDefault();
				open = !open;
			}
		}
		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<Command.Dialog bind:open>
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Files">
			<Command.Item>
				<FilePlus class="mr-2 h-4 w-4" />
				<span>Add New File...</span>
				<Command.Shortcut>Ctrl+N</Command.Shortcut>
			</Command.Item>
			<Command.Item>
				<FileMinus class="mr-2 h-4 w-4" />
				<span>Delete Current Note...</span>
				<Command.Shortcut>Ctrl+D</Command.Shortcut>
			</Command.Item>
			<Command.Item>
				<Heart class="mr-2 h-4 w-4" />
				<span>Favorite Current Note...</span>
				<Command.Shortcut>Ctrl+D</Command.Shortcut>
			</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Dialog>

<Menubar.Root class="fixed top-8 z-[60] w-full border-none ">
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
		class=" h-full w-full translate-x-0 transform pl-72 transition duration-300 ease-in-out"
	>
		<div class="h-full w-full overflow-hidden px-2 pt-20">
			<slot />
		</div>
	</main>
</div>
<div
	class:expanded={show}
	class="fixed inset-x-0 bottom-0 z-10 flex h-6 w-full translate-x-0 transform items-center justify-between divide-x bg-background shadow-sm transition duration-300 ease-in-out sm:gap-x-6 lg:pl-72"
>
	<button
		class="pl-2"
		on:click={() => {
			show = !show;
		}}
	>
		<svg
			class="cursor-pointer stroke-muted-foreground opacity-70 hover:opacity-100"
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
	{#if $editorStore.editor}
		<div class="flex items-center gap-4 divide-x">
			<button on:click={() => $editorStore.editor.setEditable(!$editorStore.editor.isEditable)}>
				{#if $editorStore.editor.isEditable}
					<LockOpen2 color="#94a3b8" />
				{:else}
					<LockClosed color="#94a3b8" />
				{/if}
			</button>
			<nav class=" flex" aria-label="Breadcrumb">
				<ol role="list" class="flex items-center space-x-4">
					<li>
						<div>
							<a href="#" class="text-muted-foreground hover:text-gray-500">
								<svg
									class="h-5 w-5 flex-shrink-0"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
										clip-rule="evenodd"
									/>
								</svg>
								<span class="sr-only">Home</span>
							</a>
						</div>
					</li>
					<li>
						<div class="flex items-center">
							<svg
								class="h-5 w-5 flex-shrink-0 text-gray-400"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
									clip-rule="evenodd"
								/>
							</svg>
							<a href="#" class="ml-4 text-sm font-medium text-muted-foreground hover:text-gray-500"
								>Notes</a
							>
						</div>
					</li>
					<li>
						<div class="flex items-center">
							<svg
								class="h-5 w-5 flex-shrink-0 text-gray-400"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
									clip-rule="evenodd"
								/>
							</svg>
							<a
								href="#"
								class="ml-4 text-sm font-medium text-muted-foreground hover:text-gray-500"
								aria-current="page">{$editorStore.currentNote}</a
							>
						</div>
					</li>
				</ol>
			</nav>

			<span class="pl-1 pr-2 text-sm text-muted-foreground">
				{$editorStore.editor.storage.characterCount.words()} words
			</span>
		</div>
	{/if}
</div>

<style>
</style>
