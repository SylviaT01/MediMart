import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Rating from 'react-rating-stars-component';

const Contact = () => {
  const initialValues = {
    name: '',
    email: '',
    rating: 0, // Initialize rating state
    message: ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    message: Yup.string().required('Message is required')
  });

  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission logic here
    console.log('Form submitted:', values);
    resetForm();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <div className="w-full max-w-screen-lg bg-white shadow-md rounded-md overflow-hidden">
        <div className="md:flex">
          {/* Contact Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Get in Touch</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                      Name
                    </label>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                      Email
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  {/* Rating Component */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Rate Our Services</label>
                    <Rating
                      count={5}
                      onChange={(rating) => setFieldValue('rating', rating)}
                      size={24}
                      activeColor="#ffd700"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                      Message
                    </label>
                    <Field
                      id="message"
                      name="message"
                      as="textarea"
                      placeholder="Your message"
                      rows="4"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                    />
                    <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          {/* Contact Information */}
          <div className="w-full md:w-1/2 p-8 bg-gray-50 rounded">
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="font-bold text-lg text-gray-800">Head Office</h3>
                <p className="text-gray-600">Bilha Towers Ground Floor, Shop Number 45KE</p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Phone Number</h3>
                <p className="text-blue-600 underline underline-offset-2">+254 712 345 678</p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Email Address</h3>
                <p className="text-blue-600 underline underline-offset-2">contact@medimart.com</p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Opening Hours</h3>
                <p className="text-gray-600">Mon-Sat: 9:00am - 8:00pm</p>
                <p className="text-gray-600">Sun: 12:00pm - 9:00pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
