const router = require('express').Router();
const { Fundraiser, User, Product } = require('../../models');

// GET all fundraisers
router.get('/', async (req, res) => {
  try {
    const fundraiserData = await Fundraiser.findAll();
    res.status(200).json(fundraiserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single fundraiser
router.get('/:id', async (req, res) => {
  try {
    const fundraiserData = await Fundraiser.findByPk(req.params.id);

    if (!fundraiserData) {
      res.status(404).json({ message: 'No fundraiser found with this id!' });
      return;
    }

    res.status(200).json(fundraiserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a fundraiser
// TODO add with auth
router.post('/', async (req, res) => {
  try {
    const fundraiserData = await Fundraiser.create(req.body);
    res.status(200).json(fundraiserData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// ? ADD a product?

// DELETE a fundraiser
// TODO add with auth
router.delete('/:id', async (req, res) => {
  try {
    const fundraiserData = await Fundraiser.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!fundraiserData) {
      res.status(404).json({ message: 'No fundraiser found with this id!' });
      return;
    }

    res.status(200).json(fundraiserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;