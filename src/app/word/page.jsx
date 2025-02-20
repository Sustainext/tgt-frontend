"use client";
import axiosInstance from "../utils/axiosMiddleware";
import { useState,useEffect } from "react";

const Word = () => {
    const [reportname, setReportname] = useState();
    const fetchOrg = async () => {
        try {
          const response = await axiosInstance.get(`/esg_report/view-word/`);
          console.log("orgs:", response);
          setReportname(response.data.blob_url);
        } catch (e) {
          console.log(
            "failed fetching organization",
            process.env.REACT_APP_BACKEND_URL
          );
        }
      };
      useEffect(() => {
        fetchOrg();
      }, []);

  return (
    <>
      <div>
      <iframe
      src={`https://view.officeapps.live.com/op/view.aspx?src=${reportname}`}
      allowfullscreen
      style={{width: "100%", height: "1000px"}}
    ></iframe>
      </div>
    </>
  );
};

export default Word;
