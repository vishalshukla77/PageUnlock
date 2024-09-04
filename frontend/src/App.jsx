import React from 'react';
import Courses from './courses/Courses';
import Home from './Home/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import { Toaster } from 'react-hot-toast'; // Ensure react-hot-toast is installed
import { useAuth } from './context/Authprovider'; // Import useAuth to access authentication context

function App() {
  const [authUser, setAuthUser] = useAuth(); // Access authUser and setAuthUser from context
  console.log(authUser);

  return (
    <>
      <div className='dark:bg-slate-900 dark:text-white'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={authUser ? <Courses /> : <Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
