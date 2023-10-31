import React, { useEffect, useState } from "react";
import { getAddTaskAction, getDeleteTaskAction, getEditTaskAction } from "./redux/actions";
import { useSelector, useDispatch } from "react-redux";

const TaskManager = () => {
  const [showForm, setshowform] = useState(true);
  const [showNew, setshowNew] = useState(true);
  const [showDelete, setshowDelete] = useState(true);
  const [toggleSubmit, settoggleSubmit] = useState(true);
  const [isEditItem, setisEditItem] = useState(null);
  const [showList, setshowList] = useState(true);
  const [deleteMessage, setdeleteMessage] = useState(false);
  const [, setdeleteMessagesuccess] = useState(false);
  const [inputTitle, setinputTitle] = useState("");
  const [inputDesc, setinputDesc] = useState("");
  const [status, setStatus] = useState("");
  const [tasks, setTasks] = useState([
    {
      id: "101",
      name: "Default item",
      desc: "Default item description",
      status: "On going",
    },
  ]);
  const tasksState = useSelector((state) => state.tasksReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    setTasks(tasksState?.tasks);
  }, [tasksState]);
  const handleTitle = (e) => {
    setinputTitle(e.target.value);
  };
  const handleDesc = (e) => {
    setinputDesc(e.target.value);
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    setshowList(true);
    setshowNew(true);

    e.preventDefault();
    if (!inputTitle || !inputDesc || !status) {
      alert("Enter all the details data");
      setshowList(false);
    } else if (inputTitle && !toggleSubmit) {
      // dispath an action for Edit task action
      dispatch(
        getEditTaskAction({
          name: inputTitle,
          desc: inputDesc,
          status: status,
          isEditItem,
        })
      );

      setinputTitle("");
      setinputDesc("");
      setStatus("");
      settoggleSubmit(true);
      setshowform(false);
      setshowDelete(true);
    } else {
      const allinputTitle = {
        id: new Date().getTime().toString(),
        name: inputTitle,
        desc: inputDesc,
        status: status,
      };
      // dispath an action for add task action
      dispatch(getAddTaskAction({ ...allinputTitle }));
      setinputTitle("");
      setinputDesc("");
      setStatus("");
      setshowform(false);
    }
  };

  const handleDelete = (index) => {
    // dispath an action for delete task action
    dispatch(getDeleteTaskAction(index))
    setdeleteMessage(true);
    setTimeout(() => {
      setdeleteMessage(false);
    }, 2000);
    setdeleteMessagesuccess(false);
  };

  const handleEdit = (id) => {
    setshowList(false);
    setshowDelete(false);
    setshowNew(false);
    setshowform(true);

    settoggleSubmit(false);
    let newEditItem = tasks.find((elem) => {
      return elem.id === id;
    });
    setinputTitle(newEditItem.name);
    setinputDesc(newEditItem.desc);
    setStatus(newEditItem.status);

    setisEditItem(id);
    console.log(newEditItem);
  };

  const handleAdd = () => {
    setshowform(true);
    setshowList(true);
    setshowNew(false);
  };
  return (
    <div data-testid="taskmanager">
      {showNew ? (
        <div className="container">
          <div className="col-12 text-end">
            <button className="btn btn-primary " onClick={handleAdd}>
              Click to Add New Task
            </button>
            <br/>
          </div>
        </div>
      ) : (
        ""
      )}

      {showForm ? (
        <>
          <div className="container border rounded d-flex justify-content-center shadow p-3 mb-5 bg-white rounded">
            <div className="row">
              <div className="text-center">
                <h2>{toggleSubmit ? "Add New Task" : " Edit Task"}</h2>
              </div>
              <form className="col-12 p-2" onSubmit={handleSubmit}>
                <div>
                <label htmlFor="title" className="my-2">
                  Enter Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="title"
                  className="w-100 my-1 p-2"
                  onChange={handleTitle}
                  value={inputTitle}
                />
                </div>
                <br />
                <label className="my-2" htmlFor="description">
                  Enter Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Description"
                  className="w-100 my-1 p-2"
                  onChange={handleDesc}
                  value={inputDesc}
                />
                <br />
                <label className="my-2" htmlFor="status">
                  Select the Status
                </label>
                <select onChange={handleStatus} value={status}   className="w-100 my-1 p-2">
                  <option >Select the task status</option>

                  <option>Pending</option>
                  <option>On going</option>

                  <option>Completed</option>
                </select>
                <br />
                {toggleSubmit ? (
                  <button className="btn btn-primary my-2">Save Task</button>
                ) : (
                  <button className="btn btn-primary my-2">Update Task</button>
                )}
              </form>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {showList ? (
        <div className="container py-2 ">
          {deleteMessage ? (
            <p className="text-center text-danger">Item Deleted Successfully</p>
          ) : (
            ""
          )}
          {tasks.map((elem, index) => {
            return (
              <div
                className="row border rounded shadow p-3 mb-3 bg-white rounded  p-2"
                key={elem.id}
              >
                <div className="col-12 d-flex justify-content-between align-items-center">
                  <div>
                    <strong> Title: </strong> <span>{elem.name}</span>
                    <br />
                    <strong> Description: </strong> <span>{elem.desc}</span>
                    <br />
                    <strong> Status: </strong> <span>{elem.status}</span>
                    <br />
                  </div>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => handleEdit(elem.id)}
                  >
                    Edit Task
                  </button>
                  {showDelete ? (
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(elem.id)}
                    >
                      Delete Task
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TaskManager;
