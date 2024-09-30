import { SVGProps } from "react";

const Frustrated = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <defs>
      <style>{".b{fill:#e7c930}.c{fill:#864e20}"}</style>
    </defs>
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
      d="M23 13.938a14.69 14.69 0 0 1-12.406 6.531c-5.542 0-6.563-1-9.142-2.529A7.66 7.66 0 0 0 8.656 23h6.688A7.656 7.656 0 0 0 23 15.344z"
      className="b"
    />
    <ellipse cx={12} cy={13.375} className="c" rx={5.479} ry={0.297} />
    <ellipse cx={7.054} cy={9.059} className="c" rx={2.157} ry={0.309} />
    <ellipse cx={16.957} cy={9.059} className="c" rx={2.157} ry={0.309} />
    <ellipse cx={12} cy={14.646} className="b" rx={1.969} ry={0.229} />
  </svg>
);
export default Frustrated;
