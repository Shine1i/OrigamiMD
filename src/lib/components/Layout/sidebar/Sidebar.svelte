<script lang="ts">
	import { FileText } from 'radix-icons-svelte';
	import { onMount } from 'svelte';
	import { editorStore, fileHandlerStore } from '$lib/stores';
	import {
		addNote,
		deleteNote,
		getNotes,
		selectNote
	} from '$lib/components/Layout/sidebar/sidebarController';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	export let show: boolean;

	let notes: string[] = [];
	import * as Tabs from '$lib/components/ui/tabs';
	import Toc from '$lib/components/Layout/sidebar/Toc.svelte';
	onMount(async () => {
		try {
			await getNotes($fileHandlerStore);
		} catch (error) {
			console.error('Error reading notes $fileHandlerStore: ', error);
		}
	});
	editorStore.subscribe((state) => {
		notes = state.notes;
	});
	let tab: number = 0;
</script>

<aside
	class:!-translate-x-full={show}
	class="mt-16 hidden translate-x-0 transform border-r transition duration-300 ease-in-out lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
>
	<div
		class:!opacity-100={show}
		class="fixed inset-0 bg-primary/10 opacity-0 transition-opacity duration-300 ease-linear"
	></div>
	<div class="flex grow flex-col gap-y-2 overflow-y-auto border-r">
		<div class="relative z-[10000] flex h-fit w-full shrink-0 items-center pt-2">
			<nav class="-mb-px flex w-full justify-around space-x-8" aria-label="Tabs">
				<button
					on:click={() => {
						tab = 0;
					}}
					class="w-1/2 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-dracula-purple hover:text-muted-foreground/70"
					>My Account</button
				>
				<button
					on:click={() => {
						tab = 2;
					}}
					class="w-1/2 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-muted-foreground hover:border-dracula-purple hover:text-muted-foreground/70"
					>Table of content</button
				>
			</nav>
		</div>
		<nav class="flex flex-1 flex-col">
			{#if tab === 0}
				<ul
					role="list"
					class="relative z-50 flex min-h-full w-full flex-1 flex-col gap-y-1 px-4 text-sm"
				>
					<ContextMenu.Root>
						<ContextMenu.Trigger>
							<div
								class:!opacity-100={show}
								class="fixed inset-0 bg-primary/10 opacity-0 transition-opacity duration-300 ease-linear"
							></div>
						</ContextMenu.Trigger>
						<ContextMenu.Content class="w-64">
							<ContextMenu.Item
								inset
								class="cursor-pointer"
								on:click={() => addNote($fileHandlerStore)}
							>
								Add Note
								<ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
							</ContextMenu.Item>
						</ContextMenu.Content>
					</ContextMenu.Root>
					<li class="flex gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="h-4 w-4"
						>
							<path
								d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 0 0-3-3h-3.879a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H6a3 3 0 0 0-3 3v3.162A3.756 3.756 0 0 1 4.094 9h15.812ZM4.094 10.5a2.25 2.25 0 0 0-2.227 2.568l.857 6A2.25 2.25 0 0 0 4.951 21H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-2.227-2.568H4.094Z"
							/>
						</svg>
						<span>Notes</span>
					</li>
					{#each notes as note (note)}
						<ContextMenu.Root>
							<ContextMenu.Trigger class="z-[999] min-w-full">
								<button
									class=" w-full cursor-pointer"
									on:click={() => selectNote(note, $fileHandlerStore)}
								>
									<li class=" flex w-full cursor-pointer gap-1 p-2 pl-3 hover:bg-accent">
										<FileText size={15} />
										<span>{note}</span>
									</li>
								</button>
							</ContextMenu.Trigger>
							<ContextMenu.Content class="w-64">
								<ContextMenu.Item
									class="cursor-pointer"
									inset
									on:click={() => deleteNote(note, $fileHandlerStore)}
									>Delete Note
									<ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
								</ContextMenu.Item>
								<ContextMenu.Item inset class="cursor-pointer">
									Forward
									<ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
								</ContextMenu.Item>
								<ContextMenu.Item inset class="cursor-pointer">
									Reload
									<ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
								</ContextMenu.Item>
							</ContextMenu.Content>
						</ContextMenu.Root>
					{/each}
					<li class="mt-auto flex w-full items-center justify-center text-center">
						<button
							class="group w-full text-sm font-semibold leading-5 text-gray-600 hover:bg-gray-500/20"
						>
							Open Folder...
						</button>
					</li>
				</ul>
			{:else if $editorStore.toc !== null}
				<Toc itemList={$editorStore.toc} />
			{/if}
		</nav>
	</div>
</aside>
