import { FC } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, 
} from "@material-ui/core";

import {FormProvider, useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {applyViolationsToForm} from "../../../app/helpers/functions";
import {DateRangeInput, TextInput} from "../../Form";
import { IShift } from "../../../interfaces/IShift";
import { CreateShift } from "../../../app/services/event/ShiftService";

const schema = yup.object().shape({
    name: yup.string().required().min(4)
});

interface IFormAddShift {
    name: string;
    startDate: Date;
    endDate: Date;
}

type EventAddShiftDialogProps = {
    open: boolean;
    eventId: string;
    onClose: (shiftAdded: boolean) => void;
}

const EventAddShiftDialog : FC<EventAddShiftDialogProps> = (props) => {
    const methods = useForm<IFormAddShift>({resolver: yupResolver(schema)});

    const handleCreate = (data: IFormAddShift) => {
        let shift : IShift = {
            ...data,
            event: props.eventId,
            code: '',
            members: [],
        }

        CreateShift(shift).then((response) => {
            if (!response.succeeded) {
                applyViolationsToForm<IFormAddShift>(methods.setError, response.violations);
            } else {
                onClose(true);
            }
        });
    };

    const onClose = (shiftAdded: boolean = false) => {
        props.onClose(shiftAdded);
        methods.reset();
    }

    return (
        <Dialog open={props.open} onClose={() => onClose()} aria-labelledby="form-dialog-title">
            <FormProvider {...methods}>
                <DialogTitle id="form-dialog-title">Add shift</DialogTitle>
                <DialogContent style={{width: '400px'}}>
                    <TextInput name='name' label='Shift name'/>
                    <DateRangeInput startName="startDate" endName="endDate" label="Shift time:" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose()} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={methods.handleSubmit(handleCreate)} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </FormProvider>
        </Dialog>
    );
}

export default EventAddShiftDialog;