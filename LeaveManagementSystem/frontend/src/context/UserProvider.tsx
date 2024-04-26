import { FC,ReactNode,useState } from "react"
import { EmployeeDetailsType } from "../types/EmployeeDetailsType"
import UserContext from "./UserContext"


interface ChildrenType {
    children: ReactNode
}

export interface MessageType {
    isSender: boolean,
    content: string,
    date:string
}
    
const UserProvider: FC<ChildrenType> = ({ children }) => {
    const [user, setUser] = useState<EmployeeDetailsType | null>(null)
   

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children }
        </UserContext.Provider>
    )
}

export default UserProvider