import React, { useState } from "react";
import { MdClose, MdInfoOutline, MdKeyboardArrowDown, MdCalendarToday } from "react-icons/md";
import clsx from "clsx";

export default function AssignUserModal({
  open,
  onClose,
  users = [],
  location,
  year,
  month,
  disclosure = "Energy consumption outside organization",
  griCode = "GRI 302-2a",
  assignedFields = {},
  toBeFilledFields = {},
  onAssign,
}) {
  // States
  const [selectedUser, setSelectedUser] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState(null);

  // Inline fields for the design
  const filled = assignedFields; // e.g. { energyType: 'Solar' }
  const toFill = toBeFilledFields; // e.g. { purpose: '', quantity: '', unit: '' }

  // On assign
  function handleAssign() {
    if (!selectedUser || !dueDate) {
      setError("Please select user and due date");
      return;
    }
    setError(null);
    onAssign({ userId: selectedUser, dueDate, comments });
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-[#23272F33]/[.20] flex items-center justify-center px-2">
      <div
        className="relative w-full max-w-[432px] bg-white rounded-2xl shadow-[0_8px_40px_0_rgba(58,53,65,0.14)] flex flex-col"
        style={{ minHeight: 650 }} // optional for minimum height
      >
        {/* HEADER */}
        <div className="flex items-start justify-between px-7 pt-7 pb-2">
          <div>
            <div className="text-[#121926] text-lg font-medium">
              Assign user
            </div>
            <div className="text-[#505868] mt-1 text-sm font-normal">
              Assign a user and select a due date.
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#505868] hover:text-[#121926] rounded-full p-1 -mr-1 -mt-1"
          >
            <MdClose size={22} />
          </button>
        </div>

        <div className="px-7 py-1 flex-1 overflow-y-auto">
          {/* LOC, YEAR, MONTH */}
          <div className="flex items-center mb-2">
            <div className="flex-1 min-w-0">
              <div className="text-xs text-[#505868]">Location</div>
              <div className="text-[#23272F] font-medium text-sm truncate">{location}</div>
            </div>
            <div className="flex-1 min-w-0 text-end">
              <div className="flex justify-end gap-6">
                <div>
                  <div className="text-xs text-[#505868]">Year</div>
                  <div className="text-[#23272F] font-medium text-sm">{year}</div>
                </div>
                <div>
                  <div className="text-xs text-[#505868]">Month</div>
                  <div className="text-[#23272F] font-medium text-sm">{month}</div>
                </div>
              </div>
            </div>
          </div>

          {/* DISCLOSURE ROW */}
          <div className="mt-3 text-xs">
            <span className="font-medium text-[#505868]">Disclosure</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[#23272F] text-sm">{disclosure}</span>
              <span
                className="ml-2 inline-flex items-center bg-[#F3F7FE] border border-[#D0E6FF] text-[#2563EB] text-[11px] rounded-md px-[8px] py-[2px] font-medium"
                style={{ lineHeight: "18px" }}
              >
                {griCode}
              </span>
            </div>
          </div>

          {/* Data already filled */}
          <div className="mt-7 mb-2 text-[13px] font-medium text-[#23272F]">
            Data already filled:
          </div>
          <div className="space-y-1 mb-5">
            <div className="flex items-center gap-1 text-sm">
              <span className="text-[#505868]">Energy type</span>
              <MdInfoOutline className="text-[#A0A9B8]" size={14} />
              <span className="text-[#23272F] ml-2 font-medium">{filled.energyType || "-"}</span>
            </div>
          </div>

          {/* Data to be filled */}
          <div className="text-[13px] font-medium text-[#23272F] mt-6 mb-2">
            Data to be filled:
          </div>
          <div className="space-y-1">
            {[
              { label: "Purpose", value: toFill.purpose },
              { label: "Quantity", value: toFill.quantity },
              { label: "Unit", value: toFill.unit }
            ].map(({ label, value }, i) => (
              <div className="flex items-center gap-1 text-sm" key={label}>
                <span className="text-[#505868]">{label}</span>
                <MdInfoOutline className="text-[#A0A9B8]" size={14} />
                <span className="text-[#23272F] ml-2 font-medium">{value ? value : "-"}</span>
              </div>
            ))}
          </div>

          <form className="mt-7">
            {/* Assign user */}
            <div>
              <label
                htmlFor="assignUser"
                className="text-[#505868] text-sm font-medium block mb-2"
              >
                Assign User
              </label>
              <div className="relative">
                <select
                  id="assignUser"
                  value={selectedUser}
                  onChange={e => setSelectedUser(e.target.value)}
                  className={clsx(
                    "text-sm block w-full border rounded-lg bg-white outline-none px-4 py-3 appearance-none",
                    "border-[#D3DAE6] text-[#23272F]",
                    "focus:ring-1 focus:ring-[#87B7FA]"
                  )}
                  required
                  style={{
                    height: 48, // to match input
                  }}
                >
                  <option value="" disabled>
                    Select user
                  </option>
                  {users.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.username}
                    </option>
                  ))}
                </select>
                <MdKeyboardArrowDown size={22} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#A0A9B8]" />
              </div>
            </div>

            {/* Due date */}
            <div className="mt-6">
              <label
                htmlFor="dueDate"
                className="block text-sm text-[#505868] font-medium mb-2"
              >
                Due date
              </label>
              <div className="relative">
                <input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={e => setDueDate(e.target.value)}
                  className="text-sm block w-full border rounded-lg px-4 py-3 bg-white border-[#D3DAE6] text-[#23272F] focus:ring-1 focus:ring-[#87B7FA] pr-12"
                  style={{ height: 48 }}
                  required
                />
                <MdCalendarToday size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#A0A9B8]" />
              </div>
            </div>

            {/* Comments */}
            <div className="mt-6">
              <label className="block text-sm text-[#505868] font-medium mb-2">
                Comments
              </label>
              <textarea
                placeholder="Add a comment"
                className="block w-full rounded-lg border border-[#D3DAE6] bg-white resize-none px-4 py-3 text-[#23272F] text-sm focus:ring-1 focus:ring-[#87B7FA] outline-none"
                style={{
                  minHeight: 85,
                }}
                value={comments}
                onChange={e => setComments(e.target.value)}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="mt-3 text-sm text-red-500">{error}</div>
            )}
          </form>
        </div>

        {/* FOOTER */}
        <div className="flex gap-4 justify-end items-center px-7 pb-7 pt-4">
          <button
            className="border rounded-lg text-[#23272F] border-[#CFD8E3] bg-[#F3F7FA] text-sm px-8 py-3 font-medium hover:bg-[#E3EAF2] transition"
            style={{ minWidth: 110 }}
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-[#0B6EFF] hover:bg-[#1668CD] text-white rounded-lg text-sm font-medium px-8 py-3"
            style={{ minWidth: 110, boxShadow: "0px 1.5px 16px 0px rgba(49, 100, 225, 0.07)" }}
            onClick={handleAssign}
            type="button"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}