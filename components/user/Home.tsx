import Navbar from "./Navbar";
import cookie from "js-cookie";
import { RootState } from "../../store";
import React, { useEffect } from "react";
import NoInternship from "./NoInternship";
import { useSelector } from "react-redux";
import InternshipCard from "./InternshipCard";
import Router from "next/router";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Home() {
  const [loading, setLoading] = React.useState(true);
  const [internship_id, setInternship_id] = React.useState([]);

  const authUser: any = useSelector((state: RootState) => state.user.value);

  useEffect(() => {
    const token = cookie.get("token");

    if (authUser !== null) {
      fetch(`/api/student/${authUser.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf8 ",
          authorisation: token,
        },
      })
        .then((res) => {
          if (res.status === 401) {
            Router.push("/login");
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setInternship_id(data.data.internships.reverse());
          }
          setLoading(false);
        });
    }
  }, [authUser]);

  return (
    <div>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {!loading && internship_id.length === 0 ? (
          <NoInternship />
        ) : (
          <>
            <div className="text-2xl my-5 mb-5 mx-auto max-w-4xl">
              Internships Registered
            </div>
            {loading ? (
              <>
                <AiOutlineLoading3Quarters
                  className="fill-primary animate-spin my-14 mx-auto"
                  size={48}
                />
              </>
            ) : (
              internship_id.map((id) => {
                return <InternshipCard key={id} id={id} />;
              })
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Home;
