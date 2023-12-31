import { FC, useState } from "react";
import styled from "styled-components";
import { IEvent as Event} from "../../../interfaces/IEvent";
import {IIcon} from "../../../interfaces/IIcon";
import { useAppSelector } from "../../../app";
import router from "next/router";
import { getMediaObject } from "../../../app/services/MediaObjectService";
import { getIcon } from "../../../app/services/event/IconService";
import Loading from "../../Loading";

const Block = styled.div`
    background-color: ${props => props.theme.palette.background.paper};
    height: 99%;
    min-width: 280px;
    width: 280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 14px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    margin: 10px;
    cursor: pointer;
`;
`   `
const Bar = styled.div<{
    color: string;
}>`
    padding: 12px 0px;
    width: 100%;
    background-color: ${props => props.color};
    border-radius: 14px 14px 0px 0px;
`;

const Content = styled.div`
    width: 100%;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
    margin: 0px;
    font-family: ${props => props.theme.typography.fontFamily};
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    width: 93%;
`;

const Column = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const LeftColumn = styled(Column)`
    width: 24%;
    padding-right: 6px;
    border-right: 1px solid ${props => props.theme.palette.divider};
`;

const RightColumn = styled(Column)`
    width: 76%;
`;

const FirstRow = styled(Row)`
    height: 38%;
    border-bottom: 1px solid ${props => props.theme.palette.divider};
`;

const SecondRow = styled(Row)`
    height: 62%;
`;

const EventIcon = styled.img<{
    color: string;
}>`
    height: auto;
    width: 64%;
    color: ${props => props.color};
    cursor: pointer;
    filter: contrast(0%) brightness(40%) opacity(50%) drop-shadow(0em 0 0px ${props => props.color});
`;

const Title = styled.h1<{
    color: string;
}>`
    font-size: 1.5rem;
    margin: 10px;
    padding: 0px;
    width: 100%;
    color: ${props => props.color};
`;

const DateDiv = styled.div<{
    color: string;
}>`
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    color: ${props => props.color};
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Day = styled.div`
    font-size: ${props => props.theme.typography.h4};
    margin: 0;
`;

const RestOfDate = styled.div`
    font-size: ${props => props.theme.typography.body2};
    margin: 0;
`;

const Description = styled.div`
    margin: 0.2rem 0.4rem;
    display:flex;
    align-items: center;
    padding: 0px;
    width: 100%;
    height: 100%;
    color: ${props => props.theme.palette.text.secondary};
    background-color: ${props => props.theme.palette.background.paper};
    /* overflow: clip; */
    overflow-wrap: break-word;
    overflow: hidden;
`;

type EventBlockProps = {
    event: Event;
    onEventClick: (eventId : string) => void;
};

const EventBlock: FC<EventBlockProps> = (props) => {
    const [iconUrl, setIconUrl] = useState<string>();

    const color = props.event.color;

    const date = new Date(props.event.startDate);


    getIcon(props.event.icon.substring(17)).then(iconPromise => {
        if(!iconPromise.succeeded)
            return;

        setIconUrl(iconPromise.data?.iconObject.contentUrl);
    })

    const onEventClick = () => {
        props.onEventClick(props.event.id);
    };

    return (
        <Block onClick={onEventClick}>
            <Bar color={color}>

            </Bar>
            <Content>
                <FirstRow>
                    <LeftColumn>
                        {iconUrl
                        ? <EventIcon src={iconUrl} color={color}/>
                        : <Loading/>}
                    </LeftColumn>
                    <RightColumn>
                        <Title color={color}>
                            {props.event.name}
                        </Title>
                    </RightColumn>
                </FirstRow>
                <SecondRow>
                    <LeftColumn>
                        <DateDiv color={color}>
                            <Day>
                                {date.getDate()}
                            </Day>
                            <RestOfDate>
                                {date.getMonth()+1}.{date.getFullYear()}
                            </RestOfDate>
                        </DateDiv>
                    </LeftColumn>
                    <RightColumn>
                        <Description>
                            {props.event.description}
                        </Description>
                    </RightColumn>
                </SecondRow>
            </Content>
        </Block>
    )
}

export default EventBlock;
