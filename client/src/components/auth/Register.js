import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
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

      if(formData.password !== formData.password2) {
          return props.setAlert('Passwords do not mach', 'danger');

        }

        console.log('Register a new user');
    //   const newUser = {
    //         name: formData.name,
    //         email: formData.email,
    //         password: formData.password
    //     }
    //   try {
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }
    //     const body = JSON.stringify(newUser);
    //     const result = await axios.post('/api/users', body, config);
    //     console.log(result.data);

    // } catch (err) {
    //       console.log(err.response.data)
    //   }

  }

  return (
    <Fragment>
      <h1>Sign Up</h1>
      <form onSubmit={ event => onSubmit(event) }>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={ event => onChange(event) }
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={ event => onChange(event) }
            required
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            placeholder="Password" 
            name="password"
            value={formData.password}
            onChange={ event => onChange(event) }
            required 
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm password"
            name="password2"
            value={formData.password2}
            onChange={ event => onChange(event) }
            required
          />
        </div>
        <input type="submit" value="Register" />
      </form>
      <p>Already have an account? <Link to="/login">Sign In</Link></p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
}

export default connect(null, { setAlert })(Register);
