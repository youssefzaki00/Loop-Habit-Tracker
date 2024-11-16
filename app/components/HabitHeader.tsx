import BackButton from "@/app/components/BackButton";
import Link from "next/link";
import React from "react";
import { HabitProps } from "../interfaces";
import deleteHabit from "../utils/deleteHabit";
import { useUser } from "../context/userContext";
import { useHabits } from "../hooks/useHabits";
import { useRouter } from "next/navigation";

function HabitHeader({ habitData }: HabitProps) {
  const { userUid } = useUser();
  const router = useRouter();
  const { habits, setHabits } = useHabits();

  const handleDelete = () => {
    deleteHabit(userUid, habitData.id, habits, setHabits);
    router.push("/");
  };

  const handleEdit = () => {
    // Create a formattedCreatedAt variable based on the type of habitData.createdAt
    const formattedCreatedAt =
      habitData.createdAt &&
      typeof habitData.createdAt === "object" &&
      "seconds" in habitData.createdAt
        ? new Date(habitData.createdAt.seconds * 1000).toISOString()
        : "";

    const editUrl =
      habitData.type === "boolean"
        ? `/createHabit/BooleanHabit?id=${
            habitData.id
          }&name=${encodeURIComponent(
            habitData.name
          )}&color=${encodeURIComponent(
            habitData.color
          )}&question=${encodeURIComponent(
            habitData.question
          )}&frequency=${encodeURIComponent(
            habitData.frequency
          )}&notes=${encodeURIComponent(
            habitData.notes
          )}&createdAt=${encodeURIComponent(formattedCreatedAt)}`
        : `/createHabit/MeasurableHabit?id=${
            habitData.id
          }&name=${encodeURIComponent(
            habitData.name
          )}&color=${encodeURIComponent(
            habitData.color
          )}&unit=${encodeURIComponent(
            habitData.unit
          )}&target=${encodeURIComponent(
            habitData.target
          )}&targetType=${encodeURIComponent(
            habitData.targetType
          )}&question=${encodeURIComponent(
            habitData.question
          )}&frequency=${encodeURIComponent(
            habitData.frequency
          )}&notes=${encodeURIComponent(
            habitData.notes
          )}&createdAt=${encodeURIComponent(formattedCreatedAt)}`;

    router.push(editUrl);
  };

  return (
    <header className="fixed left-0 w-full h-20 z-10 top-0 flex justify-between items-center bg-dark1 py-4 px-4 lg:px-40">
      <div className="flex items-center gap-6">
        <Link href="/">
          <BackButton />
        </Link>
        <h1
          dir="auto"
          // style={{ color: habitData?.color }}
          className={`text-2xl capitalize font-bold text-white`}
        >
          {habitData?.name}
        </h1>
      </div>
      <div className="flex items-center justify-around gap-4 lg:gap-6 ">
        <button
          onClick={handleEdit}
          className="edit flex flex-row-reverse items-center gap-2 customShadow hover:bg-[#1875d1]"
        >
          <h3 className="text-white font-semibold">Edit</h3>
          <svg
            fill="#ffffff"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            id="f26f875e-6e0f-4754-a824-58378eda2d39"
            data-name="Livello 1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>prime</title>

            <g id="ab9d7309-2578-40a5-a875-3e4d7b8fb802" data-name="pen">
              <polygon points="15.52 5 2.79 17.73 2.08 22.68 7.03 21.97 19.76 9.24 15.52 5" />

              <path
                d="M18.46,2.29h4a1,1,0,0,1,1,1v3a0,0,0,0,1,0,0h-6a0,0,0,0,1,0,0v-3a1,1,0,0,1,1-1Z"
                transform="translate(9.03 -13.21) rotate(45)"
              />
            </g>
          </svg>
        </button>
        <button
          className="delete flex flex-row-reverse items-center gap-2 customShadow hover:bg-red-600"
          onClick={handleDelete}
        >
          <h3 className="text-white font-semibold">Delete</h3>
          <svg
            fill="#ffffff"
            height="20"
            width="20"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <g>
                  <path d="M82.952,134.729c4.174,78.441,20.438,348.879,21.201,361.577L105.097,512h301.806l0.944-15.694 c0.765-12.698,17.029-283.136,21.201-361.577C429.048,134.729,82.952,134.729,82.952,134.729z M167.602,461.089l-14.599-279.58 l33.346-1.741l14.599,279.58L167.602,461.089z M272.696,460.219h-33.391V180.194h33.391V460.219z M344.395,461.089l-33.346-1.741 l14.603-279.58l33.346,1.741L344.395,461.089z"></path>
                </g>
              </g>
              <g>
                <g>
                  <path d="M316.325,44.522V0H195.68l-0.003,44.522H61.217v55.703c0,0,389.565,0,389.565,0V44.522H316.325z M282.935,44.522h-53.866 v-11.13h53.866V44.522z"></path>
                </g>
              </g>
            </g>
          </svg>
        </button>
      </div>
    </header>
  );
}

export default HabitHeader;
