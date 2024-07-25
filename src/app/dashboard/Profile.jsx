import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { IoClose } from "react-icons/io5";
import { AiOutlineEdit, AiOutlineWarning } from "react-icons/ai";
import ProfileImage from "@/app/shared/components/ProfileImage";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance, { patch } from "../utils/axiosMiddleware";

const Modal = dynamic(() => import("@/app/shared/components/Modal"), {
  ssr: false,
});

const Profile = ({ onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const id = parseInt(localStorage.getItem("user_id") || "0");
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const isMounted = useRef(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const user_id = parseInt(localStorage.getItem("user_id") || "0");
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/api/auth/user_profile/${user_id}/`
        );
        const { first_name, last_name, designation, department, phone } =
          response.data;
        setFirstName(first_name);
        setLastName(last_name);
        setDesignation(designation);
        setDepartment(department);
        setPhone(phone);
        setName(`${first_name} ${last_name}`);
      } catch (error) {
        setIsModalOpen(true);
        console.error("Error fetching user details:", error);
      }
      setLoading(false);
    };

    if (isMounted.current) {
      fetchUserDetails();
    }

    return () => {
      isMounted.current = false;
    };
  }, [id]);

  const handleShow = (e) => {
    e.stopPropagation();
    setIsShow((prev) => !prev);
  };

  const handleName = (e) => {
    const inputName = e.target.value;
    setName(inputName);
    const parts = inputName.trim().split(" ");
    setFirstName(parts[0]);
    setLastName(parts.length > 1 ? parts.slice(1).join(" ") : "");
  };

  const handleMobile = (e) => setPhone(e.target.value);
  const handleDepartment = (e) => setDepartment(e.target.value);
  const handleDesignation = (e) => setDesignation(e.target.value);

  const submitForm = async (e) => {
    const user_id = parseInt(localStorage.getItem("user_id") || "0");
    e.preventDefault();
    setLoading(true);
    const userData = {
      designation,
      department,
      first_name: name.split(" ")[0],
      last_name: name.split(" ").length > 1? name.split(" ").slice(1).join(" ") : "",
      phone,
    };
    try {
      await patch(
        `/api/auth/user_profile/${user_id}/`,
        userData
      );
      toast.success("Profile updated successfully");
      setIsShow(false);
      onClose();
    } catch (error) {
      toast.error("Error updating profile");
      console.error("Error updating profile:", error);
    }
    setLoading(false);
  };

  return (
    <>
      {/* <ToastContainer style={{ fontSize: "12px", zIndex:1000 }} /> */}
      <Modal onClose={onClose}>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-60 z-40"></div>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 welcome-screen">
        {isModalOpen ? (
          <div className="modal-content relative bg-white rounded-md p-0 w-[365px] h-[200px]">
            <div className="py-4 flex justify-around items-center">
              <div className="flex justify-center items-center">
                <AiOutlineWarning
                  style={{ color: "#ffd11a", fontSize: "100px" }}
                />
              </div>
              <div className="mt-5">
                <h3 className="text-center px-3">
                  Unable to load data. Please contact Administrator
                </h3>
                <div className="mt-3 flex justify-center">
                  <button
                    onClick={onClose}
                    className="w-[40%] h-[31px] px-[22px] py-2 mb-4 bg-blue-500 text-white rounded shadow flex-col justify-center items-center inline-flex cursor-pointer"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="modal-content relative flex bg-white rounded-md p-0 w-[645px] h-[329px]">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <IoClose />
            </button>
            <div className=" ps-8 w-full">
              <button
                className="text-black text-[18px] font-medium leading-relaxed cursor-pointer flex justify-start gap-3 mb-5 items-center"
                onClick={handleShow}
              >
                <AiOutlineEdit /> Edit Profile
              </button>
              <div className="flex space-x-[60px] ps-4 h-[329px]">
                <ProfileImage
                  firstName={firstName}
                  lastName={lastName}
                  spacing="108px"
                  textsize="30px"
                />
                <div>
                  {isShow ? (
                    <form onSubmit={submitForm}>
                      <div className="w-full h-8 flex space-x-6 my-3 items-center">
                        <div className="w-36 text-left text-neutral-500 text-xs font-semibold uppercase leading-relaxed tracking-wide">
                          Name
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={name}
                          placeholder="Enter Name"
                          className="w-56 h-8 text-neutral-500 text-sm px-2 border"
                          onChange={handleName}
                        />
                      </div>
                      <div className="w-full h-8 flex space-x-6 my-3 items-center">
                        <div className="w-36 text-left text-neutral-500 text-xs font-semibold uppercase leading-relaxed tracking-wide">
                          Designation
                        </div>
                        <input
                          id="designation"
                          name="designation"
                          type="text"
                          value={designation}
                          placeholder="Enter Designation"
                          className="w-56 h-8 text-neutral-500 text-sm px-2 border"
                          onChange={handleDesignation}
                        />
                      </div>
                      <div className="w-full h-8 flex space-x-6 my-3 items-center">
                        <div className="w-36 text-left text-neutral-500 text-xs font-semibold uppercase leading-relaxed tracking-wide">
                          Department
                        </div>
                        <input
                          id="department"
                          name="department"
                          type="text"
                          placeholder="Enter Department"
                          value={department}
                          className="w-56 h-8 text-neutral-500 text-sm px-2 border"
                          onChange={handleDepartment}
                        />
                      </div>
                      <div className="w-full h-8 flex space-x-6 my-3 items-center">
                        <div className="w-36 text-left text-neutral-500 text-xs font-semibold uppercase leading-relaxed tracking-wide">
                          Phone
                        </div>
                        <input
                          id="phone"
                          name="phone"
                          type="number" 
                          placeholder="Enter Phone Number"
                          value={phone}
                          className="w-56 h-8 text-neutral-500 text-sm px-2 border"
                          onChange={handleMobile}
                        />
                      </div>
                      <div className="flex space-x-6 justify-center mt-4">
                        <input
                          type="submit"
                          className="w-[40%] h-8 bg-blue-500 text-white rounded shadow cursor-pointer"
                          value="Save"
                        />
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="w-full h-8 flex space-x-6 my-3 items-center">
                        <div className="w-36 text-left text-neutral-500 text-xs font-semibold uppercase leading-relaxed tracking-wide">
                          Name
                        </div>
                        <div className="w-56 h-8 text-left text-neutral-500 text-xs font-semibold leading-relaxed tracking-wide border px-2 py-1 flex items-center">
                          {firstName} {lastName}
                        </div>
                      </div>
                      <div className="w-full h-8 flex space-x-6 my-3 items-center">
                        <div className="w-36 text-left text-neutral-500 text-xs font-semibold uppercase leading-relaxed tracking-wide">
                          Designation
                        </div>
                        <div className="w-56 h-8 text-left text-neutral-500 text-xs font-semibold leading-relaxed tracking-wide border px-2 py-1 flex items-center">
                          {designation}
                        </div>
                      </div>
                      <div className="w-full h-8 flex space-x-6 my-3 items-center">
                        <div className="w-36 text-left text-neutral-500 text-xs font-semibold uppercase leading-relaxed tracking-wide">
                          Department
                        </div>
                        <div className="w-56 h-8 text-left text-neutral-500 text-xs font-semibold leading-relaxed tracking-wide border px-2 py-1 flex items-center">
                          {department}
                        </div>
                      </div>
                      <div className="w-full h-8 flex space-x-6 my-3 items-center">
                        <div className="w-36 text-left text-neutral-500 text-xs font-semibold uppercase leading-relaxed tracking-wide">
                          Phone
                        </div>
                        <div className="w-56 h-8 text-left text-neutral-500 text-xs font-semibold leading-relaxed tracking-wide border px-2 py-1 flex items-center">
                          {phone}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
          <Oval
            height={50}
            width={50}
            color="#00BFFF"
            secondaryColor="#f3f3f3"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
    </Modal>
    </>
  );
};

export default Profile;
