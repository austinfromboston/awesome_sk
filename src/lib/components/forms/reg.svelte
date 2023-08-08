<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client'
    import type { Validation } from 'sveltekit-superforms/index'
    import type { AnyZodObject } from 'zod'

    export let data: Validation<AnyZodObject> | string | undefined | null
    export let baseAdult: AnyZodObject
    export let baseKid: AnyZodObject

    const { form, errors, constraints, enhance } = superForm(data, {dataType: 'json'})

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
            return $form
        })
    }

    function removeKid() {
        form.update(($form) => {
            const existingKids = $form.kids || []
            $form.kids = existingKids.slice(0, -1)
            return $form
        })
    }

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
                    {...$constraints.purchaserName}
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
                               class="input"
                               bind:value={$form.participants[idx].name}
                               data-invalid={$errors.participants?.[idx]?.name}
                        />
                    </label>
                    <label class="label max-w-md mt-2">Email
                        <input type="text" name="email"
                               class="input"
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
        <button type="button" class="btn variant-soft" on:click={addAdult}>Add Adult</button>
        {#if $form.participants && $form.participants.length > 0}
            <button type="button" class="btn variant-soft" on:click={removeAdult}>Remove Adult</button>
        {/if}

        {#if $form.kids}
            {#each $form.kids as _, idx}
                <div>
                    <label class="label max-w-md">Name
                        <input type="text" name="name"
                               class="input"
                               bind:value={$form.kids[idx].name}
                               data-invalid={$errors.kids?.[idx]?.name}
                        />
                    </label>
                    <label class="label max-w-xs mt-2">Age
                        <input type="text" name="age"
                               class="input"
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
        <button type="button" class="btn variant-soft" on:click={addKid}>Add Kid</button>
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
            <span>Housing requests</span>
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
            <span>Will you bring some Awesome? This is an event where we all do awesome stuff, is there some specific awesome you want to bring to the community?</span>
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
            Here is the <a href="https://docs.google.com/document/d/1SqiBXIUD3V-kIq43HkBHqfmuPI6aoTVak4EW1b3xMvY/edit?usp=sharing">Awesome Covid Policy</a>
        </p>
        <label class="label" for="otherComments">
            <span>Anything else you want us to know? Special requests, allergies, grammar faux pas</span>
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

        <button class="btn variant-filled-primary" type="submit">Register</button>
    </form>
</div>

<style>
    .card {
        background: pink;
    }
</style>