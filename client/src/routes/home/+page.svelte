<script lang='ts'>
    import Dialog from './Dialog.svelte';
    import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types.js';
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
        <a href="/logout" data-sveltekit-preload-data='off'>Sign Out</a>
    </nav>
    {#if form?.error}
        <p>{form.error}</p>
    {/if}
    <div>
        <section>
            <Dialog bind:dialog on:close>
                <form method="POST" action="?/create" use:enhance>
                    <section>
                        <button formmethod="dialog" on:click={()=>dialog.close()}>
                            Cancel
                        </button>
                    </section>
                    <label>
                        Note Title:
                        <input
                        name="note-title"
                        required
                        bind:value={noteTitle}
                        />
                    </label>
                    <label>
                        Note Description:
                        <textarea name="note-desc" bind:value={noteDesc}></textarea>
                    </label>
                    {#if noteTitle===''}
                        <button disabled>Create</button>
                    {:else}
                        <button>Create</button>
                    {/if}
                </form>
            </Dialog>
            <button on:click={()=>dialog.showModal()}>
                Create Note
            </button>
        </section>
        <section>
            {#each data.notes as note (note.noteId)}
                <a class="note-link" href={`/note/${note.noteId}`}>
                    <div>
                        <h3>{note.noteTitle}</h3>
                        <p>{note.noteDesc}</p>
                    </div>
                </a>
            {/each}
        </section>
    </div>
{/if}

<style>
    .note-link{
        text-decoration: none;
        color: black;
    }
</style>