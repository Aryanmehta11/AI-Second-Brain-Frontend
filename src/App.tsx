import {Routes,Route} from "react-router-dom"
import Login from './pages/Login'
import Upload from './pages/Upload'
import Chat from './pages/Chat'
import Documents from "./pages/Document"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"

export default function App(){
  return (
    <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/upload" element ={<ProtectedRoute><Upload/></ProtectedRoute>}/>
    <Route path="/chat" element={<ProtectedRoute><Chat/></ProtectedRoute>}/>
    <Route path="/documents" element={<ProtectedRoute><Documents/></ProtectedRoute>}/>
    <Route path="/register" element={<Register />} />

    </Routes>
  )
}