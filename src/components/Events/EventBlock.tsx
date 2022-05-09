import { FC, useContext } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { ThemeContext } from "styled-components";

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
    margin: 0px;
    width: 93%;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 0px;
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

// type EventBlockProps = {
//     events: Event;
// };

const EventBlock: FC = () => {

    const theme = useContext(ThemeContext);

    const color : string = "warmMid";

    return (
        <Block>
            <Bar color={theme.pallette[color]}>

            </Bar>
            <Content>
                <FirstRow>
                    <LeftColumn>
                    </LeftColumn>
                    <RightColumn>
                        
                    </RightColumn>
                </FirstRow>
                <SecondRow>
                    <LeftColumn>
                        
                    </LeftColumn>
                    <RightColumn>
                        
                    </RightColumn>
                </SecondRow>
            </Content>
        </Block>
    )
}

export default EventBlock;
