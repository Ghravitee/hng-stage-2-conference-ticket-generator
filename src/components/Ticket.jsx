import barcode from "../assets/BarCode.png";

const Ticket = ({
  fullName,
  email,
  avatar,
  ticketAccess,
  ticketQuantity,
  specialRequest,
}) => {
  return (
    <div id="ticket" className="text-center mt-[32px]">
      <h3 className="md:alatsi text-[24px] md:text-[32px] mb-4 md:font-normal font-bold">
        Your Ticket is Booked!
      </h3>
      <p className="hidden md:block">
        Check your email for a copy or you can{" "}
        <span className="font-bold">download</span>
      </p>
      <p className="md:hidden block">
        You can download or Check your email for a copy
      </p>
      <div className="flex justify-center">
        <div className="mt-[64px] bg-[url(/ticket.png)] bg-no-repeat bg-contain w-[300px] h-[600px] px-[1rem] pt-[20px]">
          <div className="p-[14px] rounded-[1rem] border border-[#24A0B5] flex flex-col items-center">
            <div className="flex flex-col items-center ">
              <h1 className="text-[34px] road-rage leading-[100%] mb-[8px]">
                Techember Fest &apos;&apos;25
              </h1>
              <p className="text-[10px] text-center text-[#FAFAFA] max-w-[20rem] mx-auto leading-[150%] mb-[8px]">
                📍 04 Rumens road, Ikoyi, Lagos
              </p>
              <p className="text-[10px] text-center mb-[24px]">
                📅 March 15, 2025 | 7:00 PM
              </p>
            </div>
            <div className="border-4 border-[#24A0B5] rounded-[12px] mb-[20px] w-[140px] h-[140px] ">
              <img
                src={avatar}
                alt="Avatar"
                className="w-full h-full mx-auto rounded-[12px] "
              />
            </div>
            <div className="bg-[#08343C] border border-[#133D44] p-[4px] rounded-md w-full">
              <div className="grid grid-cols-2 gap-2 border-b border-b-[#12464E] px-1">
                <div className="flex flex-col border-r border-r-[#12464E] ">
                  <h3 className="text-[10px] text-white text-left mb-1">
                    Enter your name
                  </h3>
                  <p className="font-bold text-[12px] text-white leading-[150%] text-left truncate">
                    {fullName}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[10px] text-white text-left mb-1">
                    Enter your email
                  </h3>
                  <p className="font-bold text-[12px] text-white leading-[150%] truncate">
                    {email}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b border-b-[#12464E] px-1">
                <div className="flex flex-col border-r border-r-[#12464E] ">
                  <h3 className="text-[10px] text-white text-left mb-1">
                    Ticket Type
                  </h3>
                  <p className="font-bold text-[12px] text-white leading-[150%] text-left">
                    {ticketAccess}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[10px] text-white text-left mb-1">
                    Ticket for :
                  </h3>
                  <p className="font-bold text-[12px] text-white break-all text-left">
                    {ticketQuantity}
                  </p>
                </div>
              </div>

              <div className="p-2 rounded-md text-white">
                <h3 className="text-[10px] text-left">Special Request:</h3>
                <p className="text-gray-300 text-left text-[10px]">
                  {specialRequest ||
                    "Nil ? Or the users sad story they write in there gets this whole space, Max of three rows"}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-[20%] md:mt-[15%] flex justify-center">
            <img src={barcode} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
