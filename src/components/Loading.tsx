import {FC} from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
`;

const Loading: FC = () => {
    return (
        <LoadingContainer>
            <CircularProgress />
        </LoadingContainer>
    );
};

export default Loading;