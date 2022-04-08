import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
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

  const router = useRouter();

  const [loginData, setLoginData] = useState(null);

  useEffect(() => {
      const loginData = localStorage.getItem("loginData");
      if(loginData){
          setLoginData(          
              JSON.parse(localStorage.getItem("loginData")!)
          )
      }
      if(!loginData){
        router.push("/login");
    }
  }, [loginData, router]);

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