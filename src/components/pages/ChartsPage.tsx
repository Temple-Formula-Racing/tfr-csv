"use client";

import { useCSVStore } from "@/providers/csv-store-provider";
import styles from "@/styles/charts.module.css";
import { TextField, Typography } from "@mui/material";

import { LineChart } from "@mui/x-charts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MultipleSelect from "../MultipleSelect";
import { useDebounce } from "@uidotdev/usehooks";

export default function ChartsPage() {
  const { fromTime, toTime, setFromTime, setToTime, csvMap, csvHeaders } = useCSVStore(state => state);

  const debouncedFromTime = useDebounce(fromTime, 500);
  const debouncedToTime = useDebounce(toTime, 500);

  const [selections, setSelections] = useState<string[]>(csvHeaders.slice(1));

  const router = useRouter();

  useEffect(() => {
    // If the CSV data is empty, redirect to the homepage
    if (csvMap.size === 0) {
      router.replace("/");
    }
  }, [csvMap, router]);

  // Only grab map entries that are within the time range
  const data = new Map(
    Array.from(csvMap.entries())
      .filter(([time]) => time >= debouncedFromTime && time <= debouncedToTime)
  );

  return (
    <div className={styles.flexColumn}>
      <div className={styles.flexRow}>
        <Typography variant="h5">
          Time scale
        </Typography>
        <TextField
          label="From"
          variant="outlined"
          value={fromTime}
          onChange={(e) => setFromTime(+e.target.value)}
        />
        <TextField
          label="To"
          variant="outlined"
          value={toTime}
          onChange={(e) => setToTime(+e.target.value)}
        />
      </div>

      <LineChart
        series={selections.map((selection) => {
          const selectionIndexInHeaders = csvHeaders.indexOf(selection);
          console.log("selection", selection, "selectionIndexInHeaders", selectionIndexInHeaders);
          return {
            data: Array.from(data.values()).map((row) => +row[selectionIndexInHeaders]),
            label: selection
          };
        })}
        height={400}
        xAxis={[{ data: Array.from(data.keys()) }]}
      />

      <MultipleSelect
        label={"Sources"}
        items={csvHeaders}
        selected={[csvHeaders[0]]} // Select by default only the first item
        selectionChange={(selected) => {
          setSelections(selected);
          console.log("New selections!", selected);
        }}
      />
    </div>
  );
}