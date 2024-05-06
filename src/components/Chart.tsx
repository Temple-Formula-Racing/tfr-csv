import { LineChart } from "@mui/x-charts/LineChart";
import MultipleSelect from "./MultipleSelect";
import { CSVMap } from "@/stores/csv-store";
import { useState } from "react";
import styles from "@/styles/charts.module.css";
import { Box, Button, Checkbox, Dialog, DialogTitle, Divider, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export type ChartProps = {
  data: CSVMap,
  headers: string[],
  onChartRemove?: () => void
}

export default function Chart(props: ChartProps) {
  const [selections, setSelections] = useState<string[]>([props.headers[0]]);
  const [showGrid, setShowGrid] = useState<boolean>(false);

  // // Options
  // const [chartOptions, setChartOptions] = useState<AdditionalOptions>({
  //   showGrid: false,
  //   showRightAxis: false,
  //   showLeftAxis: true,
  //   leftAxisHeader: selections[0],
  //   rightAxisHeader: null
  // });

  // const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  // const applyOptions = (options: AdditionalOptions) => {
  //   console.log("Applying options", options);
  //   setChartOptions(options);
  // };

  return (
    <>
      <LineChart
        series={selections.map((selection) => {
          const selectionIndexInHeaders = props.headers.indexOf(selection);
          return {
            data: Array.from(props.data.values()).map((row) => +row[selectionIndexInHeaders]),
            label: selection
          };
        })}
        height={400}
        xAxis={[{ data: Array.from(props.data.keys()) }]}

        grid={{ vertical: showGrid, horizontal: showGrid }}
      />

      <div className={styles.flexRow}>
        <MultipleSelect
          label={"Sources"}
          items={props.headers}
          selected={[props.headers[0]]} // Select by default only the first item
          selectionChange={(selected) => setSelections(selected)}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={showGrid}
              onChange={() => setShowGrid(!showGrid)}
            />
          }
          label="Show grid"
        />

        <IconButton
          sx={{ marginLeft: "auto" }}
          onClick={props.onChartRemove}
          aria-label="delete"
          color="error"
        >
          <DeleteIcon />
        </IconButton>

        {/* <Button
          onClick={() => setDialogOpen(true)}
        >Options</Button> */}
      </div>


      {/* TODO: Allow up to two axes on a single chart */}
      {/* <AdditionalOptionsDialog
        open={dialogOpen}
        existingOptions={chartOptions}
        onClose={() => setDialogOpen(false)}
        onApply={(options) => applyOptions(options)}
        possibleHeaders={selections}
      /> */}
    </>
  );
}

type AdditionalOptions = {
  showGrid: boolean
  showRightAxis: boolean,
  showLeftAxis: boolean,
  leftAxisHeader: string | null,
  rightAxisHeader: string | null,
}

type AdditionalOptionsDialogProps = {
  open: boolean,
  existingOptions: AdditionalOptions,
  onClose: () => void,
  onApply: (options: AdditionalOptions) => void, // eslint-disable-line no-unused-vars

  possibleHeaders: string[]
}
// eslint-disable-next-line no-unused-vars
function AdditionalOptionsDialog(props: AdditionalOptionsDialogProps) {

  const [chartOptions, setChartOptions] = useState<AdditionalOptions>(props.existingOptions);

  const mergeOptions = (options: Partial<AdditionalOptions>) => {
    return {
      ...props.existingOptions,
      ...options
    };
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle>Additional Options</DialogTitle>
      <Divider />
      <Box
        sx={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          minWidth: "350px"
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={chartOptions.showGrid}
              onChange={() => {
                setChartOptions({
                  ...chartOptions,
                  showGrid: !chartOptions.showGrid
                });
              }}
            />
          }
          label="Show grid"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={chartOptions.showLeftAxis}
              onChange={() => {
                setChartOptions({
                  ...chartOptions,
                  showLeftAxis: !chartOptions.showLeftAxis
                });
              }}
            />
          }
          label="Show left axis"
        />

        <FormControl>
          <InputLabel>Left axis source</InputLabel>
          <Select
            value={chartOptions.leftAxisHeader ?? ""}
            onChange={(e) => {
              setChartOptions({
                ...chartOptions,
                leftAxisHeader: e.target.value
              });
            }}
            label="Left axis source"
          >
            {props.possibleHeaders.map((header, i) => (
              <MenuItem key={i} value={header}>{header}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={chartOptions.showRightAxis}
              onChange={() => {
                setChartOptions({
                  ...chartOptions,
                  showRightAxis: !chartOptions.showRightAxis
                });
              }}
            />
          }
          label="Show right axis"
        />

        <FormControl>
          <InputLabel>Right axis source</InputLabel>
          <Select
            value={chartOptions.rightAxisHeader ?? ""}
            onChange={(e) => {
              setChartOptions({
                ...chartOptions,
                rightAxisHeader: e.target.value
              });
            }}
            label="Right axis source"
          >
            {props.possibleHeaders.map((header, i) => (
              <MenuItem key={i} value={header}>{header}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{
          alignSelf: "flex-end",
          display: "flex",
          gap: "0.5rem"
        }}>
          <Button
            onClick={props.onClose}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              props.onApply(mergeOptions({ ...chartOptions }));
              props.onClose();
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}