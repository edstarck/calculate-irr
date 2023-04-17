<script>
  export let banks = [];
  import {prettify} from '../utils/utils';

  // Склонение числительных
  function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
  }
</script>

{#each banks as {bank, logo, name, rate, link, term, payment} (bank)}
  <div class="b-card">
    <div class="b-card__header">
      <div class="b-card__img">
        <img src={logo} alt={bank} width="48" height="48" onerror="this.src='data:image/png;base64,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'">
      </div>
      <div class="b-card__info">
        <div class="b-card__name">{bank}</div>
        <div class="b-card__title">{name}</div>
      </div>
    </div>
    <div class="b-card__body">
      <div class="b-card__block">
        <div class="b-card__label">Ставка:</div>
        <div class="b-card__value">{rate}%</div>
      </div>
      <div class="b-card__block">
        <div class="b-card__label">Срок:</div>
        <div class="b-card__value">{term} {declOfNum(term, ['год', 'года', 'лет'])}</div>
      </div>
      <div class="b-card__block">
        <div class="b-card__label">Платеж:</div>
        <div class="b-card__value">{prettify(parseInt(payment))} ₽</div>
      </div>
    </div>
    <div class="b-card__footer">
      <a target="_blank" href={link} class="b-card__btn">Оформить заявку</a>
    </div>
  </div>
{/each}