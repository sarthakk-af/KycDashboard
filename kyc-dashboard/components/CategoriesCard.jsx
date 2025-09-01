export default function CategoriesCard({ categories, view, setView }) {
  const data = view === 'individual' ? categories.individual : categories.nonIndividual;

  const Bar = ({ value, color, secondaryColor }) => (
    <div className="h-2 w-full bg-gray-200 dark:bg-neutral-700 rounded-full">
        <div className="flex h-full">
            <div
                className={`${color} h-full rounded-l-full`}
                style={{ width: `${value}%` }}
            />
            <div
                className={`${secondaryColor} h-full rounded-r-full`}
                style={{ width: `${100-value}%` }}
            />
        </div>
    </div>
  );

   const BarRow = ({ title, data }) => (
    <div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{title}</div>
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <Bar value={data.RI} color="bg-blue-600" secondaryColor="bg-sky-100" />
            </div>
             <div className="flex items-center gap-2">
                <Bar value={data.NRI} color="bg-sky-500" secondaryColor="bg-sky-100" />
            </div>
        </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-card transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">
          Categories
        </div>
        <div className="flex bg-gray-100 dark:bg-neutral-800 rounded-full p-1">
          <button
            onClick={() => setView("individual")}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              view === "individual"
                ? "bg-white dark:bg-neutral-700 shadow-sm"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Individual
          </button>
          <button
            onClick={() => setView("nonIndividual")}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              view === "nonIndividual"
                ? "bg-white dark:bg-neutral-700 shadow-sm"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Non Individual
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        <BarRow title="RI" data={data}/>
        <BarRow title="NRI" data={data}/>
      </div>
    </div>
  );
}