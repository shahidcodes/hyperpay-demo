require("dotenv").config();

module.exports = {
  hyperpay: {
    host: process.env.HYPERPAY_HOST,
    accessToken: process.env.HYPERPAY_TOKEN,
    entityId: process.env.HYPERPAY_ENTITY_ID,
    entityIdMada: process.env.HYPERPAY_ENTITY_ID_MADA,
  },
};
