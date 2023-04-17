<div class="b-alert b-alert--warning">
  <div class="b-alert__icon">
    <svg width="20" height="20" viewbox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 5H11V7H9V5Z"></path>
      <path d="M9 9H11V15H9V9Z"></path>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 4.48 4.47998 0 10 0C15.52 0 20 4.48 20 10C20 15.52 15.52 20 10 20C4.47998 20 0 15.52 0 10ZM2 10C2 14.41 5.58997 18 10 18C14.41 18 18 14.41 18 10C18 5.59 14.41 2 10 2C5.58997 2 2 5.59 2 10Z"></path>
    </svg>
  </div>
  <div class="b-alert__message">
    <p>К сожалению по вашему запросу не найдено подходящих предложений, попробуйте изменить критерии поиска</p>
  </div>
</div>

<style>
  .b-alert {
    background: #efefef;
    border: 1px solid #e0e0e0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 26px;
    color: #ff4d4d
  }
  .b-alert,
  .b-alert__icon {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex
  }
  .b-alert__icon {
    margin-right: 8px;
    width: 24px;
    height: 24px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    margin-top: -3px
  }
  .b-alert__message p {
    font-size: 14px;
    line-height: 18px;
    margin-top: 0
  }
  .b-alert__message p:last-child {
    margin-bottom: 0
  }
  .b-alert--warning {
    background: #ffeceb;
    border-color: #fed2ce
  }
  .b-alert--warning .b-alert__message {
    color: #ff4d4d
  }
</style>