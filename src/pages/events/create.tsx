import type { NextPage } from 'next'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components'
import { CreateEvent } from '../../app/services/event/EventService';
import { CreateIcon } from '../../app/services/event/IconService';
import { CreateMediaObject } from '../../app/services/MediaObjectService';
import IconPicker from '../../components/Icons/IconPicker';
import { IEvent } from '../../interfaces/IEvent';
import { IIcon } from '../../interfaces/IIcon';


const CreateEventPage = styled.div``;

const Event: NextPage = () => {
    const { register, handleSubmit} = useForm();

    const [icon, setIcon] = useState<IIcon>();
    const [pickLoaded, setPickLoaded] = useState<boolean>(false);

    const onSubmit = (data : any) => {
        if(icon != undefined) { 
            const event : IEvent = {
                id: "",
                name: data.name,
                slug: data.slug,
                owner: "test",
                color: data.color,
                shiftsEnabled: data.shifts,
                description: data.description,
                icon: icon,
                startDate: data.startDate,
                endDate: data.endDate,
                location: data.location,
                shifts: [],
            }
            CreateEvent(event).then(resEvent => {
                console.log(resEvent);
            }) 
        }
        else {
            console.log("No icon selected");
        }
    }

    return (
        <main>
            <CreateEventPage>
                <form onSubmit={handleSubmit(onSubmit)}>
                    Name:
                    <input {... register("name")}/>
                    <br/>
                    StartDate:
                    <input type="date" {... register("startDate")}/>
                    <br/>
                    EndDate:
                    <input type="date" {... register("endDate")}/>
                    <br/>
                    Color:
                    <input type="color" {... register("color")}/>
                    <br/>
                    Icon:
                    <input type="button" value={icon ? icon.name : "Select Icon"} onClick={() => setPickLoaded(true)}/>
                    <br/>
                    Location:
                    <input {... register("location")}/>
                    <br/>
                    Shifts:
                    <input type="checkbox" {... register("shifts")}/>
                    <br/>
                    Slug:
                    <input {... register("slug")}/>
                    <br/>
                    Description:
                    <input {... register("description")}/>
                    <br/>


                    <input type={'submit'}/>
                </form>

                {pickLoaded && <IconPicker setIcon={setIcon} setPickLoaded={setPickLoaded}/>}

            </CreateEventPage>
        </main>
    )
}

export default Event