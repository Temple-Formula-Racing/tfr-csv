import Image from "next/image";
import styles from "./page.module.css";
import { Button, Typography } from "@mui/material";
import VisuallyHiddenInput from "@/components/VisuallyHiddenInput";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <a
            href="https://sites.temple.edu/templeformularacing/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/cropped-TFR-black-300x139.png"
              alt="TFR Logo"
              className={styles.vercelLogo}
              width={100}
              height={46}
              priority
            />
          </a>
        </div>
      </div>

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
      </div>

      <div className={styles.grid}>
        
      </div>
    </main>
  );
}
