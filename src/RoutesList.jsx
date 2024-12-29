import { Route, Routes } from 'react-router-dom';

import AdminPage from './routePages/AdminPage';
import SignupPage from './routePages/SignupPage';

// ==================================================

function RoutesList() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

// ==================================================

export default RoutesList;
