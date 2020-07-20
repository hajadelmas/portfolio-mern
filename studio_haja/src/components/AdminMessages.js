import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon } from 'react-materialize'

const AdminMessages = (props) => {
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
      <Link to={`admin/message/${props.id}`}>Editer / Effacer</Link>
    </Card>

  )
}

export default AdminMessages
