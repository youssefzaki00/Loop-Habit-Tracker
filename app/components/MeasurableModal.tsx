import { useState } from "react";
import { useUser } from "../context/userContext";
import { useHabits } from "../context/allHabitsContext";
import logMeasurableHabit from "../utils/logMeasurableHabit";
import { measurableHabit } from "../interfaces";
import calculateHabitScore from "../utils/calculateScore";
import generateHabitSummary from "../utils/generateHabitSummary";

interface MeasurableModalProps {
  isOpen: boolean;
  closeModal: () => void;
  date: string;
  habitData: measurableHabit;
}

const MeasurableModal: React.FC<MeasurableModalProps> = ({
  isOpen,
  closeModal,
  date,
  habitData,
}) => {
  // const [log, setLog] = useState<Number>(0);
  const { user, loading } = useUser();
  const { habits, setHabits } = useHabits();
  const [log, setLog] = useState(habitData.habitLogs[date] || 0);
  const handleLog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const checkCheckMark = () => {
      if (habitData.targetType.toLowerCase().trim() == "at least") {
        if (habitData.target < log) {
          return { ...habitData.checkMarks, [date]: true };
        } else {
          return { ...habitData.checkMarks, [date]: false };
        }
      } else if (habitData.targetType.toLowerCase().trim() == "at most") {
        if (habitData.target < log) {
          return { ...habitData.checkMarks, [date]: false };
        } else {
          return { ...habitData.checkMarks, [date]: true };
        }
      }
    };
    const newCheckMarks = checkCheckMark();
    const newScore = calculateHabitScore(newCheckMarks);
    const newLogs = { ...habitData.habitLogs, [date]: log };
    const habitSummary = generateHabitSummary(newCheckMarks);

    const habitlogged = {
      ...habitData,
      habitSummary: habitSummary,
      habitScore: newScore,
      habitLogs: newLogs,
      checkMarks: newCheckMarks,
    };
    logMeasurableHabit(user.uid, habitData.id, habitlogged, habits, setHabits);
    closeModal();
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  if (!isOpen) return null; // If modal is closed, render nothing
  return (
    <div
      onClick={handleClickOutside}
      id="crud-MeasurableModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50"
    >
      <div className="text-white bg-dark2 text-center w-[90%] sm:w-[250px] flex flex-col border-[3px] border-dark5 rounded-md">
        {/* <textarea
          className="bg-dark2 p-4 rounded-t-md shadow-lg border-b-2 border-dark5 block resize-none active:outline-none focus:outline-none placeholder:translate-y-8 placeholder:text-lg placeholder:font-medium placeholder:text-center focus-within:placeholder:opacity-0"
          name="note"
          id="note"
          cols={4}
          rows={4}
          placeholder="Note"
        ></textarea> */}

        <form onSubmit={handleLog} className="flex items-center">
          <input
            autoFocus
            type="number"
            name="count"
            id="count"
            min={0}
            value={log}
            onChange={(e) => setLog(Number(e.target.value))}
            className="bg-dark2 p-4 w-1/2 rounded-l-md border-r-2 border-dark5  active:outline-none focus:outline-none text-center"
          />
          <button
            type="submit"
            className="text-white w-1/2 font-medium bg-dark2 p-4  active:outline-none focus:outline-none customShadow rounded-none active:scale-100 uppercase"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default MeasurableModal;
