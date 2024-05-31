import { useEffect, useState } from "react";
import Popup from "./popup";
import axios from "axios";

interface LeaderboardProps {
  userId: string;
}
interface Friend {
  userId: string;
  username: string;
  timespent: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ userId }) => {
  interface Ranking {
    name: string;
    rank: string;
    miles: string;
  }
  const [friends, setFriends] = useState<Friend[]>([]);
  // console.log(friends);
  const [rankings, setRankings] = useState<Ranking[]>([]);

  useEffect(() => {
    const fetchFriendsData = async () => {
      if (userId) {
        try {
          const res = await axios.get(`http://localhost:8000/${userId}`);
          const friendsList = res.data.friends;
          const currentUser = {
            userId: userId,
            username: res.data.username,
            timespent: res.data.timeSpent,
          };

          const friendsDataPromises = friendsList.map(
            async (friendId: string) => {
              const friendRes = await axios.get(
                `http://localhost:8000/${friendId}`
              );
              return {
                userId: friendId,
                username: friendRes.data.username,
                timespent: friendRes.data.timeSpent,
              };
            }
          );

          const friendsData = await Promise.all(friendsDataPromises);
          setFriends(friendsData);
          const combinedData = [currentUser, ...friendsData];

          // Sort by timespent in descending order
          combinedData.sort((a, b) => b.timespent - a.timespent);

          const formattedRankings = combinedData.map((user, index) => {
            const rankSuffix =
              index + 1 === 1
                ? "st"
                : index + 1 === 2
                ? "nd"
                : index + 1 === 3
                ? "rd"
                : "th";
            return {
              name: user.username,
              rank: `${index + 1}${rankSuffix}`,
              miles: `${user.timespent} miles`,
            };
          });

          setRankings(formattedRankings);
        } catch (error) {
          console.error("Error fetching friends data:", error);
        }
      }
    };

    fetchFriendsData();
  }, [rankings, userId]);

  return (
    <div className="bg-bgColor/10 rounded-[25px] self-center w-full h-[50%] p-6 flex flex-col">
      <h1 className="font-black text-2xl text-left mb-2 sticky top-0">
        leaderboard 👑
      </h1>
      <div className="flex-grow overflow-auto scrollbar-hide">
        <ul>
          {rankings.map((user) => (
            <li className="flex flex-row bg-darkBlue h-14 items-center text-left p-2 px-3 my-3 rounded-[15px]">
              <div className="flex bg-hotPink min-h-10 min-w-10 mr-3 rounded-[25px] justify-center items-center">
                <h1 className="font-black text-base">{user.rank}</h1>
              </div>
              <div className="flex flex-col overflow-x-auto scrollbar-hide">
                <h2 className="font-black text-lg">{user.name}</h2>
                <p className="font-bold text-xs">{user.miles}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <Popup userId={userId} />
      </div>
    </div>
  );
};

export default Leaderboard;
