<script lang="ts">
  import { accessToken } from "../settings";

  let newToken = "";

  const login = () => accessToken.set(newToken);
</script>

<div class="login">
  <h2 class="heading">Login to Space</h2>
  <div class="login-container">
    <input
      class="login-input"
      type="password"
      placeholder="Your access token"
      on:keydown={(e) => {
        if (e.key === "Enter") {
          login();
        }
      }}
      bind:value={newToken} />
    <button class="login-button" on:click={login} disabled={!newToken.trim().length}>
      Log in
    </button>
  </div>
</div>

<style>
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    width: 100%;
  }

  .heading {
    margin-top: 1.5rem;
    font-size: 3rem;
    line-height: 1;
    font-weight: 600;
    color: var(--seashell-900);
  }

  .login-container {
    margin-top: 2rem;
    display: flex;
    gap: 0.5rem;
    width: 100%;
    height: 3rem;
  }

  .login-input {
    flex: 1;
    color: #ccc5c1;
    font-family: monospace;
    padding: 0 0.8rem;
    border: 2px solid;
    border-radius: 12px;
    border-color: #e4e2e0;
    background-color: #fefcf8;
  }

  .login-input:placeholder-shown {
    font-style: italic;
  }

  .login-button {
    color: var(--seashell-900);
    padding: 8px 20px;
    font-weight: 700;
    border: 2px solid;
    border-radius: 12px;
    border-color: #e4e2e0;
    background-color: #fefcf8;
    cursor: pointer;
  }

  .login-button:disabled {
    color: var(--seashell-700);
    background-color: var(--seashell-400);
    cursor: not-allowed;
  }

  @media (prefers-color-scheme: dark) {
    .heading {
      color: var(--seashell-100);
    }

    .login-input {
      color: #ccc5c1;
      border-color: #32302e;
      background-color: #141414;
    }

    .login-button {
      color: #fefcf8;
      border-color: #32302e;
      background-color: #141414;
    }

    .login-button:disabled {
      color: var(--seashell-400);
      background-color: var(--seashell-700);
    }
  }
</style>
