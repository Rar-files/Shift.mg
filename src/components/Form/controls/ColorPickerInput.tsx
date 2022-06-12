import { FC, useContext, useState } from "react";
import styled, { ThemeContext  } from "styled-components";
import { useFormContext, Controller } from "react-hook-form";
import { Button, FormLabel, Dialog, DialogTitle, DialogContent,  DialogActions} from "@material-ui/core";
import InputContainer from "./InputContainer";
import { HexColorPicker } from "react-colorful";

const ColorInputWithErrorDiv = styled(InputContainer)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    font-family: ${props => props.theme.typography.fontFamily};
`

const ColorInputDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 1.8rem;
    margin: 0.4rem 0 0.4rem 0;
`

const ColorLabel = styled.div`
    margin: 0 0.6rem 0 0;
    color: ${props => props.theme.palette.text.primary};
`;

const ColorTrigger = styled.div<{
    color: string;
}>`
    margin: 2px;
    padding: 10px;
    width: 2rem;
    height: 1em;
    background: ${props => props.color};
    border-radius: 10%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    font-size: ${props => props.theme.typography.caption.fontSize};
`;

const ColorPicker = styled(HexColorPicker)`
    margin-bottom: 10px;
`;

const SaveButton = styled(Button)`
    width: 10px;
`;

const ErrorLabel = styled.p`
    color: ${props => props.theme.palette.error.main};
    font-size: ${props => props.theme.typography.caption.fontSize};
`;

type Props = {
    name: string;
    label: string;
}

const ColorPickerInput: FC<Props> = ({ name, label }) => {
    const {
        control,
        formState: {errors}
    } = useFormContext();

    const [showPicker, setShowPicker] = useState(false);

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <ColorInputWithErrorDiv>
                    <ColorInputDiv>
                        <FormLabel>
                            <ColorLabel>
                                {label}
                            </ColorLabel>
                        </FormLabel>
                        {showPicker &&
                        <Dialog
                            open={showPicker}
                            onClose={() => setShowPicker(false)}
                            aria-labelledby="ColorPicker"
                        >
                            <DialogTitle>
                                {"Choose color"}
                            </DialogTitle>
                            <DialogContent>
                                <ColorPicker onChange={(change) => field.onChange(change)} />
                            </DialogContent>
                            <DialogActions>
                                <SaveButton onClick={() => setShowPicker(false)} color="primary">save</SaveButton>
                            </DialogActions>
                        </Dialog>}
                        <ColorTrigger color={field.value} onClick={() => setShowPicker(!showPicker)}>
                            {!field.value && "Pick"}
                        </ColorTrigger>
                    </ColorInputDiv>

                    <ErrorLabel>
                        {errors[name] && errors[name]?.message}
                    </ErrorLabel>
                </ColorInputWithErrorDiv>
            )}
        />
    )
}

export default ColorPickerInput;
