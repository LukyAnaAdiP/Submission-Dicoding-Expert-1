import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
  const location = useLocation();

  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;