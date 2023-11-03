import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Domain } from "@/models/Domain";
import axios from "axios";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import DomParser from "dom-parser";

/**
 * @author /medevs
 * Retrieves the URL of the icon associated with a given domain by parsing the HTML of the domain's homepage.
 * @param {string} domain - The domain for which to retrieve the icon URL.
 * @returns {Promise<string>} The URL of the icon associated with the given domain.
 */
async function getIconUrl(domain) {
  const response = await axios.get(`https://` + domain);
  const parser = new DomParser();
  const parsedHTML = parser.parseFromString(response.data, "text/html");
  const links = parsedHTML.getElementsByTagName("link");
  let href = "";
  for (const link of links) {
    const rel = link.attributes?.find((a) => a.name === "rel")?.value || "";
    if (rel.includes("icon")) {
      href = link.attributes?.find((a) => a.name === "href")?.value;
    }
  }
  if (href.includes("://")) {
    return href;
  } else {
    return `https://` + domain + href;
  }
}

/**
 * @author /medevs
 * Handles a POST request.
 * Retrieves data from the request body, connects to a MongoDB database,
 * retrieves the user session using NextAuth, calls a helper function to get the icon URL of a given domain,
 * creates a new document in the "Domain" collection of the database,
 * and returns the created document as the response.
 *
 * @param {object} req - The request object containing the JSON body with a "domain" property.
 * @returns {Promise} - A promise that resolves with the created document in the "Domain" collection of the database.
 */
export async function POST(req) {
  const data = await req.json();
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  let icon = null;
  try {
    icon = await getIconUrl(data?.domain);
  } catch (e) {
    console.error(e);
  }
  const doc = await Domain.create({
    domain: data?.domain,
    owner: session?.user?.email,
    icon,
  });
  return Response.json(doc);
}

/**
 * @author /medevs
 * Retrieves data from a MongoDB database and returns it as a JSON response.
 *
 * @returns {Promise<Object>} A JSON response containing the retrieved domains, keywords, and results.
 */
export async function GET() {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  const email = session.user?.email;
  const domains = await Domain.find({ owner: email });
  const keywords = await Keyword.find({
    owner: email,
    domain: domains.map((doc) => doc.domain),
  });
  const results = await Result.find({
    domain: domains.map((doc) => doc.domain),
    keyword: keywords.map((doc) => doc.keyword),
  });
  return Response.json({ domains, keywords, results });
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGODB_URI);
  const url = new URL(req.url);
  const domain = url.searchParams.get("domain");
  const session = await getServerSession(authOptions);
  await Domain.deleteOne({ owner: session.user?.email, domain });
  return Response.json(true);
}
