import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { GetByEmailUser } from "../services/api/AuthService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const queryClient = useQueryClient();
    const {data: user, error, isLoading, refetch} = useQuery({
        queryKey: [
            "user"
        ],
        queryFn: async () => {
            const response = await GetByEmailUser();
            if(response){
                if(response.status === 401){
                    return null;
                }else if(response.status === 403){
                    return null;
                }else if(response.status === 400){
                    return null;
                }
                return response?.data;
            }
            return null;
        },
        enabled: !!localStorage.getItem('token') 
    })

    const clearUser = () => {
        queryClient.setQueryData(["user"], null);
    }
    const value = {
        user,
        isLoading,
        error,
        refetchUser: refetch,
        clearUser
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
    