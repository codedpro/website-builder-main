"use client";

import { Input } from "@/components/ui/forms";
import React, { useState, useEffect } from "react";

// Example type for Service
export interface Service {
  service_id: string;
  service_name: string;
  description: string;
  base_price: number;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [serviceName, setServiceName] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [basePrice, setBasePrice] = useState<number>(0);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/admin/services");
      if (!response.ok) {
        throw new Error("Failed to fetch services");
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

  useEffect(() => {
    fetchServices();
  }, []);

  // Submit (Create/Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName) return;

    const serviceData = {
      service_name: serviceName,
      description: serviceDesc,
      base_price: basePrice,
    };

    try {
      let url = "/api/admin/services";
      let method = "POST";

      if (editingServiceId) {
        url = `/api/admin/services/${editingServiceId}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        throw new Error("Failed to create/update service");
      }

      // Refetch & clear form
      await fetchServices();
      setServiceName("");
      setServiceDesc("");
      setBasePrice(0);
      setEditingServiceId(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  // Edit button
  const handleEdit = (service: Service) => {
    setEditingServiceId(service.service_id);
    setServiceName(service.service_name);
    setServiceDesc(service.description);
    setBasePrice(service.base_price);
  };

  // Delete button
  const handleDelete = async (serviceId: string) => {
    if (!confirm("آیا از حذف این سرویس مطمئن هستید؟")) return;

    try {
      const response = await fetch(`/api/admin/services/${serviceId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete service");
      }

      await fetchServices();
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
        transition-all
      "
    >
      <h2 className="text-3xl font-bold mb-6 text-primary-brand dark:text-primary-lightuser">
        مدیریت خدمات
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Services Table */}
      <div className="overflow-x-auto mb-8">
        <table
          className="
            w-full border-2 border-tertiary-darkuser
            dark:border-tertiary-lightuser
            transition-all
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
                شناسه سرویس
              </th>
              <th className="p-3 border border-tertiary-darkuser dark:border-tertiary-lightuser">
                نام سرویس
              </th>
              <th className="p-3 border border-tertiary-darkuser dark:border-tertiary-lightuser">
                توضیحات
              </th>
              <th className="p-3 border border-tertiary-darkuser dark:border-tertiary-lightuser">
                قیمت پایه
              </th>
              <th className="p-3 border border-tertiary-darkuser dark:border-tertiary-lightuser">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {services.map((srv, idx) => (
              <tr
                key={srv.service_id}
                className={`
                  ${
                    idx % 2 === 0
                      ? "bg-secondary-lightuser dark:bg-secondary-darkuser"
                      : "bg-tertiary-lightuser dark:bg-tertiary-darkuser"
                  }
                  transition-colors
                `}
              >
                <td
                  className="
                    p-2 border border-tertiary-darkuser dark:border-tertiary-lightuser
                  "
                >
                  {srv.service_id}
                </td>
                <td
                  className="
                    p-2 border border-tertiary-darkuser dark:border-tertiary-lightuser
                  "
                >
                  {srv.service_name}
                </td>
                <td
                  className="
                    p-2 border border-tertiary-darkuser dark:border-tertiary-lightuser
                  "
                >
                  {srv.description}
                </td>
                <td
                  className="
                    p-2 border border-tertiary-darkuser dark:border-tertiary-lightuser
                  "
                >
                  {srv.base_price}
                </td>
                <td
                  className="
                    p-2 border border-tertiary-darkuser dark:border-tertiary-lightuser
                    flex gap-2
                  "
                >
                  <button
                    onClick={() => handleEdit(srv)}
                    className="
                      px-3 py-1 rounded
                      bg-primary-brand text-primary-light
                      hover:bg-secondary-brand
                      dark:text-primary-lightuser
                      transition-colors
                    "
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDelete(srv.service_id)}
                    className="
                      px-3 py-1 rounded
                      bg-red-600 text-white
                      hover:bg-red-700
                      transition-colors
                    "
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
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
          {editingServiceId ? "ویرایش سرویس" : "افزودن سرویس جدید"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">نام سرویس:</label>
            <Input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">توضیحات:</label>
            <Input
              type="text"
              value={serviceDesc}
              onChange={(e) => setServiceDesc(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">قیمت پایه:</label>
            <Input
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(Number(e.target.value))}
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
            {editingServiceId ? "به‌روزرسانی سرویس" : "ایجاد سرویس"}
          </button>
        </form>
      </div>
    </div>
  );
}
