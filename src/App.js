import logo from './logo.svg';
import './App.css';
import userEvent from '@testing-library/user-event';
import React,{useEffect, useState} from 'react';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://randomuser.me/api/?page=1&results=1&seed=abc")
      .then((response) => response.json())
      .then((data) => setUser(data.results[0]))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-blue-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-120 flex items-center border border-gray-300">
        <img
          className="rounded w-32 h-32 border-2 border-gray-300 object-cover"
          src={user.picture.large}
          alt="User Profile"
        />
        <div className="ml-6">
          <h2 className="text-2xl font-semibold">{`${user.name.first} ${user.name.last}`}</h2>
          <p className="text-gray-500 mt-2 text-lg">{user.email}</p>
          <div className="mt-4">
            <p className="text-gray-700">
              <span className="font-semibold">Location:</span> {`${user.location.city}, ${user.location.country}`}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Phone:</span> {user.phone}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">DOB:</span> {new Date(user.dob.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Registered:</span> {new Date(user.registered.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
