import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="h-screen flex flex-col items-center justify-center">
    <h1 className="text-4xl font-bold">404</h1>
    <p className="mb-4">Page not found</p>
    <Link to="/" className="text-blue-600 underline">Go Home</Link>
  </div>
);

export default NotFound;
