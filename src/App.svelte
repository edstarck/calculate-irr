<script>
  import { onMount } from "svelte";
  import { fetchData } from "./utils/fetchDataNew";

  import Results from "./components/Results.svelte";
  import Alert from "./components/Alert.svelte";
  import Skeleton from "./components/Skeleton.svelte";
  import IrrForm from "./components/IrrForm.svelte";
  import IrrExtendedSettings from "./components/IrrExtendedSettings.svelte";

  let totalCost = parseInt(IRR.Info.product.price);
  let defaultInitialFee = parseInt((totalCost * 20) / 100);
  // let defaultInitialFee = parseInt(2375655.2);
  let initialFeeError = "";
  let years = 20;
  let yearsError = "";
  let isShow = false;
  let isValide = true;

  let maxInitialFee = (totalCost * 90) / 100;
  let references = {};

  let results = [];
  let loading = "false";

  let product = "STANDARD";
  let employment = "-1";
  let citizenship = "643";
  let registration = "-1";
  let age = "";
  let ageError = "";
  let jobTermTotal = "";
  let jobTermTotalError = "";
  let jobTermCurrent = "";
  let jobTermCurrentError = "";
  let percentFee = "";

  let bestRate = [];

  $: if (!/^\d+$/.test(defaultInitialFee)) {
    percentFee = 0;
  } else if (defaultInitialFee > maxInitialFee) {
    percentFee = "> 90";
  } else {
    percentFee = parseInt((defaultInitialFee * 100) / totalCost);
  }

  // $: percentFee = parseInt((defaultInitialFee * 100) / totalCost);

  onMount(() => {
    fetchData("./mock/references.json").then((data) => {
      references = data.references;
    });

    buildQuery();
  });

  function buildQuery() {
    if (!validate()) {
      return;
    }

    let queryParams = [];
    setParam(queryParams, "advertId", IRR.Info.product.id);
    setParam(queryParams, "product", product);
    setParam(queryParams, "initialFee", defaultInitialFee);
    setParam(queryParams, "term", years);
    setParam(queryParams, "age", age);
    setParam(queryParams, "citizenship", citizenship);
    setParam(queryParams, "registration", registration);
    setParam(queryParams, "employment", employment);
    setParam(queryParams, "jobTermTotal", jobTermTotal);
    setParam(queryParams, "jobTermCurrent", jobTermCurrent);
    let url = new URLSearchParams({ ...queryParams });

    loading = "true";

    fetchData("./mock/banks.json")
      .then((data) => {
        loading = "false";
        results = data.banks;
        bestRate = results;
        bestRate = bestRate.map(({ rate }) => parseFloat(rate));
      })
      .catch((error) => {
        loading = "error";
        console.log(error);
      });
  }

  function setParam(params, name, val) {
    if (name === "initialFee" && val === 0) {
      params[name] = val;
    }
    if (val != null && val != "" && val != "-1") {
      params[name] = val;
    }
  }

  function handleChange() {
    buildQuery();
  }

  function handleClickShow() {
    isShow = !isShow;
  }

  let wait = false;

  function handleChangeInput() {
    if (wait) {
      return;
    }
    wait = true;
    setTimeout(() => {
      buildQuery();
      wait = false;
    }, 1000);
  }

  function validate() {
    isValide = true;
    if (age !== "" && (!/^\d+$/.test(age) || age < 18 || age > 85)) {
      ageError = "Укажите возраст от 18 до 85 лет";
      isValide = false;
    } else {
      ageError = "";
    }

    if (jobTermTotal !== "" && !/^\d+$/.test(jobTermTotal)) {
      jobTermTotalError = "Введите число";
      isValide = false;
    } else {
      jobTermTotalError = "";
    }

    if (jobTermCurrent !== "" && !/^\d+$/.test(jobTermCurrent)) {
      jobTermCurrentError = "Введите число";
      isValide = false;
    } else {
      jobTermCurrentError = "";
    }

    if (!/^\d+$/.test(defaultInitialFee)) {
      initialFeeError = "Введите число";
      isValide = false;
    } else if (defaultInitialFee >= totalCost - 1000) {
      initialFeeError = "Сумма кредита не может быть менее 1000 руб.";
      isValide = false;
      // defaultInitialFee = maxInitialFee
    } else {
      initialFeeError = "";
    }

    if (!/^\d+$/.test(years)) {
      yearsError = "Введите число";
      isValide = false;
    } else if (years < 1 || years > 30) {
      yearsError = "Укажите срок ипотеки от 1 года до 30 лет";
      isValide = false;
      // years = 30
    } else {
      yearsError = "";
    }

    return isValide;
  }

  var r = document.querySelector(":root");
  r.style.setProperty("--path", `url(./images/icon-select-arrow.svg)`);

  //   ======================
  let form = {
    totalPayment: 10000000,
    initialPayment: 1900000,
    creditDuration: 20,
  };
</script>

<div class="wrap">
  <div class="irr-plugin">
    <section class="b-section">
      <div class="b-section-title">Подбор ипотеки</div>
      <IrrForm {...form} />
      <IrrExtendedSettings />
    </section>

    {#if isValide}
      <section class="b-section">
        {#if bestRate.length}
          <div class="b-section-title">
            Лучшие условия <span class="c-success"
              >(Ставка от {Math.min(...bestRate)}%)</span
            >
          </div>
        {/if}
        <div class="b-card-container">
          {#if loading === "true"}
            {#each Array(4) as _}
              <Skeleton />
            {/each}
          {/if}
          {#if loading === "false"}
            <Results banks={results} />
            {#if !results.length}
              <Alert />
            {/if}
          {/if}
          {#if loading === "error"}
            <Alert />
          {/if}
        </div>
      </section>
    {/if}
  </div>
</div>
