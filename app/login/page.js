// app/login/page.js

import React from 'react';
import LoginPage from '../_components/LoginPage'; // Adjust the path based on your folder structure

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoginPage />
    </div>
  );
};

export default Login;
