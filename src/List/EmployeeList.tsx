import React, { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowUpDown,
  Download,
  ChevronDown,
  Mail,
  Building2,
  SlidersHorizontal,
  Zap,
  Calendar,
  Activity,
} from "lucide-react";

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  status: "Active" | "On leave" | "Inactive";
}

const initialEmployees: Employee[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    department: "Engineering",
    position: "Senior Software Engineer",
    salary: 125000,
    hireDate: "Mar 15, 2022",
    status: "Active",
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    email: "michael.rodriguez@company.com",
    department: "Marketing",
    position: "Marketing Manager",
    salary: 95000,
    hireDate: "Aug 22, 2021",
    status: "Active",
  },
  {
    id: "3",
    name: "Emily Watson",
    email: "emily.watson@company.com",
    department: "Design",
    position: "UX Designer",
    salary: 88000,
    hireDate: "Jan 10, 2023",
    status: "Active",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@company.com",
    department: "Engineering",
    position: "Tech Lead",
    salary: 145000,
    hireDate: "Nov 5, 2020",
    status: "Active",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa.anderson@company.com",
    department: "HR",
    position: "HR Director",
    salary: 110000,
    hireDate: "Jun 12, 2019",
    status: "On leave",
  },
  {
    id: "6",
    name: "James Mitchell",
    email: "james.mitchell@company.com",
    department: "Sales",
    position: "Sales Director",
    salary: 130000,
    hireDate: "Feb 28, 2021",
    status: "Active",
  },
  {
    id: "7",
    name: "Jennifer Lee",
    email: "jennifer.lee@company.com",
    department: "Finance",
    position: "Financial Analyst",
    salary: 75000,
    hireDate: "Apr 18, 2023",
    status: "Active",
  },
  {
    id: "8",
    name: "Robert Chang",
    email: "robert.chang@company.com",
    department: "Engineering",
    position: "DevOps Engineer",
    salary: 105000,
    hireDate: "Sep 14, 2022",
    status: "Active",
  },
  {
    id: "9",
    name: "Amanda Pierce",
    email: "amanda.pierce@company.com",
    department: "Marketing",
    position: "Content Manager",
    salary: 72000,
    hireDate: "Jul 3, 2023",
    status: "Inactive",
  },
  {
    id: "10",
    name: "Christopher Hayes",
    email: "chris.hayes@company.com",
    department: "Operations",
    position: "Operations Manager",
    salary: 98000,
    hireDate: "Dec 1, 2021",
    status: "Active",
  },
];

