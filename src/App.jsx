import { useCallback, useMemo } from 'react';

import BackendApi from './api';
import { UserContext } from './contexts';
import RoutesList from './RoutesList';

import './App.css';

// ==================================================

/**
 * The main component that will run the frontend.
 */
function App() {
  /**
   * Signs up / registers a new user.
   *
   * @param {Object} formData - Contains the required properties for creating a
   *  new user.
   * @returns {Object} The user Object containing the data of the new user.
   */
  const signup = useCallback(async (formData) => {
    const respData = await BackendApi.postUser(formData);
    console.debug('signup response:\n', respData);
    return respData;
  }, []);

  /**
   * Gets all users.
   *
   * @returns {Array} A list of user Objects.
   */
  const getUsers = useCallback(async () => {
    const respData = await BackendApi.getUsers();
    console.debug('getUsers response:\n', respData);
    return respData;
  }, []);

  const userContextValues = useMemo(
    () => ({
      getUsers,
      signup,
    }),
    [getUsers, signup]
  );

  return (
    <UserContext.Provider value={userContextValues}>
      <RoutesList />
    </UserContext.Provider>
  );
}

// ==================================================

export default App;
