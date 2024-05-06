"use client";

import { useCSVStore } from "@/providers/csv-store-provider";
import { styled } from "@mui/material";

const _VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export async function parseCSV(data: string) {
  const rows = data.split('\n');

  const headers = rows[0].split(',').map(r => r.trim());

  const body = rows.slice(1);
  const dataRows = body.map(row =>
    row.split(',') // Split each row by commas
      .map(r => r.trim()) // Trimming whitespace from each cell
      .filter(row => !isNaN(+row[0])) // Filter out rows that don't have a number in the first cell
  ).filter(row => row.length !== 0); // Filter out rows that are empty

  return {
    headers,
    dataRows
  };
}

type VisuallyHiddenCSVProps = React.InputHTMLAttributes<HTMLInputElement> & {
  // Create callback prop
  finishedLoadingCB?: (e: void) => void; // eslint-disable-line no-unused-vars
}

export default function VisuallyHiddenCSVUpload(props: VisuallyHiddenCSVProps) {

  const { setCSVMap, setCSVHeaders, setFromTime, setToTime } = useCSVStore(state => state);

  async function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.time('parseCSV');
    const files = e.target.files;

    if (!files) return;

    const file = files[0];

    // Create a new file reader object
    const reader = new FileReader();
    // Attach an event listener to the reader
    reader.addEventListener('load', async e => {
      const text = e.target?.result;

      if (typeof text !== 'string') return;

      const data = await parseCSV(text);
      // setCSVData(data);
      setCSVHeaders(data.headers.slice(1));
      
      const mapData = new Map<number, string[]>();
      data.dataRows.forEach((row) => {
        mapData.set(+row[0], row.slice(1));
      });
      setCSVMap(mapData);

      console.log("mapdata", mapData);

      const timeData = data.dataRows.map(row => row[0]);

      setFromTime(+timeData[0]);
      setToTime(+timeData[150]); // Only show the first few data points

      props.finishedLoadingCB?.();

      console.timeEnd('parseCSV');
    });

    // This function will actually call the onload function we attached.
    reader.readAsText(file);
  }

  return (
    <_VisuallyHiddenInput
      {...props}
      // onSubmit={e => console.log(e)}
      onChange={handleOnChange}
    />
  );
};