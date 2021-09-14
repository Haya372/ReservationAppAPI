import TextForm from "../components/textform.jsx";
import Checkbox from "../components/checkbox.jsx";
import React from 'react';
import TextField from "@material-ui/core/TextField";
import Datetime from "../components/datetime.jsx";
import UserChips from "../components/userChips.jsx";
import Password from "../components/password.jsx";

export default {
  'text': (props) => <TextForm {...props} />,
  'checkbox': (props) => <Checkbox {...props} />,
  'number': (props) => <TextField type="number" {...props} />,
  'datetime': (props) => <Datetime {...props} />,
  'user': (props) => <UserChips {...props} />,
  'password': (props) => <Password {...props} />,
}