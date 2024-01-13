import { pb } from '../../lib';
import { drawRecentSearchList } from './recentSearch';

const $searchForm = document.querySelector('#searchForm');
const $searchInput = document.querySelector('#searchInput');
const $recentSearchUl = document.querySelector('#recent-search-ul');

const recentSearchList = [
  {
    name: '감자',
    label: '감자',
  },
  {
    name: 'preview',
    label: 'Preview',
  },
  {
    name: 'Programming',
    label: 'programming',
  },
  {
    name: '컴퓨터',
    label: '컴퓨터',
  },
];

drawRecentSearchList(recentSearchList, $recentSearchUl);
// collection 타입에 따라서 일치하는 리스트를 받아와야 하나?
// 아니면 모든 컬렉션을 받아와서 그 이후에 검색?

// const productData = await pb.collection('products').getFullList();

// 문제는 product 컬렉션에서만 데이터를 가져온다는 것
// let filteredData = productData.filter((item) => item.title.includes(value));

// autoAlpha로 처리

// 연관 단어는 어떻게 셀렉?

// data에서 filter로 받아오기?

function debounce(callback, limit = 200) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, limit);
  };
}

// 테스트 데이터를 더 만들자
$searchForm.onsubmit = () => {
  const searchQuery = $searchInput.value;
  console.log('검색어:', searchQuery);
  // 여기에 검색 처리 로직을 추가합니다.

  // 폼의 기본 제출 동작을 방지합니다.
  return false;
};
