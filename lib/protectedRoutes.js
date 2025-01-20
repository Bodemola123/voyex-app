"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { googleUserDetails } = useSelector((state) => state.auth);
  const [display, setDisplay] = useState(children);
  const name = Cookies.get("voyexUserName") || googleUserDetails;
  useEffect(() => {
    const option = () => {
      if (name || googleUserDetails) {
        return setDisplay(children);
      }
      if (!name && !googleUserDetails) {
        // return setDisplay(<Navigate to="/login" />);
        router.push("/sign-up");
      }
    };
    option();
  }, [children, googleUserDetails, name, router]);

  return display;
};

export default ProtectedRoute;
