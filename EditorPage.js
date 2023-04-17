import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import ToggleBlock from 'editorjs-toggle-block';
import Alert from 'editorjs-alert';

const SimpleImage = require('@editorjs/simple-image');
const Checklist = require('@editorjs/checklist');
const Quote = require('@editorjs/quote');
const CodeTool = require('@editorjs/code');
const Header = require('editorjs-header-with-anchor');
const RawTool = require('@editorjs/raw');
// const Table = require('editorjs-table');
const Paragraph = require('@editorjs/paragraph'); 

const changeToReadOnly = (event)=>{  
  editor.readOnly.toggle();  
  if(editor.readOnly.isEnabled===true){document.getElementById('editSaveButton').innerText = 'Edit';console.log('Edit');}
  else {document.getElementById('editSaveButton').innerText = 'Save';console.log('SAve');}
}

const onSaveData=()=>{
  editor.save().then((outputData) => {
    console.log('Article data: ', outputData)
  }).catch((error) => {
    console.log('Saving failed: ', error)
  });
}


// const handlePost = async () => {
  
//   const savedData = await editorInstance.save();
//   const postData = {
//     content: savedData,
//     // any additional data you want to include with the post request
//   };
//   try {
//     const response = await fetch('/new', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(postData),
//     });
//     const responseData = await response.json();
//     // handle the response data as needed
//   } catch (error) {
//     // handle any errors that occur during the fetch request
//   }
// };

let editor = {isReady:false};
const EditorPage = (props)=>{
  
    if(!editor.isReady)
    { editor = new EditorJS(
        {
            holder: 'editorjs',
            // autofocus:true,
            onReady: () => {
                console.log('Editor.js is ready to work!')
             },
             placeholder: 'Let`s write an awesome story!',             
             tools: { 
              header: Header, 
              paragraph: {
                class: Paragraph,
                inlineToolbar: true,
              },
              list: List ,              
              image: SimpleImage,
              embed: {
                class: Embed,
                config: {
                  services: {
                    youtube: true,
                    coub: true
                  }
                }
              },
              toggle: {
                class: ToggleBlock,
                inlineToolbar: true,
              },
              checklist: {
                class: Checklist,
                inlineToolbar: true,
              },
              quote: Quote,
              code: CodeTool,
              raw: RawTool,
              alert: {
                class: Alert,
                inlineToolbar: true,
                shortcut: 'CMD+SHIFT+A',
                config: {
                  defaultType: 'primary',
                  messagePlaceholder: 'Enter something',
                },
              },
              // table: {
              //   class: Table,
              //   inlineToolbar: true,
              //   config: {
              //     rows: 2,
              //     cols: 3,
              //   },
              // },
              
              
            }, defaultBlock:'header',
            // data:    
            //  editor.readOnly.toggle();

            // onChange: (api, event) => {
            //     console.log('Now I know that Editor\'s content changed!', event.details.target)
            //   }
        }
    );}

    return (
        <div>
                <h1>My Editor</h1>
                <button id='editSaveButton'onClick={changeToReadOnly}>Save</button>
            <div className="content"> 
            <div id="editorjs"></div>
            </div>
            
            <button onClick={onSaveData}>Post </button>
        </div>
    )
}


  
  export default EditorPage;


