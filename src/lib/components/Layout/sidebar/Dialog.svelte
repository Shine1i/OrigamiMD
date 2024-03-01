<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { addNote } from '$lib/components/Layout/sidebar/sidebarController';
	import { fileHandlerStore } from '$lib/stores';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Check, CaretSort } from 'radix-icons-svelte';
	import { cn } from '$lib/utils';
	const frameworks = [
		{
			value: 'MathAB1',
			label: 'MathAB1'
		},
		{
			value: 'Eng101',
			label: 'Eng101'
		},
		{
			value: 'Bio202',
			label: 'Bio202'
		},
		{
			value: 'Hist301',
			label: 'Hist301'
		},
		{
			value: 'astro',
			label: 'Astro'
		}
	];

	let label = '';
	$: selectedLabel = frameworks.find((f) => f.value === label)?.label ?? 'Select a framework...';

	export let open: boolean;
	let showStatusBar = true;
	let showActivityBar = false;
	let showPanel = false;
	let noteName: string;
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { tick } from 'svelte';
	type Status = {
		value: string;
		label: string;
	};

	const statuses: Status[] = [
		{
			value: 'backlog',
			label: 'Backlog'
		},
		{
			value: 'todo',
			label: 'Todo'
		},
		{
			value: 'in progress',
			label: 'In Progress'
		},
		{
			value: 'done',
			label: 'Done'
		},
		{
			value: 'canceled',
			label: 'Canceled'
		}
	];
	let opens = false;
	let openLabel = false;
	let value = '';
	$: selectedStatus = statuses.find((s) => s.value === value) ?? null;
	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		opens = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<form action="#" class="relative">
			<div class="overflow-hidden rounded-lg border shadow-sm ring-1 ring-border">
				<label for="title" class="sr-only">Title</label>
				<input
					type="text"
					name="title"
					bind:value={noteName}
					id="title"
					class="block w-full border-0 bg-secondary pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:outline-none focus:ring-0"
					placeholder="Title"
				/>
				<label for="description" class="sr-only">Description</label>
				<textarea
					rows="4"
					name="description"
					id="description"
					class="block w-full resize-none border-0 bg-secondary py-0 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
					placeholder="Write a description..."
				></textarea>

				<!-- Spacer element to match the height of the toolbar -->
				<div aria-hidden="true">
					<div class="py-2">
						<div class="h-4"></div>
					</div>
					<div class="h-px"></div>
					<div class="py-2">
						<div class="py-px"></div>
					</div>
				</div>
			</div>

			<div class="absolute inset-x-px bottom-0">
				<!-- Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. -->
				<div class="flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3">
					<div class="flex-shrink-0">
						<Popover.Root bind:openLabel let:ids>
							<Popover.Trigger asChild let:builder>
								<Button
									variant="ghost"
									role="combobox"
									aria-expanded={openLabel}
									class="rounded-2xl hover:bg-teal-500/70"
									builders={[builder]}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 16 16"
										fill="currentColor"
										class="mr-2 h-4 w-4"
									>
										<path
											fill-rule="evenodd"
											d="M4.5 2A2.5 2.5 0 0 0 2 4.5v2.879a2.5 2.5 0 0 0 .732 1.767l4.5 4.5a2.5 2.5 0 0 0 3.536 0l2.878-2.878a2.5 2.5 0 0 0 0-3.536l-4.5-4.5A2.5 2.5 0 0 0 7.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
											clip-rule="evenodd"
										/>
									</svg>
									Label
								</Button>
								<!--								<Button-->
								<!--									builders={[builder]}-->
								<!--									variant="outline"-->
								<!--									role="combobox"-->
								<!--									aria-expanded={open}-->
								<!--									class="w-[200px] justify-between"-->
								<!--								>-->
								<!--									{selectedLabel}-->
								<!--									<CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />-->
								<!--								</Button>-->
							</Popover.Trigger>
							<Popover.Content class="w-[200px] p-0">
								<Command.Root>
									<Command.Input placeholder="Search framework..." class="h-9" />
									<Command.Empty>No framework found.</Command.Empty>
									<Command.Group>
										{#each frameworks as framework}
											<Command.Item
												value={framework.value}
												onSelect={(currentValue) => {
													value = currentValue;
													closeAndFocusTrigger(ids.trigger);
												}}
											>
												<Check
													class={cn(
														'mr-2 h-4 w-4',
														value !== framework.value && 'text-transparent'
													)}
												/>
												{framework.label}
											</Command.Item>
										{/each}
									</Command.Group>
								</Command.Root>
							</Popover.Content>
						</Popover.Root>
						<Popover.Root>
							<Popover.Trigger asChild let:builder>
								<Button
									variant="ghost"
									class="rounded-2xl hover:bg-teal-500/70"
									builders={[builder]}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 16 16"
										fill="currentColor"
										class="mr-2 h-4 w-4"
									>
										<path
											fill-rule="evenodd"
											d="M4.5 2A2.5 2.5 0 0 0 2 4.5v2.879a2.5 2.5 0 0 0 .732 1.767l4.5 4.5a2.5 2.5 0 0 0 3.536 0l2.878-2.878a2.5 2.5 0 0 0 0-3.536l-4.5-4.5A2.5 2.5 0 0 0 7.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
											clip-rule="evenodd"
										/>
									</svg>
									Label
								</Button>
							</Popover.Trigger>

							<Popover.Content>Place content for the popover here.</Popover.Content>
						</Popover.Root>
					</div>

					<div class="flex-shrink-0">
						<Popover.Root>
							<Popover.Trigger asChild let:builder>
								<Button
									variant="ghost"
									class="rounded-2xl hover:bg-teal-500/70"
									builders={[builder]}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 16 16"
										fill="currentColor"
										class="mr-2 h-4 w-4"
									>
										<path
											fill-rule="evenodd"
											d="M4.5 2A2.5 2.5 0 0 0 2 4.5v2.879a2.5 2.5 0 0 0 .732 1.767l4.5 4.5a2.5 2.5 0 0 0 3.536 0l2.878-2.878a2.5 2.5 0 0 0 0-3.536l-4.5-4.5A2.5 2.5 0 0 0 7.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
											clip-rule="evenodd"
										/>
									</svg>
									Label
								</Button>
							</Popover.Trigger>

							<Popover.Content>Place content for the popover here.</Popover.Content>
						</Popover.Root>
					</div>
				</div>
				<div
					class="flex items-center justify-between space-x-3 border-t border-gray-400 px-2 py-2 sm:px-3"
				>
					<div class="flex">
						<div class="flex items-center space-x-4">
							<p class="text-sm text-muted-foreground">Template</p>
							<Popover.Root bind:opens let:ids>
								<Popover.Trigger asChild let:builder>
									<Button builders={[builder]} variant="outline" class="w-[150px] justify-start">
										{selectedStatus ? selectedStatus.label : 'Empty'}
									</Button>
								</Popover.Trigger>
								<Popover.Content class="p-0" align="start" side="right">
									<Command.Root>
										<Command.Input placeholder="Select a Template..." />
										<Command.List>
											<Command.Empty>No results found.</Command.Empty>
											<Command.Group>
												{#each statuses as status}
													<Command.Item
														value={status.value}
														onSelect={(currentValue) => {
															value = currentValue;
															closeAndFocusTrigger(ids.trigger);
														}}
													>
														{status.label}
													</Command.Item>
												{/each}
											</Command.Group>
										</Command.List>
									</Command.Root>
								</Popover.Content>
							</Popover.Root>
						</div>
					</div>
					<div class="flex-shrink-0">
						<Button
							class="bg-dracula-selection"
							on:click={() => {
								open = false;
							}}>Cancel</Button
						>
						<Button
							class="bg-teal-500 hover:bg-teal-500/90"
							on:click={() => {
								addNote($fileHandlerStore, noteName);
								open = false;
							}}>Add Note</Button
						>
					</div>
				</div>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
