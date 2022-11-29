import { useRef, useState } from "react";
import {
  HeaderLayout,
  ModalLayout,
  SideBar,
  UserWrapperLayout,
} from "../../components";
import { NotVisible, VisibleSvg } from "../../components/Svg";
import { useAppContext } from "../../context/AppContext";
import { changePassword, changeUsername } from "../../services/user.services";

const MyAccount = () => {
  // toggle
  const [passwordToggle, setPasswordToggle] = useState(false);

  const { state, dispatch } = useAppContext();
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false);
  const [modal, setModal] = useState(false);
  const modalModeRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  // reference for change username
  const usernameRef = useRef();
  const passwordRef = useRef();
  // reference for change password
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const passwordHandler = async () => {
    setIsLoading(true);
    let temp_error = {};
    const oldPass = oldPasswordRef.current.value;
    const newPass = newPasswordRef.current.value;
    const confirmPass = confirmPasswordRef.current.value;
    if (newPass != confirmPass) {
      temp_error = { ...temp_error, confirmPasswordError: "Password mismatch" };
    }
    if (newPass.trim().length == 0) {
      temp_error = {
        ...temp_error,
        confirmPasswordError: "Enter Confirm Password",
      };
    }
    if (newPass.trim().length == 0) {
      temp_error = { ...temp_error, newPasswordError: "Enter New Password" };
    }
    if (oldPass.trim().length == 0) {
      temp_error = {
        ...temp_error,
        oldPasswordError: "Enter Current Password",
      };
    }

    if (Object.keys(temp_error).length > 0) {
      setErrors(temp_error);
    } else {
      setErrors(null);
      const newData = {
        _id: state?.user?._id,
        password: oldPass,
        new_password: newPass,
      };
      const res = await changePassword(newData);
      if (res.success) {
        setSuccess(true);
      } else {
        setSuccess(false);

        setErrors(res.errors);
      }
    }
    setIsLoading(false);
  };
  const usernameHandler = async () => {
    setIsLoading(true);
    let temp_error = {};
    const user = usernameRef.current.value;
    const pass = passwordRef.current.value;

    if (user.trim().length == 0) {
      temp_error = { ...temp_error, usernameError: "Enter New Username" };
    }
    if (pass.trim().length == 0) {
      temp_error = {
        ...temp_error,
        passwordError: "Enter Current Password",
      };
    }

    if (Object.keys(temp_error).length > 0) {
      setErrors(temp_error);
    } else {
      setErrors(null);
      const newData = {
        _id: state?.user?._id,
        password: pass,
        new_username: user,
      };
      const res = await changeUsername(newData);
      if (res.success) {
        dispatch({
          type: "UPDATE_USER",
          value: { ...state?.user, username: user },
        });
        setSuccess(true);
      } else {
        setSuccess(false);

        setErrors(res.errors);
      }
    }
    setIsLoading(false);
  };
  const clearForms = () => {
    oldPasswordRef.current = null;
    newPasswordRef.current = null;
    confirmPasswordRef.current = null;
    usernameRef.current = null;
    setSuccess(false);
    setErrors(null);
  };
  const changePasswordUI = () => {
    return (
      <div className="flex flex-col gap-4">
        {success && (
          <div className="flex gap-4 items-center justify-between bg-emerald-200 rounded-lg p-2 px-4 ">
            <p className="text-emerald-600 text-md">
              Password succesfully changed!
            </p>
            <span
              onClick={() => setSuccess(false)}
              className="text-emerald-600 cursor-pointer underline "
            >
              Close
            </span>
          </div>
        )}
        <p className="font-semibold text-lg">Change Password</p>
        <label htmlFor="password">Current Password</label>
        {errors && <p className="text-rose-500">{errors?.oldPasswordError}</p>}
        <input
          className="rounded-full px-4 py-3 border"
          type="password"
          id="password"
          defaultValue={passwordRef.current?.value}
          ref={oldPasswordRef}
        />
        <label htmlFor="newpassword">New Password</label>
        {errors && <p className="text-rose-500">{errors?.newPasswordError}</p>}
        <input
          className="rounded-full px-4 py-3 border"
          type="password"
          id="newpassword"
          defaultValue={newPasswordRef.current?.value}
          ref={newPasswordRef}
        />
        <label htmlFor="confirmpassword">Confirm Password</label>
        {errors && (
          <p className="text-rose-500">{errors?.confirmPasswordError}</p>
        )}
        <input
          className="rounded-full px-4 py-3 border"
          type="password"
          id="confirmpassword"
          ref={confirmPasswordRef}
        />
        {isLoading ? (
          <div className="flex gap-4 justify-end items-start">
            <button className="p-3 px-8 bg-slate-400 transition-colors hover:bg-emerald-700 text-white rounded-full ">
              Saving...
            </button>
          </div>
        ) : (
          <div className="flex gap-4 justify-end items-start">
            <button
              onClick={() => {
                setModal(false);
                clearForms();
              }}
              className="p-3 px-8 bg-slate-400 transition-colors hover:bg-emerald-700 text-white rounded-full "
            >
              Cancel
            </button>
            <button
              onClick={passwordHandler}
              className="p-3 px-8 bg-emerald-600 transition-colors hover:bg-emerald-700 text-white rounded-full "
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    );
  };
  const changeUsernameUI = () => {
    return (
      <div className="flex flex-col gap-4">
        {success && (
          <div className="flex gap-4 items-center justify-between bg-emerald-200 rounded-lg p-2 px-4 ">
            <p className="text-emerald-600 text-md">
              Username succesfully changed!
            </p>
            <span
              onClick={() => setSuccess(false)}
              className="text-emerald-600 cursor-pointer underline "
            >
              Close
            </span>
          </div>
        )}
        <p className="font-semibold text-lg">Change Username</p>
        <label htmlFor="new_username">New Username</label>
        {errors && <p className="text-rose-500">{errors?.usernameError}</p>}
        <input
          ref={usernameRef}
          className="rounded-full px-4 py-3 border"
          type="text"
          id="new_username"
        />
        <label htmlFor="password">Password</label>
        {errors && <p className="text-rose-500">{errors?.passwordError}</p>}
        <div className="relative">
          <input
            ref={passwordRef}
            className="w-full rounded-full px-4 py-3 border"
            type={!passwordToggle ? "password" : "text"}
            id="password"
          />
          <button
            onClick={() => setPasswordToggle(!passwordToggle)}
            className="absolute top-3 cursor-pointer right-5"
          >
            {passwordToggle ? <VisibleSvg /> : <NotVisible />}
          </button>
        </div>
        <div className="flex gap-4 justify-end items-start">
          <button
            onClick={() => {
              setModal(false);
              clearForms();
            }}
            className="p-3 px-8 bg-slate-400 transition-colors hover:bg-emerald-700 text-white rounded-full "
          >
            Cancel
          </button>
          <button
            onClick={usernameHandler}
            className="p-3 px-8 bg-emerald-600 transition-colors hover:bg-emerald-700 text-white rounded-full "
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  };
  return (
    <div>
      {modal && (
        <ModalLayout>
          {modalModeRef.current == "change_password"
            ? changePasswordUI()
            : changeUsernameUI()}
        </ModalLayout>
      )}
      <HeaderLayout title="My Account" />
      <div className="flex">
        <SideBar />
        <UserWrapperLayout title="My Account">
          <div className="sm:p-10 p-5 rounded-lg bg-white border">
            <div className="flex gap-4 flex-col mb-4">
              <p className=" text-lg">
                <span className="font-semibold">Current Username: </span>{" "}
                {state?.user?.username}
              </p>
              <p className=" text-lg">
                <span className="font-semibold">Current Password: </span>{" "}
                *******
              </p>
              <p className=" text-lg">
                <span className="font-semibold">Email: </span>{" "}
                {state?.user?.email}
              </p>
            </div>
            <div className="flex gap-4 sm:flex-row flex-col items-center justify-end">
              <button
                onClick={() => {
                  modalModeRef.current = "change_password";
                  setModal(true);
                }}
                className="p-3 px-8 bg-emerald-600 transition-colors hover:bg-emerald-700 text-white rounded-full "
              >
                Change Password
              </button>
              <button
                onClick={() => {
                  modalModeRef.current = "change_username";
                  setModal(true);
                }}
                className="p-3 px-8 bg-emerald-600 transition-colors hover:bg-emerald-700 text-white rounded-full "
              >
                Change Username
              </button>
            </div>
          </div>
        </UserWrapperLayout>
      </div>
    </div>
  );
};

export default MyAccount;
