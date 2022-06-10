import { FC } from "react";
import { useFormContext, Controller} from "react-hook-form";
import styled from "styled-components";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import InputContainer from "./InputContainer";

const CheckInput = styled(Checkbox)``;

type Props = {
    name: string;
    label: string;
}

const CheckBoxInput: FC<Props> = ({name, label}) => {
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
                    <FormControlLabel control={
                        <CheckInput 
                            {...field}
                            id={name}
                            color="primary"
                        />
                    } label={label} />
                </InputContainer>
            )}
        />
    );
};

export default CheckBoxInput;