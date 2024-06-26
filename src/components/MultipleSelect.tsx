import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

type MultipleSelectProps = {
  label: string;
  items: string[];
  width?: number;
  selected?: string[];
  selectionChange?: (selected: string[]) => void; // eslint-disable-line no-unused-vars
}

export default function MultipleSelect(props: MultipleSelectProps) {
  const [selections, setSelections] = useState<string[]>(props.selected ?? []);

  useEffect(() => {
    props.selectionChange?.(selections);
  }, [selections, props]);

  const handleChange = (event: SelectChangeEvent<typeof selections>) => {
    const { target: { value } } = event;

    setSelections(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <FormControl sx={{ width: props.width ?? 300 }}>
        <InputLabel id={props.label}>{props.label}</InputLabel>
        <Select
          multiple
          value={selections}
          onChange={handleChange}
          input={<OutlinedInput label={props.label} />}
          renderValue={(selected) => selected.join(', ')}
        >
          {props.items.map((item, i) => (
            <MenuItem key={i} value={item}>
              <Checkbox checked={selections.indexOf(item) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}