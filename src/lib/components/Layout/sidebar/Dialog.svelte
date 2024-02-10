<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { addNote } from '$lib/components/Layout/sidebar/sidebarController';
	import { fileHandlerStore } from '$lib/stores';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context';
	import { Check } from 'radix-icons-svelte';
	export let open: boolean;
	let noteName: string;
	let api: CarouselAPI;
	let current = 0;

	$: if (api) {
		api.on('select', () => {
			current = api.selectedScrollSnap() + 1;
		});
	}
	let selected = 'Note';
	function onChange(event) {
		selected = event.currentTarget.value;
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Select File Template</Dialog.Title>
			<Dialog.Description>
				Choose a Note or Kanban Board template, name your file, and click "Create Note".
			</Dialog.Description>
		</Dialog.Header>
		<Carousel.Root
			bind:api
			opts={{
				align: 'start',
				loop: true
			}}
			class="mx-auto w-full max-w-sm"
		>
			<Carousel.Content>
				{#each Array(5) as _, i (i)}
					<Carousel.Item class="md:basis-1/2 lg:basis-1/3">
						<button
							class="relative w-32 p-1"
							on:click={() => {
								current = i + 1;
								api.on('select', () => {
									current = api.selectedScrollSnap() + 1;
								});
							}}
						>
							{#if i === current - 1}
								<span
									class="absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-dracula-purple text-white"
								>
									<Check />
								</span>
							{/if}
							<Card.Root>
								<Card.Content class="flex aspect-square items-center justify-center p-6">
									<span class="text-3xl font-semibold">{i + 1}</span>
								</Card.Content>
							</Card.Root>
						</button>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
		<fieldset>
			<div class="flex gap-2">
				<!-- Active: "border-indigo-600 ring-2 ring-indigo-600", Not Active: "border-gray-300" -->
				<label
					class="relative block h-fit w-1/2 cursor-pointer rounded-lg border px-6 py-4 text-popover-foreground shadow-sm focus:outline-none sm:flex sm:justify-between"
				>
					<input
						type="radio"
						name="server-size"
						value="Note"
						class="sr-only"
						checked={selected === 'Note'}
						on:change={onChange}
						aria-labelledby="server-size-0-label"
						aria-describedby="server-size-0-description-0 server-size-0-description-1"
					/>

					<span class="flex items-center">
						<span class="flex flex-col text-sm">
							<span id="server-size-0-label" class="font-medium">Note</span>
							<span id="server-size-0-description-0" class="text-gray-500">
								<span class="block sm:inline">Simple Markdown Note</span>
							</span>
						</span>
					</span>

					<span
						class={`pointer-events-none absolute -inset-px rounded-lg border-2 ${selected === 'Note' ? 'border-indigo-600' : 'border-transparent'}`}
						aria-hidden="true"
					></span>
				</label>
				<label
					class="relative block h-fit w-1/2 cursor-pointer rounded-lg border px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between"
				>
					<input
						type="radio"
						name="server-size"
						checked={selected === 'Board'}
						on:change={onChange}
						value="Board"
						class="sr-only"
						aria-labelledby="server-size-0-label"
						aria-describedby="server-size-0-description-0 server-size-0-description-1"
					/>
					<span class="flex items-center">
						<span class="flex flex-col text-sm">
							<span id="server-size-0-label" class="font-medium">Kanban Board</span>
							<span id="server-size-0-description-0" class="text-gray-500">
								<span class="block sm:inline">Tasks progression system</span>
							</span>
						</span>
					</span>

					<!--
						Active: "border", Not Active: "border-2"
						Checked: "border-indigo-600", Not Checked: "border-transparent"
					-->
					<span
						class={`pointer-events-none absolute -inset-px rounded-lg border-2  ${selected === 'Board' ? 'border-indigo-600' : 'border-transparent'}`}
						aria-hidden="true"
					></span>
				</label>
			</div>
		</fieldset>

		<div class="grid w-full items-center gap-1.5 pt-5">
			<Label for="email">Note Name</Label>
			<Input
				bind:value={noteName}
				class="focus-visible:ring-dracula-purple"
				placeholder="MyNote..."
			/>
		</div>
		<Dialog.Footer>
			<Button
				on:click={() => {
					open = false;
					addNote($fileHandlerStore, noteName);
				}}
				class="bg-dracula-purple">Create Note</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
