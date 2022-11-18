import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControlLabel,
    FormGroup,
    Typography
} from "@material-ui/core";
import {FormProvider, useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {applyViolationsToForm} from "../../../app/helpers/functions";
import {TextInput} from "../../Form";
import {IRole} from "../../../interfaces/IRole";
import {CreateRole} from "../../../app/services/event/RoleService";
import {FC, useState} from "react";

const schema = yup.object().shape({
    name: yup.string().required().min(4)
});

interface IFormAddRole {
    name: string;
}

type EventAddRoleDialogProps = {
    open: boolean;
    eventId: string;
    onClose: (roleAdded: boolean) => void;
}

interface IPermissions {
    [key: string]: boolean;
}

const EventAddRoleDialog : FC<EventAddRoleDialogProps> = (props) => {
    const methods = useForm<IFormAddRole>({resolver: yupResolver(schema)});
    const [permissions, setPermissions] = useState<IPermissions>({write: false, invite: false});

    const handleCreate = (data: IFormAddRole) => {
        let perms = ['event.read'];
        Object.keys(permissions).forEach((type) => {
            if (permissions[type]) {
                perms.push(`event.${type}`);
            }
        });

        let role : IRole = {
            name: data.name,
            permissions: perms,
            event: props.eventId
        }

        CreateRole(role).then((response) => {
            if (!response.succeeded) {
                applyViolationsToForm<IFormAddRole>(methods.setError, response.violations);
            } else {
                onClose(true);
            }
        });
    };

    const onClose = (roleAdded: boolean = false) => {
        props.onClose(roleAdded);
        methods.reset();
    }

    const onPermissionChange = (type: string, checked: boolean) => {
        setPermissions({...permissions, [type]: checked});
    };

    return (
        <Dialog open={props.open} onClose={() => onClose()} aria-labelledby="form-dialog-title">
            <FormProvider {...methods}>
                <DialogTitle id="form-dialog-title">Add role</DialogTitle>
                <DialogContent style={{width: '400px'}}>
                    <TextInput name='name' label='Role name'/>
                    <Typography style={{marginTop: '25px'}}>Permissions</Typography>
                    <FormGroup>
                        <FormControlLabel disabled control={<Checkbox defaultChecked={true} />} label="Read" />
                        <FormControlLabel control={<Checkbox checked={permissions.invite} onChange={(event) => onPermissionChange('invite', event.target.checked)} />} label="Invite" />
                        <FormControlLabel control={<Checkbox checked={permissions.write} onChange={(event) => onPermissionChange('write', event.target.checked)} />} label="Write" />
                    </FormGroup>
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
};

export default EventAddRoleDialog;
