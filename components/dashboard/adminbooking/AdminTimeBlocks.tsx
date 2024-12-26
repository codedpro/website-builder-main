"use client";

import { Input, Select } from "@/components/ui/forms";
import React, { useState, useEffect } from "react";

interface TimeBlock {
  timeblock_id: string;
  duration: number;
  price: number;
  service_id: string;
}

interface Service {
  service_id: string;
  service_name: string;
}

export default function AdminTimeBlocks() {
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [duration, setDuration] = useState<number>(30);
  const [defaultPrice, setDefaultPrice] = useState<number>(100000);
  const [serviceId, setServiceId] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchTimeBlocks = async () => {
    try {
      const response = await fetch("/api/admin/timeblocks");
      if (!response.ok) {
        throw new Error("Failed to fetch time blocks");
      }
      const data = await response.json();
      setTimeBlocks(data.results || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

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
    fetchTimeBlocks();
    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceId) {
      alert("لطفاً یک سرویس را انتخاب کنید.");
      return;
    }

    const blockData = {
      duration,
      price: defaultPrice,
      service_id: serviceId,
    };

    try {
      let url = "/api/admin/timeblocks";
      let method = "POST";

      if (editingId) {
        url = `/api/admin/timeblocks/${editingId}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blockData),
      });
      if (!response.ok) {
        throw new Error("Failed to create/update time block");
      }

      await fetchTimeBlocks();
      // Reset
      setDuration(30);
      setDefaultPrice(100000);
      setServiceId("");
      setEditingId(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleEdit = (tb: TimeBlock) => {
    setEditingId(tb.timeblock_id);
    setDuration(tb.duration);
    setDefaultPrice(tb.price);
    setServiceId(tb.service_id);
  };

  const handleDelete = async (blockId: string) => {
    if (!confirm("از حذف این تایم بلاک مطمئن هستید؟")) return;
    try {
      const response = await fetch(`/api/admin/timeblocks/${blockId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete time block");
      }
      await fetchTimeBlocks();
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
      <h2 className="text-3xl font-bold text-primary-brand dark:text-primary-lightuser">
        مدیریت تایم بلاک‌ها
      </h2>
      {error && <p className="text-red-500">{error}</p>}

      {/* List */}
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
                سرویس
              </th>
              <th className="p-3 border border-tertiary-darkuser dark:border-tertiary-lightuser">
                مدت زمان (دقیقه)
              </th>
              <th className="p-3 border border-tertiary-darkuser dark:border-tertiary-lightuser">
                قیمت پیش‌فرض
              </th>
              <th className="p-3 border border-tertiary-darkuser dark:border-tertiary-lightuser">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {timeBlocks.map((tb, idx) => {
              const foundService = services.find(
                (srv) => srv.service_id === tb.service_id
              );
              return (
                <tr
                  key={tb.timeblock_id}
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
                    {tb.timeblock_id}
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
                    {tb.duration}
                  </td>
                  <td
                    className="
                      p-2 border border-tertiary-darkuser 
                      dark:border-tertiary-lightuser
                    "
                  >
                    {tb.price}
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
                      onClick={() => handleEdit(tb)}
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
                      onClick={() => handleDelete(tb.timeblock_id)}
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
          {editingId ? "ویرایش تایم بلاک" : "ایجاد تایم بلاک جدید"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">سرویس مربوطه:</label>
            <Select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
            >
              <option value="">-- انتخاب سرویس --</option>
              {services.map((srv) => (
                <option key={srv.service_id} value={srv.service_id}>
                  {srv.service_name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block mb-1 font-medium">مدت زمان (دقیقه):</label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">قیمت پیش‌فرض:</label>
            <Input
              type="number"
              value={defaultPrice}
              onChange={(e) => setDefaultPrice(Number(e.target.value))}
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
            {editingId ? "به‌روزرسانی" : "ایجاد تایم بلاک"}
          </button>
        </form>
      </div>
    </div>
  );
}
