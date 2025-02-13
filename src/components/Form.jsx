import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import Ticket from "./Ticket.jsx";
import { CLOUDINARY_UPLOAD_URL, UPLOAD_PRESET } from "../config.js";
import TicketDropdown from "./TicketDropdown.jsx";
import DragAndDropUpload from "./DragAndDropUpload.jsx";
import iconMail from "../assets/icon-mail.svg";

// Form Validation Schema
const formSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  avatar: z.string().url("Please upload an image to get a valid URL"),
  specialRequest: z
    .string()
    .max(200, "Special request must be under 200 characters")
    .optional(),
});

const TICKET_PRICES = {
  Free: 0,
  VIP: 150,
  VVIP: 150,
};

const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [step, setStep] = useState(() => {
    const storedStep = localStorage.getItem("step");
    return storedStep ? Number(storedStep) : 1; // Initialize with stored value or fallback to 1
  });
  const [formData, setFormData] = useState(null);
  const [ticketAccess, setTicketAccess] = useState("Regular Access");
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    const storedStep = localStorage.getItem("step");

    if (storedData) {
      const data = JSON.parse(storedData);
      setFormData(data);
      setValue("fullName", data.fullName);
      setValue("email", data.email);
      setValue("specialRequest", data.specialRequest || "");
      setUploadedImage(data.avatar);
      setTicketAccess(data.ticketAccess || "Regular Access");
      setTicketQuantity(data.ticketQuantity || 1);
    }

    if (storedStep) {
      setStep(Number(storedStep)); // Ensure step is a number
    }
  }, [setValue]);

  useEffect(() => {
    localStorage.setItem("step", step);
  }, [step]);

  useEffect(() => {
    if (formData) {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);
  // Upload Image to Cloudinary
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    setImageUploading(true);
    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
      const imageUrl = response.data.secure_url;
      setUploadedImage(imageUrl);
      setValue("avatar", imageUrl); // Ensure avatar is properly set in form values
    } catch (error) {
      console.error("Image upload failed:", error);
    }
    setImageUploading(false);
  };

  const handleNext = () => {
    if (ticketQuantity < 1) {
      alert("Please select at least 1 ticket.");
      return;
    }
    setStep((prevStep) => {
      const newStep = prevStep + 1;
      localStorage.setItem("step", newStep);
      return newStep;
    });
  };

  const handleCancel = () => {
    reset();
    setUploadedImage("");
    setTicketAccess("Regular Access");
    setTicketQuantity(1);
    setStep(1);
    localStorage.removeItem("formData");
    localStorage.removeItem("step");
  };

  const onSubmit = async (data) => {
    if (!uploadedImage) {
      alert("Please upload an image before submitting.");
      return;
    }

    const totalCost = ticketQuantity * TICKET_PRICES[ticketAccess];

    const fullData = {
      ...data,
      avatar: uploadedImage,
      ticketAccess,
      ticketQuantity,
      totalCost,
    };

    setFormData(fullData); // Update state
    localStorage.setItem("formData", JSON.stringify(fullData)); // Store in localStorage
    setStep(3);
  };

  return (
    <div className="w-full md:w-[700px] mx-auto p-[24px] md:p-12 bg-[#041E23] border border-[#0E464F] mt-20 rounded-[40px]">
      <div
        className={`flex ${
          step === 1 ? "flex-col items-start" : "flex-row items-center"
        } md:flex-row justify-between  md:items-center mb-3 gap-[12px] md:gap-0`}
      >
        {step === 1 && (
          <h2 className="text-[24px] md:text-[32px]  jeju text-white">
            Ticket Selection
          </h2>
        )}
        {step === 2 && (
          <h2 className="text-[24px] md:text-[32px]  jeju text-white">
            Attendee Details
          </h2>
        )}
        {step === 3 && <h2 className="text-[32px] jeju text-white">Ready</h2>}

        <p className="text-center text-[1rem] text-[#FAFAFA]">
          Step {step} / 3
        </p>
      </div>
      <div className="w-full bg-[#0E464F] h-1 rounded-[5px]">
        {step === 1 && (
          <div className="w-[232px] h-1 bg-[#24A0B5] rounded-l-[5px]"></div>
        )}
        {step === 2 && (
          <div className="w-[232px] md:w-[326px] h-1 bg-[#24A0B5] rounded-l-[5px]"></div>
        )}
        {step === 3 && (
          <div className="w-[232px] h-1 bg-[#24A0B5] rounded-l-[5px]"></div>
        )}
      </div>

      {/* Step 1: Ticket Selection */}
      {step === 1 && (
        <div className="md:p-[24px] rounded-[32px] mt-[32px] md:border border-[#0E464F] md:bg-[#08252B]">
          <div className="border border-[#07373F] rounded-[24px] mb-[32px] md:p-[24px] bg-[radial-gradient(at_top_left,_#07373F_35%,_#0A0C11_100%)]">
            <div className="flex flex-col items-center px-[24px] py-[16px]">
              <h1 className="md:text-[62px] text-[45px] road-rage leading-[100%] mb-[8px] text-center">
                Techember Fest &apos;&apos;25
              </h1>
              <p className="md:text-[1rem] text-[14px] text-center text-[#FAFAFA] max-w-[20rem] mx-auto leading-[150%] mb-[40px] md:mb-[8px]">
                Join us for an unforgettable experience at [Event Name]! Secure
                your spot now.
              </p>
              <div className="flex items-center flex-col md:flex-row gap-1 md:gap-4 ">
                <div className="flex gap-4">
                  <p className="text-[1rem] text-center ">
                    📍 [Event Location]
                  </p>
                  <p className="hidden md:block">||</p>
                </div>
                <p className="text-[1rem] text-center tracking-tighter">
                  March 15, 2025 | 7:00 PM
                </p>
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-[#0E464F] mb-[32px]"></div>
          <div className="p-2 mb-[32px]">
            <h3 className="text-[1rem] mb-2 leading-[150%]">
              Select Ticket Type
            </h3>
            <div className="flex flex-col md:flex-row gap-[24px] md:gap-[25px] border border-[#07373F] bg-[#052228] rounded-[24px] p-4">
              {[
                {
                  type: "Free",
                  access: "Regular Access",
                  available: "20/52",
                },
                {
                  type: "$150",
                  access: "VIP Access",
                  available: "20/52",
                },
                {
                  type: "$150",
                  access: "VVIP Access",
                  available: "20/52",
                },
              ].map((ticket) => (
                <div
                  key={`${ticket.type}-${ticket.access}`}
                  className={`cursor-pointer p-[12px] border rounded-[12px] w-full text-left
                  ${
                    ticketAccess === ticket.access
                      ? "bg-[#12464E] text-white border-[#197686]"
                      : "border-[#197686] text-white hover:bg-[#2C545B] hover:border-[#197686]"
                  }`}
                  onClick={() => setTicketAccess(ticket.access)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setTicketAccess(ticket.access);
                    }
                  }}
                  tabIndex="0"
                  role="button"
                  aria-pressed={ticketAccess === ticket.access}
                >
                  <h4 className="text-[24px] font-semibold leading-[110%] mb-[12px]">
                    {ticket.type}
                  </h4>
                  <p className="text-[1rem] leading-[150%] uppercase tracking-tighter">
                    {ticket.access}
                  </p>
                  <p className="text-sm leading-[150%] text-[#D9D9D9]">
                    {ticket.available}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <h3 className="leading-[150%] mb-[8px]">Number of Tickets</h3>
          <TicketDropdown
            ticketQuantity={ticketQuantity}
            setTicketQuantity={setTicketQuantity}
          />

          {/* Navigation Buttons */}
          <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 mt-[32px]">
            <button
              type="button"
              className="text-[#24A0B5] p-2 rounded-[8px] w-full cursor-pointer border border-[#24A0B5] jeju leading-[150%]"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              type="button"
              className="bg-[#24A0B5] text-white p-2 rounded-[8px] w-full cursor-pointer jeju leading-[150%]"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Attendee Details */}
      {step === 2 && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-[24px] rounded-[32px] mt-[32px] md:border border-[#0E464F] bg-[#08252B]"
        >
          {/* Avatar Upload */}
          <DragAndDropUpload
            uploadImage={uploadImage}
            imageUploading={imageUploading}
            uploadedImage={uploadedImage}
          />
          <p className="text-red-500 mt-1">{errors.avatar?.message}</p>

          <div className="h-1 w-full bg-[#0E464F] my-[32px]"></div>
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="text-[#FAFAFA]">
              Enter your name
            </label>
            <input
              type="text"
              {...register("fullName")}
              className="w-full p-2 border border-[#07373F] rounded-[12px] mt-[8px] bg-[#052228] text-[#FAFAFA] 
               focus:outline-0 focus:ring-0 focus:border-[#07373F] focus:bg-[#052228] focus:text-[#FAFAFA]"
              aria-describedby="fullNameError"
            />
            {errors.fullName && (
              <p className="text-red-500" aria-live="assertive">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="my-[32px]">
            <label htmlFor="email" className="block text-white font-medium">
              Enter your email*
            </label>

            {/* Input Wrapper for Icon & Text */}
            <div className="relative mt-[8px]">
              {/* Icon */}

              <img
                src={iconMail}
                alt="icon of a mail"
                aria-hidden="true"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              />

              {/* Input Field */}
              <input
                type="email"
                {...register("email")}
                className="w-full p-3 pl-10 border border-[#07373F] rounded-[12px] bg-transparent text-white placeholder:text-white/60 focus:outline-0 focus:ring-0"
                placeholder="hello@avioflagos.io"
                aria-describedby="emailError"
              />
            </div>

            {/* Error Message */}
            {errors.email && (
              <p className="text-red-500 mt-1" aria-live="assertive">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Special Request */}
          <div>
            <label className="">Special Request?</label>
            <textarea
              {...register("specialRequest")}
              className="w-full p-2 border border-[#07373F] rounded-[12px] bg-transparent mt-2 "
              rows="3"
              maxLength="200"
            />
          </div>
          {/* Navigation Buttons */}
          <div className="flex flex-col-reverse gap-4 md:gap-6 mt-[32px]">
            <button
              className="text-[#24A0B5] p-2 rounded-[8px] w-full cursor-pointer border border-[#24A0B5] jeju leading-[150%]"
              onClick={() => setStep(1)}
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-[#24A0B5] text-white p-2 rounded-[8px] w-full cursor-pointer jeju leading-[150%]"
            >
              Get My Free Ticket
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Ticket Generation */}
      {step === 3 && formData && (
        <div>
          <Ticket {...formData} />

          <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 mt-[32px]">
            <button
              className="text-[#24A0B5] p-2 rounded-[8px] w-full cursor-pointer border border-[#24A0B5] jeju leading-[150%]"
              onClick={() => setStep(1)}
            >
              Book Another Ticket
            </button>
            <button
              type="submit"
              className="bg-[#24A0B5] text-white p-2 rounded-[8px] w-full cursor-pointer jeju leading-[150%]"
            >
              Download Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
