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
      connectionPool.connect((err, db) => {
        if (err) reject(err);
        db.query(
          `Select * from transactions where AccountId = '${
            req.params.account
          }' AND
          date >= '${req.query.year}-${req.query.month}-01'
          AND date <  '${lastDay.toISOString().split("T")[0]}'`
        ).then((testData) => {
          resolve(testData.rows);
        });
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
        connectionPool.connect((err, db) => {
          if (err) reject(err);
          if (
            req.body.type !== transactionTypes.INCOME &&
            req.body.type !== transactionTypes.EXPENSE
          ) {
            reject({ message: "The transaction type is invalid" });
          }
          db.query(
            `Select id,balance, currency from accounts where Id = '${req.body.account}'`
          ).then((data) => {
            account = data.rows[0];
          });
          db.query(query).then((testData) => {
            console.log(testData);
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
            db.query(updateAccount(account.balance, account.id)).then(
              (data) => {
                resolve("created");
              }
            );
          });
        });
      } catch {
        reject("There was an error in the request");
      }
    });
  }
}

module.exports = TransactionsService;
