const TransactionsService = require("../services/TransactionsService");

function getTransactions(request, response) {
  const service = new TransactionsService();
  service
    .getTransactions(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}
function getByCategory(request, response) {
  const service = new TransactionsService();
  service
    .getByCategory(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

function createTransaction(request, response) {
  const service = new TransactionsService();
  service
    .createTransaction(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

function editTransaction(request, response) {
  const service = new TransactionsService();
  service
    .editTransaction(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}
function deleteTransaction(request, response) {
  const service = new TransactionsService();
  service
    .deleteTransaction(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

module.exports = {
  getTransactions,
  getByCategory,
  createTransaction,
  editTransaction,
  deleteTransaction,
};
