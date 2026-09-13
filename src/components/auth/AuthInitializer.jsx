import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { asyncGetOwnProfile } from '../../states/auth/actions';

function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (token && !user) {
      dispatch(asyncGetOwnProfile(token));
    }
  }, [dispatch, token, user]);

  return children;
}

export default AuthInitializer;