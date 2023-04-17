<script>
  import IrrLoader from "./UI/IrrLoader.svelte";
  import IrrExtendedForm from "./IrrExtendedForm.svelte";

  // model
  let isShow = false;
  let isLoading = false;
  let initialValues = {
    product: "STANDARD",
    employment: "-1",
    citizenship: "643",
    registration: "-1",
    age: "",
    ageError: "",
    jobTermTotal: "",
    jobTermTotalError: "",
    jobTermCurrent: "",
    jobTermCurrentError: "",
  };

  // methods
  function handleClickShow() {
    isLoading = true;
    isShow = !isShow;
  }

  function onLoad(event) {
    isLoading = event.detail.isLoading;
  }

  var r = document.querySelector(":root");
  r.style.setProperty("--path", `url(./images/icon-select-arrow.svg)`);
</script>

<div class="i-accordion {isShow ? 'active' : ''}">
  <div class="i-accordion__toggle">
    <div class="i-accordion__info">
      Вы можете указать
      <span class="i-accordion__accent" on:click={handleClickShow}>
        дополнительные сведения
      </span>
      для более точного рассчета
    </div>
    <div class="i-accordion__info--mobile">
      <span class="i-accordion__accent" on:click={handleClickShow}>
        Дополнительные сведения
      </span>
    </div>
    <span class="i-accordion__trigger" on:click={handleClickShow}>
      <img
        class="i-accordion__arrow"
        src="./images/icon-select-arrow.svg"
        alt=""
      />
    </span>
  </div>

  {#if isShow}
    <div class="i-accordion__inner">
      <div class="i-form">
        {#if isLoading}
          <IrrLoader />
        {/if}
        <IrrExtendedForm {isLoading} {...initialValues} on:load={onLoad} />
      </div>
    </div>
  {/if}
</div>
