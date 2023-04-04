
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Register from './Components/Register';
import Form from './Components/Form';
import Edit from './Components/Edit';
import Details from './Components/Details';
import {BrowserRouter as Router,Switch,Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/edit/:id' element={<Edit/>}/>
          <Route path='/view/:id' element={<Details/>}/>
       </Routes>
       </Router>
    </div>
  );
}

export default App;
