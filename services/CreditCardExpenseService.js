const connectionPool = require("../database/postgres");
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
    const query = `
    INSERT INTO CreditCardExpenses (
      categoryid
      ,date
      ,amount
      ,currency
      ,cardid
      ,description
      ,installmentnumber)
    VALUES
    (
        '${req.body.categoryId}',
        '${req.body.date}',
        '${req.body.amount}',
        '${req.body.currency}',
        '${req.body.cardId}',
        '${req.body.description}',
        '${req.body.installmentNumber}'
    )
    `;
    const card = await getCurrentCard(req.body.cardId);
    console.log(card);
    return new Promise((resolve, reject) => {
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
    console.log(1);
    const card = await getCurrentCard(req.body.cardId);
    console.log(2);
    return new Promise((resolve, reject) => {
      if (!expense) {
        reject({ message: "The expense does not exist" });
      }
      connectionPool
        .query(query)
        .then((testData) => {
          console.log("here");
          const amount = -Number(expense.amount.replace(/[^0-9.-]+/g, ""));
          updateCardDebt(amount, card);

          resolve("Removed Correctly");
        })
        .catch((error) => {
          reject(error);
        });
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
        `Select id,amount, currency from CreditCardExpenses where Id = '${id}'`
      )
      .then((data) => {
        resolve(data.rows[0]);
      });
  });
};
const getCurrentCard = (id) => {
  console.log(id);
  return new Promise((resolve, reject) => {
    connectionPool
      .query(`Select id,debt from CreditCards where Id = '${id}'`)
      .then((data) => {
        console.log("aca 3");

        resolve(data.rows[0]);
      });
  });
};
const updateCardDebt = (amount, card) => {
  // console.log(card);
  const newDebt = Number(card.debt.replace(/[^0-9.-]+/g, "")) + amount;
  connectionPool
    .query(`Update CreditCards set debt ='${newDebt}' where Id = '${card.id}'`)
    .then();
};

module.exports = CreditCardExpenseService;
