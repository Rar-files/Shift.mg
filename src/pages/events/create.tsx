import type { NextPage } from 'next'
import { useForm } from 'react-hook-form';
import styled from 'styled-components'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Form, useMethods, TextInput, CheckBoxInput, DateRangeInput, SubmitButton} from '../../components/Form'
// import TextInput from '../../components/Forms/controls/TextInput';
// import SubmitButton from '../../components/Forms/SubmitButton';
// import CheckBoxInput from '../../components/Forms/controls/CheckBoxInput';
// import DateInput from '../../components/Forms/controls/DateInput';

const schema = yup.object().shape({
    name: yup.string().label('Name').required().min(5),
    slug: yup.string().required(),
    color: yup.string().required(),
    shifts: yup.boolean(),
    description: yup.string().required(),
    startDate: yup.string().label('Start date').nullable().required(),
    endDate: yup.string().label('End date').nullable().required(),
    location: yup.string().required(),
});

type IFormEvent = {
    name: string
    shifts: boolean
    startDate: Date
    endDate: Date
    location: string
    description: string
    slug: string
    color: string
}

const CreateEventPage = styled.div``;

const Event: NextPage = () => {
    const methods = useMethods(schema);

    const onSubmit = (data : IFormEvent) => {
    }

    return (
        <main>
            <CreateEventPage>
                <Form methods={methods} onSubmit={onSubmit}>
                    <TextInput name='name' label='Event name'/>
                    <TextInput name='slug' label='Slug?'/>
                    
                    <CheckBoxInput name='shifts' label='Shifts'/>
                    <DateRangeInput startName='startDate' endName='endDate' label='Event Time: '/>
                    <SubmitButton/>
                </Form>
            </CreateEventPage>
        </main>
    )
}

export default Event