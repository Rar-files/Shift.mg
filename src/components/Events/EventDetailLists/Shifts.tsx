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

import Loading from "../../Loading";
import { IShift } from "../../../interfaces/IShift";
import { deleteShift, getShiftsForEvent } from "../../../app/services/event/ShiftService";
import EventAddShiftDialog from "../Dialogs/EventAddShiftDialog";

const ButtonSeperator = styled.div`
    padding: 6px;
`;

type ShiftsListProps = {
    eventId: string;
}

const Shifts : FC<ShiftsListProps> = (props) => {

    /* COMPONENT DATA STATES */
    const [state, setState] = useState<IShift[] | null>(null);
    const [selectionShifts, setSelectionShifts] = useState<GridSelectionModel>([]);

    /* DIALOGS OPEN STATES */
    const [addShiftOpen, setAddShiftOpen] = useState(false);

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
        rows = state?.map((shift: IShift) => {
            return {id: shift.id, name: shift.name};
        });
    }

    const onAddShiftDialogClose = (shiftAdded: boolean) => {
        setAddShiftOpen(false);

        if (shiftAdded) {
            setState(null);
        }
    };

    const deleteSelectedShifts = () => {
        const selectedIDs = new Set(selectionShifts);
        
        selectedIDs.forEach((id) => {
            deleteShift(id as string).then((promise) => {
                if(!promise.succeeded)
                {
                    //TODO: Add action if issue with delete event shift
                }
            });
        });

        window.location.reload()
    }


    useEffect(() => {

        if (state === null) {
            getShiftsForEvent(props.eventId).then((promise) => {
                setState(promise.data);
            });
        }
    }, [props.eventId, state]);


    return (
        <>
            <Box padding={'10px'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
                {selectionShifts.length > 0 && <Button variant="contained" color="primary" size="small" onClick={() => deleteSelectedShifts()}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
                }

                <ButtonSeperator/>

                <Button variant="contained" color="primary" size="small" onClick={() => setAddShiftOpen(true)}>
                    <AddBoxIcon fontSize="small" />
                    Create
                </Button>

                <EventAddShiftDialog open={addShiftOpen} eventId={props.eventId} onClose={onAddShiftDialogClose} />
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
                            setSelectionShifts(ids);
                        }}
                    />
                }
            </Box>
        </>
    );
}



export default Shifts;