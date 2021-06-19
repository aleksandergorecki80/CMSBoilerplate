import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    // <Fragment>
    //   <ul>
    //     <li>
    //       <Link to="/posts">Home</Link>
    //     </li>
    //     <li>
    //       <Link to="/dashboard">Dashboard</Link>
    //     </li>
    //     <li>
    //       <a href="#!" onClick={logout}>
    //         {/* Logout */}
    //         {user && user.name}: Logout
    //       </a>
    //     </li>
    //   </ul>
    // </Fragment>

    <Nav className="justify-content-end me-3" activeKey="/home">
      <Nav.Item>
        <Link to="/posts" className="nav-link">
          Home
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
      </Nav.Item>
      <Nav.Item>
        <a href="#!" onClick={logout} className="nav-link">
          {user && user.name}: Logout
        </a>
      </Nav.Item>
    </Nav>
  );

  const guestLinks = (
    <Nav className="justify-content-end me-3" activeKey="/home">
      <Nav.Item>
        <Link to="/posts" className="nav-link">
          Home
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </Nav.Item>
    </Nav>
  );

  return (
    <nav>
      <ul>
        {!loading && (
          <Fragment> {isAuthenticated ? authLinks : guestLinks} </Fragment>
        )}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
