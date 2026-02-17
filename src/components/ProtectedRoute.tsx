import {Navigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import { type ReactElement } from 'react';

export default function ProtectedRoute({children}:{children:ReactElement}){
    const {token,loading}=useAuth();

    if (loading) return null;
    if (!token) return <Navigate to='/' replace/>

    return children

}
