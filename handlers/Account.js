const AccountService = require("../services/AccountService");

function getAccount(request, response) {
  const service = new AccountService();
  service
    .getAccount(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

function createAccount(request, response) {
  const service = new AccountService();
  service
    .creatAccount(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}
function getAccountForecast(request, response) {
  const service = new AccountService();
  service
    .getAccountForecast(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

module.exports = { getAccount, createAccount, getAccountForecast };
