import type { NextPage } from 'next'
import router, { useRouter } from 'next/router';
import styled from 'styled-components'
import * as yup from 'yup';
import { useAppSelector } from '../../../app';
import { UpdateEvent, getEvent } from '../../../app/services/event/EventService';
import {TextInput, CheckBoxInput, DateRangeInput, SubmitButton, ColorPickerInput, IconPickerInput} from '../../../components/Form'
import {EventVisibility, IEvent} from '../../../interfaces/IEvent';
import { IIcon } from '../../../interfaces/IIcon';
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Form, FormContainer} from "../../../styles/form";
import {useEffect, useState} from "react";
import {applyViolationsToForm} from "../../../app/helpers/functions";
import slugify from "slugify";
import RadioSelectInput from "../../../components/Form/controls/RadioSelectInput";
import { IFormEvent } from '../create';
import { getIcon } from '../../../app/services/event/IconService';

const schema = yup.object().shape({
    name: yup.string().required('This field is required').min(5),
    color: yup.string().required('This field is required'),
    shifts: yup.boolean(),
    description: yup.string().required('This field is required'),
    startDate: yup.date().nullable().required('This field is required').typeError('Invalid date'),
    endDate: yup.date().nullable().required('This field is required').typeError('Invalid date'),
    location: yup.string().required('This field is required'),
    icon: yup.mixed<IIcon>().required('This field is required'),
    visibility: yup.mixed<EventVisibility>().required('This field is required')
});

const CreateEventPage = styled.div`
    height: 100vh;
`;

const EditEvent: NextPage = () => {
    const router = useRouter();
    const eventId = router.query.id as string;

    const methods = useForm<IFormEvent>({resolver: yupResolver(schema), defaultValues: {icon: null, shifts: false, visibility: "public"}});
    const [formLoading, setFormLoading] = useState<boolean>(false);

    const [eventState, setEventState] = useState<IEvent | null>(null);

    const IEventToIFromEvent = async (event: IEvent): Promise<IFormEvent> => {
        const icon = await getIcon(event.icon.substring(17));

        return {
            name: event.name,
            slug: event.slug,
            shifts: event.shiftsEnabled,
            startDate: event.startDate,
            endDate: event.endDate,
            location: event.location,
            description: event.description,
            color: event.color,
            visibility: event.visibility,
            icon: icon.data
        }
    }

    useEffect(() => {
        if (eventState !== null || eventId === undefined) {
            return;
        }

        getEvent(eventId).then((promise) => {
            setEventState(promise.data);
        });
    }, [eventId, eventState]);

    useEffect(() => {
        methods.setValue('slug', slugify(methods.getValues('name').toLowerCase()))
    }, [methods]);

    useEffect(() => {
        // reset form with user data
        if(eventState)

        IEventToIFromEvent(eventState).then(formEventPromise =>{
            methods.reset(formEventPromise);
        })
    }, [eventState, methods]);

    const userState = useAppSelector(state => state.user)

    const onSubmit = (data : IFormEvent) => {
        setFormLoading(true);

        const event : IEvent = {
            id: eventId,
            name: data.name,
            slug: data.slug,
            owner: (userState.data?.username ? userState.data?.username : "none"),
            color: data.color.toUpperCase(),
            shiftsEnabled: data.shifts,
            description: data.description,
            icon: "/api/event_icons/" + data.icon!.id,
            startDate: data.startDate,
            endDate: data.endDate,
            location: data.location,
            shifts: [],
            visibility: data.visibility
        }

        UpdateEvent(event).then(response => {
            setFormLoading(false);

            if (response.succeeded) {
                router.push("/events");
            } else {
                applyViolationsToForm<IFormEvent>(methods.setError, response.violations);
            }
        })
    }

    return (
        <main>
            <CreateEventPage>
                <FormContainer>
                    <Form>
                        <FormProvider {...methods}>
                            <TextInput name='name' label='Event name'/>
                            <TextInput name='slug' label='Event slug' disabled={true}/>
                            <ColorPickerInput name='color' label='Event Color:'/>
                            <RadioSelectInput name='visibility' label='Visibility' options={{'Public': 'public', 'Private': 'private'}} />
                            <DateRangeInput startName='startDate' endName='endDate' label='Event Time:'/>
                            <CheckBoxInput name='shifts' label='Shifts'/>
                            <TextInput name='location' label='Location'/>
                            <TextInput name='description' label='Description' multiline={true}/>
                            <IconPickerInput name='icon' label='Icon:'/>
                            <SubmitButton onClick={methods.handleSubmit(onSubmit)} loading={formLoading}/>
                        </FormProvider>
                    </Form>
                </FormContainer>
            </CreateEventPage>
        </main>
    )
}

export default EditEvent
