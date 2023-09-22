const BudgetService = require("../services/BudgetService");

function getBudget(request, response) {
  const service = new BudgetService();
  service
    .getBudget(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

function createBudget(request, response) {
  const service = new BudgetService();
  service
    .createBudget(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

function editBudget(request, response) {
  const service = new BudgetService();
  service
    .editBudget(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}
function deleteBudget(request, response) {
  const service = new BudgetService();
  service
    .deleteBudget(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

module.exports = {
  getBudget,
  createBudget,
  editBudget,
  deleteBudget,
};
