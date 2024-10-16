"use client"; // Important for using state and effects in this component

import React, { useState } from 'react';
import { supabase } from '../../lib/supabase'; // Adjust the path according to your project structure

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });

        setLoading(false);

        if (error) {
            console.error('Error logging in:', error);
            setError('Error logging in, please try again.');
        } else {
            console.log('Login successful!');
            window.location.href = '/sell-ewaste'; // Adjust if necessary
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">Login Page</h1>
            <button 
                onClick={handleLogin} 
                disabled={loading} 
                className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded"
            >
                {loading ? 'Logging in...' : 'Login with Google'}
            </button>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
    );
};

export default LoginPage;
