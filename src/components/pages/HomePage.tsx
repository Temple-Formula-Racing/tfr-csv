"use client";

import styles from "@/styles/homepage.module.css";
import { Button, Typography } from "@mui/material";
import VisuallyHiddenCSVUpload from "@/components/VisuallyHiddenInput";
// import { useCSVStore } from "@/providers/csv-store-provider";
import { useRouter } from "next/navigation";

export default function HomePage() {

  const router = useRouter();

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
          <VisuallyHiddenCSVUpload
            type="file"
            accept=".csv"
            finishedLoadingCB={() => {
              console.log("Finished loading");
              router.push("/charts");
            }}
          />
        </Button>
      </div>
    </>
  );
}
