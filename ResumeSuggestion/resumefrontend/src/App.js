import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Resume from './Components/Resumereact.js'
import './App.css';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Resume/>}/>
    </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
