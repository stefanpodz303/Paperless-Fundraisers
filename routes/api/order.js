const router = require("express").Router();
const { User, Order, Customer, orderDetails, Fundraiser } = require("../../models");

// GET all orders
router.get("/", async (req, res) => {
  try {
    const orderData = await Order.findAll();
    res.status(200).json(orderData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET all orders by fundraiser
// router.get("/", async (req, res) => {
//   try {
//     const orderDetails = await Order_Details.findAll(
//       {
//         fundraiser_id: req.body.fundraiser,
//         order_id: req.body.order_id,
//         product_id: req.body.product_id,
//         product_qty: req.body.product_qty,
//         line_total: req.body.line_total,
        
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     );
//     res.status(200).json(orderDetails);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });


// GET a single order
router.get("/:id", async (req, res) => {
  try {
    const orderData = await Order.findByPk(req.params.id, {
      // JOIN with Order, using the Order_Details through table
      //   include: [{ model: Order, through: Order_Details, as: 'order_details' }]
    });

    if (!orderData) {
      res.status(404).json({ message: "No order found with this id!" });
      return;
    }

    res.status(200).json(orderData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE an order
// TODO add with auth
router.post("/", async (req, res) => {
  try {
    const orderData = await Order.create(req.body);
    res.status(200).json(orderData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//   UPDATE an order
// TODO add with auth
router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.update(
      {
        customer_id: req.body.customer_id,
        order_total: req.body.order_total,
        customer_remit: req.body.customer_remit,
        seller_remit: req.body.seller_remit,
        order_status: req.body.order_status,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updatedOrder) {
      res.status(404).json({ message: "No Order_id found with this id" });
      return;
    }
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE an order
// TODO add with auth
router.delete("/:id", async (req, res) => {
  try {
    const orderData = await Order.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!orderData) {
      res.status(404).json({ message: "No order found with this id!" });
      return;
    }

    res.status(200).json(orderData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
