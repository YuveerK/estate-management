import React, { useEffect, useRef, useState } from "react";
import AdminMaintenanceRequestsTablePage from "../../../components/admin/maintenance/AdminMaintenanceRequestsTablePage";
import PageHeader from "../../../components/PageHeader";
import TabSelector from "../../../components/inputs/TabSelector";
import CreateRequestButton from "../../../components/CreateRequestButton";
import SearchInput from "../../../components/inputs/SearchInput";
import ColumnVisibilityDropdown from "../../../components/ColumnVisibilityDropdown";
import CreateMaintenanceModal from "../../../components/admin/maintenance/CreateMaintenanceModal";

const tabs = ["All Requests", "New", "In Progress", "Completed"];
const allColumns = [
  "Title",
  "Unit",
  "Resident",
  "Date",
  "Priority",
  "Status",
  "AssignedTo",
  "Actions",
];

const Maintenance = () => {
  const [activeTab, setActiveTab] = useState("All Requests");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMenu, setFilterMenu] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(allColumns);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // 👈 trigger refresh

  const dropdownRef = useRef(null);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilterMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleColumn = (col) => {
    if (visibleColumns.includes(col)) {
      setVisibleColumns(visibleColumns.filter((c) => c !== col));
    } else {
      setVisibleColumns([...visibleColumns, col]);
    }
  };

  return (
    <div className="w-full h-screen p-8 bg-white rounded-md shadow-sm overflow-auto relative">
      <div className="flex items-center justify-between">
        <PageHeader
          title="All Requests"
          subtitle="View and manage all maintenance requests from residents"
        />
        <CreateRequestButton
          onClick={() => {
            setSelectedRequest(null);
            setShowModal(true);
          }}
          title={"Create Request"}
        />
        <CreateMaintenanceModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          existingRequest={selectedRequest}
          onSuccess={handleRefresh} // ✅ trigger refresh after success
        />
      </div>

      <TabSelector
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="w-full flex items-center justify-between mt-8">
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
        <div className="relative" ref={dropdownRef}>
          <ColumnVisibilityDropdown
            isOpen={filterMenu}
            toggleMenu={() => setFilterMenu((prev) => !prev)}
            visibleColumns={visibleColumns}
            toggleColumn={toggleColumn}
            allColumns={allColumns}
          />
        </div>
      </div>

      <div className="mt-6">
        <AdminMaintenanceRequestsTablePage
          filter={activeTab}
          visibleColumns={visibleColumns}
          searchQuery={searchQuery}
          onView={(req) => {
            setSelectedRequest(req);
            setShowModal(true);
          }}
          refreshKey={refreshKey} // ✅ triggers re-fetch
        />
      </div>
    </div>
  );
};

export default Maintenance;
