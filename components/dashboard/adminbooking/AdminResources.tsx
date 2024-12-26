"use client";

import { Input, Select } from "@/components/ui/forms";
import React, { useState, useEffect } from "react";

export interface Resource {
  resource_id: string;
  resource_name: string;
  resource_type: string;
  description: string;
  service_id: string;
}

interface Service {
  service_id: string;
  service_name: string;
}

export default function AdminResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [editingResourceId, setEditingResourceId] = useState<string | null>(
    null
  );

  // Fetch resources
  const fetchResources = async () => {
    try {
      const response = await fetch("/api/admin/resources");
      if (!response.ok) {
        throw new Error("خطا در دریافت منابع");
      }
      const data = await response.json();
      setResources(data.results || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  // Fetch services
  const fetchServices = async () => {
    try {
      const response = await fetch("/api/admin/services");
      if (!response.ok) {
        throw new Error("خطا در دریافت سرویس‌ها");
      }
      const data = await response.json();
      setServices(data.results || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  // Initial load
  useEffect(() => {
    fetchResources();
    fetchServices();
  }, []);

  // Create/Update resource
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !selectedServiceId) {
      alert("لطفاً نام منبع و سرویس آن را وارد کنید.");
      return;
    }

    const resourceData = {
      resource_name: name,
      resource_type: type,
      description: desc,
      service_id: selectedServiceId,
    };

    try {
      let url = "/api/admin/resources";
      let method = "POST";

      if (editingResourceId) {
        url = `/api/admin/resources/${editingResourceId}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resourceData),
      });
      if (!response.ok) {
        throw new Error("خطا در ایجاد/به‌روزرسانی منبع");
      }

      await fetchResources();
      // Reset form
      setName("");
      setType("");
      setDesc("");
      setSelectedServiceId("");
      setEditingResourceId(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  // Edit resource
  const handleEdit = (res: Resource) => {
    setEditingResourceId(res.resource_id);
    setName(res.resource_name);
    setType(res.resource_type);
    setDesc(res.description);
    setSelectedServiceId(res.service_id);
  };

  // Delete resource
  const handleDelete = async (resourceId: string) => {
    if (!confirm("آیا از حذف این منبع مطمئن هستید؟")) return;

    try {
      const response = await fetch(`/api/admin/resources/${resourceId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("خطا در حذف منبع");
      }
      await fetchResources();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div
      className="
        p-6 mb-8 rounded-xl 
        bg-gradient-to-br from-primary-lightuser to-secondary-lightuser
        dark:from-secondary-darkuser dark:to-tertiary-darkuser
        text-primary-dark dark:text-primary-light
        space-y-6
        transition-all
      "
    >
      <h2 className="text-3xl font-bold mb-4 text-primary-brand dark:text-primary-lightuser">
        مدیریت منابع
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Table of Resources */}
      <div className="overflow-x-auto">
        <table
          className="
            w-full border-2 border-tertiary-darkuser dark:border-tertiary-lightuser
            transition-colors
          "
        >
          <thead
            className="
              bg-primary-lightuser dark:bg-secondary-darkuser
              text-primary-dark dark:text-primary-light
            "
          >
            <tr>
              <th className="p-3 border border-tertiary-darkuser dark:border-tertiary-lightuser">
                شناسه
              </th>
              <th className="p-3 border border-tertiary-darkuser dark:border-tertiary-lightuser">
                نام منبع
              </th>
              <th className="p-3 border border-tertiary-darkuser dark:border-tertiary-lightuser">
                نام سرویس
              </th>
              <th className="p-3 border border-tertiary-darkuser dark:border-tertiary-lightuser">
                نوع منبع
              </th>
              <th className="p-3 border border-tertiary-darkuser dark:border-tertiary-lightuser">
                توضیحات
              </th>
              <th className="p-3 border border-tertiary-darkuser dark:border-tertiary-lightuser">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {resources.map((res, idx) => {
              const foundService = services.find(
                (srv) => srv.service_id === res.service_id
              );
              return (
                <tr
                  key={res.resource_id}
                  className={
                    idx % 2 === 0
                      ? "bg-secondary-lightuser dark:bg-secondary-darkuser"
                      : "bg-tertiary-lightuser dark:bg-tertiary-darkuser"
                  }
                >
                  <td
                    className="
                      p-2 border border-tertiary-darkuser 
                      dark:border-tertiary-lightuser
                    "
                  >
                    {res.resource_id}
                  </td>
                  <td
                    className="
                      p-2 border border-tertiary-darkuser 
                      dark:border-tertiary-lightuser
                    "
                  >
                    {res.resource_name}
                  </td>
                  <td
                    className="
                      p-2 border border-tertiary-darkuser 
                      dark:border-tertiary-lightuser
                    "
                  >
                    {foundService ? foundService.service_name : "—"}
                  </td>
                  <td
                    className="
                      p-2 border border-tertiary-darkuser 
                      dark:border-tertiary-lightuser
                    "
                  >
                    {res.resource_type}
                  </td>
                  <td
                    className="
                      p-2 border border-tertiary-darkuser 
                      dark:border-tertiary-lightuser
                    "
                  >
                    {res.description}
                  </td>
                  <td
                    className="
                      p-2 border border-tertiary-darkuser 
                      dark:border-tertiary-lightuser
                      flex gap-2
                    "
                  >
                    <button
                      className="
                        px-3 py-1 rounded 
                        bg-primary-brand text-primary-light
                        hover:bg-secondary-brand
                        dark:text-primary-lightuser
                        transition-colors
                      "
                      onClick={() => handleEdit(res)}
                    >
                      ویرایش
                    </button>
                    <button
                      className="
                        px-3 py-1 rounded
                        bg-red-600 text-white
                        hover:bg-red-700
                        transition-colors
                      "
                      onClick={() => handleDelete(res.resource_id)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Form */}
      <div
        className="
          bg-primary-lightuser dark:bg-secondary-darkuser
          p-4 rounded-xl  max-w-md mx-auto
          transition-colors
        "
      >
        <h3 className="text-2xl font-semibold mb-4 text-primary-dark dark:text-primary-lightuser">
          {editingResourceId ? "ویرایش منبع" : "افزودن منبع جدید"}
        </h3>

        {services.length === 0 ? (
          <p className="text-primary-dark dark:text-primary-light">
            در حال بارگیری لیست سرویس‌ها...
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block mb-1 font-medium">نام منبع:</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثلاً: صندلی VIP"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">سرویس مرتبط:</label>
              <Select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
              >
                {selectedServiceId === "" && (
                  <option value="">-- انتخاب سرویس --</option>
                )}
                {services.map((srv) => (
                  <option key={srv.service_id} value={srv.service_id}>
                    {srv.service_name}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block mb-1 font-medium">نوع منبع:</label>
              <Input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="صندلی، اتاق، کارمند..."
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">توضیحات:</label>
              <Input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="توضیحات اختیاری"
              />
            </div>

            <button
              type="submit"
              className="
                px-4 py-2 rounded
                bg-primary-brand text-primary-light
                hover:bg-secondary-brand
                dark:text-primary-lightuser
                transition-colors
              "
            >
              {editingResourceId ? "به‌روزرسانی منبع" : "ایجاد منبع"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
