import React, { useEffect } from "react";
import NoInternship from "./NoInternship";
import Navbar from "./Navbar";
import InternshipCard from "./InternshipCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Home() {
  const [loading, setLoading] = React.useState(true);
  const [internship_id, setInternship_id] = React.useState([]);

  const authUser: any = useSelector((state: RootState) => state.user.value);

  useEffect(() => {
    if (authUser !== null) {
      const userObject = {
        _id: authUser.id,
      };
      fetch(`/api/student/userData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf8 ",
        },
        body: JSON.stringify(userObject),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setInternship_id(data.data.internships);
          }
          setLoading(false);
        });
    }
  }, [authUser]);

  return (
    <div>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-2xl my-5 mx-5 mb-5">
          Internships
        </div>
        {!loading && internship_id.length === 0 ? (
          <NoInternship />
        ) : loading ? (
          <AiOutlineLoading3Quarters
            className="fill-primary animate-spin my-14 mx-auto"
            size={48}
          />
        ) : (
          internship_id.map((id) => {
            return <InternshipCard key={id} id={id} />;
          })
        )}
      </main>

      <footer className="">

      </footer>
    </div>
  );
}

export default Home;