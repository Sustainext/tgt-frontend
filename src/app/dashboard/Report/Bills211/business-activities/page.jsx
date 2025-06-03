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
import { setBusinessactivities } from "../../../../../lib/redux/features/Billsreport/Billscreen1Slice";
import dynamic from "next/dynamic";
import { Oval } from "react-loader-spinner";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Businessactivities = forwardRef(({ orgName, data, reportId }, ref) => {
  const [loopen, setLoOpen] = useState(false);
  const [p1q2, setP1q2] = useState("");
  const [p2q2, setP2q2] = useState("");

  const [companyname, setCompanyname] = useState("");
  const isMounted = useRef(true);
  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };
  const content = useSelector(
    (state) => state.BillScreen1About.business_activities
  );
  const dispatch = useDispatch();

  const loadContent = () => {
    dispatch(setBusinessactivities(p1q2));
  };
  const fetchDatareport = async () => {
    try {
      dispatch(setBusinessactivities(""));

      LoaderOpen();

      const response = await axiosInstance.get(
        "/canada_bill_s211/v2/get-report-data",
        {
          params: {
            report: reportId,
            screen: 3,
          },
        }
      );
      setCompanyname(response.data.part_1_screen1_q2);
      setP2q2(response.data.part_2_screen1_q2);

      const reportData = response?.data?.report_data?.business_activities;
      if (reportData) {
        // Use the existing filled content from API
        dispatch(setBusinessactivities(reportData));
        setP1q2(reportData);
      } else {
        const filledContent = `<p style="margin-bottom: 8px;">Its core business activities include:</p>
<ul style="list-style-type: disc; padding-left: 40px; margin-bottom: 16px;">
  <li style="margin-bottom: 5px;">[Activity 1, e.g., providing consumer products, offering digital services, distributing raw materials] </li>
  <li style="margin-bottom: 5px;">[Activity 2, e.g., supplying equipment, delivering professional services] </li>
  <li style="margin-bottom: 5px;">[Activity 3, if applicable] </li>
</ul>
<p>
The company operates in [list key regions/countries] and sources products from [list source countries] with an annual import volume of [volume/value in key product categories]. It complies with all relevant trade and regulatory requirements, ensuring responsible and ethical sourcing. 
</p>`;

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
          screen: 3,
          data: {
            business_activities: p1q2,
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

  const handleEditorChange = (value) => {
    dispatch(setBusinessactivities(value));
    setP1q2(value);
  };

  return (
    <>
      <div>
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          2.Business Activities
        </h3>
      </div>
      <div>
        <p className="text-[15px] text-[#344054] mb-2 mt-3">
          {companyname} is engaged in {p2q2}
        </p>
      </div>
      <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between items-center">
        <p className="text-[15px] text-[#344054] mb-4 mt-3 w-[85%]">
          Add additional information about the Business Activities (If required)
          Note: Entities should describe the activities of any entities under
          their control but are only required to report on the activities of
          subsidiaries that are entities with reporting obligations under the
          Act
        </p>
        <button
          className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex h-[35px]"
          onClick={loadContent}
        >
          <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
          Auto Fill
        </button>
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

export default Businessactivities;
