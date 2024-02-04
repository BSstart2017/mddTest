import { useEffect, useState } from 'react';
import { ListGroup, Card, Button } from 'react-bootstrap';
import typicoApi from '@/api/typicodeApi';
import type { CommentType, PostType } from '@/types';

export const PostsPage = () => {
  const [isPending, setPending] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [comments, setComments] = useState<{ [postId: number]: CommentType[] }>({});
  const [showAllComments, setShowAllComments] = useState<{ [postId: number]: boolean }>({});
  
  useEffect(() => {
    setPending(true);
    const fetchData = async () => {
      try {
        const [postsResponse, commentsResponse] = await Promise.all([
          typicoApi.getPosts(),
          typicoApi.getComments(),
        ]);
        
        const commentsData = commentsResponse.reduce((acc, comment) => {
          acc[comment.postId] = acc[comment.postId] || [];
          acc[comment.postId].unshift(comment);
          return acc;
        }, {} as { [postId: number]: CommentType[] });
        
        setPosts(postsResponse.sort((a, b) =>  b.id - a.id ));
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setPending(false);
      }
    };
    
    fetchData();
  }, []);
  
  const renderComments = (postId: number) => {
    const postComments: CommentType[] = comments[postId].sort((a, b) => b.id - a.id) || [];
    const visibleComments: CommentType[] = showAllComments[postId] ? postComments : postComments.length > 0 ? [postComments[0]] : [];
   
    return visibleComments.map((comment: CommentType) => (
      <ListGroup.Item key={comment.id}>
        <b>{comment.email}</b>
        <p className={'fw-bold'}>{comment.name}</p>
        {comment.body}
      </ListGroup.Item>
    ));
  };
  
  const toggleComments = (postId: number) => {
    setShowAllComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };
  
  return (
    <Card>
      <Card.Header>Post List with Comments</Card.Header>
      <ListGroup variant="flush">
        {posts.map((post: PostType) => (
          <ListGroup.Item key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
            <Button onClick={() => toggleComments(post.id)}>
              {(showAllComments[post.id] ? 'hide' : 'show') + ' comments ' + comments[post.id].length}
            </Button>
            <ListGroup variant="flush">{renderComments(post.id)}</ListGroup>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};
