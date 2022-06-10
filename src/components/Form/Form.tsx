import { FC } from "react";
import { FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
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

type FormProps = {
    onSubmit: SubmitHandler<any>;
    methods: UseFormReturn<any>;
    children: React.ReactNode[];
};

const FormComponent : FC<FormProps> = ({ methods, onSubmit, children, }) => {

    return (
        <FormContainer>
            <Form>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        {children}
                    </form>
                </FormProvider>
            </Form>
        </FormContainer>
    );
};

export default FormComponent;