import { FC, useContext, useEffect } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { ThemeContext } from "styled-components";
import { IEvent as Event} from "../../interfaces/IEvent";
import { useAppDispatch, useAppSelector } from "../../app";
import { loadIcons } from "../../features/event/iconSlice";

const Block = styled.div`
    background-color: ${props => props.theme.palette.background.paper};
    height: 99%;
    width: 280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 14px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    margin: 10px;
`;

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
    filter: opacity(0.5) drop-shadow(0em 0 3px ${props => props.color});
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

const Date = styled.div<{
    color: string;
}>`
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    color: ${props => props.color};
    text-align: center;
`;

const Day = styled.div`
    font-size: ${props => props.theme.typography.h5};
`;

const RestOfDate = styled.div`
    font-size: ${props => props.theme.typography.h6};
`;

const Description = styled.div`
    margin: 0.2rem 0.4rem;
    padding: 0px;
    width: 100%;
    height: 100%;
    color: ${props => props.theme.palette.text.secondary};
    background-color: ${props => props.theme.palette.background.paper};
    overflow: clip;
`;

type EventBlockProps = {
    event: Event;
};

const EventBlock: FC<EventBlockProps> = (props) => {
    const dispatch = useAppDispatch();
    const iconState = useAppSelector(state => state.eventIcon)

    const color : string = "red"

    const date = props.event.startDate;

    useEffect(() => {
        if (iconState.data === undefined) {
            return;
        }

        dispatch(loadIcons())
    }, [dispatch, iconState.data])

    return (
        <Block>
            <Bar color={color}>

            </Bar>
            <Content>
                <FirstRow>
                    <LeftColumn>
                        {/* <EventIcon src={props.event.icon.iconObject.contentUrl} color={color}/> */}
                    </LeftColumn>
                    <RightColumn>
                        <Title color={color}>
                            {props.event.name}
                        </Title>
                    </RightColumn>
                </FirstRow>
                <SecondRow>
                    <LeftColumn>
                        <Date color={color}>
                            <Day>
                                {date.getDay}
                            </Day>
                            <RestOfDate>
                                {date.getMonth}.{date.getFullYear}
                            </RestOfDate>
                        </Date>
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
