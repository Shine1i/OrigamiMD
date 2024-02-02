<script lang="ts">
	import { Archive, FileText } from 'radix-icons-svelte';
	import { onMount } from 'svelte';
	import { fileHandlerStore, markdownStore, selectedNoteStore } from '$lib/stores';
	import { Directory } from '$lib';

	export let show: boolean;

	let notes: string[] = [];

	let fileHandler;

	let directory: Directory;

	fileHandlerStore.subscribe((value) => {
		fileHandler = value;
		directory = new Directory(fileHandler);
	});
	onMount(async () => {
		try {
			if (directory) {
				notes = await directory.getNotes();
				console.log('notes', notes);
			}
		} catch (error) {
			console.error('Error reading notes directory: ', error);
		}
	});

	const selectNote = async (noteName: string) => {
		selectedNoteStore.set(noteName);
		console.log(await directory.getFileContent(noteName));
		const markdownContent = await directory.getFileContent(noteName);
		markdownStore.set(markdownContent);
	};
</script>

<aside
	class:!-translate-x-full={show}
	class="hidden translate-x-0 transform border-r pt-6 transition duration-300 ease-in-out lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
>
	<div
		class:!opacity-0={show}
		class="fixed inset-0 bg-primary/10 opacity-100 transition-opacity duration-300 ease-linear"
	></div>
	<div class="flex grow flex-col gap-y-5 overflow-y-auto border-r">
		<div class="flex h-16 shrink-0 items-center">
			<img
				class="h-8 w-auto"
				src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
				alt="Your Company"
			/>
		</div>
		<nav class="flex flex-1 flex-col">
			<ul role="list" class="z-[100] flex w-full flex-1 flex-col gap-y-3 text-sm">
				<li class="flex gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="h-5 w-5"
					>
						<path
							d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 0 0-3-3h-3.879a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H6a3 3 0 0 0-3 3v3.162A3.756 3.756 0 0 1 4.094 9h15.812ZM4.094 10.5a2.25 2.25 0 0 0-2.227 2.568l.857 6A2.25 2.25 0 0 0 4.951 21H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-2.227-2.568H4.094Z"
						/>
					</svg>
					<span>Notes</span>
				</li>
				{#each notes as note (note)}
					<button on:click={() => selectNote(note)}>
						<li class="flex cursor-pointer gap-1 p-2 pl-3 hover:bg-muted">
							<FileText size={20} />

							<span>{note}</span>
						</li>
					</button>
				{/each}
				<li class="mt-auto flex w-full items-center justify-center text-center">
					<button
						class="group w-full text-sm font-semibold leading-5 text-gray-600 hover:bg-gray-500/20"
					>
						Open Folder...
					</button>
				</li>
			</ul>
		</nav>
	</div>
</aside>
