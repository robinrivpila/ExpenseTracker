import React, { useState } from "react";
import { firestore } from "../firebase"; // Import Firebase instance
import { doc, updateDoc } from "firebase/firestore";

const EditableBalance = ({ balance, userId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBalance, setNewBalance] = useState(balance);

  const handleSave = async () => {
    if(!userId || typeof userID!=="string"){
      console.error("Invalid userId:", userId);
      return;
    }

    try{
      const balanceRef = doc(firestore, "users", userId); // Adjust collection as needed
      console.log("This user exists");
      await updateDoc(balanceRef, { balance: parseFloat(newBalance) });
      console.log("Balance: ", balance);
      setIsEditing(false);
    }catch(error){
      console.error("Error updating balance:" , error);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {isEditing ? (
        <input
          type="number"
          value={newBalance}
          onChange={(e) => setNewBalance(e.target.value)}
          className="border p-2 w-32"
        />
      ) : (
        <span className="text-2xl font-bold">${balance.toFixed(2)}</span>
      )}
      <button
        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default EditableBalance;