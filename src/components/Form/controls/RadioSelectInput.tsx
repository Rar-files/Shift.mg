import { FC } from "react";
import { useFormContext, Controller} from "react-hook-form";
import styled from "styled-components";
import {Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import InputContainer from "./InputContainer";

const CheckInput = styled(Checkbox)``;

type Props = {
    name: string;
    label: string;
    options: {[key: string]: string};
}

const RadioSelectInput: FC<Props> = ({name, label, options}) => {
    const {
        control,
        formState: {errors}
    } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <InputContainer>
                    <FormControl>
                    <FormLabel>{label}</FormLabel>
                    <RadioGroup
                        defaultValue={options[Object.keys(options)[0]]}
                        onChange={field.onChange}
                        value={field.value}
                        name={name}
                    >
                        {Object.keys(options).map((label, index) => (
                            <FormControlLabel key={index} value={options[label]} control={<Radio />} label={label} />
                        ))}
                    </RadioGroup>
                    </FormControl>
                </InputContainer>
            )}
        />
    );
};

export default RadioSelectInput;
