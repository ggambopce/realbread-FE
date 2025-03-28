import { Routes, Route} from 'react-router-dom';
import './App.css'
import MapPage from './pages/MapPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {

  return (
    <Routes>
      <Route path="/" element={<MapPage />}/>
      <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  )
}

export default App
