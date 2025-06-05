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
import { setOrganizationprofilestructure } from "../../../../../lib/redux/features/Billsreport/Billscreen1Slice";
import dynamic from "next/dynamic";
import { Oval } from "react-loader-spinner";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Organizationprofilestructure = forwardRef(({ orgName, data,reportId }, ref) => {
  const content = useSelector(
    (state) => state.BillScreen1About.organization_profile_structure
  );
  // const reportId = useSelector((state) => state.BillScreen1About.report_id);
  const dispatch = useDispatch();
  const [loopen, setLoOpen] = useState(false);
  const [p1q2, setP1q2] = useState("");
  const [p1q11, setP1q11] = useState("");
  const [p1q10, setP1q10] = useState("");
  const [p1q9, setP1q9] = useState("");
  const [companyname, setCompanyname] = useState("");
  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };
  const isMounted = useRef(true);
  const generateEntityDescriptionFromP1Q9 = () => {
    if (!p1q9 || typeof p1q9 !== "object") return "";

    const firstKey = "listed on a stock exchange in Canada"; // Lowercased
    const keys = Object.keys(p1q9);

    // Check original key (which might be capitalized in data)
    const actualFirstKey = keys.find((key) => key.toLowerCase() === firstKey);

    const isFirstSelected =
      actualFirstKey && p1q9[actualFirstKey]?.length === 0;

    let selectedItems = Object.values(p1q9).flat();

    if (isFirstSelected) {
      selectedItems.unshift(actualFirstKey);
    }

    if (selectedItems.length === 0) return "";

    if (selectedItems.length === 1) {
      return isFirstSelected
        ? `is ${selectedItems[0].toLowerCase()}.`
        : `${selectedItems[0].toLowerCase()}.`;
    }

    if (selectedItems.length === 2) {
      return isFirstSelected
        ? `is ${selectedItems[0].toLowerCase()} and ${selectedItems[1].toLowerCase()}.`
        : `${selectedItems[0].toLowerCase()} and ${selectedItems[1].toLowerCase()}.`;
    }

    const last = selectedItems.pop().toLowerCase();
    const rest = selectedItems.map((item) => item.toLowerCase()).join(", ");
    return isFirstSelected
      ? `is ${rest}, and ${last}.`
      : `${rest}, and ${last}.`;
  };

  const loadContent = () => {
    dispatch(setOrganizationprofilestructure(p1q2));
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

  const handleEditorChange = (value) => {
    dispatch(setOrganizationprofilestructure(value));
     setP1q2(value);
  };
  const fetchDatareport = async () => {
    try {
      dispatch(setOrganizationprofilestructure(""));

      LoaderOpen();

      const response = await axiosInstance.get(
        "/canada_bill_s211/v2/get-report-data",
        {
          params: {
            report: reportId,
            screen: 2,
          },
        }
      );
      setCompanyname(response.data.part_1_screen1_q2);
      setP1q11(response.data.part_1_screen7_q2);
      setP1q10(response.data.part_1_screen6_q1);
      setP1q9(response.data.part_1_screen5_q1);
      const reportData = response.data.report_data.organization_profile_structure;
      if (reportData) {
        // Use the existing filled content from API
        dispatch(setOrganizationprofilestructure(reportData));
        setP1q2(reportData);
      } else {
        // Use default template if no data found
        const companyName =
          response?.data?.part_1_screen1_q2 || "[Company Name – P1-Q2]";

        const filledContent = `<p>${companyName} has a presence in [number] location(s) worldwide. The entity employs approximately [number] employees globally, including [number] in Canada and [number] outside Canada. It does not control or own any other entities [or specify subsidiaries and their functions]. </p>
<p>The organizational structure includes the following key departments: [list key departments such as operations, sales, R&D, logistics, corporate affairs, sustainability, etc.].</p> 
<p>${companyName} is a member of [list relevant industry associations, partnerships, or coalitions], which support its commitment to [sustainability, ethical sourcing, innovation, etc.].Shape </p>
       
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
          screen: 2,
          data: {
            organization_profile_structure: p1q2,
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
  return (
    <>
      <div>
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          1.Organization Profile and Structure
        </h3>
      </div>
      <div>
        <p className="text-[15px] text-[#344054] mb-2 mt-3">
          {companyname} is a Corporation headquartered in {p1q11} Canada,
          operating in the following industry/sector(s):
        </p>
        <div className="">
          <ul className="list-disc pl-8 text-[14px] text-[#344054]">
            {Object.entries(p1q10).map(([sector, subSectors]) => (
              <li key={sector} className="mb-2">
                <strong>{sector}</strong>
                <ul className="list-disc pl-6">
                  {subSectors.map((item, idx) => (
                    <li key={idx} className="mb-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[15px] text-[#344054] mb-2 mt-3">
          The entity {generateEntityDescriptionFromP1Q9()}
        </p>
      </div>
      <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between items-center">
        <p className="text-[15px] text-[#344054] mb-4 mt-3 w-[85%]">
          Add additional information about the Organization Structure including
          Control of other entities, including what the controlled entities do
          and where they are located (If applicable)
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

export default Organizationprofilestructure;
