import Modal from "react-modal";
Modal.setAppElement("#root");

const CommonModal = ({ visible, onClose, children }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "60%",
      width: "70%",
      //   border: "2px solid",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    <Modal
      isOpen={visible}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
      shouldCloseOnOverlayClick={true} // Ensure the modal closes when clicking outside
    >
      {children}
    </Modal>
  );
};

export default CommonModal;
