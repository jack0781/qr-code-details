import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UserForm from './UserForm' // Your UserForm component
import Information from './Information' // Your Information component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/information" element={<Information />} />
      </Routes>
    </Router>
  )
}

// export default App;
ReactDOM.render(<App />, document.getElementById('root'))
