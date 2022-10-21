import { FC, useCallback, useEffect, useState } from "react";
import {useAppSelector} from "../../app";
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
  Typography, Avatar, Tooltip
} from "@material-ui/core";
import useDarkMode from "use-dark-mode";
import { INotify } from "../../interfaces/INotify";
import router from "next/router";
import { updateNotify } from "../../app/services/NotifyService";
import AccountMenu from "./UserPanel/AccountMenu";

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

  const toUniqueNotifies = (notifies: INotify[]) => {
    const result: INotify[] = [];

    notifies.forEach(notify => {
      if (!result.find(n => n.context === notify.context)) {
        result.push(notify);
      }
      else{
        deleteNotify(notify);
      }
    });
    return result;
  }

  const deleteNotify = (notify: INotify) => {
    return updateNotify({notify});
  }

  const darkMode = useDarkMode();

  const userState = useAppSelector(state => state.user)

  const [notifications, setNotifications] = useState<INotify[]>([]);
  const [notifyDialogOpen, setNotifyDialogOpen] = useState(false);

  const getNotifiesCount = () => {
    return notifications.filter(x => x.seenAt == null).length;
  }

  const goToInvite = (notify : INotify) => {

    setNotifyDialogOpen(false);

    const inviteRef = notify.context.invite_id;

    if(inviteRef == "")
      return;

    const inviteID = inviteRef.split("/")[3];

    notify = {
      ...notify,
      seenAt: new Date()
    };

    deleteNotify(notify).then((promise) => {
      if(promise.succeeded)
      {
        router.push(`/invite/${inviteID}`);
      }
    });
  }

  const updateNotifies = useCallback(() => {
    if(userState.loaded && userState.data) {
      getUserNotify(userState.data?.id as string).then(res => {
        if(res.succeeded && res.data) {
          setNotifications(res.data.items);
        }
      });
    }
  }, [userState.data, userState.loaded])

  useEffect(() => {
    const interval = setInterval(() => {
      updateNotifies();
    }, 5000);
    return () => {
      clearInterval(interval);
    }
  }, [notifications.length, updateNotifies])

  let userPart = null;

  if (userState.loaded && userState.data) {
    userPart = (
        <>
          <AccountMenu user={userState.data} />

          <IconButton size="medium" onClick={() => setNotifyDialogOpen(true)}>
            <Badge badgeContent={getNotifiesCount()} color="secondary" overlap="rectangular">
              <NotificationsIcon/>
            </Badge>
          </IconButton>

          <Dialog open={notifyDialogOpen}>
            <DialogTitle>Notifications</DialogTitle>
            <DialogContent>
              {getNotifiesCount() != 0
                  ?toUniqueNotifies(notifications).map((notify, index) => {
                    if(notify.type == "event_invite" && notify.seenAt == null)
                    {
                      return (
                          <Box key={index} onClick={() => goToInvite(notify)}>
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
        </>
    );
  }

  return (
    <Panel>
      {userPart}

      <IconButton size="medium" onClick={darkMode.toggle}>
      {darkMode.value
      ? <DarkModeIcon/>
      : <LightModeIcon/>}
      </IconButton>
    </Panel>
  );
}

export default UserPanel;

function UpdateNotifyProps(arg0: { notify: INotify; }, UpdateNotifyProps: any) {
  throw new Error("Function not implemented.");
}
