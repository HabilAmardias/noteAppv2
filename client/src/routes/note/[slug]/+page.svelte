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
    function cancelEdit(){
        title=data.note.noteTitle;
        desc=data.note.noteDesc;
        edit=!edit
    }
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
        <a class="sign-out" href="/logout" data-sveltekit-preload-data='off'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
            Sign Out
        </a>
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
                    <input class="edit-note-title" name="note-title" bind:value={title}/>
                    <textarea name="note-desc" bind:value={desc}></textarea>
                </section>
                <section class="edit-button-container">
                    <button class="edit-handler">
                        Edit
                    </button>
                    <button class="cancel-handler" formmethod="dialog" on:click={cancelEdit}>
                        Cancel
                    </button>
                </section>
            </form>
        </div>
    {/if}
{/if}

<div class="wave"></div>
<div class="wave"></div>
<div class="wave"></div>

<style>
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
    nav{
        display: flex;
        justify-content: space-between;
        padding: 1em 1em;
        border-bottom: 1px solid #242424;
        margin-bottom: 1em;
        background-color: rgba(255, 255, 255, 0.3);
    }
    a{
        color: black;
        text-decoration: none;
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
    .main-container{
        display: flex;
        gap: 1em;
        justify-content: center;
    }
    .sign-out{
        display: flex;
        gap: 0.3em;
    }
    .sign-out:active{
        color: whitesmoke;
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
        width: 80%;
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
        width: 20%;
        height: fit-content;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 1em;
        border: 1px solid #242424;
        box-shadow: 0 12px 15px 0 rgba(0, 0, 0, .24), 0 17px 50px 0 rgba(0, 0, 0, .19);
        padding: 1em;
    }
    .note-container{
        width: 30%;
        height: 70vh;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 1em;
        border: 1px solid #242424;
        box-shadow: 0 12px 15px 0 rgba(0, 0, 0, .24), 0 17px 50px 0 rgba(0, 0, 0, .19);
        padding-left: 1em;
        padding-top: 1em;
    }
    .button-container{
        display: flex;
        flex-direction: column;
        gap: 1em;
        height: fit-content;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 1em;
        border: 1px solid #242424;
        box-shadow: 0 12px 15px 0 rgba(0, 0, 0, .24), 0 17px 50px 0 rgba(0, 0, 0, .19);
        padding: 1em;
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
    textarea{
        resize: none;
        height: 10em;
        background: none;
        border-radius: 0.5em;
        border: 1px solid #242424;
    }
    .edit-note-title{
        background: none;
        border-radius: 0.5em;
        border: 1px solid #242424;
    }

    .edit-handler{
        background: none;
        border: none;
        cursor: pointer;
    }
    .edit-handler:active{
        color: whitesmoke;
    }
    .cancel-handler{
        background: none;
        border: none;
        cursor: pointer;
    }
    .cancel-handler:active{
        color: whitesmoke;
    }
</style>