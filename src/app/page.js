import DomainRow from "@/components/DomainRow";
import DoubleHeader from "@/components/DoubleHeader";
import NewDomainForm from "@/components/NewDomainForm";

export default function Home() {
  return (
    <div>
      <NewDomainForm />
      <DoubleHeader
        preTitle={"domain names"}
        mainTitle={"4 domains"}
      />
      <DomainRow />
    </div>
  );
}
