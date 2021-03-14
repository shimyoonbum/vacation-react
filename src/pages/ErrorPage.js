import React from 'react';
import styled from 'styled-components';
import img from '../resources/img/error.png';
import { Link } from 'react-router-dom';

const SignBlock = styled.div`
    position: absolute;
    width: 60%;
    left: 20%;
    right: 20%;
    text-align: center;
    align-items: center;
    justify-content: center;
    background: white;
`;

const BackLink = styled.div`
    font-size: 28px;
    margin-top: 30px;
`;

const ErrorPage = () => {
    return (
        <div>
            <SignBlock>
                <img src={img} alt="Metanet"></img>
                <BackLink>
                    <Link to="/main">Main</Link>
                </BackLink>
            </SignBlock>
        </div>
    );
};

export default ErrorPage;
