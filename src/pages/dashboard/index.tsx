import { CardTotalTransitions } from "./components/CardTotalTransitions";
import { GraphicOfProcessedTransactions } from "./components/GraphicOfProcessedTransactions";
import { Layout } from "../../components/Layout";
import { PercentageOfTransactions } from "./components/PercentageOfTransactions";

export default function Dashboard() {
  return (
    <Layout>
      <div className="flex flex-col gap-2 justify-between w-full mt-5">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-300 ">
            Metricas das transações{" "}
          </h1>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="block sm:grid sm:grid-cols-12 gap-8 w-full">
            <div className="col-span-12 lg:col-span-9 bg-tertiary dark:bg-secondary-dark rounded-lg">
              <GraphicOfProcessedTransactions />
            </div>
            <div className="col-span-12 lg:col-span-3 mt-14 sm:mt-0">
              <CardTotalTransitions />
            </div>
          </div>
        </div>
        <div>
          <PercentageOfTransactions />
        </div>
      </div>
    </Layout>
  );
}
