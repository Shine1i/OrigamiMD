<script>
	import * as Card from '$lib/components/ui/card';
	import * as Accordion from '$lib/components/ui/accordion';
</script>

<!--
  This example requires updating your template:

  ```
  <html class="h-full bg-white">
  <body class="h-full">
  ```
-->
<div class="flex min-h-full flex-col pt-8">
	<!-- 3 column wrapper -->
	<div class="mx-auto w-full grow sm:max-w-6xl lg:flex lg:max-w-7xl xl:px-2">
		<!-- Left sidebar & main wrapper -->
		<div class="flex-1 xl:flex">
			<div class="flex flex-1 flex-col justify-center gap-20 px-2 py-6 sm:px-6 lg:pl-8 xl:pl-6">
				<!-- Main area -->
				<div class="">
					<h2 class="text-base font-semibold leading-6">Origami</h2>
					<p class="mt-1 text-sm text-gray-500">
						Capture thoughts, craft templates, and organize ideas with ease. Start your seamless
						note-taking journey now.
					</p>
					<ul
						role="list"
						class="0 mt-6 grid grid-cols-1 gap-6 border-b border-t py-6 sm:grid-cols-2"
					>
						<li class="flow-root">
							<div
								class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-secondary"
							>
								<div
									class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-pink-500"
								>
									<svg
										class="h-6 w-6 text-white"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
										/>
									</svg>
								</div>
								<div>
									<h3 class="text-sm font-medium">
										<a href="#" class="focus:outline-none">
											<span class="absolute inset-0" aria-hidden="true"></span>
											<span>Create a List</span>
											<span aria-hidden="true"> &rarr;</span>
										</a>
									</h3>
									<p class="mt-1 text-sm text-gray-500">
										Another to-do system you’ll try but eventually give up on.
									</p>
								</div>
							</div>
						</li>
						<li class="flow-root">
							<div
								class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-secondary"
							>
								<div
									class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-yellow-500"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="h-6 w-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
										/>
									</svg>
								</div>
								<div>
									<h3 class="text-sm font-medium">
										<a href="#" class="focus:outline-none">
											<span class="absolute inset-0" aria-hidden="true"></span>
											<span>Create a Folder</span>
											<span aria-hidden="true"> &rarr;</span>
										</a>
									</h3>
									<p class="mt-1 text-sm text-gray-500">
										Organize promptly - Create a folder for your notes.
									</p>
								</div>
							</div>
						</li>
						<li class="flow-root">
							<div
								class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-secondary"
							>
								<div
									class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-green-500"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="h-6 w-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
										/>
									</svg>
								</div>
								<div>
									<h3 class="text-sm font-medium">
										<a href="#" class="focus:outline-none">
											<span class="absolute inset-0" aria-hidden="true"></span>
											<span>Setup Git-sync</span>
											<span aria-hidden="true"> &rarr;</span>
										</a>
									</h3>
									<p class="mt-1 text-sm text-gray-500">
										Sync your thoughts - Set up Git-Sync for your notes now.
									</p>
								</div>
							</div>
						</li>
						<li class="flow-root">
							<div
								class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-secondary"
							>
								<div
									class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500"
								>
									<svg
										class="h-6 w-6 text-white"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z"
										/>
									</svg>
								</div>
								<div>
									<h3 class="text-sm font-medium">
										<a href="#" class="focus:outline-none">
											<span class="absolute inset-0" aria-hidden="true"></span>
											<span>Create a Board</span>
											<span aria-hidden="true"> &rarr;</span>
										</a>
									</h3>
									<p class="mt-1 text-sm text-gray-500">
										Track tasks in different stages of your project.
									</p>
								</div>
							</div>
						</li>
						<li class="flow-root">
							<div
								class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-secondary"
							>
								<div
									class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="h-6 w-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
										/>
									</svg>
								</div>
								<div>
									<h3 class="text-sm font-medium">
										<a href="#" class="focus:outline-none">
											<span class="absolute inset-0" aria-hidden="true"></span>
											<span>Create a Template</span>
											<span aria-hidden="true"> &rarr;</span>
										</a>
									</h3>
									<p class="mt-1 text-sm text-gray-500">
										Craft your notes blueprint - Create a template today.
									</p>
								</div>
							</div>
						</li>
						<li class="flow-root">
							<div
								class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-secondary"
							>
								<div
									class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-purple-500"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="h-6 w-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
										/>
									</svg>
								</div>
								<div>
									<h3 class="text-sm font-medium">
										<a href="#" class="focus:outline-none">
											<span class="absolute inset-0" aria-hidden="true"></span>
											<span>Tweak Settings </span>
											<span aria-hidden="true"> &rarr;</span>
										</a>
									</h3>
									<p class="mt-1 text-sm text-gray-500">
										Tweak your editor settings to your liking.
									</p>
								</div>
							</div>
						</li>
					</ul>
					<div class="mt-4 flex">
						<a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
							Or open existing folder
							<span aria-hidden="true"> &rarr;</span>
						</a>
					</div>
				</div>
				<!--			stats-->
				<!-- Statistics: Simple with Icons -->
				<div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-8">
					<!-- Card -->
					<div class="d flex flex-col overflow-hidden rounded-lg bg-secondary/60 shadow-sm">
						<div class="flex grow items-center justify-between p-5">
							<div
								class="flex size-16 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-700 dark:bg-opacity-25 dark:text-teal-300"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="inline-block size-8"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
									/>
								</svg>
							</div>
							<dl class="space-y-1 text-right">
								<dt class="text-2xl font-bold">36</dt>
								<dd
									class="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
								>
									Notes Created
								</dd>
							</dl>
						</div>
					</div>
					<!-- END Card -->

					<!-- Card -->
					<div class="flex flex-col overflow-hidden rounded-lg bg-secondary/60 shadow-sm">
						<div class="flex grow items-center justify-between p-5">
							<div
								class="flex size-16 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-700 dark:bg-opacity-25 dark:text-teal-300"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="inline-block size-8"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
									/>
								</svg>
							</div>
							<dl class="space-y-1 text-right">
								<dt class="text-xl font-bold">560</dt>
								<dd
									class="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
								>
									Average Length
								</dd>
							</dl>
						</div>
					</div>
					<!-- END Card -->

					<!-- Card -->
					<div class="flex flex-col overflow-hidden rounded-lg bg-secondary/60 shadow-sm">
						<div class="flex grow items-center justify-between p-5">
							<div
								class="flex size-16 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-700 dark:bg-opacity-25 dark:text-teal-300"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="inline-block size-8"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
									/>
								</svg>
							</div>
							<dl class="space-y-1 text-right">
								<dt class="text-2xl font-bold">4</dt>
								<dd
									class="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
								>
									Kanban Boards
								</dd>
							</dl>
						</div>
					</div>
					<!-- END Card -->
				</div>
				<!-- END Statistics: Simple with Icons -->

				<!--stats-->
			</div>
		</div>

		<div
			class="items-hbe flex shrink-0 flex-col justify-between px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6"
		>
			<!-- Right column area -->
			<Card.Root class="w-full">
				<Card.Header>
					<Card.Title>Recent Notes</Card.Title>
					<Card.Description>Recent Notes - Your latest thoughts.</Card.Description>
				</Card.Header>
				<Card.Content class="">
					<ul class="text-sm text-gray-700">
						{#each Array(4) as _}
							<li class=" group flex cursor-pointer select-none items-center rounded-md py-2 pl-1">
								<!-- Active: "text-white", Not Active: "text-gray-400" -->

								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-5 w-5 flex-none text-gray-500 group-hover:text-foreground"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
									/>
								</svg>

								<span class="ml-3 flex-auto truncate group-hover:text-white">Workflow</span>
								<!-- Not Active: "hidden" -->
								<span class="ml-3 hidden flex-none text-indigo-100 group-hover:block"
									>Jump to...</span
								>
							</li>
						{/each}
					</ul>
				</Card.Content>
			</Card.Root>
			<section class="w-full">
				<div>FaQ</div>
				<Accordion.Root>
					<Accordion.Item value="item-1">
						<Accordion.Trigger>Does it support Git Sync?</Accordion.Trigger>
						<Accordion.Content
							>Yes, our note-taking app supports Git Sync. This ensures all your notes are backed up
							and version-controlled.</Accordion.Content
						>
					</Accordion.Item>
					<Accordion.Item value="item-2">
						<Accordion.Trigger>Does it offer AI assistant?</Accordion.Trigger>
						<Accordion.Content
							>Yes, our app provides an AI assistant to help analyze your notes, offer suggestions,
							and help manage your note-taking process more efficiently.</Accordion.Content
						>
					</Accordion.Item>
					<Accordion.Item value="item-3">
						<Accordion.Trigger>Are there Note Templates?</Accordion.Trigger>
						<Accordion.Content
							>Yes, we offer a variety of note templates to assist you in starting and organizing
							your notes more effectively.</Accordion.Content
						>
					</Accordion.Item>
					<Accordion.Item value="item-4">
						<Accordion.Trigger>Is there a Kanban board?</Accordion.Trigger>
						<Accordion.Content
							>Yes, our app includes a visual kanban board feature that can help you manage your
							tasks and notes effectively.</Accordion.Content
						>
					</Accordion.Item>
					<Accordion.Item value="item-5">
						<Accordion.Trigger>What additional features does it have?</Accordion.Trigger>
						<Accordion.Content
							>Alongside Git Sync, AI assistance, Note Templates, and Kanban board, our note-taking
							app offers collaborative editing, cross-platform compatibility, and a robust tagging
							system to organize your notes better.</Accordion.Content
						>
					</Accordion.Item>
				</Accordion.Root>
			</section>
		</div>
	</div>
</div>
