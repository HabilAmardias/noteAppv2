<script lang="ts">
    import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
    export let form:ActionData;
    let login:boolean=false;
    let username:string='';
    let password:string='';
    let confirmPassword:string='';
    function handleForm(){
        login=!login
    }
</script>




{#if login===false}
    <div class="main-container">
        <form method="POST" action="?/register" use:enhance>
            <h3>Sign Up</h3>
            {#if form?.error}
                <p class='error'>{form.error}</p>
            {/if}
            <label>
                Username: 
                <input
                bind:value={username}
                required
                minlength="5"
                maxlength="12"
                class="username"
                name="username"
                />
            </label>
            <label>
                Password:
                <input
                bind:value={password}
                required
                minlength="8"
                maxlength="20"
                class="password"
                name="password"
                type="password"
                />
            </label>
            <label>
                Confirm Password:
                <input
                bind:value={confirmPassword}
                required
                minlength="8"
                maxlength="20"
                class="confirm-password"
                name="confirm-password"
                type="password"
                />
            </label>
            {#if password === confirmPassword && password.length>=8 && username.length>=5}
                <button>
                    Sign Up
                </button>
            {:else}
                <button disabled>
                    Sign Up
                </button>
            {/if}
            <button formmethod="dialog" on:click={handleForm}>
                Already have an account?
            </button>
        </form>
    </div>
{:else}
    <div class="main-container">
        <form method="POST" action="?/login" use:enhance>
            <h3>Sign In</h3>
            {#if form?.error}
                <p class='error'>{form.error}</p>
            {/if}
            <label>
                Username: 
                <input
                bind:value={username}
                required
                minlength="5"
                maxlength="12"
                class="username"
                name="username"
                />
            </label>
            <label>
                Password:
                <input
                bind:value={password}
                required
                minlength="8"
                maxlength="20"
                class="password"
                name="password"
                type="password"
                />
            </label>
            {#if password.length>=8 && username.length>=5}
                <button>
                    Sign In
                </button>
            {:else}
                <button disabled>
                    Sign In
                </button>
            {/if}
            <button formmethod="dialog" on:click={handleForm}>
                First time here?
            </button>
        </form>
    </div>
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
    .error{
        color: red;
    }
    .main-container{
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 1em;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 1em;
        border: 1px solid #242424;
        box-shadow: 0 12px 15px 0 rgba(0, 0, 0, .24), 0 17px 50px 0 rgba(0, 0, 0, .19);
        padding: 1em;
    }
    h3{
        margin: 0;
        text-align: center;
    }
    p{
        text-align: center;
        margin: 0;
    }
    input{
        background: none;
        border-radius: 0.5em;
        border: 1px solid #242424;
        width: 100%;
    }
    button{
        background: none;
        border: none;
        cursor: pointer;
    }
    button:active{
        color: whitesmoke;
    }
</style>