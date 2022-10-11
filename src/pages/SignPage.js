import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Badge, InputGroup } from 'react-bootstrap';
import { BiUser } from 'react-icons/bi';
import { CgPassword } from 'react-icons/cg';
import { createGlobalStyle } from 'styled-components';
import img from '../resources/img/main.jpg';
import Button from '../components/Button';

const GlobalStyle = createGlobalStyle`
  body {
    background-image : url(${img});
  }
`;

const SignBlock = styled.div`
    position: absolute;
    height: 80%;
    width: 50%;
    top: 10%;
    left: 20%;
    right: 20%;

    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

    margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
`;

const SignPage = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const onChange = (e) => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
            ...inputs, // 기존의 input 객체를 복사한 뒤
            [name]: value, // name 키를 가진 값을 value 로 설정
        });
    };

    const nameInput = useRef(); //객체 생성

    const { email, password } = inputs; // 비구조화 할당을 통해 값 추출

    const onReset = () => {
        nameInput.current.focus(); //객체 활용해 커서 초기화
    };

    const doLogin = (e) => {
        e.preventDefault(); // submit이 action을 안타고 자기 할일을 그만함.

        let param = {
            username: email,
            password: password,
        };

        if(param.username === ''){
            alert('계정을 입력해주세요.');
        }else if(param.password === ''){
            alert('비밀번호를 입력해주세요.');
        }else{
            fetch('/api/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(param),
            })
            .then(res => res.json())
            .then(res => {
                if(res.statusCode === 200){
                    window.alert('로그인 성공!');
                    window.sessionStorage.setItem('Authorization', res.data.token);
                    document.location.href = '/main';
                }else if(res.statusCode === 400){
                    alert(res.data);
                }else if(res.statusCode === 401){
                    alert(res.data);
                    onReset();
                }else{
                    alert('서버 에러입니다!');
                }
                
            })
            .catch((error) => {
                console.error(error);
            });
        }
    };

    return (
        <SignBlock>
            <GlobalStyle />
            <div>
                <h2 style={{ width: '80%',marginLeft: '10%',marginTop: '7%',textAlign: 'center'}}>
                    메타넷 글로벌 휴가관리
                </h2>
                <h5 style={{textAlign: 'center'}}>
                    <Badge variant="info">Ver 1.0</Badge>
                </h5>
            </div>

            <Form
                style={{ width: '80%', marginLeft: '10%', marginTop: '5%' }}
                onSubmit={doLogin}
            >
                <Form.Group
                    controlId="formBasicEmail"
                    style={{ width: '80%', margin: 'auto' }}
                >
                    <InputGroup
                        className="mb-3"
                        style={{ width: '80%', margin: 'auto' }}
                    >
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <BiUser></BiUser>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="회사 계정을 입력해 주세요."
                            onChange={onChange}
                            value={email}
                            ref={nameInput}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group
                    controlId="formBasicEmail"
                    style={{ width: '80%', margin: 'auto' }}
                >
                    <InputGroup
                        className="mb-3"
                        style={{ width: '80%', margin: 'auto' }}
                    >
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <CgPassword></CgPassword>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="비밀번호를 입력해주세요."
                            onChange={onChange}
                            value={password}
                        />
                    </InputGroup>
                </Form.Group>
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <Button type="submit" color="gray" outline halfWidth>
                        로그인
                    </Button>
                </div>
            </Form>
            <div style={{textAlign: 'center',fontSize: '23px',margin: '3px'}}>
                or
            </div>
            <div style={{width: '80%', marginLeft: '10%', marginTop: '1%', textAlign: 'center'}}>
                <Button type="submit" color="pink" outline halfWidth>
                    Forgot PassWord
                </Button>
            </div>
        </SignBlock>
    );
};

export default SignPage;
