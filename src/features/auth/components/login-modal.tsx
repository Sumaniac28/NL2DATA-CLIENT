import type { ChangeEvent, FC, FormEvent, ReactElement } from "react";
import { useState } from "react";
import ModalComponent from "../../../shared/components/Modal";
import { useAppDispatch } from "../../../store";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import type { FetchResult } from "@apollo/client/core";
import { LOGIN_USER } from "../graphql/auth";
import { addAuthUser } from "../reducers/auth.reducer";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../../shared/utils/utils";
import { FaTimes } from "react-icons/fa";
import { ToastService } from "../../../shared/services/toast.service";

interface IAuthPayload {
  email: string;
  password: string;
}

const LoginModal: FC<{
  onClose: () => void;
  onOpenModal: (type: string) => void;
}> = ({ onClose, onOpenModal }): ReactElement => {
  const [userInfo, setUserInfo] = useState<IAuthPayload>({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const toastService: ToastService = new ToastService();

  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const result: FetchResult = await loginUser({
        fetchPolicy: "no-cache",
        variables: {
          email: userInfo.email,
          password: userInfo.password,
        },
      });
      if (result && result.data) {
        const { loginUser } = result.data;
        const { user, projectIds } = loginUser;
        dispatch(addAuthUser({ authInfo: user }));
        const activeProject = getLocalStorageItem("activeProject");
        if (
          !activeProject ||
          (activeProject === "undefined" && projectIds.length > 0)
        ) {
          setLocalStorageItem("activeProject", JSON.stringify(projectIds[0]));
        }
        navigate("/dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toastService.show(error?.message || "Invalid credentials", "error");
    }
  };

  return (
    <ModalComponent>
      <div className="w-full md:w-[400px] md:max-w-2xl rounded-lg bg-black shadow-xl border border-[#1AA8BD]">
        <div className="flex justify-between items-center p-5 border-b border-[#1AA8BD]">
          <h2 className="text-xl font-semibold">Log in to your account</h2>
          <button
            onClick={onClose}
            className="text-[#AEB4C0] hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <FaTimes size={16} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-5 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-[#AEB4C0] mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              className="w-full rounded-md bg-[#0A0F1C] border border-[#AEB4C0] text-white px-3 py-2 focus:ring-2 focus:ring-[#21C1D6] outline-none transition"
              value={userInfo.email}
              onChange={(event: ChangeEvent) => {
                setUserInfo({
                  ...userInfo,
                  email: (event.target as HTMLInputElement).value,
                });
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-[#AEB4C0] mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              className="w-full rounded-md bg-[#0A0F1C] border border-[#AEB4C0] text-white px-3 py-2 focus:ring-2 focus:ring-[#21C1D6] outline-none transition"
              value={userInfo.password}
              onChange={(event: ChangeEvent) => {
                setUserInfo({
                  ...userInfo,
                  password: (event.target as HTMLInputElement).value,
                });
              }}
            />
          </div>

          <button
            type="submit"
            disabled={!userInfo.email || !userInfo.password}
            className={`w-full py-2 px-4 rounded-md font-semibold transition-colors ${
              !userInfo.email || !userInfo.password
                ? "bg-[#1AA8BD]/40 text-black cursor-not-allowed"
                : "bg-[#21C1D6] text-black hover:bg-[#1AA8BD] cursor-pointer"
            }`}
          >
            {loading ? "LOGIN IN PROGRESS" : "LOGIN"}
          </button>
        </form>

        <div className="px-5 py-4 text-sm text-[#AEB4C0] text-center border-t border-[#1AA8BD]">
          Don't have an account?
          <button
            onClick={() => onOpenModal("signup")}
            className="ml-2 text-[#FACC15] hover:text-[#EAB308] font-medium transition cursor-pointer"
          >
            Sign up
          </button>
        </div>
      </div>
    </ModalComponent>
  );
};

export default LoginModal;
