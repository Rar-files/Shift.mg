import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import styled from "styled-components";
import {DropzoneArea} from 'material-ui-dropzone'
import InputContainer from "./InputContainer";
import { FormLabel } from "@material-ui/core";

const Dropzone = styled(DropzoneArea)``;

const FileLabel = styled.div`
    margin: 0.6rem 0.6rem 0.6rem 0;
    color: ${props => props.theme.palette.text.primary};
`;

const FileInputDiv = styled(InputContainer)`
    flex-direction: column;
`;

type Props = {
    name: string;
    label: string;
}

const FileInput: FC<Props> = ({name, label}) => {
    const { 
        control,
        formState: {errors}
    } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field: { ...field } }) => (
                <FileInputDiv>
                    <FormLabel>
                        <FileLabel>
                            {label}
                        </FileLabel>
                    </FormLabel>
                    <Dropzone 
                        {...field}
                    />
                </FileInputDiv>
            )}
        />
    );
};

export default FileInput;