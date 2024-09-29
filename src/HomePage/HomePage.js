import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";
import * as d3 from "d3";

Chart.register(PieController, ArcElement, Tooltip, Legend);

function HomePage() {
  const [dataSource, setDataSource] = useState({
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#EB9987",
          "#D8FD8A",
          "#8AFDDC",
          "#8AA8FD",
          "#83FF33",
          "#F633FF",
          "#8AC4FD",
          "#DF8AFD",
        ],
      },
    ],
    labels: [],
  });

  const chartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/budget")
      .then((res) => {
        const budgetData = res.data.myBudget;
        if (budgetData) {
          const data = budgetData.map((item) => item.budget);
          const labels = budgetData.map((item) => item.title);
          setDataSource({
            datasets: [
              { data, backgroundColor: dataSource.datasets[0].backgroundColor },
            ],
            labels,
          });
        } else {
          throw new Error("No budget data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  useEffect(() => {
    if (dataSource.labels.length > 0 && pieChartRef.current) {
      const ctx = pieChartRef.current.getContext("2d");
      if (chartRef.current) {
        chartRef.current.destroy(); // Destroy the existing chart
      }
      chartRef.current = new Chart(ctx, {
        type: "pie",
        data: dataSource,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [dataSource]);

  const drawD3Chart = () => {
    if (dataSource.labels.length > 0) {
      const margin = { top: 20, right: 20, bottom: 20, left: 20 };
      const width = 800 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;
      const radius = Math.min(width, height) / 2;
      const hoverRadius = radius * 1.1;

      const svg = d3.select('#d3ChartContainer').html("")
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g')
      .attr('transform', `translate(${(width / 2) + margin.left}, ${(height / 2) + margin.top})`);

  const pie = d3.pie().value((d) => d.budget);
  const data = pie(dataSource.labels.map((label, index) => ({
      budget: dataSource.datasets[0].data[index],
      label: label,
      color: dataSource.datasets[0].backgroundColor[index]
  })));

  const arc = d3.arc().innerRadius(0).outerRadius(radius);
  const arcHover = d3.arc().innerRadius(0).outerRadius(hoverRadius); // Arc for hover effect
  const labelArc = d3.arc().outerRadius(radius * 1.2).innerRadius(radius * 1.2);

  const paths = svg.selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color)
      .on('mouseover', function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('d', arcHover);
      })
      .on('mouseout', function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('d', arc);
      });

      // Polylines
      svg
        .selectAll("polyline")
        .data(data)
        .enter()
        .append("polyline")
        .attr("points", function (d) {
          const posA = arc.centroid(d);
          const posB = labelArc.centroid(d);
          const posC = labelArc.centroid(d);
          posC[0] = radius * 1.0 * (midAngle(d) < Math.PI ? 1 : -1);
          return [posA, posB, posC];
        })
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", 1);

      // Labels
      svg
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("transform", function (d) {
          const pos = labelArc.centroid(d);
          pos[0] = radius * 1.0 * (midAngle(d) < Math.PI ? 1 : -1);
          return `translate(${pos})`;
        })
        .attr("dy", "0.35em")
        .attr("text-anchor", function (d) {
          return midAngle(d) < Math.PI ? "start" : "end";
        })
        .text((d) => d.data.label)
        .style("font-size", "16px");

      function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
      }
    }
  };

  useEffect(() => {
    drawD3Chart();
  }, [dataSource]);

  return (
    <div className="container center">
      <div className="page-area">
        <div className="text-box">
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </div>

        <div className="text-box">
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </div>

        <div className="text-box">
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </div>

        <div className="text-box">
          <h1>Free</h1>
          <p>This app is free!!! And you are the only one holding your data!</p>
        </div>

        <div className="text-box">
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </div>

        <div className="text-box">
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </div>

        <div className="charts-container">
          <div className="text-box">
            <h1>D3.js Chart</h1>
            <div className="d3-chart-container" id="d3ChartContainer"></div>
          </div>

          <div className="text-box">
            <h1>Chart</h1>
            <p>
              <canvas ref={pieChartRef}></canvas>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
