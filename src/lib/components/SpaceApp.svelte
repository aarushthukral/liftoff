<script lang="ts">
  export let name: string;
  export let link: string;
  export let image: string | null = null;
  export let gradient: string;
</script>

<div class="space-app">
  <a href={link} target="_blank">
    {#if image}
      <img class="icon" alt={name} src={image} draggable="false" />
    {:else}
      <div class="placeholder-icon" style={gradient} />
    {/if}
  </a>
  <h2 class="name">{name}</h2>
</div>

<style>
  .space-app {
    display: block;
    width: 6.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    position: relative;
    background-color: var(--seashell-200);
  }

  .space-app:focus-within {
    box-shadow: 0 0 0 2px #3b82f680;
  }

  .icon {
    width: 100%;
    height: 100%;
    border-radius: 0.375rem;
    border-top-left-radius: 2rem;
  }

  .placeholder-icon {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 0.375rem;
    border-top-left-radius: 2rem;
  }

  .placeholder-icon::before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  .name {
    font-weight: 400;
    font-size: 0.8rem;
    text-align: start;
    text-decoration: none;
    margin-top: 0.1rem;
    color: var(--seashell-600);
  }

  .space-app:hover .name {
    color: var(--seashell-900);
  }

  @media (prefers-color-scheme: dark) {
    .space-app {
      background-color: var(--seashell-800);
    }

    .name {
      color: var(--seashell-300);
    }

    .space-app:hover .name {
      color: var(--seashell-100);
    }
  }
</style>
