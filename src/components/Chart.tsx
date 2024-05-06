import { LineChart } from "@mui/x-charts/LineChart";
import MultipleSelect from "./MultipleSelect";
import { CSVMap } from "@/stores/csv-store";
import { useState } from "react";

type ChartProps = {
  data: CSVMap,
  headers: string[]
}

export default function Chart(props: ChartProps) {
  const [selections, setSelections] = useState<string[]>(props.headers.slice(1));

  return (
    <>
      <LineChart
        series={selections.map((selection) => {
          const selectionIndexInHeaders = props.headers.indexOf(selection);
          console.log("selection", selection, "selectionIndexInHeaders", selectionIndexInHeaders);
          return {
            data: Array.from(props.data.values()).map((row) => +row[selectionIndexInHeaders]),
            label: selection
          };
        })}
        height={400}
        xAxis={[{ data: Array.from(props.data.keys()) }]}
      />

      <MultipleSelect
        label={"Sources"}
        items={props.headers}
        selected={[props.headers[0]]} // Select by default only the first item
        selectionChange={(selected) => {
          setSelections(selected);
          console.log("New selections!", selected);
        }}
      />
    </>
  );
}