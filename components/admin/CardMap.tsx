import data from './Users.json';
import MemberCard from "./MemberCard";

function CardMap() {
  return (
    <>
      {
        data.map((user) => {
          return (
            <div  key={user.id}>
              <MemberCard
                user={user}
              />
            </div>
          )
        })
      }
    </>
  )
}

export default CardMap;
