import TextForm from "../components/textform.jsx";
import Checkbox from "../components/checkbox.jsx";
import React from 'react';
import TextField from "@material-ui/core/TextField";
import Datetime from "../components/datetime.jsx";
import UserChips from "../components/userChips.jsx";
import Password from "../components/password.jsx";
import Flg from "../components/flg.jsx";
import Chips from "../components/arrayText.jsx";

export default {
  'text': (props) => <TextForm {...props} />,
  'checkbox': (props) => <Checkbox {...props} />,
  'number': (props) => <TextField type="number" {...props} />,
  'datetime': (props) => <Datetime {...props} />,
  'user': (props) => <UserChips {...props} />,
  'password': (props) => <Password {...props} />,
  'textmulti': (props) => <TextField multiline maxRows="10" minRows="10" {...props} />,
  'flg': (props) => <Flg {...props} />,
  'arraytext': (props) => <Chips {...props} />
}