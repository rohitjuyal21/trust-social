import React from "react";

const Logo = ({ className }: { className: string }) => {
  return (
    <div>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="512.000000pt"
        height="512.000000pt"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
        className={className}
      >
        <g
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          fill="hsl(var(--foreground))"
          stroke="hsl(var(--foreground))"
          strokeWidth="50"
        >
          <path
            d="M2252 4308 c-23 -30 -1652 -2898 -1651 -2910 0 -7 62 -121 137 -253
l137 -240 1645 -3 c905 -1 1655 0 1666 3 16 3 59 70 158 245 75 132 136 245
136 251 0 10 -1633 2883 -1652 2907 -8 9 -78 12 -288 12 -210 0 -280 -3 -288
-12z m1322 -1468 l794 -1395 -654 -3 c-360 -1 -948 -1 -1307 0 l-654 3 106
185 106 185 855 0 c470 0 861 4 868 8 6 5 12 17 12 28 0 15 -1251 2230 -1337
2367 l-14 22 215 -2 216 -3 794 -1395z m-641 211 c356 -626 647 -1141 647
-1145 0 -3 -94 -6 -209 -6 l-210 0 -297 523 c-163 287 -356 626 -428 752 -146
257 -156 267 -199 198 -13 -21 -313 -546 -666 -1168 -354 -621 -650 -1141
-658 -1154 -14 -22 -18 -18 -119 160 -58 100 -103 188 -102 194 5 19 1582
2785 1588 2785 3 0 296 -513 653 -1139z m-543 38 c100 -176 102 -182 88 -208
-283 -489 -833 -1461 -836 -1477 -2 -11 3 -26 11 -32 11 -9 341 -13 1365 -14
l1351 -3 -107 -187 -107 -188 -1593 0 -1594 0 19 32 c11 18 304 534 652 1146
349 611 637 1112 641 1112 5 0 54 -82 110 -181z m416 -726 l260 -458 -263 -3
c-145 -1 -382 -1 -526 0 l-264 3 261 458 c143 251 263 457 266 457 3 0 123
-206 266 -457z"
          />
        </g>
      </svg>
    </div>
  );
};

export default Logo;