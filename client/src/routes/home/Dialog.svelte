<script lang="ts">
    export let dialog:HTMLDialogElement;
</script>

<dialog bind:this={dialog} on:close>
    <slot/>
</dialog>

<style>
    dialog{
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 1em;
        border: 1px solid #242424;
        box-shadow: 0 12px 15px 0 rgba(0, 0, 0, .24), 0 17px 50px 0 rgba(0, 0, 0, .19);
    }
</style>