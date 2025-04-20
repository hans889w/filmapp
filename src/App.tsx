
import { Routes, Route } from 'react-router-dom';
import Home from './Home';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Home" element={<Home />} />
      <Route path="/about" element={<div>Hakkında Sayfası</div>} />
      <Route path="/contact" element={<div>İletişim Sayfası</div>} />
    </Routes>
  );
};
export default App