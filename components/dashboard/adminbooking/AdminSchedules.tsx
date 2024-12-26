"use client";

import React, { useState, useEffect } from "react";
import JalaliDatePicker from "@/components/JalaliDatePicker";
import { DateValue, today } from "@internationalized/date";
import { Input, Label, Select } from "@/components/ui/forms";
import { Checkbox } from "@nextui-org/react";

// نوع منبع (برای لیست Dropdown)
interface Resource {
  resource_id: string;
  resource_name: string;
  resource_type: string;
  description: string;
}

// نوع زمان‌بندی
export interface Schedule {
  schedule_id: string;
  resource_id: string;
  date: string; // اجباری
  start_time: string;
  end_time: string;
  is_recurring: boolean;
  recurrence_pattern: string | null;
}

// متدهای کمکی RRULE (بدون UNTIL)
function parseRRULE(rrule: string) {
  const props = rrule.replace("RRULE:", "").split(";");
  let frequency: "DAILY" | "WEEKLY" | "MONTHLY" = "DAILY";
  let byweekday: number[] = [];
  let count: number | undefined;
  let interval: number | undefined;

  const dayMap: Record<"SU" | "MO" | "TU" | "WE" | "TH" | "FR" | "SA", number> =
    {
      SU: 0,
      MO: 1,
      TU: 2,
      WE: 3,
      TH: 4,
      FR: 5,
      SA: 6,
    };

  props.forEach((part) => {
    const [key, val] = part.split("=");
    switch (key) {
      case "FREQ":
        if (val === "DAILY" || val === "WEEKLY" || val === "MONTHLY") {
          frequency = val;
        }
        break;
      case "BYDAY": {
        const dayStrs = val.split(",");
        byweekday = dayStrs.map(
          (dayStr) => dayMap[dayStr as keyof typeof dayMap]
        );
        break;
      }
      case "COUNT":
        count = Number(val);
        break;
      case "INTERVAL":
        interval = Number(val);
        break;
      default:
        break;
    }
  });

  return { frequency, byweekday, count, interval };
}

function generateRRULE(params: {
  frequency: "DAILY" | "WEEKLY" | "MONTHLY";
  byweekday: number[];
  count?: number;
  interval?: number;
}) {
  const { frequency, byweekday, count, interval } = params;
  let rule = `FREQ=${frequency}`;

  if (frequency === "WEEKLY" && byweekday.length > 0) {
    const dayMap = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
    const bydayStr = byweekday.map((d) => dayMap[d]).join(",");
    rule += `;BYDAY=${bydayStr}`;
  }
  if (count && count > 0) {
    rule += `;COUNT=${count}`;
  }
  if (interval && interval > 1) {
    rule += `;INTERVAL=${interval}`;
  }

  return `RRULE:${rule}`;
}

