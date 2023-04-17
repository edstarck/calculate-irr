<script>
  import { onMount } from "svelte";
  import banksApi from "../api/banks";

  // components
  import IrrAlert from "./UI/IrrAlert.svelte";
  import IrrSkeleton from "./UI/IrrSkeleton.svelte";
  import IrrSummaryBanks from "./IrrSummaryBanks.svelte";

  // model
  let banks = [];
  let isLoading = false;
  let isError = false;

  // computed props
  $: topCreditOffers = banks
    .map((bank) => parseFloat(bank.rate))
    .sort((a, b) => a.rate - b.rate);

  $: isBanks = banks.length > 0;
  // hooks
  onMount(fetchBanks);

  // methods
  function fetchBanks() {
    return new Promise((resolve) => {
      isLoading = true;
      banksApi
        .getBanks("banks.json")
        .then((response) => {
          isLoading = false;
          banks = response;
          resolve(response);
        })
        .catch(() => {
          isError = true;
          throw new Error("Oooopss...Something wrong.");
        });
    });
  }
</script>

<section class="b-section">
  {#if topCreditOffers.length}
    <div class="b-section-title">
      Лучшие условия <span class="c-success"
        >(Ставка от {Math.min(...topCreditOffers)}%)</span
      >
    </div>
  {/if}

  <div class="b-card-container">
    {#if isLoading}
      {#each Array(4) as _}
        <IrrSkeleton />
      {/each}
    {/if}
    {#if isBanks}
      <IrrSummaryBanks {banks} />
    {/if}
    {#if isError || !isBanks}
      <IrrAlert />
    {/if}
  </div>
</section>
