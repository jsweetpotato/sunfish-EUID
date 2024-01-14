import { hangulIncludes } from '@toss/hangul';
import { pb } from '../../lib';
import { resultDataList } from './data';
import { drawRecentSearchList } from './draw';

const $back = document.querySelectorAll('#back');
$back.onclick = () => window.history.back();

const $searchForm = document.querySelector('#searchForm');
const $searchInput = document.querySelector('#searchInput');
const $recentSearchUl = document.querySelector('#recent-search-ul');
const $searchCombobox = document.querySelector('#search-combobox');
const $defaultSearchView = document.querySelector('#default-search-view');
const $popularSearchItems = document.querySelectorAll(
  '#popular-search-ul button'
);
const $skipList = document.querySelectorAll('.skip');

const recentSearchList = [
  {
    name: '감자',
  },
  {
    name: 'preview',
  },
  {
    name: 'Programming',
  },
  {
    name: '컴퓨터',
  },
  {
    name: '노트북',
  },
  {
    name: '고라니',
  },
  {
    name: '지능',
  },
];

drawRecentSearchList(recentSearchList, $recentSearchUl);

/* -------------------------------------------------------------------------- */
/*                                 스킵하기                                    */
/* -------------------------------------------------------------------------- */
const toRecentList = () => $recentSearchUl.querySelector('button').focus();
$skipList[0].onclick = toRecentList;

const toSearchInput = () => $searchInput.focus();
$skipList[1].onclick = toSearchInput;

$popularSearchItems.forEach((item) => {
  // eslint-disable-next-line no-param-reassign
  item.onclick = () => {
    $searchInput.value = item.innerText;
    toSearchInput();
  };
});

// the standard way to create multipart/form-data body
/* -------------------------------------------------------------------------- */
/*                              최근 검색 목록                                  */
/* -------------------------------------------------------------------------- */

$recentSearchUl.addEventListener('focusin', (e) => {
  const { target } = e;
  console.log(target);

  if (target.dataset.type === 'delete') {
    target.addEventListener('click', () => {
      const { idx } = target.dataset;
      recentSearchList.splice(idx, 1);
      $recentSearchUl.innerHTML = '';
      drawRecentSearchList(recentSearchList, $recentSearchUl);
    });
    return;
  }

  target.addEventListener('click', () => {
    const t = target.querySelector('.search-btn');
    console.log(t);
    $searchInput.value = t.innerText;
    toSearchInput();
  });
});

/* -------------------------------------------------------------------------- */
/*                                검색어 추천                                   */
/* -------------------------------------------------------------------------- */

// drawSuggestionList(,$searchCombobox)

// 검색어 셀렉 하면 -> 인풋에 그려짐 ✅
// 인풋 벨류 가져와서 검색하기
// 인풋에 하나라도 작성되면 리스트 안보이기
// 데이터 저장소 총 5개 -> 이거를 하나씩 검색하면 너무 느림..

// ⏩ 보여주기 식으로 변경

function debounce(callback, limit = 200) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, limit);
  };
}

const getData = await pb.collection('qna').getFullList();

window.localStorage.setItem('data', JSON.stringify(getData));

let searchResult;
// 타이틀하고 설명 칸에 해당 단어가 있으면 데이터(배열)추출 ✅
// 여기서 나온 데이터가 title에서 나온건지 description에서 나온건지 확인해야함

const getSearchKeywords = (input) =>
  resultDataList.filter((item) => {
    const { title, description } = item;
    return hangulIncludes(title, input) || hangulIncludes(description, input);
  });

const getSearchSuggestions = () => {
  const input = $searchInput.value;
  const searchKeywords = getSearchKeywords(input);
  searchResult = searchKeywords;
};

// eslint-disable-next-line consistent-return
const handleInput = () => {
  if ($searchInput.value === '')
    return $defaultSearchView.classList.remove('hidden');
  $defaultSearchView.classList.add('hidden');
  getSearchSuggestions();
};

$searchInput.addEventListener('input', debounce(handleInput, 150));

// 테스트 데이터를 더 만들자
$searchForm.onsubmit = () => {
  const searchQuery = $searchInput.value;
  // 여기에 검색 처리 로직을 추가합니다.

  // 폼의 기본 제출 동작을 방지합니다.
  return false;
};

const imgField = document.querySelector('#image-file');
const testBtn = document.querySelector('#test-btn');

async function handleNewPost() {
  const data = {
    field: imgField.files[0],
    desc: 'sdasdasdd',
    name: 'test',
  };

  try {
    await pb.collection('test').create(data);
  } catch (e) {
    console.log(e);
    alert('상품 정보를 올바르게 입력해 주세요.');
  }
}
testBtn.addEventListener('click', (e) => {
  e.preventDefault();
  handleNewPost();
});
