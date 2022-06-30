import {Autocomplete} from "@material-ui/lab";
import {useEffect, useState} from "react";
import {TextField} from "@material-ui/core";
import {getRolesForEvent} from "../../../app/services/event/RoleService";

interface IOption {
    id: string;
    name: string;
}

interface EventRoleAutocompleteProps {
    eventId: string;
}

export default function EventRoleAutocomplete(props: EventRoleAutocompleteProps) {
    const [options, setOptions] = useState<IOption[]>([]);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState<IOption | null>(null);

    useEffect(() => {
        if (!loading) {
            return;
        }

        getRolesForEvent(props.eventId).then((promise) => {
            if (promise.data?.items !== undefined) {
                const retrievedOptions = promise.data?.items.map((role) => {
                    return {id: role.id, name: role.name};
                });

                setOptions(retrievedOptions);
                setValue(retrievedOptions[0]);
                setLoading(false);
            }
        });
    }, [props.eventId, loading, options]);

    return (
        <Autocomplete
            options={options}
            value={value}
            getOptionSelected={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                />
            )}
        />
    );
}
