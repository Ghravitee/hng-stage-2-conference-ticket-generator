import React from "react";
import thumbs from "../assets/thumb.svg";
import tics from "../assets/ticz.svg";
import arrowRight from "../assets/arrow-right.svg";

const Header = () => {
  return (
    <header className="w-full">
      <nav className="border border-[#197686] px-4 py-[12px] rounded-[24px] flex justify-between items-center">
        <a href="/" className="flex gap-2 items-center">
          <img src={thumbs} alt="" />
          <img src={tics} alt="" />
        </a>
        <ul className="jeju md:flex gap-[26px] items-center text-[#B3B3B3] text-[18px] hidden">
          <li>
            <a href="#" className="text-white">
              Events
            </a>
          </li>
          <li>
            <a href="#">My Tickets</a>
          </li>
          <li>
            <a href="#">About Project</a>
          </li>
        </ul>
        <button className="bg-white flex items-center gap-2 px-[24px] py-[16px] rounded-[12px] cursor-pointer">
          <p className="uppercase text-[#0A0C11]">My Tickets</p>
          <img src={arrowRight} alt="" />
        </button>
      </nav>
    </header>
  );
};

export default Header;
