import { FC } from "react";
import { useFormContext, Controller} from "react-hook-form";
import styled from "styled-components";
import {Checkbox, FormControlLabel} from "@material-ui/core";

const CheckInput = styled(Checkbox)``;

const CheckInputLabled = styled(FormControlLabel)``;

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
                <CheckInputLabled control={
                    <CheckInput 
                        {...field}
                        id={name}
                    />
                } label={label} />
            )}
        />
    );
};

export default CheckBoxInput;