import { useState, useRef} from "react";
import { GoListOrdered } from "react-icons/go";
import { GoListUnordered } from "react-icons/go";
import { CiTextAlignLeft } from "react-icons/ci";
import { CiTextAlignRight } from "react-icons/ci";
import { CiTextAlignCenter } from "react-icons/ci";
import { PiTextIndent } from "react-icons/pi";
import { PiTextOutdent } from "react-icons/pi";
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

  const handleBoldButtonClick = (event) =>
  {

    const diaryContainer = document.querySelector(".DiaryContainer");
    diaryContainer.focus();
    event.target.classList.toggle("active");
  }

  const handleItalicButtonClick = (event) =>
  {

    

    const diaryContainer = document.querySelector(".DiaryContainer");
    diaryContainer.focus();
    event.target.classList.toggle("active");
  }

  const handleUnderlineButtonClick = (event) =>
  {

    

    const diaryContainer = document.querySelector(".DiaryContainer");
    diaryContainer.focus();
    event.target.classList.toggle("active");
  }

  const handleStrikeButtonClick = (event) =>
  {

    

    const diaryContainer = document.querySelector(".DiaryContainer");
    diaryContainer.focus();
    event.target.classList.toggle("active");
  }

  const handleFormatButtonsClick = (event) =>
  {
    const clickedButton = event.target.getAttribute("data-name");

    const selection = window.getSelection();
    

    
    if(selection.rangeCount > 0)
    {
      const range = selection.getRangeAt(0);

      const walker = document.createTreeWalker(range.commonAncestorContainer,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node)
          {
            const nodeRange = document.createRange();
            nodeRange.selectNodeContents(node);

            if (range.compareBoundaryPoints(Range.END_TO_START, nodeRange) < 0 &&
                range.compareBoundaryPoints(Range.START_TO_END, nodeRange) > 0) 
            {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      )
      let currentNode;
      const fragment = document.createDocumentFragment();
      while(currentNode = walker.nextNode())
      {
        const divElement = document.createElement("div");
        const boldElement = document.createElement("b");
        boldElement.textContent = currentNode.nodeValue;
        divElement.appendChild(boldElement)
        fragment.appendChild(divElement);
        console.log(currentNode.nodeValue);
      }
      range.deleteContents();
      range.insertNode(fragment);
    }




    const diaryContainer = document.querySelector(".DiaryContainer");
    diaryContainer.focus();
    event.target.classList.toggle("active");
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

        {/* <div className="EditingContainer">
          <h1 style={{color:"#00BCD4", fontFamily:"monospace", textAlign:"center"}}>Tools</h1>
          <div className="ToolContainer" style={{marginTop:"0px"}}>
            <button className="FormattingButtons" data-name="bold" style={{marginLeft:"20px"}} onClick={handleBoldButtonClick}>B</button>
            <button className="FormattingButtons" data-name="italic" onClick={handleItalicButtonClick}>I</button>
            <button className="FormattingButtons" data-name="underline" onClick={handleUnderlineButtonClick}>U</button>
            <button className="FormattingButtons" data-name="strikeThrough" style={{marginRight:"20px"}} onClick={handleStrikeButtonClick}>S</button>
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
            <GoListOrdered className="FormattingButtons" data-name="insertOrderedList" size={20} style={{marginLeft:"20px"}} onClick={handleFormatButtonsClick}/>
            <GoListUnordered className="FormattingButtons" data-name="insertUnorderedList" size={20} style={{marginRight:"20px"}} onClick={handleFormatButtonsClick}/>
          </div>

          <div className="ToolContainer">
            <CiTextAlignLeft className="FormattingButtons" data-name="justifyLeft" size={20} style={{marginLeft:"20px"}} onClick={handleFormatButtonsClick}/>
            <CiTextAlignCenter className="FormattingButtons" data-name="justifyCenter" size={20} onClick={handleFormatButtonsClick}/>
            <CiTextAlignRight className="FormattingButtons" data-name="justifyRight" size={20} style={{marginRight:"20px"}} onClick={handleFormatButtonsClick}/>
          </div>

          <div className="ToolContainer">
            <PiTextIndent className="FormattingButtons" size={20} style={{marginLeft:"20px"}}/>
            <PiTextOutdent className="FormattingButtons" size={20} style={{marginRight:"20px"}}/>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Diary;