export default function EmployeeList() {
  const [employees] = useState<Employee[]>(initialEmployees);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(["2", "3"]));
  const [sortKey, setSortKey] = useState<"name" | "department" | "salary" | "hireDate" | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Toggle single selection
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectedIds.size === employees.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(employees.map((e) => e.id)));
    }
  };

  // Sorted list calculation
  const sortedEmployees = useMemo(() => {
    if (!sortKey) return employees;
    return [...employees].sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];

      if (typeof valA === "string") {
        const res = valA.localeCompare(valB as string);
        return sortDirection === "asc" ? res : -res;
      }
      if (typeof valA === "number") {
        return sortDirection === "asc"
          ? (valA as number) - (valB as number)
          : (valB as number) - (valA as number);
      }
      return 0;
    });
  }, [employees, sortKey, sortDirection]);

  // Handle Sort Option Select
  const handleSortSelect = (key: "name" | "department" | "salary" | "hireDate") => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
    setIsSortOpen(false);
  };

  // Handle Export
  const handleExport = (format: "csv" | "json") => {
    const dataToExport = employees.filter((e) =>
      selectedIds.size > 0 ? selectedIds.has(e.id) : true
    );

    if (format === "json") {
      const jsonStr = JSON.stringify(dataToExport, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "employees.json";
      a.click();
    } else {
      const headers = "Name,Email,Department,Position,Salary,Hire Date,Status\n";
      const rows = dataToExport
        .map(
          (e) =>
            `"${e.name}","${e.email}","${e.department}","${e.position}",${e.salary},"${e.hireDate}","${e.status}"`
        )
        .join("\n");
      const blob = new Blob([headers + rows], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "employees.csv";
      a.click();
    }
    setIsExportOpen(false);
  };

  return (
    <div className="w-full bg-zinc-950 text-zinc-50 p-4 sm:p-6 rounded-2xl border border-zinc-900 shadow-2xl">
      {/* Top Right Action Toolbar (Sort & Export Dropdowns matching screenshot) */}
      <div className="flex items-center justify-end gap-3 mb-4 relative z-30">
        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsSortOpen(!isSortOpen);
              setIsExportOpen(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 text-xs font-medium text-zinc-200 hover:bg-zinc-800/80 hover:text-white transition-colors"
          >
            <ArrowUpDown className="h-3.5 w-3.5 text-zinc-400" />
            <span>Sort</span>
            <ChevronDown className="h-3.5 w-3.5 text-zinc-400 ml-0.5" />
          </button>

          {isSortOpen && (
            <div className="absolute right-0 mt-1.5 w-36 rounded-lg border border-zinc-800 bg-zinc-900/95 py-1.5 shadow-2xl backdrop-blur text-xs z-50">
              <button
                onClick={() => handleSortSelect("name")}
                className={`w-full text-left px-3 py-1.5 hover:bg-zinc-800/80 transition-colors ${
                  sortKey === "name" ? "text-white font-semibold" : "text-zinc-300"
                }`}
              >
                Name
              </button>
              <button
                onClick={() => handleSortSelect("department")}
                className={`w-full text-left px-3 py-1.5 hover:bg-zinc-800/80 transition-colors ${
                  sortKey === "department" ? "text-white font-semibold" : "text-zinc-300"
                }`}
              >
                Department
              </button>
              <button
                onClick={() => handleSortSelect("salary")}
                className={`w-full text-left px-3 py-1.5 hover:bg-zinc-800/80 transition-colors ${
                  sortKey === "salary" ? "text-white font-semibold" : "text-zinc-300"
                }`}
              >
                Salary
              </button>
              <button
                onClick={() => handleSortSelect("hireDate")}
                className={`w-full text-left px-3 py-1.5 hover:bg-zinc-800/80 transition-colors ${
                  sortKey === "hireDate" ? "text-white font-semibold" : "text-zinc-300"
                }`}
              >
                Hire Date
              </button>
            </div>
          )}
        </div>

        {/* Export Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsExportOpen(!isExportOpen);
              setIsSortOpen(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 text-xs font-medium text-zinc-200 hover:bg-zinc-800/80 hover:text-white transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-zinc-400" />
            <span>Export</span>
            <ChevronDown className="h-3.5 w-3.5 text-zinc-400 ml-0.5" />
          </button>

          {isExportOpen && (
            <div className="absolute right-0 mt-1.5 w-28 rounded-lg border border-zinc-800 bg-zinc-900/95 py-1.5 shadow-2xl backdrop-blur text-xs z-50">
              <button
                onClick={() => handleExport("csv")}
                className="w-full text-left px-3 py-1.5 text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-colors"
              >
                CSV
              </button>
              <button
                onClick={() => handleExport("json")}
                className="w-full text-left px-3 py-1.5 text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-colors"
              >
                JSON
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Table Area */}
      <div className="w-full overflow-x-auto rounded-xl border border-zinc-900">
        <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[850px]">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-zinc-800/80 bg-zinc-950 text-zinc-400 text-xs font-medium">
              <th className="py-3 px-4 w-10">
                <Checkbox
                  checked={selectedIds.size === employees.length && employees.length > 0}
                  onCheckedChange={toggleSelectAll}
                  className="border-zinc-700 data-[state=checked]:bg-zinc-100 data-[state=checked]:text-zinc-900"
                />
              </th>
              <th className="py-3 px-4 text-zinc-400 font-medium">Employee</th>
              <th className="py-3 px-4 text-zinc-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-zinc-500" />
                  <span>Email</span>
                </div>
              </th>
              <th className="py-3 px-4 text-zinc-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-zinc-500" />
                  <span>Department</span>
                </div>
              </th>
              <th className="py-3 px-4 text-zinc-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-500" />
                  <span>Position</span>
                </div>
              </th>
              <th className="py-3 px-4 text-zinc-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-zinc-500" />
                  <span>Salary</span>
                </div>
              </th>
              <th className="py-3 px-4 text-zinc-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                  <span>Hire Date</span>
                </div>
              </th>
              <th className="py-3 px-4 text-zinc-400 font-medium text-right pr-6">
                <div className="flex items-center justify-end gap-1.5">
                  <Activity className="h-3.5 w-3.5 text-zinc-500" />
                  <span>Status</span>
                </div>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-zinc-900/80">
            {sortedEmployees.map((emp) => {
              const isSelected = selectedIds.has(emp.id);

              return (
                <tr
                  key={emp.id}
                  className={`transition-colors duration-150 ${
                    isSelected ? "bg-zinc-900/60" : "hover:bg-zinc-900/30"
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(emp.id)}
                      className="border-zinc-700 data-[state=checked]:bg-zinc-100 data-[state=checked]:text-zinc-900"
                    />
                  </td>
                  <td className="py-3.5 px-4 font-medium text-zinc-100 whitespace-nowrap">
                    {emp.name}
                  </td>
                  <td className="py-3.5 px-4 text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap">
                    <a href={`mailto:${emp.email}`}>{emp.email}</a>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-300 whitespace-nowrap">
                    {emp.department}
                  </td>
                  <td className="py-3.5 px-4 text-zinc-300 whitespace-nowrap">
                    {emp.position}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-zinc-100 whitespace-nowrap">
                    ${emp.salary.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400 whitespace-nowrap">
                    {emp.hireDate}
                  </td>
                  <td className="py-3.5 px-4 text-right pr-6 whitespace-nowrap">
                    <div className="flex items-center justify-end">
                      {emp.status === "Active" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Active
                        </span>
                      )}
                      {emp.status === "On leave" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-950/40 text-amber-400 border border-amber-800/40">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                          On leave
                        </span>
                      )}
                      {emp.status === "Inactive" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-950/40 text-rose-400 border border-rose-800/40">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                          Inactive
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
