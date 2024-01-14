import { hangulIncludes } from '@toss/hangul';
import { pb } from '../../lib';
import { keywords, resultDataList } from './data';
import { drawRecentSearchList } from './draw';
// import { drawSuggestionList } from './suggestion';

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

function debounce(callback, limit = 200) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, limit);
  };
}

const $back = document.querySelector('#back');

$back.addEventListener('click', (e) => {
  e.preventDefault();
  window.history.back();
});

const $searchForm = document.querySelector('#searchForm');
const $searchInput = document.querySelector('#searchInput');

const $defaultSearchView = document.querySelector('#default-search-view');
const $recentSearchUl = document.querySelector('#recent-search-ul');

const $suggestionView = document.querySelector('#suggestion-view');
const $suggetionList = document.querySelectorAll('.suggestion-item');

const $popularSearchItems = document.querySelectorAll(
  '#popular-search-ul button'
);
const $skipList = document.querySelectorAll('.skip');

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

/* -------------------------------------------------------------------------- */
/*                              최근 검색 목록                                  */
/* -------------------------------------------------------------------------- */

$recentSearchUl.addEventListener('focusin', (e) => {
  const { target } = e;

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
    $searchInput.value = target.innerText.trim();
    toSearchInput();
    // renderSearchList();
  });
});

/* -------------------------------------------------------------------------- */
/*                                검색어 추천                                   */
/* -------------------------------------------------------------------------- */

let searchedKeywords;

// 키워드 추출
const getSearchKeywords = (input) =>
  keywords.filter((item) => hangulIncludes(item, input));

// 추천 검색어 리스트
const getSearchSuggestionList = () => {
  const input = $searchInput.value;
  searchedKeywords = getSearchKeywords(input);

  $suggetionList.forEach((item, idx) => {
    const li = item.closest('li');
    if (searchedKeywords[idx]) {
      li.classList.remove('hidden');
      item.innerText = searchedKeywords[idx];
    } else li.classList.add('hidden');
  });
};

const handleSuggestion = () => {
  if ($searchInput.value === '') {
    $suggestionView.classList.add('hidden');
    $defaultSearchView.classList.remove('hidden');
    return;
  }
  $defaultSearchView.classList.add('hidden');
  $suggestionView.classList.remove('hidden');

  getSearchSuggestionList();
};

$searchInput.addEventListener('input', debounce(handleSuggestion, 120));

/* -------------------------------------------------------------------------- */
/*                                 검색 결과                                   */
/* -------------------------------------------------------------------------- */

let searchedResult;

// const getSearchKeywords = (input) =>
//   resultDataList.filter((item) => {
//     const { title, description } = item;
//     return hangulIncludes(title, input) || hangulIncludes(description, input);
//   });

$searchForm.onsubmit = () => {
  const searchQuery = $searchInput.value;
  // 여기에 검색 처리 로직을 추가합니다.

  // 폼의 기본 제출 동작을 방지합니다.
  return false;
};
