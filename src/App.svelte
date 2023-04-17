<script>
  import IrrForm from "./components/IrrForm.svelte";
  import IrrExtendedSettings from "./components/IrrExtendedSettings.svelte";
  import IrrBestCreditTerms from "./components/IrrBestCreditTerms.svelte";

  // model
  let form = {
    totalPayment: 10000000,
    initialPayment: 1900000,
    creditDuration: 20,
  };

  let isValide = true;
</script>

<div class="wrap">
  <div class="irr-plugin">
    <section class="b-section">
      <div class="b-section-title">Подбор ипотеки</div>
      <IrrForm {...form} />
      <IrrExtendedSettings />
    </section>

    {#if isValide}
      <IrrBestCreditTerms />
    {/if}
  </div>
</div>
