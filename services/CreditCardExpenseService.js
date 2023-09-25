const connectionPool = require("../database/postgres");
const { getInvoiceMonth } = require("../utils/invoiceDateUtil");
class CreditCardExpenseService {
  getExpense(req) {
    return new Promise((resolve, reject) => {
      connectionPool
        .query(
          `Select * from CreditCardExpenses where UserId = '${req.user.id}'`
        )
        .then((testData) => {
          resolve(testData.rows);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async createExpense(req) {
    const card = await getCurrentCard(req.body.cardId);
    const invoiceData = getInvoiceMonth(req.body.date, card);
    const query = `
    INSERT INTO CreditCardExpenses (
      categoryid
      ,date
      ,amount
      ,currency
      ,cardid
      ,description
      ,invoicemonth
      ,invoiceyear
      ,installmentnumber)
    VALUES
    (
        '${req.body.categoryId}',
        '${req.body.date}',
        '${req.body.amount}',
        '${req.body.currency}',
        '${req.body.cardId}',
        '${req.body.description}',
        '${invoiceData.month}',
        '${invoiceData.year}',
        '${req.body.installmentNumber}'
    )
    `;
    return new Promise((resolve, reject) => {
      if (card.cardlimit < card.debt + req.body.amount) {
        reject({ message: "The limit exceeds the amount of the record" });
      }
      connectionPool
        .query(query)
        .then((testData) => {
          updateCardDebt(req.body.amount, card);
          resolve("created");
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async deleteExpense(req) {
    const query = `
    DELETE FROM CreditCardExpenses WHERE id = '${req.params.id}'
    `;
    const expense = await getCurrentExpense(req.params.id);
    return new Promise(async (resolve, reject) => {
      try {
        if (!expense) {
          reject({ message: "The expense does not exist" });
        }
        const card = await getCurrentCard(expense.cardid);
        connectionPool
          .query(query)
          .then((testData) => {
            const amount = -Number(expense.amount.replace(/[^0-9.-]+/g, ""));
            updateCardDebt(amount, card);

            resolve("Removed Correctly");
          })
          .catch((error) => {
            reject(error);
          });
      } catch {
        reject({ message: "There was an error" });
      }
    });
  }

  async updateExpense(req) {
    const query = `
    UPDATE CreditCardExpenses
    SET
    amount = '${req.body.amount}'
    ,alertamount = '${req.body.alertAmount}'
    ,alertpercentage = '${req.body.alertPercentage}'
    ,includecards = '${req.body.includeCards}'
    categoryId = '${req.body.categoryId}',
    WHERE id = '${req.params.id}'
    `;

    const expense = await getCurrentExpense(req.params.id);
    const card = await getCurrentCard(req.body.cardId);

    return new Promise((resolve, reject) => {
      connectionPool
        .query(query)
        .then((testData) => {
          const amount =
            req.body.amount - Number(expense.amount.replace(/[^0-9.-]+/g, ""));
          updateCardDebt(amount, card);
          resolve("Edited Correctly");
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

const getCurrentExpense = (id) => {
  return new Promise((resolve, reject) => {
    connectionPool
      .query(
        `Select id,amount, currency, cardId from CreditCardExpenses where Id = '${id}'`
      )
      .then((data) => {
        resolve(data.rows[0]);
      });
  });
};
const getCurrentCard = (id) => {
  return new Promise((resolve, reject) => {
    connectionPool
      .query(
        `Select id,debt,dueDate, cardlimit from CreditCards where Id = '${id}'`
      )
      .then((data) => {
        resolve(data.rows[0]);
      });
  });
};
const updateCardDebt = (amount, card) => {
  const newDebt = Number(card.debt.replace(/[^0-9.-]+/g, "")) + amount;
  connectionPool
    .query(`Update CreditCards set debt ='${newDebt}' where Id = '${card.id}'`)
    .then();
};

module.exports = CreditCardExpenseService;
