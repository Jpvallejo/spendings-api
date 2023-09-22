const connectionPool = require("../database/postgres");
class UserService {
  getUser(req) {
    return new Promise((resolve, reject) => {
      connectionPool.query("Select * from users").then((testData) => {
        console.log(testData);
        resolve(testData.rows);
      });
    });
  }

  createUser(req) {
    const query = `
    INSERT INTO Users (
        name
        ,email
        ,profilepic
        ,isactive
        ,creationdate
        ,premium
        ,premiumexpdate
        ,pass)
    VALUES
    (
        '${req.name}',
        '${req.email}',
        '${req.profilepic}',
        true,
        CURRENT_DATE,
        true,
        NULL,
        crypt('${req.password}', gen_salt('bf'))
    )
    `;

    return new Promise((resolve, reject) => {
      connectionPool.query(query).then((testData) => {
        resolve("created");
      });
    });
  }
}

module.exports = UserService;
