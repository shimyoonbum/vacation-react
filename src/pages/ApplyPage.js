import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { Table, Modal, Container, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
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

const ApplyPage = () => {
    const [show, setShow] = useState(false);
    const [code, setCode] = useState('VK1');
    const [reason, setReason] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [countDate, setCountDate] = useState(new Date());

    const [dialog, setDialog] = useState(false);

    const [empInfo, setEmpInfo] = useState([]);

    //Dialog 오픈
    const onDialog = () => {
        setDialog(true);
    };

    //Dialog 확인 클릭
    const onConfirm = () => {
        setDialog(false);
    };

    //Dialog 취소 클릭
    const onCancel = () => {
        setDialog(false);
    };
    //휴가 등록 모달창 close
    const handleClose = () => {
        let json = {
            va_start_date: getFormatDate(startDate),
            va_end_date: getFormatDate(endDate),
            va_days_num: countDate,
            vk_code: code,
            va_reason: reason,
        };

        console.log(json);
        console.log(empInfo);
        setShow(false);
    };
    //휴가 등록 모달창 open
    const handleShow = () => setShow(true);

    const doApply = (e) => {
        e.preventDefault(); // submit이 action을 안타고 자기 할일을 그만함.

        let json = {
            va_start_date: startDate,
            va_end_date: endDate,
            va_days_num: countDate,
            vk_code: code,
            va_reason: reason,
        };

        console.log(json);

        if (countDate < 0.5) {
            window.alert('시작날짜가 종료일자보다 미래일 수 없습니다.');
            return;
        }
    };

    /**
     *  yyyyMMdd 포맷으로 반환
     */
    const getFormatDate = (date) => {
        var year = date.getFullYear(); //yyyy
        var month = 1 + date.getMonth(); //M
        month = month >= 10 ? month : '0' + month; //month 두자리로 저장
        var day = date.getDate(); //d
        day = day >= 10 ? day : '0' + day; //day 두자리로 저장
        return year + '' + month + '' + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
    };

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
            console.log(res.employee.register);            
            setEmpInfo([{
                empRank: res.employee.empRank,
                orgName: res.employee.organization.orgName,
                empUpper: res.employee.empUpper,
                joinDate: res.employee.joinDate,
                resDaysNum: res.employee.vacation.resDaysNum
            }]);   
        })
        .catch((error) => {
            console.error(error);
        });
    }    

    const calDate = () => {
        //휴가일수 계산
        var dateDiff = Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1,
        );
        // 사이에 낀 토,일 제외하기 위한 로직
        var weeks = Math.floor(dateDiff / 7);
        dateDiff = dateDiff - weeks * 2;
        //일요일 : 0, 토요일 : 6
        var startDay = startDate.getDay();
        var endDay = endDate.getDay();
        // 지난 토, 일 제거(목 ~ 월 인 경우)
        if (startDay - endDay > 1) dateDiff = dateDiff - 2;
        // 시작일 제거
        if (startDay === 0 && endDay !== 6) dateDiff = dateDiff - 1;
        // 종료일 제거
        if (endDay === 6 && startDay !== 0) dateDiff = dateDiff - 1;
        //일자 state에 반영
        setCountDate(parseInt(dateDiff));
    };

    useEffect(() => {
        calDate();
        return () => {};
    }, [startDate, endDate, countDate]);

    useEffect(() => {
        getUserInfo();
    }, []);  

    return (
        <Container>
            <GlobalStyle />
            <Header />
            <Block>
                <h3>휴가 신청</h3>
                <hr />

                <Table striped bordered hover style={{ textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>조직</th>
                            <th>직급</th>
                            <th>입사일자</th>
                            <th>상위자</th>
                            <th>남은 휴가일수</th>
                        </tr>
                    </thead>                    
                    <tbody>
                    {
                        empInfo.map((data, index)=>
                            <tr key={index}>
                                <td>1</td>
                                <td>{data.orgName}</td>
                                <td>{data.empRank}</td>
                                <td>{data.joinDate}</td>
                                <td>{data.empUpper}</td>
                                <td>{data.resDaysNum}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>

                <Button variant="secondary" onClick={handleShow}>
                    신규 신청
                </Button>
            </Block>
            <Block>
                <h3>휴가 신청 내역</h3>
                <hr />

                <Table striped bordered hover style={{ textAlign: 'center' }}>
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
                <Modal.Body>
                    <Form onSubmit={doApply}>
                        <Form.Group controlId="ControlSelect1">
                            <Form.Label>휴가 유형</Form.Label>
                            <Form.Control
                                defaultValue={code}
                                as="select"
                                onChange={(e) => setCode(e.target.value)}
                                custom
                            >
                                <option value="VK1">연차</option>
                                <option value="VK2">반차</option>
                                <option value="VK3">출산전후휴가</option>
                                <option value="VK4">출산휴가</option>
                                <option value="VK5">경조사</option>
                                <option value="VK6">보건휴가</option>
                                <option value="VK7">병가</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="ControlInput1">
                            <Form.Label>휴가 기간</Form.Label>
                            <div
                                style={{ display: 'flex', textAlign: 'center' }}
                            >
                                <div style={{ flex: 1, textAlign: 'start' }}>
                                    시작
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        style={{
                                            border: '1px solid #ced4da',
                                            borderRadius: '.25rem',
                                        }}
                                    />
                                </div>
                                <div style={{ flex: 1, textAlign: 'start' }}>
                                    종료
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        style={{
                                            border: '1px solid #ced4da',
                                            borderRadius: '.25rem',
                                        }}
                                    />
                                </div>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="ControlInput2">
                            <Form.Label>휴가 일수</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="일수"
                                value={countDate}
                                disabled
                            />
                        </Form.Group>

                        {/* <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>포함 공휴일</Form.Label>
                        <Form.Control type="text" placeholder="공휴일" disabled/>
                    </Form.Group> */}

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>휴가 사유</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        onClick={handleClose}
                    >
                        신청
                    </Button>
                </Modal.Footer>
            </Modal>

            <Dialog
                title="휴가 등록"
                confirmText="등록"
                cancelText="취소"
                onConfirm={onConfirm}
                onCancel={onCancel}
                visible={dialog}
            >
                휴가 등록 하시겠습니까?
            </Dialog>
        </Container>
    );
};
export default ApplyPage;
