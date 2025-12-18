import API from "../api";

const EquipmentTable = ({ data, fetchData, setSelected }) => {
  const handleDelete = async (id) => {
    await API.delete(`/equipment/${id}`);
    fetchData();
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Status</th>
          <th>Last Cleaned</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="5">No data found</td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.status}</td>
              <td>{item.lastCleaned.slice(0, 10)}</td>
              <td>
                <button
                  className="action-btn edit-btn"
                  onClick={() => setSelected(item)}
                >
                  Edit
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default EquipmentTable;
