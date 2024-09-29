import { memo, useContext, useEffect, useRef, useState } from 'react'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import "./TextEditor.css"
import { GlobalStateContext } from '../GlobalState';
import { toast } from 'react-toastify';

function TextEditor()
{
  const modules = {
    toolbar: [
      [{ 'font': [] }, { 'size': [] }],
  
      [{ 'header': [1, 2, 3, 4, 5, 6] }, { 'header': false }],
  
      ['bold', 'italic', 'underline', 'strike'],
  
      [{ 'color': [] }, { 'background': [] }],
  
      [{ 'align': [] }, { 'indent': '-1' }, { 'indent': '+1' }],
  
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ]
  };
  
  const formats = [
    'font', 'size', 'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'align', 'list', 'indent'
  ];

  const {username, content, setContent, currentDate} = useContext(GlobalStateContext);
  const saveButtonRef = useRef(null);
  const deleteButtonRef = useRef(null);
  
  const handleContentChange = (value) => {
    setContent(value);
  };

  useEffect(() =>
  {

    const handleSaveButtonClick = async () =>
    {
      toast.success("Saved!");
      currentDate.setHours(0, 0, 0, 0);
      const memory = {
        content : content,
        createdAt : currentDate
      }
      const response = await fetch(`http://localhost:5000/api/memories/${username}/${currentDate}`, 
        {
          method: "GET"
        }
      );

      const res = await response.json();
      if(res.code === "MNF")
      {
        const response = await fetch(`http://localhost:5000/api/memories/${username}`, 
          {
            method: "POST",
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify(memory)
          }
        )
        const res = await response.json();
        console.log(res.msg);
      }
      else
      {
        const response = await fetch(`http://localhost:5000/api/memories/${username}/${currentDate}`, 
          {
            method:"PUT",
            headers: {"Content-type" : "application/json"},
            body : JSON.stringify(memory)
          }
        )
        const res = await response.json();
        console.log(res.msg);
      }
    };

    const handleDeleteButtonClick = async () =>
    {
      toast.success("Deleted!");
      currentDate.setHours(0, 0, 0, 0);
      const response = await fetch(`http://localhost:5000/api/memories/${username}/${currentDate}`, 
        {
          method: "DELETE"
        }
      )
      const res = await response.json();
      if(res.code === "MD")
      {
        console.log(res.msg);
        setContent("");
      }
    };

    saveButtonRef.current?.addEventListener("click", handleSaveButtonClick);
    deleteButtonRef.current?.addEventListener("click", handleDeleteButtonClick);

    return () =>
    {
      saveButtonRef.current?.removeEventListener("click", handleSaveButtonClick);
      deleteButtonRef.current?.removeEventListener("click", handleDeleteButtonClick);
    }
  }, [content, currentDate]);

  useEffect(() => {
    const container = document.querySelector(".ql-toolbar");
    if (!container.querySelector('.tools-header')) {
      const tooltag = document.createElement('span');
      tooltag.textContent = "Tools";
      tooltag.style.color = "#4A90E2"
      tooltag.style.fontFamily = "monospace"
      tooltag.classList.add('tools-header'); 
      tooltag.style.marginTop = "17.42px";
      tooltag.style.fontWeight = "bold"
      tooltag.style.fontSize = "2em";
      container.prepend(tooltag);

      const divContainer = document.createElement("div");
      const saveButton = document.createElement("button");
      const deleteButton = document.createElement("button");

      divContainer.classList.add("buttonContainer")
      saveButton.textContent = "Save";
      deleteButton.textContent = "Delete"
      saveButton.classList.add("savebuttonStyle");
      deleteButton.classList.add("deletebuttonStyle");
      
      saveButtonRef.current = saveButton;
      deleteButtonRef.current = deleteButton;

      divContainer.appendChild(saveButton);
      divContainer.appendChild(deleteButton);
      container.appendChild(divContainer);
    }
  }, []);
  

  return (
    <div className="editor-container">
      <ReactQuill 
        value={content}
        onChange={handleContentChange}
        theme="snow" 
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

export default TextEditor;