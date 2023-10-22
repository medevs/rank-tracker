import Image from "next/image";
import Link from "next/link";

export default function DomainRow({ owner, domain, icon }) {
  return (
    <div className="flex gap-2 bg-white border border-blue-200 border-b-4 rounded-lg items-center my-3">
      {icon && (
        <Image width={48} height={48} alt={domain} src={icon} className="h-12 ml-4 my-4" />
      )}
      <div className="grow pl-2">
        <Link
          href={"/domains/" + domain}
          className="font-bold text-xl leading-5 block"
        >
          {domain}
        </Link>
      </div>
    </div>
  );
}
