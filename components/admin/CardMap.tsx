import data from "./Users.json";
import Card from "./Card";

export default function CardMap() {
  return (
    <>
    {
      data.map((user) => {
        <>
          <Card
            key={user.id}
            user = {user}
          />
        </>
    })
    }
  </>
  )
}
