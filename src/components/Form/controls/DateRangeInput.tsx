import { FC } from "react";
import styled from "styled-components";
import DateInput from "./DateInput";

const DateRangeContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: row;
`;

type Props = {
    startName: string;
    endName: string;
    label: string;
}

const DateRangeInput: FC<Props> = ({startName, endName, label}) => {

    return (
        <DateRangeContainer>
            <DateInput name={startName} label={label} placeholder='Start'/>
            <DateInput name={endName} label='to ' placeholder='End'/>
        </DateRangeContainer>
    );
};

export default DateRangeInput;