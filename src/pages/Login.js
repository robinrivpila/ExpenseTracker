
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {auth} from "../firebase";
import {firestore} from "../firebase"
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"

function Login(){
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider(); 

        try{
            const result =  await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Firebase Auth: ", auth);
            console.log("User: ", user);
            const userRef = doc(firestore, "users" , user.uid);
            await setDoc(userRef, {
                email: user.email || "no-email@example.com", 
                balance: 0, 
                name: user.displayName || "n/a"
            });
            
            console.log("User signed in and data saved!");
            navigate("/dashboard"); 
        }catch(error){
            console.error("Error signing in with google:" , error);
        }
        

    };

    return(
        <div className="google-signin-button">
            <button  onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>


    );
}


export default Login; 