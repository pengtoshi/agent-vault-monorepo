import type { SVGProps } from "react";
import { ReactComponent as Check } from "~/ui/public/icons/check.svg";
import { ReactComponent as CheckThick } from "~/ui/public/icons/check_thick.svg";
import { ReactComponent as ChevronDown } from "~/ui/public/icons/chevron_down.svg";
import { ReactComponent as ChevronLeft } from "~/ui/public/icons/chevron_left.svg";
import { ReactComponent as ChevronRight } from "~/ui/public/icons/chevron_right.svg";
import { ReactComponent as ChevronUp } from "~/ui/public/icons/chevron_up.svg";
import { ReactComponent as CircleCheck } from "~/ui/public/icons/circle_check.svg";
import { ReactComponent as CircleCheckFilled } from "~/ui/public/icons/circle_check_filled.svg";
import { ReactComponent as CircleClose } from "~/ui/public/icons/circle_close.svg";
import { ReactComponent as CircleError } from "~/ui/public/icons/circle_error.svg";
import { ReactComponent as CircleErrorFilled } from "~/ui/public/icons/circle_error_filled.svg";
import { ReactComponent as CircleInfo } from "~/ui/public/icons/circle_info.svg";
import { ReactComponent as CircleInfoFilled } from "~/ui/public/icons/circle_info_filled.svg";
import { ReactComponent as CirclePlus } from "~/ui/public/icons/circle_plus.svg";
import { ReactComponent as CirclePlusFilled } from "~/ui/public/icons/circle_plus_filled.svg";
import { ReactComponent as CircleQuestion } from "~/ui/public/icons/circle_question.svg";
import { ReactComponent as CircleQuestionFilled } from "~/ui/public/icons/circle_question_filled.svg";
import { ReactComponent as Close } from "~/ui/public/icons/close.svg";
import { ReactComponent as CloseThick } from "~/ui/public/icons/close_thick.svg";
import { ReactComponent as Dot } from "~/ui/public/icons/dot.svg";
import { ReactComponent as Download } from "~/ui/public/icons/download.svg";

export const IconVariants = {
  Check,
  CheckThick,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleCheck,
  CircleCheckFilled,
  CircleClose,
  CircleError,
  CircleErrorFilled,
  CircleInfo,
  CircleInfoFilled,
  CirclePlus,
  CirclePlusFilled,
  CircleQuestion,
  CircleQuestionFilled,
  Close,
  CloseThick,
  Dot,
  Download,
};

type IconName = keyof typeof IconVariants;

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export const Icon = ({ name, size = 24, className, ...props }: IconProps) => {
  const IconComponent = IconVariants[name];
  return <IconComponent {...props} width={size} height={size} className={className ?? "text-gray-950"} />;
};
