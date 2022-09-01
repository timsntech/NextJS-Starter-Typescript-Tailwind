// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';

type BadRequest = {
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AxiosResponse | BadRequest>
) {
  try {
    // graphql endpoint
    const endpoint = 'https://swapi.dev/api/people';

    // request headers
    const headers = {
      'content-type': 'application/json',
      Authorization: 'your authentication here',
    };

    // rest api call with axios
    const response: AxiosResponse = await axios({
      url: endpoint,
      method: 'get',
      headers: headers,
    });

    // response return data
    res.status(200).json(response.data);
  } catch (error: any) {
    console.log(error.message);
    res.status(200).json({ msg: 'Sorry bad request.' });
  }
}
