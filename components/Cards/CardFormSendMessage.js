import React,{useState,useEffect} from 'react';
import {Formik,Form} from 'formik'
import * as Yup from 'yup'

import {TextAreaField} from '../../components/Fields/TextAreaField';
import {TextField} from '../../components/Fields/TextField';
export default function FormSendMessage ({message,phones,socket}) {
    const [input,setInput] = useState(false);
    const [allPhones,setAllPhones] = useState([]);
    const validate = Yup.object({
        message:Yup.string()
          .required('requerido'),
        phones:Yup.array(),
        phone:Yup.string()
          
    })
    /*useEffect(() => {
      
    }, [input])*/
    return(
        <>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  ( "text-blueGray-700")
                }
              >
                ENVIAR MENSAJES
              </h3>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">

          <div className="relative">
                  
          <Formik
            enableReinitialize
            initialValues={{
              message:message?message:'',
              phones:allPhones?allPhones:[],
              phone:''
            }}
            validationSchema ={validate}
            onSubmit= {values=>{
              console.log(values)
              socket.emit('message',{
                phones:values.phones.length>0?values.phones:[values.phone],
                message:values.message
              });
            }}
          >
            
          {(formik)=>(
            <Form className="mx-4 my-4 relative p-6 flex flex-wrap">
                <div className="w-full px-4">
                    
                  </div>
              <div className="w-full lg:w-6/12 px-4">
                <TextAreaField
                  label="Mensaje"
                  name="message"
                  type="text"
                  placeholder="Ingrese su mensaje"
                  rows="4"
                />
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <label className="inline-flex items-center cursor-pointer relative w-full mb-8">
                      <input
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        checked={input}
                        onChange={()=>{
                          setInput(!input)
                          if(phones.data && !input){
                            setAllPhones( phones.data.data.phones.map((phone)=>{
                              return phone.phone
                            }))
                          }else{
                            setAllPhones([])
                          }
                        }}
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Enviar a todos los numeros registrados
                      </span>
                </label>
                <TextField
                  label="Ingrese un numero de celular"
                  name="phone"
                  type="text"
                  disabled={input}
                />
              </div>
              <button
                className="mx-4 bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Enviar
              </button>
            </Form>
          )}
          </Formik>
          </div>
        </div>
      </div>
            
        </>
        
    )
}



