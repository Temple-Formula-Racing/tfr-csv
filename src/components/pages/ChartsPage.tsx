"use client";

import { useCSVStore } from "@/providers/csv-store-provider";
import styles from "@/styles/charts.module.css";
import { TextField, Typography } from "@mui/material";

export default function ChartsPage() {
  const { fromTime, toTime, setFromTime, setToTime, csvData } = useCSVStore(state => state);

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

      <div>
        <Typography variant="h5">
          CSV Data
        </Typography>
        <pre>
          {JSON.stringify(csvData, null, 2)}
        </pre>
      </div>
    </div>
  );
}