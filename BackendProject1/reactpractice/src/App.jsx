import "./index.css"
import Home from "./pages/Home";
import {Routes, Route} from 'react-router-dom'
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContextProvider } from "./UserContext";
import Createpost from "./pages/createpost";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";

function App() {
  return <>
  <UserContextProvider>
  <Routes>
    <Route>
     <Route index element={<Home/>}></Route>
     <Route path="/login" element={<Login/>}></Route>
     <Route path="/register" element={<Register/>}></Route>
     <Route path="/post/:id" element={<PostDetail/>}></Route>
     <Route path="/edit/:id" element={<EditPost/>}></Route>
     <Route path="/create" element={<Createpost/>}></Route>
    </Route>

  </Routes>
  </UserContextProvider>
  
  </>;
}

export default App;
