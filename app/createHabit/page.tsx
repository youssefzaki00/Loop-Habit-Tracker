import Link from "next/link";
import BackButton from "../components/BackButton";

function page() {
  return (
    <div
      id="crud-ChooseModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-dark2"
    >
      <div className="fixed top-0 left-0 w-full bg-dark1 border-b border-gray-600 p-4 flex items-center justify-left gap-6 lg:px-40 z-10">
        {/* Left Arrow (Back) */}
        <Link href="/" passHref>
          <BackButton days={false} />
        </Link>

        {/* Page Title */}
        <h3 className="text-xl sm:text-2xl font-semibold text-white">
          Create habit
        </h3>
      </div>
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
}
export default page;
