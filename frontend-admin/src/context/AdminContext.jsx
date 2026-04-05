import { createContext, useContext, useState } from "react";

const AdminContext = createContext();

const AdminProvider = ({children}) => {
    const [admin,setAdmin] = useState(null);

    return (
        <AdminContext.Provider value={{admin,setAdmin}}>
            {children}
        </AdminContext.Provider>
    )
}

export const UseAdmin = () => {
    return useContext(AdminContext);
}

export default AdminProvider;