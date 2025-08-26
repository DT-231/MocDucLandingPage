import { Link } from "react-router-dom";

type PropsButton = {
  href?: string;
  to?: string;
  primary?:boolean;
  onClick?: () => void;
  classNames?: string | string[];
  disabled?: boolean;
  children: React.ReactNode;
};

const Button: React.FC<PropsButton> = ({
  href,
  to,
  onClick,
  classNames = "",
  primary=false,
  children,
  disabled = false,
  ...passProps
}) => {
  let Comp: any = "button";
  const props: any = { onClick, ...passProps };

  if (to) {
    Comp = Link;
    props.to = to;
  } else if (href) {
    Comp = "a";
    props.href = href;
  }

  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on") && typeof props[key] === "function") {
        delete props[key];
      }
    });
    props["aria-disabled"] = true;
  }

  const classes = `${classNames} ${primary && "px-8 py-3 bg-primary  text-white  cursor-pointer"}` ;

  return (
    <Comp
      {...props}
      className={classes}
    >
      {children}
    </Comp>
  );
};

export default Button;
