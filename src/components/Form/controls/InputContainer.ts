import styled from "styled-components";

const InputContainer = styled.div`
    margin: 0.4rem 0 0.4rem 0;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    color: ${props => props.theme.palette.text.primary};
`;

export default InputContainer;