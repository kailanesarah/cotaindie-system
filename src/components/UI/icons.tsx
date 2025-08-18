import { BsQuestionSquare } from "react-icons/bs";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import {
  MdDashboardCustomize,
  MdForum,
  MdOutlineAccountCircle,
  MdOutlineDocumentScanner,
  MdOutlineInventory2,
  MdPeople,
  MdSettings,
} from "react-icons/md";
import { RiAddLine, RiArrowDownSLine } from "react-icons/ri";

export interface MyIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}

export const defaultIconProps = {
  size: 24,
};

export const LoginIcon = (props: MyIconProps) => (
  <FiLogIn {...defaultIconProps} {...props} />
);
export const LogoutIcon = (props: MyIconProps) => (
  <FiLogOut {...defaultIconProps} {...props} />
);
export const ArrowDownIcon = (props: MyIconProps) => (
  <RiArrowDownSLine {...defaultIconProps} {...props} />
);
export const DocumentScannerIcon = (props: MyIconProps) => (
  <MdOutlineDocumentScanner {...defaultIconProps} {...props} />
);
export const ArrowBackIcon = (props: MyIconProps) => (
  <IoIosArrowBack {...defaultIconProps} {...props} />
);
export const AccountCircleIcon = (props: MyIconProps) => (
  <MdOutlineAccountCircle {...defaultIconProps} {...props} />
);
export const SettingsIcon = (props: MyIconProps) => (
  <MdSettings {...defaultIconProps} {...props} />
);
export const AddIcon = (props: MyIconProps) => (
  <RiAddLine {...defaultIconProps} {...props} />
);
export const ForumIcon = (props: MyIconProps) => (
  <MdForum {...defaultIconProps} {...props} />
);
export const InventoryIcon = (props: MyIconProps) => (
  <MdOutlineInventory2 {...defaultIconProps} {...props} />
);
export const ClientsIcon = (props: MyIconProps) => (
  <MdPeople {...defaultIconProps} {...props} />
);
export const DashboardIcon = (props: MyIconProps) => (
  <MdDashboardCustomize {...defaultIconProps} {...props} />
);
export const HomeIcon = (props: MyIconProps) => (
  <GoHome {...defaultIconProps} {...props} />
);
export const QuestionIcon = (props: MyIconProps) => (
  <BsQuestionSquare {...defaultIconProps} {...props} />
);
