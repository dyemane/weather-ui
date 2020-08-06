import React from "react";
import moment from "moment";
import { IHourlyForcast } from "./";
import { VictoryChart, VictoryArea, VictoryLabel, VictoryAxis } from "victory";
import { convertKelvinToF } from "../utils";

export const ForcastChart = ({ hourly }: { hourly: IHourlyForcast[] }) => {
  let minY = 100,
    maxY = 0,
    chartTimeLength = moment().add(24, "hours"),
    everyNth = (arr: any[], nth: number) =>
      arr.filter((e, i) => i % nth === nth - 1),
    data = everyNth(hourly, 5)
      .filter(({ dt }) => chartTimeLength.diff(moment.unix(dt), "minutes") > 0)
      .sort((a, b) => a.dt - b.dt)
      .map(h => {
        const temp = convertKelvinToF(h.temp);
        minY = Math.min(temp, minY);
        maxY = Math.max(temp, maxY);
        return {
          x: moment.unix(h.dt).format("hA"),
          y: temp
        };
      });
  return (
    <div>
      {hourly && (
        <VictoryChart
          padding={{ top: 0, bottom: 20, left: 10, right: 10 }}
          height={90}
          minDomain={{ y: minY - 5 }}
          maxDomain={{ y: maxY + 5 }}
          animate={{ duration: 500 }}
        >
          <VictoryArea
            interpolation="natural"
            labels={({ datum }) => Math.round(datum.y)}
            labelComponent={<VictoryLabel renderInPortal dy={-5} />}
            style={{
              data: {
                fill: "#FEF5DA",
                stroke: "#F3D37E",
                strokeWidth: 1,
                strokeLinecap: "round"
              },
              labels: {
                fontSize: 8,
                fill: "#B2B2B2"
              }
            }}
            data={data}
          />
          <VictoryAxis
            style={{
              axis: {
                stroke: "none"
              },
              tickLabels: {
                fontSize: 7,
                lineHeight: 4,
                fill: "#B2B2B2",
                padding: 2
              }
            }}
          />
        </VictoryChart>
      )}
    </div>
  );
};
export default ForcastChart;
