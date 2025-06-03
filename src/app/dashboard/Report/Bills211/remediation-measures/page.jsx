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
import { setRemediationmeasures } from "../../../../../lib/redux/features/Billsreport/Billscreen1Slice";
import dynamic from "next/dynamic";
import { Oval } from "react-loader-spinner";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Remediationmeasures = forwardRef(({ orgName, data, reportId }, ref) => {
  const [loopen, setLoOpen] = useState(false);
  const [p1q2, setP1q2] = useState("");
  const [p2q9, setP2q9] = useState("");
  const [p2q91, setP2q91] = useState("");

  const isMounted = useRef(true);
  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };
  const content = useSelector(
    (state) => state.BillScreen1About.remediation_measures
  );
  const dispatch = useDispatch();

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
      dispatch(setRemediationmeasures(""));

      LoaderOpen();

      const response = await axiosInstance.get(
        "/canada_bill_s211/v2/get-report-data",
        {
          params: {
            report: reportId,
            screen: 8,
          },
        }
      );

      setP2q9(response.data.part_2_screen6_q1);
      setP2q91(response.data.part_2_screen6_q2);
      const reportData = response?.data?.report_data?.remediation_measures;
      if (reportData) {
        // Use the existing filled content from API
        dispatch(setRemediationmeasures(reportData));
        setP1q2(reportData);
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
          screen: 8,
          data: {
            remediation_measures: p1q2,
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
    dispatch(setRemediationmeasures(value));
    setP1q2(value);
  };

  return (
    <>
      <div>
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          7.Remediation Measures
        </h3>
      </div>
      <div>
        <p className="text-[15px] text-[#344054] mb-2 mt-3">
          Measures taken by the entity to remediate any identified forced labour
          or child labour in its activities and supply chains include:
        </p>
        <div className="">
       {p2q9 === "Yes" && p2q91?.length > 0 && (
          <>
          
            <ul className="list-disc pl-6">
              {p2q91 && p2q91.map((item, index) => (
                <li key={index} className="text-[14px] text-[#344054] mb-2">
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}
        </div>

     
      </div>
      <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between items-center">
        <p className="text-[15px] text-[#344054] mb-4 mt-3">
          Note: If an entity controls other entities, it must also describe the
          steps that these controlled entities have taken to identify, assess
          and manage potential forced labour or child labour risks in their
          activities and supply chains
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

export default Remediationmeasures;
