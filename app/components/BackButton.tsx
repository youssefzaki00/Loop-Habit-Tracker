function BackButton({ days }) {
  return (
    <button
      className={`customShadow ${
        days ? "p-1" : "p-2"
      } text-gray focus:outline-none ${
        days ? "mt-2" : "mt-1"
      } flex items-center justify-center`}
    >
      {days ? (
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M15 7L10 12L15 17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>
      ) : (
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M24 12H5m7 7l-7-7 7-7"
          />
        </svg>
      )}
    </button>
  );
}
export default BackButton;
