import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import styled from "styled-components";
import {DropzoneArea} from 'material-ui-dropzone'
import InputContainer from "./InputContainer";

const Dropzone = styled(DropzoneArea)``;

type Props = {
    name: string;
}

const FileInput: FC<Props> = ({name}) => {
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
                <InputContainer>
                    <Dropzone 
                        {...field}
                    />
                </InputContainer>
            )}
        />
    );
};

export default FileInput;