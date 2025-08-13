function showCalculator(id) {
  document.querySelectorAll('.calculator').forEach(calc => {
    calc.style.display = 'none';
  });
  document.getElementById(id).style.display = 'block';
}

function addAlcoholInput(containerId) {
  const div = document.createElement('div');
  div.style.marginTop = "10px";
  div.innerHTML = `
    <input type="number" placeholder="용량(ml)">
    <input type="number" placeholder="도수(%)">
  `;
  document.getElementById(containerId).appendChild(div);
}

function addPriceInput() {
  const div = document.createElement('div');
  div.style.marginTop = "10px";
  div.innerHTML = `
    <input type="number" placeholder="한 병 용량(ml)">
    <input type="number" placeholder="사용량(ml)">
    <input type="number" placeholder="가격(원)">
  `;
  document.getElementById('price-list').appendChild(div);
}

function calcAlcoholPercent() {
  const inputs = document.querySelectorAll('#alc-list div');
  let totalML = 0, totalAlcohol = 0;
  inputs.forEach(div => {
    const [ml, abv] = div.querySelectorAll('input');
    totalML += Number(ml.value);
    totalAlcohol += Number(ml.value) * (Number(abv.value) / 100);
  });
  if (totalML === 0) {
    document.getElementById('result1').innerText = '입력값이 없습니다.';
    return;
  }
  const result = totalAlcohol / totalML * 100;
  document.getElementById('result1').innerText = `도수: ${result.toFixed(1)}%`;
}

function calcBAC() {
  const weight = Number(document.getElementById('weight').value);
  const sex = Number(document.getElementById('sex').value);
  const hour = Number(document.getElementById('hour').value);
  const r = sex === 1 ? 0.86 : 0.64;
  const ALCOHOL_DENSITY = 0.789;

  let totalGrams = 0;
  const inputs = document.querySelectorAll('#bac-list div');
  inputs.forEach(div => {
    const [ml, abv] = div.querySelectorAll('input');
    const pureAlcoholML = Number(ml.value) * (Number(abv.value) / 100);
    totalGrams += pureAlcoholML * ALCOHOL_DENSITY;
  });

  if (weight === 0 || totalGrams === 0) {
    document.getElementById('result2').innerText = '입력값이 부족합니다.';
    return;
  }

  const bodyMassG = weight * 1000;
  let bac = (totalGrams / (bodyMassG * r)) * 100;
  bac -= 0.015 * hour;
  if (bac < 0) bac = 0;
  document.getElementById('result2').innerText = `BAC: ${bac.toFixed(4)}%`;
}

function calcPrice() {
  let totalPrice = 0;
  const inputs = document.querySelectorAll('#price-list div');
  inputs.forEach(div => {
    const [totalML, usage, price] = div.querySelectorAll('input');
    if (Number(totalML.value) > 0) {
      totalPrice += Number(price.value) * (Number(usage.value) / Number(totalML.value));
    }
  });
  document.getElementById('result3').innerText = `총 가격: ${Math.round(totalPrice)}원`;
}
