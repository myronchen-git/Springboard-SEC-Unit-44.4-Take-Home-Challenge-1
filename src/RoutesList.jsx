import { Route, Routes } from 'react-router-dom';

import AdminPage from './routePages/AdminPage';
import HomePage from './routePages/HomePage';
import SignupPage from './routePages/SignupPage';

// ==================================================

function RoutesList() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

// ==================================================

export default RoutesList;
