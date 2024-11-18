"use client";
import BackButton from "@/app/components/BackButton";
import { useUser } from "@/app/context/userContext";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { booleanHabit } from "@/app/interfaces";
import editHabit from "@/app/utils/editHabit";
import { useHabits } from "@/app/hooks/useHabits";
import addHabit from "@/app/utils/addHabit";

function Page() {
  const { habits, setHabits } = useHabits();
  const { userUid } = useUser();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#3b82f6");
  const [frequency, setFrequency] = useState("Every day");
  const [question, setQuestion] = useState("");
  const [notes, setNotes] = useState("");
  const [isEditMode, setIsEditMode] = useState(false); // State to check if editing
  const [isColorPaletteVisible, setIsColorPaletteVisible] = useState(false); // State for showing the modal
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get query parameters from the URL
  const id = searchParams.get("id");
  const queryName = searchParams.get("name");
  const queryColor = searchParams.get("color");
  const queryFrequency = searchParams.get("frequency");
  const queryQuestion = searchParams.get("question");
  const queryNotes = searchParams.get("notes");

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      setName(queryName || "");
      setColor(queryColor || "#3b82f6");
      setFrequency(queryFrequency || "Every day");
      setQuestion(queryQuestion || "");
      setNotes(queryNotes || "");
    }
  }, [
    searchParams,
    id,
    queryName,
    queryColor,
    queryFrequency,
    queryQuestion,
    queryNotes,
  ]);

  const handleSubmit = async () => {
    if (!name) {
      toast.error("Please fill all required fields.");
      return;
    }

    const habitData: booleanHabit = {
      name,
      color,
      frequency,
      question,
      notes,
      type: "boolean",
      createdAt: new Date(),
      habitScore: {},
      checkMarks: {},
      habitSummary: {},
    };

    const targetHabit = habits.find((e: booleanHabit) => e.id === id);
    const editHabitData: booleanHabit = {
      name,
      color,
      frequency,
      question,
      notes,
      type: "boolean",
      createdAt: targetHabit?.createdAt || new Date(),
      habitScore: targetHabit?.habitScore || {},
      checkMarks: targetHabit?.checkMarks || {},
      habitSummary: targetHabit?.habitSummary || {},
    };

    try {
      if (isEditMode) {
        editHabit(editHabitData, userUid, id, habits, setHabits);
      } else {
        addHabit(habitData, userUid, habits, setHabits);
      }
      router.push("/");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Something went wrong!❌❌");
    }
  };

  // Expanded color palette with 20 colors
  const colorPalette = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A6",
    "#FFD700",
    "#800080",
    "#00FFFF",
    "#FF6347",
    "#8A2BE2",
    "#FF1493",
    "#FF4500",
    "#DA70D6",
    "#00BFFF",
    "#D2691E",
    "#A52A2A",
    "#8B4513",
    "#B22222",
    "#9932CC",
    "#FF8C00",
    "#228B22",
  ];

  const customlabel = "absolute -top-[10px] left-[10px] bg-dark2 px-4 py-[0px]";

  // Ref for the modal content to detect clicks outside of it
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle closing the modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsColorPaletteVisible(false);
      }
    };

    // Add event listener to detect clicks outside of the modal
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Suspense>
      <div className="min-h-screen bg-dark2">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 w-full bg-dark1 border-b border-gray-600 p-4 flex items-center justify-between lg:justify-around z-10">
          <Link href="/" passHref>
            <BackButton days={false} />
          </Link>

          <h3 className="text-xl sm:text-2xl font-semibold text-white">
            Create habit
          </h3>

          <button
            onClick={handleSubmit}
            className="bg-black border uppercase text-white bg-primary-600 px-6 py-2 rounded focus:outline-none focus:ring-4 focus:ring-gray-600 hover:bg-primary-500 transition-all ease-in-out duration-200 w-fit"
          >
            Save
          </button>
        </div>

        {/* Page Content */}
        <div className="py-24 px-4 lg:px-48">
          <form className="space-y-6">
            {/* Name */}
            <div className="flex items-center gap-4 relative">
              <div className="w-full ">
                <label
                  className={`block mb-2 text-sm font-medium text-white ${customlabel}`}
                >
                  Name
                </label>
                <input
                  dir="auto"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full p-4 bg-dark2 text-white border border-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                  placeholder="e.g. Exercise"
                  required
                />
              </div>

              {/* Color Selection Button */}
              <div className="">
                <div
                  onClick={() => setIsColorPaletteVisible(true)}
                  className="w-full  p-3 bg-dark2 text-white border border-gray-600 rounded-lg cursor-pointer flex justify-between items-center"
                >
                  <div
                    style={{ backgroundColor: color }}
                    className="w-8 h-8 rounded-full "
                  ></div>
                </div>
              </div>
            </div>

            {/* Modal for Color Palette */}
            {isColorPaletteVisible && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
                <div
                  ref={modalRef}
                  className="bg-dark2 p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-xl text-white mb-4">Choose a Color</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {colorPalette.map((paletteColor, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setColor(paletteColor);
                          setIsColorPaletteVisible(false); // Close the modal after selecting a color
                        }}
                        className={`w-12 h-12 rounded-full cursor-pointer border-2 ${
                          color === paletteColor
                            ? "border-primary-600"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: paletteColor }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Question */}
            <div className="relative">
              <label
                className={`block mb-2 text-sm font-medium text-white ${customlabel}`}
              >
                Question
              </label>
              <input
                dir="auto"
                type="text"
                name="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="block w-full p-4 bg-dark2 text-white border border-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                placeholder="e.g. Did you exercise today?"
              />
            </div>

            {/* Frequency */}
            <div className="relative">
              <label
                className={`block mb-2 text-sm font-medium text-white ${customlabel}`}
              >
                Frequency
              </label>
              <select
                name="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="block w-full p-4 bg-dark2 text-white border border-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600"
              >
                <option>Every day</option>
                <option>Every week</option>
                <option>Every month</option>
              </select>
            </div>

            {/* Notes */}
            <div className="relative">
              <label
                className={`block mb-2 text-sm font-medium text-white ${customlabel}`}
              >
                Notes
              </label>
              <textarea
                dir="auto"
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="block w-full p-4 bg-dark2 text-white border border-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                placeholder="(Optional)"
              />
            </div>
          </form>
        </div>
      </div>
    </Suspense>
  );
}

export default Page;
