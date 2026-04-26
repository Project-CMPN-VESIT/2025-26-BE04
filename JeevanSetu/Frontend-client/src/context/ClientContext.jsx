import { createContext,useContext,useState } from "react";

const ClientContext = createContext();

const ClientProvider = ({ children }) => {
    const [client,setClient] = useState();
    return (
        <ClientContext.Provider value={{client,setClient}}>
            {children}
        </ClientContext.Provider>
    )
}

export const UseClient = () => {
    return useContext(ClientContext);
}

export default ClientProvider;