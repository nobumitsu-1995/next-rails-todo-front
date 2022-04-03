import { AxiosResponse } from "axios";
import { client } from "../../lib/axios"

type Props = {
    datas: {
        id: number;
        text: string;
        isComplete: boolean;
        notes: string;
        create_at: string;
        update_at: string;
  }[]
  }

export const fetchPosts = async () => {
    await client.get('/posts')
    .then((resp: AxiosResponse<Props>) => {
        console.log(resp);
        return (resp.data);
    })
    .catch(e => {
        console.log(e);
        console.log("error");
        
    })
}