import { useState } from "react";

export default function Leaderboard() {
  interface Ranking {
    name: string;
    rank: string;
    miles: string;
  }

  //MAKE get call to get times for all friends, compare and then rank friends
  //MAKE popup for add friends to enter "friend code"

  const rankings: Ranking[] = [
    { name: "varunski", rank: "1st", miles: "12,345 miles" },
    { name: "justinsucksatlife", rank: "2nd", miles: "2,000 miles" },
    { name: "Iwantagreencard", rank: "3rd", miles: "1,999 miles" },
    { name: "jonam4life", rank: "4th", miles: "12 miles" },
    { name: "klyle", rank: "5th", miles: "6 miles" },
    { name: "sir_milo", rank: "6th", miles: "1 mile" },
  ];

  return (
    <div className="bg-bgColor/10 rounded-[25px] self-center w-full h-[50%] p-6 flex flex-col">
      <h1 className="font-black text-2xl text-left mb-2 sticky top-0">
        leaderboard 👑
      </h1>
      <div className="flex-grow overflow-auto scrollbar-hide">
        <ul>
          {rankings.map((ranking) => (
            <li className="flex flex-row bg-darkBlue h-14 items-center text-left p-2 px-3 my-3 rounded-[15px]">
              <div className="flex bg-hotPink min-h-10 min-w-10 mr-3 rounded-[25px] justify-center items-center">
                <h1 className="font-black text-base">{ranking.rank}</h1>
              </div>
              <div className="flex flex-col overflow-x-auto scrollbar-hide">
                <h2 className="font-black text-lg">{ranking.name}</h2>
                <p className="font-bold text-xs">{ranking.miles}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <button className="text-base px-6 py-2 rounded-[10px]">
          add friends
        </button>
      </div>
    </div>
  );
}
