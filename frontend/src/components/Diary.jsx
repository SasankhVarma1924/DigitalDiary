import { useState, useRef} from "react";
import TextEditor from "./TextEditor.jsx"

import "./Diary.css"

function Diary()
{
  const [checkActiveButtons, setCheckActiveButtons] = useState(
    {bold : false, italic: false, underline: false, strike: false, orderedlist: false, unorderedlist: false, alignleft: false, aligncenter: false, alignright: false});
  const dateClicked = useRef(null);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const [today, setToday] = useState(new Date());
  
  const handleDateClick = (event) =>
  {
    dateClicked.current.style.backgroundColor = "";
    const name = event.target.getAttribute("data-name");
    if(name === "today")
    {
      event.target.style.backgroundColor = "#4A90E2";
    }
    else
    {
      event.target.style.backgroundColor = "#E94E77";
    }
    dateClicked.current = event.target;
  }

  return (
    <>
      <div style={{display:"flex", gap:"50px"}}>
        <div className="PastRecordsContainer">

          <h1 style={{color: "#4A90E2", marginLeft:"2%", fontFamily:"monospace"}}>Today</h1>

          <span className="DateStyle" style={{backgroundColor:"#4A90E2"}} data-name="today" ref={dateClicked} onClick={handleDateClick}>
            {today.getDate() + " " + monthNames[today.getMonth()] + " " + today.getFullYear()}
          </span>

          <h1 style={{color: "#E94E77", marginLeft:"2%", fontFamily:"monospace"}}>Memories</h1>

          <span className="DateStyle" onClick={handleDateClick}>
            {today.getDate() - 1 + " " + monthNames[today.getMonth()] + " " + today.getFullYear()}
          </span>
          <span className="DateStyle" onClick={handleDateClick}>
            {today.getDate() - 2 + " " + monthNames[today.getMonth()] + " " + today.getFullYear()}
          </span>
          <span className="DateStyle" onClick={handleDateClick}>
            {today.getDate() - 3 + " " + monthNames[today.getMonth()] + " " + today.getFullYear()}
          </span>
          <span className="DateStyle" onClick={handleDateClick}>
            {today.getDate() - 4 + " " + monthNames[today.getMonth()] + " " + today.getFullYear()}
          </span>
          <span className="DateStyle" onClick={handleDateClick}>
            {today.getDate() - 5 + " " + monthNames[today.getMonth()] + " " + today.getFullYear()}
          </span>
        </div>

        <TextEditor/>

      </div>
    </>
  );
}

export default Diary;