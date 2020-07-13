import React from 'react'
import { Card, Icon } from 'react-materialize'

const AdminEditMessage = (props) => {
  return (

    <Card
      className='darken-1 CardCompo'
      closeIcon={<Icon>close</Icon>}
      revealIcon={<Icon>more_vert</Icon>}
      textClassName='white-text'
      title={props.title}
    >
      {props.message}
      <br />
      {'Id utilisateur : ' + props.username}
      <br />
    </Card>

  )
}

export default AdminEditMessage
