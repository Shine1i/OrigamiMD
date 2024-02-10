<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { addNote } from '$lib/components/Layout/sidebar/sidebarController';
	import { fileHandlerStore } from '$lib/stores';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let open: boolean;
	// addNote($fileHandlerStore);
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Create your new note</Dialog.Title>
			<section>
				<h2>Select Teamp</h2>
				<div></div>
				<div></div>
			</section>
			<div class="grid w-full max-w-sm items-center gap-1.5 pt-5">
				<Label for="email">Note Name</Label>
				<Input placeholder="MyNote..." />
			</div>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
