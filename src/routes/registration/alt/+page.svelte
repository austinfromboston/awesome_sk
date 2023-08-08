<script lang="ts">
    import Form from '$lib/components/forms/reg.svelte'

    export let data
</script>

<div class="container mt-32">
    <h1 class="capitalize">Register for {data.registrationEvent.name}</h1>
    <Form data={data.form} baseAdult={data.baseAdult} baseKid={data.baseKid} />
</div>