import { FC } from "react";
import { useFormContext, Controller, FieldValue, Control } from "react-hook-form";
import styled from "styled-components";
import {TextField} from "@material-ui/core";
import InputContainer from "./InputContainer";

const TxtInput = styled(TextField)``;

type Props = {
    name: string;
    label: string;
    multiline?: boolean;
    disabled?: boolean;
}

const TextInput: FC<Props> = (props) => {
    const {
        control,
        formState: {errors}
    } = useFormContext();

    return (
        <Controller
            name={props.name}
            control={control}
            defaultValue=""
            render={({ field: { ref, ...field } }) => (
                <InputContainer>
                    {props.multiline
                        ? <TxtInput
                            {...field}
                            label={props.label}
                            id={props.name}
                            autoComplete={props.name}
                            fullWidth
                            multiline
                            variant="filled"
                            minRows={4}
                            disabled={props.disabled}
                            error={!!errors[props.name]}
                            helperText={errors[props.name]?.message}
                        />
                        : <TxtInput
                            {...field}
                            label={props.label}
                            id={props.name}
                            autoComplete={props.name}
                            fullWidth
                            disabled={props.disabled}
                            error={!!errors[props.name]}
                            helperText={errors[props.name]?.message}
                        />
                    }
                </InputContainer>
            )}
        />
    );
};

export default TextInput;
