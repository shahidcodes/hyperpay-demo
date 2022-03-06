const config = require("../config");

function checkoutPage(id, type) {
  let brands = type === "mada" ? "MADA" : "VISA MASTER AMEX";

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="${config.hyperpay.host}/v1/paymentWidgets.js?checkoutId=${id}"></script>
    <title>Hoothaat Payment</title>
  </head>
  <body>
  <form action="http://localhost:3001/checkout/callback/${type}" class="paymentWidgets" data-brands="${brands}"></form>

  </body>
  </html>`;
}

module.exports = checkoutPage;
