import { FC, useContext } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { ThemeContext } from "styled-components";
import { IEvent } from "../../interfaces/IEvent";

const Block = styled.div`
    background-color: ${props => props.theme.app.backgroundVariant};
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
    border-right: 1px solid ${props => props.theme.app.background};
`;

const RightColumn = styled(Column)`
    width: 76%;
`;

const FirstRow = styled(Row)`
    height: 38%;
    border-bottom: 1px solid ${props => props.theme.app.background};
`;

const SecondRow = styled(Row)`
    height: 62%;
`;

const EventIcon = styled(Icon)<{
    color: string;
}>`
    height: auto;
    width: 64%;
    color: ${props => props.color};
`;

const Title = styled.h1<{
    color: string;
}>`
    font-size: 1.5rem;
    margin: 10px;
    padding: 0px;
    width: 100%;
    color: ${props => props.color};
    font-weight: 700;
    font-family: "Alata", sans-serif;
`;

const Date = styled.div<{
    color: string;
}>`
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    color: ${props => props.color};
    font-weight: 400;
    font-family: "Alata", sans-serif;
    text-align: center;
`;

const Day = styled.div`
    font-size: ${props => props.theme.fontSizes[6]};
`;

const RestOfDate = styled.div`
    font-size: ${props => props.theme.fontSizes[0]};
`;

const Description = styled.div`
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    color: ${props => props.theme.app.text};
    font-weight: 400;
    font-family: "Alata", sans-serif;
    background-color: ${props => props.theme.app.background};
    overflow: clip;
`;

type EventBlockProps = {
    event: IEvent;
};

const EventBlock: FC<EventBlockProps> = (props) => {

    const theme = useContext(ThemeContext);

    const color : string = props.event.color;

    const date = props.event.startDate;

    return (
        <Block>
            <Bar color={theme.pallette[color]}>

            </Bar>
            <Content>
                <FirstRow>
                    <LeftColumn>
                        <EventIcon icon={props.event.icon} color={theme.pallette[color]}/>
                    </LeftColumn>
                    <RightColumn>
                        <Title color={theme.pallette[color]}>
                            {props.event.name}
                        </Title>
                    </RightColumn>
                </FirstRow>
                <SecondRow>
                    <LeftColumn>
                        <Date color={theme.pallette[color]}>
                            <Day>
                                {date.getDay()}
                            </Day>
                            <RestOfDate>
                                {date.getMonth()}.{date.getFullYear()}
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
