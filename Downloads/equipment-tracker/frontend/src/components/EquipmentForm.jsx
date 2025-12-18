import { useEffect, useState } from "react";
import API from "../api";

const EquipmentForm = ({ fetchData, selected, setSelected }) => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    status: "",
    lastCleaned: "",
  });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selected) {
      await API.put(`/equipment/${selected._id}`, form);
      setSelected(null);
    } else {
      await API.post("/equipment", form);
    }

    setForm({ name: "", type: "", status: "", lastCleaned: "" });
    fetchData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Equipment Name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <select
        required
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="">Select Type</option>
        <option>Machine</option>
        <option>Vessel</option>
        <option>Tank</option>
        <option>Mixer</option>
      </select>

      <select
        required
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="">Select Status</option>
        <option>Active</option>
        <option>Inactive</option>
        <option>Under Maintenance</option>
      </select>

      <input
      
        type="date"
        required
        value={form.lastCleaned?.slice(0, 10)}
        onChange={(e) =>
          setForm({ ...form, lastCleaned: e.target.value })
        }
      />

      <button type="submit">
        {selected ? "Update Equipment" : "Add Equipment"}
      </button>
    </form>
  );
};

export default EquipmentForm;
