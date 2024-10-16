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
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Login with Google'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default LoginPage;
