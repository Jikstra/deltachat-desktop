const React = require('react')
const C = require('deltachat-node/constants')
const { ipcRenderer } = require('electron')

const SetupMessageDialog = require('./dialogs/SetupMessage')
const Composer = require('./Composer')
const { Overlay } = require('@blueprintjs/core')

let MutationObserver = window.MutationObserver

const {
  Alignment,
  Classes,
  Navbar,
  Position,
  Menu,
  MenuItem,
  Popover,
  NavbarGroup,
  NavbarHeading,
  Button
} = require('@blueprintjs/core')

const { ConversationContext, Message } = require('./conversations')

var theme = 'light-theme' // user prefs?

class ChatView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: false,
      setupMessage: false,
      attachmentMessage: null
    }
    this.onArchiveChat = this.onArchiveChat.bind(this)
    this.onDeleteChat = this.onDeleteChat.bind(this)
    this.onEditGroup = this.onEditGroup.bind(this)
    this.onSetupMessageClose = this.onSetupMessageClose.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
    this.conversationDiv = React.createRef()
  }

  onArchiveChat () {
    const chatId = this.props.chat.id
    ipcRenderer.send('dispatch', 'archiveChat', chatId)
    this.props.changeScreen()
  }

  onDeleteChat () {
    const chatId = this.props.chat.id
    ipcRenderer.send('dispatch', 'deleteChat', chatId)
    this.props.changeScreen()
  }

  onEditGroup () {
    const chat = this.props.chat
    this.props.changeScreen('EditGroup', { chatId: chat.id, chatName: chat.name })
  }

  writeMessage (text) {
    const chatId = this.props.chat.id
    ipcRenderer.send('dispatch', 'sendMessage', chatId, text)
  }

  componentWillUnmount () {
    if (this.observer) this.observer.disconnect()
  }

  componentDidUpdate () {
    if (this.observer || !this.conversationDiv.current) return
    this.observer = new MutationObserver(this.scrollToBottom)
    this.observer.observe(this.conversationDiv.current, { attributes: false, childList: true, subtree: true })
  }

  componentDidMount () {
    this.scrollToBottom()
  }

  scrollToBottom (force) {
    console.log('scroll')
    var doc = document.querySelector('.ChatView')
    doc.scrollTop = doc.scrollHeight
  }

  onClickAttachment (attachmentMessage) {
    this.setState({ attachmentMessage })
  }

  onClickSetupMessage (setupMessage) {
    this.setState({ setupMessage })
  }

  onCloseAttachmentView () {
    this.setState({ attachmentMessage: null })
  }

  onSetupMessageClose () {
    // TODO: go back to main chat screen
    this.setState({ setupMessage: false })
  }

  isGroup () {
    const chat = this.props.chat
    return [
      C.DC_CHAT_TYPE_GROUP,
      C.DC_CHAT_TYPE_VERIFIED_GROUP
    ].includes(chat && chat.type)
  }

  render () {
    const { attachmentMessage, setupMessage } = this.state
    const chat = this.props.chat
    if (!chat) return (<div className="ChatView"><p>No chat selected</p></div>)

    const isGroup = this.isGroup()
    const tx = window.translate
    const archiveMsg = isGroup ? tx('archiveGroup') : tx('archiveChat')
    const deleteMsg = isGroup ? tx('deleteGroup') : tx('deleteChat')
    const menu = (<Menu>
      <MenuItem icon='compressed' text={archiveMsg} onClick={this.onArchiveChat} />
      <MenuItem icon='delete' text={deleteMsg} onClick={this.onDeleteChat} />
      {isGroup ? <MenuItem icon='edit' text={tx('editGroup')} onClick={this.onEditGroup} /> : null}
    </Menu>)

    return (
      <div className="ChatView">
        <SetupMessageDialog
          userFeedback={this.props.userFeedback}
          setupMessage={setupMessage}
          onClose={this.onSetupMessageClose}
        />
        <RenderMedia
          filemime={attachmentMessage && attachmentMessage.filemime}
          url={attachmentMessage && attachmentMessage.msg.file}
          close={this.onCloseAttachmentView.bind(this)}
        />

        <div id='the-conversation' ref={this.conversationDiv}>
          <ConversationContext theme={theme}>
            {chat.messages.map((message) => {
              const msg = <RenderMessage message={message} onClickAttachment={this.onClickAttachment.bind(this, message)} />
              if (message.msg.isSetupmessage) {
                return <li onClick={this.onClickSetupMessage.bind(this, message)}>
                  {msg}
                </li>
              }
              return <li>{msg}</li>
            })}
          </ConversationContext>
        </div>
        <div className="InputMessage">
          <Composer onSubmit={this.writeMessage.bind(this)} />
        </div>
      </div>
    )
  }
}

class RenderMedia extends React.Component {
  render () {
    const { url, filemime, close } = this.props
    let elm = <div />
    // TODO: there must be a stable external library for figuring out the right
    // html element to render
    if (filemime) {
      var contentType = convertContentType(filemime)
      switch (contentType.split('/')[0]) {
        case 'image':
          elm = <img src={url} />
          break
        case 'audio':
          elm = <audio src={url} controls='true' />
          break
        case 'video':
          elm = <video src={url} controls='true' />
          break
        default:
          elm = <iframe width='100%' height='100%' src={url} />
      }
    }
    return <Overlay isOpen={Boolean(url)}
      onClose={close}>
      {elm}
    </Overlay>
  }
}

class RenderMessage extends React.Component {
  render () {
    const { onClickAttachment, message } = this.props
    const { msg, fromId, id } = message
    const timestamp = msg.timestamp * 1000
    const direction = message.isMe ? 'outgoing' : 'incoming'
    const contact = {
      onSendMessage: () => console.log('send a message to', fromId),
      onClick: () => console.log('clicking contact', fromId)
    }

    function onReply () {
      console.log('reply to', message)
    }

    function onForward () {
      console.log('forwarding message', id)
    }

    function onDownload (el) {
      console.log('downloading', el)
    }

    function onDelete (el) {
      ipcRenderer.send('dispatch', 'deleteMessage', id)
    }

    function onShowDetail () {
      console.log('show detail', message)
    }

    var props = {
      id,
      i18n: window.translate,
      conversationType: 'direct', // or group
      direction,
      onDownload,
      onReply,
      onForward,
      onDelete,
      onShowDetail,
      contact,
      onClickAttachment,
      authorAvatarPath: message.contact.profileImage,
      authorName: message.contact.name,
      authorPhoneNumber: message.contact.address,
      status: convertMessageStatus(msg.state),
      timestamp
    }

    if (msg.file) {
      props.attachment = { url: msg.file, contentType: convertContentType(message.filemime), filename: msg.text }
    } else {
      props.text = msg.text
    }

    return (<Message {...props} />)
  }
}

function convertContentType (filemime) {
  if (filemime === 'application/octet-stream') return 'audio/ogg'
  return filemime
}

function convertMessageStatus (s) {
  switch (s) {
    case C.DC_STATE_IN_FRESH:
      return 'sent'
    case C.DC_STATE_OUT_FAILED:
      return 'error'
    case C.DC_STATE_IN_SEEN:
      return 'read'
    case C.DC_STATE_IN_NOTICED:
      return 'read'
    case C.DC_STATE_OUT_DELIVERED:
      return 'delivered'
    case C.DC_STATE_OUT_MDN_RCVD:
      return 'read'
    case C.DC_STATE_OUT_PENDING:
      return 'sending'
    case C.DC_STATE_UNDEFINED:
      return 'error'
  }
}

module.exports = ChatView
