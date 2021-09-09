import TextForm from "../components/textform.jsx";
import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';
import TextField from "@material-ui/core/TextField";

export default {
  'text': (props) => <TextForm {...props} />,
  'chechbox': (props) => <Checkbox {...props} />,
  'number': (props) => <TextField type="number" {...props} />,
}