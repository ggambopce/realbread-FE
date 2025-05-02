import { Routes, Route} from 'react-router-dom';
import './App.css'
import MapPage from './views/MapPage';
import NotFoundPage from './views/NotFoundPage';
import BakeryListPage from './views/BakeryListPage';

function App() {

  return (
    <Routes>
      <Route path="/" element={<MapPage />}/>
      <Route path="*" element={<NotFoundPage />}/>
      <Route path="/bakery" element={<BakeryListPage />}/>
    </Routes>
  )
}

export default App
