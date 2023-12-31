"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import DomainsList from "@/components/DomainsList";
import NewDomainForm from "@/components/NewDomainForm";

export default function Home() {
  const [domains, setDomains] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchDomains();
  }, []);
  function fetchDomains() {
    setLoading(true);
    axios.get("/api/domains").then((res) => {
      setDomains(res.data.domains);
      setKeywords(res.data.keywords);
      setLoading(false);
    });
  }
  return (
    <div>
      <NewDomainForm onNew={fetchDomains} />
      {loading && <div>Loading...</div>}
      {!loading && (
        <DomainsList domains={domains} keywords={keywords} />
      )}
    </div>
  );
}
