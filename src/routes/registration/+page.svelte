<script lang="ts">
    import Form from '$lib/components/forms/reg.svelte'

    export let data
</script>

<div class="container mt-32">
    <h1 class="capitalize">Register for {data.registrationEvent.name}</h1>
    <Form
        regData={data.form}
        baseAdult={data.baseAdult}
        baseKid={data.baseKid}
        registrationEvent={data.registrationEvent}
        pricelist={Object.entries(data.registrationEvent.prices.public).sort(([_, amt1], [__, amt2]) => amt1-amt2)}
    />
</div>