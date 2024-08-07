import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const handleSignUp = (event) => {
        event.preventDefault();


        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            alert("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }

        // Sign up successful if all validations pass
        alert("Sign up successful!");

        // Send data to server
        fetch('https://dummyjson.com/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                username: email,
                password: password,
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log('Server response:', data);
                navigate('/login')
            })
            .catch(error => {
                console.error('Error during sign up:', error);
                alert('Sign up failed. Please try again.')
            });
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
                <div className="w-full text-center">
                    <h1 className="text-3xl font-semibold text-gray-900">Sign Up</h1>
                    <p className="mt-2 text-gray-500">Please fill in the form to sign up:</p>
                    <form className="mt-4 flex flex-col items-center" onSubmit={handleSignUp}>
                        <input
                            type="text"
                            placeholder="First Name"
                            className="mt-4 px-3 py-3 w-full rounded-md border border-gray-300 focus:border-black focus:outline-none"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="mt-4 px-3 py-3 w-full rounded-md border border-gray-300 focus:border-black focus:outline-none"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="UserName"
                            className="mt-4 px-3 py-3 w-full rounded-md border border-gray-300 focus:border-black focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="mt-4 px-3 py-3 w-full rounded-md border border-gray-300 focus:border-black focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="mt-4 px-3 py-3 w-full rounded-md border border-gray-300 focus:border-black focus:outline-none"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="mt-6 w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
