<script lang="ts">
 export let data
</script>
<div>
    <h1>Registration Complete</h1>
    <dl>
        <dd>Created at:</dd>
        <dt>{data.reg.createdAt}</dt>
        <dd>Identifier</dd>
        <dt>{data.reg.secureId}</dt>
        <dd>Purchaser</dd>
        <dt>{data.reg.purchaserEmail}</dt>
    </dl>
</div>