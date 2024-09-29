import {BrowserRouter, Route, Routes} from "react-router-dom"
import "./App.css"
import LoginPage from "./components/LoginPage.jsx"
import Diary from "./components/Diary.jsx"
import { GlobalStateProvider } from "./GlobalState.jsx"

function App() {

  return (
    <>
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
