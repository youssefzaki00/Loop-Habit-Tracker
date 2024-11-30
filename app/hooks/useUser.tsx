import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { UserContextType } from "../interfaces"; // Ensure your interfaces are updated to reflect full user data

// Custom hook to access the user context
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
