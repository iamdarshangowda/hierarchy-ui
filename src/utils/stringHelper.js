export function capitalizeFirstLetter(str) {
  return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
}

export function capitalizeEachWord(words) {
  let strArr = words.split(' ');
  let ans = '';
  strArr.forEach((str) => (ans += `${capitalizeFirstLetter(str)} `));
  return ans.trim();
}
