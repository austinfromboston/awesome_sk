<script lang="ts">
    import { page } from '$app/stores'

    import '@skeletonlabs/skeleton/themes/theme-crimson.css'
    import '@skeletonlabs/skeleton/styles/all.css'
    import '../app.postcss'

</script>

<svelte:head>
    <title>Registration</title>
<!--    <link rel="icon" href="https://fav.farm/🌲" />-->
    <link rel="icon" href="/favicon.ico" />
</svelte:head>

<div class="container mb-12">
    <slot />
</div>
<div class="bottom-block"></div>

<style>
    .bottom-block {
        min-height: 100px;
    }
</style>