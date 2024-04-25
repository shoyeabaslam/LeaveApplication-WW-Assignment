import { EmployeeDetailsType } from "../types/EmployeeDetailsType";
import {  createContext } from "react";


interface ContextType {
    user: EmployeeDetailsType | null;
    setUser: React.Dispatch<React.SetStateAction<EmployeeDetailsType | null>>;
}

// Define the initial context value
const initialValue: ContextType = {
    user: null,
    setUser: () => {}
};

const UserContext = createContext<ContextType>(initialValue);

export default UserContext;