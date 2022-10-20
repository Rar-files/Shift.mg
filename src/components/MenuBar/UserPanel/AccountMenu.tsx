import {useState, MouseEvent, FC} from "react";
import {Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@material-ui/core";
import {PersonAdd, Settings, Lock} from "@material-ui/icons";
import {useRouter} from "next/router";
import { IUser } from "../../../interfaces/IUser";
import {deepOrange} from "@material-ui/core/colors";
import styled from "styled-components";

type AccountMenuProps = {
    user: IUser;
}

const UserAvatar = styled(Avatar)<{
    color: string;
}>`
    width: 28;
    height: 28;
    padding: 4;
    border: 3px solid ${props => props.color};
`;

const AccountMenu: FC<AccountMenuProps> = (props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const router = useRouter();
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const userBackgroundColor = '#' + props.user.id.slice(0, 6);

    const displayName = props.user.displayName.toUpperCase().split(' ');
    let initials = displayName[0][0];
    if(displayName.length>1)
        initials = initials + displayName[1][0];

    return (
        <>
            <Tooltip title="Account settings">
                <IconButton size="small" onClick={handleClick}>
                    <UserAvatar color={userBackgroundColor}>
                        {initials}
                    </UserAvatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    style: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={() => router.push('/logout')}>
                    <ListItemIcon>
                        <Lock fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}

export default AccountMenu;