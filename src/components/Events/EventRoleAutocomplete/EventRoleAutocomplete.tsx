import {Autocomplete} from "@material-ui/lab";
import {useEffect, useState} from "react";
import {CircularProgress, TextField} from "@material-ui/core";
import {getRolesForEvent} from "../../../app/services/event/RoleService";
import {Controller, FieldValues, useFormContext} from "react-hook-form";
import {ControllerRenderProps} from "react-hook-form/dist/types/controller";

export interface IRoleOption {
    id: string;
    name: string;
}

export interface EventRoleAutocompleteProps {
    eventId: string;
    name: string;
}

export default function EventRoleAutocomplete(props: EventRoleAutocompleteProps) {
    const [options, setOptions] = useState<IRoleOption[]>([]);
    const [loading, setLoading] = useState(true);
    const [localValue, setLocalValue] = useState<IRoleOption | null>(null);

    const {
        control,
        setValue,
        formState: {errors}
    } = useFormContext();

    useEffect(() => {
        getRolesForEvent(props.eventId).then((promise) => {
            if (promise.data?.items !== undefined) {
                const retrievedOptions = promise.data?.items.map((role) => {
                    return {id: role.id, name: role.name} as IRoleOption;
                });

                setOptions(retrievedOptions);
                setLocalValue(retrievedOptions[0]);
                setValue(props.name, retrievedOptions[0]);
                setLoading(false);
            }
        });
    }, []);

    const onChange = (field: any, data: IRoleOption | null) => {
        field.onChange(data);
        setLocalValue(data);
    };

    // @ts-ignore
    return (
        <Controller
            name={props.name}
            control={control}
            render={({ field }) => (
                <Autocomplete
                    {...field}
                    options={options}
                    onChange={(e, data : IRoleOption | null) => onChange(field, data)}
                    value={localValue}
                    loading={loading}
                    disabled={loading}
                    getOptionSelected={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => option.name}
                    disableClearable={true}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                            error={!!errors[props.name]}
                            helperText={errors[props.name]?.message}
                        />
                    )}
                />
            )}
        />
    );
}
