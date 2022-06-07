import { FC } from "react";
import { FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
import styled from "styled-components";

const FormContainer = styled.div``;

type FormProps = {
    onSubmit: SubmitHandler<any>;
    methods: UseFormReturn<any>;
    children: React.ReactNode[];
};

const FormComponent : FC<FormProps> = ({ methods, onSubmit, children, }) => {

    return (
        <FormContainer>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    {children}
                </form>
            </FormProvider>
        </FormContainer>
    );
};

export default FormComponent;