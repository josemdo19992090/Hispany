export default function ChiguiMascot({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Chigui, el capibara mascota de Hispany"
    >
      {/* cuerpo */}
      <ellipse cx="60" cy="62" rx="46" ry="30" fill="#B98650" />
      {/* panza */}
      <ellipse cx="60" cy="72" rx="30" ry="16" fill="#D9B48F" />
      {/* cabeza */}
      <ellipse cx="94" cy="46" rx="24" ry="20" fill="#B98650" />
      {/* hocico */}
      <ellipse cx="108" cy="52" rx="10" ry="8" fill="#D9B48F" />
      {/* nariz */}
      <ellipse cx="115" cy="50" rx="3" ry="2.4" fill="#3F2A1D" />
      {/* ojo */}
      <circle cx="98" cy="40" r="3" fill="#3F2A1D" />
      {/* oreja */}
      <circle cx="82" cy="28" r="5" fill="#8B5E3C" />
      {/* patas */}
      <rect x="34" y="82" width="10" height="14" rx="4" fill="#8B5E3C" />
      <rect x="76" y="82" width="10" height="14" rx="4" fill="#8B5E3C" />
      {/* mejilla sonrojada */}
      <ellipse cx="102" cy="52" rx="4" ry="2.5" fill="#E3A08C" opacity="0.6" />
    </svg>
  );
}
