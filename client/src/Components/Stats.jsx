import React from "react";

const stats = [
  {
    id: "stats-1",
    title: "Active Employees",
    value: "580+",
  },
  {
    id: "stats-2",
    title: "Companies Served",
    value: "120+",
  },
  {
    id: "stats-3",
    title: "Total Transactions",
    value: "Over $1M",
  },
];

const Stats = () => (
  <section className={`flex flex-row flex-wrap justify-center`}>
    {stats.map((stat) => (
      <div
        key={stat.id}
        className={`flex-1 flex flex-col justify-center items-center p-14 text-center`}
      >
        <h4 className="font-poppins font-semibold text-4xl text-black">
          {stat.value}
        </h4>
        <p className="font-poppins font-semibold text-xl text-gray-600 uppercase mt-2">
          {stat.title}
        </p>
      </div>
    ))}
  </section>
);

export default Stats;
