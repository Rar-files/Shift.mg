import { FC } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/button";
import Arrow from '@material-ui/icons/ArrowRight';
import InputContainer from "./InputContainer";

const SButton = styled(Button)``;

type Props = {

    label?: string;
}

const SubmitButton: FC<Props> = ({label}) => {

    return (
        <InputContainer>
            <SButton type="submit" variant="contained" color="primary" size="medium" aria-label="submit">
                {label ? label : "Submit"}
                <Arrow fontSize="small" />
            </SButton>
        </InputContainer>
    );
};

export default SubmitButton;