import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register,logout, getMe } from "../services/auth.api";
export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({email, password}) => {
        setLoading(true)
        try {
            const data = await login({email, password})
            setUser(data.user)
        } catch (error) {
            console.error("Error logging in user:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({email, password, name}) => {
        setLoading(true)
        try {
            const data = await register({email, password, name})
            setUser(data.user)
        } catch (error) {
            console.error("Error registering user:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
        } catch (error) {
            console.error("Error logging out user:", error)
        } finally {
            setLoading(false)
        }
    }
    return { user, setUser, loading, setLoading, handleLogin, handleRegister, handleLogout }
}