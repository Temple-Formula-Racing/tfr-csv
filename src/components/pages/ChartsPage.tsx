"use client";

import { useCSVStore } from "@/providers/csv-store-provider";
import styles from "@/styles/charts.module.css";
import { TextField, Typography } from "@mui/material";

import { LineChart } from "@mui/x-charts";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MultipleSelect from "../MultipleSelect";

export default function ChartsPage() {
  const { fromTime, toTime, setFromTime, setToTime, csvMap, csvHeaders } = useCSVStore(state => state);

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
      .filter(([time]) => time >= fromTime && time <= toTime)
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
        series={[
          {
            data: Array.from(data.values()).map(val => +val[0])
          }
        ]}
        height={400}
        xAxis={[{ data: Array.from(data.keys()) }]}
      />

      <MultipleSelect
        label={"Sources"}
        items={csvHeaders}
      />
    </div>
  );
}