import { FC } from "react";
import styled from "styled-components";
import {Fab} from "@material-ui/core";

const SButton = styled(Fab)``;

type Props = {
    label?: string;
}

const SubmitButton: FC<Props> = ({label}) => {


    return (
        <SButton variant="extended" >
            {label ? label : "Submit"}
        </SButton>
    );
};

export default SubmitButton;