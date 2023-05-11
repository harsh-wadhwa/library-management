import './App.css';
import { Homepage } from './Library';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { ModalProvider } from 'styled-react-modal'

function App() {
  return (
    <ThemeContextProvider>
      <ModalProvider>
        <Homepage />
      </ModalProvider>
    </ThemeContextProvider>
  )
}

export default App;
