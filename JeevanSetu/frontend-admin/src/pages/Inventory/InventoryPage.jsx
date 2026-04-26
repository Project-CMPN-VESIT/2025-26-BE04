import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InventoryDashboard from "./InventoryDashboard";

const InventoryPage = () => {
  const { centreId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      
      <InventoryDashboard centreId={centreId} />
    </div>
  );
};

export default InventoryPage;