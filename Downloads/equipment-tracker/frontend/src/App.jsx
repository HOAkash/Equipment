import { useEffect, useState } from "react";
import API from "./api";
import EquipmentForm from "./components/EquipmentForm";
import EquipmentTable from "./components/EquipmentTable";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const fetchData = async () => {
    try {
      const res = await API.get("/equipment");
      setData(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // SEARCH + FILTER
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter ? item.status === statusFilter : true)
  );

  // SORT
  const sortedData = [...filteredData].sort((a, b) =>
    sortAsc
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  return (
    <div className="app-container">
      <h2>Equipment Tracker</h2>

      <EquipmentForm
        fetchData={fetchData}
        selected={selected}
        setSelected={setSelected}
      />

      {/* SEARCH & FILTER */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Under Maintenance</option>
        </select>

        <button onClick={() => setSortAsc(!sortAsc)}>
          Sort {sortAsc ? "⬆️" : "⬇️"}
        </button>
      </div>

      <EquipmentTable
        data={sortedData}
        fetchData={fetchData}
        setSelected={setSelected}
      />
    </div>
  );
}

export default App;
