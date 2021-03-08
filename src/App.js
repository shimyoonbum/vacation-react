import './App.css';
import { createGlobalStyle } from 'styled-components';
import LoginTemplete from './components/LoginTemplete';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (    
    <>
      <GlobalStyle />
      <LoginTemplete />           
    </>
  );
}

export default App;
