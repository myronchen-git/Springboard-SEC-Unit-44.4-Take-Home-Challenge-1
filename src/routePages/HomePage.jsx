import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import './HomePage.css';

// ==================================================

function HomePage() {
  return (
    <main className="HomePage">
      <h1>Yodlr Design Challenge</h1>
      <Button color="primary" outline>
        <Link to="/signup">Registration Page</Link>
      </Button>
      <Button color="primary" outline>
        <Link to="/admin">Admin Page</Link>
      </Button>
    </main>
  );
}

// ==================================================

export default HomePage;
