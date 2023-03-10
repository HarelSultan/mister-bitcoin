export interface ChartData {
  status: string;
  name: string;
  unit: string;
  period: string;
  description: string;
  values: Value[];
}

export interface Value {
  x: number;
  y: number;
}

export interface GraphData {
  marketPriceHistory: {
    labels: string[];
    datasets: DataSet[];
  };
  avgBlockSize: {
    labels: string[];
    datasets: DataSet[];
  };
}

export interface DataSet {
  label: string;
  backgroundColor: string;
  data: Array<number>;
  fill: boolean;
  tension: number;
  borderColor: string;
  responsive: boolean;
  maintainAspectRatio: boolean;
}
