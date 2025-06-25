import type { FC, ReactElement } from "react";
import ModalComponent from "./Modal";

interface Props {
  onClose: () => void;
}

const MobileBlock: FC<Props> = ({ onClose }): ReactElement => {
  return (
    <ModalComponent>
      <div className="bg-[#1d1f1f] rounded-xl p-6 sm:p-8 w-[90vw] max-w-sm text-center text-[#AEB4C0]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-md bg-[#2a2c2f]">
            <i className="fa fa-mobile-screen text-[#21C1D6] text-2xl" />
          </div>
          <h2 className="text-white text-lg font-semibold">
            Mobile Not Supported
          </h2>
          <p className="text-sm leading-relaxed">
            This app is best experienced on a tablet or desktop. Please switch
            to a larger device to continue.
          </p>
          <button
            onClick={onClose}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#21C1D6] hover:bg-[#1AA8BD] text-white px-5 py-2.5 text-sm font-medium shadow-sm transition-all duration-200"
          >
            <i className="fa fa-arrow-left text-sm" />
            Go Back
          </button>
        </div>
      </div>
    </ModalComponent>
  );
};

export default MobileBlock;
