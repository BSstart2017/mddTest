import { useEffect, useState } from 'react';
import { ListGroup, Card, Spinner } from 'react-bootstrap';
import typicoApi from '@/api/typicodeApi';
import { Post } from '@/modules/postsPage/components';
import type { CommentType, PostType } from '@/types';

export const PostsPage = () => {
  
  const [isPending, setPending] = useState(false);
  const [posts, setPosts] = useState<Array<PostType & {comments: CommentType[]}>>([]);
  
  const fetchData = async () => {
    try {
      setPending(true);
      const [postsResponse, commentsResponse] = await Promise.all([
        typicoApi.getPosts(),
        typicoApi.getComments(),
      ]);
      
      const postData = postsResponse
      .sort((a, b) => b.id - a.id)
      .map(post => {
        const actualComments = commentsResponse
          ? commentsResponse
          .filter(comment => comment.postId === post.id)
          .reverse()
          : [];
        return { ...post, comments: actualComments };
      });
      
      setPosts(postData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData().finally(() => setPending(false));
  }, []);
  
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
          {posts?.map((post) => (
            <Post
              key={post.id}
              post={post}
              comments={post.comments}
            />
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
