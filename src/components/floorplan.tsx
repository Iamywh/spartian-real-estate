"use client";
export function Floorplan({
  layout = "Abierta",
  color = "Marfil",
  floor = "Madera",
  material = "Roble natural",
  kitchen = "Mediterránea",
  finish = "Mate",
  bedrooms = 1,
}: {
  layout?: string;
  color?: string;
  floor?: string;
  material?: string;
  kitchen?: string;
  finish?: string;
  bedrooms?: number;
}) {
  const wall =
    color === "Salvia" ? "#a4b5a0" : color === "Arena" ? "#d8c3a5" : "#f0ece4";
  const wood =
    material === "Nogal"
      ? "#806951"
      : material === "Piedra clara"
        ? "#d9d4ca"
        : "#c7a57d";
  return (
    <svg
      className="floorplan"
      viewBox="0 0 640 490"
      role="img"
      aria-label={`Plano conceptual: ${layout}, ${bedrooms} dormitorios, suelo ${floor}, color ${color}, cocina ${kitchen}, material ${material}, acabado ${finish}. Sin escala.`}
    >
      <defs>
        <pattern id="wood" width="34" height="25" patternUnits="userSpaceOnUse">
          <rect width="34" height="25" fill="#e8d8c2" />
          <path d="M0 25H34 M34 0V25" stroke="#cbb899" strokeWidth="1" />
        </pattern>
        <pattern id="tile" width="35" height="35" patternUnits="userSpaceOnUse">
          <rect width="35" height="35" fill="#eeebe5" stroke="#cbc7be" />
        </pattern>
      </defs>
      <rect
        x="42"
        y="42"
        width="554"
        height="394"
        fill={
          floor === "Madera"
            ? "url(#wood)"
            : floor === "Porcelánico"
              ? "url(#tile)"
              : "#d6d2ca"
        }
        stroke="#344039"
        strokeWidth="9"
      />
      <rect x="47" y="47" width="544" height="384" fill={wall} opacity=".24" />
      <path
        d="M395 45V265 M395 323V436 M45 272H265 M320 272H395 M495 272H595"
        stroke="#344039"
        strokeWidth="7"
        fill="none"
      />
      <path d="M395 272H438" stroke="#344039" strokeWidth="7" />
      <rect x="63" y="61" width="196" height="37" fill={wood} />
      <rect x="63" y="61" width="37" height="105" fill={wood} />
      <rect
        x="120"
        y="68"
        width="43"
        height="23"
        rx="5"
        fill="#f6f5ef"
        stroke="#888"
      />
      <g fill="#333">
        <circle cx="205" cy="72" r="4" />
        <circle cx="224" cy="72" r="4" />
        <circle cx="205" cy="85" r="4" />
        <circle cx="224" cy="85" r="4" />
      </g>
      {kitchen !== "Minimalista" && (
        <rect
          x="165"
          y="121"
          width={kitchen === "Contemporánea" ? 135 : 98}
          height="35"
          rx="3"
          fill={wood}
          stroke="#888"
        />
      )}
      <rect
        x="255"
        y="173"
        width="101"
        height="49"
        rx="8"
        fill={wall}
        stroke="#777"
      />
      <rect
        x="247"
        y="174"
        width="15"
        height="55"
        rx="4"
        fill={wall}
        stroke="#777"
      />
      <rect
        x="350"
        y="174"
        width="15"
        height="55"
        rx="4"
        fill={wall}
        stroke="#777"
      />
      <ellipse cx="304" cy="242" rx="30" ry="13" fill={wood} />
      {bedrooms === 1 ? (
        <>
          <rect
            x="435"
            y="76"
            width="113"
            height="143"
            rx="4"
            fill="#faf9f6"
            stroke="#8b887f"
          />
          <rect x="436" y="118" width="111" height="98" fill={wall} />
          <rect x="445" y="85" width="43" height="25" rx="5" fill="#fff" />
          <rect x="497" y="85" width="43" height="25" rx="5" fill="#fff" />
        </>
      ) : (
        Array.from({ length: Math.min(bedrooms, 3) }, (_, i) => {
          const h = 220 / Math.min(bedrooms, 3);
          return (
            <g key={i}>
              <path
                d={`M395 ${45 + i * h}H595`}
                stroke="#344039"
                strokeWidth="5"
              />
              <rect
                x="475"
                y={53 + i * h}
                width="78"
                height={h - 20}
                fill={wall}
                stroke="#777"
              />
              <rect
                x="480"
                y={57 + i * h}
                width="25"
                height="16"
                fill="white"
              />
              <text x="437" y={78 + i * h} style={{ fontSize: 9 }}>
                Hab. {i + 1}
              </text>
            </g>
          );
        })
      )}
      <rect
        x="419"
        y="329"
        width="53"
        height="83"
        fill="#f3f0ea"
        stroke="#888"
      />
      <ellipse cx="540" cy="390" rx="16" ry="22" fill="white" stroke="#888" />
      <rect
        x="515"
        y="292"
        width="55"
        height="32"
        rx="8"
        fill="white"
        stroke="#888"
      />
      {layout === "Con estudio" ? (
        <>
          <path d="M220 275V435" stroke="#344039" strokeWidth="6" />
          <rect x="73" y="299" width="103" height="38" fill={wood} />
          <circle cx="123" cy="354" r="15" fill={wall} stroke="#777" />
          <text x="130" y="398">
            Estudio
          </text>
        </>
      ) : (
        <>
          <circle cx="171" cy="355" r="42" fill={wood} />
          <g fill={wall} stroke="#777">
            <rect x="117" y="343" width="17" height="24" rx="4" />
            <rect x="209" y="343" width="17" height="24" rx="4" />
            <rect x="159" y="300" width="24" height="17" rx="4" />
            <rect x="159" y="394" width="24" height="17" rx="4" />
          </g>
        </>
      )}
      <g stroke="#aac3c4" strokeWidth="7">
        <path d="M103 42H218 M445 42H554 M42 302V397" />
      </g>
      <g fill="#344039">
        <text x="205" y="190">
          Zona de día
        </text>
        {bedrooms === 1 && (
          <text x="490" y="251">
            Dormitorio
          </text>
        )}
        <text x="505" y="351">
          Baño
        </text>
        <text x="305" y="379">
          Entrada
        </text>
      </g>
      <text x="321" y="478" className="plan-note">
        PLANO ILUSTRATIVO · SIN ESCALA · NO CONTRACTUAL
      </text>
      {finish === "Satinado" && (
        <rect
          x="45"
          y="45"
          width="548"
          height="387"
          fill="white"
          opacity=".1"
        />
      )}
    </svg>
  );
}
