const express = require("express");
const { renderCheckout, handleCallback } = require("./controllers/checkout");
const {
  createPaymentRequest,
  renderPaymentPage,
} = require("./controllers/payment");
const app = express();

const bindController = (controller) => (req, res, next) =>
  controller({ ...req.body, ...req.query, ...req.params })
    .then((result) => {
      console.log(result);
      if (result.redirect) {
        res.redirect(result.redirect);
      } else {
        res.send(result);
      }
    })
    .catch(next);

app.use(express.urlencoded({ extended: false }));

app.post("/pay/create", bindController(createPaymentRequest));
app.get("/pay", bindController(renderPaymentPage));

app.get("/checkout/callback/:type", bindController(handleCallback));
app.get("/checkout/:id", bindController(renderCheckout));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("server listening on ", port);
});
