import PocketBase from 'pocketbase';
import { getNode, getNodes, getPbImageURL } from '/src/lib';

const pb = new PocketBase(import.meta.env.VITE_PB_URL);
const prev = getNode('#prev');
const hash = window.location.search.slice(2);
const contentName = getNode('#contentName');
const finish = getNode('#finish');
const checkBox = getNode('#checkBox')

const data = await pb.collection('selling').getOne(hash);


async function methodInfo() {
  const previewImg = getNode('#previewImg');
  const productTitle = getNode('#productTitle');
  const letterCount = getNode('#letterCount');
  const tradeButton = getNodes('#tradeMethod > button');
  const descriptionCount = getNode('#descriptionCount');
  const desc = getNode('#description');
  
  const { description, title, tradingType, isPriceOffer } = data;

  letterCount.textContent = title.length + "/24";
  descriptionCount.textContent = title.length + '/500';

  if (tradingType === 'sell') {
    tradeButton[0].style.backgroundColor = '#373F67';
    tradeButton[0].style.color = 'white';
  } else {
    tradeButton[1].style.backgroundColor = '#373F67';
    tradeButton[1].style.color = 'white';
  }

  if(isPriceOffer === true){
    checkBox.checked = true;
  }

  previewImg.src = getPbImageURL(data, 'productImages');
  productTitle.value= title;
  desc.value = description;
}

let warningMessage = null;
  const spell = getNode('#spell');


function validation({ target }) {

  const { value } = target;
  const regExp = /^[0-9]*$/;
  const isValid = regExp.test(value);

  if (isValid) {
    contentName.value = contentName.value.replace(/[^0-9]/g, '');
    if (warningMessage) {
      warningMessage.remove();
      warningMessage = null;
    }
if (contentName.value.length > 12) {
    contentName.value = contentName.value.slice(0, 12);
    warningMessage = document.createElement('span');
    warningMessage.textContent = `숫자는 12이하로 입력해주세요`;
    warningMessage.classList.add(
      'text-label-sm',
      'text-red-500',
      'text-right',
      'block'
    );
    spell.insertAdjacentElement('afterbegin', warningMessage);
}
  } else if (!warningMessage) {
    warningMessage = document.createElement('span');
    warningMessage.classList.add(
      'text-label-sm',
      'text-red-500',
      'text-right',
      'block'
    );
    warningMessage.textContent = `숫자만 입력해주세요`;
    spell.insertAdjacentElement('afterbegin', warningMessage);
  }
}

function change(){
  const dataList = {
    title: data.title,
    description: data.description,
    tradingType: data.tradingType,
    price: Number(contentName.value),
    user:pb.authStore.model.id,
  }

  pb.collection('selling')
    .update(hash, dataList)
    .then(() => {
      window.location.href = '/src/pages/exchange/exchangeDetail.html';
    });
}

contentName.addEventListener('input', validation);
prev.addEventListener('click', () => history.back());
finish.addEventListener('click', change);
methodInfo();



