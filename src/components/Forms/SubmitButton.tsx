import { FC } from "react";
import styled from "styled-components";
import {Fab} from "@material-ui/core";
import Button from "@material-ui/core/button";
import Arrow from '@material-ui/icons/ArrowRight';

const SButton = styled(Fab)``;

type Props = {
    label?: string;
}

const SubmitButton: FC<Props> = ({label}) => {


    return (
        <Button variant="contained" color="primary" size="medium" aria-label="submit">
            {label ? label : "Submit"}
            <Arrow fontSize="small" />
        </Button>
    );
};

export default SubmitButton;