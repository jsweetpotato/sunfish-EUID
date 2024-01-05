const textValue = document.querySelector('#contentName');
const span = document.querySelector('#letterCount');

function getValue() {
  const value = textValue.value;
  span.textContent = `${value.length}/24`;
}

textValue.addEventListener('input', getValue);

function textValidation() {
  const textLength = [6, 20, 24, 500];

  if (textValue.length === textLength[0]) {
  }
}
