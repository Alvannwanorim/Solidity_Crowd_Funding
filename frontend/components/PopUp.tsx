import React, { Dispatch, SetStateAction } from "react";

interface PopUpProp {
  setOpenModel: Dispatch<SetStateAction<boolean>>;
  setDonate: Dispatch<SetStateAction<any>>;
  donate: any;
  donateFunction: (pID: number, amount: string) => Promise<void>;
}
const PopUp: React.FC<PopUpProp> = ({
  setOpenModel,
  setDonate,
  donate,
  donateFunction,
}) => {
  return <div>PopUp</div>;
};

export default PopUp;
