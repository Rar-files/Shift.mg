import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import MomentUtils from "@date-io/moment";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import styled from "styled-components";
import { FormLabel } from "@material-ui/core";
import InputContainer from "./InputContainer";

const DateLabel = styled.div`
    margin: 0.6rem 0.6rem 0 0;
    color: ${props => props.theme.palette.text.primary};
`;

type Props = {
    name: string;
    label: string;
    placeholder?: string;
}

const DateInput: FC<Props> = ({name, label, placeholder}) => {
    const { 
        control,
        formState: {errors}
    } = useFormContext();

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Controller
                name={name}
                control={control}
                defaultValue=""
                render={({ field: { ref, ...field } }) => (
                    <InputContainer>
                        <FormLabel>
                            <DateLabel>
                                {label}
                            </DateLabel>
                        </FormLabel>
                        <KeyboardDatePicker
                            {...field}
                            disableToolbar={true}
                            placeholder={placeholder ? placeholder : "dd/mm/yyyy"}
                            minDate={new Date()}
                            format="DD/MM/yyyy"
                            error={!!errors[name]}
                            helperText={errors[name]?.message}
                        />
                    </InputContainer>
                )}
            />
        </MuiPickersUtilsProvider>
    );
};

export default DateInput;