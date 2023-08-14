<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client'
    import type { Validation } from 'sveltekit-superforms/index'
    import type { AnyZodObject } from 'zod'
    import { onMount } from 'svelte';

    export let regData: Validation<AnyZodObject> | string | undefined | null
    export let baseAdult: AnyZodObject
    export let baseKid: AnyZodObject
    export let pricelist: {"public": unknown, "secret": unknown}
    export let registrationEvent

    let adultCount: number
    let adultTotal: number
    let kidTotal: number
    let regTotal: number
    let adultAddText: string = "Add"
    let kidAddText: string = "Add"

    const { form, errors, constraints, enhance } = superForm(regData, {dataType: 'json'})

    $: adultCount= $form.participants && $form.participants.length > 0 ?  $form.participants.length + 1 : 1
    $: adultTotal = adultCount * registrationEvent.prices.public[$form.adultPriceCode]
    $: kidTotal = $form.kidPaymentCount * registrationEvent.prices.public[$form.kidPriceCode]
    $: regTotal = adultTotal + kidTotal
    $: adultAddText = adultCount > 1 ? "Add Another" : "Add"
    $: kidAddText = $form.kids?.length > 0 ? "Add Another" : "Add"

    function addAdult() {
        form.update(($form) => {
            const existingParticipants = $form.participants || []
            $form.participants = [...existingParticipants, {...baseAdult}]
            return $form
        })
    }

    function removeAdult() {
        form.update(($form) => {
            const existingParticipants = $form.participants || []
            $form.participants = existingParticipants.slice(0, -1)
            return $form
        })
    }
    function addKid() {
        form.update(($form) => {
            const existingKids = $form.kids || []
            $form.kids = [...existingKids, {...baseKid}]
            $form.kidPaymentCount = $form.kids.length
            return $form
        })
    }

    function removeKid() {
        form.update(($form) => {
            const existingKids = $form.kids || []
            $form.kids = existingKids.slice(0, -1)
            $form.kidPaymentCount = $form.kids.length
            return $form
        })
    }

    onMount(() => {
        form.update(($form) => {
            $form.adultPriceCode = "default"
            $form.kidPriceCode = "default"
            $form.kidPaymentCount = $form.kids ? $form.kids.length : 0
            return $form
        })
    })

</script>

