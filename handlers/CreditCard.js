const CreditCardService = require("../services/CreditCard");

function getCards(request, response) {
  const service = new CreditCardService();
  service
    .getCards(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

function createCard(request, response) {
  const service = new CreditCardService();
  service
    .createCard(request)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.status(400).send({ message: error.message });
    });
}

module.exports = { getCards, createCard };
