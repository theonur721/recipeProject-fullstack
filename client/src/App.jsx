import Home from './pages/Home';
import Detail from './pages/Detail';
import Create from './pages/Create';
import Undefined from './pages/Undefined';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';

const App = () => {
  return (
    <BrowserRouter>
    <div className='flex'>
      <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/tarif/:id" element={<Detail />} />

      <Route path="/ekle" element={<Create />} />
      <Route path='*' element={<Undefined />} />
    </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App