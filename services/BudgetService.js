const connectionPool = require("../database/postgres");
class BudgetService {
  getBudget(req) {
    return new Promise((resolve, reject) => {
      connectionPool.connect((err, db) => {
        if (err) reject(err);
        db.query(`Select * from Budgets where UserId = '${req.user.id}'`).then(
          (testData) => {
            resolve(testData.rows);
          }
        );
      });
    });
  }

  createBudget(req) {
    const query = `
    INSERT INTO Budgets (
      categoryid
      ,userid
      ,amount
      ,alertamount
      ,alertpercentage
      ,includecards)
    VALUES
    (
        '${req.body.categoryId}',
        '${req.user.id}'
        '${req.body.amount}',
        '${req.body.alertAmount}',
        '${req.body.alertPercentage}',
        '${req.body.includeCards}',
    )
    `;

    return new Promise((resolve, reject) => {
      connectionPool.connect((err, db) => {
        if (err) reject(err);
        db.query(query).then((testData) => {
          resolve("created");
        });
      });
    });
  }

  deleteBudget(req) {
    const query = `
    DELETE FROM Budgets WHERE id = '${req.params.id}'
    `;

    return new Promise((resolve, reject) => {
      connectionPool.connect((err, db) => {
        if (err) reject(err);
        db.query(query).then((testData) => {
          resolve("Removed Correctly");
        });
      });
    });
  }

  updateBudget(req) {
    const query = `
    UPDATE Budgets
    SET
    amount = '${req.body.amount}'
    ,alertamount = '${req.body.alertAmount}'
    ,alertpercentage = '${req.body.alertPercentage}'
    ,includecards = '${req.body.includeCards}'
    categoryId = '${req.body.categoryId}',
    WHERE id = '${req.params.id}'
    `;

    return new Promise((resolve, reject) => {
      connectionPool.connect((err, db) => {
        if (err) reject(err);
        db.query(query).then((testData) => {
          resolve("Edited Correctly");
        });
      });
    });
  }
}

module.exports = BudgetService;
