import {BrowserRouter, Route, Routes} from "react-router-dom"
import "./App.css"
import LoginPage from "./components/LoginPage.jsx"
import Diary from "./components/Diary.jsx"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/diary" element={<Diary/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
