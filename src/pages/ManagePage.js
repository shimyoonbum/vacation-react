import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { Table, InputGroup, FormControl } from 'react-bootstrap';
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
    const [teamInfo, setTeamInfo] = useState([]);
    const [vacation, setVacation] = useState([]);
    const [auth, setAuth] = useState([]);

    const [dialog, setDialog] = useState(false);
    const [id, setId] = useState('');
    const [reason, setReason] = useState('');

    const changeValue = (e) => {
        setReason(e.target.value);
    };

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
            // let manage = res.filter(reg => reg.empCode !== 'E0011');
            let manage = res.emp.slice(1, res.length);  //기존 배열 유지하고 첫번째요소만 삭제
            let list = [];

            manage.map(data => {
                let vac = data.register;
                vac.map(c => {
                    delete data.register 
                    list = [...list, Object.assign(c, data)];
                })                               
            })           
            setAuth(res.authorities);
            setVacation(list.filter(l => l.vsCode === 'VS1'));
            setTeamInfo(res.emp);    
        })
        .catch((error) => {
            console.error(error);
        });
    }

    //Dialog 오픈
    const onDialog = (id) => {
        setId(id);
        setDialog(true);
    };

    //Dialog 반려 클릭
    const onConfirm = () => {
        setDialog(false);
        reject();
    };

    //Dialog 취소 클릭
    const onCancel = () => {
        setDialog(false);
        setId('');
        setReason(''); 
    };

    const approve = (code, empCode, num, id) => {
        let apr = {};

        if(code === 'VK1'||code === 'VK2'){
            apr = {
                empCode : empCode,
                regNum : num,
                reason : '',
                vsCode : 'VS2'
            }
        }else{
            apr = {
                empCode : empCode,
                regNum : 0,
                reason : '',
                vsCode : 'VS2'
            }
        }

        doUpdate(id, apr);
    }

    const reject = () => {
        let apr = {
            reason : reason,
            vsCode : 'VS3'
        }

        doUpdate(id, apr);
    }

    const doUpdate = (id, apr) =>{
        var token = 'Bearer ' + window.sessionStorage.getItem('Authorization');
    
        fetch(`/manage/doUpdate/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization' : token
            },
            body: JSON.stringify(apr)   
        })
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else if(res.status === 400) {
                alert('사용가능한 휴가 일수를 초과하였습니다.');
                return res.json();
            } else {
                alert('서버 오류입니다. 관리자에게 문의 바랍니다.');
            }
        })
        .then((res) => {
            if(res.result > 0){
                alert('휴가 처리 하였습니다.');
                getManage();
            }  
            setId('');
            setReason('');            
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    useEffect(() => {
        getManage();
        return () => {};
    }, []);

    return (
        <>
            <GlobalStyle />
            <Header auth={auth}/>
            <Block>
                <h3>팀원(승인 요청자) 정보</h3>
                <hr/>

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
                    {teamInfo.map((data, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{data.empName}</td>
                            <td>{data.organization.orgName}</td>
                            <td>{data.empRank}</td>
                            <td>{data.vacation.acqDaysNum}</td>
                            <td>{data.vacation.useDaysNum}</td>
                            <td>{data.vacation.resDaysNum}</td>
                        </tr>
                    ))}
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
                            <th>휴가신청일시</th>
                            <th>이름</th>
                            <th>휴가기간</th>
                            <th>휴가일수</th>
                            <th>휴가사유</th>
                            <th>유형</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    vacation.length === 0
                    ? <tr><td colSpan = '8'>데이터 없음.</td></tr>
                    :
                    vacation.map((data, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{data.regDate}</td>
                            <td>{data.empName}</td>
                            <td>{data.regStartDate} ~ {data.regEndDate}</td>
                            <td>{data.regNum}</td>
                            <td>{data.regReason}</td>
                            <td>{data.vkCode.codeName}</td>
                            <td>
                                <Button color="blue" outline onClick={()=>approve(data.vkCode.code, data.empCode, data.regNum, data.id)}>승인</Button>
                                <Button color="red" outline onClick={()=>onDialog(data.id)}>반려</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Block>

            <Dialog title="휴가 반려" confirmText="반려" cancelText="취소"
            onConfirm={onConfirm} onCancel={onCancel} visible={dialog}>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-sm">사유</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl type="text"
                        placeholder="거절 사유 입력"
                        onChange={changeValue}
                        name="author"
                        value={reason}
                        />
                </InputGroup>
            </Dialog>
        </>
    );
};
export default ManagePage;
