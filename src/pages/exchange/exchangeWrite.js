import PocketBase from 'pocketbase';
import { getNode, getNodes } from "/src/lib";

const pb = new PocketBase(import.meta.env.VITE_PB_URL);
const prev = getNode('#prev');
const tradeButton = getNodes('#tradeMethod > button');


async function methodInfo() {
  const hash = window.location.hash.slice(1);
  const data = await pb.collection('selling').getOne(hash);

  if (data.tradingType === 'sell') {
    tradeButton[0].style.backgroundColor = '#373F67';
    tradeButton[0].style.color = 'white';
  } else {
    tradeButton[1].style.backgroundColor = '#373F67';
    tradeButton[1].style.color = 'white';
  }
}

// function validation({ target }) {
//   let {value} = target;
//   const regExp = /^[0-9]*$/; 
//   const isValid = regExp.test(value);

//   if (!isValid) {
//     console.log('숫자만 입력해주세요.');
//     value = value.replace(/[^0-9]/g, ''); 
//   }
// }


prev.addEventListener('click', () => history.back())
methodInfo()


