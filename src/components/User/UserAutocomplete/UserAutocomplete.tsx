import {Autocomplete} from "@material-ui/lab";
import {CircularProgress, TextField} from "@material-ui/core";
import {useState} from "react";
import {getUsersByUsername} from "../../../app/services/UserService";
import {emailIsValid} from "../../../app/helpers/functions";

interface IOption {
    id: string;
    email: string;
    displayName: string;
}

interface UserAutocompleteProps {
    onlyExistingUsers: boolean;
}

export default function UserAutocomplete (props: UserAutocompleteProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [options, setOptions] = useState<IOption[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchOptions = (keyword: string) => {
        if (keyword.length === 0) {
            setOptions([]);
            return;
        }

        setLoading(true);
        getUsersByUsername(keyword).then((promise) => {
            if (promise.data?.items !== undefined) {
                setOptions(promise.data?.items.map((user) => {
                    return {id: user.id, email: user.username, displayName: user.displayName};
                }));
            } else {
                setOptions([]);
            }

            setLoading(false);
        });
    };

    return (
        <Autocomplete
            multiple
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
                setOptions([]);
            }}
            onInputChange={(event, value, reason) => {
                fetchOptions(value);
            }}
            filterOptions={(options, state) => {
                if (options.length === 0 && state.inputValue !== '' && emailIsValid(state.inputValue) && !props.onlyExistingUsers) {
                    options.push({
                        id: '',
                        email: state.inputValue,
                        displayName: `Invite "${state.inputValue}" by email`
                    })
                } else if (options.length === 0) {
                    options.push({
                        id: '',
                        email: '',
                        displayName: 'No matches found'
                    });
                }
                return options;
            }}
            loading={loading}
            options={options}
            getOptionSelected={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.id !== '' /*&& option.email !== ''*/ ? option.email : option.displayName}
            getOptionDisabled={(option) => option.displayName === 'No matches found'}
            selectOnFocus
            clearOnBlur
            freeSolo
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
                />
            )}
        />
    );
}
