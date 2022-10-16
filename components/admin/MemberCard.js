export default function MemberCard(props) {

    console.log(props.user);

    // const { id, name, email, gender, Comapany, mentor, internship_start_date, internship_end_date, internship_mode, approved, company_location, company_email, company_mobile } = props.user;

    return (
        <>
            <div className="flex flex-row justify-evenly mx-72 w-auto border-black border-2 p-10">
                <div>
                    <h1>Ansumaan Swan</h1>
                    <h2>AM.EN.U4CSE21169</h2>
                    <h1>BTech Yoga and Streching</h1>
                </div>
                <div>
                    <h1>Choogle</h1>
                    <h1>10th Oct 2022 - 11th Oct 2022</h1>
                    <h1>Offline</h1>
                </div>
                <div>
                    <button className="bg-green-400 rounded-2xl p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </button>
                    <br />
                    <button className="bg-red-300 rounded-2xl p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}
