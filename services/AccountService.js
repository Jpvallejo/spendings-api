const connectionPool = require("../database/postgres");
const { getMonthName } = require("../utils/datetime");
const { parseMoney } = require("../utils/money");
class AccountService {
  getAccount(req) {
    return new Promise((resolve, reject) => {
      connectionPool
        .query(`Select * from accounts where UserId = '${req.user.id}'`)
        .then((testData) => {
          resolve(testData.rows);
        });
    });
  }

  creatAccount(req) {
    const query = `
    INSERT INTO Accounts (
      type
      ,name
      ,balance
      ,currency
      ,userid)
    VALUES
    (
        '${req.body.type}',
        '${req.body.name}',
        '${req.body.initialBalance}',
        '${req.body.currency}',
        '${req.user.id}'
    )
    `;

    return new Promise((resolve, reject) => {
      connectionPool.query(query).then((testData) => {
        resolve("created");
      });
    });
  }

  getAccountForecast(req) {
    return new Promise(async (resolve, reject) => {
      const currentAccount = await getCurrentAccount(req.params.accountId);
      const forecastArray = [
        {
          month: getMonthName(req.query.month, "short"),
          amount: parseMoney(currentAccount.balance),
        },
      ];
      for (
        let index = parseInt(req.query.month) + 1;
        index < parseInt(req.query.month) + 12;
        index++
      ) {
        const year =
          index > 12 ? parseInt(req.query.year) + 1 : parseInt(req.query.year);
        const forecastedBalance = await getForecastBalance(
          index > 12 ? index % 12 : index,
          year,
          currentAccount.id,
          forecastArray.slice(-1)[0].amount
        );
        forecastArray.push({
          month: `${getMonthName(index > 12 ? index % 12 : index, "short")}${
            year !== parseInt(req.query.year) ? "-" + year : ""
          }`,
          amount: forecastedBalance,
        });
      }
      resolve(forecastArray);
    });
  }
}
const getCurrentAccount = (accountId) => {
  return new Promise((resolve, reject) => {
    try {
      connectionPool
        .query(`Select * from accounts where Id = '${accountId}'`)
        .then((testData) => {
          resolve(testData.rows[0]);
        });
    } catch {
      reject("error");
    }
  });
};

const getForecastBalance = async (month, year, accountId, previousBalance) => {
  const expenses =
    (await getCardExpenseSumByAccount(month, year, accountId)) +
    (await getExpenseSumByAccount(month, year, accountId));
  const incomes = await getIncomeSumByAccount(month, year, accountId);
  return previousBalance + incomes - expenses;
};

const getCardExpenseSumByAccount = (month, year, accountId) => {
  const query = `
  select accounts.id,
       SUM(amount) as amount
from creditcardexpenses
join creditcards on creditcards.id = creditcardexpenses.cardid
join accounts on accounts.id = creditcards.associedaccount
where invoicemonth = '${month}' and invoiceyear = '${year}' and accounts.id = '${accountId}'
GROUP BY accounts.id
          `;
  return new Promise((resolve, reject) => {
    connectionPool.query(query).then((data) => {
      resolve(parseMoney(data.rows[0]?.amount ?? "0"));
    });
  });
};
const getExpenseSumByAccount = (month, year, accountId) => {
  var lastDay = new Date(parseInt(year), parseInt(month), 0);
  const query = `
  select accounts.id,
       SUM(amount) as amount
from transactions
join accounts on accounts.id = transactions.accountId
where  date >= '${year}-${month}-01'
AND date <  '${lastDay.toISOString().split("T")[0]}'
AND accounts.id = '${accountId}' and transactions.type = 'Expense'
GROUP BY accounts.id
          `;
  return new Promise((resolve, reject) => {
    connectionPool.query(query).then((data) => {
      resolve(parseMoney(data.rows[0]?.amount ?? "0"));
    });
  });
};
const getIncomeSumByAccount = (month, year, accountId) => {
  var lastDay = new Date(parseInt(year), parseInt(month), 0);
  const query = `
  select accounts.id,
       SUM(amount) as amount
from transactions
join accounts on accounts.id = transactions.accountId
where  date >= '${year}-${month}-01'
AND date <  '${lastDay.toISOString().split("T")[0]}'
AND accounts.id = '${accountId}' and transactions.type = 'Income'
GROUP BY accounts.id
          `;
  return new Promise((resolve, reject) => {
    connectionPool.query(query).then((data) => {
      resolve(parseMoney(data.rows[0]?.amount ?? "0"));
    });
  });
};

module.exports = AccountService;
