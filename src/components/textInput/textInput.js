const textValue = document.querySelector('#contentName');
const span = document.querySelector('#letterCount');

function getValue() {
  const value = textValue.value;
  span.textContent = `${value.length}/24`;
}

textValue.addEventListener('input', getValue);
