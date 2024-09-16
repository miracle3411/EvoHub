import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <div>
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <label>Email Address:</label>
          <input
            type="email"
            value={email}
            //onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            //onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <br></br>
          
          <div className="signup-link">
            Don't have an account?{' '}
            <Link to="/Signup"><button type="button"  className='signup-link-button'>
              Sign up now!
            </button></Link>
          </div>
          
          <br></br>

          
          <div className="forgot-password">
            <button type="button"  className='forgotpassword'>
              Forgot Password?
            </button>
          </div>
          

          
          <br></br>
          <Link to="/Home"><button type="button" className="login" >
            Login
          </button></Link>
          
        </form>
      </div>
    </div>
  );
};

export default Login;