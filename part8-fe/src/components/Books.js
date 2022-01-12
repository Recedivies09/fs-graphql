import React, { useState, useEffect } from "react";
import { ALL_BOOKS } from "../queries";
import { useQuery, useLazyQuery } from "@apollo/client";

const Books = (props) => {
  const [filter, setFilter] = useState("");
  const [itemFiltered, setItemFiltered] = useState([]);
  const result = useQuery(ALL_BOOKS);
  const [getFilter, result2] = useLazyQuery(ALL_BOOKS);

  const filterBooks = (genreBook) => {
    setFilter(genreBook);
    getFilter({ variables: { genre: genreBook } });
  };

  useEffect(() => {
    if (result2.data) {
      setItemFiltered(result2.data.allBooks);
    }
  }, [result2.data]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading . . .</div>;
  }

  return (
    <div>
      <h2>books</h2>

      <div>
        in genre <b>{filter}</b>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {itemFiltered.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {result.data.allBooks.map((a) => {
        return (
          <span key={a.title}>
            {a.genres.map((g) => {
              return (
                <span key={g}>
                  <button onClick={() => filterBooks(g)}>{g}</button>
                </span>
              );
            })}
          </span>
        );
      })}

      <button onClick={() => setItemFiltered(result.data.allBooks)}>
        all genres
      </button>
    </div>
  );
};

export default Books;
