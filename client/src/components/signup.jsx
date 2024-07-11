import React, { useContext, useState } from 'react';
import { UserContext } from './context/userContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function SignUp() {
  const { signup } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }
    if (!/(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}/.test(password)) {
      setError('Password must be at least 8 characters long and include numbers and symbols');
      return;
    }
    signup(name, email, password);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-screen-lg bg-white rounded-lg overflow-hidden shadow-md">
        <div className="flex flex-col md:flex-row">
          {/* Left blue half */}
          <div className="bg-blue-300 flex flex-col justify-center items-center md:w-1/2 px-4  md:px-12 rounded-l-lg bg-cover bg-center" style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/brightly-lit-drug-store-interior_841543-24693.jpg?w=360')` }} >
            <h2 className="text-4xl font-semibold text-gray-700 text-center" data-aos="fade-up">Join Medimart</h2>
            <p className="text-gray-700 mt-4 text-center" data-aos="fade-up">Create your account today.</p>
          </div>
          
          {/* Right white half */}
          <div className="md:w-1/2 px-4 py-8 md:px-12">
            <div className="flex items-center justify-center md:h-full">
              <div className="w-full max-w-md">
                <div className="bg-white overflow-hidden">
                  <h2 className="text-3xl font-semibold mb-4 text-center">Create an account</h2>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    {error && <div className="text-red-500 text-center">{error}</div>}
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-field"
                        placeholder="Username"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                        placeholder="Email address"
                      />
                    </div>
                    <div className="relative">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                        placeholder="Password"
                      />
                      <span className="absolute inset-y-0 right-0 pr-3 pt-4 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </span>
                    </div>
                    <div className="relative">
                      <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700">
                        Confirm password
                      </label>
                      <input
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        type={showPasswordConfirmation ? 'text' : 'password'}
                        autoComplete="new-password"
                        required
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        className="input-field"
                        placeholder="Confirm Password"
                      />
                      <span className="absolute inset-y-0 right-0 pr-3 pt-4 flex items-center cursor-pointer" onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}>
                        <FontAwesomeIcon icon={showPasswordConfirmation ? faEyeSlash : faEye} />
                      </span>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="btn-primary w-full py-2 px-4 mt-4 bg-blue-300 hover:bg-blue-500 text-white font-semibold rounded"
                      >
                        Sign up
                      </button>
                    </div>
                    <div className="text-center mt-4">
                      <span className="text-sm text-gray-600">Already have an account?</span>{' '}
                      <Link to="/login" className="text-sm font-medium text-blue-500 hover:text-blue-400">
                        Sign in
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

