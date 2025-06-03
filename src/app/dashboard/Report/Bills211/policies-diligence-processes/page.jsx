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
import { setPoliciesdiligence } from "../../../../../lib/redux/features/Billsreport/Billscreen1Slice";
import dynamic from "next/dynamic";
import { Oval } from "react-loader-spinner";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Policiesdiligence = forwardRef(({ orgName, data, reportId }, ref) => {
  const [loopen, setLoOpen] = useState(false);
  const [p1q2, setP1q2] = useState("");
  const [p2q2, setP2q2] = useState("");
  const [p2q3, setP2q3] = useState("");

  const isMounted = useRef(true);
  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };
  const content = useSelector(
    (state) => state.BillScreen1About.policies_diligence_processes
  );
  const dispatch = useDispatch();

  const loadContent = () => {
    dispatch(setPoliciesdiligence(p1q2));
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
      dispatch(setPoliciesdiligence(""));

      LoaderOpen();

      const response = await axiosInstance.get(
        "/canada_bill_s211/v2/get-report-data",
        {
          params: {
            report: reportId,
            screen: 5,
          },
        }
      );

      setP2q2(response.data.part_2_screen3_q1);
      setP2q3(response.data.part_2_screen3_q2);
      const reportData =
        response?.data?.report_data?.policies_diligence_processes;
      if (reportData) {
        // Use the existing filled content from API
        dispatch(setPoliciesdiligence(reportData));
        setP1q2(reportData);
      } else {
        const companyName =
          response?.data?.part_1_screen1_q2 || "[Company Name – P1-Q2]";
        const filledContent = `<p style="margin-bottom: 8px;">${companyName} has implemented policies to prevent, and address forced labour and child labour, including:  </p>
<ul style="list-style-type: disc; padding-left: 40px; margin-bottom: 16px;">
  <li style="margin-bottom: 5px;">Responsible Sourcing Policy  </li>
  <li style="margin-bottom: 5px;">Supplier Code of Conduct </li>
  <li style="margin-bottom: 5px;">Human Rights Policy  </li>
    <li style="margin-bottom: 5px;">Third-Party Risk Assessment Procedures  </li>
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
          screen: 5,
          data: {
            policies_diligence_processes: p1q2,
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
    dispatch(setPoliciesdiligence(value));
    setP1q2(value);
  };

  return (
    <>
      <div>
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          4.Policies and Due Diligence Processes
        </h3>
      </div>
      <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between items-center">
        <p className="text-[15px] text-[#344054] mb-4 mt-3 w-[85%]">
          Add additional information on any Policies and/or Due Diligence
          Processes related to forced labour and/or child labour, or Add a
          statement if no such policies and/or due diligence processes are in
          place.
        </p>
        <button
          className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex h-[35px]"
          onClick={loadContent}
        >
          <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
          Auto Fill
        </button>
      </div>
      <div>
        <p className="text-[15px] text-[#344054] mb-4  w-[85%]">
          Note: If an entity controls other entities, it must also describe the
          policies and due diligence processes that these controlled entities
          have in place
        </p>
      </div>
      <div className="mb-4">
        <JoditEditor
          value={content}
          config={config}
          tabIndex={1}
          onBlur={handleEditorChange}
        />
      </div>

      <div>
        {p2q2 === "Yes" && p2q3?.length > 0 && (
          <>
            <p className="text-[15px] text-[#344054] mb-2 mt-3">
              Due diligence processes include:
            </p>
            <ul className="list-disc pl-6">
              {p2q3 && p2q3.map((item, index) => (
                <li key={index} className="text-[14px] text-[#344054] mb-2">
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}
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
});

export default Policiesdiligence;
