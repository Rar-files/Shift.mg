import {FieldPath} from "react-hook-form";
import {UseFormSetError} from "react-hook-form/dist/types/form";
import {IViolation} from "../services/ApiClient";

export function applyViolationsToForm<Type>(setError: UseFormSetError<Type>, violations: IViolation[], nestedPrefix: string | null = null) {
    for (const violation of violations) {
        if (nestedPrefix !== null) {
            violation.propertyPath = violation.propertyPath.replace(`${nestedPrefix}.`, '');
        }

        setError(violation.propertyPath as FieldPath<Type>, {
            type: 'manual',
            message: violation.message
        });
    }
}

export function emailIsValid (email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function dateToYMD(date: Date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
