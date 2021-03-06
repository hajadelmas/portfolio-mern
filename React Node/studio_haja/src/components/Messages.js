import React from 'react'
import { Card, Icon } from 'react-materialize'

const Messages = props => {
  return (

    <Card
      // actions={[
      //   <a key='1' href='#'>This is a link</a>,
      //   <a key='2' href='#'>This is a link</a>
      // ]}
      className='darken-1 CardCompo'
      closeIcon={<Icon>close</Icon>}
      revealIcon={<Icon>more_vert</Icon>}
      textClassName='white-text'
      title={props.title}
    >
      {props.message}
    </Card>

  )
}

export default Messages
