import React from 'react';
import Header from '../components/Header';
import '../resources/css/userinfo.css';

function MainPage({ children }) {
    console.log(children);
    return (
        <>
            <Header /> 
            <div class="container" style={{marginTop: '30px'}}>
                <div class="card">
                    <div class="section-container">
                        <section class="about-area" id="about">
                            <h1 class="entry-title">
                                <span>USERINFO</span>
                            </h1>
                            <div class="picture">						
                                <div class="name"><p>님
                                        환영합니다.</p>
                                </div>
                                <div class="description">사원코드 : </div>
                            </div>
                            <div class="text">
                                <div class="notice notice-info">
                                    <ul>
                                        <li>
                                            <div class="info">
                                                <i class="far fa-building"></i> 직위 : 
                                                
                                            </div>
                                        </li>
                                        <li>
                                            <div class="info">
                                                <i class="fas fa-sitemap"></i> 조직 이름 : 
                                            </div>
                                        </li>
                                        <li>
                                            <div class="info">
                                                <i class="fas fa-sitemap"></i> 조직 구분 : 
                                            </div>
                                        </li>
                                        <li>
                                            <div class="info">
                                                <i class="fas fa-sitemap"></i>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="notice notice-info">
                                    <ul>
                                        <li>
                                            <div class="info">
                                                <i class="far fa-calendar-alt"></i> 입사일 : 
                                            </div>
                                        </li>
                                        <li>
                                            <div class="info">
                                                <i class="fas fa-phone"></i> 
                                            </div>
                                        </li>
                                        <li>
                                            <div class="info">
                                                <i class="fas fa-envelope"></i> 
                                            </div>
                                        </li>
                                        <li>
                                            <div class="info">
                                                <i class="fas fa-home"></i> 102, Bongeunsa-ro, Gangnam-gu,
                                                Seoul, Republic of Korea
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                            </div>

                        </section>
                        <div >
                            <div class="row">
                                <br />
                                <div class="col text-center">
                                    <h2>개인 휴가 정보</h2>
                                    <p>발생일 수, 사용일 수, 잔여일 수 표시</p>
                                </div>
                            </div>
                            <div class="row text-center">
                                <div class="col">
                                    <div class="counter">
                                        <i class="fas fa-umbrella-beach fa-2x"></i>
                                        <h2></h2>
                                        <p class="count-text ">휴가 발생일 수</p>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="counter">
                                        <i class="fas fa-plane fa-2x"></i>
                                        <h2></h2>
                                        <p class="count-text ">휴가 사용일 수</p>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="counter">
                                        <i class="far fa-sad-tear fa-2x"></i>
                                        <h2></h2>
                                        <p class="count-text ">휴가 잔여일 수</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
		    </div>
        </>
    );
}
export default MainPage;
