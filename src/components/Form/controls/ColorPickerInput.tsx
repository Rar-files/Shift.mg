import { FC, useContext } from "react";
import styled, { ThemeContext  } from "styled-components";
import { useFormContext, Controller } from "react-hook-form";
import { FormLabel } from "@material-ui/core";
import InputContainer from "./InputContainer";

const Color = styled.div<{
    color: string;
}>`
    padding: 10px
    background-color: ${props => props.color};
    border-radius: 50%;
`;

type Props = {
    name: string;
    label: string;
}

const IconPicker: FC<Props> = ({ name, label }) => {
    const { 
        control
    } = useFormContext();

    const theme = useContext(ThemeContext);

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field: { ref, ...field } }) => (
                <InputContainer>
                    {(theme.palette.eventPalette as string[]).map((color) => (
                    <Color color={color}>))}
                </InputContainer>
            )}
        />
    )
}

export default IconPicker;