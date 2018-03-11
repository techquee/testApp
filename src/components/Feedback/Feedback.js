import React,{Component} from 'react'
import classes from './Feedback.css';
import logoImg from '../../assets/logo.png';
import Center from 'react-center';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'


const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

class Feedback extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { value } = this.state
    return (
  <div className='Feedback-form'>
 <Center>
      <Grid>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='yellow' textAlign='center'>
          <Image src={logoImg} />
          Give your Feedback
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              label='Full Name'
              icon='user'
              iconPosition='right'
              placeholder='Enter Name'
            />
            <Form.Input
              fluid
              label='Email Address'
              icon='mail'
              iconPosition='right'
              placeholder='Enter Email-id'
            />
             <Form.Select fluid label='Gender' options={options} placeholder='Gender' />
             <Form.Group inline>
            
          <label>Type</label>
          <Form.Radio label='Comments' value='cm' checked={value === 'cm'} onChange={this.handleChange} />
          <Form.Radio label='Changes' value='ch' checked={value === 'ch'} onChange={this.handleChange} />
          <Form.Radio label='Questions' value='qu' checked={value === 'qu'} onChange={this.handleChange} />
        </Form.Group>
        <Form.TextArea label='Describe Feedback' placeholder='Tell us about your Feedback...'/>
        <Form.Checkbox label='I agree to the Terms and Conditions' />
        <Button color="yellow" fluid size='large'>Send</Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
    </Center>
    </div>
);
  }
}


export default Feedback;