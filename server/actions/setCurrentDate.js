function setCurrentDate(date) {
  let thatMonth = date.getMonth();
  let thatDay = date.getDate();
  switch (thatMonth) {
    case 0:
      thatMonth = 'Jan';
      break;
    case 1:
      thatMonth = 'Feb';
      break;
    case 2:
      thatMonth = 'Mar';
      break;
    case 3:
      thatMonth = 'Apr';
      break;
    case 4:
      thatMonth = 'May';
      break;
    case 5:
      thatMonth = 'Jun';
      break;
    case 6:
      thatMonth = 'Jul';
      break;
    case 7:
      thatMonth = 'Aug';
      break;
    case 8:
      thatMonth = 'Sep';
      break;
    case 9:
      thatMonth = 'Oct';
      break;
    case 10:
      thatMonth = 'Nov';
      break;
    case 11:
      thatMonth = 'Dec';
      break;
    default:
      break;
  }
  return `${thatMonth} ${thatDay}`;
}

module.exports = setCurrentDate;