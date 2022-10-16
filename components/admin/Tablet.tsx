export default function Tablet() {
    return (
        <>
            <table id="customers">
                <thead className="bg-red-400">
                    <tr>
                        <th>Name</th> {/* adjust roll number */}
                        <th>Email</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Approval</th>
                        <th>View details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John</td>
                        <td>john@gmail.com</td>
                        <td>25</td>
                        <td>25</td>
                        <td>
                            <div className="flex justify-evenly">
                                <button>✅</button>
                                <button>❌</button>
                            </div>
                        </td>
                        <td>
                            <div className="flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>

                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Peter</td>
                        <td>peter@gmail.com</td>
                        <td>30</td>
                        <td>30</td>
                        <td>
                            <div className="flex justify-evenly">
                                <button>✅</button>
                                <button>❌</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>mohan</td>
                        <td>mohan@mail.com</td>
                        <td>19</td>
                        <td>19</td>
                        <td>
                            <div className="flex justify-evenly">
                                <button>✅</button>
                                <button>❌</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <style jsx>
                {`
                #customers {
                    font-family: Arial, Helvetica, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                  }
                  
                  #customers td, #customers th {
                    border: 1px solid #ddd;
                    padding: 8px;
                  }
                  
                  #customers tr:nth-child(even)
                  {
                    background-color: #f2f2f2;
                }
                  
                  #customers tr:hover 
                  {
                    background-color: #ddd;
                }
                  
                  #customers th {
                    padding-top: 12px;
                    padding-bottom: 12px;
                    background-color: #000;
                    color: white;
                  }

                  td {
                    text-align: center;
                  }

                  th {
                    text-align: center;
                  }
                `}
            </style>
        </>
    );
}