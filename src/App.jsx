import React from 'react'
import { Route, Routes} from 'react-router-dom'
import TextEditor from './Components/TextEditor/TextEditor'
import Home from './Home';

export default function App() {

  return (
    <Routes>
      <Route path='/documents/:name' element={<TextEditor />} />
      <Route path='/' element={<Home />}/>
    </Routes>
  )
}
