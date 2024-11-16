import React from "react";
import { HabitProps } from "../interfaces";
import kFormatter from "../utils/kFormatter";

function HabitNavbar({ habitData }: HabitProps) {
  return (
    <nav className="mt-20 bg-dark2 py-4 lg:px-40 flex text-center flex-col gap-4 capitalize">
      {habitData?.question?.length > 0 ? (
        <h2
          dir="auto"
          className="text-lg font-semibold"
          style={{ color: habitData?.color }}
        >
          {habitData?.question}
        </h2>
      ) : (
        ""
      )}

      <ul className="text-base text-textGray font-semibold flex  items-center justify-center gap-3 md:gap-6">
        {habitData?.type == "measurable" ? (
          <li className={`flex items-center gap-1`}>
            <svg
              className={`${
                habitData?.targetType?.toLowerCase() == "at most" &&
                "rotate-180"
              } `}
              fill="#9e9e9e"
              width="32"
              height="32"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M256,48C141.13,48,48,141.13,48,256s93.13,208,208,208,208-93.13,208-208S370.87,48,256,48Zm91.36,212.65a16,16,0,0,1-22.63.09L272,208.42V342a16,16,0,0,1-32,0V208.42l-52.73,52.32A16,16,0,1,1,164.73,238l80-79.39a16,16,0,0,1,22.54,0l80,79.39A16,16,0,0,1,347.36,260.65Z"
                stroke="#202020"
                strokeWidth={4}
              />
            </svg>
            <p dir="auto" className="flex items-center gap-2">
              {habitData?.unit} {kFormatter(Number(habitData?.target))}
            </p>
          </li>
        ) : (
          ""
        )}
        <li className="flex items-center gap-1">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.75 2.5C7.75 2.08579 7.41421 1.75 7 1.75C6.58579 1.75 6.25 2.08579 6.25 2.5V4.07926C4.81067 4.19451 3.86577 4.47737 3.17157 5.17157C2.47737 5.86577 2.19451 6.81067 2.07926 8.25H21.9207C21.8055 6.81067 21.5226 5.86577 20.8284 5.17157C20.1342 4.47737 19.1893 4.19451 17.75 4.07926V2.5C17.75 2.08579 17.4142 1.75 17 1.75C16.5858 1.75 16.25 2.08579 16.25 2.5V4.0129C15.5847 4 14.839 4 14 4H10C9.16097 4 8.41527 4 7.75 4.0129V2.5Z"
              fill="#9e9e9e"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 12C2 11.161 2 10.4153 2.0129 9.75H21.9871C22 10.4153 22 11.161 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12ZM17 14C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12C16.4477 12 16 12.4477 16 13C16 13.5523 16.4477 14 17 14ZM17 18C17.5523 18 18 17.5523 18 17C18 16.4477 17.5523 16 17 16C16.4477 16 16 16.4477 16 17C16 17.5523 16.4477 18 17 18ZM13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13ZM13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17ZM7 14C7.55228 14 8 13.5523 8 13C8 12.4477 7.55228 12 7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14ZM7 18C7.55228 18 8 17.5523 8 17C8 16.4477 7.55228 16 7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18Z"
              fill="#9e9e9e"
            />
          </svg>
          {habitData?.frequency}
        </li>
        {/* <li className="flex items-center gap-1">
              <svg
                fill="#9e9e9e"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10,20h4a2,2,0,0,1-4,0Zm8-4V10a6,6,0,0,0-5-5.91V3a1,1,0,0,0-2,0V4.09A6,6,0,0,0,6,10v6L4,18H20Z" />
              </svg>
              notification
            </li> */}
      </ul>
    </nav>
  );
}

export default HabitNavbar;
