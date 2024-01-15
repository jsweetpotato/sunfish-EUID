import gsap from 'gsap';
import { hangulIncludes } from '@toss/hangul';
import { keywords, resultDataList } from './data';
import { drawRecentSearchList, drawSearchResultList } from './draw';

const recentSearchList = (() => {
  let searchlist;
  if (localStorage.getItem('search-list')) {
    const savedSearchList = localStorage.getItem('search-list');
    // 문자열을 Array로 변환
    const setArray = JSON.parse(savedSearchList);
    // Array를 Set으로 변환
    searchlist = new Set(setArray);
  } else searchlist = new Set();
  return searchlist;
})();

const $back = document.querySelector('#back');

$back.addEventListener('click', (e) => {
  e.preventDefault();
  window.history.back();
});

const $searchForm = document.querySelector('#searchForm');
const $searchInput = document.querySelector('#searchInput');

const $defaultSearchView = document.querySelector('#default-search-view');
const $popularSearchItems = document.querySelectorAll(
  '#popular-search-ul button'
);
const $recentSearchUl = document.querySelector('#recent-search-ul');

const $suggestionView = document.querySelector('#suggestion-view');
const $suggestionCombobox = document.querySelector('#suggestion-combobox');
const $suggetionList = document.querySelectorAll('.suggestion-item');

const $searchResultView = document.querySelector('#search-result-view');
const $searchResultUl = document.querySelector('#search-result-ul');

const $skipList = document.querySelectorAll('.skip');

let searchedResult;

drawRecentSearchList(recentSearchList, $recentSearchUl);

function renderNothing() {
  $searchResultUl.insertAdjacentHTML(
    'beforeend',
    /* html */ `
  <li>
    <div class="sorry p-3 flex flex-col text-center">
      <span class="text-heading-2xl">😅</span>
      <p class="p-1 text-paragraph-lg">게시물이 없습니다.</p>
    </div>
  </li>
   `
  );
  gsap.from('.sorry', {
    y: 30,
    opacity: 0,
    duration: 0.2,
  });
}

function getSearchList() {
  return resultDataList.filter((item) => {
    const { title, description } = item;
    return (
      hangulIncludes(title, $searchInput.value) ||
      hangulIncludes(description, $searchInput.value)
    );
  });
}

$searchForm.submit = () => {
  searchedResult = getSearchList();
  $searchResultUl.innerHTML = '';
  $suggestionView.hidden = true;
  $searchResultView.hidden = false;
  $defaultSearchView.hidden = true;
  recentSearchList.add($searchInput.value);

  if (searchedResult.length === 0) {
    renderNothing();
    return;
  }
  drawSearchResultList(searchedResult, $searchResultUl);
};

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
    $searchForm.submit();
  };
});

/* -------------------------------------------------------------------------- */
/*                              최근 검색 목록                                  */
/* -------------------------------------------------------------------------- */

$recentSearchUl.addEventListener('focusin', (e) => {
  const { target } = e;

  if (target.dataset.type === 'delete') {
    target.addEventListener('click', () => {
      const { name } = target.dataset;
      recentSearchList.delete(name);
      $recentSearchUl.innerHTML = '';
      localStorage.setItem(
        'search-list',
        JSON.stringify(Array.from(recentSearchList))
      );
      drawRecentSearchList(recentSearchList, $recentSearchUl);
    });
    return;
  }

  target.addEventListener('click', () => {
    $searchInput.value = target.innerText.trim();
    toSearchInput();
    $searchForm.submit();
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
      // eslint-disable-next-line no-param-reassign
      item.innerText = searchedKeywords[idx];
    } else li.classList.add('hidden');
  });
};

const handleSuggestion = () => {
  if ($searchInput.value === '') {
    $suggestionView.hidden = true;
    $searchResultView.hidden = true;
    $defaultSearchView.hidden = false;
    $recentSearchUl.innerHTML = '';
    drawRecentSearchList(recentSearchList, $recentSearchUl);
    return;
  }
  $suggestionView.hidden = false;
  $searchResultView.hidden = true;
  $defaultSearchView.hidden = true;

  window.localStorage.setItem(
    'search-list',
    JSON.stringify(Array.from(recentSearchList))
  );
  getSearchSuggestionList();
};

$searchInput.addEventListener('input', handleSuggestion);

/* -------------------------------------------------------------------------- */
/*                            검색 제안 클릭 이벤트                              */
/* -------------------------------------------------------------------------- */

$suggestionCombobox.addEventListener('click', ({ target }) => {
  const li = target.closest('li');
  if (!li) return;
  const index = li.dataset.comboboxIndex;
  const input = $suggetionList[index].textContent.trim();
  $searchInput.value = input;
  $searchForm.submit();
});

/* -------------------------------------------------------------------------- */
/*                                 검색 결과                                   */
/* -------------------------------------------------------------------------- */

$searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  $searchForm.submit();
  return false;
});
