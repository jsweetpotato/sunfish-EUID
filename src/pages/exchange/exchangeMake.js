import PocketBase from 'pocketbase';
import { getNode, getNodes } from '/src/lib';

const pb = new PocketBase(import.meta.env.VITE_PB_URL);
const prev = getNode('#prev');
const tradeButton = getNodes('#tradeMethod > button');
const fileInput = getNode('#fileInput');
const finish = getNode('#finish');
const title = getNode('#productTitle');
const Information = getNode('#Information');
const contentName = getNode('#contentName');

let tradeType = ''; 

async function changeColor({ target }) {
  tradeButton.forEach((item) => {
    item.style.backgroundColor = '';
    item.style.color = '';
  });

  target.style.color = 'white';
  target.style.backgroundColor = '#373F67';

  tradeType = target.dataset.trade; 
}

const handleFiles = () => {
  const selectedFile = [...fileInput.files];
  const formData = new FormData();

  if (selectedFile.length > 0) {
    formData.append('file', selectedFile[0]);
    fileValue = formData; // FormData 객체를 fileValue에 저장
  }

  const fileReader = new FileReader();

  fileReader.readAsDataURL(selectedFile[0]);

  fileReader.onload = function () {
    document.getElementById('previewImg').src = fileReader.result;
  };
};

let titleValue = '';
let infoValue = '';
let contentValue = '';

  // const data = {
  //   title: titleValue,
  //   description: infoValue,
  //   productImages: '',
  //   price: Number(contentValue),
  //   tradingType: tradeType,
  //   user: pb.authStore.model.id,
  // };

async function submit(){
  const data = {
    title: 'test',
    description: 'test',
    tradingType: 'nanum',
    price: 123,
    isPriceOffer: true,
    user: pb.authStore.model.id,
  };

  console.log(data)
  const record = await pb.collection('selling').create(data);
  console.log(record)
}


fileInput.addEventListener('change', handleFiles);
prev.addEventListener('click', () => history.back());
tradeButton.forEach((item) => {
  item.addEventListener('click', changeColor);
})
finish.addEventListener('click', submit);

// 제목 input 이벤트
title.addEventListener('input', (e) => {
  const inputValue = e.target.value;
  if (inputValue !== '' && isNaN(inputValue) && inputValue.length <= 24) {
    titleValue = inputValue;
  }
});

// 정보 input 이벤트
Information.addEventListener('input', (e) => {
  const inputValue = e.target.value;
  if (inputValue !== '' && isNaN(inputValue) && inputValue.length <= 24) {
    infoValue = inputValue;
  }
});

// 내용 이름 input 이벤트
contentName.addEventListener('input', (e) => {
  const inputValue = e.target.value;
  if (
    inputValue !== '' &&
    isNaN(inputValue) === false &&
    inputValue.length <= 12
  ) {
    contentValue = inputValue;
  }
});

