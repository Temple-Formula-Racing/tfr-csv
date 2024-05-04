"use client";

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

async function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
  const files = e.target.files;
  console.log(files);

  if (!files) return;
  
  const file = files[0];
  console.log(file);

  // Create a new file reader object
  const reader = new FileReader();
  // Attach an event listener to the reader
  reader.addEventListener('load', e => {
    const text = e.target?.result;
    console.log("text:", text);
  });

  // This function will actually call the onload function we attached.
  reader.readAsText(file);
}

export default function VisuallyHiddenInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <_VisuallyHiddenInput
      {...props}
      // onSubmit={e => console.log(e)}
      onChange={handleOnChange}
    />
  );
};