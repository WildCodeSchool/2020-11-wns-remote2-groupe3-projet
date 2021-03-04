import { useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../enumerations/enumerations';

// TODO : FIX FUNCTION RETURN TYPE

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useAuthUser = () => {
  const client = useApolloClient();
  const history = useHistory();

  const setAuthUser = () => {
    history.push(ROUTES.interpretes);
  };

  const logout = () => {
    client.resetStore();
    history.push(ROUTES.login);
  };

  return { logout, setAuthUser };
};

export default useAuthUser;
