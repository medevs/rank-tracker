import Link from "next/link";

export default function KeywordRow({ keyword }) {
  return (
    <div className="flex gap-2 bg-white border border-blue-200 border-b-4 pr-0 rounded-lg items-center my-3">
      <Link
        href={"/domains/" + domain + "/" + encodeURIComponent(keyword)}
        className="font-bold grow block p-4"
      >
        {keyword}
      </Link>
    </div>
  );
}
