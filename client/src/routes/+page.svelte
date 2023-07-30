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

{#if form?.error}
    <p class='error'>{form.error}</p>
{/if}


{#if login===false}
    <div>
        <form method="POST" action="?/register" use:enhance>
            <h3>Sign Up</h3>
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
                class="password"
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
        </form>
        <button on:click={handleForm}>
            Already have an account?
        </button>
    </div>
{:else}
    <div>
        <form method="POST" action="?/login" use:enhance>
            <h3>Sign In</h3>
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
        </form>
        <button on:click={handleForm}>
            First time here?
        </button>
    </div>
{/if}

<style>

</style>