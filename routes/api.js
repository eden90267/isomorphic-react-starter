import {Router} from 'express'
import {v4} from 'uuid'

const dispatchAndRespond = (req, res, action) => {
  req.store.dispatch(action)
  res.status(200).json(action)
}

const router = Router()

router.get('/data', (req, res) =>
  res.status(200).json(req.store.getState().data)
)

export default router