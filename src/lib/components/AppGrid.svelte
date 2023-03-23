<script lang="ts">
  import type { App } from "../types";
  import SpaceApp from "./SpaceApp.svelte";
  import Error from "./Error.svelte";

  export let apps: Promise<App[]>;
</script>

{#await apps}
  <div class="loader" />
{:then apps}
  <div class="app-grid">
    {#each apps as app}
      <SpaceApp {...app} />
    {/each}
  </div>
{:catch error}
  <Error error={error.toString()} />
{/await}

<style>
  .app-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    place-items: center;
    gap: 0.8rem;
    overflow: visible;
    height: 100%;
    width: 100%;
  }

  .loader {
    display: inline-block;
    width: 80px;
    height: 80px;
  }

  .loader:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #000;
    border-color: #000 transparent #000 transparent;
    animation: loader 1.2s linear infinite;
  }

  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media (prefers-color-scheme: dark) {
    .loader:after {
      border: 6px solid #fff;
      border-color: #fff transparent #fff transparent;
    }
  }
</style>
