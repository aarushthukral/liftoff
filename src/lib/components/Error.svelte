<script lang="ts">
  import { accessToken } from "../settings";

  export let error: string;
</script>

<div class="error">
  <h2 class="error-heading">Error</h2>
  <pre class="error-description">{error}</pre>
  <button class="reset-button" on:click={() => accessToken.set("")}>
    Click here to reset your access token
  </button>
</div>

<style>
  .error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .error-heading {
    font-size: 2.25rem;
    line-height: 0.75;
    color: var(--seashell-900);
  }

  .error-description {
    margin-top: 2rem;
    padding: 1rem;
    text-align: start;
    border: 4px solid;
    border-color: #f0eeeacc;
    border-radius: 0.5rem;
    white-space: pre-wrap;
    width: 100%;
    color: #f24441;
    background-color: var(--seashell-100);
  }

  .reset-button {
    margin-top: 1rem;
    background-color: #f24441;
    color: var(--seashell-100);
    outline-color: #ffa7a7;
    border-color: #ffa7a7b3;
    border: 4px solid;
    outline-offset: 4px;
    padding: 0.5rem 1rem;
    font-weight: 700;
    font-size: 0.875rem;
    line-height: 1.25rem;
    border-radius: 0.75rem;
    cursor: pointer;
    width: fit-content;
  }

  .reset-button:hover {
    filter: saturate(1.3);
  }

  @media (prefers-color-scheme: dark) {
    .error-heading {
      color: var(--seashell-100);
    }

    .error-description {
      border-color: #32302f80;
      background-color: var(--seashell-900);
    }

    .reset-button {
      border-color: #6b1b12b3;
      outline-color: #6b1b12;
    }
  }
</style>
