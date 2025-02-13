import { useState } from "react";
import chevronDown from "../assets/chevron-down.svg";

const TicketDropdown = ({ ticketQuantity, setTicketQuantity }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      {/* Selected Value (Button) */}
      <div
        className="w-full p-[12px] border border-[#07373F] rounded-xl cursor-pointer flex justify-between items-center transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {ticketQuantity}
        <img src={chevronDown} alt="" />
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute w-full mt-2 bg-[#052228] border border-[#0E464F] rounded-xl z-10">
          {[...Array(5)].map((_, i) => (
            <li
              key={i + 1}
              className={`px-6 py-2 hover:bg-[#12464E] cursor-pointer transition 
              ${i === 0 ? "rounded-t-xl" : ""} 
              ${i === 4 ? "rounded-b-xl" : ""}`}
              onClick={() => {
                setTicketQuantity(i + 1);
                setIsOpen(false);
              }}
            >
              {i + 1}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TicketDropdown;
