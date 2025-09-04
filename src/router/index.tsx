import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HistorySection from "../components/HistorySection/HistorySection";
import Home from '../components/Home';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HistorySection  />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
