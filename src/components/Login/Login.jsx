
import '../Login/login.css';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../utils/userContext';
import { Link } from 'react-router-dom';

function Login() {
   // Form data state: name, email, password
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // To store submitted user name for welcome message
  const [submittedName, setSubmittedName] = useState('');

  // Error message state for validation
  const [error, setError] = useState('');

  // Toggle to show/hide password
  const [showPassword, setShowPassword] = useState(false);

  // Access login function from UserContext
  const { login } = useContext(UserContext);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    // Basic validation
    if (!name || !email || !password) {
      setError('Please fill all the fields');
      return;
    }

    // Clear errors and set submitted name
    setError('');
    setSubmittedName(name);

    // Trigger global login with name
    login(name);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        {/* login heading */}
        <h2>Shoppy Login</h2>   
        {/* Welcome name below heading */}
        {submittedName && <h4 className="welcome-name">Welcome, {submittedName}!</h4>}

        {error && <p className="error-msg">{error}</p>}
{/* name input */}
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
{/* email input */}
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
{/* password  */}
        <label>Password:</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <button type="submit" className="login-btn">Login</button>
        <Link to='/'><button className='login-btn'>Go Back</button></Link>
        
      </form>
    </div>
  );
}

export default Login;
