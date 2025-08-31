import { Button } from '@mui/material';

type ModalProps = {
  children: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({ children, setShowModal }: ModalProps) {
  return (
    <>
      <div className="absolute z-900 flex h-100 w-80 flex-col items-center justify-center rounded-4xl border-3 border-indigo-300 bg-indigo-400 text-4xl shadow-2xl shadow-indigo-400 sm:w-120 md:w-2xl md:text-7xl">
        {children}
        <Button
          className="top-34 w-20 !rounded-4xl !bg-indigo-600 !text-white hover:!bg-indigo-700"
          onClick={() => setShowModal(false)}
        >
          Close
        </Button>
      </div>
    </>
  );
}
export default Modal;
