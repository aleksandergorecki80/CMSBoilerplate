import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        console.log('Log in the user')
    }

    return (
<Fragment>
      <h1>Sign In</h1>
      <form onSubmit={ event => onSubmit(event) }>
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
        <input type="submit" value="Log in" />
      </form>
      <p>Do not have an account? <Link to="/register">Sign Up</Link></p>
    </Fragment>
    )
}

export default Login
