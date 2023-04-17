<script>
  import Svelecte from "svelecte";

  // custom event
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  //  props
  export let label;
  export let name;
  export let value;
  export let options;
  export let searchable;
  export let valueField;
  export let style;

  //  methods
  const handleChange = (event) => {
    dispatch("select", { value: event.detail.code });
  };
</script>

<div class="i-form__label">{label}</div>
<Svelecte
  bind:value
  {name}
  {valueField}
  {options}
  {searchable}
  {style}
  on:change={handleChange}
/>
