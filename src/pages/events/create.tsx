import type { NextPage } from 'next'
import router from 'next/router';
import styled from 'styled-components'
import * as yup from 'yup';
import { useAppSelector } from '../../app';
import { CreateEvent } from '../../app/services/event/EventService';
import {TextInput, CheckBoxInput, DateRangeInput, SubmitButton, ColorPickerInput, IconPickerInput} from '../../components/Form'
import {EventVisibility, IEvent} from '../../interfaces/IEvent';
import { IIcon } from '../../interfaces/IIcon';
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Form, FormContainer} from "../../styles/form";
import {useEffect, useState} from "react";
import {applyViolationsToForm} from "../../app/helpers/functions";
import slugify from "slugify";
import RadioSelectInput from "../../components/Form/controls/RadioSelectInput";

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

type IFormEvent = {
    name: string;
    slug: string;
    shifts: boolean;
    startDate: Date;
    endDate: Date;
    location: string;
    description: string;
    color: string;
    icon: IIcon | null;
    visibility: EventVisibility;
}

const CreateEventPage = styled.div`
    height: 100vh;
`;

const Event: NextPage = () => {
    const methods = useForm<IFormEvent>({resolver: yupResolver(schema), defaultValues: {icon: null, shifts: false}});
    const [formLoading, setFormLoading] = useState<boolean>(false);

    const watchEventName = methods.watch('name');

    useEffect(() => {
        methods.setValue('slug', slugify(methods.getValues('name').toLowerCase()))
    }, [methods, watchEventName]);

    const userState = useAppSelector(state => state.user)

    const onSubmit = (data : IFormEvent) => {
        setFormLoading(true);

        console.log(data);

        const event : IEvent = {
            id: "",
            name: data.name,
            slug: data.slug,
            owner: (userState.data?.username ? userState.data?.username : "none"),
            color: data.color.toUpperCase(),
            shiftsEnabled: data.shifts,
            description: data.description,
            icon: data.icon!,
            startDate: data.startDate,
            endDate: data.endDate,
            location: data.location,
            shifts: [],
            visibility: data.visibility
        }

        CreateEvent(event).then(response => {
            setFormLoading(false);

            console.log(response);

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

export default Event
