"use client";
import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import STARSVG from "../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setTrainingforcedchildlabour } from "../../../../../lib/redux/features/Billsreport/Billscreen1Slice";
import dynamic from "next/dynamic";
import { Oval } from "react-loader-spinner";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Trainingforcedchildlabour = forwardRef(
  ({ orgName, data, reportId }, ref) => {
    const [loopen, setLoOpen] = useState(false);
    const [p1q2, setP1q2] = useState("");
    const [p2q11, setP2q11] = useState("");
    const [p2q911, setP2q911] = useState("");
    const [companyname, setCompanyname] = useState("");
    const isMounted = useRef(true);
    const LoaderOpen = () => {
      setLoOpen(true);
    };

    const LoaderClose = () => {
      setLoOpen(false);
    };
    const content = useSelector(
      (state) => state.BillScreen1About.training_forced_child_labour
    );
    const dispatch = useDispatch();

    const loadContent = () => {
      dispatch(setTrainingforcedchildlabour(p1q2));
    };

    const config = {
      enter: "BR", // Or customize behavior on Enter key
      cleanHTML: true,
      enablePasteHTMLFilter: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      style: {
        fontSize: "14px",
        color: "#667085",
      },
      allowResizeY: false,
      defaultActionOnPaste: "insert_clear_html",
      toolbarSticky: false,
      toolbar: true,
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikeThrough",
        "align",
        "outdent",
        "indent",
        "ul",
        "ol",
        "paragraph",
        "link",
        "table",
        "undo",
        "redo",
        "hr",
        "fontsize",
        "selectall",
      ],
      removeButtons: [
        "fullsize",
        "preview",
        "source",
        "print",
        "about",
        "find",
        "changeMode",
        "paintFormat",
        "image",
        "brush",
        "font",
      ],
    };
    const fetchDatareport = async () => {
      try {
        dispatch(setTrainingforcedchildlabour(""));

        LoaderOpen();

        const response = await axiosInstance.get(
          "/canada_bill_s211/v2/get-report-data",
          {
            params: {
              report: reportId,
              screen: 10,
            },
          }
        );

        setCompanyname(response.data.part_1_screen1_q2);
        setP2q11(response.data.part_2_screen7_q2);
        setP2q911(response.data.part_2_screen7_q3);
        const reportData =
          response?.data?.report_data?.training_forced_child_labour;
        if (reportData) {
          // Use the existing filled content from API
          dispatch(setTrainingforcedchildlabour(reportData));
          setP1q2(reportData);
        } else {
          const filledContent = `<ul style="list-style-type: disc; padding-left: 40px; margin-bottom: 16px;">
  <li style="margin-bottom: 5px;">Training content: [Labour rights, supplier due diligence, risk identification]</li>
  <li style="margin-bottom: 5px;">Delivery method: [Online modules, workshops, third-party programs] </li>
</ul>`;

          setP1q2(filledContent);
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        LoaderClose();
      }
    };

    useEffect(() => {
      if (isMounted.current) {
        fetchDatareport();
        isMounted.current = false;
      }
      return () => {
        isMounted.current = false;
      };
    }, []);
    useImperativeHandle(ref, () => ({
      async submitForm(type) {
        try {
          if (!p1q2 || p1q2.trim() === "") {
            console.warn("Content is empty.");
            return false;
          }

          const payload = {
            report: reportId,
            screen: 10,
            data: {
              training_forced_child_labour: p1q2,
            },
          };

          const response = await axiosInstance.put(
            "/canada_bill_s211/v2/create-report-data/",
            payload
          );

          // ✅ Check for status 200 and show toast
          if (response.status === 200) {
            toast.success("About the Report saved successfully!", {
              position: "top-right",
              autoClose: 3000,
              pauseOnHover: true,
              closeOnClick: true,
              theme: "light",
            });
          }

          return true;
        } catch (error) {
          console.error("Error submitting About the Report:", error);

          // Optional: error toast
          toast.error("Failed to save About the Report.", {
            position: "top-right",
            autoClose: 3000,
            pauseOnHover: true,
            closeOnClick: true,
            theme: "light",
          });

          return false;
        }
      },
    }));
    const handleEditorChange = (value) => {
      dispatch(setTrainingforcedchildlabour(value));
      setP1q2(value);
    };

    return (
      <>
        <div>
          <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
            9.Training on Forced Labour and Child Labour 
          </h3>
        </div>
        <div>
          <p className="text-[15px] text-[#344054] mb-2">
            {companyname} provides training on forced labour and/or child labour
            to its employees. Training details include:
          </p>
          <ul className="list-disc pl-6">
            {p2q11 === "Yes" && (
              <li className="text-[14px] text-[#344054] mb-2">
                Scope (is the training mandatory?):{" "}
                {p2q911 === "Yes" &&
                  "Yes, the training is mandatory for all employees."}
                {p2q911 === "Yestwo" &&
                  "Yes, the training is mandatory for some employees."}
                {p2q911 === "Yesone" &&
                  "Yes, the training is mandatory for employees making contracting or purchasing decisions."}
                {p2q911 === "No" && "No, the training is voluntary."}
              </li>
            )}
          </ul>
        </div>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
          <div className="w-[85%]">
            <p className="text-[15px] text-[#344054] mb-2">
              Add additional information about the Training on Forced Labour and
              Child Labour (If available) or Add a statement if no such
              trainings were provided
            </p>
            <p className="text-[15px] text-[#344054] mb-4 ">
              Note: If an entity controls other entities, it must also describe
              the training that these controlled entities provide to employees
              on forced labour and child labour, if applicable
            </p>
          </div>
          <div>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex h-[35px]"
              onClick={loadContent}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>
        </div>

        <div className="mb-4">
          <JoditEditor
            value={content}
            config={config}
            tabIndex={1}
            onBlur={handleEditorChange}
          />
        </div>
        {loopen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
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
      </>
    );
  }
);

export default Trainingforcedchildlabour;
