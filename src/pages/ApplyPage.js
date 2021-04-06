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

const FormInput = styled.div`
    display: flex;
    text-align: center;
`;

const FormButton = styled.div`
    flex: 1; 
    text-align: start;
`;

const ApplyPage = () => {
    const [id, setId] = useState(null);
    const [check, setCheck] = useState('I');
    const [show, setShow] = useState(false);
    const [code, setCode] = useState('VK1');
    const [reason, setReason] = useState('');
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [countDate, setCountDate] = useState(new Date());

    // const [dialog, setDialog] = useState(false);

    const [empInfo, setEmpInfo] = useState([]);
    const [empReg, setEmpReg] = useState([]);

    // checked 된 것들
    const [checkItems, setCheckItems] = useState([]);

    // Dialog 오픈
    // const onDialog = () => {
    //     setDialog(true);
    // };

    // Dialog 확인 클릭
    // const onConfirm = () => {
    //     setDialog(false);
    // };

    // Dialog 취소 클릭
    // const onCancel = () => {
    //     setDialog(false);
    // };    

    const setHalfDate = (date) => {
        console.log(date);
        setCountDate(0.5);
        setDate(date);
    }

    //휴가 등록 모달창 close
    const handleClose = () => {
        clean(false);
    };
    //휴가 등록 모달창 open
    const handleShowModal = () => {
        clean(true);
    }
    //휴가 모달창 초기화 메소드.
    const clean = (show) => {
        setShow(show);
        setCode('VK1');
        setCheck('I');
        setReason('');
        setStartDate(new Date());
        setEndDate(new Date()); 
    }

    //휴가 수정 모달창 open
    const handleShow = (id) => {
        setCheck('U');

        let n = empReg.filter(reg => reg.id === id);        
        setId(id);            
        setCode(n[0].vkCode);    
        setReason(n[0].regReason);
        setStartDate(parse(n[0].regStartDate));
        setEndDate(parse(n[0].regEndDate));    

        setShow(true);
    }

    //휴가 신규 등록
    const doApply = (e) => {
        e.preventDefault(); // submit이 action을 안타고 자기 할일을 그만함.

        var token = 'Bearer ' + window.sessionStorage.getItem('Authorization');   
        let json = {};

        if(code === 'VK2'){
            json = {
                regStartDate: date,
                regEndDate: date,
                regNum: countDate,
                regReason: reason,
                code: code,
                empCode: empInfo[0].empCode
            }; 
        }else{
            json = {
                regStartDate: startDate,
                regEndDate: endDate,
                regNum: countDate,
                regReason: reason,
                code: code,
                empCode: empInfo[0].empCode
            };  
        }
        console.log(json);

        if (countDate < 0.5) {
            window.alert('시작날짜가 종료일자보다 미래일 수 없습니다.');
            return;
        }     

        fetch('/vacation/doApply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: token,
            },
            body: JSON.stringify(json),
        })
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                window.alert('서버 오류입니다. 관리자에게 문의 바랍니다.');
            }
        })
        .then((res) => {
            if(res.id > 0){
                alert('휴가 신청 되었습니다.');                
                setShow(false);
                getUserInfo();
            }
                                      
        })
        .catch((error) => {
            console.error(error);
        });        
    };

    //휴가 수정
    const doUpdate = (e) => {
        e.preventDefault(); // submit이 action을 안타고 자기 할일을 그만함.

        var token = 'Bearer ' + window.sessionStorage.getItem('Authorization');   

        let json = {
            regStartDate: startDate,
            regEndDate: endDate,
            regNum: countDate,
            regReason: reason,
            code: code,
            empCode: empInfo[0].empCode
        };            

        fetch(`/vacation/doUpdate/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: token,
            },
            body: JSON.stringify(json),
        })
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                window.alert('서버 오류입니다. 관리자에게 문의 바랍니다.');
            }
        })
        .then((res) => {
            if(res.result > 0){
                alert('휴가 수정 되었습니다.'); 
                setShow(false);                   
                getUserInfo();
            }else{
                alert('수정 실패하였습니다..'); 
            }                           
        })
        .catch((error) => {
            console.error(error);
        });

        if (countDate < 0.5) {
            window.alert('시작날짜가 종료일자보다 미래일 수 없습니다.');
            return;
        }
    };

    /**
     *  date 형으로 변환
     */
     const parse = (str) => {
        var date = str.split('-');
        var y = date[0];
        var m = date[1];
        var d = date[2];
        return new Date(y,m-1,d);
    }   

    /**
     *  yyyy-MM-dd 포맷으로 반환
     */
    const getFormatDate = (date) => {
        var year = date.getFullYear(); //yyyy
        var month = 1 + date.getMonth(); //M
        month = month >= 10 ? month : '0' + month; //month 두자리로 저장
        var day = date.getDate(); //d
        day = day >= 10 ? day : '0' + day; //day 두자리로 저장
        return year + '-' + month + '-' + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
    };

    const getUserInfo = () => {

        if(window.sessionStorage.getItem('Authorization') == null)
            document.location.href = '/';

        var token = 'Bearer ' + window.sessionStorage.getItem('Authorization');

        fetch('/api/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: token,
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else if(res.status === 401){
                    window.alert('로그인이 필요합니다.');
                    document.location.href = '/';
                } else {
                    window.alert('서버 오류입니다. 관리자에게 문의 바랍니다.');
                }
            })
            .then((res) => {
                var emp = res.employee.register;
                for (let i = 0; i < emp.length; i++) {
                    emp[i].vkCodeName = emp[i].vkCode.codeName;         //휴가 이름              
                    emp[i].vkCodeValue = emp[i].vkCode.codeValue;       //휴가 값(0.5 혹은 1)             
                    emp[i].vkCode = emp[i].vkCode.code;                 //휴가 유형 코드

                    switch (emp[i].vsCode) {
                        case 'VS1':
                            emp[i].vsCodeName = '대기';
                            break;
                        case 'VS2':
                            emp[i].vsCodeName = '승인';
                            break;
                        case 'VS3':
                            emp[i].vsCodeName = '반려';
                            break;
                        default:
                            break;
                    }
                }

                setEmpInfo([
                    {
                        empCode: res.employee.empCode,
                        empRank: res.employee.empRank,
                        orgName: res.employee.organization.orgName,
                        empUpper: res.employee.empUpper.empName,
                        joinDate: res.employee.joinDate,
                        resDaysNum: res.employee.vacation.resDaysNum,
                    },
                ]);
                console.log(res.employee.register);
                setEmpReg(res.employee.register);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const calDate = () => {
        //반차는 0.5일로 무조건 계산한다.
        if(code === 'VK2'){
            setCountDate(0.5);
        }else{
            //휴가 Time으로 미리 계산(만의 자리 내림으로 버그 해결)
            var time = Math.round((endDate.getTime() - startDate.getTime())/10000)*10000;

            //휴가일수 계산
            var dateDiff = Math.ceil(time / (1000 * 3600 * 24) + 1);

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
        }        
    };

    // 개별선택
    function checkHandler(checked, id, code) {
        if(code === 'VS2' || code === 'VS3')
            return;

        if (checked) {
            setCheckItems([...checkItems, id]);
        } else {
            // 체크해제
            setCheckItems(checkItems.filter((data) => data !== id));
        }
    }

    // 전체선택
    function checkAllHandler(checked) {
        if (checked) {
            const ids = [];
            const items = empReg.filter(data => data.vsCode === 'VS1');      
            items.forEach((data) => ids.push(data.id));
            setCheckItems(ids);
        } else {
            setCheckItems([]);
        }
    }

    // 일괄 삭제
    const handleCheckedAllDelete = () => {
        if (checkItems.length < 1)
            alert('일괄 삭제할 항목이 존재하지 않습니다!');
        else {
            var token = 'Bearer ' + window.sessionStorage.getItem('Authorization');
            let items = {
                ids: checkItems,
                code: empInfo[0].empCode,
            };

            fetch('/vacation/deleteReg', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    Authorization: token,
                },
                body: JSON.stringify(items),
            })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    window.alert('서버 오류입니다. 관리자에게 문의 바랍니다.');
                }
            })
            .then((res) => {
                if(res.result > 0){
                    alert('일괄 삭제 처리 하였습니다.');                    
                    getUserInfo();
                }
                else
                    alert('삭제에 실패하였습니다..');                    
            })
            .catch((error) => {
                console.error(error);
            });
        }
    };

    // 개별 삭제
    const handleCheckedDelete = (id) => {
        var token = 'Bearer ' + window.sessionStorage.getItem('Authorization');

        fetch(`/vacation/deleteReg/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: token,
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
            console.log(res);

            if(res > 0){
                alert('삭제 처리 하였습니다.');                    
                getUserInfo();
            }
            else
                alert('삭제에 실패하였습니다..');                    
        })
        .catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        calDate();
        return () => {};
    }, [code, date, startDate, endDate, countDate]);

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
                            <th>조직</th>
                            <th>직급</th>
                            <th>입사일자</th>
                            <th>상위자</th>
                            <th>남은 휴가일수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empInfo.map((data, index) => (
                            <tr key={index}>
                                <td>{data.orgName}</td>
                                <td>{data.empRank}</td>
                                <td>{data.joinDate}</td>
                                <td>{data.empUpper}</td>
                                <td>{data.resDaysNum}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div style={{ textAlign: 'end' }}>
                    <Button color="black" outline onClick={handleShowModal}>신규 신청</Button>
                </div>
            </Block>
            <Block>
                <h3>휴가 신청 내역</h3>
                <hr />
                <div style={{ textAlign: 'end', marginBottom: '10px' }}>
                    <Button color="black" outline onClick={handleCheckedAllDelete}>일괄 삭제</Button>
                </div>

                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>
                                <Form.Check type={'checkbox'} onChange={(e) =>
                                        checkAllHandler(e.target.checked)
                                    }
                                ></Form.Check>
                            </th>
                            <th>휴가유형</th>
                            <th>휴가기간</th>
                            <th>상태</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        empReg.length === 0
                        ? <tr><td colSpan = '5'>데이터 없음.</td></tr>
                        :
                        empReg.map((data) => (
                            <tr key={data.id}>
                                {
                                    data.vsCode === 'VS1'
                                    ?
                                    <td>
                                        <Form.Check type={'checkbox'} onChange={(e) =>
                                                checkHandler(e.target.checked, data.id, data.vsCode)
                                            }
                                            checked={checkItems.indexOf(data.id) >= 0 ? true : false}
                                        ></Form.Check>
                                    </td>
                                    :
                                    <td>
                                        <Form.Check type={'checkbox'} onChange={(e) =>
                                                checkHandler(e.target.checked, data.id, data.vsCode)
                                            }
                                            checked={checkItems.indexOf(data.id) >= 0 ? true : false}
                                            disabled
                                        ></Form.Check>
                                    </td>
                                }
                                
                                <td>{data.vkCodeName}</td>
                                <td>{data.regStartDate} ~ {data.regEndDate}</td>
                                <td>{data.vsCodeName}</td>
                                
                                {
                                    (data.vsCode === 'VS2' || data.vsCode === 'VS3')
                                    ? <td><Button color="blue" outline disabled>수정불가</Button>
                                    <Button color="red" outline disabled>삭제불가</Button></td>
                                    : <td><Button color="blue" outline onClick={() =>handleShow(data.id)}>수정</Button>
                                    <Button color="red" outline onClick={() => handleCheckedDelete(data.id)}>삭제</Button></td>
                                }  
                            </tr>
                        ))}
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

                        {
                            code === 'VK2' 
                            ?
                            <Form.Group controlId="ControlInput1">
                                <Form.Label>휴가 기간</Form.Label>
                                <FormInput>
                                    <FormButton>일자<DatePicker selected={date} onChange={(d) => setHalfDate(d)} className="datepicker"/>
                                    </FormButton>
                                </FormInput>
                            </Form.Group>
                            :
                            <Form.Group controlId="ControlInput1">
                                <Form.Label>휴가 기간</Form.Label>
                                <FormInput>
                                    <FormButton>시작<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="datepicker"/>
                                    </FormButton>
                                    <FormButton>종료<DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className="datepicker"/>
                                    </FormButton>
                                </FormInput>
                            </Form.Group>
                        }                       

                        <Form.Group controlId="ControlInput2">
                            <Form.Label>휴가 일수</Form.Label>
                            <Form.Control type="text" placeholder="일수" value={countDate} disabled/>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>휴가 사유</Form.Label>
                            <Form.Control as="textarea" rows={3} value={reason} onChange={(e) => setReason(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>취소</Button>
                    {
                        check === 'I' 
                        ? <Button type="submit" variant="primary" onClick={doApply}>신청</Button> 
                        : <Button type="submit" variant="primary" onClick={doUpdate}>수정</Button>
                    }
                    
                </Modal.Footer>
            </Modal>

            {/* <Dialog title="휴가 등록" confirmText="등록" cancelText="취소"
            onConfirm={onConfirm} onCancel={onCancel} visible={dialog}>
                휴가 등록 하시겠습니까?
            </Dialog> */}
        </Container>
    );
};
export default ApplyPage;
