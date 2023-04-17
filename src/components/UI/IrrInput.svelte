<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // props
  export let label = "";
  export let value;
  export let error;
  export let extraClass = "";
  export let inputReadOnly = false;

  // computed props
  $: isError = Boolean(error);

  // methods
  function handleInput(event) {
    dispatch("input", { value: event.target.value });
  }
</script>

<div class="b-calc__label">{label}</div>
<div class="b-calc__field">
  <input
    type="text"
    class=" square-input b-calc__input {isError
      ? 'invalid-input'
      : ''} {extraClass}"
    bind:value
    on:input={handleInput}
    {...inputReadOnly ? { readonly: true } : {}}
  />
  <slot />
</div>

<style>
</style>
