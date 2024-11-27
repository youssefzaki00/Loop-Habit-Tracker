import { useSignout } from "../auth/auth";
import Loading from "../Loading/Loading";

interface ChooseModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const SignoutModal: React.FC<ChooseModalProps> = ({ isOpen, closeModal }) => {
  const { error, isLoading, signOutUser } = useSignout();
  // Close modal on clicking outside of it
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  const handleSignout = () => {
    signOutUser();
  };
  if (!isOpen) return null; // If modal is closed, render nothing
  if (isLoading) return <Loading />;
  return (
    <div
      onClick={handleClickOutside}
      id="crud-MeasurableModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50"
    >
      <div className="text-white bg-dark2 text-center w-[90%] sm:w-[250px] flex flex-col border-[3px]  border-dark5 rounded-md ">
        <p className="text-xl font-semibold capitalize p-4 mb-4">
          are you sure want to signout?
        </p>
        <span className="w-full h-[2px] bg-dark5"></span>
        <div className="flex items-center ">
          <button
            disabled={isLoading}
            onClick={handleSignout}
            type="button"
            className="text-white w-full font-medium bg-dark2 p-4 active:outline-none focus:outline-none customShadow rounded-none active:scale-100 uppercase hover:bg-red-600 border-r-2 border-dark5"
          >
            yes
          </button>
          <span className="h-full w-[2px] bg-dark5"></span>
          <button
            onClick={closeModal}
            type="button"
            className="text-white w-full font-medium bg-dark2 p-4 active:outline-none focus:outline-none customShadow rounded-none active:scale-100 uppercase hover:bg-green-600"
          >
            no
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignoutModal;
