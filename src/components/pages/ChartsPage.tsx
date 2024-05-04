"use client";

import { useCounterStore } from "@/providers/counter-store-provider";
import { Typography } from "@mui/material";

export default function ChartsPage() {
  const { count, incrementCount } = useCounterStore(state => state);

  return (
    <Typography variant="h2">
      Charts
      {count}
    </Typography>
  );
}