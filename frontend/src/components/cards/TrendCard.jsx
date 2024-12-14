import Card from "../partials/Card";

const TrendCard = () => {
  const trends = [
    { name: "ReactJs", shares: "12.5" },
    { name: "Laravel", shares: "13.5" },
    { name: "NodeJs", shares: "15.5" },
    { name: "Syria", shares: "18.5" },
    { name: "Django", shares: "18.5" },
  ];
  return (
    <Card className="gap-3 flex flex-col">
      <h3 className="mb-2  text-lg font-bold">Trends for you</h3>
      {trends.map((trend, id) => (
        <div key={id} className="flex flex-col gap-1 cursor-pointer">
          <span className=" font-bold "> #{trend.name}</span>
          <span> {trend.shares}K shares</span>
        </div>
      ))}
    </Card>
  );
};

export default TrendCard;