export default function AdminSchedules() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [error, setError] = useState<string | null>(null);

  // فرم
  const [selectedResourceId, setSelectedResourceId] = useState("");
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);

  // فیلدهای تکرار
  const [frequency, setFrequency] = useState<"DAILY" | "WEEKLY" | "MONTHLY">(
    "WEEKLY"
  );
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([]);
  const [count, setCount] = useState<number | undefined>();
  const [intervalNum, setIntervalNum] = useState<number | undefined>();
  const [customRRULE, setCustomRRULE] = useState("");

  const [editingScheduleId, setEditingScheduleId] = useState<string | null>(
    null
  );

  // 1) دریافت منابع
  const fetchResources = async () => {
    try {
      const resp = await fetch("/api/admin/resources");
      if (!resp.ok) {
        throw new Error("خطا در دریافت لیست منابع");
      }
      const data = await resp.json();
      setResources(data.results || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const fetchSchedules = async () => {
    try {
      const response = await fetch("/api/admin/schedules");
      if (!response.ok) {
        throw new Error("خطا در دریافت لیست زمان‌بندی");
      }
      const data = await response.json();
      setSchedules(data.results || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    fetchResources();
    fetchSchedules();
  }, []);

  // ساخت RRULE نهایی
  const recurrence_pattern = React.useMemo(() => {
    if (!isRecurring) return null;
    if (customRRULE.trim()) return customRRULE;

    return generateRRULE({
      frequency,
      byweekday: frequency === "WEEKLY" ? selectedWeekdays : [],
      count,
      interval: intervalNum,
    });
  }, [
    isRecurring,
    customRRULE,
    frequency,
    selectedWeekdays,
    count,
    intervalNum,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      alert("لطفاً یک تاریخ خاص انتخاب کنید.");
      return;
    }
    if (!selectedResourceId) {
      alert("لطفاً یک منبع را انتخاب کنید.");
      return;
    }

    // تبدیل تاریخ انتخاب‌شده به رشته‌ی YYYY-MM-DD
    const dateStr = `${selectedDate.year}-${String(selectedDate.month).padStart(
      2,
      "0"
    )}-${String(selectedDate.day).padStart(2, "0")}`;

    const scheduleData = {
      resource_id: selectedResourceId,
      date: dateStr,
      start_time: startTime,
      end_time: endTime,
      is_recurring: isRecurring,
      recurrence_pattern,
    };

    try {
      let url = "/api/admin/schedules";
      let method = "POST";
      if (editingScheduleId) {
        url = `/api/admin/schedules/${editingScheduleId}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scheduleData),
      });
      if (!response.ok) {
        throw new Error("خطا در ایجاد/به‌روزرسانی زمان‌بندی");
      }

      await fetchSchedules();
      // پاک‌سازی فرم
      setSelectedResourceId("");
      setSelectedDate(null);
      setStartTime("");
      setEndTime("");
      setIsRecurring(false);
      setFrequency("WEEKLY");
      setSelectedWeekdays([]);
      setCount(undefined);
      setIntervalNum(undefined);
      setCustomRRULE("");
      setEditingScheduleId(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleEdit = (sch: Schedule) => {
    setEditingScheduleId(sch.schedule_id);
    setSelectedResourceId(sch.resource_id);

    if (sch.date) {
      const [yearStr, monthStr, dayStr] = sch.date.split("-");
      setSelectedDate({
        year: +yearStr,
        month: +monthStr,
        day: +dayStr,
        // @ts-expect-error its okay
        calendar: "gregory" as const,
      });
    } else {
      setSelectedDate(null);
    }

    setStartTime(sch.start_time);
    setEndTime(sch.end_time);
    setIsRecurring(sch.is_recurring);

    if (sch.is_recurring && sch.recurrence_pattern) {
      const parsed = parseRRULE(sch.recurrence_pattern);
      setFrequency(parsed.frequency);
      setSelectedWeekdays(parsed.byweekday || []);
      setCount(parsed.count);
      setIntervalNum(parsed.interval);
      setCustomRRULE("");
    } else {
      // ریست به حالت پیش‌فرض
      setFrequency("WEEKLY");
      setSelectedWeekdays([]);
      setCount(undefined);
      setIntervalNum(undefined);
      setCustomRRULE("");
    }
  };

  const handleDelete = async (scheduleId: string) => {
    if (!confirm("آیا از حذف این زمان‌بندی مطمئن هستید؟")) return;
    try {
      const response = await fetch(`/api/admin/schedules/${scheduleId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("خطا در حذف زمان‌بندی");
      }
      await fetchSchedules();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const [allowedDates, setAllowedDates] = useState<DateValue[]>([]);
  useEffect(() => {
    const todayVal = today("Asia/Tehran");
    const arr: DateValue[] = [];
    for (let i = 0; i < 90; i++) {
      arr.push(todayVal.add({ days: i }));
    }
    setAllowedDates(arr);
  }, []);

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
        مدیریت زمان‌بندی منابع
      </h2>
      {error && <p className="text-red-500">{error}</p>}

      {/* لیست زمان‌بندی */}
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
                تاریخ خاص
              </th>
              <th className="p-3 border border-tertiary-darkuser dark:border-tertiary-lightuser">
                زمان شروع
              </th>
              <th className="p-3 border border-tertiary-darkuser dark:border-tertiary-lightuser">
                زمان پایان
              </th>
              <th className="p-3 border border-tertiary-darkuser dark:border-tertiary-lightuser">
                تکرار شونده؟
              </th>
              <th className="p-3 border border-tertiary-darkuser dark:border-tertiary-lightuser">
                الگوی تکرار
              </th>
              <th className="p-3 border border-tertiary-darkuser dark:border-tertiary-lightuser">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((sch, idx) => {
              // پیدا کردن نام منبع
              const foundResource = resources.find(
                (r) => r.resource_id === sch.resource_id
              );
              return (
                <tr
                  key={sch.schedule_id}
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
                    {sch.schedule_id}
                  </td>
                  <td
                    className="
                      p-2 border border-tertiary-darkuser 
                      dark:border-tertiary-lightuser
                    "
                  >
                    {foundResource
                      ? foundResource.resource_name
                      : sch.resource_id}
                  </td>
                  <td
                    className="
                      p-2 border border-tertiary-darkuser 
                      dark:border-tertiary-lightuser
                    "
                  >
                    {new Intl.DateTimeFormat("fa-IR", {
                      calendar: "persian",
                      dateStyle: "short",
                    }).format(new Date(sch.date))}
                  </td>
                  <td
                    className="
                      p-2 border border-tertiary-darkuser 
                      dark:border-tertiary-lightuser
                    "
                  >
                    {sch.start_time}
                  </td>
                  <td
                    className="
                      p-2 border border-tertiary-darkuser 
                      dark:border-tertiary-lightuser
                    "
                  >
                    {sch.end_time}
                  </td>
                  <td
                    className="
                      p-2 border border-tertiary-darkuser 
                      dark:border-tertiary-lightuser
                    "
                  >
                    {sch.is_recurring ? "بله" : "خیر"}
                  </td>
                  <td
                    className="
                      p-2 border border-tertiary-darkuser 
                      dark:border-tertiary-lightuser
                    "
                  >
                    {sch.recurrence_pattern || "—"}
                  </td>
                  <td
                    className="
                      p-2 border-t border-tertiary-darkuser 
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
                      onClick={() => handleEdit(sch)}
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
                      onClick={() => handleDelete(sch.schedule_id)}
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

      {/* فرم زمان‌بندی */}
      <div
        className="
        
          bg-primary-lightuser dark:bg-secondary-darkuser
          p-4 rounded-xl  max-w-md mx-auto
          transition-colors
        "
      >
        <h3 className="text-2xl font-semibold mb-4 text-primary-dark dark:text-primary-lightuser">
          {editingScheduleId ? "ویرایش زمان‌بندی" : "ایجاد زمان‌بندی جدید"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div>
            <Label className="block mb-1 font-medium">نام منبع:</Label>
            <Select
              value={selectedResourceId}
              onChange={(e) => setSelectedResourceId(e.target.value)}
            >
              <option value="">-- انتخاب منبع --</option>
              {resources.map((res) => (
                <option key={res.resource_id} value={res.resource_id}>
                  {res.resource_name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label className="block mb-1 font-semibold">تاریخ</Label>
            <div>
              <JalaliDatePicker
                value={selectedDate}
                onChange={(newDate) => setSelectedDate(newDate)}
                allowedDates={allowedDates}
                ignoreRestrictions={true}
              />
            </div>
          </div>

          <div>
            <Label className="block mb-1">زمان شروع (HH:mm):</Label>
            <Input
              type="text"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="مثلاً 09:00"
            />
          </div>

          <div>
            <Label className="block mb-1">زمان پایان (HH:mm):</Label>
            <Input
              type="text"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              placeholder="مثلاً 12:00"
            />
          </div>

          {/* تکرار شونده */}
          <div className="flex items-center gap-2">
            <Label className="font-medium">تکرار شونده؟</Label>
            <Checkbox
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
            />
          </div>

          {isRecurring && (
            <div
              className="
                space-y-2 p-3 mt-2
                bg-secondary-lightuser dark:bg-secondary-darkuser
                rounded transition-colors
              "
            >
              <Label className="block font-semibold">ساخت الگوی تکرار:</Label>

              <div>
                <Label>نوع تکرار:</Label>
                <Select
                  value={frequency}
                  onChange={(e) =>
                    setFrequency(
                      e.target.value as "DAILY" | "WEEKLY" | "MONTHLY"
                    )
                  }
                >
                  <option value="DAILY">روزانه</option>
                  <option value="WEEKLY">هفتگی</option>
                  <option value="MONTHLY">ماهانه</option>
                </Select>
              </div>

              {/* روزهای هفته */}
              {frequency === "WEEKLY" && (
                <div>
                  <span className="block mb-1 font-medium">
                    روزهای هفته را انتخاب کنید:
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {[
                      "یکشنبه",
                      "دوشنبه",
                      "سه‌شنبه",
                      "چهارشنبه",
                      "پنجشنبه",
                      "جمعه",
                      "شنبه",
                    ].map((dayName, idx) => (
                      <Label key={dayName} className="flex items-center">
                        <Checkbox
                          type="checkbox"
                          checked={selectedWeekdays.includes(idx)}
                          onChange={() => {
                            if (selectedWeekdays.includes(idx)) {
                              setSelectedWeekdays((prev) =>
                                prev.filter((d) => d !== idx)
                              );
                            } else {
                              setSelectedWeekdays((prev) => [...prev, idx]);
                            }
                          }}
                        />
                        <span className="ml-1">{dayName}</span>
                      </Label>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label>تعداد تکرار (اختیاری):</Label>
                <Input
                  type="number"
                  value={count ?? ""}
                  onChange={(e) =>
                    setCount(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              </div>

              <div>
                <Label>فاصله تکرار (INTERVAL):</Label>
                <Input
                  type="number"
                  value={intervalNum ?? ""}
                  onChange={(e) =>
                    setIntervalNum(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  placeholder="مثلاً هر 2 هفته"
                />
              </div>

              <hr className="border-tertiary-darkuser dark:border-tertiary-lightuser" />
              <Label className="block font-semibold mt-2">
                یا رشته‌ی RRULE سفارشی (اولویت دارد):
              </Label>
              <Input
                type="text"
                placeholder="RRULE:FREQ=WEEKLY;BYDAY=SU,MO..."
                value={customRRULE}
                onChange={(e) => setCustomRRULE(e.target.value)}
              />
              <p className="text-xs text-primary-dark dark:text-primary-light mt-1">
                اگر این فیلد را پر کنید، الگوی بالا نادیده گرفته می‌شود.
              </p>
            </div>
          )}

          <button
            type="submit"
            className="
              px-4 py-2 mt-2 rounded
              bg-primary-brand text-primary-light
              hover:bg-secondary-brand
              dark:text-primary-lightuser
              transition-colors
            "
          >
            {editingScheduleId ? "به‌روزرسانی" : "ایجاد زمان‌بندی"}
          </button>
        </form>
      </div>
    </div>
  );
}
