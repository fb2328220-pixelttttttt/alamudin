import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CollectPage from './pages/CollectPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<CollectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
