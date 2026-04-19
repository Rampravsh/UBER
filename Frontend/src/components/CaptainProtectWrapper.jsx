import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCaptainData } from "../context/CaptainContext";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setCaptain } = useCaptainData();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
      return;
    }

    const fetchCaptainProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setCaptain(response.data.captain);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Authentication failed:", err);
        localStorage.removeItem("token");
        navigate("/captain-login");
      }
    };

    fetchCaptainProfile();
  }, [token, navigate, setCaptain]);

  if (!token) {
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

export default CaptainProtectWrapper;
