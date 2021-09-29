const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const filterByValue = (arr, key, value) => {
  return arr.filter(element => element[key] === value);
}

module.exports = {
  getRandomElement,
  filterByValue
};
