import React, { FC, useEffect, useState } from "react";
import Slider from "react-input-range";

import "react-input-range/lib/css/index.css";

interface Range {
  min: number;
  max: number;
}

interface Props {
  input: {
    name: string;
    value: string;
    onChange: (e: any) => void;
  };
  meta: unknown;
  id: string;
  label: string;
  type: string;
  range: Range;
}

const Range: FC<Props> = (props) => {
  const [range, setRange] = useState(props.range);
  const [value, setValue] = useState<Range>(range);

  useEffect(() => {
    setRange(props.range);
    setValue(props.range);
  }, [props.range]);

  const onInputChange = (values: number | Range) => {
    setValue(values as Range);
    props.input.onChange(values);
  };

  return (
    <div className="range-slider">
      <label>{props.label}</label>
      <Slider
        onChange={onInputChange}
        minValue={range.min}
        maxValue={range.max}
        value={value}
      />
    </div>
  );
};

Range.defaultProps = {
  range: { min: 0, max: 100 },
};

export { Range };
