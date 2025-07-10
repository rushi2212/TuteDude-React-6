
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Display from './components/Display';
import CreateUser from './components/CreateUser';
import Edit from './components/Edit';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Display/>} />
      <Route path="/create" element={<CreateUser/>} />
      <Route path="/edit" element={<Edit/>} />
    </Routes>
  );
}

export default App;
