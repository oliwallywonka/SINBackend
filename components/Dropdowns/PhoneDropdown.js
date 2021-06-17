import React, {useContext}from "react";
import { createPopper } from "@popperjs/core";

import ModalContext from '../../context/modals/ModalContext'
import { useDesactivatePhone } from "hooks/usePhone";

const NotificationDropdown = ({phone}) => {
  const {showModal} = useContext(ModalContext);
  const [handleDesactivateRequest] = useDesactivatePhone();

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        onClick={()=>setDropdownPopoverShow(false)}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={()=> showModal(
            {
                _id: phone._id,
                phone: phone.phone
            },
            'phone'
            )}
        >
          Editar
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={()=> handleDesactivateRequest({_id:phone._id})}
        >
          Desactivar
        </a>
      </div>
    </>
  );
};

export default NotificationDropdown;
