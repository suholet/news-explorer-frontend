// Возвращает строку
function formatDate(date) {
  let newDate = new Date(date);

  let month = '' + (newDate.getMonth() + 1);
  let day = '' + newDate.getDate();
  let year = newDate.getFullYear();

  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;

  return [year, month, day].join('-');
}

// Возвращает строку
function getTodayDate() {
  return formatDate(new Date());
}

// Возвращает строку
function getWeekAgoDate() {
  let date = new Date();
  date.setDate(date.getDate()-7);
  return formatDate(date);
}

// Возвращает строку
function formatDateRu(date) {
  let newDate = new Date(date);

  let month = '' + (newDate.getMonth() + 1);

  let day = '' + newDate.getDate();
  let year = newDate.getFullYear();

  switch (month) {
    case "1":
      month = "января,"
      break;
    case "2":
      month = "февраля,"
        break;
    case "3":
      month = "марта,"
      break;
    case "4":
      month = "апреля,"
      break;
    case "5":
      month = "мая,"
      break;
    case "6":
      month = "июня,"
      break;
    case "7":
      month = "июля,"
      break;
    case "8":
        month = "августа,"
        break;
    case "9":
        month = "сентября,"
        break;
    case "10":
      month = "октября,"
      break;
    case "11":
      month = "ноября,"
      break;
    case "12":
      month = "декабря,"
      break;

    default:
      break;
  }
  if (day.length < 2)
      day = '0' + day;

  return [day, month, year].join(' ');
}

export {formatDate, getTodayDate, getWeekAgoDate, formatDateRu};