import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Grid, Header, Icon, Form, Segment, Button, Message } from 'semantic-ui-react'
import { register } from '../../redux/actinos/userAction'
import { useTypedSelector } from '../../utils/useTypedSelector'

const Register = () => {
  const [errors, setErrors] = useState<Array<{message: string}>>([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConformation, setPasswordConformation] = useState('')
  

  const { userInfo, loading, error } = useTypedSelector(state => state.user)
  const history = useHistory()
  const dispatch = useDispatch()


  useEffect(() => {
    if (error) {
      setErrors(errors.concat({message: error}))
    }
    if (userInfo) {
      history.push('/')
    }

  }, [error, history, userInfo])

  const isPasswordValid = () =>{
    if(password.length < 6 || passwordConformation.length < 6){
        return false
    }else if (password !== passwordConformation){
        return false
    }else{
        return true
    }
  }

  const isFromEmpty = () =>{
    return  !password.length || !email.length || !passwordConformation.length
  }

  const isFormValid = () =>{
    let errors: Array<{message: string}> = []
    let error;

    if (isFromEmpty()){
        error = {message: 'Fill in all fields'}
        setErrors(errors.concat(error))
        return false
    }else if (!isPasswordValid()){
        error = {message: 'Password is invalid'}
        setErrors(errors.concat(error))
        return false
    }else{
        return true
    }
  }

  const handlerInputError = (errors: Array<{message: string}>, inputName: string) =>{
    return errors.some(err => err.message.toLowerCase().includes(inputName)) ? 'error' : ''
  }

  const displayErrors = (errors: Array<{message: string}>) => errors.map((error, i) => <p key={i}>{error.message}</p>)

  const handlerSubmit = () => {
    if (isFormValid()) {
      dispatch(register(email, password))
    }
  }

  return(
    <Grid textAlign='center' verticalAlign='middle' className='app' style={{height: '100vh'}}>
      <Grid.Column style={{maxWidth: 450}}>
        <Header as='h1' icon color='orange' textAlign='center'>
            <Icon  name='user circle' color='orange'/>
            Register for Contact app
        </Header>
        <Form size='large' onSubmit={handlerSubmit}>
            <Segment stacked>
                <Form.Input className={handlerInputError(errors, 'email')} value={email} type='email' fluid icon='mail' iconPosition='left' placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                <Form.Input className={handlerInputError(errors, 'password')} value={password} type='password' fluid icon='lock' iconPosition='left' placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                <Form.Input className={handlerInputError(errors, 'password')} value={passwordConformation} type='password' fluid icon='lock' iconPosition='left' placeholder='PasswordConformation' onChange={e => setPasswordConformation(e.target.value)}/>

                <Button disabled={loading} className={loading ? 'loading' : ''} color='orange' fluid size='large'>Submit</Button>
            </Segment>
        </Form>
          {errors.length > 0 &&(
              <Message error>
                  <h3>Error</h3>
                  {displayErrors(errors)}
              </Message>
          )}
          <Message>Already a user? <Link to='/login'>Sing in</Link></Message>
      </Grid.Column>
    </Grid>
  )
}

export default Register
