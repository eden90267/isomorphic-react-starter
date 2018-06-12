import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import flash from 'connect-flash'
import dotenv from 'dotenv'
import fs from 'fs'
import {Provider} from 'react-redux'
import {compose} from 'redux'
import {renderToString} from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'

import api from './routes/api'
import storeFactory from './src/js/store/index'
import initialState from './data/initialState'
import App from './src/js/components/App'

dotenv.config()

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', require('express-ejs-extend'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'dist')))

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 100 * 1000}
}))
app.use(flash())


const serverStore = storeFactory(true, initialState)

serverStore.subscribe(() =>
  fs.writeFile(
    path.join(__dirname, 'data/initialState.json'),
    JSON.stringify(serverStore.getState()),
    error => (error) ?
      console.log('Error saving state!', error) :
      null
  )
)

const addStoreToRequestPipeline = (req, res, next) => {
  req.store = serverStore
  next()
}
app.use(addStoreToRequestPipeline)

app.use('/api', api)

const renderComponentsToHTML = ({url, store}) =>
  ({
    state: JSON.stringify(store.getState()),
    html: renderToString(
      <Provider store={store}>
        <StaticRouter location={url} context={{}}>
          <App/>
        </StaticRouter>
      </Provider>
    )
  })
const makeClientStoreFrom = store => url =>
  ({
    store: storeFactory(false, store.getState()),
    url
  })
const htmlResponse = compose(
  renderComponentsToHTML,
  makeClientStoreFrom(serverStore)
)
const respond = ({url}, res) =>
  res.status(200).render(
    'index', htmlResponse(url)
  )
app.use(respond)

export default app