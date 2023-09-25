const parseMoney = (input) => Number(input.replace(/[^0-9.-]+/g, ""));

module.exports = {
  parseMoney,
};
