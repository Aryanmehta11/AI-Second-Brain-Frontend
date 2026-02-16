import {Routes,Route} from "react-router-dom"
import Login from './pages/Login'
import Upload from './pages/Upload'
import Chat from './pages/Chat'

export default function App(){
  return (
    <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/upload" element ={<Upload/>}/>
    <Route path="/chat" element={<Chat/>}/>
    </Routes>
  )
}