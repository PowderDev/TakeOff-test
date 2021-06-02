import Contact from '../model/Contact.js'

export const getAllContacts = async (req, res) =>{
  try{
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const contacts = await Contact.find({ ...keyword, user: req.query.userId })
    
    res.json({
        contacts,
    })

  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  }
}

export const deleteContact = async (req, res) =>{
    const id  = req.params.id
    const contact = await Contact.findById(id)

    if(contact){
        contact.remove()
        res.json({
            success: true
        })
    } else{
        res.status(404).json({
            message: 'Product not found'
        })
    }
}

export const updateContact = async (req, res) =>{
    const { name, number } = req.body

    const contact = await Contact.findById(req.params.id)

    if(contact){
        contact.name = name
        contact.number = number

        const updatedContact = await contact.save()
        res.json({
            updatedContact
        })
    } else{
        res.status(404).json({
            errorMessage: 'Contact not found'
        })
    }
}

export const createContact = async (req, res) => {
    const { name, number, userId } = req.body

    const contact = new Contact({
        name, number, user: userId
    })

    await contact.save()

    res.json({
        contact
    })
}