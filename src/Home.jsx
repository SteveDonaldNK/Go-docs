import React from 'react'
import { useState } from 'react'
import { Zoom } from 'react-reveal'
import './index.css'
import logo from './logo.png'
import { TypeAnimation } from 'react-type-animation';

export default function Home() {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState('');

  function handleOpen() {
    setOpen(!open);
  }

  function handleClose(e) {
    const layer = document.querySelector('.modal-layer');
    if (e.target === layer) {
      setOpen(!open);
      setFileName('');  
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    window.location.href = `/documents/${fileName}`;
  }

  function Animated() {
  const [typingStatus, setTypingStatus] = useState('Initializing');

  return (
      <TypeAnimation
      sequence={[
        200,
      () => {
        setTypingStatus('Typing...');
      },
      'GO-DOCS',
      () => {
       setTypingStatus('Done Typing');
      },
      3000,
      () => {
        setTypingStatus('Deleting...');
      },
      '',
      () => {
        setTypingStatus('Done Deleting');
      },
      ]}
      wrapper="span"
      speed={300}
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: '3.5rem' }}
    />
    )
  }

  return (
  <>
    <div className="homeContainer relative w-screen h-screen z-0">
      <div className="wave layer1">
        <img className='logo absolute z-20' src={logo} alt="" />
        <button id='recent' className="top-btn transition duration-500 absolute right-4 z-10 border-2 border-secondary text-secondary px-5 py-1 rounded-lg">Continue <i class="fas fa-chevron-down ml-2"></i></button>
      </div>
      <div className="wave layer2">

      </div>
      
      <div className="home flex flex-row justify-center items-center">
        <div className="text">
          <h1 className='text-gray'>Save time With <br /><Animated /></h1>
          <p className='text-gray text-base'>Create a new document using GO-DOCS or import and existing document from your files, make video calls with your group and edit the same document at the same time!</p>
          <div className="stack">
            <button onClick={handleOpen} className="btn transition ease-in-out duration-500 rounded-full px-5 py-2 text-secondary ">New Document</button>
          </div>
        </div>
        <div className="banner">

        </div>
      </div>
    </div>

    
    {
      open ? 
      <>
        <div onClick={handleClose} className='modal-layer flex justify-center items-center h-screen w-screen bg-secondary backdrop-blur-md absolute top-0 z-50'>
          <Zoom duration={200}>
            <div className="modal-container bg-secondary shadow-lg rounded-lg flex flex-col text-center">
              <form onSubmit={handleSubmit}>
                <h1 className='text-gray modal-heading text-xl font-semibold'>Enter the name of the file</h1>
                <p className='text-graylight'>(forbiden characters: {"\"< > / ( ) ...\""} )</p>
                <label htmlFor="name" className='text-gray float-left  mt-3 mb-2'>File Name <span className='text-primary'>*</span></label>
                <input value={fileName} onChange={(e) => setFileName(e.target.value)} required id='name' className='modal-input border-2 border-graylighter bg-graylighter rounded-md w-full focus:outline-none focus:border-primary focus:bg-secondary' type="text"  />
                <button type='submit' name='fileName' className="modal-btn hover:bg-blueColor transition duraion-500 font-bold hover:border-blueColor ease-in-out bg-primary w-full rounded-md mt-2 border-2 border-primary text-secondary">Create Document</button>
              </form>
            </div>
          </Zoom>
        </div>
      </>
      : null
    }
  </>
  )
}
