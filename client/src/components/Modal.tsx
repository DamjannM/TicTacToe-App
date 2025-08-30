import { Button } from '@mui/material';

type ModalProps = {
  children: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({ children, setShowModal }: ModalProps) {
  return (
    <>
      <div className="absolute z-999 flex h-100 w-2xl flex-col items-center justify-center rounded-4xl border-3 border-indigo-300 bg-indigo-400 text-7xl shadow-2xl shadow-indigo-400">
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
