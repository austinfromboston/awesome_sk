<script>
    import { Heading, Html, Preview, Text } from 'svelte-email';
    import { calculateSpots } from "$lib/services/registrations";

    export let data
</script>

<Html lang="en">
<Heading>{ data.reg.purchaserName } has registered for { data.event.name }</Heading>
<Preview>{ data.reg.purchaserName } has registered for { data.event.name }</Preview>
<Text>
    They bought { data.totalSpots } tickets
    for a total of ${ data.reg.totalDue }
</Text>

<Text>
    They are probably coming { data.reg.arrivalTime }
</Text>

<Text>
    Contact info: { data.reg.purchaserEmail } / { data.reg.purchaserPhone }
</Text>

{#if data.participants.length > 1 }
    <Text>
        They also bought tickets for
        {#each data.participants as p }
            {#if p.email !== data.reg.purchaserEmail }
                {p.name},
            {/if}
        {/each}
    </Text>
{/if}


{#if data.kidParticipants.length > 0 }
    <Text>
        They will also bring these kids:
        {#each data.kidParticipants as kp}
            {kp.name}, age {kp.age} |
        {/each}
    </Text>
{/if}

{#if data.reg.awesomeContributions }
   <Text>
       And this awesome:
       { data.reg.awesomeContributions }
   </Text>
{/if}
{#if data.reg.cabinPrefs }
    <Text>
    Cabin Prefs:
    { data.reg.cabinPrefs }
    </Text>
{/if}
{#if data.reg.otherComments }
    <Text>
    Other Comments:
    { data.reg.otherComments }
    </Text>
{/if}
</Html>