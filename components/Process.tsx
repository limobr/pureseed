import Reveal from "./Reveal";
import { processSteps } from "@/lib/data";

/** The five stages from origin to shipment. A true sequence, so it is numbered. */
export default function Process() {
  return (
    <Reveal as="ol" anim="stagger" className="steps">
      {processSteps.map((s) => (
        <li key={s.h}><h3>{s.h}</h3><p>{s.p}</p></li>
      ))}
    </Reveal>
  );
}
