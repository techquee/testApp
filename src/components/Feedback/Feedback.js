import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
)

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

class Feedback extends Component{
  constructor(props){
    super(props);
    this.state={
      /* name:null,
      email:null,
      sendfeedback:[],*/
      feedback:null
    };
    this._handleSubmit=this._handleSubmit.bind(this);
}
_handleSubmit(e){
  this.props.sendFeedback({
    /*name:this.state.name,
    email:this.state.email,*/
    feedback:this.state.feedback
  })
  
  this.setState({
    /*name:'',
    email:'',*/
    feedback:''
})
}
/*componentDidMount(){
  database.ref().child("feedback").on('value',(snapshot)=>{
    console.log(Object.values(snapshot.val()));
    this.setState({
      feedback:Object.values(snapshot.val())
    });
  })
}*/
  render(){
    const { pristine, submitting } = this.props;
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
    <form onSubmit={this._handleSubmit} className={classes.Feedback}>

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
        <Field name="sex" component={renderRadioGroup}>
          <RadioButton value="male" label="male" />
          <RadioButton value="female" label="female" />
        </Field>
      </div>
  <div>
        <Field
          name="feedback"
          component={renderTextField}
          label="Feedback"
          multiLine={true}
          rows={2}
        />
  </div>
  <div>
        <Button color="yellow" onClick={()=>this._handleSubmit} type="submit" fluid disabled={pristine || submitting}>Send</Button>
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
}
let form = reduxForm({
  form: 'FeedbackForm', // a unique identifier for this form
  validate,
  asyncValidate
})(Feedback);

function mapDispatchToProps(dispatch){
  return bindActionCreators({sendFeedback:sendFeedback}, dispatch)
}

form = connect(null, mapDispatchToProps)(form);
export default form;
