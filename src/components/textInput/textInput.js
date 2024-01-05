const textValue = document.querySelector('#contentName');
const span = document.querySelector('#letterCount');

function getValue() {
  const { value } = textValue;
  span.textContent = `${value.length}/24`;
}

textValue.addEventListener('input', getValue);
