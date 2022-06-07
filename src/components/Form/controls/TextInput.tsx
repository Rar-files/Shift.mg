import { FC } from "react";
import { useFormContext, Controller, FieldValue, Control } from "react-hook-form";
import styled from "styled-components";
import {TextField} from "@material-ui/core";
import InputContainer from "./InputContainer";

const TxtInput = styled(TextField)``;

type Props = {
    name: string;
    label: string;
}

const TextInput: FC<Props> = ({name, label}) => {
    const { 
        control,
        formState: {errors}
    } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field: { ref, ...field } }) => (
                <InputContainer>
                    <TxtInput 
                        {...field}
                        label={label}
                        id={name}
                        autoComplete={name}
                        fullWidth
                        error={!!errors[name]}
                        helperText={errors[name]?.message}
                    />
                </InputContainer>
            )}
        />
    );
};

export default TextInput;