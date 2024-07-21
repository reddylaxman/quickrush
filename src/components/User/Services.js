import React from "react";
import Card from "react-bootstrap/Card";

function Services() {
  const itemList = [
    {
      name: "Cancer Care",
      intro:
        "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.",
    },
    {
      name: "Labor & Delivery",
      intro:
        "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.",
    },
    {
      name: "Mental Health",
      intro:
        "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.",
    },
    {
      name: "Burn Treatment",
      intro:
        "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.",
    },
    {
      name: "Neurology",
      intro:
        "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.",
    },
  ];

  return (
    <div
      className="searchbar"
      style={{
        marginTop: "60px",
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {itemList.map((item, index) => (
          <div key={index} className="col">
            <Card className="h-full rounded-lg shadow-md">
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text className="text-sm">{item.intro}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
