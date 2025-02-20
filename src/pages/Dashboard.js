import React, { useState, useEffect } from 'react';
import { useAuth } from "../components/AuthContext";  // Custom hook to get user
import EditableInput from "../components/EditableInput";  // Editable input to update balance
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";  // Import firestore
import "../styles/Dashboard.css"

const Dashboard = () => {
    const { user } = useAuth();
    const [balance, setBalance] = useState(null);  // Start with null instead of 0
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const localStorageKey = `balance_${user.uid}`;
            
            // First, try getting the balance from localStorage
            const savedBalance = localStorage.getItem(localStorageKey);
            if (savedBalance) {
                setBalance(parseFloat(savedBalance));  // If found, use it
                setLoading(false);  // Done loading
            } else {
                // If no balance in localStorage, fetch from Firestore
                const fetchBalance = async () => {
                    const userRef = doc(firestore, "users", user.uid);
                    try {
                        const userDoc = await getDoc(userRef);
                        if (userDoc.exists()) {
                            const newBalance = userDoc.data().balance || 0;
                            setBalance(newBalance);
                            localStorage.setItem(localStorageKey, newBalance);  // Save to localStorage
                        } else {
                            console.error("No such user document found!");
                        }
                    } catch (error) {
                        console.error("Error fetching balance:", error);
                    }
                    setLoading(false);  // Done loading
                };
                fetchBalance();
            }
        } else {
            setBalance(0);  // Reset to 0 when no user is logged in
            setLoading(false);  // Done loading
        }
    }, [user]);  // Runs when `user` changes

    // Handle saving the new balance to Firestore and localStorage
    function handleSave(newValue) {
        setBalance(newValue);  // Update balance in state

        if (user) {
            const localStorageKey = `balance_${user.uid}`;
            localStorage.setItem(localStorageKey, newValue);  // Save to localStorage

            // Optionally, update Firestore balance here
            console.log("Saved balance to localStorage:", newValue);
        }
    }

    if (loading) {
        return <div>Loading...</div>;  // Show loading indicator while balance is being fetched
    }

    return (
        <div>
            <div className="header">
                 {user && <p>Hello, {user.email}!</p>}    
            </div>
                
            <div className='stats-container'>
                <div className='month-stat-container'>
                    <h2 className='month-stat-text'>Month's Budget</h2>
                    <EditableInput className='month-stat-text' value={balance} onSave={handleSave} />
                </div>
                
                <div className='month-stat-container'>
                   <h2 className='month-stat-text'>Spent</h2>
                    <EditableInput className='month-stat-text'value={1000} onSave={handleSave} /> 
                </div>
                
                <div className='month-stat-container'>
                    <h2 className='month-stat-text'>$$ Meow-la</h2>
                    <text className='month-stat-text'>$000.00</text>
                </div>  
            </div>
            
            <div className='total-stat'>
                <h2>Total Expenses</h2>
                <text>$000.00</text>
            </div>
             
        </div>
    );
};

export default Dashboard;


