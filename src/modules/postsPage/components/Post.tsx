import React, { FC, useMemo, useState } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { Comment } from '@/modules/postsPage/components/Comment'
import type { CommentType, PostType } from '@/types'

type PropsType = {
  post: PostType
  comments: CommentType[]
}
export const Post: FC<PropsType> = ({ post, comments }) => {
  const [showAllComments, setShowAllComments] = useState<{
    [postId: number]: boolean
  }>({})

  const renderComments = useMemo(
    () => (postId: number) => {
      const visibleComments: CommentType[] = showAllComments[postId]
        ? comments
        : comments.length > 0
          ? [comments[0]]
          : []

      return visibleComments?.map((comment: CommentType) => (
        <Comment
          key={comment.id}
          body={comment.body}
          name={comment.name}
          email={comment.email}
        />
      ))
    },
    [comments, showAllComments],
  )

  const toggleComments = (postId: number) => {
    setShowAllComments((prev) => ({ ...prev, [postId]: !prev[postId] }))
  }

  return (
    <ListGroup.Item>
      <h4>{post.title}</h4>
      <p>{post.body}</p>
      <Button onClick={() => toggleComments(post.id)}>
        {(showAllComments[post.id] ? 'hide' : 'show') +
          ' comments ' +
          comments.length}
      </Button>
      <ListGroup variant="flush">{renderComments(post.id)}</ListGroup>
    </ListGroup.Item>
  )
}
