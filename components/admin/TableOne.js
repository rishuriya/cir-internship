import React, { useState } from 'react';
import ReactDOM from "react-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { data } from './Users'

import 'bootstrap/dist/css/bootstrap.min.css';
// import './style.css';

import Modal from 'react-modal';


export default function TableOne() {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
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
        const newExpandedRows = isRowExpanded ?
            currentExpandedRows.filter(id => id !== userId) :
            currentExpandedRows.concat(userId);

        setExpandedRows(newExpandedRows);
    }

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
                    <span><b>{`${approveOrDisapprove}`}</b></span>
                    <form>
                        <input />
                        <button className='p-2 m-2 bg-green-200'>Yes</button>
                        <button className='p-2 m-2 bg-red-400' onClick={setDisApprove}>No</button>
                        <button className='p-2 m-2 bg-black text-white'>Go back</button>
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
                                    <th></th>
                                    <th>Name</th>
                                    {/* <th>Roll no</th> */}
                                    <th>Email</th>
                                    <th>Course</th>
                                    <th>Duration</th>
                                    <th>Details</th>
                                    <th>Approve</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((user) =>
                                        <>
                                            <tr key={user.id}>
                                                <td>
                                                    <img width={'20px'} src={'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8='} alt="" />
                                                </td>
                                                <td>
                                                    {user['first_name']}
                                                </td>
                                                {/* <td>
                                                {user['last_name']}
                                            </td> */}
                                                <td>
                                                    {user['email']}
                                                </td>
                                                <td>
                                                    B.Tech CSE
                                                </td>
                                                <td>
                                                    {/* {user['gender']} */}
                                                    10th Oct - 10th Nov 2022
                                                </td>

                                                <td>
                                                    <Button

                                                        variant="link"
                                                        onClick={event => handleEpandRow(event, user.id)}>
                                                        {
                                                            expandState[user.id] ?
                                                                'Hide' : 'Show'
                                                        }
                                                    </Button>
                                                </td>
                                                <td>
                                                    <div className='flex justify-around'>
                                                        <button onClick={handleApproval} className='cursor-pointer'>✅</button>
                                                        <button onClick={handledisApproval} className='cursor-pointer'>❌</button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <>
                                                {
                                                    expandedRows.includes(user.id) ?
                                                        <tr>
                                                            <td>
                                                                <div style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
                                                                    <h2> Details </h2>
                                                                    <ul>
                                                                        <li>
                                                                            <span><b>Full Name:</b></span> {' '}
                                                                            <span> {user['first_name']} {' '} {user['last_name']} </span>
                                                                        </li>
                                                                        <li>
                                                                            <span><b>Company:</b></span> {' '}
                                                                            <span> {user.company} </span>
                                                                        </li>
                                                                        <li>
                                                                            <span><b>Department:</b></span> {' '}
                                                                            <span> {user.department} </span>
                                                                        </li>
                                                                        <li>
                                                                            <span><b>Ip:</b></span> {' '}
                                                                            <span> {user['ip_address']} </span>
                                                                        </li>
                                                                        <li>
                                                                            <span><b>Best Movie:</b></span> {' '}
                                                                            <span> {user.movies} </span>
                                                                        </li>
                                                                        <li>
                                                                            <span><b>About:</b></span> {' '}
                                                                            <span> {user.about} </span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </td>
                                                        </tr> : null
                                                }
                                            </>
                                        </>
                                    )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
};

// ReactDOM.render(<App />, document.getElementById('root'));
