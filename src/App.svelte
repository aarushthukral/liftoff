<script lang="ts">
  import Login from "./lib/components/Login.svelte";
  import AppGrid from "./lib/components/AppGrid.svelte";
  import { accessToken } from "./lib/settings";
  import { getSpaceApps } from "./lib/space";
</script>

<main class="container">
  {#if !$accessToken}
    <Login />
  {:else}
    <AppGrid apps={getSpaceApps()} />
  {/if}
</main>

<style>
  .container {
    padding-top: 2vh;
    border-radius: 7px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--seashell-50);
    background-image: radial-gradient(#00000026 1px, #0000 0);
    background-size: 14px 14px;
    overflow: hidden;
    min-height: 100%;
  }

  @media (prefers-color-scheme: dark) {
    .container {
      background-color: var(--seashell-900);
      background-image: radial-gradient(#ffffff26 1px, #0000 0);
    }
  }
</style>
