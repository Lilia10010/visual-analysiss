import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Serie } from "@nivo/line";

interface HorizontalLineChartProps {
  data: Serie[];
}

export const HorizontalLineMap: React.FC<HorizontalLineChartProps> = ({
  data,
}) => {
  const dataComMeses = data.map((serie) => ({
    ...serie,
    data: serie.data.map((ponto) => ({
      ...ponto,
      color: serie.color,
    })),
  }));

  return (
    <div className="w-full h-[400px] line-char">
      <ResponsiveLine
        data={dataComMeses}
        theme={{
          textColor: "white",
          fontSize: 10,
          axis: {
            domain: {
              line: {
                stroke: "white",
                strokeWidth: 1,
              },
            },
            legend: {
              text: {
                fill: "white",
                fontSize: 14,
              },
            },
          },
        }}
        margin={{ top: 20, right: 20, bottom: 100, left: 80 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisRight={null}
        axisBottom={{
          tickSize: 15,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Transações processadas",
          legendOffset: 46,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 15,
          tickPadding: 5,
          tickRotation: 10,
          legend: "Quantidade",
          legendOffset: -60,
          legendPosition: "middle",
          tickValues: 5,
        }}
        colors={(serie) => serie.data[0].color}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={1}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        enableSlices="x"
        animate={true}
        curve="monotoneX"
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            translateY: 90,
            itemsSpacing: 1,
            itemDirection: "left-to-right",
            itemWidth: 100,
            itemHeight: 10,
            symbolSize: 18,
            symbolShape: "diamond",
            effects: [],
            itemTextColor: "white",
          },
        ]}
      />
    </div>
  );
};
