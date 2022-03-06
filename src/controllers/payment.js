const { default: axios } = require("axios");
const qs = require("qs");
const { default: faker } = require("@faker-js/faker");
const paymentPage = require("../raw/payment-page.html");
const config = require("../config");

const { hyperpay } = config;

const headers = {
  Authorization: `Bearer ${hyperpay.accessToken}`,
  "content-type": "application/x-www-form-urlencoded;charset=utf-8",
};

const entityId = (mada) => (mada ? hyperpay.entityIdMada : hyperpay.entityId);

async function renderPaymentPage() {
  return paymentPage();
}

async function createPaymentRequest({ cardType, amount }) {
  const isMada = cardType === "mada";

  const payload = {
    entityId: entityId(isMada),
    amount: Number(amount).toFixed(2),
    currency: "SAR",
    paymentType: "DB",
    merchantTransactionId: faker.datatype.uuid(),
    "customer.email": faker.internet.email(),
    "billing.street1": faker.address.streetAddress(),
    "billing.city": faker.address.city(),
    "billing.state": faker.address.state(),
    "billing.country": faker.address.countryCode(),
    "billing.postcode": faker.address.zipCode(),
    "customer.givenName": faker.name.firstName(),
    "customer.surname": faker.name.lastName(),
  };

  if (process.env.NODE_ENV !== "production" && !isMada) {
    payload.testMode = "EXTERNAL";
  }
  console.log(payload);
  const data = qs.stringify(payload);
  try {
    const req = await axios.post(`${hyperpay.host}/v1/checkouts`, data, {
      headers,
    });
    return {
      redirect: `/checkout/${req.data.id}?type=${cardType}`,
    };
  } catch (error) {
    return error;
  }
}

module.exports = { renderPaymentPage, createPaymentRequest };
