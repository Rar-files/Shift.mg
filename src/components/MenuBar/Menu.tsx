import { FC } from "react"; 
import styled from "styled-components";
import MenuElement from "./MenuElement";

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding: 10px;
    height: 100%;
    width: 100%;
    margin: 0.2vh 0;
`;

const Links = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px 0;
    border-color: ${props => props.theme.app.separator};
    border-style: solid;
    border-width: 1px 0;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`;

const Menu : FC = () => {
  return (
    <Content>
        <Links>
            <MenuElement href="/dashboard" icon="mdi:monitor-dashboard" title="Dashboard"/>
            <MenuElement href="/volunteers" icon="carbon:user-favorite" title="Volunteers"/>
            <MenuElement href="/events" icon="ic:baseline-event-available" title="Events"/>
            <MenuElement href="/settings" icon="ic:outline-settings" title="Settings"/>
        </Links>
    </Content>
  );
}

export default Menu;