import {BrowserRouter, Route, Routes} from "react-router-dom"
import "./App.css"
import LoginPage from "./components/LoginPage.jsx"
import Diary from "./components/Diary.jsx"
import { GlobalStateProvider } from "./GlobalState.jsx"
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <ToastContainer
        toastClassName="custom-toast"
        transition={Zoom}
        position="top-right"
        autoClose={500}
        hideProgressBar
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="dark"
      />
      <GlobalStateProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/diary" element={<Diary/>}/>
          </Routes>
        </BrowserRouter>
      </GlobalStateProvider>
    </>
  )
}

export default App
