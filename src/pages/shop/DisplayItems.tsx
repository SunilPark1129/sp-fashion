import React from "react";
import { MyData } from "../../redux/features/getSlice";

type Props = {
  filteredData: MyData[];
};

function DisplayItems({ filteredData }: Props) {
  return (
    <div>
      <ul>
        {filteredData.map(({ id, name, sale, gender }: MyData) => (
          <li key={id}>
            {name} {gender}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayItems;
