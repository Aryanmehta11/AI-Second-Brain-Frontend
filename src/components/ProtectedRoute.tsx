import {Navigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import { type ReactElement } from 'react';
import Navbar from "./Navbar";

export default function ProtectedRoute({children}:{children:ReactElement}){
    const {token,loading}=useAuth();

    if (loading) return null;
    if (!token) return <Navigate to='/' replace/>

    return (
    <>
      <Navbar />
      <div style={{ padding: 30 }}>
        {children}
      </div>
    </>
  );

}
