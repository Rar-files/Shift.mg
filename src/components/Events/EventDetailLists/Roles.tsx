import { FC, useEffect, useState } from "react";

import styled from "styled-components";
import {
    Box, 
    Button, 
    Divider,  
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

import EventAddRoleDialog from "../Dialogs/EventAddRoleDialog";
import { IRole } from "../../../interfaces/IRole";
import { DeleteRole, getRolesForEvent } from "../../../app/services/event/RoleService";
import Loading from "../../Loading";

const ButtonSeperator = styled.div`
    padding: 6px;
`;

type RolesListProps = {
    eventId: string;
}

const Roles : FC<RolesListProps> = (props) => {

    /* COMPONENT DATA STATES */
    const [state, setState] = useState<IRole[] | null>(null);
    const [selectionRoles, setSelectionRoles] = useState<GridSelectionModel>([]);

    /* DIALOG OPEN STATES */
    const [addRoleOpen, setAddRoleOpen] = useState(false);

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
    ];

    let rows: GridRowData[] = [];

    if (state !== null) {
        rows = state?.map((role: IRole) => {
            return {id: role.id, name: role.name};
        });
    }

    const onAddRoleDialogClose = (roleAdded: boolean) => {
        setAddRoleOpen(false);

        if (roleAdded) {
            setState(null);
        }
    };

    const deleteSelectedRoles = () => {
        const selectedIDs = new Set(selectionRoles);
        
        selectedIDs.forEach((id) => {
            DeleteRole(id as string).then((promise) => {
                if(!promise.succeeded)
                {
                    //TODO: Add action if issue with delete event role
                }
            });
        });

        window.location.reload()
    }


    useEffect(() => {

        if (state === null) {
            getRolesForEvent(props.eventId).then((promise) => {
                setState(promise.data?.items as IRole[]);
            });
        }
    }, [props.eventId, state]);

    return (
        <>
            <Box padding={'10px'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
                {selectionRoles.length > 0 && <Button variant="contained" color="primary" size="small" onClick={() => deleteSelectedRoles()}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
                }
                <ButtonSeperator/>

                <Button variant="contained" color="primary" size="small" onClick={() => setAddRoleOpen(true)}>
                    <AddBoxIcon fontSize="small" />
                    Create
                </Button>

                <EventAddRoleDialog open={addRoleOpen} eventId={props.eventId} onClose={onAddRoleDialogClose} />
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
                            setSelectionRoles(ids);
                        }}
                    />
                }
            </Box>
        </>
    );
}


export default Roles;