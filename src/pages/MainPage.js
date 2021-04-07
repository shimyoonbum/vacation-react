import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import Header from '../components/Header';
import { BiUser, BiPhoneCall, BiSitemap, BiBuilding } from 'react-icons/bi';
import { BsCalendar, BsEnvelope } from 'react-icons/bs';
import { FaUmbrellaBeach, FaPlane, FaRegCalendarCheck } from 'react-icons/fa';
import { Accordion, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Button from '../components/Button';

const GlobalStyle = createGlobalStyle`
  body {
    margin : 100px 0px;
  }
`;

const Notice = styled.div`
    padding: 10px;
    background-color: #fafae0;
    border-left: 6px solid #7f7f84;
    box-shadow: 0 5px 8px -6px rgba(0, 0, 0, 0.2);
`;

const NoticeBlock = styled.div`
    padding: 5px;
`;

const HelloTitle = styled.div`
    text-align: center;
    font-size: 20px;
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

const Blank = styled.div`
    flex: 1;
`;

const Profile = styled.div`
    flex: 1;
    text-align: center;
    font-size: 25px;
`;

const ProfileButton = styled.div`
    flex: 1;
    text-align: end;
    width: 100px;    
`;

const MainPage = () => {
    const [empInfo, setEmpInfo] = useState({});
    const [auth, setAuth] = useState([]);

    const getUserInfo = () =>{
        var token = 'Bearer ' + window.sessionStorage.getItem('Authorization');
    
        fetch('/api/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization' : token
            }        
        })
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                window.alert('서버 오류입니다. 관리자에게 문의 바랍니다.');
            }
        })
        .then((res) => {  
            setAuth(res.authorities);
            setEmpInfo({
                empName: res.employee.empName,
                empCode: res.employee.empCode,
                empRank: res.employee.empRank,
                orgName: res.employee.organization.orgName,
                codeName: res.employee.organization.code.codeName,
                joinDate: res.employee.joinDate,
                phone: res.employee.phone,
                email: res.username,
                acqDaysNum: res.employee.vacation.acqDaysNum,
                useDaysNum: res.employee.vacation.useDaysNum,
                resDaysNum: res.employee.vacation.resDaysNum
            });                
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getUserInfo();
        return () => {};
    }, []);

    return (
        <>
            <GlobalStyle />
            <Header auth={auth}/>
            <div className="container">
                <h2>USERINFO</h2>
                <hr />
                <HelloTitle>
                    <p><strong>{empInfo.empName}</strong> 님 환영합니다!</p>
                </HelloTitle>

                <Accordion>
                    <Card>
                        <Card.Header>
                            <OverlayTrigger overlay={<Tooltip>클릭하여 프로필 정보 확인!</Tooltip>}>
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                                    <div style={{ display: 'flex'}}>
                                        <Blank/>
                                        <Profile>사원코드 : <strong>{empInfo.empCode}</strong></Profile>
                                        <ProfileButton>
                                            <Button color="black" outline>Profile</Button>
                                        </ProfileButton>
                                    </div>
                                </Accordion.Toggle>
                            </OverlayTrigger>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Notice>
                                    <NoticeBlock>
                                        <BiBuilding />&nbsp;직위 : {empInfo.empRank}
                                    </NoticeBlock>
                                    <NoticeBlock>
                                        <BiSitemap />&nbsp;조직 이름 : {empInfo.orgName}
                                    </NoticeBlock>
                                    <NoticeBlock>
                                        <BiUser />&nbsp;조직 구분 : {empInfo.codeName}
                                    </NoticeBlock>                                   
                                    <NoticeBlock>
                                        <BsCalendar />&nbsp;입사일 : {empInfo.joinDate}
                                    </NoticeBlock>
                                    <NoticeBlock>
                                        <BiPhoneCall />&nbsp;Phone : {empInfo.phone}
                                    </NoticeBlock>
                                    <NoticeBlock>
                                        <BsEnvelope />&nbsp;Email : {empInfo.email}
                                    </NoticeBlock>
                                </Notice>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

                <div className="row">
                    <br />
                    <div className="col text-center">
                        <h2>개인 휴가 정보</h2>
                        <p>발생일 수, 사용일 수, 잔여일 수 표시</p>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col">
                        <Counter>
                            <FaUmbrellaBeach className="icon"/>
                            <h2>{empInfo.acqDaysNum}</h2>
                            <CountText>휴가 발생일 수</CountText>
                        </Counter>
                    </div>
                    <div className="col">
                        <Counter>
                            <FaPlane className="icon"/>
                            <h2>{empInfo.useDaysNum}</h2>
                            <CountText>휴가 사용일 수</CountText>
                        </Counter>
                    </div>
                    <div className="col">
                        <Counter>
                            <FaRegCalendarCheck className="icon"/>
                            <h2>{empInfo.resDaysNum}</h2>
                            <CountText>휴가 잔여일 수</CountText>
                        </Counter>
                    </div>
                </div>
            </div>
        </>
    );
};
export default MainPage;
