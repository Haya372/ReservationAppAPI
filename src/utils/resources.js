import TextForm from "../components/textform.jsx";
import Checkbox from "../components/checkbox.jsx";
import React from 'react';
import TextField from "@material-ui/core/TextField";

export default {
  'text': (props) => <TextForm {...props} />,
  'checkbox': (props) => <Checkbox {...props} />,
  'number': (props) => <TextField type="number" {...props} />,
}