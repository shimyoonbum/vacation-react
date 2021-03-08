import './App.css';
import { createGlobalStyle } from 'styled-components';
import LoginTemplete from './components/LoginTemplete';
import { Container } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import Main from './pages/Main';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
    return (
        <>
            <GlobalStyle />
            <Container>
                <Route path="/" exact={true} component={LoginTemplete} />
                <Route path="/home" exact={true} component={Main} />
            </Container>
            <LoginTemplete />
        </>
    );
}

export default App;
