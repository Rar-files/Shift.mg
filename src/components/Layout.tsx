import { FC } from "react";
import styled from "styled-components";
import MenuBar from "./MenuBar";

const Page = styled.div`
    background-color: ${props => props.theme.app.background};
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    min-width: 100%;
`;

const Layout : FC = () => {
  return (
    <Page>
      <MenuBar/>
    </Page>
  );
}

export default Layout;