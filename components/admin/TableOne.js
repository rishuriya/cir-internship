import React, { useState } from "react";
import Modal from "react-modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {AiOutlineCheck, AiOutlineUp,AiOutlineDown, AiOutlineClose} from "react-icons/ai";

import data from "./Users.json";

import "bootstrap/dist/css/bootstrap.min.css";

export default function TableOne() {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

    //   Modal.setAppElement('#yourAppElement');

  const [modalIsOpen, setIsOpen] = useState(false);
  const [approveOrDisapprove, setApproveOrDisapprove] = useState("");

  const [disapproval, setDisapproval] = useState(false);

  function setDisApprove() {
    setDisapproval(true);
  }

  function handleApproval() {
    openModal();
    setApproveOrDisapprove("Yes");
  }

  function handledisApproval() {
    openModal();
    // setApproveOrDisapprove("No");
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  // State variable to keep track of all the expanded rows
  // By default, nothing expanded. Hence initialized with empty array.
  const [expandedRows, setExpandedRows] = useState([]);

  // State variable to keep track which row is currently expanded.
  const [expandState, setExpandState] = useState({});

  /**
   * This function gets called when show/hide link is clicked.
   */
  const handleEpandRow = (event, userId) => {
    const currentExpandedRows = expandedRows;
    const isRowExpanded = currentExpandedRows.includes(userId);

    let obj = {};
    isRowExpanded ? (obj[userId] = false) : (obj[userId] = true);
    setExpandState(obj);

    // If the row is expanded, we are here to hide it. Hence remove
    // it from the state variable. Otherwise add to it.
    const newExpandedRows = isRowExpanded
      ? currentExpandedRows.filter((id) => id !== userId)
      : currentExpandedRows.concat(userId);

    setExpandedRows(newExpandedRows);
  };

  return (
    <>
      <div>
        {/* <button onClick={openModal}>Open Modal</button> */}
        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Confirmation modal"
        >
          {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
          <h2>Confirmation</h2>
          {/* <button onClick={closeModal}>close</button> */}
          <span>{`Are you sure you wanna proceed with `}</span>
          <span>
            <b>{`${approveOrDisapprove}`}</b>
          </span>
          <form>
            <input />
            <button className="py-2 px-3 rounded-md m-2 bg-green-200">Yes</button>
            <button className="py-2 px-3 rounded-md m-2 bg-red-400" onClick={setDisApprove}>
              No
            </button>
            <button className="py-2 px-3 rounded-md m-2 bg-black text-white">Go back</button>
          </form>
        </Modal>
      </div>

      {/* <div>
                <Modal
                    isOpen={disapproval ? true : false}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Remarks for disapproval modal"
                >
                    <h2>Remarks for disapproval</h2>
                    <form>
                        <input type="text" name="remarks" id="" />
                    </form>
                </Modal>
            </div> */}

      <Container>
        {/* <Row>
                <Col>
                    <h1> Users({data.length})</h1>
                </Col>
            </Row> */}
        <Row>
          <Col sm={12}>
            <Table responsive variant="light">
              <thead>
                <tr>
                  {/* <th></th> */}
                  <th></th>
                  <th>Name</th>
                  {/* <th>Roll no</th> */}
                  <th>Email</th>
                  <th>Course</th>
                  <th>Duration</th>
                  <th>Approve</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <>
                    <tr key={user.id}>
                      {/* <td>
                        <img
                          width={"20px"}
                          src={
                            "https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8="
                          }
                          alt=""
                        />
                      </td> */}
                      <td>
                        <Button
                          variant="link"
                          className=""
                          onClick={(event) => handleEpandRow(event, user.id)}>
                          {/* {expandState[user.id] ? "Hide" : "Show"} */}
                          {expandState[user.id] ? <AiOutlineUp/> : <AiOutlineDown/>}
                        </Button>
                      </td>
                      <td>{user["name"]}</td>
                      <td className="truncate">{user["email"]}</td>
                      <td>B.Tech CSE</td>
                      <td>
                        {user.internship_start_date} - {user.internship_end_date}
                      </td>

                      <td>
                        <div className="flex justify-around">
                          <button
                            onClick={handleApproval}
                            className="cursor-pointer">
                            <AiOutlineCheck size={24} className="fill-green-600 hover:bg-green-200"/>
                          </button>
                          <button
                            onClick={handledisApproval}
                            className="cursor-pointer">
                            <AiOutlineClose size={24} className="fill-red-600 hover:bg-red-200"/>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <>
                      {expandedRows.includes(user.id) ? (
                        <>
                        <td></td>
                          <td colspan="4">
                            <div
                              style={{
                                backgroundColor: "white",
                                color: "black",
                                padding: "5px",
                                width: "100%",
                              }}>
                              {/* <h2> Details </h2> */}
                              <ul>
                                <li>
                                  <span>
                                    <b>Company:</b>
                                  </span>{" "}
                                  <span> {user.Company} </span>
                                </li>
                                <li>
                                  <span>
                                    <b>Department:</b>
                                  </span>{" "}
                                  <span> {user.department} </span>
                                </li>
                                <li>
                                  <span>
                                    <b>Company Location:</b>
                                  </span>{" "}
                                  <span> {user.company_location} </span>
                                </li>
                                <li>
                                  <span>
                                    <b>Internship Mode:</b>
                                  </span>{" "}
                                  <span> {user.internship_mode} </span>
                                </li>
                                <li>
                                  <span>
                                    <b>About:</b>
                                  </span>{" "}
                                  <span> {user.about} </span>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </>
                      ) : null}
                    </>
                  </>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

// ReactDOM.render(<App />, document.getElementById('root'));
