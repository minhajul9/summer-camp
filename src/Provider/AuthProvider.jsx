import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const user = {email: 'summer@school.com'};
    const [loading, setLoading] = useState(true)

    const authInfo = {
        user,
        loading
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;