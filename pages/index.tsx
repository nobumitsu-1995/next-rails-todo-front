import { AxiosResponse } from 'axios'
import Layout from '../components/layout'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { client } from '../lib/axios'
import { PostProps } from '../lib/type'
import styles from '../styles/Home.module.scss'

type Props = {
  datas: PostProps[]
}

const Home = ({datas}: Props) => {
  return (
    <Layout>
      <div className={styles.container}>
        <TodoForm/>
        <TodoList todos={datas}/>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const datas = await client.get('/posts')
    .then((resp: AxiosResponse<Props>) => {
      console.log(resp);
      return (resp.data);
    })
    .catch(e => {
      console.log(e);
    })

  return { props: { datas } };
}

export default Home
