import React from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import Header from '../components/Header';
import { BiUser, BiPhoneCall, BiSitemap, BiBuilding } from 'react-icons/bi';
import { BsBuilding, BsCalendar, BsEnvelope } from 'react-icons/bs';
import { FaUmbrellaBeach, FaPlane, FaRegCalendarCheck } from 'react-icons/fa';
import { Accordion, Card, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

const GlobalStyle = createGlobalStyle`
  body {
    margin : 100px 0px;
  }
`;

const Notice = styled.div`
    padding: 10px;
    background-color: #FAFAE0;
    border-left: 6px solid #7f7f84;
    box-shadow: 0 5px 8px -6px rgba(0, 0, 0, 0.2);
`;

const NoticeBlock = styled.div`
    padding: 5px;
`;

const HelloTitle = styled.div`
    text-align : center;
    font-size : 20px;
`;

const CountText = styled.p`
    font-size: 13px;
    font-weight: normal;
    margin-top: 10px;
    margin-bottom: 0;
    text-align: center;
`;

const Counter = styled.div`
    background-color: #faebeb;
    padding: 20px;
    border-radius: 5px;
`;

const MainPage = () => {
    return (
        <>
            <GlobalStyle />
            <Header />
            <div className="container">
                <h2>USERINFO</h2>
                <hr/>

                <HelloTitle>
                    <p><strong>심윤범</strong> 님 환영합니다!</p>
                </HelloTitle>

                <Accordion>
                    <Card>
                        <Card.Header style={{background: 'lightgoldenrodyellow', cursor: 'pointer'}}>
                            <OverlayTrigger
                                overlay={
                                    <Tooltip>클릭하여 프로필 정보 확인!</Tooltip>
                                }
                            >
                                <Accordion.Toggle
                                    as={Card.Header}
                                    variant="link"
                                    eventKey="0"
                                >
                                    <div style={{display : 'flex', margin: '10px auto'}}>
                                        <div style={{flex : 1}}>
                                        </div>
                                        <div style={{flex : 1, textAlign : 'center', fontSize : '25px'}}>                                            
                                        사원코드 : <strong>E00001</strong>
                                        </div>
                                        <div style={{flex : 1, textAlign : 'end', width: '100px'}}>
                                            <Button>Profile</Button>
                                        </div>
                                    </div>
                                </Accordion.Toggle>
                            </OverlayTrigger>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Notice>
                                    <NoticeBlock>
                                        <BiBuilding />
                                        &nbsp;직위 :
                                    </NoticeBlock>
                                    <NoticeBlock>
                                        <BiSitemap />
                                        &nbsp;조직 이름 :
                                    </NoticeBlock>
                                    <NoticeBlock>
                                        <BiUser />
                                        &nbsp;조직 구분 :
                                    </NoticeBlock>
                                    <NoticeBlock>
                                        <BsBuilding />
                                        &nbsp;상위 조직 :
                                    </NoticeBlock>
                                    <NoticeBlock>
                                        <BsCalendar />
                                        &nbsp;입사일 :
                                    </NoticeBlock>
                                    <NoticeBlock>
                                        <BiPhoneCall />
                                        &nbsp;Phone :
                                    </NoticeBlock>
                                    <NoticeBlock>
                                        <BsEnvelope />
                                        &nbsp;Email :
                                    </NoticeBlock>
                                </Notice>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

                <div className="row" style={{ marginTop: '30px' }}>
                    <br />
                    <div className="col text-center">
                        <h2>개인 휴가 정보</h2>
                        <p>발생일 수, 사용일 수, 잔여일 수 표시</p>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col">
                        <Counter>
                            <FaUmbrellaBeach style={{fontSize: '30px', color: 'aqua'}}/>
                            <h2>15</h2>
                            <CountText>휴가 발생일 수</CountText>
                        </Counter>
                    </div>
                    <div className="col">
                        <Counter>
                            <FaPlane style={{fontSize: '30px', color: 'aqua'}}/>
                            <h2>1</h2>
                            <CountText>휴가 사용일 수</CountText>
                        </Counter>
                    </div>
                    <div className="col">
                        <Counter>
                            <FaRegCalendarCheck style={{fontSize: '30px', color: 'aqua'}}/>
                            <h2>14</h2>
                            <CountText>휴가 잔여일 수</CountText>
                        </Counter>
                    </div>
                </div>
            </div>
        </>
    );
};
export default MainPage;
