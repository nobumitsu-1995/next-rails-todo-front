import Router from 'next/router';
import { useState } from 'react';
import { client } from '../lib/axios';
import styles from '../styles/utils.module.scss';

type Props = {
  text: string;
  notes: string;
  isCompleted: boolean;
};

const TodoForm = () => {
  const [currentTodo, setCurrentTodo] = useState<Props>({text: "", notes: "", isCompleted: false});

  const createTodo = async () => {
    await client.post('/posts', {
      post: currentTodo
    })
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
    <section className={styles.form}>
      <h2>Create Todo</h2>
      <form onSubmit={createTodo}>
          <label htmlFor="text">Todo</label>
          <input type="text" id="text" name="text" className={styles.input} onChange={handleInputChange}/>
          <label htmlFor="notes">Notes</label>
          <textarea name="notes" id="notes" className={styles.input} onChange={handleInputChange}></textarea>
          <button type="submit" className={styles.button}>create</button>
      </form>
    </section>
  )
}

export default TodoForm
