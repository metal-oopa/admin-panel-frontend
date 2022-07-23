import { useState, useEffect } from "react";

function KeyPeople({ id, companyDetails }) {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    if (
      companyDetails &&
      companyDetails.KeyPeople &&
      companyDetails.KeyPeople.length > 0
    ) {
      setPeople(companyDetails.KeyPeople);
    }
  }, [companyDetails]);

  const handleDeleteClick = (index) => {
    const newPeople = [...people];
    newPeople.splice(index, 1);
    setPeople(newPeople);
  };

  const handleAddClick = (index) => {};

  return (
    <div>
      <div className="flex flex-col space-y-6 flex-1 py-10 justify-end relative">
        <p
          className="text-[#62d5bc] text-[12px] font-bold cursor-pointer right-8 absolute top-8"
          onClick={() => setPeople([...people, ""])}
        >
          +Add new members
        </p>

        <div className="flex items-center mb-2 px-2 flex-col space-y-2">
          {people.map((item, index) => (
            <PeopleForm
              key={item.id}
              setPeople={setPeople}
              people={people}
              index={index}
              handleDeleteClick={() => handleDeleteClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default KeyPeople;

const PeopleForm = ({
  setPeople,
  people,
  index,
  handleDeleteClick,
  handleAddClick,
}) => {
  //   const handleDeleteClick = (index) => {};

  return (
    <>
      <div className="w-full flex justify-between">
        <input
          type="text"
          placeholder="Name"
          className=" placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-[18%]  transition duration-200 ease-in"
        />
        <input
          type="text"
          placeholder="Role"
          className="px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-[18%]  transition duration-200 ease-in"
        />
        <input
          type="text"
          placeholder="Email"
          className="px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-[18%]  transition duration-200 ease-in"
        />
        <input
          type="text"
          placeholder="Alternate Email"
          className="px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-[18%]  transition duration-200 ease-in"
        />
        <input
          type="text"
          placeholder="LinkedIn"
          className="px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-[18%]  transition duration-200 ease-in"
        />

        {/* <div
          className="cursor-pointer flex items-center justify-center"
          onClick={() => handleAddClick(index)}
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAY0lEQVRIie3TwQmAMBBE0Q92YB1e9RQw2H8hahVeNp6MiJnc5hfwArMEnGttEFoLMAKn0LzLwBGPyEuBb8Zl+MT7scpB8x+cwGtAM156mkC+eQL2ALsddA1YMkutmU4/1LlvXcG2FRsgGwMmAAAAAElFTkSuQmCC" />
        </div> */}

        <div
          className="cursor-pointer flex items-center justify-center"
          onClick={() => handleDeleteClick(index)}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            aria-label="Close modal"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </div>
      </div>
    </>
  );
};
