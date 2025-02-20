import React, { useRef, useState } from "react";
import PropTypes from 'prop-types';
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";  // Adjust import according to your Firebase setup
import {useAuth} from "../components/AuthContext"


function EditableInput({ value, onSave }) {
    const {user} = useAuth();
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentValue, setCurrentValue] = useState(value); // State to hold the current value
    const inputRef = useRef(null);

    // Function to turn on edit mode and focus the input
    function turnOnEditMode() {
        setIsEditMode(true);
        if (inputRef.current) {
            inputRef.current.focus(); // Focus on the input when editing
        }
    }

    // Function to handle saving the value
    async function saveValue() {
        setIsEditMode(false);

        // Update the Firestore document with the new balance
        try {
            const userDocRef = doc(firestore, "users", user.uid);  // Assuming the user's document is stored in "users"
            await updateDoc(userDocRef, {
                balance: parseFloat(currentValue),  // Save the updated balance (make sure to parse as a number)
            });

            console.log("Balance updated in Firestore!");
            onSave(currentValue);  // Call the parent component's onSave function to update the state
        } catch (error) {
            console.error("Error updating balance in Firestore: ", error);
        }
    }
    

    // Handle changes to the input value
    function handleInputChange(event) {
        setCurrentValue(event.target.value); // Update the currentValue state with the new input
    }

    return (
        <div className="editable-input">
            <span className="editable-input-container">
                <input className="editable-input-text"
                    ref={inputRef} // Attach ref to input element
                    type="number"
                    value={currentValue} // Use the currentValue state to control the input value
                    readOnly={!isEditMode} // Toggle between edit and view modes
                    onClick={turnOnEditMode} // On click, enable edit mode
                    onChange={handleInputChange} // Update the value as the user types
                />
            </span>

            <button className="editable-input-button" onClick={isEditMode ? saveValue : turnOnEditMode}>
                {isEditMode ? "Save" : "Edit"} {/* Toggle button text */}
            </button>
        </div>
    );
}

EditableInput.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onSave: PropTypes.func.isRequired, // Function passed to handle saving the value
};

export default EditableInput;

