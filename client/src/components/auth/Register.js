import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alertActions';
import { register } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
// import axios from 'axios';

const Register = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.password2) {
      return props.setAlert('Passwords do not mach', 'danger');
    }
    props.register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    console.log('Register a new user');
  };

  // Redirect if login
  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h2 className="text-success fw-bold">Sign Up</h2>
<Form onSubmit={(event) => onSubmit(event)}>
<Form.Group>
    <Form.Label>Name</Form.Label>
    <Form.Control 
      type="text" 
      placeholder="Enter name"
      name="name"
      value={formData.name}
      onChange={(event) => onChange(event)}
      required
    />
  </Form.Group>

  <Form.Group className="mt-3">
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
  <Form.Group className="mt-3">
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
  <Form.Group className="mt-2">
    <Form.Label>Confirm password</Form.Label>
    <Form.Control 
      type="password" 
      placeholder="Confirm password"
      name="password2"
      value={formData.password2}
      onChange={(event) => onChange(event)}
      required
    />
  </Form.Group>
  <Button 
    variant="primary" 
    type="submit" 
    className="mt-3"
    disabled={props.alerts.length > 0}
  >
    Submit
  </Button>
</Form>




      <p>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
  isAuthenticated: state.auth.isAuthenticated,
});

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { setAlert, register })(Register);
