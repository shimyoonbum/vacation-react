import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Button from './Button';

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(200px);
  }
`;

const DarkBackground = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);

    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${fadeIn};
    animation-fill-mode: forwards;

    ${(props) =>
        props.disappear &&
        css`
            animation-name: ${fadeOut};
        `}
`;

const DialogBlock = styled.div`
    width: 320px;
    padding: 1.5rem;
    background: white;
    border-radius: 2px;
    h3 {
        margin: 0;
        font-size: 1.5rem;
    }
    p {
        font-size: 1.125rem;
    }

    //지속시간
    animation-duration: 0.25s;
    //점점 빨라짐
    animation-timing-function: ease-out;
    animation-name: ${slideUp};
    //유지한다.
    animation-fill-mode: forwards;

    ${(props) =>
        props.disappear &&
        css`
            animation-name: ${slideDown};
        `}
`;

const ButtonGroup = styled.div`
    margin-top: 3rem;
    display: flex;
    justify-content: flex-end;
`;

function Dialog({
    title,
    children,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    visible,
}) {
    //modal 꺼지는 애니메이션
    const [animate, setAnimate] = useState(false);
    //true -> false일 때
    const [localVisible, setLocalVisible] = useState(visible);

    useEffect(() => {
        // visible 값이 true -> false 가 되는 시점만을 감지하기 위해 localVisible 추가함.
        if (localVisible && !visible) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 250);
        }
        //0.25초 후에 localVisible false로 변경
        setLocalVisible(visible);
    }, [localVisible, visible]);

    if (!animate && !localVisible) return null;

    return (
        <DarkBackground disappear={!visible}>
            <DialogBlock disappear={!visible}>
                <h3>{title}</h3>
                <p>{children}</p>
                <ButtonGroup>
                    <Button color="gray" onClick={onCancel}>
                        {cancelText}
                    </Button>
                    <Button color="pink" onClick={onConfirm}>
                        {confirmText}
                    </Button>
                </ButtonGroup>
            </DialogBlock>
        </DarkBackground>
    );
}

Dialog.defaultProps = {
    confirmText: '확인',
    cancelText: '취소',
};

export default Dialog;
