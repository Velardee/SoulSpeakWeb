import { SVGProps } from "react";

const NotSure = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <rect
      width={22}
      height={22}
      x={1}
      y={1}
      rx={7.656}
      style={{
        fill: "#f8de40",
      }}
    />
    <path
      d="M7.055 7.313A1.747 1.747 0 1 0 8.8 9.059a1.747 1.747 0 0 0-1.745-1.746zm9.903 0A1.747 1.747 0 1 0 18.7 9.059a1.747 1.747 0 0 0-1.742-1.746z"
      style={{
        fill: "#864e20",
      }}
    />
    <path
      d="M23 13.938a14.688 14.688 0 0 1-12.406 6.531c-5.542 0-6.563-1-9.142-2.529A7.66 7.66 0 0 0 8.656 23h6.688A7.656 7.656 0 0 0 23 15.344z"
      style={{
        fill: "#e7c930",
      }}
    />
  </svg>
);
export default NotSure;
