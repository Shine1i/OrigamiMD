<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { addNote } from '$lib/components/Layout/sidebar/sidebarController';
	import { fileHandlerStore } from '$lib/stores';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context';
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

<!--<Dialog.Root bind:open>-->
<!--	<Dialog.Content>-->
<!--		&lt;!&ndash;-->
<!--  This example requires some changes to your config:-->

<!--  ```-->
<!--  // tailwind.config.js-->
<!--  module.exports = {-->
<!--    // ...-->
<!--    plugins: [-->
<!--      // ...-->
<!--      require('@tailwindcss/forms'),-->
<!--    ],-->
<!--  }-->
<!--  ```-->
<!--&ndash;&gt;-->
<!--		<form action="#" class="relative">-->
<!--			<div-->
<!--				class="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"-->
<!--			>-->
<!--				<label for="title" class="sr-only">Title</label>-->
<!--				<input-->
<!--					type="text"-->
<!--					name="title"-->
<!--					id="title"-->
<!--					class="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"-->
<!--					placeholder="Title"-->
<!--				/>-->
<!--				<label for="description" class="sr-only">Description</label>-->
<!--				<textarea-->
<!--					rows="5"-->
<!--					name="description"-->
<!--					id="description"-->
<!--					class="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"-->
<!--					placeholder="Write a description..."-->
<!--				></textarea>-->

<!--				&lt;!&ndash; Spacer element to match the height of the toolbar &ndash;&gt;-->
<!--				<div aria-hidden="true">-->
<!--					<div class="py-2">-->
<!--						<div class="h-9"></div>-->
<!--					</div>-->
<!--					<div class="h-px"></div>-->
<!--					<div class="py-2">-->
<!--						<div class="py-px">-->
<!--							<div class="h-9"></div>-->
<!--						</div>-->
<!--					</div>-->
<!--				</div>-->
<!--			</div>-->

<!--			<div class="absolute inset-x-px bottom-0">-->
<!--				&lt;!&ndash; Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. &ndash;&gt;-->
<!--				<div class="flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3">-->
<!--					<div class="flex-shrink-0">-->
<!--						<label id="listbox-label" class="sr-only">Add a label</label>-->
<!--						<div class="relative">-->
<!--							<button-->
<!--								type="button"-->
<!--								class="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3"-->
<!--								aria-haspopup="listbox"-->
<!--								aria-expanded="true"-->
<!--								aria-labelledby="listbox-label"-->
<!--							>-->
<!--								&lt;!&ndash; Selected: "text-gray-300", Default: "text-gray-500" &ndash;&gt;-->
<!--								<svg-->
<!--									class="h-5 w-5 flex-shrink-0 text-gray-300 sm:-ml-1"-->
<!--									viewBox="0 0 20 20"-->
<!--									fill="currentColor"-->
<!--									aria-hidden="true"-->
<!--								>-->
<!--									<path-->
<!--										fill-rule="evenodd"-->
<!--										d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z"-->
<!--										clip-rule="evenodd"-->
<!--									/>-->
<!--								</svg>-->
<!--								&lt;!&ndash; Selected: "text-gray-900" &ndash;&gt;-->
<!--								<span class="hidden truncate sm:ml-2 sm:block">Label</span>-->
<!--							</button>-->

<!--							&lt;!&ndash;-->
<!--								Select popover, show/hide based on select state.-->

<!--								Entering: ""-->
<!--									From: ""-->
<!--									To: ""-->
<!--								Leaving: "transition ease-in duration-100"-->
<!--									From: "opacity-100"-->
<!--									To: "opacity-0"-->
<!--							&ndash;&gt;-->
<!--							&lt;!&ndash;							<ul&ndash;&gt;-->
<!--							&lt;!&ndash;								class="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"&ndash;&gt;-->
<!--							&lt;!&ndash;								tabindex="-1"&ndash;&gt;-->
<!--							&lt;!&ndash;								role="listbox"&ndash;&gt;-->
<!--							&lt;!&ndash;								aria-labelledby="listbox-label"&ndash;&gt;-->
<!--							&lt;!&ndash;								aria-activedescendant="listbox-option-0"&ndash;&gt;-->
<!--							&lt;!&ndash;							>&ndash;&gt;-->
<!--							&lt;!&ndash;								&ndash;&gt;-->
<!--							&lt;!&ndash;									Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.&ndash;&gt;-->

<!--							&lt;!&ndash;									Highlighted: "bg-gray-100", Not Highlighted: "bg-white"&ndash;&gt;-->
<!--							&lt;!&ndash;								&ndash;&gt;-->
<!--							&lt;!&ndash;								<li&ndash;&gt;-->
<!--							&lt;!&ndash;									class="relative cursor-default select-none bg-white px-3 py-2"&ndash;&gt;-->
<!--							&lt;!&ndash;									id="listbox-option-0"&ndash;&gt;-->
<!--							&lt;!&ndash;									role="option"&ndash;&gt;-->
<!--							&lt;!&ndash;								>&ndash;&gt;-->
<!--							&lt;!&ndash;									<div class="flex items-center">&ndash;&gt;-->
<!--							&lt;!&ndash;										<span class="block truncate font-medium">Unlabelled</span>&ndash;&gt;-->
<!--							&lt;!&ndash;									</div>&ndash;&gt;-->
<!--							&lt;!&ndash;								</li>&ndash;&gt;-->
<!--							&lt;!&ndash;							&ndash;&gt;-->
<!--							&lt;!&ndash;									Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.&ndash;&gt;-->

