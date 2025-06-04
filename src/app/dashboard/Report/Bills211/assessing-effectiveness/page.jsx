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
import { setAssessingeffectiveness } from "../../../../../lib/redux/features/Billsreport/Billscreen1Slice";
import dynamic from "next/dynamic";
import { Oval } from "react-loader-spinner";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Assessingeffectiveness = forwardRef(
  ({ orgName, data, reportId }, ref) => {
    const [loopen, setLoOpen] = useState(false);
    const [p1q2, setP1q2] = useState("");
    const [p2q12, setP2q12] = useState("");
    const [p2q9121, setP2q121] = useState("");
    const [companyname, setCompanyname] = useState("");
    const isMounted = useRef(true);
    const LoaderOpen = () => {
      setLoOpen(true);
    };

    const LoaderClose = () => {
      setLoOpen(false);
    };
    const content = useSelector(
      (state) => state.BillScreen1About.assessing_effectiveness
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
        dispatch(setAssessingeffectiveness(""));

        LoaderOpen();

        const response = await axiosInstance.get(
          "/canada_bill_s211/v2/get-report-data",
          {
            params: {
              report: reportId,
              screen: 11,
            },
          }
        );

        setCompanyname(response.data.part_1_screen1_q2);
        setP2q12(response.data.part_2_screen8_q1);
        setP2q121(response.data.part_2_screen8_q2);
        const reportData = response?.data?.report_data?.assessing_effectiveness;
        if (reportData) {
          // Use the existing filled content from API
          dispatch(setAssessingeffectiveness(reportData));
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
            screen: 11,
            data: {
              assessing_effectiveness: p1q2,
            },
          };

          const response = await axiosInstance.put(
            "/canada_bill_s211/v2/create-report-data/",
            payload
          );

          // ✅ Check for status 200 and show toast
          if (response.status === 200) {
            toast.success("Data saved successfully!", {
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
      dispatch(setAssessingeffectiveness(value));
      setP1q2(value);
    };

    return (
      <>
        <div>
          <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
            10.Assessing Effectiveness
          </h3>
        </div>
        <div>
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            To measure its effectiveness in preventing forced and child labour,
            {companyname} takes the following steps:
          </p>
          <div className="mb-6">
            {p2q12 === "Yes" && p2q9121 && (
              <ul className="list-disc pl-12">
                {p2q9121.map((item, index) => (
                  <li key={index} className="text-[14px] text-[#344054] mb-2">
                    {item.trim()}
                  </li>
                ))}
              </ul>
            )}
           
          </div>

          <p className="text-[15px] text-[#344054] mb-2">
            Add additional information on policies and procedures in place to
            assess its effectiveness in ensuring that forced labour and child
            labour are not being used in its activities and supply chains and
            Add a statement if no such policies and procedures are in place
          </p>
          <p className="text-[15px] text-[#344054] mb-4 ">
            Note: If an entity controls other entities, it must also describe
            how these controlled entities assess their effectiveness in ensuring
            that forced labour and child labour are not being used in their
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
      </>
    );
  }
);

export default Assessingeffectiveness;
