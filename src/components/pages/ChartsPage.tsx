"use client";

import { useCSVStore } from "@/providers/csv-store-provider";
import styles from "@/styles/charts.module.css";
import { Button, TextField, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// import { LineChart } from "@mui/x-charts";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import MultipleSelect from "../MultipleSelect";
import { useDebounce } from "@uidotdev/usehooks";
import Link from "next/link";
import Chart from "../Chart";

export default function ChartsPage() {
  const { fromTime, toTime, setFromTime, setToTime, csvMap, csvHeaders } = useCSVStore(state => state);

  const debouncedFromTime = useDebounce(fromTime, 500);
  const debouncedToTime = useDebounce(toTime, 500);

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

      <Chart
        data={data}
        headers={csvHeaders}  
      />

      <Button
        component={Link}
        href="/"
        startIcon={<ArrowBackIcon />}
      >
        Go home
      </Button>
    </div>
  );
}