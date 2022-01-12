import React, { useState } from "react";
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import Select from "react-select";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState(0);

  const [editBirthYear, { error }] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error);
    },
  });

  const result = useQuery(ALL_AUTHORS);
  if (result.loading) {
    return <div>Loading . . .</div>;
  }

  if (error) {
    console.log(error.message);
    return null;
  }

  if (!props.show) {
    return null;
  }

  const authors = result.data.allAuthors;
  const option = authors.map((author) => {
    return {
      value: author.name,
      label: author.name,
    };
  });

  const submit = (event) => {
    event.preventDefault();
    console.log(name, name.value, typeof name);
    editBirthYear({ variables: { name: name.value, born: parseInt(born) } });

    console.log("edit birthyear...");

    setName("");
    setBorn(0);
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {props.token !== "null" && (
        <div>
          <h2>Set birthyear</h2>
          <form action="submit" onSubmit={submit}>
            <div>
              name
              <Select defaultValue={name} onChange={setName} options={option} />
            </div>

            <div>
              born
              <input
                type="number"
                value={born}
                onChange={(e) => setBorn(e.target.value)}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Authors;
