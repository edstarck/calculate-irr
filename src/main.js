import App from "./App.svelte";

const app = new App({
  target: document.getElementById("calculate"),
});

export default app;

// TODO:
// добавить стор
// сделать валидацию
// сделать нормальные алиасы
// разнести стили по компонентам
