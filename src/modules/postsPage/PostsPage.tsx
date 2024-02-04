import React, { useEffect, useState } from 'react'
import { ListGroup, Card, Spinner, Button } from 'react-bootstrap'
import typicoApi from '@/api/typicodeApi'
import { Post } from '@/modules/postsPage/components'
import type { CommentType, PostType } from '@/types'

type PostsWithCommentsType = Array<PostType & { comments: CommentType[] }>
export const PostsPage = () => {
  const [isPending, setPending] = useState(false)
  const [posts, setPosts] = useState<PostsWithCommentsType>([])
  const [showPosts, setShowPosts] = useState<PostsWithCommentsType>([])

  const fetchData = async () => {
    try {
      setPending(true)
      const [postsResponse, commentsResponse] = await Promise.all([
        typicoApi.getPosts(),
        typicoApi.getComments(),
      ])

      const postData = postsResponse
        .sort((a, b) => b.id - a.id)
        .map((post) => {
          const actualComments = commentsResponse
            ? commentsResponse
                .filter((comment) => comment.postId === post.id)
                .reverse()
            : []
          return { ...post, comments: actualComments }
        })

      setPosts(postData)
      setShowPosts(postData.length >= 10 ? postData.slice(0,10) : postData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  
  const addNextPosts = () => {
    setShowPosts(prev => [...prev, ...posts.slice(prev.length, prev.length + 10)])
  }

  useEffect(() => {
    fetchData().finally(() => setPending(false))
  }, [])

  return (
    <Card>
      <Card.Header>Post List with Comments</Card.Header>
      <Card.Body>
        {isPending && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        <ListGroup variant="flush">
          {showPosts?.map((post) => (
            <Post key={post.id} post={post} comments={post.comments} />
          ))}
        </ListGroup>
        {showPosts.length !== posts.length && <Button onClick={() => addNextPosts()}>
         show next posts
        </Button>}
      </Card.Body>
    </Card>
  )
}
