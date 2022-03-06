const { default: axios } = require("axios");
const config = require("../config");
const checkoutPage = require("../raw/checkout-page.html");

const { hyperpay } = config;

const headers = {
  Authorization: `Bearer ${hyperpay.accessToken}`,
  "content-type": "application/x-www-form-urlencoded;charset=utf-8",
};

const entityId = (mada) => (mada ? hyperpay.entityIdMada : hyperpay.entityId);

async function renderCheckout({ id, type }) {
  return checkoutPage(id, type);
}

async function handleCallback({ id, resourcePath, type }) {
  try {
    const { data } = await axios.get(
      `${hyperpay.host}/${resourcePath}?entityId=${entityId(type === "mada")}`,
      {
        headers,
      }
    );
    const paymentStatus =
      data.result.code === "000.100.110" ? "success" : "failed";
    return {
      ...data,
      paymentStatus,
    };
  } catch (error) {
    return {
      ...error?.response?.data,
      paymentStatus: "failed",
    };
  }
}

module.exports = { renderCheckout, handleCallback };
