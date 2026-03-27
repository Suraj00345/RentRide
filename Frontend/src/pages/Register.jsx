import { useEffect, useState } from 'react';
import { assets } from '../assets/assets.js';
import UserRegister from '../components/Auth/UserRegister.jsx';
import AuthContent from '../components/Auth/AuthContent.jsx';

const Register = ({ setShowRecruiterLogin }) => {
   
    return (


    <div className="flex flex-1 min-h-screen font-sans">

      <AuthContent />

      <UserRegister />

    </div>


       
    );
};

export default Register;