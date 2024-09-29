import { useState, useRef, useEffect, useContext } from "react";
import TextEditor from "./TextEditor.jsx"

import "./Diary.css"
import { GlobalStateContext } from "../GlobalState.jsx";

function Diary()
{
  const dateClicked = useRef(null);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const [today, setToday] = useState(new Date());
  const {username, setCurrentDate, setContent} = useContext(GlobalStateContext);
  
  const handleDateClick = async (event) =>
  {
    dateClicked.current.style.backgroundColor = "";
    const dateName = new Date(event.target.getAttribute("date-name"));
    setCurrentDate(dateName);
    today.setHours(0, 0, 0, 0);
    dateName.setHours(0, 0, 0, 0);
    if(dateName.getTime() === today.getTime())
    {
      event.target.style.backgroundColor = "#4A90E2";
    }
    else
    {
      event.target.style.backgroundColor = "#E94E77";
    }
    dateClicked.current = event.target;

    const response = await fetch(`https://digitaldiary-backend.onrender.com/api/memories/${username}/${dateName}`, 
      {
        method:"GET",
      }
    )
    const res = await response.json();
    if(res.code === "MNF")
    {
      setContent(res.msg);
    }
    else if(res.code === "MF")
    {
      setContent(res.content);
    }
  }

  useEffect(() => {
    async function fetchUserMemories()
    {
      const memoriesContainer = document.querySelector(".memoriesContainer");
      const response = await fetch(`https://digitaldiary-backend.onrender.com/api/memories/${username}`, 
        {
          method: "GET"
        }
      );
      const data = await response.json();
      if(response.status === 404)
      {
        const spanElement = document.createElement("span");
        spanElement.classList.add("DateStyle");
        spanElement.textContent = data.msg;
        memoriesContainer.appendChild(spanElement);
      }
      else if(response.status === 201)
      {
        const userMemories = data.memories;
        userMemories.forEach(memory => {
          const content = memory.content;
          const createdAt = new Date(memory.createdAt);
          createdAt.setHours(0, 0, 0, 0);
          if(createdAt.getTime() === today.getTime())
          {
            return;
          }
          const spanElement = document.createElement("span");
          spanElement.classList.add("DateStyle");
          spanElement.textContent = createdAt.getDate()  + " " + monthNames[createdAt.getMonth()] + " " + createdAt.getFullYear();
          spanElement.setAttribute("date-name", createdAt);
          spanElement.onclick = handleDateClick;
          memoriesContainer.appendChild(spanElement);
        });
      }
    }
    async function setTodaysMemory() {
      const response = await fetch(`https://digitaldiary-backend.onrender.com/api/memories/${username}/${today}`, 
        {
          method: "GET"
        }
      )
      const res = await response.json();
      if(res.code === "MF")
      {
        console.log(res.content);
        setContent(res.content);
      }
    }
    today.setHours(0, 0, 0, 0);
    fetchUserMemories();
    setTodaysMemory();
    setCurrentDate(today);
    const DiaryContainer = document.querySelector(".DiaryContainer");
    DiaryContainer.classList.add("fade-in");
  }, []);

  return (
    <>
      <div className="DiaryContainer" style={{display:"flex", gap:"50px"}}>
        <div className="PastRecordsContainer">

          <div className="todayContainer">
            <h1 style={{color: "#4A90E2", marginLeft:"2%", fontFamily:"monospace"}}>Today</h1>
            <span className="DateStyle" style={{backgroundColor:"#4A90E2"}} date-name={today} ref={dateClicked} onClick={handleDateClick}>
              {today.getDate() + " " + monthNames[today.getMonth()] + " " + today.getFullYear()}
            </span>
          </div>
          
          <div>
            <h1 style={{color: "#E94E77", marginLeft:"2%", fontFamily:"monospace"}}>Memories</h1>
            <div className="memoriesContainer"></div>
          </div>
          
        </div>

        <TextEditor/>

      </div>
    </>
  );
}

export default Diary;