import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import {auth } from "../firebase"
import "../styles/Layout.css"

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await auth.signOut();
      navigate("/login");
    }catch(error){
      console.error("Logout failed: ", error); 
    }
  };

  const handleHomepage =  () => {
     navigate("/login");
  };
   
  

  return (
    <>
      <div id="login">
          {!user ? handleHomepage() : (user &&
            <button id="top-button" onClick={handleLogout}>Logout</button>
          )}
          
        </div>
      <div className="header">
        
        <img  src="/images/cat1.2.2.png"alt="cat logo"/>
        <h1 id="website-title">Meow Moolah</h1>
      </div>
      
      <nav>
        {user && <Link to="/dashboard">Dashboard</Link>}
        {user && <Link to="/transForm">+New Transaction</Link>}
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
