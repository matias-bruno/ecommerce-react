import Layout from './components/Layout';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Container from './components/Container';
import FormularioContainer from './components/FormularioContainer';


function App() {

  return (
    <>
      <Layout>
        <Container>
          <ItemListContainer mensaje={'Productos destacados'} />
          <FormularioContainer />
        </Container>
      </Layout>
    </>
  )
}

export default App
