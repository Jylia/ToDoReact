import monImg from '../components/images/Mon.jpg';
import tueImg from '../components/images/Tue.jpg';
import wedImg from '../components/images/Wed.jpg';
import thuImg from '../components/images/Thu.jpg';
import friImg from '../components/images/Fri.jpg';
import satImg from '../components/images/Sat.jpg';
import sunImg from '../components/images/Sun.jpg';

export const toDateString = (date) => {
  const dateNumber = date.getUTCDate();
  const dateMonth = date.getUTCMonth() + 1;
  let dateMonthString;
  const dateYear = date.getUTCFullYear();

  switch (dateMonth) {
    case 1:
      dateMonthString = 'Jan';
      break;
    case 2:
      dateMonthString = 'Feb';
      break;
    case 3:
      dateMonthString = 'Mar';
      break;
    case 4:
      dateMonthString = 'Apr';
      break;
    case 5:
      dateMonthString = 'May';
      break;
    case 6:
      dateMonthString = 'Jun';
      break;
    case 7:
      dateMonthString = 'Jul';
      break;
    case 8:
      dateMonthString = 'Aug';
      break;
    case 9:
      dateMonthString = 'Sep';
      break;
    case 10:
      dateMonthString = 'Oct';
      break;
    case 11:
      dateMonthString = 'Nov';
      break;
    case 12:
      dateMonthString = 'Dec';
      break;
    default:
      dateMonthString = '';
      break;
  }

  return dateNumber + ' ' + dateMonthString + ', ' + dateYear;
}

export const isDatesEqual = (date1, date2) => {
  return date1.getUTCDate() === date2.getUTCDate() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCFullYear() === date2.getUTCFullYear();
}

export const currentWeek = () => {
  let week = [];

  const dayImage = [
    monImg,
    tueImg,
    wedImg,
    thuImg,
    friImg,
    satImg,
    sunImg
  ];

  const dayNames = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
  ];
  
  for (var i = 0; i < 6; i++) {
    week.push(
      {
        date: new Date((new Date()).setDate((new Date()).getUTCDate() + i)),
        isToday: i === 0,
        img: dayImage[i],
        title: dayNames[new Date((new Date()).setDate((new Date()).getUTCDate() + i)).getDay() - 1]
      }
    )
  }

  return week;
}
