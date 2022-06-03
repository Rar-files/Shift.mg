import { FC } from "react";
import { useFormContext, Controller, FieldValue, Control } from "react-hook-form";
import styled from "styled-components";
import {TextField} from "@material-ui/core";

const TXTInput = styled(TextField)``;

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
                <TXTInput 
                    {...field}
                    label={label}
                    id={name}
                    autoComplete={name}
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
            )}
        />
    );
};

export default TextInput;