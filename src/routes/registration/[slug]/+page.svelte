<script lang="ts">
    import format from 'date-fns/format/index.js';
    export let data

</script>
<h1>Thanks for registering</h1>
<div class="card mt-8 p-8">

    <p>You have requested {data.totalSpots} spots at Awesome</p>

    {#if data.reg.totalDue > data.reg.totalPaid }
        <p>Please bring cash to pay on site or pay beforehand</p>
    {:else}
        <p>Your card was successfully charged, you're all set!</p>
    {/if}
    <p>Further details about carpooling, etc, will show up in your email soon!</p>

    <p>You can also check out the Facebook page for updates</p>


    <p>Your registration code is: <strong>{ data.reg.secureId }</strong></p>

    <p>We are definitely not going to ask you for this code at Awesome
        , but it could help us sort out any technical BS that occurs meanwhile. </p>

    <h3>
        The event starts at {format(data.event.startDate, 'hbbb cccc, LLLL do')}
        and ends at {format(data.event.endDate, 'hbbb cccc')}.
    </h3>
    <p>Write it down! Tell your peeps!</p>

</div>

<style>
    .card {
        background: pink;
    }
    p {
        margin-bottom: 10px;
    }
</style>