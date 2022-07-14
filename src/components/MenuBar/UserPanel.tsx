import { FC, useCallback, useEffect, useState } from "react"; 
import {useAppDispatch, useAppSelector} from "../../app";
import styled from "styled-components";
import { getUserNotify } from "../../app/services/UserService";
import {Notifications as NotificationsIcon, WbSunnyOutlined as LightModeIcon, NightsStayOutlined as DarkModeIcon} from "@material-ui/icons/"
import {
  Box,
  IconButton,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography
} from "@material-ui/core";
import { DataGrid, GridColDef, GridRowData } from "@material-ui/data-grid";
import useDarkMode from "use-dark-mode";
import { INotify } from "../../interfaces/INotify";
import router from "next/router";

const Panel = styled.div`
    border-radius: 4px;
    /* padding: 10px; */
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`;

const UserPanel : FC = () => {

  const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 150,
        editable: false,
    },
    {
        field: 'message',
        headerName: 'Message',
        width: 150,
        editable: false,
    },
    {
        field: 'createdAt',
        headerName: 'CreatedAt',
        width: 102,
        editable: false,
        type: 'date',
        valueGetter: ({ value }) => value && new Date(value as string)
    }
  ];

  const NotifyTests : INotify[] = [
    {
      id: "1",
      message: 'Test 1',
      type: "event_invite",
      subject: 'Test 1',
      user: '1',
      createdAt: new Date('2020-01-02T03:04:05.678Z'),
      seenAt: new Date('2020-01-02T03:04:05.678Z')
    },
    {
      id: "2",
      message: 'Test 2',
      type: "event_invite",
      subject: 'Test 2',
      user: '1',
      createdAt: new Date('2020-01-02T03:04:05.678Z'),
      seenAt: new Date('2020-01-02T03:04:05.678Z')
    },
    {
      id: "3",
      message: 'Test 3',
      type: "event_invite",
      subject: 'Test 3',
      user: '1',
      createdAt: new Date('2020-01-02T03:04:05.678Z'),
      seenAt: new Date('2020-01-02T03:04:05.678Z')
    }
  ];

  const darkMode = useDarkMode();
  
  const userState = useAppSelector(state => state.user)

  const [notifications, setNotifications] = useState<INotify[]>([]);
  const [notifyDialogOpen, setNotifyDialogOpen] = useState(false);

  const goToInvite = (inviteId : string) => {
    router.push(`/invite/${inviteId}`);
  }
  
  const updateNotify = useCallback(() => {
    if(userState.loaded && userState.data) {
      getUserNotify(userState.data?.id as string).then(res => {
        if(res.succeeded && res.data) {
          setNotifications(res.data.items);
        }
      });
    }
  }, [userState.data, userState.loaded])

  // console.log(notifications);
  
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
      && <IconButton size="medium" onClick={() => setNotifyDialogOpen(true)}>
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


      <Dialog open={notifyDialogOpen}>
        <DialogTitle>Notifications</DialogTitle>
        <DialogContent>
          {notifications.length != 0
            ?notifications.map((notify, index) => {
                if(notify.type == "event_invite")
                {
                  return (
                    <Box key={index} onClick={() => goToInvite(notify.id)}>
                      <Typography variant="body1" color="primary">{notify.message}</Typography>
                    <Divider/>
                    </Box>
                  )
                }})
            : <Typography variant="body1">No notifications</Typography>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNotifyDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Panel>
  );
}

export default UserPanel;