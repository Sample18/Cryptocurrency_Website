// start pop up menu
let menu = document.querySelector(".menu");

menu.addEventListener("click", function() {
  menu.classList.toggle("open");
});
// end pop up menu



// start калькулятор ETH
let count = document.querySelector('.count');
let btn = document.querySelector('.button-hr');
let hr_inp = document.getElementById('hash-rate');
let sl_inp = document.getElementById("select-hash-rate");
let MHs = 0.00006;

// при клике на кнопку отрабатывает функция
btn.addEventListener('click', responseResult);

// при фокусе на инпуте и нажатии enter отрабатывает функция
hr_inp.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    responseResult();
  }
});

// при фокусе на селекте и нажатии enter отрабатывает функция
sl_inp.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    responseResult();
  }
});

// функция делает запрос на сервер, парсит результат
function responseResult() {
  fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
.then((response) => {
  const result = response.json();
  return result;
})
.then((data) => {
  // получаем цену 1 эфира в долларах на текущий момент и записываем в переменную
  let prise = data.USD;

  // получаем значение селекта и вычисляем количество эфира
  let hash_inp = Number(hr_inp.value);
  let n = sl_inp.options.selectedIndex;
  let val = Number(sl_inp.options[n].value);
  let amount = MHs * val * hash_inp;

  // записываем результат в ноду
  count.innerHTML = `${+amount.toFixed(6)} ETH <span class="count-bl">(&#36;${+(prise * amount).toFixed(2)})</span>`;
})
.catch(() => { console.log('error') })
}
// end калькулятор ETH