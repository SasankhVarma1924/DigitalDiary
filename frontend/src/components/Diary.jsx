import { useState, useRef} from "react";
import { GoListOrdered } from "react-icons/go";
import { GoListUnordered } from "react-icons/go";
import { CiTextAlignLeft } from "react-icons/ci";
import { CiTextAlignRight } from "react-icons/ci";
import { CiTextAlignCenter } from "react-icons/ci";
import { PiTextIndent } from "react-icons/pi";
import { PiTextOutdent } from "react-icons/pi";

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

  const handleFormatButtonsClick = (event) =>
  {
    const clickedButton = event.target.name;
    const isClicked = checkActiveButtons[clickedButton];
    event.target.classList.toggle("active");
    setCheckActiveButtons({...checkActiveButtons, [clickedButton] : !isClicked});
  }

  return (
    <>
      <div style={{display:"flex"}}>
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

        <div className="DiaryContainer" contentEditable="true">
        </div>

        <div className="EditingContainer">
          <h1 style={{color:"#00BCD4", fontFamily:"monospace", textAlign:"center"}}>Tools</h1>
          <div className="ToolContainer" style={{marginTop:"0px"}}>
            <button className="FormattingButtons" name="bold" style={{marginLeft:"20px"}} onClick={handleFormatButtonsClick}>B</button>
            <button className="FormattingButtons" name="italic" onClick={handleFormatButtonsClick}>I</button>
            <button className="FormattingButtons" name="underline" onClick={handleFormatButtonsClick}>U</button>
            <button className="FormattingButtons" name="strike" style={{marginRight:"20px"}} onClick={handleFormatButtonsClick}>S</button>
          </div>

          <div className="ToolContainer">
          <select className="TextStyle" name="fontstyle" id="fontstyle" style={{marginLeft:"14px"}}>
              <option value="monospace">monospace</option>
              <option value="sans-serif">sans-serif</option>
              <option value="arial">arial</option>
            </select>
            <select className="TextStyle" name="fontsize" id="fontsize" style={{marginRight:"14px"}}>
              <option value="small">small</option>
              <option value="medium">medium</option>
              <option value="large">large</option>
            </select>
          </div>

          <div className="ToolContainer">
            <input className="ColorSelector" type="color" />
          </div>

          <div className="ToolContainer">
            <GoListOrdered className="FormattingButtons" name="orderedlist" size={20} style={{marginLeft:"20px"}} onClick={handleFormatButtonsClick}/>
            <GoListUnordered className="FormattingButtons" name="unorderedlist" size={20} style={{marginRight:"20px"}} onClick={handleFormatButtonsClick}/>
          </div>

          <div className="ToolContainer">
            <CiTextAlignLeft className="FormattingButtons" name="alignleft" size={20} style={{marginLeft:"20px"}} onClick={handleFormatButtonsClick}/>
            <CiTextAlignCenter className="FormattingButtons" name="aligncenter" size={20} onClick={handleFormatButtonsClick}/>
            <CiTextAlignRight className="FormattingButtons" name="alignright" size={20} style={{marginRight:"20px"}} onClick={handleFormatButtonsClick}/>
          </div>

          <div className="ToolContainer">
            <PiTextIndent className="FormattingButtons" size={20} style={{marginLeft:"20px"}}/>
            <PiTextOutdent className="FormattingButtons" size={20} style={{marginRight:"20px"}}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Diary;