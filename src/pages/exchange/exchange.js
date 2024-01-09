const plusButton = document.querySelector('#plusButton-container');
const plusButtonIcon = document.querySelector('#plusButton');
const body = document.querySelector('body');
let clickCount = 0;
let createCategory;

function onClick(){
  clickCount++;
  if(clickCount % 2 !== 0 ){
    body.style.background='rgba(0, 0, 0, 0.5)';
    plusButton.insertAdjacentHTML('beforebegin', /*html */
    `
    <div id='span-tag' class="flex w-[8.3125rem] grow flex-col gap-1 fixed bottom-36 left-[53%] max-md:left-[63%]">
      <span class="bg-exchange-icon border h-10 flex items-center grow justify-center px-5 py-2 rounded-[3.75rem]"></span>
      <span class="bg-project-icon border h-10 flex items-center grow justify-center px-5 py-2 rounded-[3.75rem]"></span>
      <span class="bg-study-icon border h-10 flex items-center grow justify-center px-5 py-2 rounded-[3.75rem]"></span>
    </div>
    `);

    createCategory = document.querySelector('#span-tag');
    plusButtonIcon.classList.remove('bg-plus-icon')
    plusButtonIcon.classList.add('bg-exchange-close-icon');
  }else {
    body.style.background='';
    if(createCategory) {
      createCategory.remove();
    }
    plusButtonIcon.classList.remove('bg-exchange-close-icon');
    plusButtonIcon.classList.add('bg-plus-icon');
  }
}

plusButton.addEventListener('click', onClick);
