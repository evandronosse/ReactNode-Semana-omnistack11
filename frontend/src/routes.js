import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Logon from './pages/Logon';
import Profile from './pages/Profile';
import Register from './pages/Register';
import NewIncident from './pages/NewIncident';

export default function AppRouter() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" exact element={<Logon />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/incidents" element={<Incidents />} /> */}
          <Route path="/incident/new" element={<NewIncident />} />
        </Routes>
      </Router>
    </main>
  );
}