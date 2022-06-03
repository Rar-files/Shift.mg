import type { NextPage } from 'next'
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextInput from '../../components/Forms/controls/TextInput';
import SubmitButton from '../../components/Forms/SubmitButton';
import CheckBoxInput from '../../components/Forms/controls/CheckBoxInput';

const schema = yup.object().shape({
    name: yup.string().required().min(5),
    // slug: yup.string().required(),
    // color: yup.string().required(),
    shifts: yup.boolean().required(),
    // description: yup.string().required(),
    // startDate: yup.string().required(),
    // endDate: yup.string().required(),
    // location: yup.string().required(),
});

interface IFormEvent {
    name: string
    shifts: boolean
}

const CreateEventPage = styled.div``;

const Event: NextPage = () => {
    const methods = useForm<IFormEvent>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data : IFormEvent) => {
    }

    // console.log(methods.watch('name'));

    return (
        <main>
            <CreateEventPage>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <TextInput name='name' label='test'/>
                        <br/>
                        <CheckBoxInput name='shifts' label='shifts'/>
                        <br/>
                        <SubmitButton/>
                    </form>
                </FormProvider>
            </CreateEventPage>
        </main>
    )
}

export default Event