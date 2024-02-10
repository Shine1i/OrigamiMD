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
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Select Note Template</Dialog.Title>
			<Dialog.Description>
				Create your note here. You can choose from various templates to get started quickly. Don't
				forget to click "Create Note".
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
		<div class="mx-auto grid w-full max-w-sm items-center gap-1.5 pt-5">
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
