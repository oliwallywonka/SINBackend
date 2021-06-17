import React from 'react';
import {ErrorMessage,useField}  from 'formik'

export const SelectField = ({label,id,children,...props}) => {
    const [field] = useField(props);
    return(
        <div className="relative w-full mb-3">
            <label 
                htmlFor={field.name}
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                {label}
            </label>
            <select 
                {...field} {...props}
                name= {field.name} 
                id = {id}
                className="border-0 px-3 py-3  text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ">
                
                {children}
            </select>
            <ErrorMessage
                component= "div"  
                name={field.name}
                className="text-xs text-red-500 "
            />
        </div>
    )
}