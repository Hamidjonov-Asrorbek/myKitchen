import React from "react";
import { useSelector } from "react-redux";
import { RootState, Product } from "../../components/types";
import ApexChart from "../../components/ApexChart";

const Statistic: React.FC = () => {
  const state = useSelector((state: RootState) => state.products);
  const products: Product[] = state.data;

  const preparationTimeSeries = products.map((product) => product.time);
  const preparationTimeLabels = products.map((product) => product.name);

  return (
    <div className="container">
      <div className="chart-section">
        <ApexChart
          series={preparationTimeSeries}
          labels={preparationTimeLabels}
          title="Food Preparation Time in Minutes"
        />
      </div>
    </div>
  );
};

export default Statistic;
