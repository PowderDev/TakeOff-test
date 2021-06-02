import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { Button, Container, Input, Menu, Segment } from 'semantic-ui-react'
import ModalWindow from '../components/Modal'
import { deleteContact, getContacts } from '../redux/actinos/contactAction'
import { logout } from '../redux/actinos/userAction'
import { IContact } from '../redux/reducers/contact'
import { User } from '../redux/reducers/user'
import useDebounce from '../utils/functions'
import { useTypedSelector } from '../utils/useTypedSelector'

const Main: React.FC = () => {
  const [modalIsOpened, setModalIsOpened] = useState(false)
  const [searchWord, setSearchWord] = useState('')
  const [choisenContact, setChoisenContact] = useState<IContact | undefined>()
  const [loadingId, setLoadingId] = useState('')

  const debouncedSearchTerm = useDebounce(searchWord, 250);

  const { contacts } = useTypedSelector(state => state.contacts)
  const { userInfo }: { userInfo: User } = useTypedSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()
  

  useEffect(
    () => {
      if (!userInfo) {
        history.push('/login')
        return
      } 

      if (!searchWord) {
        dispatch(getContacts(userInfo._id))
        return
      }
      
      if (debouncedSearchTerm) {
        dispatch(getContacts(userInfo._id, searchWord))
      }
    },
    [debouncedSearchTerm, userInfo, dispatch, history, searchWord]
  );

  const openModal = () => setModalIsOpened(true)
  const closeModal = () => setModalIsOpened(false)

  const quit = () => {
    dispatch(logout())
  }

  const editModal = (id: string) => {
    const contact = contacts.find(c => c._id === id)
    setChoisenContact(contact)
    openModal()
  } 

  const editContact = (id: string, newContact: IContact) => {
    const idx = contacts.findIndex(c => c._id === id)
    contacts[idx] = newContact
  }

  const deleteCon = (id: string) => {
    const asw = window.confirm('Are you sure???')
    if (asw) {
      setLoadingId(id)
      dispatch(deleteContact(id))
      setTimeout(() => {
        window.location.reload()
      }, 80)
    }
  }

  return (
    <>
    <Container>
      <Menu pointing>
        <Menu.Item
          name='Add'
          onClick={e => {
            openModal()
            setChoisenContact(undefined)
          }}
        />
        <Menu.Item
          name='logout'
          onClick={e => quit()}
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' onChange={e => setSearchWord(e.target.value)} placeholder='Search...' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <div className='contact-block'>
        { contacts.length === 0 && (
          <Segment textAlign='center' vertical >
            There is no contacts yet
          </Segment>
        )}
        {contacts.map(contact => (
          <Segment key={contact._id} vertical style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="info-block">
              <strong>{contact.name}: </strong> {contact.number}
            </div>
            <div className="action-block">
              <Button.Group>
                <Button positive onClick={e => editModal(contact._id)} >Edit</Button>
                <Button.Or />
                <Button color='red' loading={loadingId === contact._id} onClick={e => deleteCon(contact._id)} >Delete</Button>
              </Button.Group>
            </div>
          </Segment>
        ))}
      </div>
    </Container>
    <ModalWindow editContact={editContact} isOpened={modalIsOpened} closeModal={closeModal} choisenContact={choisenContact} />
    </>
  )
}

export default Main