<!--							&lt;!&ndash;									Highlighted: "bg-gray-100", Not Highlighted: "bg-white"&ndash;&gt;-->
<!--							&lt;!&ndash;								&ndash;&gt;-->
<!--							&lt;!&ndash;								<li&ndash;&gt;-->
<!--							&lt;!&ndash;									class="relative cursor-default select-none bg-white px-3 py-2"&ndash;&gt;-->
<!--							&lt;!&ndash;									id="listbox-option-1"&ndash;&gt;-->
<!--							&lt;!&ndash;									role="option"&ndash;&gt;-->
<!--							&lt;!&ndash;								>&ndash;&gt;-->
<!--							&lt;!&ndash;									<div class="flex items-center">&ndash;&gt;-->
<!--							&lt;!&ndash;										<span class="block truncate font-medium">Engineering</span>&ndash;&gt;-->
<!--							&lt;!&ndash;									</div>&ndash;&gt;-->
<!--							&lt;!&ndash;								</li>&ndash;&gt;-->

<!--							&lt;!&ndash;						&ndash;&gt;-->
<!--							&lt;!&ndash;							</ul>&ndash;&gt;-->
<!--						</div>-->
<!--					</div>-->

<!--					<div class="flex-shrink-0">-->
<!--						<label id="listbox-label" class="sr-only">Add a due date</label>-->
<!--						<div class="relative">-->
<!--							<button-->
<!--								type="button"-->
<!--								class="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3"-->
<!--								aria-haspopup="listbox"-->
<!--								aria-expanded="true"-->
<!--								aria-labelledby="listbox-label"-->
<!--							>-->
<!--								&lt;!&ndash; Selected: "text-gray-300", Default: "text-gray-500" &ndash;&gt;-->
<!--								<svg-->
<!--									class="h-5 w-5 flex-shrink-0 text-gray-300 sm:-ml-1"-->
<!--									viewBox="0 0 20 20"-->
<!--									fill="currentColor"-->
<!--									aria-hidden="true"-->
<!--								>-->
<!--									<path-->
<!--										fill-rule="evenodd"-->
<!--										d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"-->
<!--										clip-rule="evenodd"-->
<!--									/>-->
<!--								</svg>-->
<!--								&lt;!&ndash; Selected: "text-gray-900" &ndash;&gt;-->
<!--								<span class="hidden truncate sm:ml-2 sm:block">Due date</span>-->
<!--							</button>-->

<!--							&lt;!&ndash;-->
<!--								Select popover, show/hide based on select state.-->

<!--								Entering: ""-->
<!--									From: ""-->
<!--									To: ""-->
<!--								Leaving: "transition ease-in duration-100"-->
<!--									From: "opacity-100"-->
<!--									To: "opacity-0"-->
<!--							&ndash;&gt;-->
<!--						</div>-->
<!--					</div>-->
<!--				</div>-->
<!--				<div-->
<!--					class="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3"-->
<!--				>-->
<!--					<div class="flex">-->
<!--						<button-->
<!--							type="button"-->
<!--							class="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"-->
<!--						>-->
<!--							<svg-->
<!--								class="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500"-->
<!--								viewBox="0 0 20 20"-->
<!--								fill="currentColor"-->
<!--								aria-hidden="true"-->
<!--							>-->
<!--								<path-->
<!--									fill-rule="evenodd"-->
<!--									d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"-->
<!--									clip-rule="evenodd"-->
<!--								/>-->
<!--							</svg>-->
<!--							<span class="text-sm italic text-gray-500 group-hover:text-gray-600"-->
<!--								>Attach a file</span-->
<!--							>-->
<!--						</button>-->
<!--					</div>-->
<!--					<div class="flex-shrink-0">-->
<!--						<button-->
<!--							type="submit"-->
<!--							class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"-->
<!--							>Create</button-->
<!--						>-->
<!--					</div>-->
<!--				</div>-->
<!--			</div>-->
<!--		</form>-->

<!--		&lt;!&ndash;		<Dialog.Footer>&ndash;&gt;-->
<!--		&lt;!&ndash;			<Button&ndash;&gt;-->
<!--		&lt;!&ndash;				on:click={() => {&ndash;&gt;-->
<!--		&lt;!&ndash;					open = false;&ndash;&gt;-->
<!--		&lt;!&ndash;				}}&ndash;&gt;-->
<!--		&lt;!&ndash;				class="bg-dracula-purple">Create Note</Button&ndash;&gt;-->
<!--		&lt;!&ndash;			>&ndash;&gt;-->
<!--		&lt;!&ndash;		</Dialog.Footer>&ndash;&gt;-->
<!--	</Dialog.Content>-->
<!--</Dialog.Root>-->
<!--
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
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
					class="block w-full border-0 bg-secondary pt-2.5 text-center text-lg font-medium placeholder:text-gray-400 focus:outline-none focus:ring-0"
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
