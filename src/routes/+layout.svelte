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

<div class="container">
    <slot />
</div>
