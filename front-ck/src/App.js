import './App.css';
import 'bootstrap';
import Rotas from './components/Rotas';
import NavBar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';

function App() {
  return (
    <BrowserRouter>
      <NavBar>
        <PrimeReactProvider>
          <Rotas></Rotas>
        </PrimeReactProvider>
      </NavBar>
    </BrowserRouter>
  );
}

export default App;
