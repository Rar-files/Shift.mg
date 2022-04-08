import { FC } from "react";
import styled from "styled-components";

import MenuBar from "./MenuBar";

const Page = styled.section`
  position: fixed;
  background-color: ${props => props.theme.app.background};
  height: 100%;
  min-width: 100%;
  display: flex;
  align-items: flex-start;
`;

const Content = styled.div`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

type Props = {
  children: React.ReactNode;
};

const Layout : FC<Props> = ({children}) => {
  return (
    <Page>
      <MenuBar/>
      <Content>
        {children}
      </Content>
    </Page>
  );
}

export default Layout;