import React from 'react';
import {ErrorMessage,useField}  from 'formik'

export const TextField = ({label, ...props}) => {
    const [field] = useField(props);
    return(
        <div className="relative w-full mb-3">
            <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor= {field.name}
            >
                {label}
            </label>
            <input
                {...field} {...props}
                className={`border-0 px-3 py-3  text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 `}
                placeholder={label}
                autoComplete= "false"
            />
            <ErrorMessage
                component= "div"  
                name={field.name}
                className="text-xs text-red-500 "
            />
        </div>
    )
}