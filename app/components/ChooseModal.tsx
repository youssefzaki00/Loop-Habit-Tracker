import Link from "next/link";

interface ChooseModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ChooseModal: React.FC<ChooseModalProps> = ({ isOpen, closeModal }) => {
  // Close modal on clicking outside of it
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!isOpen) return null; // If modal is closed, render nothing

  return (
    <div
      onClick={handleClickOutside}
      id="crud-ChooseModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50"
    >
      <div className="text-white text-center w-[90%] sm:w-[500px] space-y-4 p-6 flex flex-col gap-2">
        {/* Option 1 with press visual effect */}
        <Link href="/createHabit/BooleanHabit" passHref>
          <div className="bg-dark3 p-4 rounded-md shadow-lg cursor-pointer transform transition-all duration-300 hover:bg-dark4 hover:shadow-xl active:scale-95 border-2 border-white  block">
            <h3 id="modal-title" className="text-lg font-bold">
              Yes or No
            </h3>
            <p className="text-sm mt-2">
              e.g. Did you wake up early today? Did you exercise? Did you play
              chess?
            </p>
          </div>
        </Link>

        {/* Option 2 with press visual effect */}
        <Link href="/createHabit/MeasurableHabit" passHref>
          <div className="bg-dark3 p-4 rounded-md shadow-lg cursor-pointer transform transition-all duration-300 hover:bg-dark4 hover:shadow-xl active:scale-95 border-2 border-white block">
            <h3 className="text-lg font-bold">Measurable</h3>
            <p className="text-sm mt-2">
              e.g. How many miles did you run today? How many pages did you
              read?
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ChooseModal;
