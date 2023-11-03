import Link from "next/link";

export default function DomainRow({ owner, domain, icon, keywords }) {
  return (
    <div className="flex gap-2 bg-white border border-blue-200 border-b-4 rounded-lg items-center my-3">
      {icon && <img src={icon} className="h-12 ml-4 my-4" />}
      <div className="grow pl-2">
        <Link
          href={"/domains/" + domain}
          className="font-bold text-xl leading-5 block"
        >
          {domain}
        </Link>
        {keywords.map((keywordDoc) => (
          <span key={keywordDoc._id}>
            <Link
              href={"/domains/" + domain + "/" + keywordDoc.keyword}
              className="text-xs text-gray-500 bg-slate-100 rounded-md p-1 mt-1 inline-block"
            >
              {keywordDoc.keyword}
            </Link>{" "}
          </span>
        ))}
      </div>
    </div>
  );
}
