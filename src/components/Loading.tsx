import {FC} from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components'

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
`;

const LoadingRing = styled.div`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
`;

const loadingAnimation = keyframes`
    0% {
    transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const LoadingElement = styled.div`
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid ${props => props.theme.app.foreground};
    border-radius: 50%;
    animation: ${loadingAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${props => props.theme.app.foreground} transparent transparent transparent;
`;

const LoadingElement1 = styled(LoadingElement)`
    animation-delay: -0.45s;
`;

const LoadingElement2 = styled(LoadingElement)`
    animation-delay: -0.3s;
`;

const LoadingElement3 = styled(LoadingElement)`
    animation-delay: -0.15s;
`;

const Loading: FC = () => {
    return (
        <LoadingContainer>
            <LoadingRing>
                <LoadingElement1/>
                <LoadingElement2/>
                <LoadingElement3/>
            </LoadingRing>
        </LoadingContainer>
    );
};

export default Loading;