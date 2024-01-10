const plusButton = document.querySelector('#plusButton-container');
const plusButtonIcon = document.querySelector('#plusButton');
const body = document.querySelector('body');
const exchangeList = document.querySelector('#exchangeList');
const heartContainer = document.querySelectorAll('.heartContainer');
let clickCount = 0;
let isClick = false;
let createCategory;

function onClick(){
  clickCount++;

  if(clickCount % 2 !== 0 ){
    body.style.background='rgba(0, 0, 0, 0.5)';
    plusButton.insertAdjacentHTML('beforebegin', /*html */
    `
    <div id='span-tag' class="flex flex-col absolute left-[-78px] w-full min-w-screen max-w-screen">
      <div class="fixed bottom-36 flex flex-col w-[133px] items-center gap-1">
        <a href="/src/pages/exchange/index.html" class="bg-exchange-icon h-10 px-[20px] py-[10px] self-stretch rounded-[60px]"></a>
        <span class="bg-project-icon h-10 px-[20px] py-[10px] self-stretch rounded-[60px]"></span>
        <span class="bg-study-icon h-10 px-[20px] py-[10px] self-stretch rounded-[60px]"></span>
      </div>
    </div>
    `);

    createCategory = document.querySelector('#span-tag');
  }else {
    body.style.background='';
    if(createCategory) {
      createCategory.remove();
    }
  }
}

function toggle(){
  isClick != isClick
  this.classList.toggle('bg-plus-icon');
  this.classList.toggle('bg-exchange-close-icon');
  this.classList.toggle('bg-white');
  this.classList.toggle('bg-secondary');
}

function move(){
  window.location.href='/src/pages/exchange/exchangeDetail.html';
}

function stop(e){
  e.stopPropagation();
  isClick = !isClick; 
  if(!isClick){
    e.currentTarget.style.backgroundColor=''; 
  } else {
    e.currentTarget.style.backgroundColor='pink';
  }
}


heartContainer.forEach((item) => {
  item.addEventListener('click', stop);
})
plusButton.addEventListener('click', onClick);
plusButtonIcon.addEventListener('click', toggle);
exchangeList.addEventListener('click', move)