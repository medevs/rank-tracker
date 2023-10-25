import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Keyword } from "@/models/Keyword";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { URL } from "url";

export async function POST(req) {
  mongoose.connect(process.env.MONGODB_URI);
  const data = await req.json();
  const session = await getServerSession(authOptions);
  const keywordDoc = await Keyword.create({
    domain: data.domain,
    keyword: data.keyword,
    owner: session.user.email,
  });
  return Response.json(keywordDoc);
}

export async function GET(req) {
  const url = new URL(req.url);
  const domain = url.searchParams.get("domain");
  const keyword = url.searchParams.get("keyword");
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  const keywordsDocs = await Keyword.find(
    keyword
      ? { domain, keyword, owner: session.user.email }
      : { domain, owner: session.user.email }
  );
  return Response.json({
    keywords: keywordsDocs
  });
}
