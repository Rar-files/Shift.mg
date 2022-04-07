import { FC } from "react"; 
import styled from "styled-components";

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
    border-color: ${props => props.theme.app.separator};
    border-style: solid;
    border-width: 1px 0;
`;

const Menu : FC = () => {
  return (
    <Content>
        <Links>
        </Links>
    </Content>
  );
}

export default Menu;