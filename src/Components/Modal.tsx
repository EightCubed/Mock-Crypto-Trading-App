import './modal.css';

interface ModalProps {
    show: boolean;
    handleClose: () => void;
    children?: React.ReactNode;
}

const Modal = ({show,children,handleClose}:ModalProps) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  const handleModalClose = (e: any) => {
    e.stopPropagation();
    handleClose();
  };

  return (
    <div className={showHideClassName} onClick={handleModalClose}>
      <section className="modal-main" onClick={handleClick}>
        {children}
        <button type="button" className='close-button' onClick={handleModalClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;