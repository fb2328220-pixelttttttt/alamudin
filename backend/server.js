const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// File where submissions are saved
const DB_FILE = path.join(__dirname, 'submissions.json');

// Make sure the file exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
}

// Helper: read all submissions
const readAll = () => {
  const raw = fs.readFileSync(DB_FILE, 'utf8');
  return JSON.parse(raw);
};

// Helper: save all submissions
const saveAll = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// POST /api/collect — save new entry
app.post('/api/collect', (req, res) => {
  const { fullName, address, accountNumber } = req.body;

  if (!fullName || !address || !accountNumber) {
    return res.status(400).json({ message: 'እባክዎ ሁሉንም መስኮች ይሙሉ' });
  }

  const entry = {
    id: Date.now().toString(),
    fullName: fullName.trim(),
    address: address.trim(),
    accountNumber: accountNumber.trim(),
    createdAt: new Date().toISOString(),
  };

  const all = readAll();
  all.push(entry);
  saveAll(all);

  console.log('New submission saved:', entry);
  res.status(201).json({ message: 'መረጃዎ ተመዝግቧል', id: entry.id });
});

// GET /api/collect — view all entries
app.get('/api/collect', (req, res) => {
  const all = readAll();
  res.json(all);
});

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'ሼህ አለሙዲን የአርዳታ ድርጅት API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Submissions saved to: ${DB_FILE}`);
});
