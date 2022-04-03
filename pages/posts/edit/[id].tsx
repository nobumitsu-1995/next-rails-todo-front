import { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import React, { useState, VFC } from 'react';
import Date from '../../../components/Date';
import Layout from '../../../components/layout';
import { client } from '../../../lib/axios';
import { PostProps } from '../../../lib/type';
import styles from '../../../styles/utils.module.scss';

type Props = {
    data: PostProps;
}

type Data = {
    text: string;
    notes: string;
    isCompleted: boolean;
};




const PostEdit: VFC<Props> = ({data}) => {
    const [currentTodo, setCurrentTodo] = useState<Data>({text: data.text, notes: data.notes, isCompleted: data.isComplete});

  const updateTodo = async () => {
    await client.patch(`/posts/${data.id}`, {
      post: currentTodo
    })
    .then(() => {
      Router.push('/');
    })
    .catch(e => {
      console.log(e);
    })
  }

  const deleteTodo = async () => {
    await client.delete(`/posts/${data.id}`)
    .then(() => {
    Router.push('/');
    })
    .catch(e => {
    console.log(e);
    })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setCurrentTodo({...currentTodo, [name]: value});
}
  return (
    <Layout>
        <section>
            <div className={styles.card}>
                <Date dateString={data.created_at} />
                <form>
                    <label htmlFor="text">Todo</label>
                    <input value={currentTodo.text} type="text" id="text" name="text" className={styles.input} onChange={handleInputChange}/>
                    <label htmlFor="notes">Notes</label>
                    <textarea name="notes" id="notes" className={styles.input} onChange={handleInputChange}>{currentTodo.notes}</textarea>
                </form>
            </div>
            <nav className={styles.nav}>
                <Link href={`/posts/${data.id}`}>
                    <a className={styles.button}>
                        Back
                    </a>
                </Link>
                <button className={styles.button} onClick={updateTodo}>
                    update
                </button>
                <button className={styles.button} onClick={deleteTodo}>
                    delete
                </button>
            </nav>
        </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const data = await client.get(`/posts/${params?.id}`)
    .then((resp: AxiosResponse<Props>) => {
        return resp.data;
    })
    .catch(e => {
        console.log(e);
    })

    return { props: { data } };
}

export default PostEdit;