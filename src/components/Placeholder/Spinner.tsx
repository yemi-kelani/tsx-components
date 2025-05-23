import "./Spinner.scss";

interface SpinnerProps {
  style?: React.CSSProperties;
}

/**
 * Renders an animated Spinner object to symbolize loading. To be used as a placeholder.
 * 
 * @param props.style - A style object containing css properties.
 * @returns A Spinner component element.
 */
export const Spinner = ({ style = {} }: SpinnerProps) => {
  return <div style={style} className="tsx-cmpnts-spinner" />;
};
