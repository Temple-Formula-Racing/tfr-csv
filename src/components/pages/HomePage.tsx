"use client";

import styles from "@/styles/page.module.css";
import { Button, Card, Typography } from "@mui/material";
import VisuallyHiddenInput from "@/components/VisuallyHiddenInput";
import { useCounterStore } from "@/providers/counter-store-provider";
import Link from "next/link";

export default function HomePage() {
  const { count, incrementCount } = useCounterStore(state => state);

  return (
    <>
      <div className={styles.center}>
        <Typography variant="h2">
          Upload CSV
        </Typography>
        <Button
          variant="outlined"
          component="label"
          role={undefined}
          tabIndex={-1}
        >
          Upload
          <VisuallyHiddenInput
            type="file"
            accept=".csv"
          />
        </Button>
        <Button
          variant="contained"
          onClick={() => incrementCount()}
        >
          {count}
        </Button>
        <Button
          component={Link}
          href="/charts"
          variant="contained"
        >
          Charts
        </Button>
      </div>
    </>
  );
}
