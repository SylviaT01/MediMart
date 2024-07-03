import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = values => {
    console.log('Form data', values);
    // Add fetch request here for logging in
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <Field type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded mt-1" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <Field type="password" id="password" name="password" className="w-full p-2 border border-gray-300 rounded mt-1" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">Login</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
