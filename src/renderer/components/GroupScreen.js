const React = require('react')
const { ipcRenderer } = require('electron')

const ContactListItem = require('./ContactListItem')

const {
  Alignment,
  Classes,
  InputGroup,
  ControlGroup,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Button
} = require('@blueprintjs/core')

class CreateGroup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      group: {},
      name: undefined
    }
  }

  addToGroup (contact) {
    var group = this.state.group
    group[contact.id] = contact
    this.setState({ group })
  }

  removeFromGroup (contact) {
    var group = this.state.group
    delete group[contact.id]
    this.setState({ group })
  }

  handleError (err) {
    this.setState({ error: err.message })
  }

  shouldComponentUpdate (nextProps, nextState) {
    // we don't care about the props for now, really.
    return (this.state !== nextState)
  }

  onContactCreateSuccess (contactId) {
    this.addToGroup(this.getContact(contactId))
  }

  createContact () {
    this.props.changeScreen('CreateContact', {
      onContactCreateSuccess: this.onContactCreateSuccess.bind(this)
    })
  }

  getContact (contactOrContactId) {
    const { deltachat } = this.props
    const contactId = contactOrContactId.id || contactOrContactId
    var index = deltachat.contacts.findIndex((c) => {
      return c.id === contactId
    })
    if (index === -1) return this.handleError(`contact with id ${contactId} not found`)
    return deltachat.contacts[index]
  }

  contactInGroup (contact) {
    return this.state.group[contact.id]
  }

  toggleContact (contact) {
    this.contactInGroup(contact) ? this.removeFromGroup(contact) : this.addToGroup(contact)
  }

  validateGroup (contacts) {
    if (!contacts.length) {
      this.handleError(new Error('Add at least one contact to the group'))
      return false
    }
    if (!this.state.name) {
      this.handleError(new Error('Group name required.'))
      return false
    }
    return true
  }

  getContacts () {
    return Object.keys(this.state.group).map((id) => this.state.group[id])
  }

  createGroup () {
    var contacts = this.getContacts()
    if (this.validateGroup(contacts)) {
      var { chatId } = ipcRenderer.sendSync('dispatchSync', 'createUnverifiedGroup', contacts, this.state.name)
      this.props.changeScreen('ChatView', { chatId })
    }
  }

  editGroup () {
    var contacts = this.getContacts()
    if (this.validateGroup(contacts)) {
      var newContacts =
      var missingContacts =

    }
  }

  handleNameChange (e) {
    this.setState({ name: e.target.value })
  }

  onSubmit () {
    var contacts = Object.keys(this.state.group).map((id) => this.state.group[id])
    var name = this.state.name

    if (!contacts.length) return this.handleError(new Error('Add at least one contact to the group'))
    if (!this.state.name) return this.handleError(new Error('Group name required.'))
    this.props.onSubmit({ name, contacts })
  }

  render () {
    const { deltachat } = this.props
    const { group } = this.state

    return (
      <div>
        {this.state.error && this.state.error}
        <Navbar fixedToTop>
          <NavbarGroup align={Alignment.LEFT}>
            <Button className={Classes.MINIMAL} icon='undo' onClick={this.props.changeScreen} />
            <NavbarHeading>Create Chat</NavbarHeading>
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
            <Button
              className={Classes.MINIMAL}
              icon='new-person'
              onClick={this.createContact.bind(this)}
              text='Contact' />
          </NavbarGroup>
        </Navbar>
        <div className='window'>
          <div>
            {Object.keys(group).map((id) => {
              var contact = group[id]
              return contact.address
            }).join(', ')}
          </div>
          <div>
            <ControlGroup fill vertical={false}>
              <InputGroup
                type='text'
                id='name'
                value={this.state.name}
                onChange={this.handleNameChange}
                placeholder='Group Name' />
              <Button
                onClick={this.onSubmit.bind(this)}
                text={this.props.text} />
            </ControlGroup>
          </div>
          {deltachat.contacts.map((contact) => {
            return (
              <ContactListItem
                color={this.contactInGroup(contact) ? 'green' : ''}
                onClick={this.toggleContact.bind(this, contact)}
                contact={contact}
              />
            )
          })}
        </div>
      </div>
    )
  }
}
module.exports = CreateGroup
