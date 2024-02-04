import { Container, Stack } from 'react-bootstrap'

import { PostsPage } from '@/modules'

const App = () => {
  return (
    <Container className={'d-flex flex-column min-vh-100'}>
      <Stack className={'col-md-5 mx-auto justify-content-center'}>
        <PostsPage />
      </Stack>
    </Container>
  )
}

export default App
