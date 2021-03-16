import React, {useState} from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { Table, Button, Modal } from 'react-bootstrap';

const GlobalStyle = createGlobalStyle`
  body {
    margin : 100px 20px 20px;
    background : #dedede;
  }
`;

const Block = styled.div`
    padding : 30px 40px;
    margin : 10px;
    background : #fff;
    border-radius : 10px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.3);
`;

const ApplyPage = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <GlobalStyle />
            <Header /> 
            <Block>
                <h3>휴가 신청</h3>
                <hr/>

                <Table striped bordered hover style={{textAlign : 'center'}}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>회사명</th>
                            <th>직급</th>
                            <th>입사일자</th>
                            <th>상위자</th>
                            <th>남은 휴가일수</th>
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
                        </tr>
                    </tbody>
                </Table>

                <Button variant="secondary" onClick={handleShow}>신규 신청</Button>
            </Block> 
            <Block>
                <h3>휴가 신청 내역</h3>
                <hr/>

                <Table striped bordered hover style={{textAlign : 'center'}}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>회사명</th>
                            <th>직급</th>
                            <th>입사일자</th>
                            <th>상위자</th>
                            <th>남은 휴가일수</th>
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
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>mdo</td>
                            <td>qqe</td>
                            <td>15.0</td>
                        </tr>
                    </tbody>
                </Table>
            </Block>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>휴가 신규 신청</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ApplyPage;
