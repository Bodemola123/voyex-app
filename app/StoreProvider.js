"use client";

import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";
import axios from "axios";
import OrgSignupPopup from "@/components/organization-signing-page/OrgSignupPopup";
import { Flip, Slide, toast, ToastContainer } from "react-toastify";

export default function StoreProvider({ children }) {
  // const { orgOverlay } = useSelector((state) => state.auth);
  const [display, setDisplay] = useState(false);
  // const [userDisplay, setUserDisplay] = useState(false);
  const storeRef = useRef();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  ///////////// CHECK ORG CREDENTIALS //////////////////////
  // useEffect(() => {
  //   const id = localStorage.getItem("orgId")
  //     ? JSON.parse(localStorage.getItem("orgId"))
  //     : null;

  //   if (!id) {
  //     return;
  //   } else {
  //     const uploadOrgInfoOverlay = async () => {
  //       try {
  //         const response = await axios.get(
  //           `https://cc7zo6pwqb.execute-api.ap-southeast-2.amazonaws.com/default/voyex_orgV2?org_id=${id}`
  //         );
  //         // console.log("checked id🚨:", response);
  //         // if credentials not complete, display form
  //         if (
  //           response.status === 200 &&
  //           response.data?.organization_name === null
  //         ) {
  //           setDisplay(true);
  //         }
  //         if (
  //           response.status === 200 &&
  //           response.data?.organization_name !== null
  //         ) {
  //           setDisplay(false);
  //         }
  //       } catch (error) {
  //         if (error.response?.data) {
  //           // toast.error(error.response.data);
  //         } else toast.error(error.message);
  //       }
  //     };
  //     uploadOrgInfoOverlay();
  //   }
  // }, []);

  return (
    <Provider store={storeRef.current}>
      {children}
      {display && <OrgSignupPopup setDisplay={setDisplay} />}
      {/* {userDisplay && <UserUploadDetails setUserDisplay={setUserDisplay} />} */}
      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
    </Provider>
  );
}
