import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import asyncValidate from './asyncValidate';
import validate from './validate';
/*import { DB_CONFIG } from '../../Config/config';
import firebase from 'firebase';
import feedbackSaved from '../../store/actions/feedback'; 
import {connect} from 'react-redux';*/
import { Header, Image, Button, Grid, Message, Form, Segment} from 'semantic-ui-react';
import logoImg from '../../assets/logo.png';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import classes from './Feedback.css'


const renderTextField = (
  { input, label, meta: { touched, error }, ...custom },
) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
  />
);


const renderSelectField = (
  { input, label, meta: { touched, error }, children, ...custom },
) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
);
/*
const handleSend = () => {
  const feedbackFormValues = {
    'type':'feedback',
    'email':this.state.refs.email.value,
    'name':this.state.refs.name.value,
    'feedback':this.state.refs.feedback.value
}
firebase.push('/feedback', feedbackFormValues)
  
}
*/


const Feedback = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
   
    <Form size="small"style={{ background:'#F0F0F0'}}>
    <Grid >
    <Grid.Column >
    <Header as='h1' color='yellow' textAlign='center'>
    <Image src={logoImg} />
    Give your Feedback
   </Header>
   <Segment stacked>
    <form onSubmit={handleSubmit} className={classes.Feedback}>

  <div>
        <Field
          name="Name"
          component={renderTextField}
          label="Name"
        />
  </div>
  <div>
        <Field name="email" component={renderTextField} label="Email" />
  </div>
  <div>
        <Field
          name="Type"
          component={renderSelectField}
          label="Type"
        >
          <MenuItem value="ff0000" primaryText="Question" />
          <MenuItem value="00ff00" primaryText="Comment" />
          <MenuItem value="0000ff" primaryText="Opinion" />
        </Field>
  </div>
   
  <div>
        <Field
          name="Feedback"
          component={renderTextField}
          label="Feedback"
          multiLine={true}
          rows={2}
        />
  </div>
  <div>
        <Field name="Agree" component={renderCheckbox} label="I agree to the terms and conditions." />
  </div>

  <div>
        <Button color="yellow" type="submit" fluid disabled={pristine || submitting}>Send</Button>
  </div>
    
  </form>
    </Segment>
    <Message size="small" color="yellow" Align='center'>
        Your Feedback is Important to us.
    </Message>
    </Grid.Column>
    </Grid>
    </Form>

    </MuiThemeProvider>
  );
};

export default reduxForm({
  form: 'MaterialUiForm', // a unique identifier for this form
  validate,
  asyncValidate,
})(Feedback);
/*
const mapDisptachToProps = dispatch => {
  return bindActionCreators({feedbackSaved: feedbackSaved},dispatch)
}
export default connect(mapDisptachToProps)(Feedback)
*/