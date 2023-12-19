import { useEffect } from "react";
import Field from "../component/spin/field";

const SpinScreen = function () {
  useEffect(() => {
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("token") === undefined
    ) {
      window.location.href = "/login";
    } else {
      const interval = 30 * 60 * 1000;

      const removeTokenInterval = setInterval(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
          localStorage.removeItem("token");
          console.log("Token removed.");
        }
      }, interval);

      return () => clearInterval(removeTokenInterval);
    }
  }, []);

  return <Field />;
};

export default SpinScreen;
