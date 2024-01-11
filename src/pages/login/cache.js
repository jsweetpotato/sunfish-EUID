// 클로저 상태관리 함수 (react 처럼)
export const useState = (v) => {
  let value = v;
  const state = () => value;
  const setState = (newValue) => {
    value = newValue;
  };
  return [state, setState];
};

export const cache = {};
