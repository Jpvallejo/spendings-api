const LoginService = require("../services/LoginService");

function login(request, response) {
  const service = new LoginService();
  service
    .login(request.body)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

function signUp(request, response) {
  const service = new LoginService();
  service
    .signUp(request.body)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

module.exports = { login, signUp };
