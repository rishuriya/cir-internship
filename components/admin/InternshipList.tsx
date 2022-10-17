import data from './Users.json';
import InternshipCard from "./InternshipCard";

function InternshipList() {
  return (
    <>
      {
        data.map((user) => {
          return (
            <div  key={user.id}>
              <InternshipCard
                user={user}
              />
            </div>
          )
        })
      }
    </>
  )
}

export default InternshipList;
