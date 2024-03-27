import express from 'express'
import { config } from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import sequelize from './db.js'
import bodyParser from 'body-parser'
import { authRouter, userRouter } from './routes/index.js'
import cookieParser from 'cookie-parser'
import { checkUser, requireAuth } from './middlewares/checkUser.js'

config()
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(morgan('common'))
app.use(cookieParser())

// jwt
app.get('*', checkUser)
app.get('/api/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user.id)
})

//les routes
app.get('/api', (req, res) => {
  res.send('API working fine')
})
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(process.env.PORT, () => {
  console.log('listening on port ' + process.env.PORT)
})

//db connection
try {
  await sequelize.authenticate()
  console.log('Connection Réussie... ')
} catch (e) {
  console.log('error : ' + e.message)
  sequelize.close()
}

export default app
