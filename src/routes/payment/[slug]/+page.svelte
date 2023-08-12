<script lang="ts">
    import { goto } from '$app/navigation'
    import { loadStripe } from '@stripe/stripe-js'
    import { Elements, PaymentElement, PaymentRequestButton } from 'svelte-stripe'
    import { onMount } from 'svelte'
    import { PUBLIC_STRIPE_KEY } from '$env/static/public'

    let stripe = null
    let error = null
    let elements
    let processing = false

    export let data

    onMount(async () => {
        stripe = await loadStripe(PUBLIC_STRIPE_KEY)
    })

    async function submit() {
        // avoid processing duplicates
        if (processing) return

        processing = true

        // confirm payment with stripe
        const result = await stripe.confirmPayment({
            elements,
            redirect: 'if_required'
        })

        // log results, for debugging
        console.log({ result })

        if (result.error) {
            // payment failed, notify user
            error = result.error
            processing = false
        } else {
            // payment succeeded, redirect to "thank you" page
            goto(`/registration/${data.slug}`)
        }
    }

    const paymentRequest = {
        country: 'US',
        currency: 'usd',
        total: { label: 'Reg total', amount: data.total },
        requestPayerName: true,
        requestPayerEmail: true
    }


    async function pay(e) {
        const paymentMethod = e.detail.paymentMethod

        let result = await stripe.confirmCardPayment(data.clientSecret, { payment_method: paymentMethod.id })

        if (result.error) {
            e.detail.complete('fail')

            // payment failed, notify user
            error = result.error
        } else {
            e.detail.complete('success')

            // payment succeeded, redirect to "thank you" page
            goto(`/registration/${data.slug}`)
        }
    }

</script>

<div class="card mt-8 p-8">
    <h3 class="mb-2">Please Pay ${data.total/100} to Complete Registration</h3>
    {#if stripe}
        <form on:submit|preventDefault="{submit}">
            <Elements
                    {stripe}
                    clientSecret={data.clientSecret}
                    bind:elements
                    theme="flat"
            >
                <PaymentElement />
                <div class="p-4">
                    <PaymentRequestButton {paymentRequest} on:paymentmethod="{pay}" />
                </div>
            </Elements>

            {#if error}
                <p class="text-red-400">{error.message} Please try again.</p>
            {/if}
            <button class="btn variant-filled-primary mt-4">Pay</button>
        </form>
    {/if}
</div>

<style>
    .card {
        background: pink;
    }
</style>