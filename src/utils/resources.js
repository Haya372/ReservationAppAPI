import TextForm from "../components/textform.jsx";
import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';

export default {
  'text': (props) => <TextForm {...props} />,
  'chechbox': (props) => <Checkbox {...props} />,
}