import Link from "next/link";
import Router from "next/router";
import { VFC } from "react";
import { client } from "../lib/axios";
import { PostProps } from "../lib/type";
import styles from '../styles/utils.module.scss';

type Props = {
    todos: PostProps[]
}

const TodoList: VFC<Props> = ({ todos }) => {
    const handleClickButton = (todo: PostProps) => {
        client.patch(`/posts/${todo.id}`, {
            post: {
                isCompleted: !todo.isCompleted
            }
        })
        .then(resp => {
            Router.push('/');
        })
        .catch(e => {
            console.log(e);
        })
    }

  return (
    <section className={styles.list}>
        <h2>Todo List</h2>
        <ul>
            {todos.map(todo => {
                return (
                    <li key={todo.id}>
                        <Link href={`/posts/${todo.id}`} passHref>
                            <a>
                                <p className={(todo.isCompleted ? styles.textCompleted : '')}>{todo.text}</p>
                            </a>
                        </Link>
                        <button className={styles.button + ' ' + (todo.isCompleted && styles.complete)} onClick={() => handleClickButton(todo)}>
                            {todo.isCompleted ? 'in complete' : 'complete'}
                        </button>
                    </li>
                )
            })}
        </ul>
    </section>
  )
}

export default TodoList