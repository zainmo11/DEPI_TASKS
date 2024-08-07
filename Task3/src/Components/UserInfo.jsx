import React, { useEffect, useState } from 'react';
import "../index.css";
const API_URL = 'https://dummyjson.com/auth';

const UserInfo = ({ onLogout }) => {
    const [userInfo, setUserInfo] = useState(null);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`${API_URL}/me`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const data = await response.json();
                setUserInfo(data);
            } catch (error) {
                console.error('Failed to fetch user info', error);
            }
        };

        fetchUserInfo();
    }, [accessToken]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

        <div className="flex mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
            <div className="w-full text-center">
                <h1 className="text-3xl font-semibold text-gray-900">User Information</h1>
                <p className="mt-2 text-gray-500">Here is your account information:</p>
                {userInfo ? (
                    <div className="mt-4 flex flex-col items-center">
                        <img src={userInfo.image} className="mt-4 inline"/>
                       <div className="mt-9 flex flex-col items-start">
                        <p className="text-gray-500 text-sm md:text-base lg:text-lg "><span className="font-bold">Name:</span> {userInfo.firstName} {userInfo.lastName}</p>
                        <p className="text-gray-500 text-sm md:text-base lg:text-lg"><span className="font-bold">Email:</span> {userInfo.email}</p>
                        <p className="text-gray-500 text-sm md:text-base lg:text-lg"><span className="font-bold">Gender:</span> {userInfo.gender}</p>
                        <p className="text-gray-500 text-sm md:text-base lg:text-lg text-nowrap"><span className="font-bold">University:</span> {userInfo.university}</p>
                        <p className="text-gray-500 text-sm md:text-base lg:text-lg"><span className="font-bold">BirthDate:</span> {userInfo.birthDate}</p>
                        <p className="text-gray-500 text-sm md:text-base lg:text-lg"><span className="font-bold">Weight:</span> {userInfo.weight}</p>
                       </div>
                    </div>
                ) : (
                    <p className="text-gray-500">Loading...</p>
                )}
                <button
                    onClick={onLogout}
                    className="mt-6 w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
                >
                    Logout
                </button>
            </div>
        </div>
        </div>
    );
};

export default UserInfo;
