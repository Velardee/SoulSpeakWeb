import { SVGProps } from "react";

const Concerned = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <defs>
      <style>{".concerned{fill:#7380af}"}</style>
    </defs>
    <rect
      width={22}
      height={22}
      x={1}
      y={1}
      rx={7.656}
      style={{
        fill: "#98a4d2",
      }}
    />
    <path
      d="M7.055 7.313A1.747 1.747 0 1 0 8.8 9.059a1.747 1.747 0 0 0-1.745-1.746zm9.903 0A1.747 1.747 0 1 0 18.7 9.059a1.747 1.747 0 0 0-1.742-1.746z"
      style={{
        fill: "#fff",
      }}
    />
    <path
      d="M23 13.938a14.69 14.69 0 0 1-12.406 6.531c-5.542 0-6.563-1-9.142-2.529A7.66 7.66 0 0 0 8.656 23h6.688A7.656 7.656 0 0 0 23 15.344z"
      className="concerned"
    />
    <path
      d="M16.083 12.556A5.487 5.487 0 0 0 12 10.806a5.487 5.487 0 0 0-4.083 1.75c-.959 1.292-.147 2.667.885 2.583s2.781-.285 3.2-.285 2.167.2 3.2.285 1.84-1.291.881-2.583z"
      style={{
        fill: "#3d4e78",
      }}
    />
    <path
      d="M13.965 15.91a9.842 9.842 0 0 0-1.965-.3 9.842 9.842 0 0 0-1.965.3c-.294.061-.3.3 0 .261s1.965-.13 1.965-.13 1.663.09 1.965.13.294-.2 0-.261z"
      className="concerned"
    />
  </svg>
);
export default Concerned;