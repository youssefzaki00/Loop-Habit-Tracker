import { useState } from "react";
import MeasurableModal from "./MeasurableModal";

function MeasurableButton({ habitData, date }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const todayLog = habitData.habitLogs[date];
  const todayCheck = habitData.checkMarks[date];

  return (
    <>
      <div
        style={{ color: todayCheck ? habitData.color : "" }}
        className="customShadow flex flex-col justify-center items-center gap-0 w-12 h-12 p-4  mx-auto relative z-20"
        onClick={toggleModal}
      >
        <p className="font-semibold text-lg">{todayLog || 0}</p>
        <p className="text-xs">{habitData.unit}</p>
      </div>
      <MeasurableModal
        isOpen={isModalOpen}
        closeModal={toggleModal}
        date={date}
        habitData={habitData}
      />
    </>
  );
}
export default MeasurableButton;
