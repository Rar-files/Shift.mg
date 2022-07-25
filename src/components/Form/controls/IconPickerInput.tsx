import { FC, useEffect, useState, useContext } from "react";
import { useFormContext, Controller } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../app";
import { FormLabel, Dialog, DialogTitle, DialogContent} from "@material-ui/core";
import { loadIcons } from "../../../features/event/iconSlice";
import InputContainer from "./InputContainer";
import { ThemeContext } from "styled-components";
import AddBoxIcon from '@material-ui/icons/AddBox';
import router from "next/router";

const IconInputWithErrorDiv = styled(InputContainer)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    font-family: ${props => props.theme.typography.fontFamily};
`

const IconInputDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 1.8rem;
    margin: 0.4rem 0 0.4rem 0;
`

const IconLabel = styled.div`
    margin: 0 0.6rem 0 0;
    color: ${props => props.theme.palette.text.primary};
`;

const Icon = styled.img<{
    color: string;
}>`
    width: 2.2rem;
    height: 2.2rem;
    margin: 0.2rem;
    cursor: pointer;
    filter: opacity(0.5) drop-shadow(0em 0 3px ${props => props.color});
`;

const Picker = styled.div`
    background-color: ${props => props.theme.palette.background.default};
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    overflow: auto;
    border-radius: 2%;
    margin: 0.4rem;
    margin-top: 0rem;
    margin-bottom: 1.4rem;
    max-height: 12rem;
    width: 12rem;
    scrollbar-width: none;
`;

const IconTrigger = styled.div`
    margin: 2px;
    padding: 10px;
    width: 2rem;
    height: 1rem;
    border-radius: 10%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    font-size: ${props => props.theme.typography.caption.fontSize};
`;

const ErrorLabel = styled.p`
    color: ${props => props.theme.palette.error.main};
    font-size: ${props => props.theme.typography.caption.fontSize};
`;

type Props = {
    name: string;
    label: string;
}

const IconPickerInput: FC<Props> = ({ name, label }) => {
    const dispatch = useAppDispatch();
    const iconState = useAppSelector(state => state.eventIcon);

    const {
        control,
        formState: {errors}
    } = useFormContext();

    const [showPicker, setShowPicker] = useState(false);

    const theme = useContext(ThemeContext);

    useEffect(() => {

        dispatch(loadIcons())
    }, [dispatch])

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field: { ref, ...field } }) => (
                <IconInputWithErrorDiv>
                    <IconInputDiv>
                        <FormLabel>
                            <IconLabel>
                                {label}
                            </IconLabel>
                        </FormLabel>
                        {showPicker &&
                        <Dialog
                            open={showPicker}
                            onClose={() => setShowPicker(false)}
                            aria-labelledby="ColorPicker"
                        >
                            <DialogTitle>
                                {"Choose icon"}
                            </DialogTitle>
                            <DialogContent>
                                <Picker>
                                    {iconState.loaded && iconState.data.items.map((element, index) => (
                                        <Icon key={index} color={theme.palette.primary} src={element.iconObject.contentUrl} onClick={() => {
                                            field.onChange(element);
                                            setShowPicker(false);
                                        }}/>
                                    ))}
                                 </Picker>
                            </DialogContent>
                        </Dialog>}
                        <IconTrigger onClick={() => setShowPicker(!showPicker)}>
                            {field.value
                            ? <Icon color={theme.palette.primary} src={field.value.iconObject.contentUrl}/>
                            : "Pick"
                        }
                        </IconTrigger>
                    </IconInputDiv>

                    <ErrorLabel>
                        {errors[name] && errors[name]?.message}
                    </ErrorLabel>
                </IconInputWithErrorDiv>
            )}
        />
    )
}

export default IconPickerInput;
