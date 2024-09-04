import React from 'react';
import { useAuth } from '../context/Authprovider'; // Ensure correct path to Authprovider
import toast from 'react-hot-toast';

function Logout() {
  const [authUser, setAuthUser] = useAuth(); // Access authUser and setAuthUser from context

  const handleLogout = () => {
    try {
      setAuthUser(null); 
      localStorage.removeItem("user");    
      toast.success("Logout successfully"); 
      
      setTimeout(()=>{

      window.location.reload();
      
    

    },2000);
                          // Show success toast
    } catch (error) {
      console.error("Error during logout:", error); // Log any errors
      toast.error("Logout failed. Please try again."); // Show error toast
  setTimeout(()=>{},3000);
    }
  };

  return (
    <div>
      <button 
        className='px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer' 
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
