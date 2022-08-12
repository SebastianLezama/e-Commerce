import React from "react";
import "./CardModal.scss";
import { MdClose } from "react-icons/md";
import Counter from "../../Counter/Counter";

const CardModal = ({
  item,
  handleClose,
  showModal,
  modalRef,
  closeModal,
  showItemInCart,
  notInCart,
}) => {
  return (
    <>
      {showModal && (
        <div className="cardDetail" ref={modalRef} onClick={closeModal}>
          <div className="divModal">
            <div className="infoModal">
              <h1>Detalle del producto</h1>
              <h2>{item.name}</h2>
              <p>${item.price}</p>
              <Counter item={item} />
              {notInCart && showItemInCart()}
            </div>
            <div className="imgModal">
              <img src={item.img} alt={item.name} />
            </div>
            <MdClose className="mdClose" onClick={handleClose} />
          </div>
        </div>
      )}
    </>
  );
};

export default CardModal;
