<script>
  import IrrRangeSlider from "./UI/IrrRangeSlider.svelte";
  import IrrInput from "./UI/IrrInput.svelte";

  // props
  export let totalPayment;
  export let initialPayment;
  export let creditDuration;

  // model
  let percentInitialPayment = null;

  // computed props
  $: maxInitialPayment = (totalPayment * 90) / 100;

  $: if (!/^\d+$/.test(initialPayment)) {
    percentInitialPayment = 0;
  } else if (initialPayment > maxInitialPayment) {
    percentInitialPayment = "> 90";
  } else {
    percentInitialPayment = parseInt((initialPayment * 100) / totalPayment);
  }

  // methods
  function updateInitialPayment(event) {
    initialPayment = event.detail.value;
  }

  function updateСreditDuration(event) {
    creditDuration = event.detail.value;
  }

  function stopChange() {
    console.log("STOP CHANGE SLIDER");
  }
</script>

<div class="b-calc">
  <div class="b-calc__item">
    <div class="b-calc__block b-calc__block--md">
      <IrrInput
        bind:value={totalPayment}
        label="Цена недвижимости, ₽"
        extraClass="b-calc__input-disabled"
        inputReadOnly={true}
      />
    </div>

    <div class="b-calc__block b-calc__block--md">
      <IrrInput
        bind:value={initialPayment}
        on:input={updateInitialPayment}
        label="Первоначальный взнос, ₽"
        extraClass="b-calc__input--percent"
      >
        <span id="an-initial-fee-percent" class="b-calc__percent">
          {percentInitialPayment}%
        </span>
      </IrrInput>

      <IrrRangeSlider
        values={[initialPayment]}
        min={0}
        max={maxInitialPayment}
        step={50000}
        range="min"
        on:range={updateInitialPayment}
        on:stop={stopChange}
      />

      {#if null}
        <div class="i-form__message">ERROR</div>
      {/if}
    </div>

    <div class="b-calc__block b-calc__block--sm">
      <IrrInput
        bind:value={creditDuration}
        on:input={updateСreditDuration}
        label="Срок (лет)"
      />
      <IrrRangeSlider
        values={[creditDuration]}
        min={1}
        max={30}
        step={1}
        range="min"
        on:range={updateСreditDuration}
        on:stop={stopChange}
      />
      {#if null}
        <div class="i-form__message">ERROR</div>
      {/if}
    </div>
  </div>
  <div class="b-calc__item">
    <div class="b-calc__block b-calc__block--md b-calc__block-media">
      <div class="b-calc__icon">
        <img src="./images/icon-for-calc.svg" alt="" />
      </div>
      <a class="b-calc__info" href="https://instateka.ru/" target="_blank">
        Калькулятор предоставлен ипотечным сервисом Инстатека (ООО "Сакура")
      </a>
    </div>
  </div>
</div>
