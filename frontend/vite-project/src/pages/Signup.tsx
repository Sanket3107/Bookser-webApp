import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/FirebaseConfig';
import axios from 'axios';
import AuthLayout from '../components/AuthLayout';

const Signup = () => {
    const setLocation = useNavigate();
    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const sendFirebaseTokenToBackend = async (idToken: string) => {
        try {
            // The backend expects the token in the "verificationToken" field of the User object
            const uri = import.meta.env.VITE_API_URL + '/auth/login';
            const response = await axios.post(uri, { verificationToken : idToken });
            console.log("User stored in DB:", response.data);
            return response.data;
        } catch (backendError) {
            console.error("Backend error:", backendError);
            throw backendError;
        }
    };
    
    // Function to handle sign-up with Google
    const signUpWithGoogle = async () => {
        setAuthing(true);
        setError('');
        try {
            const response = await signInWithPopup(auth, new GoogleAuthProvider());
            const idToken = await response.user.getIdToken();
            console.log(idToken);
            await sendFirebaseTokenToBackend(idToken);
            setLocation('/');
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An error occurred during Google sign-up');
            }
            setAuthing(false);
        }
    };

    // Function to handle sign-up with email and password
    const signUpWithEmail = async () => {
        // Check if all fields are filled
        if (!email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }
        
        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setAuthing(true);
        setError('');

        // Use Firebase to create a new user with email and password
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const idToken = await response.user.getIdToken();
            console.log(idToken);
            await sendFirebaseTokenToBackend(idToken);
            setLocation('/');
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            setAuthing(false);
        }
    };

    return (
        <AuthLayout isLoginPage={false}>
            <div id="signup-form">
                <div className="w-full flex flex-col mb-8">
                    <h3 className="text-4xl font-bold mb-2 text-gray-900">Create Account</h3>
                    <p className="text-lg mb-4 text-gray-600">Please fill in your details to get started.</p>
                </div>
                
                <div className="w-full flex flex-col mb-6">
                    <div className="relative mb-4">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                            <i className="fa-regular fa-envelope"></i>
                        </div>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className="w-full py-3 pl-10 pr-3 text-gray-800 bg-white border-b-2 border-gray-200 focus:outline-none focus:border-pink-500 focus:shadow-[0_2px_0_#FF8FAA] rounded-lg transition-all duration-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    
                    <div className="relative mb-4">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                            <i className="fa-solid fa-lock"></i>
                        </div>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="w-full py-3 pl-10 pr-3 text-gray-800 bg-white border-b-2 border-gray-200 focus:outline-none focus:border-pink-500 focus:shadow-[0_2px_0_#FF8FAA] rounded-lg transition-all duration-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <div className="relative mb-4">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                            <i className="fa-solid fa-lock"></i>
                        </div>
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            className="w-full py-3 pl-10 pr-3 text-gray-800 bg-white border-b-2 border-gray-200 focus:outline-none focus:border-pink-500 focus:shadow-[0_2px_0_#FF8FAA] rounded-lg transition-all duration-300"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>
                
                {error && (
                    <div className="text-red-500 mb-4 bg-red-50 p-3 rounded-lg">
                        <i className="fa-solid fa-circle-exclamation mr-2"></i>
                        <span>{error}</span>
                    </div>
                )}
                
                <div className="w-full flex flex-col mb-6">
                    <button 
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full p-3 text-center flex items-center justify-center cursor-pointer transition-all duration-300 shadow-[0_4px_20px_rgba(255,182,193,0.25)]"
                        onClick={signUpWithEmail}
                        disabled={authing}
                    >
                        <i className="fa-solid fa-user-plus mr-2"></i>
                        Create Account
                    </button>
                </div>
                
                <div className="w-full flex items-center justify-center relative py-4">
                    <div className="w-full h-[1px] bg-gray-200"></div>
                    <p className="text-sm absolute text-gray-500 bg-white px-4">OR</p>
                </div>
                
                <button 
                    className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-full p-3 text-center flex items-center justify-center cursor-pointer transition-all duration-300 border border-gray-300 shadow-sm mt-4"
                    onClick={signUpWithGoogle}
                    disabled={authing}
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="w-5 h-5 mr-2" />
                    Sign Up with Google
                </button>
            </div>
        </AuthLayout>
    );
};

export default Signup;