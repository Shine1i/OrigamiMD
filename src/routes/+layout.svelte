<script lang="ts">
	import '../app.pcss';
	import { Toaster } from '$lib/components/ui/sonner';
	import Titlebar from '$lib/components/Layout/Titlebar.svelte';
</script>

<slot />
<Toaster />
<Titlebar />
