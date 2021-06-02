import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Form, Modal, Segment } from 'semantic-ui-react'
import { addContact, updateContact } from '../redux/actinos/contactAction'
import { IContact } from '../redux/reducers/contact'
import { User } from '../redux/reducers/user'
import { useTypedSelector } from '../utils/useTypedSelector'

interface IModal {
    isOpened: boolean
    closeModal: () => void
    choisenContact?: any
    editContact: (id: string, newContact: IContact) => void
}

const ModalWindow: React.FC<IModal> = ({ isOpened, closeModal, choisenContact, editContact }) => {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const { userInfo }:{ userInfo: User } = useTypedSelector(state => state.user)

    useEffect(() => {
      if (choisenContact) {
        setName(choisenContact.name)
        setNumber(choisenContact.number)
      }
    }, [choisenContact])


    const handlerSubmit = () => {
      setLoading(true)
      if (choisenContact) {
        dispatch(updateContact(name, number, choisenContact._id))
        editContact(choisenContact._id, { _id: choisenContact._id, name, number })
      } else {
        dispatch(addContact(name, number, userInfo._id))
      }

      setTimeout(() => {
        setLoading(false)
        setName('')
        setNumber('')
        closeModal()
      }, 80)
    }


    return (
      <Modal
        dimmer='blurring'
        open={isOpened}
        onClose={closeModal}
        size='mini'
      >
        <Modal.Header> { choisenContact ? "Edit Contact" : "new Contact" } </Modal.Header>
        <Modal.Content>
            <Form size='large' onSubmit={handlerSubmit}>
                <Segment stacked>
                    <Form.Input required value={name} fluid icon='user' iconPosition='left' placeholder='Name' onChange={e => setName(e.target.value)} />
                    <Form.Input required value={number} fluid icon='phone' iconPosition='left' placeholder='+7 (987)...' onChange={e => setNumber(e.target.value)} />
                    <Button disabled={loading || !name || !number} className={loading ? 'loading' : ''} color='violet' fluid size='large'>Submit</Button>
                </Segment>
            </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={closeModal}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    )
}

export default ModalWindow