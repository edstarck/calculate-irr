<script>
  import { onMount } from "svelte";
  import referencesApi from "../api/references";

  // components
  import IrrInput from "./UI/IrrInput.svelte";
  import IrrSelect from "./UI/IrrSelect.svelte";

  // custom event
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // props
  export let isLoading;

  export let product;
  export let employment;
  export let citizenship;
  export let registration;
  export let age;
  export let ageError;
  export let jobTermTotal;
  export let jobTermTotalError;
  export let jobTermCurrent;
  export let jobTermCurrentError;

  // computed props
  $: isReferences = Object.keys(references).length > 0;

  // model
  let references = {};

  // hooks
  onMount(() => {
    if (isReferences) {
      return false;
    }

    referencesApi
      .getReferences("references.json")
      .then((response) => {
        isLoading = false;
        references = response;
        dispatch("load", { isLoading: false });
      })
      .catch((error) => {
        isLoading = false;
        dispatch("load", { isLoading: false });
        console.log(error);
      });
  });

  // methods
  function handleSelect(event) {
    console.log("handleSelect", event);
  }

  function handleChangeInput() {
    console.log("handleChangeInput");
  }
</script>

{#if isReferences}
  <div class="i-form">
    <div class="i-form__block">
      <IrrSelect
        name="product"
        label="Тип программы"
        bind:value={product}
        valueField="code"
        options={references.product}
        searchable={false}
        on:select={handleSelect}
      />
    </div>
    <div class="i-form__block" />
    <div class="i-form__block">
      <IrrInput
        label="Возраст"
        bind:value={age}
        on:input={handleChangeInput}
        bind:error={ageError}
      />
      {#if ageError !== ""}
        <div class="i-form__message">{ageError}</div>
      {/if}
    </div>
    <div class="i-form__block">
      <IrrSelect
        name="citizenship"
        label="Гражданство"
        bind:value={citizenship}
        valueField="code"
        options={references.citizenship}
        searchable={false}
        on:select={handleSelect}
      />
    </div>

    <div class="i-form__block">
      <IrrSelect
        name="registration"
        label="Регистрация"
        bind:value={registration}
        valueField="code"
        options={[
          { code: "-1", title: "Не выбрано" },
          ...references.registration,
        ]}
        searchable={false}
        on:select={handleSelect}
      />
    </div>
    <div class="i-form__block">
      <IrrSelect
        name="registration"
        label="Трудоустройство"
        bind:value={employment}
        valueField="code"
        options={[
          { code: "-1", title: "Не выбрано" },
          ...references.employment,
        ]}
        searchable={false}
        on:select={handleSelect}
        style={`.indicator::after`}
      />
    </div>
    {#if employment === "HIRING"}
      <div class="i-form__block">
        <IrrInput
          label="Общий стаж (лет)"
          bind:value={jobTermTotal}
          on:input={handleChangeInput}
          bind:error={jobTermTotalError}
        />
        {#if jobTermTotalError !== ""}
          <div class="i-form__message">{jobTermTotalError}</div>
        {/if}
      </div>
      <div class="i-form__block">
        <IrrInput
          label="Общий стаж на текущем месте (лет)"
          bind:value={jobTermCurrent}
          on:input={handleChangeInput}
          bind:error={jobTermCurrentError}
        />
        {#if jobTermCurrentError !== ""}
          <div class="i-form__message">{jobTermCurrentError}</div>
        {/if}
      </div>
    {/if}
  </div>
{/if}
