import { useContext, useEffect, useState } from 'react';
import { Table } from 'reactstrap';

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

  if (errorMessage) {
    return (
      <main className="AdminPage">
        <title>Yodlr Admin Page</title>
        <h1>Users</h1>
        <div>
          <h1>Error</h1>
          <p>{errorMessage}</p>
        </div>
      </main>
    );
  } else {
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
      </main>
    );
  }
}

// ==================================================

export default AdminPage;
