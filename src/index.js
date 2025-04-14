import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
import DashboardLive from './Pages/DashboardLive';
import Test from './Pages/Test'
import FixtureDetailsPage from './Pages/FixtureDetailsPage';
import SingleLeague from './Pages/SingleLeague';

import './App.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard/matches" element={<Dashboard />} />
      <Route path="/dashboard/live" element={<DashboardLive />} />
      <Route path="/dashboard/single" element={<FixtureDetailsPage />} />
      <Route path="/dashboard/singleLeague" element={<SingleLeague />} />

      <Route path="/test" element={<Test />} />
    </Routes>
  </BrowserRouter>
);
