const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');

// POST /api/collect — save new submission
router.post('/', async (req, res) => {
  const { fullName, address, phoneNumber, accountNumber } = req.body;

  if (!fullName || !address || !phoneNumber || !accountNumber) {
    return res.status(400).json({ message: 'እባክዎ ሁሉንም መስኮች ይሙሉ' });
  }

  try {
    const entry = await Submission.create({ fullName, address, phoneNumber, accountNumber });
    res.status(201).json({ message: 'መረጃዎ ተመዝግቧል', id: entry._id });
  } catch (err) {
    res.status(500).json({ message: 'ስህተት ተፈጥሯል። እንደገና ይሞክሩ።' });
  }
});

// GET /api/collect — view all submissions
router.get('/', async (req, res) => {
  try {
    const all = await Submission.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: 'ስህተት ተፈጥሯል' });
  }
});

module.exports = router;
