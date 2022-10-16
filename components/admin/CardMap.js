import data from './Users.json';
import MemberCard from "./MemberCard.js";

export default function CardMap() {

  console.log(data);

  return (
    <>
      {
        data.map((user) => {
          return (
            <>
              <MemberCard
                key={user.id}
                user={user}
              />
            </>
          )
        })
      }
    </>
  )
}
