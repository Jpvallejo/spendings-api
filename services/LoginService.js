const connectionPool = require("../database/postgres");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign(
    {
      name: user.name,
      id: user.id,
      email: user.email,
      profilePic: user.profilePic,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "2d" }
  );
  return { data: token };
};

class LoginService {
  login(req) {
    const query = `
    select  id,email,name,profilepic
    from users where pass = crypt('${req.password}', pass) and email = '${req.email}'
    `;

    return new Promise((resolve, reject) => {
      connectionPool.query(query).then((testData) => {
        if (testData.rowCount === 0) {
          reject({ message: "Email or Password is incorrect" });
        }
        resolve(generateToken(testData.rows[0]));
      });
    });
  }
}

module.exports = LoginService;
