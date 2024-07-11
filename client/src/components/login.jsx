
import React, { useContext, useState } from 'react';
import { UserContext } from './context/userContext';
import { Link } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-screen-lg bg-white rounded-lg overflow-hidden shadow-md">
        <div className="flex flex-col md:flex-row">
          {/* Left blue half */}
          <div className="bg-blue-300 flex flex-col justify-center items-center md:w-1/2 px-4 py-4 md:px-8 bg-cover bg-center " style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/blurred-drugstore-background-defocus_841543-8518.jpg?w=360')` }}>
            <h2 className="text-3xl font-semibold text-gray-700 text-center">Welcome to Medimart</h2>
            <p className="text-gray-700 mt-4 text-center">Your trusted online pharmacy.</p>
          </div>
          
          {/* Right white half */}
          <div className="md:w-1/2 px-4 py-8 md:px-8">
            <div className="flex items-center justify-center md:h-full">
              <div className="w-full max-w-md">
                <div className="bg-white overflow-hidden ">
                  <h2 className="text-3xl font-semibold mb-4 text-center">Log in to your account</h2>
                  <form className="space-y-4" onSubmit={handleSubmit}>
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
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                        placeholder="Password"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                          Remember me
                        </label>
                      </div>
                      <div className="text-sm">
                        <Link to="#" className="font-medium text-blue-500 hover:text-blue-400">
                          Forgot your password?
                        </Link>
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="btn-primary w-full py-2 px-4 mt-4 bg-blue-300 hover:bg-blue-500 text-white font-semibold rounded"
                      >
                        Sign in
                      </button>
                    </div>
                    <div className="text-center mt-4">
                      <span className="text-sm text-gray-600">Don't have an account?</span>{' '}
                      <Link to="/signup" className="text-sm font-medium text-blue-500 hover:text-blue-400">
                        Sign up
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
