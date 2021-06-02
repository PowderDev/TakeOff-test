import User from '../model/User.js'

const options = {
    expires: new Date(Date.now() + 70 * 24 * 60 * 60 * 1000),
    httpOnly: true
}

export const register = async (req, res) =>{
  const { email, password } = req.body

  const userExist = await User.findOne({ email })

  if (userExist){
      res.status(400).json({
          errorMessage: 'User with this email already exists'
      })
  }

  const user = await User.create({
      email, password
  })

  res.status(200).cookie('userId', user._id, options).json({
      user
  })
}

export const login = async (req, res) =>{
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if(user){
    if( await user.comparePassword(password)){
      res.status(200).cookie('userId', user._id, options).json({
          user
      })
    } else{
        res.status(400).json({
            errorMessage: 'Invalid password'
        })
    }
  } else {
      res.status(400).json({
          errorMessage: 'Invalid email'
      })
  }
}

export const logout = async (req, res) => {
  res.cookie('userId', null).json({
    success: true
  })
}