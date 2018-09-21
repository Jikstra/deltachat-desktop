const React = require('react')
const { ipcRenderer } = require('electron')

const GroupScreen = require('./GroupScreen')

class EditGroup extends React.Component {
  render () {
    const { changeScreen } = this.props

    const editGroup = (group) => {
      var { chatId } = ipcRenderer.sendSync('dispatchSync', 'createUnverifiedGroup', group.contacts, group.name)
      changeScreen('ChatView', { chatId })
    }

    return (
      <GroupScreen
        onSubmit={editGroup}
        text='Edit Group' />
    )
  }
}
module.exports = EditGroup
