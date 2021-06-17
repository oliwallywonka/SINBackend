import React,{useState,useEffect,useContext} from "react";
import IO from 'socket.io-client';
import ModalContext from '../../context/modals/ModalContext'
import { useQuery } from "react-query";
// components
import QRCode from "react-qr-code";
import FormMessage from '../../components/Cards/CardFormSendMessage';
import CardPhones from '../../components/Cards/CardPhoneTable';
import CardMessage from '../../components/Cards/CardMessage';
import CardCaptured from '../../components/Cards/CardCaptured';
import CardCapturedLive from '../../components/Cards/CardCapturedLive';
import ModalPhone from '../../components/Modals/PhoneModal';
import ModalMessage from '../../components/Modals/MessageModal';

// layout for page
import Admin from "layouts/Admin.js";

export default function Spammer() {
  const [socket,setSocket] = useState(IO('http://localhost:8000',{transports:['websocket']}));
  const [message,setMessage] = useState(null);
  const [pageData,setPageData] = useState([]);
  const phones = useQuery('PHONES');
  const {visible,name} = useContext(ModalContext);
  const [qr,setQr] = useState(null);
  const [connectedStatus,setConnectedStatus] = useState('disconnected');
  useEffect(()=>{
    socket.on('qr',payload=>{
      setQr(payload);
    })
    socket.on('status',payload=>{
      setConnectedStatus(payload.status);
    })
    socket.on('page',payload=>{
      setPageData(oldData => [...oldData,payload]);
    })
    return (()=>{
      socket.disconnect();
    })
  },[])
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-6/12 px-4 mt-32">
            <CardMessage setMessage={setMessage}/>
          </div>
         
        <div className="w-full lg:w-6/12 px-4">
          <div className ="mt-32">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded h-350-px">
              { 
                connectedStatus === 'disconnected'
                ?qr
                  ?<QRCode value={qr}/>
                  :<div>Connectando....</div>
                :<FormMessage message={message} phones={phones} socket={socket} />
              }
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardPhones/>
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardCaptured/>
        </div>

        <div className="w-full lg:w-4/12 px-4">
          <CardCapturedLive pageData={pageData}/>
        </div>

        {visible && name === 'phone'?<ModalPhone/>:null}
        {visible && name === 'message'?<ModalMessage/>:null}
      </div>
    </>
  );
}

Spammer.layout = Admin;