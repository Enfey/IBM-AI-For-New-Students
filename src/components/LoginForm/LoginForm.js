import { useState, useEffect } from 'react';
import { auth } from '../../util/firebase';
import { Form, TextInput, FormLabel, Button } from '@carbon/react';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const credential = await signInWithEmailAndPassword(auth, email, password);
            const user = credential.user;
            console.log(user.email)

            setEmail('');
            setPassword('');

        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    setError('Invalid email format');
                    break;
                case 'auth/user-disabled':
                    setError('This account has been disabled');
                    break;
                case 'auth/user-not-found':
                    setError('No account found with this email');
                    break;
                case 'auth/wrong-password':
                    setError('Incorrect password');
                    break;
                default:
                    setError('An error occurred during login');
                    console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-form">
            <Form onSubmit={handleLogin}>
              
                    <TextInput
                        id="email"
                        labelText="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    >
                    </TextInput>
               
               
                    <TextInput
                        id="password"
                        labelText="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    >
                    </TextInput>
                
                <Button 
                    type="submit" 
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'} 
                </Button>
                {error && <p className="error">{error}</p>}
            </Form>
        </div>
    );
};


export default LoginForm;