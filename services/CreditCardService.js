const connectionPool = require("../database/postgres");
class AccountService {
  getCards(req) {
    return new Promise((resolve, reject) => {
      connectionPool.connect((err, db) => {
        if (err) reject(err);
        db.query(`Select * from CreditCards where UserId = '${req.user.id}'`).then(
          (testData) => {
            resolve(testData.rows);
          }
        );
      });
    });
  }

  createCard(req) {
    const query = `
    INSERT INTO CreditCards (
      brand
,name
,associedaccount
,closingdate
,duedate
,cardlimit
,debt
,userid)
    VALUES
    (
        '${req.body.brand}',
        '${req.body.name}',
        '${req.body.account}',
        '${req.body.closingDate}',
        '${req.body.dueDate}',
        '${req.body.limit}',
        '${req.body.initialDebt}',
        '${req.user.id}'
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
}

module.exports = AccountService;
