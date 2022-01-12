import React from "react";
import { useQuery } from "@apollo/client";
import { ME, ALL_BOOKS } from "../queries";

const Recommend = (props) => {
  const resultMe = useQuery(ME);
  const resultBooks = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (resultMe.loading || resultBooks.loading) {
    return <div>Loading . . .</div>;
  }

  const me = resultMe.data.me;
  const books = resultBooks.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>

      <div>
        books in your favorite genre <b>{me.favoriteGenre}</b>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => book.genres.includes(me.favoriteGenre))
            .map((b) => {
              return (
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
