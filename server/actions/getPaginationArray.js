function getPaginationArray(page, pagesCount) {
  const leftBlock = [],
    centerBlock = [],
    rightBlock = [];
  if (page !== 1) {
    centerBlock.push(page - 1);
  }
  centerBlock.push(page);
  if (page !== pagesCount) {
    centerBlock.push(page + 1);
  }
  if (centerBlock[0] > 1) {
    leftBlock.push(1);
  }
  if (centerBlock[0] > 2) {
    leftBlock.push(2);
  }
  if (centerBlock[0] > 3) {
    leftBlock.push('..');
  }
  if (centerBlock[centerBlock.length - 1] < pagesCount - 2) {
    rightBlock.push('..');
  }
  if (centerBlock[centerBlock.length - 1] < pagesCount - 1) {
    rightBlock.push(pagesCount - 1);
  }
  if (centerBlock[centerBlock.length - 1] < pagesCount) {
    rightBlock.push(pagesCount);
  }
  return [ ...leftBlock, ...centerBlock, ...rightBlock ];
}

module.exports = getPaginationArray;