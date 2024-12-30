import { useContext, useEffect, useState } from 'react';
import { Alert, Table } from 'reactstrap';

import { UserContext } from '../contexts';

import './AdminPage.css';

// ==================================================

/**
 * Displays the administration page, which just shows the list of users.
 */
function AdminPage() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const { getUsers } = useContext(UserContext);

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch((err) => setErrorMessage(err.message));
  }, [getUsers]);

  return (
    <main className="AdminPage">
      <title>Yodlr Admin Page</title>
      <h1>Users</h1>
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.state}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
    </main>
  );
}

// ==================================================

export default AdminPage;
