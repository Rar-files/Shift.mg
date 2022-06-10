import {FC, useEffect} from "react";
import styled from "styled-components";

import {AuthStatus, checkIsTokenStored} from "../features/authSlice";

import MenuBar from "./MenuBar";
import {useAppDispatch, useAppSelector} from "../app";

const Page = styled.section`
  position: fixed;
  background-color: ${props => props.theme.palette.background.default};
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
  font-family: &{props => props.theme.typography.fontFamily};
`;

const Layout : FC = ({children}) => {
  const authState = useAppSelector(state => state.auth);

  return (
    <Page>
        {authState.status === AuthStatus.AUTHORIZED &&
            <MenuBar/>
        }
        <Content>
            {children}
        </Content>
    </Page>
  );
}

export default Layout;
