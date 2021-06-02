import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Grid, Header, Icon, Form, Segment, Button, Message } from 'semantic-ui-react'
import { login } from '../../redux/actinos/userAction'
import { useTypedSelector } from '../../utils/useTypedSelector'

const Login = () => {
  const [errors, setErrors] = useState<Array<{message: string}>>([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { userInfo, loading, error: errorMessage } = useTypedSelector(state => state.user)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [history, userInfo])


  const handlerSubmit = () => {
      if (isFormValid()) {
        dispatch(login(email, password))
      }
  }

  const handlerInputError = (errors:  Array<{message: string}>, inputName: string) => {
      return errors.some(err => err.message.toLowerCase().includes(inputName)) ? 'error' : ''
  }

  const isFormValid = () => {
    let errors: Array<{message: string}> = []
    let error;

    if (!email && !password){
      error = {message: 'Fill in all fields'}
      setErrors(errors.concat(error))
      return false
    }else if (!password){
      error = {message: 'Password is invalid'}
      setErrors(errors.concat(error))
      return false
    }else if (!email) {
      error = {message: 'Email is invalid'}
    }else{
        return true
    }
  }

  return(
    <Grid textAlign='center' verticalAlign='middle' className='app' style={{ height: '100vh' }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' icon color='violet' textAlign='center'>
            <Icon name='wheelchair' color='violet' />
            Login for Contact app
        </Header>
        <Form size='large' onSubmit={handlerSubmit}>
            <Segment stacked>
                <Form.Input className={handlerInputError(errors, 'email')} value={email} type='email' fluid icon='mail' iconPosition='left' placeholder='Email' onChange={e => setEmail(e.target.value)} />
                <Form.Input className={handlerInputError(errors, 'password')} value={password} type='password' fluid icon='lock' iconPosition='left' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                <Button disabled={loading} className={loading ? 'loading' : ''} color='violet' fluid size='large'>Submit</Button>
            </Segment>
        </Form>
        {errorMessage && (
            <Message error>
                <h3>Error</h3>
                {errorMessage}
            </Message>
        )}
        <Message>Don't have an account?  <Link to='/register'>Sing up</Link></Message>
      </Grid.Column>
    </Grid>
)
}

export default Login
