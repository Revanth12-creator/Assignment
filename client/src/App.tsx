import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { url } from "inspector";
import { setUseProxies } from "immer";
import Password from "antd/lib/input/Password";

function App() {
  const queryClient = useQueryClient();
  const [id, setId] = useState<any>(null);
  const [status, setStatus] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //createUser
  const creteUser = (users: any) => {
    const postApi = "http://localhost:4400/user/create";
    return axios.post(postApi, users);
  };
  const postUser = useMutation(creteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  //deleteUser
  const deteteUser = (id: any) => {
    const deleteUserApi = `http://localhost:4400/user/delete/${id.id}`;

    return axios.delete(deleteUserApi);
  };
  const deletePost = useMutation(deteteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  //updateUser
  const updateUser = (id: any) => {
    const updateUserApi = `http://localhost:4400/user/update/${id.id}`;
    return axios.patch(updateUserApi, { ...input });
  };
  const updatePost = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
  const submit = async (e: any) => {
    e.preventDefault();
    id
      ? updatePost.mutate({ ...input, id: id })
      : postUser.mutate({ ...input });

    setInput({
      name: "",
      email: "",
      password: "",
    });
    setId("");
  };

  //getUsers
  const getuserData = () => axios.get("http://localhost:4400/user");

  const { data, isLoading, error } = useQuery("users", getuserData);

  //login state
  if (isLoading) {
    return <div>Loding ...</div>;
  }
  //error state
  if (error) {
    return <div>Error ...</div>;
  }
  console.log(data);

  return (
    <div className="App">
      <div className="card col-md-3 p-5 mx-auto my-5 ">
        <h1 className="text-center">Add Users</h1>
        <div className="card-body">
          {" "}
          <form onSubmit={submit}>
            <label htmlFor="name">Name</label>
            <div className="form-group col-md-4">
              <input
                placeholder="Enter Name"
                className="form-controll"
                type="text"
                name="name"
                value={input.name}
                onChange={handleChange}
              />
            </div>
            <label htmlFor="email">Email</label>

            <div>
              <input
                placeholder="Enter Email"
                type="text"
                name="email"
                value={input.email}
                onChange={handleChange}
              />
            </div>
            <label htmlFor="password">Password</label>

            <div>
              <input
                placeholder="Enter Password"
                type="text"
                name="password"
                value={input.password}
                onChange={handleChange}
              />
            </div>
            <div className="p-4">
              <button className="btn btn-success">Add User</button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data &&
              data.data.map((val: any, index: any) => (
                <tr key={val.id}>
                  <td>{val.id}</td>

                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>
                    <button
                      className="btn btn-warning "
                      onClick={() => {
                        setId(val.id);
                        setInput({
                          name: val.name,
                          email: val.email,
                          password: val.password,
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger "
                      onClick={() => {
                        deletePost.mutate({ id: val.id });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
