import PocketBase from 'pocketbase';
import { getNode, getNodes, getPbImageURL, checkAuth } from '/src/lib';

const pb = new PocketBase(import.meta.env.VITE_PB_URL);
const prev = getNode('#prev');
const idParam = new URL(window.location.href).searchParams.get('id');
const contentName = getNode('#contentName');
const finish = getNode('#finish');
const checkBox = getNode('#checkBox');

const data = await pb.collection('selling').getOne(idParam);

async function methodInfo() {
  if (!checkAuth()) return;

  const previewImg = getNode('#previewImg');
  const productTitle = getNode('#productTitle');
  const letterCount = getNode('#letterCount');
  const tradeButton = getNodes('#tradeMethod > button');
  const descriptionCount = getNode('#descriptionCount');
  const desc = getNode('#description');

  const { description, title, tradingType, isPriceOffer } = data;

  letterCount.textContent = title.length + '/24';
  descriptionCount.textContent = title.length + '/500';

  if (tradingType === 'sell') {
    tradeButton[0].style.backgroundColor = '#373F67';
    tradeButton[0].style.color = 'white';
  } else {
    tradeButton[1].style.backgroundColor = '#373F67';
    tradeButton[1].style.color = 'white';
  }

  if (isPriceOffer === true) {
    checkBox.checked = true;
  }

  previewImg.src = getPbImageURL(data, 'productImages');
  productTitle.value = title;
  desc.value = description;
}

let warningMessage = null;
const spell = getNode('#spell');

function validation({ target }) {
  if (!checkAuth()) return;
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

async function change(value) {
  if (!checkAuth()) return;
  if (!pb || !pb.authStore || !pb.authStore.model) {
    console.log('pb.authStore.model is undefined');
    return;
  }

  const dataList = {
    price: Number(value),
    user: pb.authStore.model.id,
  };

  try {
    await pb.collection('selling').update(idParam, dataList);
    window.location.href = `/src/pages/exchange/exchangeDetail.html?id=${idParam}`;
  } catch (error) {
    console.log('Update failed', error);
  }
}

contentName.addEventListener('input', validation);
prev.addEventListener('click', () => history.back());
finish.addEventListener('click', () => {
  if (
    parseInt(contentName.value.length) > 12 ||
    contentName.value[0] === '0' ||
    isNaN(contentName.value) ||
    contentName.value === ''
  ) {
    return;
  }
  change(contentName.value);
});

methodInfo();
