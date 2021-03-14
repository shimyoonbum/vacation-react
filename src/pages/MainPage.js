import React from 'react';
import Header from '../components/Header';
function MainPage({ children }) {
    console.log(children);
    return (
        <>
            <Header /> <div className="main">메인 페이지</div>
        </>
    );
}
export default MainPage;
