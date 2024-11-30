import { useState } from "react";
import ChooseModal from "./ChooseModal";
import Link from "next/link";
import SignoutModal from "./SignoutModal";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSignoutModalOpen, setIsSignoutModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const toggleSignoutModal = () => {
    setIsSignoutModalOpen(!isSignoutModalOpen);
  };

  return (
    <>
      <header className="flex justify-between items-center bg-dark1 p-4 lg:px-40">
        <Link href="/" className="text-4xl capitalize font-bold text-white">
          habits
        </Link>

        <div className="flex items-center justify-between gap-4">
          {/* add button */}
          <button
              className="customShadow relative group transition-all duration-500 hover:bg-[#1875d1]"
              onClick={toggleModal} // Toggle the modal on button click
              type="button"
          >
            <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M4 12H20M12 4V20"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
              />
            </svg>
            <div
                className="bg-main p-2 rounded-md group-hover:flex hidden absolute
                -bottom-2 translate-y-full left-1/2 -translate-x-1/2 h-10 z-[1]"
            >
              <span className="text-white whitespace-nowrap">Add habit</span>
              <div
                  className="bg-inherit rotate-45 p-1 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2"
              ></div></div>
          </button>
          {/* sort button */}
          <button className="customShadow relative group transition-all duration-500">
            <svg
                fill="none"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M2 7.0625C2 6.47569 2.48843 6 3.09091 6H24.9091C25.5116 6 26 6.47569 26 7.0625C26 7.64931 25.5116 8.125 24.9091 8.125H3.09091C2.48843 8.125 2 7.64931 2 7.0625Z"
                  fill="white"
              />
              <path
                  d="M6.90909 14.5C6.90909 13.9132 7.39752 13.4375 8 13.4375H20C20.6025 13.4375 21.0909 13.9132 21.0909 14.5C21.0909 15.0868 20.6025 15.5625 20 15.5625H8C7.39752 15.5625 6.90909 15.0868 6.90909 14.5Z"
                  fill="white"
              />
              <path
                  d="M12.3636 20.875C11.7612 20.875 11.2727 21.3507 11.2727 21.9375C11.2727 22.5243 11.7612 23 12.3636 23H15.6364C16.2388 23 16.7273 22.5243 16.7273 21.9375C16.7273 21.3507 16.2388 20.875 15.6364 20.875H12.3636Z"
                  fill="white"
              />
            </svg>
            <div
                className="bg-main p-2 rounded-md group-hover:flex hidden absolute
                -bottom-2 translate-y-full left-1/2 -translate-x-1/2 h-10 z-[1]"
            >
              <span className="text-white whitespace-nowrap">Filter</span>
              <div
                  className="bg-inherit rotate-45 p-1 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2"
              ></div></div>
          </button>
          {/* setting button */}
          <button className="customShadow relative group transition-all duration-500">
            <svg
                fill="white"
                width="28"
                height="28"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
            >
              <title/>
              <g data-name="1" id="_1">
                <path
                    d="M293.9,450H233.53a15,15,0,0,1-14.92-13.42l-4.47-42.09a152.77,152.77,0,0,1-18.25-7.56L163,413.53a15,15,0,0,1-20-1.06l-42.69-42.69a15,15,0,0,1-1.06-20l26.61-32.93a152.15,152.15,0,0,1-7.57-18.25L76.13,294.1a15,15,0,0,1-13.42-14.91V218.81A15,15,0,0,1,76.13,203.9l42.09-4.47a152.15,152.15,0,0,1,7.57-18.25L99.18,148.25a15,15,0,0,1,1.06-20l42.69-42.69a15,15,0,0,1,20-1.06l32.93,26.6a152.77,152.77,0,0,1,18.25-7.56l4.47-42.09A15,15,0,0,1,233.53,48H293.9a15,15,0,0,1,14.92,13.42l4.46,42.09a152.91,152.91,0,0,1,18.26,7.56l32.92-26.6a15,15,0,0,1,20,1.06l42.69,42.69a15,15,0,0,1,1.06,20l-26.61,32.93a153.8,153.8,0,0,1,7.57,18.25l42.09,4.47a15,15,0,0,1,13.41,14.91v60.38A15,15,0,0,1,451.3,294.1l-42.09,4.47a153.8,153.8,0,0,1-7.57,18.25l26.61,32.93a15,15,0,0,1-1.06,20L384.5,412.47a15,15,0,0,1-20,1.06l-32.92-26.6a152.91,152.91,0,0,1-18.26,7.56l-4.46,42.09A15,15,0,0,1,293.9,450ZM247,420h33.39l4.09-38.56a15,15,0,0,1,11.06-12.91A123,123,0,0,0,325.7,356a15,15,0,0,1,17,1.31l30.16,24.37,23.61-23.61L372.06,328a15,15,0,0,1-1.31-17,122.63,122.63,0,0,0,12.49-30.14,15,15,0,0,1,12.92-11.06l38.55-4.1V232.31l-38.55-4.1a15,15,0,0,1-12.92-11.06A122.63,122.63,0,0,0,370.75,187a15,15,0,0,1,1.31-17l24.37-30.16-23.61-23.61-30.16,24.37a15,15,0,0,1-17,1.31,123,123,0,0,0-30.14-12.49,15,15,0,0,1-11.06-12.91L280.41,78H247l-4.09,38.56a15,15,0,0,1-11.07,12.91A122.79,122.79,0,0,0,201.73,142a15,15,0,0,1-17-1.31L154.6,116.28,131,139.89l24.38,30.16a15,15,0,0,1,1.3,17,123.41,123.41,0,0,0-12.49,30.14,15,15,0,0,1-12.91,11.06l-38.56,4.1v33.38l38.56,4.1a15,15,0,0,1,12.91,11.06A123.41,123.41,0,0,0,156.67,311a15,15,0,0,1-1.3,17L131,358.11l23.61,23.61,30.17-24.37a15,15,0,0,1,17-1.31,122.79,122.79,0,0,0,30.13,12.49,15,15,0,0,1,11.07,12.91ZM449.71,279.19h0Z"/>
                <path
                    d="M263.71,340.36A91.36,91.36,0,1,1,355.08,249,91.46,91.46,0,0,1,263.71,340.36Zm0-152.72A61.36,61.36,0,1,0,325.08,249,61.43,61.43,0,0,0,263.71,187.64Z"/>
              </g>
            </svg>
            <div
                className="bg-main p-2 rounded-md group-hover:flex hidden absolute
                -bottom-2 translate-y-full left-1/2 -translate-x-1/2 h-10 z-[1]"
            >
              <span className="text-white whitespace-nowrap">Settings</span>
              <div
                  className="bg-inherit rotate-45 p-1 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2"
              ></div></div>
          </button>


          <button
              className="customShadow relative group transition-all duration-500 hover:bg-red-600 "
              onClick={toggleSignoutModal}
          >
            <svg
                className="stroke-white "
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
              />
            </svg>
            <div
                className="bg-main p-2 rounded-md group-hover:flex hidden absolute
                -bottom-2 translate-y-full left-1/2 -translate-x-1/2 h-10 z-[1]"
            >
              <span className="text-white whitespace-nowrap">Sign out</span>
              <div
                  className="bg-inherit rotate-45 p-1 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2"
              ></div>
            </div>
          </button>
        </div>
      </header>

      {/* Render the Modal and pass isOpen state */}
      <ChooseModal isOpen={isModalOpen} closeModal={toggleModal}/>
      <SignoutModal
          isOpen={isSignoutModalOpen}
          closeModal={toggleSignoutModal}
      />
    </>
  );
}

// @ts-ignore
export default Header;