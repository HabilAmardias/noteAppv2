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
        <a href="/logout" data-sveltekit-preload-data='off'>Sign Out</a>
    </nav>
    {#if form?.error}
        <p>{form.error}</p>
    {/if}
    <div class="main-container">
        <section class="dialog-container">
            <Dialog bind:dialog on:close>
                <section class="cancel-container">
                    <button class="cancel-button" formmethod="dialog" on:click={()=>dialog.close()}>
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
                        <button disabled>Create</button>
                    {:else}
                        <button on:click={()=>dialog.close()}>Create</button>
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

<style>
    :global(body){
        margin: 0;
    }

    input{
        box-sizing: border-box;
    }
    .note-link{
        text-decoration: none;
        color: black;
        width: 23%;
        max-width: 23%;
        max-height: 7em;
        border: solid;
        border-radius: 1em;
        border-width: 2px;
        margin: 1em 0;
        transition: transform .2s;
    }

    .note-link:hover{
        transform: scale(1.1);
    }
    nav{
        display: flex;
        justify-content: space-between;
        padding: 1em 1em;
        border-bottom: solid;
        margin-bottom: 1em;
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
    textarea{
        resize: none;
        height: 10em;
        width: 15em;
    }
    .title-label{
        display: flex;
        gap: 0.5em;
    }
    .desc-label{
        display: flex;
        gap: 0.5em;
    }
    input{
        width: 100%;
    }
</style>