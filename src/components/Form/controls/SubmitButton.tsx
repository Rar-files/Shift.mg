import styled from "styled-components";
import {ButtonProps} from "@material-ui/core/Button";
import Arrow from '@material-ui/icons/ArrowRight';
import InputContainer from "./InputContainer";
import LoadingButton from "../../Misc/LoadingButton";

const ButtonInputDiv = styled(InputContainer)`
    margin: 1.4rem 0 0 0;
    justify-content: center;
`;

type Props = Pick<ButtonProps, 'onClick'> & {
    label?: string;
    loading: boolean;
}

const SubmitButton = (props : Props) => {

    return (
        <ButtonInputDiv>
            <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                aria-label="submit"
                onClick={props.onClick}
                loading={props.loading}
            >
                Submit
            </LoadingButton>
        </ButtonInputDiv>
    );
};

export default SubmitButton;
