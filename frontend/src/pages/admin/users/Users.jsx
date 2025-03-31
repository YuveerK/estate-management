import React, { useEffect, useRef, useState } from "react";
import PageHeader from "../../../components/PageHeader";
import TabSelector from "../../../components/inputs/TabSelector";
import CreateRequestButton from "../../../components/CreateRequestButton";
import SearchInput from "../../../components/inputs/SearchInput";
import ColumnVisibilityDropdown from "../../../components/ColumnVisibilityDropdown";
import CreateUserModal from "../../../components/admin//users/CreateUserModal";
import AdminUsersTablePage from "../../../components/admin/users/AdminUsersTablePage";

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

const Users = () => {
  const [activeTab, setActiveTab] = useState("All Requests");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMenu, setFilterMenu] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(allColumns);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // 👈 add this

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilterMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [visibleColumns]);

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
        <PageHeader title="All Users" subtitle="View and manage users" />
        <CreateRequestButton
          onClick={() => {
            setSelectedUser(null); // ✅ Reset selected user
            setShowModal(true); // ✅ Open modal in create mode
          }}
          title={"Create User"}
        />

        <CreateUserModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          existingUser={selectedUser} // 👈 pass this in
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
        <AdminUsersTablePage
          filter={activeTab}
          visibleColumns={visibleColumns}
          searchQuery={searchQuery}
          onViewUser={(user) => {
            setSelectedUser(user); // ✅ sets user to populate the modal
            setShowModal(true); // ✅ opens the modal
          }}
        />
      </div>
    </div>
  );
};

export default Users;
