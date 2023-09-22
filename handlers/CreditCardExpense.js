const CreditCardExpenseService = require("../services/CreditCardExpenseService");

function getCreditCardExpense(request, response) {
  const service = new CreditCardExpenseService();
  service
    .getCreditCardExpense(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

function createCreditCardExpense(request, response) {
  const service = new CreditCardExpenseService();
  service
    .createCreditCardExpense(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

function editCreditCardExpense(request, response) {
  const service = new CreditCardExpenseService();
  service
    .editCreditCardExpense(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}
function deleteCreditCardExpense(request, response) {
  const service = new CreditCardExpenseService();
  service
    .deleteCreditCardExpense(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

module.exports = {
  getCreditCardExpense,
  createCreditCardExpense,
  editCreditCardExpense,
  deleteCreditCardExpense,
};
