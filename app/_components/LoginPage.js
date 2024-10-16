// app/login/page.js
"use client"; // Make sure to use "use client" for client-side rendering

import React, { useState } from 'react';
import { supabase } from '../lib/supabase'; // Ensure the correct path to your supabase.js file

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
            window.location.href = '/sell-ewaste'; // Redirect after successful login
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Login with Google'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default LoginPage;
