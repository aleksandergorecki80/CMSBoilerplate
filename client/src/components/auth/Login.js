import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { Form, Button } from 'react-bootstrap';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };

// Redirect if login
if(isAuthenticated) {
  return <Redirect to="/dashboard" />
}

  return (
    <Fragment>
      <h2 className="text-success fw-bold">Sign In</h2>
<Form onSubmit={(event) => onSubmit(event)}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control 
      type="email" 
      placeholder="Enter email"
      name="email"
      value={formData.email}
      onChange={(event) => onChange(event)}
      required 
    />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control 
      type="password" 
      placeholder="Password"
      name="password"
      value={formData.password}
      onChange={(event) => onChange(event)}
      required
    />
  </Form.Group>
  <Button variant="primary" type="submit" className="mt-3">
    Submit
  </Button>
</Form>
<p>Do not have an account? <Link to="/register">Sign Up</Link></p>

    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
