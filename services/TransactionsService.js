const connectionPool = require("../database/postgres");
const transactionTypes = {
  INCOME: "Income",
  EXPENSE: "Expense",
};
class TransactionsService {
  getTransactions(req) {
    var lastDay = new Date(
      parseInt(req.query.year),
      parseInt(req.query.month),
      0
    );
    return new Promise((resolve, reject) => {
      connectionPool
        .query(
          `Select * from transactions where AccountId = '${
            req.params.account
          }' AND
          date >= '${req.query.year}-${req.query.month}-01'
          AND date <  '${lastDay.toISOString().split("T")[0]}'`
        )
        .then((testData) => {
          resolve(testData.rows);
        });
    });
  }

  createTransaction(req) {
    const query = `
    INSERT INTO Transactions (
      type
      ,categoryid
      ,date
      ,amount
      ,currency
      ,accountid
      ,description
      ,iscardpayment)
    VALUES
    (
        '${req.body.type}',
        '${req.body.categoryId ?? null}',
        '${req.body.date}',
        '${req.body.amount}',
        '${req.body.currency}',
        '${req.body.account}',
        '${req.body.description}',
        '${req.body.isCardPayment ?? false}'
    )
    `;
    const updateAccount = (newBalance, id) => `
      UPDATE Accounts set balance = '${newBalance}' WHERE Id = '${id}'
    `;

    return new Promise((resolve, reject) => {
      try {
        let account;
        if (
          req.body.type !== transactionTypes.INCOME &&
          req.body.type !== transactionTypes.EXPENSE
        ) {
          reject({ message: "The transaction type is invalid" });
        }
        connectionPool
          .query(
            `Select id,balance, currency from accounts where Id = '${req.body.account}'`
          )
          .then((data) => {
            account = data.rows[0];
          });
        connectionPool.query(query).then((testData) => {
          let newAmount = req.body.amount;
          if (account.currency !== req.body.currency) {
            newAmount = newAmount * req.body.currencyValuation;
          }
          const previousBalance = Number(
            account.balance.replace(/[^0-9.-]+/g, "")
          );
          if (req.body.type === transactionTypes.INCOME) {
            account.balance = previousBalance + newAmount;
          } else if (req.body.type === transactionTypes.EXPENSE) {
            account.balance = previousBalance - newAmount;
          }
          connectionPool
            .query(updateAccount(account.balance, account.id))
            .then((data) => {
              resolve("created");
            });
        });
      } catch {
        reject("There was an error in the request");
      }
    });
  }

  async getByCategory(req) {
    var lastDay = new Date(
      parseInt(req.query.year),
      parseInt(req.query.month),
      0
    );
    const cardExpenses = await getCardExpensesByCategory(
      req.query.month,
      req.query.year,
      req.user.id
    );
    return new Promise((resolve, reject) => {
      connectionPool
        .query(
          `
          select distinct 
          categories.id,
          categories.name,
                categories.icon,
                categories.hexcolor,
                t.type,
                t.amount
          from
              (select categoryId,
                      type,
                      SUM(amount) as amount
              from public.transactions
              where
              date >= '${req.query.year}-${req.query.month}-01'
              AND date <  '${lastDay.toISOString().split("T")[0]}'
              and userId = '${req.user.id}'
              GROUP BY type,
                        categoryId)t
          JOIN categories on categories.id = t.categoryId`
        )
        .then((testData) => {
          if (testData.rowCount > 0)
            resolve(getExtendedList(testData.rows, cardExpenses));
          else resolve([]);
        });
    });
  }
}

const getCardExpensesByCategory = (month, year, userId) => {
  const query = `
  select distinct 
  categories.id,
  categories.name,
                categories.icon,
                categories.hexcolor,
                t.amount
          from
              (select categoryId,
                      SUM(amount) as amount
              from public.creditcardexpenses
              where invoicemonth = '${month}' and invoiceyear = '${year}' and userId = '${userId}'
              GROUP BY
                        categoryId)t
          JOIN categories on categories.id = t.categoryId
          `;
  return new Promise((resolve, reject) => {
    connectionPool.query(query).then((data) => {
      if (data.rowCount == 0) resolve([]);
      resolve(
        data.rows.map((record) => {
          return {
            ...record,
            type: "Expense",
          };
        })
      );
    });
  });
};

const getExtendedList = (transactions, cardExpenses) => {
  const categoriesIds = transactions.map((x) => x.id);
  const extraExpenses = cardExpenses
    .filter((x) => !categoriesIds.includes(x.id))
    .map((x) => {
      return { ...x, amount: Number(x.amount.replace(/[^0-9.-]+/g, "")) };
    });

  const addedAmounts = transactions.map((x) => {
    let extraAmount = 0;
    const cardExpense = cardExpenses.find((expense) => expense.id === x.id);
    if (cardExpense) {
      extraAmount = Number(cardExpense.amount.replace(/[^0-9.-]+/g, ""));
    }
    const amount = Number(x.amount.replace(/[^0-9.-]+/g, ""));
    return {
      ...x,
      amount: amount + extraAmount,
    };
  });
  const finalArray = [...addedAmounts, ...extraExpenses];

  const sumExpenses = finalArray
    .filter((x) => x.type === "Expense")
    .reduce((a, b) => {
      return a + b.amount;
    }, 0);
  const sumIncomes = finalArray
    .filter((x) => x.type === "Income")
    .reduce((a, b) => {
      return a + b.amount;
    }, 0);
  return finalArray.map((x) => {
    return {
      ...x,
      percent: Math.round(
        (x.amount * 100) / (x.type === "Expense" ? sumExpenses : sumIncomes)
      ),
    };
  });
};
module.exports = TransactionsService;
