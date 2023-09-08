import React, { useCallback, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { io } from 'socket.io-client'
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
[{ header: [1, 2, 3, 4, 5, 6, false] }],
[{ font: [] }],
[{ list: "ordered" }, { list: "bullet" }],
["bold", "italic", "underline"],
[{ color: [] }, { background: [] }],
[{ script: "sub" }, { script: "super" }],
[{ align: [] }],
["image", "blackquote", "code-block"],
["clean"],
]

export default function TextEditor() {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const {name: documentName} = useParams();
    const server = "http://localhost:4000";
    const network_server = "http://192.168.21.93:4000";

    useEffect(() => {
      if (socket == null || quill == null) return

      socket.on("load-document", document => {
        quill.setContents(document);
        quill.enable(); //enable document only when document is loaded
      })

      socket.emit('get-document', documentName);
    }, [socket, quill, documentName]);

    useEffect(() => {
      if (socket == null || quill == null) return
      
      const interval = setInterval(() => {
        socket.emit('save-document', quill.getContents());
      }, SAVE_INTERVAL_MS)

      return() => {
        clearInterval(interval);
      }
    }, [socket, quill])

    useEffect(() => {
      const s = io(server);
      setSocket(s);
      return () => {
        s.disconnect();
      }
    }, [])

    // detecting changes whenever quill changes using quill's text-change event.
    useEffect(() => {
      if (socket === undefined || quill === undefined) return 
      const handler = (delta, oldDelta, source) => {
        if (source !== 'user') return 
        socket.emit('send-changes', delta);
      }
      quill.on('text-change', handler)
    
      return () => {
        quill.off('text-change', handler)
      }
    }, [socket, quill]);

    // Receive broadcasted changes.
    useEffect(() => {
      if (socket === undefined || quill === undefined) return 
      const handler = (delta) => {
        quill.updateContents(delta);          //update document with received delta/changes
      }
      socket.on('receive-changes', handler)
    
      return () => {
        socket.off('receive-changes', handler)
      }
    }, [socket, quill])
    
    
    const wrapperRef = useCallback((wrapper) => {
        if (wrapper === null) return

        wrapperRef.innerHTML = "";
        const editor = document.createElement('div');
        wrapper.append(editor)
        const q = new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS } })
        
        q.disable();
        q.setText('loading...')
        setQuill(q);

        return () => {
            wrapperRef.innerHTML = "";
        }
    }, [])
  return (
    <div id='container' className="container" ref={wrapperRef}>
    </div>
  )
}
