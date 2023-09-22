const connectionPool = require("../database/postgres");
class AccountService {
  getAccount(req) {
    return new Promise((resolve, reject) => {
      connectionPool
        .query(`Select * from accounts where UserId = '${req.user.id}'`)
        .then((testData) => {
          console.log(testData);
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
}

module.exports = AccountService;