<div class="card mt-8 p-8">
    <form method="POST" class="space-y-6" use:enhance>
        <h3>Tell us about yourself</h3>
        <label class="label" for="purchaserName">
            <span class="block">Name</span>
            <input
                    class="input variant-glass"
                    type="text"
                    name="purchaserName"
                    id="purchaserName"
                    class:input-error={$errors.purchaserName}
                    data-invalid={$errors.purchaserName}
                    bind:value={$form.purchaserName}
            />
        </label>
        {#if $errors.purchaserName}
            <span class="text-red-400">{$errors.purchaserName}</span>
        {/if}

        <label class="label" for="purchaserEmail">
            <span>Email</span>
            <input
                    class="input variant-glass"
                    type="text"
                    name="purchaserEmail"
                    id="purchaserEmail"
                    class:input-error={$errors.purchaserEmail}
                    data-invalid={$errors.purchaserEmail}
                    bind:value={$form.purchaserEmail}
                    {...$constraints.purchaserEmail}
            />
        </label>
        {#if $errors.purchaserEmail}
            <span class="text-red-400">{$errors.purchaserEmail}</span>
        {/if}

        <label class="label" for="purchaserPhone">
            <span>Phone Number</span>
            <input
                    class="input mt-2 variant-glass"
                    type="text"
                    name="purchaserPhone"
                    id="purchaserPhone"
                    class:input-error={$errors.purchaserPhone}
                    data-invalid={$errors.purchaserPhone}
                    bind:value={$form.purchaserPhone}
                    {...$constraints.purchaserPhone}
            />
        </label>
        {#if $errors.purchaserPhone}
            <span class="text-red-400">{$errors.purchaserPhone}</span>
        {/if}

        <h3>Anyone else coming with you?</h3>
        {#if $form.participants}
            {#each $form.participants as _, idx}
                <div>
                    <label class="label max-w-md">Name
                        <input type="text" name="name"
                               class="input variant-glass"
                               bind:value={$form.participants[idx].name}
                               data-invalid={$errors.participants?.[idx]?.name}
                        />
                    </label>
                    <label class="label max-w-md mt-2">Email
                        <input type="text" name="email"
                               class="input variant-glass"
                               bind:value={$form.participants[idx].email}
                               data-invalid={$errors.participants?.[idx]?.email}
                        />
                    </label>
                    {#if $errors.participants?.[idx]}
                        <span class="text-red-400">{$errors.participants[idx]}</span>
                    {/if}
                </div>
            {/each}
            {#if $errors.participants}
                <span class="text-red-400">Please fill in names and emails for all attendees</span>
            {/if}
        {/if}
        <button type="button" class="btn variant-soft" on:click={addAdult}>{adultAddText} Adult</button>
        {#if $form.participants && $form.participants.length > 0}
            <button type="button" class="btn variant-soft" on:click={removeAdult}>Remove Adult</button>
        {/if}

        {#if $form.kids}
            {#each $form.kids as _, idx}
                <div>
                    <label class="label max-w-md">Name
                        <input type="text" name="name"
                               class="input variant-glass"
                               bind:value={$form.kids[idx].name}
                               data-invalid={$errors.kids?.[idx]?.name}
                        />
                    </label>
                    <label class="label max-w-xs mt-2">Age
                        <input type="text" name="age"
                               class="input variant-glass"
                               bind:value={$form.kids[idx].age}
                               data-invalid={$errors.kids?.[idx]?.age}
                        />
                    </label>
                    {#if $errors.kids?.[idx]}
                        <span class="text-red-400">{$errors.kids[idx]}</span>
                    {/if}
                </div>
            {/each}
            {#if $errors.kids}
                <span class="text-red-400">Please fill in names and ages for all children</span>
                <br />
            {/if}
        {/if}
        <button type="button" class="btn variant-soft" on:click={addKid}>{kidAddText} Kid</button>
        {#if $form.kids && $form.kids.length > 0}
            <button type="button" class="btn variant-soft" on:click={removeKid}>Remove Kid</button>
        {/if}

        <h3>Okay, on with the details</h3>
        <label class="label" for="arrivalTime">
            <span>When do you expect to show up?</span>
            <select
                    class="select mt-2 variant-glass"
                    id="arrivalTime"
                name="arrivalTime"
                class:input-error={$errors.arrivalTime}
                data-invalid={$errors.arrivalTime}
                bind:value={$form.arrivalTime}
                {...$constraints.arrivalTime}
            >
                <option value="Wednesday">Wednesday night</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
            </select>
        </label>
        {#if $errors.arrivalTime}
            <span class="text-red-400">{$errors.arrivalTime}</span>
        {/if}
        <p>
            Here is a
            <a href="https://drive.google.com/file/d/1hnjx42z-pznlx0KI4KdACoHrHhBYScdE/view?usp=sharing" target="_blank">cabin map</a>
            , tell us a couple cabin numbers you might prefer and we will try to do advance assignment.
        </p>
        <p>
            Each cabin holds 4 people.
            We will always put you with the group you are registering, and sometimes add on requested cabin mates.
            We often do not have enough cabins for every individual to have their own.
        </p>
        <label class="label" for="cabinPrefs">
            <strong>Housing requests -- include cabin # and people you'd be willing to sleep near</strong>
            <textarea
                id="cabinPrefs"
                name="cabinPrefs"
                class="textarea variant-glass"
                class:input-error={$errors.cabinPrefs}
                data-invalid={$errors.cabinPrefs}
                bind:value={$form.cabinPrefs}
            />
        </label>
        {#if $errors.cabinPrefs}
            <span class="text-red-400">{$errors.cabinPrefs}</span>
        {/if}
        <label class="label" for="awesomeContributions">
            <strong>Will you bring some Awesome?</strong>
            <p>This is an event where we all do awesome stuff, is there some specific awesome you want to bring to the community?</p>
            <p>If this is your first awesome, focus on bringing a positive attitude, alongside maybe a talent show act or some cool toys to share.</p>
            <p>For veterans of awesome, we appreciate everything you do to make this event great.  We'd also love a little advance notice of your plans.</p>
            <textarea
                name="awesomeContributions"
                id="awesomeContributions"
                class="textarea variant-glass"
                class:input-error={$errors.awesomeContributions}
                data-invalid={$errors.awesomeContributions}
                bind:value={$form.awesomeContributions}
                {...$constraints.awesomeContributions}
            />
        </label>
        {#if $errors.awesomeContributions}
            <span class="text-red-400">{$errors.awesomeContributions}</span>
        {/if}
        <p>
            Here is the
            <a href="https://docs.google.com/document/d/1SqiBXIUD3V-kIq43HkBHqfmuPI6aoTVak4EW1b3xMvY/edit?usp=sharing" target="_blank">
                Awesome Covid Policy
            </a>, we're asking everyone to test before coming.
        </p>
        <label class="label" for="otherComments">
            <strong>Anything else you want us to know? Special requests, allergies, grammar faux pas</strong>
            <textarea
                name="otherComments"
                id="otherComments"
                class="textarea variant-glass"
                class:input-error={$errors.otherComments}
                data-invalid={$errors.otherComments}
                bind:value={$form.otherComments}
            />
        </label>
        {#if $errors.otherComments}
            <span class="text-red-400">{$errors.otherComments}</span>
        {/if}

        <h3>Finally, we need some money</h3>
        <p>
            Standard registration for {registrationEvent.name} is <strong>${registrationEvent.prices.public.default}</strong>.
            This covers costs for site rental, van rental, supplies... so, if this is workable for you, we sure appreciate it.
            Awesome is not a profit-taking event and we are doing our best to bring you the awesome at-cost!
        </p>
        <label class="label" for="adultPriceCode">
            <span>What would you like to pay?</span>
            <select
                    class="select mt-2 variant-glass"
                    id="adultPriceCode"
                    name="adultPriceCode"
                    class:input-error={$errors.adultPriceCode}
                    data-invalid={$errors.adultPriceCode}
                    bind:value={$form.adultPriceCode}
            >
                {#each pricelist as [code, amount]}
                    <option value={code}>${amount}</option>
                {/each}
            </select>
        </label>
        {#if $form.kids && $form.kids.length > 0}
            <p>
            We are charged full price by the venue for all children over 5 so this year we ask that you buy tickets for all children over 5 but feel free to use the sliding scale if money is an issue.
            </p>
            <label class="label" for="kidPriceCode">
                <span>Kid Price</span>
                <select
                        class="select mt-2 variant-glass"
                        id="kidPriceCode"
                        name="kidPriceCode"
                        class:input-error={$errors.kidPriceCode}
                        data-invalid={$errors.kidPriceCode}
                        bind:value={$form.kidPriceCode}
                >
                    {#each pricelist as [code, amount]}
                        <option value={code}>${amount}</option>
                    {/each}
                </select>
            </label>

            <label class="label" for="kidPaymentCount">
                <span>How many children's tickets are you buying?</span>
                <input type="number"
                       name="kidPaymentCount"
                       id="kidPaymentCount"
                       min="0"
                       max="8"
                       class="input variant-glass"
                       bind:value={$form.kidPaymentCount}
                />
            </label>
        {/if}

        <h4>Registration Total ${regTotal}</h4>

        <button class="btn variant-filled-primary" type="submit">Register and Pay</button>
    </form>
</div>

<style>
    .card {
        background: pink;
    }
</style>