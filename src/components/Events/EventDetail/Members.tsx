import { FC, useEffect, useState } from "react";

import styled from "styled-components";
import {
    Box, 
    Button, 
    Divider, 
    Typography 
} from "@material-ui/core";
import {
    AddBox as AddBoxIcon, 
    Delete as DeleteIcon, 
} from "@material-ui/icons/";
import {
    DataGrid, 
    GridColDef, 
    GridRowData, 
    GridSelectionModel
} from "@material-ui/data-grid";

import EventInviteDialog from "../EventInviteDialog/EventInviteDialog";
import { IMember } from "../../../interfaces/IMember";
import Loading from "../../Loading";
import { DeleteMember, getMembersForEvent } from "../../../app/services/event/MemberService";

const ButtonSeperator = styled.div`
    padding: 6px;
`;

type MembersListProps = {
    eventId: string;
}

const Members : FC<MembersListProps> = (props) => {

    /* COMPONENT DATA STATES */
    const [state, setState] = useState<IMember[] | null>(null);
    const [selectionMembers, setSelectionMembers] = useState<GridSelectionModel>([]);

    /* DIALOG OPEN STATES */
    const [inviteOpen, setInviteOpen] = useState(false);


    const deleteSelectedMembers = () => {
        const selectedIDs = new Set(selectionMembers);
        
        selectedIDs.forEach((id) => {
            DeleteMember(id as string).then((promise) => {
                if(!promise.succeeded)
                {
                    //TODO: Add action if issue with delete event member
                }
            });
        });

        window.location.reload()
    }

    let rows: GridRowData[] = [];

    if (state !== null) {
        rows = state?.map((member: IMember) => {
            return {id: member.id, displayName: member.user.displayName, role: member.role.name};
        });
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'displayName',
            headerName: 'Nazwa',
            width: 150,
            editable: true,
        },
        {
            field: 'role',
            headerName: 'Rola',
            type: 'number',
            width: 110,
            editable: true,
        }
    ];

    useEffect(() => {
        if (state === null) {
            getMembersForEvent(props.eventId).then((promise) => {
                setState(promise.data?.items as IMember[]);
            });
        }
    }, [props.eventId, state]);

    return (
        <>
            <Box padding={'10px'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
                {selectionMembers.length > 0 && <Button variant="contained" color="primary" size="small" onClick={() => deleteSelectedMembers()}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
                }

                <ButtonSeperator/>

                <Button variant="contained" color="primary" size="small" onClick={() => setInviteOpen(true)}>
                    <AddBoxIcon fontSize="small" />
                    Invite
                </Button>
                <EventInviteDialog open={inviteOpen} eventId={props.eventId} onClose={() => setInviteOpen(false)} />
            </Box>

            <Divider />
            
            <Box padding={'0px'} style={{height: 250, border: '0px'}}>
                {state === null &&
                    <Loading/>
                }
                {state !== null &&
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        checkboxSelection
                        disableSelectionOnClick
                        onSelectionModelChange={(ids) => {
                            setSelectionMembers(ids);
                        }}
                    />
                }
            </Box>
        </>
    );
}

export default Members;