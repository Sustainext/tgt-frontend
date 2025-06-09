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
import { setRisksforcedchildlabour } from "../../../../../lib/redux/features/Billsreport/Billscreen1Slice";
import dynamic from "next/dynamic";
import { Oval } from "react-loader-spinner";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Risksforcedchildlabour = forwardRef(
  ({ orgName, data, reportId }, ref) => {
    const [loopen, setLoOpen] = useState(false);
    const [p1q2, setP1q2] = useState("");
    const [p2q2, setP2q2] = useState("");
    const [p2q3, setP2q3] = useState("");
    const [p2q7, setP2q7] = useState("");
    const [p2q8, setP2q8] = useState("");
    const isMounted = useRef(true);
    const LoaderOpen = () => {
      setLoOpen(true);
    };

    const LoaderClose = () => {
      setLoOpen(false);
    };
    const content = useSelector(
      (state) => state.BillScreen1About.risks_forced_child_labour
    );
    const dispatch = useDispatch();

    const loadContent = () => {
      dispatch(
        setRisksforcedchildlabour(
p1q2
        )
      );
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
        dispatch(setRisksforcedchildlabour(""));

        LoaderOpen();

        const response = await axiosInstance.get(
          "/canada_bill_s211/v2/get-report-data",
          {
            params: {
              report: reportId,
              screen: 6,
            },
          }
        );

        setP2q2(response.data.part_2_screen4_q1);
        setP2q3(response.data.part_2_screen4_q2);
        setP2q7(response.data.part_2_screen5_q1);
        setP2q8(response.data.part_2_screen5_q3);
        const reportData =
          response?.data?.report_data?.risks_forced_child_labour;
        if (reportData) {
          // Use the existing filled content from API
          dispatch(setRisksforcedchildlabour(reportData));
          setP1q2(reportData);
        } else {
          const companyName =
            response?.data?.part_1_screen1_q2 || "[Company Name – P1-Q2]";
          const filledContent = `<p style="margin-bottom: 8px;">${companyName} assesses forced labour and child labour risks in its operations and supply chains through:
</p>
<ul style="list-style-type: disc; padding-left: 40px; margin-bottom: 16px;">
  <li style="margin-bottom: 5px;">Risk mapping of supply chains
</li>
  <li style="margin-bottom: 5px;">Supplier risk categorization (high, medium, low) 
</li>
  <li style="margin-bottom: 5px;">Collaboration with industry bodies to identify risk factors 
</li>
</ul>
<p style="margin-bottom: 8px;">Identified risks may include:</p>
<ul style="list-style-type: disc; padding-left: 40px; margin-bottom: 16px;">
  <li style="margin-bottom: 5px;">Country-specific labour law violations </li>
  <li style="margin-bottom: 5px;">Industry-related risks in sourcing materials/services </li>
  <li style="margin-bottom: 5px;">Subcontracting risks in the supply chain </li>
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
        

          const payload = {
            report: reportId,
            screen: 6,
            data: {
              risks_forced_child_labour: p1q2,
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
      dispatch(setRisksforcedchildlabour(value));
      setP1q2(value);
    };
const stripHtml = (html) => {
  if (typeof html === "string") {
    return html.replace(/<[^>]+>/g, "");
  }
  return "";
};
    return (
      <>
        <div>
          <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
            5.Risks of Forced Labour and Child Labour
          </h3>
        </div>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between items-center">
          <p className="text-[15px] text-[#344054] mb-4 mt-3 w-[85%]">
            Add details about the Risks of Forced Labour and Child Labour
            identified or Add a statement if no such risks were identified
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
            Note: If an entity controls other entities, it must also describe
            the steps that these controlled entities have taken to identify,
            assess and manage potential forced labour or child labour risks in
            their activities and supply chains
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
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            The entity has identified forced labour or child labour risks
            related to the following aspects of its activities and supply
            chains:
          </p>
          {p2q2 === "Yes" && p2q3?.length > 0 && (
            <>
              <ul className="list-disc pl-6">
                {p2q3 &&
                  p2q3.map((item, index) => (
                    <li key={index} className="text-[14px] text-[#344054] mb-2">
                      {item}
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
        <div className="mb-6">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            The entity has identified forced labour or child labour risks in its
            activities and supply chains related to the following sector(s) and
            industry(ies):
          </p>

          <div className="">
            <ul className="list-disc pl-8 text-[14px] text-[#344054]">
              {Object.entries(p2q7).map(([sector, subSectors]) => (
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
        </div>
        <div>
        <p className="text-[15px] text-[#344054] mb-4 w-[85%]">{stripHtml(p2q8)}</p>
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

export default Risksforcedchildlabour;
