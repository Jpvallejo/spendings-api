const UserService = require("../services/UserService");

function getUser(request, response) {
  const service = new UserService();
  service
    .getUser(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

function createUser(request, response) {
    const service = new UserService();
    service.createUser(request.body)
    .then((res) => {
        response.send(res);
    })
    .catch((error) => {
        response.status(400).send({ message: error.message });
      });
}

module.exports = { getUser, createUser };
