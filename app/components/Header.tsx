import { useState } from "react";
import ChooseModal from "./ChooseModal";
import Link from "next/link";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <header className="flex justify-between items-center bg-dark1 p-4 lg:px-40">
        <Link href="/" className="text-4xl capitalize font-bold text-white">
          habits
        </Link>

        <div className="flex items-center justify-between gap-4 lg:gap-8 mr-5">
          {/* add button */}
          <button
            className="customShadow hover:bg-[#1875d1]"
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
          </button>
          {/* sort button */}
          <button className="customShadow">
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
          </button>
          {/* setting button */}
          <button className="customShadow">
            {" "}
            <svg
              className="bi bi-three-dots-vertical"
              fill="white"
              height="20"
              viewBox="0 0 16 16"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Render the Modal and pass isOpen state */}
      <ChooseModal isOpen={isModalOpen} closeModal={toggleModal} />
    </>
  );
}

export default Header;
