import type { NextPage } from 'next'
import router from 'next/router';
import styled from 'styled-components'
import * as yup from 'yup';
import { CreateIcon } from '../../app/services/event/IconService';
import { CreateMediaObject } from '../../app/services/MediaObjectService';
import {Form, useMethods, TextInput, SubmitButton } from '../../components/Form'
import FileInput from '../../components/Form/controls/FileInput';
import { IIcon } from '../../interfaces/IIcon';

const schema = yup.object().shape({
    name: yup.string().label('Name').required().min(5),
    icon: yup.mixed<File>().required("Icon is a required field")
});

type IFormIcon = {
    name: string
    icon: File;
}

const CreateEventPage = styled.div`
    height: 100vh;
`;

const IconCreate: NextPage = () => {
    const methods = useMethods(schema);

    const onSubmit = (data : IFormIcon) => {
        const formData = new FormData();
        formData.append("file", data.icon)
        CreateMediaObject(formData).then(response => {
            const eventIcon : IIcon = {
                id: "",
                name: data.name,
                iconObject: response.data
            }
            CreateIcon(eventIcon).then(() => router.push("/events/create"))
        }
        )
    }

    return (
        <main>
            <CreateEventPage>
                <Form methods={methods} onSubmit={onSubmit}>
                    <TextInput name='name' label='Icon name:'/>
                    <FileInput name='file' label='Icon:'/>
                    <SubmitButton />
                </Form>
            </CreateEventPage>
        </main>
    )
}

export default IconCreate