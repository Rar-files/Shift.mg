import {FormProvider, useForm} from "react-hook-form";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@material-ui/core";
import UserAutocomplete, {IUserOption} from "../../User/UserAutocomplete/UserAutocomplete";
import EventRoleAutocomplete, {IRoleOption} from "../EventRoleAutocomplete/EventRoleAutocomplete";
import {EventInviteDto} from "../../../Dtos/EventInviteDto";
import {CreateEventInvite} from "../../../app/services/event/EventService";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {applyViolationsToForm} from "../../../app/helpers/functions";

const schema = yup.object().shape({
    users: yup.array().of(yup.mixed<IUserOption>()).required(),
    role: yup.mixed<IRoleOption>().required()
});

interface IFormInvite {
    user: IUserOption[];
    role: IRoleOption;
}

interface EventInviteDialogProps {
    open: boolean;
    eventId: string;
    onClose: () => void;
}

const EventInviteDialog = (props: EventInviteDialogProps) => {
    const methods = useForm<IFormInvite>({resolver: yupResolver(schema)});

    const handleInvite = (data: IFormInvite) => {
        data.user.forEach(user => {
            let inviteToPost : EventInviteDto = {
                userEmail: user.email,
                role: data.role.id
            }

            if (user.id !== null) {
                inviteToPost = {
                    user: user.id,
                    role: data.role.id
                };
            }

            CreateEventInvite(props.eventId, inviteToPost).then((response) => {
                if (!response.succeeded) {
                    applyViolationsToForm<IFormInvite>(methods.setError, response.violations);
                }
            });
        })
    };

    const onClose = () => {
        props.onClose();
        methods.reset();
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <FormProvider {...methods}>
                <DialogTitle id="form-dialog-title">Invite member</DialogTitle>
                <DialogContent style={{width: '400px'}}>
                    <Typography>Email address</Typography>
                    <UserAutocomplete onlyExistingUsers={false} name='user'/>
                    <Typography style={{marginTop: '25px'}}>Select a role</Typography>
                    <EventRoleAutocomplete eventId={props.eventId} name='role'/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={methods.handleSubmit(handleInvite)} color="primary">
                        Invite
                    </Button>
                </DialogActions>
            </FormProvider>
        </Dialog>
    );
}

export default EventInviteDialog;
