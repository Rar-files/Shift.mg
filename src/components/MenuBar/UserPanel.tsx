import { FC, useCallback, useEffect, useState } from "react"; 
import {useAppDispatch, useAppSelector} from "../../app";
import styled from "styled-components";
import { getUserNotify } from "../../app/services/UserService";
import DarkModeToggleBtn from "./DarkModeToggleBtn";
import {Notifications as NotificationsIcon, WbSunnyOutlined as LightModeIcon, NightsStayOutlined as DarkModeIcon} from "@material-ui/icons/"
import {
  Box,
  IconButton,
  Badge,
  Container,
  Divider,
  Grid,
  Paper,
  Typography
} from "@material-ui/core";
import useDarkMode from "use-dark-mode";
import { INotify } from "../../interfaces/INotify";

const Panel = styled.div`
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`;

const UserPanel : FC = () => {
  const darkMode = useDarkMode();
  const dispatch = useAppDispatch();
  
  const userState = useAppSelector(state => state.user)

  const [notifications, setNotifications] = useState<INotify[]>([]);

  const updateNotify = useCallback(() => {
    if(userState.loaded && userState.data) {
      getUserNotify(userState.data?.id as string).then(res => {
        if(res.succeeded && res.data) {
          setNotifications(res.data.items)
        }
      });
    }
  }, [userState.loaded, userState.data])

  console.log(notifications);
  console.log(notifications.length);
  
  useEffect(() => {
    const interval = setInterval(() => {
      updateNotify();
    }, 5000);
    return () => {
      clearInterval(interval);
    }
  }, [notifications.length, updateNotify])

  return (
    <Panel>
      {userState.loaded
      && <IconButton size="medium">
          <Badge badgeContent={notifications.length} color="secondary" overlap="rectangular">
            <NotificationsIcon/>
          </Badge>
        </IconButton> 
      }

      <IconButton size="medium" onClick={darkMode.toggle}>
      {darkMode.value 
            ? <DarkModeIcon/>
            : <LightModeIcon/>}
      </IconButton>
    </Panel>
  );
}

export default UserPanel;