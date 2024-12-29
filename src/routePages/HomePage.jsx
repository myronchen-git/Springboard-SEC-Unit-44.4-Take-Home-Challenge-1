import { Link } from 'react-router-dom';

// ==================================================

function HomePage() {
  return (
    <main>
      <h1>Yodlr Design Challenge</h1>
      <Link to="/signup">Registration Page</Link>
      <Link to="/admin">Admin Page</Link>
    </main>
  );
}

// ==================================================

export default HomePage;
