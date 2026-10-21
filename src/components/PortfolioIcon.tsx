import HomeRegular from "@mingcute/react/core-regular/home-1";
import HomeFilled from "@mingcute/react/core-filled/home-1";
import FilmRegular from "@mingcute/react/core-regular/film";
import FilmFilled from "@mingcute/react/core-filled/film";
import LayoutRegular from "@mingcute/react/core-regular/layout";
import LayoutFilled from "@mingcute/react/core-filled/layout";
import MailRegular from "@mingcute/react/core-regular/mail";
import MailFilled from "@mingcute/react/core-filled/mail";
import ArrowLeftRegular from "@mingcute/react/core-regular/arrow-left";
import ArrowLeftFilled from "@mingcute/react/core-filled/arrow-left";
import ArrowRightRegular from "@mingcute/react/core-regular/arrow-right";
import ArrowRightFilled from "@mingcute/react/core-filled/arrow-right";
import ExternalRegular from "@mingcute/react/core-regular/external-link";
import ExternalFilled from "@mingcute/react/core-filled/external-link";
import "./portfolio-icon.css";

const icons = {
  home: [HomeRegular, HomeFilled], film: [FilmRegular, FilmFilled],
  design: [LayoutRegular, LayoutFilled], mail: [MailRegular, MailFilled],
  back: [ArrowLeftRegular, ArrowLeftFilled], next: [ArrowRightRegular, ArrowRightFilled],
  external: [ExternalRegular, ExternalFilled],
} as const;

type Props = { name: keyof typeof icons; size?: number; active?: boolean; className?: string };
export default function PortfolioIcon({ name, size = 21, active, className = "" }: Props) {
  const [Regular, Filled] = icons[name];
  return <span className={`portfolio-icon ${className}`} data-active={active} aria-hidden="true" style={{ width: size, height: size }}>
    <Regular size={size} className="icon-regular" />
    <Filled size={size} className="icon-filled" />
  </span>;
}
