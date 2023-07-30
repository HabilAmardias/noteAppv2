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
    {#if edit === false}
        <div>
            <h3>{data.note.noteTitle}</h3>
            <p>{data.note.noteDesc}</p>
            <button on:click={handleEdit}>Edit Note</button>
            <form method="POST" action="?/delete" use:enhance>
                <input type="hidden" name="note-id" value={data.note.noteId}/>
                <button>
                    Delete Note
                </button>
            </form>
        </div>
    {:else}
        <form method="POST" action="?/edit">
            <input name="note-title" bind:value={title}/>
            <textarea name="note-desc" bind:value={desc}></textarea>
            <button>
                Edit
            </button>
            <button formmethod="dialog" on:click={handleEdit}>
                Cancel
            </button>
        </form>
        <div>
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
        
    {/if}
{/if}