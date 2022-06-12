import styled from "styled-components";

const FormContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Form = styled.div`
    width: 50%;
    border-radius: 2%;
    padding: 1.6rem 3rem;
    background-color: ${props => props.theme.palette.background.paper};
`;

export {FormContainer, Form};
