import { useContext,useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });
            setUser(data.user);
        } catch (error) {
            console.error("Error logging in user:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({ email, password, username }) => {
        setLoading(true);
        try {
            const data = await register({ email, password, username });
            setUser(data.user);
        } catch (error) {
            console.error("Error registering user:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.error("Error logging out user:", error);
        } finally {
            setLoading(false);
        }

    };

useEffect(() => {
        const getAndSetUser = async () => {
            
                const data = await getMe()
                setUser(data.user)
                setLoading(false)
        }
        getAndSetUser()
    }, [])

    // This return MUST be inside the function curly braces
    return { user, setUser, loading, setLoading, handleLogin, handleRegister, handleLogout };
}; // <--- Ensure this closing brace is at the very end