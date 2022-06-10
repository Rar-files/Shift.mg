import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FieldValues } from "react-hook-form";
import * as yup from 'yup';

const useMethods = <TFormValues extends FieldValues>(schema: yup.ObjectSchema<any>) => 
    useForm<TFormValues>({resolver: yupResolver(schema)});

export default useMethods;