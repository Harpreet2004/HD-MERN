import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    dob: '',
    email: '',
    otp: ''
  });
  const [showOtp, setShowOtp] = useState(false);
  const [step, setStep] = useState('email');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleOtpVisibility = () => setShowOtp(!showOtp);

  const sendOtp = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/users/send-otp`, { email: form.email });
      setStep('otp');
      setError('');
    } catch (err) {
      setError('Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/users/verify-otp`, { email: form.email, otp: form.otp, name: form.name });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('Signup successful!');
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid OTP');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (step === 'email') {
      sendOtp();
    } else {
      verifyOtp();
    }
  };

  const handleSuccess = async (response) => {
    const { credential } = response;
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/users/google-login`, {
        idToken: credential,
      });

      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      console.error('Google login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="flex items-center gap-2 mb-4">
            <img src="/hd-icon.png" alt="HD Logo" className="w-6 h-6" />
            <span className="font-semibold text-lg">HD</span>
          </div>

          <h2 className="text-2xl font-bold mb-1">Sign up</h2>
          <p className="text-gray-500 mb-6">Sign up to enjoy the feature of HD</p>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={step === 'otp'}
              />
            </div>

            {step === 'otp' && (
              <div>
                <label className="text-sm font-medium">OTP</label>
                <div className="relative mt-1">
                  <input
                    type={showOtp ? 'text' : 'password'}
                    name="otp"
                    value={form.otp}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleOtpVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showOtp ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {step === 'email' ? 'Sign up' : 'Verify OTP'}
            </button>

            <div className="flex items-center justify-center my-2 text-gray-500 text-sm">or</div>

            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => console.log('Login Failed')}
              width="100%"
            />
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?? <a href="/signin" className="text-blue-600 hover:underline">Sign in</a>
          </p>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100 rounded-l-2xl">
        <img
          src="/logo.jpg"
          alt="Sign in graphic"
          className="object-cover w-full h-full rounded-l-2xl"
        />
      </div>
    </div>
  );
};

export default Signup;
