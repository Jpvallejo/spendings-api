const connectionPool = require("../database/postgres");
class CategoryService {
  getCategory(req) {
    return new Promise((resolve, reject) => {
      connectionPool.connect((err, db) => {
        if (err) reject(err);
        db.query(
          `Select * from Categories where UserId = '${req.user.id}'`
        ).then((testData) => {
          resolve(testData.rows);
        });
      });
    });
  }

  createCategory(req) {
    const query = `
    INSERT INTO Categories (
      name
      ,icon
      ,hexcolor
      ,userid)
    VALUES
    (
        '${req.body.name}',
        '${req.body.icon}',
        '${req.body.hexColor}',
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

  deleteCategory(req) {
    const query = `
    DELETE FROM Categories WHERE id = '${req.params.id}'
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

  updateCategory(req) {
    const query = `
    UPDATE Categories
    SET
    name = '${req.body.name}',
    icon = '${req.body.icon}',
    hexcolor = '${req.body.hexColor}'
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

module.exports = CategoryService;
