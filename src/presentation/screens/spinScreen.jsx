import { useEffect } from "react";
import Field from "../component/spin/field";

const SpinScreen = function () {
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/login";
    }
  }, []);

  return <Field />;
};

export default SpinScreen;
