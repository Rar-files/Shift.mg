import { Moment } from 'moment';
import type { NextPage } from 'next'
import router from 'next/router';
import styled from 'styled-components'
import * as yup from 'yup';
import { useAppSelector } from '../../app';
import { CreateEvent } from '../../app/services/event/EventService';
import {Form, useMethods, TextInput, CheckBoxInput, DateRangeInput, SubmitButton, ColorPickerInput, IconPickerInput} from '../../components/Form'
import { IEvent } from '../../interfaces/IEvent';
import { IIcon } from '../../interfaces/IIcon';

const schema = yup.object().shape({
    name: yup.string().label('Name').required().min(5),
    color: yup.string().label('Color').required(),
    shifts: yup.boolean(),
    description: yup.string().required().label('Description'),
    startDate: yup.string().label('Start date').nullable().required(),
    endDate: yup.string().label('End date').nullable().required(),
    location: yup.string().required(),
    icon: yup.mixed<IIcon>().required("Icon is a required field")
});

type IFormEvent = {
    name: string
    shifts: boolean
    startDate: Moment
    endDate: Moment
    location: string
    description: string
    color: string
    icon: IIcon;
}

const CreateEventPage = styled.div`
    height: 100vh;
`;

const Event: NextPage = () => {
    const methods = useMethods(schema);
    
    const userState = useAppSelector(state => state.user)

    const onSubmit = (data : IFormEvent) => {
        const event : IEvent = {
            id: "",
            name: data.name,
            slug: data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            owner: (userState.data?.username ? userState.data?.username : "none"),
            color: data.color,
            shiftsEnabled: data.shifts,
            description: data.description,
            icon: data.icon,
            startDate: data.startDate.toDate(),
            endDate: data.endDate.toDate(),
            location: data.location,
            shifts: [],
        }
        CreateEvent(event).then(resEvent => {
            console.log(resEvent);
        })
        router.push("/events");
    }

    console.log(methods.watch())

    return (
        <main>
            <CreateEventPage>
                <Form methods={methods} onSubmit={onSubmit}>
                    <TextInput name='name' label='Event name'/>
                    <ColorPickerInput name='color' label='Event Color:'/>
                    <DateRangeInput startName='startDate' endName='endDate' label='Event Time:'/>
                    <CheckBoxInput name='shifts' label='Shifts'/>
                    <TextInput name='description' label='Description' multiline={true}/>
                    <IconPickerInput name='icon' label='Icon:'/>
                    <SubmitButton/>
                </Form>
            </CreateEventPage>
        </main>
    )
}

export default Event