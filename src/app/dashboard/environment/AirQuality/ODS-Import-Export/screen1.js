"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import RadioWidget2 from "../../../../shared/widgets/Input/radioWidget2";
import { MdInfoOutline, MdKeyboardArrowDown } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from "@/app/utils/axiosMiddleware";
import { toast } from "react-toastify";

// 🟢 Custom Radio Widget
const widgets = { RadioWidget2 };

const view_path = "gri-environment-air-quality-ods_production-import-export";
const client_id = 1;
const user_id = 1;

// 🟢 Form Schema & UI Schema
const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      produceODS: {
        type: "string",
        title: "Does your organisation produce ODS?",
        enum: ["Yes", "No"],
      },
      importODS: {
        type: "string",
        title: "Does your organisation import ODS?",
        enum: ["Yes", "No"],
      },
      exportODS: {
        type: "string",
        title: "Does your organisation export ODS?",
        enum: ["Yes", "No"],
      },
      useODSFeedstock: {
        type: "string",
        title: "Does your organisation use ODS as feedstock?",
        enum: ["Yes", "No"],
      },
      destroyODS: {
        type: "string",
        title:
          "Does your organisation destroy ODS using approved technologies?",
        enum: ["Yes", "No"],
      },
    },
    required: [
      "produceODS",
      "importODS",
      "exportODS",
      "useODSFeedstock",
      "destroyODS",
    ],
  },
};

const uiSchema = {
  "ui:options": {
    addable: false, // Prevent adding new rows
    orderable: false, // Prevent reordering
    removable: false, // Prevent removal of entries
  },
  items: {
    produceODS: {
      "ui:title": "Does your organisation produce ODS?",
      "ui:widget": "RadioWidget2",
      "ui:options": { label: true },
    },
    importODS: {
      "ui:title": "Does your organisation import ODS?",
      "ui:widget": "RadioWidget2",
      "ui:options": { label: true },
    },
    exportODS: {
      "ui:title": "Does your organisation export ODS?",
      "ui:widget": "RadioWidget2",
      "ui:options": { label: true },
    },
    useODSFeedstock: {
      "ui:title": "Does your organisation use ODS as feedstock?",
      "ui:widget": "RadioWidget2",
      "ui:options": { label: true },
    },
    destroyODS: {
      "ui:title": "Does your organisation destroy ODS using approved technologies?",
      "ui:widget": "RadioWidget2",
      "ui:options": { label: true },
    },
  },
};


// 🟢 Accordion Item Component
const AccordionItem = ({
  title,
  children,
  tooltiptext,
  selectedOrg,
  setOrgMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = GlobalState();

  const handleClick = () => {
    if (!selectedOrg) {
      setOrgMessage("Please select an organization.");
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="shadow-md py-1 mb-4 rounded-[8px] cursor-pointer border border-neutral-200 mx-3">
      <button className="py-3 text-left flex w-full" onClick={handleClick}>
        <div className="flex w-full">
          <div className={`flex ${open ? "w-[75%]" : "w-[75%]"}`}>
            <div className="flex items-center">
              <h5 className="text-[15px] text-[#344054] px-3 font-[500]">
                {title}
              </h5>
            </div>

            {tooltiptext && (
              <div className="flex items-center relative">
                <MdInfoOutline
                  data-tooltip-id={`tooltip-${title.replace(/\s+/g, "-")}`}
                  data-tooltip-content={tooltiptext}
                  className="text-[14px] ml-2"
                />
                <ReactTooltip
                  id={`tooltip-${title.replace(/\s+/g, "-")}`}
                  place="top"
                  effect="solid"
                  style={{
                    width: "300px",
                    backgroundColor: "#000",
                    color: "white",
                    fontSize: "12px",
                    boxShadow: 3,
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}
          </div>

          <div className="w-[25%] flex justify-end">
            <MdKeyboardArrowDown
              className={`text-2xl transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </button>

      {isOpen && <div className="py-4 px-3">{children}</div>}
    </div>
  );
};

// 🟢 Main Screen1 Component (Inside AccordionItem)
const Screen1 = forwardRef(
  ({ selectedOrg, year, selectedCorp, togglestatus, setOrgMessage }, ref) => {
    const [r_schema, setRemoteSchema] = useState({});
    const [r_ui_schema, setRemoteUiSchema] = useState({});
    const [formData, setFormData] = useState([{}]);
    const [loopen, setLoOpen] = useState(false);
    const { open } = GlobalState();
    const toastShown = useRef(false);

    const LoaderOpen = () => setLoOpen(true);
    const LoaderClose = () => setLoOpen(false);

    const updateFormData = async () => {
      const data = {
        client_id: client_id,
        user_id: user_id,
        path: view_path,
        form_data: formData,
        corporate: selectedCorp,
        organisation: selectedOrg,
        year,
      };
      const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`;
      try {
        const response = await axiosInstance.post(url, data);
        if (response.status === 200) {
          toast.success("Data added successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          LoaderClose();
          loadFormData();
        } else {
          toast.error("Oops, something went wrong", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          LoaderClose();
        }
      } catch (error) {
        toast.error("Oops, something went wrong", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        LoaderClose();
      }
    };

    const loadFormData = async () => {
      LoaderOpen();
      setFormData([{}]);
      const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}`;
      try {
        const response = await axiosInstance.get(url);
        console.log("API called successfully:", response.data);
        setRemoteSchema(response.data.form[0].schema);
        setRemoteUiSchema(response.data.form[0].ui_schema);
        setFormData(response.data.form_data[0].data);
      } catch (error) {
        setFormData([{}]);
      } finally {
        LoaderClose();
      }
    };
    useEffect(() => {
      console.log("🟢 useEffect Triggered");
      console.log("selectedOrg:", selectedOrg);
      console.log("year:", year);
      console.log("selectedCorp:", selectedCorp);
      console.log("togglestatus:", togglestatus);

      if (selectedOrg && year && togglestatus) {
        if (togglestatus === "Corporate" && selectedCorp) {
          console.log(
            "✅ Calling loadFormData() - Corporate level with selectedCorp"
          );
          loadFormData();
        } else if (togglestatus === "Corporate" && !selectedCorp) {
          console.log(
            "⚠️ Clearing form data - Corporate selected but no selectedCorp"
          );
          setFormData([{}]);
          setRemoteSchema({});
          setRemoteUiSchema({});
        } else {
          console.log("✅ Calling loadFormData() - Organization level");
          loadFormData();
        }

        console.log("🔄 Resetting toastShown to false");
        toastShown.current = false;
      } else {
        if (!toastShown.current) {
          console.log("⚠️ Missing required fields: selectedOrg or year");
          toastShown.current = true;
        }
      }
    }, [selectedOrg, year, selectedCorp, togglestatus]);

    const handleChange = (e) => {
      setFormData(e.formData);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      updateFormData();
    };

    useImperativeHandle(ref, () => updateFormData);

    return (
      <AccordionItem
        title="ODS Production, Import & Export"
        tooltiptext="This section documents data corresponding to the production, import, export, and destruction of ODS."
        selectedOrg={selectedOrg}
        setOrgMessage={setOrgMessage}
      >
        <div className="mx-2">
          <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={widgets}
          />
        </div>

        <div className={`${open ? "mb-10":"mb-4"}`}>
          <button
            className="text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 float-end"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        {loopen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <Oval height={50} width={50} color="#00BFFF" />
          </div>
        )}
      </AccordionItem>
    );
  }
);

export default Screen1;
