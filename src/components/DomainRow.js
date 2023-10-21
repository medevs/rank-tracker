/* eslint-disable @next/next/no-img-element */

export default function DomainRow() {
  return (
    <div className="flex gap-2 bg-white border border-blue-200 border-b-4 rounded-lg items-center my-3">
      <img src="" className="h-12 ml-4 my-4" alt="img" />
      <div className="grow pl-2">
        link...
        <span>Keyword 1</span>
        <span>Keyword 2</span>
        <span>Keyword 3</span>
      </div>
      <div className="pt-2">chart</div>
    </div>
  );
}
