const getInvoiceMonth = (date, card) => {
  const dateArr = date.split("-");
  let year = dateArr[0];
  let month = dateArr[1];
  const day = dateArr[2];
    console.log(card);
    console.log(card.duedate);
  const dueDate = new Date(year, month, card.duedate);
  const dayOfWeek = dueDate.getDay();
  if (dayOfWeek == 0 || dayOfWeek == 6) {
    const daysToAdd = dayOfWeek == 0 ? 1 : 2;
    dueDate.setDate(dueDate.getDate() + daysToAdd);
  }
  var dateOffset = 24 * 60 * 60 * 1000 * 10; //10 days
  const closingDate = new Date(dueDate.getTime() - dateOffset);
  console.log(closingDate);
  const nextThursday = getNextThursday(closingDate);
  console.log(nextThursday);
  const previousThursday = getPrevThursday(closingDate);
  console.log(previousThursday);
  const distanceToNext = daysDistance(closingDate, nextThursday);
  const distanceToPrev = daysDistance(closingDate, previousThursday);
  const calculatedClosingDate =
    distanceToNext >= distanceToPrev ? nextThursday : previousThursday;

  console.log(calculatedClosingDate);
  const closingDay = calculatedClosingDate.getDate();
  if (day > closingDay) {
    if (month === 12) {
      year = parseInt(year) + 1;
      month = 1;
    } else {
      month = parseInt(month) + 1;
    }
  }
  return {
    month: month,
    year: year,
  };
};

function getNextThursday(date = new Date()) {
  const dateCopy = new Date(date.getTime());

  const nextThursday = new Date(
    dateCopy.setDate(
      dateCopy.getDate() + ((7 - dateCopy.getDay() + 4) % 7 || 7)
    )
  );

  return nextThursday;
}

function getPrevThursday(date = new Date()) {
  const dateCopy = new Date(date.getTime());

  const prevThursday = new Date(
    dateCopy.setDate(
      dateCopy.getDate() + ((7 - dateCopy.getDay() - 3) % 7 || 7)
    )
  );

  return prevThursday;
}

const daysDistance = (date_1, date_2) => {
  let difference = date_1.getTime() - date_2.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return TotalDays;
};

module.exports = {
  getInvoiceMonth,
};
