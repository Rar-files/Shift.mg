import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  DatePicker
} from "material-ui-pickers";

type Props = {
    name: string;
    label: string;
}

const DateInput: FC<Props> = ({name, label}) => {
    const { 
        control,
        formState: {errors}
    } = useFormContext();

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Controller
                name={name}
                control={control}
                defaultValue=""
                render={({ field: { ref, ...field } }) => (
                    <DatePicker  
                        {...field}
                        label={label}
                        clearable
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        format="MM/dd/yyyy"
                        placeholder="02/04/2005"
                    />
                )}
            />
        </MuiPickersUtilsProvider>
    );
};

export default DateInput;