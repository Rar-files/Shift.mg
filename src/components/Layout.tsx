import { FC } from "react";
import styled from "styled-components";

import MenuBar from "./MenuBar";
import Views from "./Views";

const Page = styled.section`
    position: fixed;
    background-color: ${props => props.theme.app.background};
    height: 100%;
    min-width: 100%;
    display: flex;
    align-items: flex-start;
`;

const Layout : FC = () => {
  return (
    <Page>
      <MenuBar/>
      <Views/>
    </Page>
  );
}

export default Layout;