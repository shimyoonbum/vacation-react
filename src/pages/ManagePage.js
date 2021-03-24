import React, { useState } from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { Table, Button, Modal, Container } from 'react-bootstrap';

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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                            <th>입사 일자</th>
                            <th>발생 일수</th>
                            <th>사용 일수</th>
                            <th>잔여 일수</th>
                            <th>상위자</th>
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
                            <td>qqe</td>
                            <td>15.0</td>
                            <td>ㄴㅇㅎ</td>
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
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </Block>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>휴가 신규 신청</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you're reading this text in a modal!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};
export default ManagePage;
