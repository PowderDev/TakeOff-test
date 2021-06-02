import Router from 'express'
const router = Router()
import { getAllContacts, deleteContact, updateContact, createContact} from '../controllers/contactController.js'

router.get('/', getAllContacts)
router.delete('/:id', deleteContact)
router.put('/:id', updateContact)
router.post('/', createContact)

export default router