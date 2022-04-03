import { AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { VFC } from "react";
import Date from "../../components/Date";
import Layout from "../../components/layout";
import { client } from "../../lib/axios";
import { PostProps } from "../../lib/type";
import styles from '../../styles/utils.module.scss';

type Props = {
    data: PostProps;
}

const Post: VFC<Props> = ({data}) => {
  return (
    <Layout>
        <section>
            <div className={styles.card}>
                <Date dateString={data.created_at} />
                <h2>{data.text}</h2>
                <p>{data.notes}</p>
            </div>
            <nav className={styles.nav}>
                <Link href="/">
                    <a className={styles.button}>
                        Back
                    </a>
                </Link>
                <Link href={`/posts/edit/${data.id}`}>
                    <a className={styles.button}>
                        edit
                    </a>
                </Link>
                <button className={styles.button}>
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

export default Post;