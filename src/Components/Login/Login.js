import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordError, setShowPasswordError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, []);

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setPasswordError('');
    setShowPasswordError(false);
  };

  const validatePassword = () => {
    // Password must be at least 8 characters long
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const login = async (e) => {
    e.preventDefault();
    if (!validatePassword()) {
      setShowPasswordError(true);
      return;
    }

    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const json = await res.json();
    if (json.authtoken) {
      sessionStorage.setItem('auth-token', json.authtoken);
      sessionStorage.setItem('email', email);
      navigate('/');
      window.location.reload();
    } else {
      if (json.errors) {
        for (const error of json.errors) {
          alert(error.msg);
        }
      } else {
        alert(json.error);
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="login-grid">
          <div className="login-text">
            <h2>Login</h2>
          </div>
          <div className="login-text">
            Are you a new member?{" "}
            <span>
              <Link to="/Sign_Up" style={{ color: '#2190FF' }}>
                Sign Up Here
              </Link>
            </span>
          </div>
          <br />
          <div className="login-form">
            <form onSubmit={login}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"
                  aria-describedby="helpId"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  aria-describedby="helpId"
                  required
                  onMouseEnter={() => setShowPasswordError(true)}
                  onMouseLeave={() => setShowPasswordError(false)}
                  style={{
                    border: showPasswordError && passwordError ? '1px solid #f44336' : '',
                    boxShadow: showPasswordError && passwordError ? '0 0 10px rgba(244, 67, 54, 0.5)' : ''
                  }}
                />
              </div>
              <div className="btn-group">
                <button type="submit" onClick={login} className="btn btn-primary mb-2 mr-1 waves-effect waves-light">
                  Login
                </button>
                <button
                  type="reset"
                  className="btn btn-danger mb-2 mr-1 waves-effect waves-light"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;