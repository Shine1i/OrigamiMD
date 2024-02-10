<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { addNote } from '$lib/components/Layout/sidebar/sidebarController';
	import { fileHandlerStore } from '$lib/stores';
	import { Button } from '$lib/components/ui/button';
	export let open: boolean;
	// addNote($fileHandlerStore);
</script>

<Sheet.Root bind:open>
	<Sheet.Content side="left" class="mt-14">
		<Sheet.Header>
			<Sheet.Title>Are you sure absolutely sure?</Sheet.Title>
			<Sheet.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</Sheet.Description>
		</Sheet.Header>
		<Sheet.Footer>
			<Sheet.Close asChild let:builder>
				<Button builders={[builder]} variant="secondary">Cancel</Button>
			</Sheet.Close>
			<Sheet.Close asChild let:builder>
				<Button builders={[builder]}>Create Note</Button>
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
