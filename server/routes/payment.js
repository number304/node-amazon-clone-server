const router = require("express").Router();
const moment = require("moment");

const SHIPMENT = {
  normal: {
    price: 11.99,
    days: 7,
  },
  fast: {
    price: 39.98,
    days: 3,
  },
};

function shipmentPrice(shipmentOption) {
  let estimated = moment().add(shipmentOption.days, "d").format("dddd MMMM Do");

  return { estimated, price: shipmentOption.price };
}

router.post("/shipment", (req, res) => {
  let shipment;

  if (req.body.shipment === "normal") shipment = shipmentPrice(SHIPMENT.normal);
  else shipment = shipmentPrice(SHIPMENT.fast);

  return res.json({
    success: true,
    shipment,
  });
});

module.exports = router;
