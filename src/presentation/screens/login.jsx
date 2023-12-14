import { useRef, useState } from "react";
import { LoginAction } from "../../stores/auth/authAction";
import { useDispatch } from "react-redux";
import { getRetailerAction } from "../../stores/retailer/getRetailerAction";

const Login = () => {
  const passWordRef = useRef();
  const usernameRef = useRef();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  const handleLogin = async () => {
    const username = usernameRef.current.value;
    const password = passWordRef.current.value;

    setDisabled(true);
    try {
      const response = await dispatch(LoginAction({ username, password }));

      if (response.payload) {
        localStorage.setItem("token", response.payload.token);
        localStorage.setItem("username", response.payload.username);
        localStorage.setItem("assignedTo", response.payload.assignedTo);

        try {
          const response = await dispatch(
            getRetailerAction(localStorage.getItem("assignedTo"))
          );
          if (response.payload) {
            window.location.href = "/";
            localStorage.setItem("retailerName", response.payload.username);
          }
        } catch (error) {
          alert("Something went wrong");
        }
      } else {
        setDisabled(false);
        alert("Wrong username or password");
      }
    } catch (error) {
      setDisabled(false);
    }
  };

  return (
    <div className="grid w-full min-h-screen place-items-center login-background">
      <div
        className="flex flex-col items-center gap-3 px-5 pt-5 bg-white pb-9 rounded-2xl -mt-60"
        style={{ boxShadow: "0 0 20px #5cb85c" }}
      >
        <h1 className="text-[1.8rem] text-green-600 mb-5">Cashier Login</h1>

        <input
          className="border-[1px] w-[180px] border-green-500 rounded-md px-1 py-1"
          placeholder="Username"
          ref={usernameRef}
          type={"text"}
        />
        <input
          className="border-[1px] w-[180px] border-green-500 rounded-md px-1 py-1"
          placeholder="Password"
          ref={passWordRef}
          type={"password"}
        />

        <button
          className="px-3 py-2 text-white rounded-md bg-cashierOption"
          onClick={handleLogin}
          disabled={disabled}
          style={{
            backgroundColor: disabled ? "" : "",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
          }}
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default Login;
