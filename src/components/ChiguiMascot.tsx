import Image from "next/image";

export default function ChiguiMascot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <Image
        src="/mascota/chigui.jpeg"
        alt="Chigui, el capibara mascota de Hispany"
        fill
        sizes="200px"
        className="object-contain"
        priority
      />
    </span>
  );
}
