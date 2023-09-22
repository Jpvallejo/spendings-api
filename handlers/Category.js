const CategoryService = require("../services/CategoryService");

function getCategory(request, response) {
  const service = new CategoryService();
  service
    .getCategory(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

function createCategory(request, response) {
  const service = new CategoryService();
  service
    .createCategory(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

function editCategory(request, response) {
  const service = new CategoryService();
  service
    .editCategory(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}
function deleteCategory(request, response) {
  const service = new CategoryService();
  service
    .deleteCategory(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

module.exports = {
  getCategory,
  createCategory,
  editCategory,
  deleteCategory,
};
