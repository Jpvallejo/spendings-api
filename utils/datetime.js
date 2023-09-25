function getMonthName(monthNumber, style = 'long') {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString([], {
      month: style,
    });
  }


module.exports = {
    getMonthName,
  };