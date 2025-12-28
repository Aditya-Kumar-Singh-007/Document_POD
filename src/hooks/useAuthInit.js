import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/actions/authAction';

export const useAuthInit = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuthenticated, user]);

  return { isAuthenticated, user };
};