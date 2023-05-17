import React, { useState } from "react";

import styles from "./modalforpatientdetails.module.scss";
// import { Modal } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const CustomModal = ({ children, open, modalState }) => {
  const [show, setShow] = useState(open);

  const handleClose = () => {
    setShow(false);

    return modalState(false);
  };

  return (
    <Modal
      autoFocus
      centered
      show={show}
      onHide={handleClose}
      contentClassName={styles["modaledit"]}
    >
      <iframe>{children}</iframe>
    </Modal>
  );
};

export default CustomModal;
