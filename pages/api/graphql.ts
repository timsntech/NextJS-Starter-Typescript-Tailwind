// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';

type Data = {
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // graphql endpoint
    const endpoint =
      'https://swapi-graphql.netlify.app/.netlify/functions/index';

    // request headers
    const headers = {
      'content-type': 'application/json',
      Authorization: 'your authentication here',
    };

    // graphql query
    const graphqlQuery = {
      operationName: 'fetchAuthor',
      query: `query fetchAuthor { allFilms {
        films {
          title
          director
          releaseDate
          speciesConnection {
            species {
              name
              classification
              homeworld {
                name
              }
            }
          }
        }
      } }`,
      variables: {},
    };

    // graphql api call with axios
    const response: AxiosResponse = await axios({
      url: endpoint,
      method: 'post',
      headers: headers,
      data: graphqlQuery,
    });

    // response return data
    res.status(200).json(response.data);
  } catch (error: any) {
    console.log(error.message);
    res.status(200).json({ msg: 'Sorry bad request.' });
  }
}
