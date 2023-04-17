<script>
  import RangeSlider from "svelte-range-slider-pips";

  // custom event
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // props
  export let values;
  export let min;
  export let max;
  export let step;
  export let range;

  // methods
  const handleChange = (event) => {
    dispatch("range", { value: event.detail.value });
  };

  const handleStopChange = () => {
    dispatch("stop");
  };
</script>

<div class="b-calc__slider">
  <RangeSlider
    {values}
    {min}
    {max}
    {step}
    {range}
    on:change={handleChange}
    on:stop={handleStopChange}
  />
</div>
