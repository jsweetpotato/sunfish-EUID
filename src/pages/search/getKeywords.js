function levenshtein(a, b) {
  const matrix = [];
  let i, j;

  if (a.length == 0) return b.length;
  if (b.length == 0) return a.length;

  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

// 단어 추출 및 중복 제거
const keywords = new Set();

resultDataList.forEach((item) => {
  const words = (item.title + ' ' + item.description).match(
    /[\w\uAC00-\uD7A3]+/g
  );
  if (words) {
    words.forEach((word) => {
      // 이미 저장된 키워드와 비교
      for (let keyword of keywords) {
        // 편집 거리가 2 이하인 경우 (즉, 비슷한 단어인 경우) 해당 단어는 추가하지 않음
        if (levenshtein(keyword, word) <= 2) return;
      }
      // 비슷한 단어가 없는 경우 키워드 추가
      keywords.add(word);
    });
  }
});
