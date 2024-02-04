import React, { FC } from 'react'
import { ListGroup } from 'react-bootstrap'

type PropsType = {
  name: string
  email: string
  body: string
}
export const Comment: FC<PropsType> = ({ email, name, body }) => {
  return (
    <ListGroup.Item>
      <b>{email}</b>
      <p className={'fw-bold'}>{name}</p>
      {body}
    </ListGroup.Item>
  )
}
