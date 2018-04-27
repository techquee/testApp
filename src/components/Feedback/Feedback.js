import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Popup from 'reactjs-popup'
import asyncValidate from './asyncValidate';
import validate from './validate';
import {database} from '../../Config/config';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {sendFeedback} from '../../store/actions/feedback';
import { Header, Image, Button, Grid, Message, Form, Segment} from 'semantic-ui-react';
import logoImg from '../../assets/logo.png';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import classes from './Feedback.css'


const renderTextField = (
  { input, label, meta: { touched, error }, ...custom
  }) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
)

const renderSelectField = (
  { input, label, meta: { touched, error }, children, ...custom }
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

class Feedback extends Component{
  constructor(props){
    super(props);
    this.state={
      addFormValue:'',
      addEmailValue:'',
      feedback:null,
      email:null
    };
 
    this.handleFormSubmit=this.handleFormSubmit.bind(this);
}
handleFormSubmit = event =>{
  const values = this.props;
  alert(values);
  const {sendFeedback } = this.props;
  event.preventDefault();
  sendFeedback({
    feedback: this.state.addFormValue,
    email:this.state.addEmailValue
  });
  this.setState({
    addFormValue: "",
    addEmailValue:""
  });
};
handleInputChange = event => {
  this.setState({
     addFormValue:event.target.value,
   
   });
};
handleEmailInputChange = event => {
  this.setState({
    
     addEmailValue:event.target.value
   });
};
/*componentDidMount(){
  database.ref().child("feedback").on('value',(snapshot)=>{
    console.log(Object.values(snapshot.val()));
    this.setState({
      feedback:Object.values(snapshot.val())
    });
  })
}
submitMyForm(data) {
  const {createRecord, resetForm} = this.props;
  this.handleSubmit=this.handleSubmit.bind(this);
  return createRecord(data).then(() => {
    resetForm();
    // do other success stuff
  });
}*/
  render(){
    const { pristine, submitting, addFormValue,addEmailValue, handleSubmit } = this.props;
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
    <form onSubmit={this.handleFormSubmit} className={classes.Feedback}>

  <div>
        <Field
          name="name"
          component={renderTextField}
          label="Name"
        />
  </div>
  <div>
        <Field 
        name="email" 
        component={renderTextField} 
        label="Email" 
        value={addEmailValue}
        onChange={this.handleEmailInputChange}
        />
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
        <Field name="Gender" component={renderRadioGroup}>
          <RadioButton value="male" label="male" />
          <RadioButton value="female" label="female" />
        </Field>
  </div>
  <div>
        <Field
          name="feedback"
          component={renderTextField}
          label="Feedback"
          value={addFormValue}
          onChange={this.handleInputChange}
          multiLine={true}
          rows={2}
        />
  </div>
  <div>
    
    <Button color="yellow" 
    onClick={()=>this.handleFormSubmit} fluid 
    type="submit" 
    disabled={pristine || submitting}>
    Send
    </Button>
    </div>
    
  </form>
    </Segment>
    <Message size="small" color="yellow" align='center'>
        Your Feedback is Important to us.
    </Message>
    </Grid.Column>
    </Grid>
    </Form>

    </MuiThemeProvider>
  );
};
}
let form = reduxForm({
  form: 'Feedback', // a unique identifier for this form
  validate,
  asyncValidate
})(Feedback);


function mapDispatchToProps(dispatch){
  return bindActionCreators({sendFeedback:sendFeedback}, dispatch)
}

form = connect(null, mapDispatchToProps)(form);
export default form;

