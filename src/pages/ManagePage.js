import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { Table, Modal, Container } from 'react-bootstrap';
import Button from '../components/Button';
import Dialog from '../components/Dialog';

const GlobalStyle = createGlobalStyle`
  body {
    margin : 100px 20px 20px;
    background : #dedede;
  }
`;

const Block = styled.div`
    padding: 30px 40px;
    margin: 10px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.3);
`;

const ManagePage = () => {
    const [show, setShow] = useState(false);
    const [teamInfo, setTeamInfo] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getManage = () =>{
        var token = 'Bearer ' + window.sessionStorage.getItem('Authorization');
    
        fetch('/manage/getMember', {
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
            setTeamInfo(res);    
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const check = () => {
        console.log(teamInfo);
    }
    useEffect(() => {
        getManage();
        return () => {};
    }, []);

    return (
        <Container>
            <GlobalStyle />
            <Header />
            <Block>
                <h3>팀원 정보</h3>
                <hr />

                <Table striped bordered hover style={{ textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>이름</th>
                            <th>부서</th>
                            <th>직급</th>
                            <th>발생 일수</th>
                            <th>사용 일수</th>
                            <th>잔여 일수</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>qqe</td>
                            <td>15.0</td>
                            <td>qqe</td>
                            <td>15.0</td>
                        </tr>
                    </tbody>
                </Table>
            </Block>
            <Block>
                <h3>휴가 승인 요청 내역</h3>
                <hr />

                <Table striped bordered hover style={{ textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>휴가신청일</th>
                            <th>이름</th>
                            <th>부서</th>
                            <th>직급</th>
                            <th>입사 일자</th>
                            <th>휴가기간</th>
                            <th>휴가사유</th>
                            <th>유형</th>
                            <th>상태</th>
                            <th>반려 사유</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>mdo</td>
                            <td>qqe</td>
                            <td>15.0</td>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>qqe</td>
                            <td>15.0</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>mdo</td>
                            <td>qqe</td>
                            <td>15.0</td>
                            <td>1</td>
                            <td>Mark</td>
                            <td>mdo</td>
                            <td>qqe</td>
                            <td>15.0</td>
                            <td><Button color="red" outline onClick={check}>반려</Button></td>
                        </tr>
                    </tbody>
                </Table>
            </Block>
        </Container>
    );
};
export default ManagePage;
