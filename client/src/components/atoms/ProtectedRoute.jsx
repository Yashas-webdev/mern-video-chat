import useAuthStore from '../../store/useAuthStore'
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const user = useAuthStore(state => state.user)

    if(!user){
        return <Navigate to='/login' replace />
    }
}