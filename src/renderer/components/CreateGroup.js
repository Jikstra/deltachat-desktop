const React = require('react')
const { ipcRenderer } = require('electron')

const GroupScreen = require('./GroupScreen')

class CreateGroup extends React.Component {
  render () {
    const { changeScreen } = this.props

    const createGroup = (group) => {
      var { chatId } = ipcRenderer.sendSync('dispatchSync', 'createUnverifiedGroup', group.contacts, group.name)
      changeScreen('ChatView', { chatId })
    }

    return (
      <GroupScreen
        onSubmit={createGroup}
        text='Create Group' />
    )
  }
}
module.exports = CreateGroup
