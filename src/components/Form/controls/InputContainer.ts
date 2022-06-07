import styled from "styled-components";

const InputContainer = styled.div`
    margin: 0 0 0.2rem 0.6rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    color: ${props => props.theme.palette.text.primary};
`;

export default InputContainer;