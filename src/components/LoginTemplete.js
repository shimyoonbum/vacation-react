import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Badge, InputGroup } from 'react-bootstrap';
import { BiUser } from 'react-icons/bi';
import { CgPassword } from 'react-icons/cg';

const TodoTemplateBlock = styled.div`
    position: absolute;
    height: 60%;
    width: 60%;
    top: 20%;
    left: 20%;
    right: 20%;

    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

    margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
`;

function LoginTemplete({ children }) {
    const onClick = (e) => {};

    return (
        <TodoTemplateBlock>
            <h1
                style={{
                    width: '80%',
                    marginLeft: '10%',
                    marginTop: '5%',
                    textAlign: 'center',
                }}
            >
                메타넷 글로벌 휴가관리
                <Badge variant="info">Ver 1.0</Badge>
            </h1>
            <Form style={{ width: '80%', marginLeft: '10%', marginTop: '3%' }}>
                <Form.Group>
                    <Form.Label>
                        <h3>아이디 입력</h3>
                    </Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <BiUser></BiUser>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        <h3>패스워드 입력</h3>
                    </Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <CgPassword></CgPassword>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                        />
                    </InputGroup>
                </Form.Group>
                <Button type="button" onClick={onClick}>
                    로그인
                </Button>
            </Form>
        </TodoTemplateBlock>
    );
}

export default LoginTemplete;
