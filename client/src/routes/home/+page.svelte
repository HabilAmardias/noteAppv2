<script lang='ts'>
    import Dialog from './Dialog.svelte';
    import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types.js';
    import { fly } from 'svelte/transition';

    export let data:PageData
    export let form:ActionData

    let dialog:HTMLDialogElement;
    let noteTitle:string=''
    let noteDesc:string=''

    function closeDialog(){
        noteTitle=''
        noteDesc=''
        dialog.close()
    }
</script>

{#if data.authorized === undefined}
    <div>
        <h2>You're Not Authorized</h2>
        <p>
            Please Sign In Here First
            <a href="/">Sign In</a>
        </p>
    </div>
{:else}
    <nav>
        <a href="/home">NoteApp</a>
        <button class="create-button" on:click={()=>dialog.showModal()}>
            Create Note
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
        </button>
        <a class="sign-out" href="/logout" data-sveltekit-preload-data='off'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
            Sign Out
        </a>
    </nav>
    {#if form?.error}
        <p>{form.error}</p>
    {/if}
    <div class="main-container">
        <section class="dialog-container">
            <Dialog bind:dialog on:close>
                <section class="cancel-container">
                    <button class="cancel-button" formmethod="dialog" on:click={()=>closeDialog()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                        </svg>
                    </button>
                </section>
                <form class="create-form" method="POST" action="?/create" use:enhance>
                    <label class="title-label">
                        Note Title:
                        <input
                        name="note-title"
                        required
                        bind:value={noteTitle}
                        />
                    </label>
                    <label class="desc-label">
                        Note Description:
                        <textarea name="note-desc" bind:value={noteDesc}></textarea>
                    </label>
                    {#if noteTitle===''}
                        <button class="create-handler" disabled>Create</button>
                    {:else}
                        <button class="create-handler" on:click={()=>dialog.close()}>Create</button>
                    {/if}
                </form>
            </Dialog>
        </section>
        <section class="notes-container">
            {#each data.notes as note (note.noteId)}
                <a class="note-link" href={`/note/${note.noteId}`} in:fly={{y:10}}>
                    <div>
                        <h3 class="note-title">{note.noteTitle}</h3>
                        <p class="note-description">{note.noteDesc}</p>
                    </div>
                </a>
            {/each}
        </section>
    </div>
{/if}

<div class="wave"></div>
<div class="wave"></div>
<div class="wave"></div>

<style>
    a{
        color: black;
        text-decoration: none;
    }
    input{
        background: none;
        border-radius: 0.5em;
        border: 1px solid #242424;
        width: 100%;
    }
    textarea{
        resize: none;
        height: 10em;
        background: none;
        border-radius: 0.5em;
        border: 1px solid #242424;
        width: 15em;
    }
    :global(body){
        margin: 0;
        background-size: 300% 300%;
        background-image: linear-gradient(-45deg,
                rgba(59, 173, 227, 1) 0%,
                rgba(87, 111, 230, 1) 25%,
                rgba(152, 68, 183, 1) 51%,
                rgba(255, 53, 127, 1) 100%);
        animation: AnimateBG 20s ease infinite;
    }

    .wave {
        background: rgb(255 255 255 / 25%);
        border-radius: 1000% 1000% 0 0;
        position: fixed;
        width: 200%;
        height: 12em;
        animation: wave 10s -3s linear infinite;
        transform: translate3d(0, 0, 0);
        opacity: 0.8;
        bottom: 0;
        left: 0;
        z-index: -1;
    }

    .wave:nth-of-type(2) {
        bottom: -1.25em;
        animation: wave 18s linear reverse infinite;
        opacity: 0.8;
    }

    .wave:nth-of-type(3) {
        bottom: -2.5em;
        animation: wave 20s -1s reverse infinite;
        opacity: 0.9;
    }

    @keyframes wave {
        2% {
            transform: translateX(1);
        }

        25% {
            transform: translateX(-25%);
        }

        50% {
            transform: translateX(-50%);
        }

        75% {
            transform: translateX(-25%);
        }

        100% {
            transform: translateX(1);
        }
    }
    @keyframes AnimateBG {
        0% {
            background-position: 0% 50%
        }

        50% {
            background-position: 100% 50%
        }

        100% {
            background-position: 0% 50%
        }
    }

    .sign-out{
        display: flex;
        gap: 0.3em;
    }
    .sign-out:active{
        color: whitesmoke;
    }
    .create-handler{
        background: none;
        border: none;
        cursor: pointer;
    }
    .create-handler:active{
        color: whitesmoke;
    }
    .note-link{
        text-decoration: none;
        width: 23%;
        color: black;
        max-width: 23%;
        max-height: 7em;
        border: solid;
        border-radius: 1em;
        border: 1px solid #242424;
        box-shadow: 0 12px 15px 0 rgba(0, 0, 0, .24), 0 17px 50px 0 rgba(0, 0, 0, .19);
        margin: 1em 0;
        transition: transform .2s;
        background-color: rgba(255, 255, 255, 0.3);
    }

    .note-link:hover{
        transform: scale(1.1);
    }
    nav{
        display: flex;
        justify-content: space-between;
        padding: 1em 1em;
        border-bottom: 1px solid #242424;
        margin-bottom: 1em;
        background-color: rgba(255, 255, 255, 0.3);
    }
    a{
        text-decoration: none;
    }
    .create-button{
        background: none;
        border: none;
        display: flex;
        gap: 0.3em;
        cursor: pointer;
    }

    .create-button:active{
        color: whitesmoke;
    }

    .main-container{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .notes-container{
        display: flex;
        flex-wrap: wrap;
        gap: 2%;
        width: 80%;
    }
    .note-title{
        overflow: hidden;
        margin-left: 1em;
        margin-right: 1em;
    }

    .note-description{
        overflow: hidden;
        margin-left: 1em;
        margin-right: 1em;
    }
    .cancel-container{
        display: flex;
        justify-content: end;
        margin-bottom: 1em;
    }
    .cancel-button{
        background: none;
        border: none;
        cursor: pointer;
    }
    .create-form{
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
    .title-label{
        display: flex;
        gap: 0.5em;
    }
    .desc-label{
        display: flex;
        gap: 0.5em;
    }
</style>