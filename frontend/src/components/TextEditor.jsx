import { useEffect, useState } from 'react'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import "./TextEditor.css"

function TextEditor()
{
  const [content, setContent] = useState('');

  const handleContentChange = (value) => {
    setContent(value);
  };

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