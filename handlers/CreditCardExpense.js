const CreditCardExpenseService = require("../services/CreditCardExpenseService");

function getExpense(request, response) {
  const service = new CreditCardExpenseService();
  service
    .getExpense(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

function createExpense(request, response) {
  const service = new CreditCardExpenseService();
  service
    .createExpense(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

function editExpense(request, response) {
  const service = new CreditCardExpenseService();
  service
    .editExpense(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}
function deleteExpense(request, response) {
  const service = new CreditCardExpenseService();
  service
    .deleteExpense(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

module.exports = {
  getExpense,
  createExpense,
  editExpense,
  deleteExpense,
};
