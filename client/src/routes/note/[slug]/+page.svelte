<script lang="ts">
    import { enhance } from '$app/forms';
	import type { PageData } from './$types';
    export let data:PageData;
    let edit:boolean = false;
    function handleEdit(){
        edit=!edit
    }
    let title:string=data.note.noteTitle;
    let desc:string=data.note.noteDesc;
</script>


{#if data.authorized === undefined}
    <div class="container">
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
    {#if edit === false}
        <div class="main-container">
            <section class="note-container">
                <h3>{data.note.noteTitle}</h3>
                <p>{data.note.noteDesc}</p>
            </section>
            <section class="button-container">
                <form method="POST" action="?/delete" use:enhance>
                    <input type="hidden" name="note-id" value={data.note.noteId}/>
                    <button class="delete-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                        </svg>
                        Delete
                    </button>
                </form>
                <button class="edit-button" on:click={handleEdit}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                    Edit
                </button>
                <a class="back-button" href="/home">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                    Back
                </a>
            </section>
        </div>
    {:else}
        <div class="form-container">
            <section class="note-container">
                <h3>{title}</h3>
                <p>{desc}</p>
            </section>
            <form method="POST" action="?/edit" class="form-edit">
                <section class="input-container">
                    <input name="note-title" bind:value={title}/>
                    <textarea name="note-desc" bind:value={desc}></textarea>
                </section>
                <section class="edit-button-container">
                    <button>
                        Edit
                    </button>
                    <button formmethod="dialog" on:click={handleEdit}>
                        Cancel
                    </button>
                </section>
            </form>
        </div>
    {/if}
{/if}

<style>
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
    .main-container{
        display: flex;
        gap: 1em;
        justify-content: center;
    }

    .form-container{
        display: flex;
        gap: 1em;
        justify-content: center;
    }
    .input-container{
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }
    h3{
        margin-top: 0;
        overflow-wrap: break-word;
    }
    p{
        margin: 0;
        overflow-wrap: break-word;
    }
    h2{
        margin: 0;
    }
    .form-edit{
        display: flex;
        gap: 1em;
    }
    .note-container{
        width: 40%;
    }
    .button-container{
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
    .edit-button-container{
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }
    .edit-button{
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        gap: 0.3em;
    }
    .delete-button{
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        gap: 0.3em;
    }

    .back-button{
        text-decoration: none;
        color: black;
        display: flex;
        gap: 0.3em;
    }
</style>