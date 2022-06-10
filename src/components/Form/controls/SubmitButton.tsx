import { FC } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Arrow from '@material-ui/icons/ArrowRight';
import InputContainer from "./InputContainer";

const ButtonInputDiv = styled(InputContainer)`
    margin: 1.4rem 0 0 0;
    justify-content: center;
`;

type Props = {

    label?: string;
}

const SubmitButton: FC<Props> = ({label}) => {

    return (
        <ButtonInputDiv>
            <Button type="submit" variant="contained" color="primary" size="medium" aria-label="submit">
                {label ? label : "Submit"}
                <Arrow fontSize="small" />
            </Button>
        </ButtonInputDiv>
    );
};

export default SubmitButton;
