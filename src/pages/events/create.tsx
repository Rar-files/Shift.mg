import type { NextPage } from 'next'
import { useForm } from 'react-hook-form';
import styled from 'styled-components'
import { CreateEvent } from '../../app/services/event/EventService';
import { CreateIcon } from '../../app/services/event/IconService';
import { CreateMediaObject } from '../../app/services/MediaObjectService';
import { IEvent } from '../../interfaces/IEvent';
import { IIcon } from '../../interfaces/IIcon';


const CreateEventPage = styled.div``;

const Event: NextPage = () => {
    const { register, handleSubmit} = useForm();

    const onSubmit = (data : any) => {
        // var formData = new FormData();
        // formData.append("file", data.file);
        // CreateMediaObject(formData).then(resMediaObj => {
            const icon : IIcon= {
                id: "",
                name: data.name,
                iconObject: {
                    id: "1ecdc8ce-f891-688a-8452-77555e6ab543",
                    contentUrl: "http://127.0.0.1:6101//media/628ecd515d4a0_1644438712533.png",
                    createdAt: new Date("2022-05-26T02:44:01+02:00")
                }
            }
            CreateIcon(icon).then(resIcon => {
                const event : IEvent = {
                    id: "",
                    name: data.name,
                    slug: data.slug,
                    owner: "test",
                    color: data.color,
                    shiftsEnabled: data.shifts,
                    description: data.description,
                    icon: resIcon.data,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    location: data.location,
                    shifts: [],
                }
                CreateEvent(event).then(resEvent => {
                    console.log(resEvent);
                })
            })
        // })
        
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
                    <input type="file" {... register("icon")}/>
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

            </CreateEventPage>
        </main>
    )
}

export default Event