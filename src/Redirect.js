import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/ref-data");
  }, [navigate]);

  return <p>page intentionally left blank</p>;
}
