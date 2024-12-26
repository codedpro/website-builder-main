"use client";
import { RRule } from "rrule";
import { useState, useMemo, useEffect } from "react";
import { Booking } from "@/types/Booking";
import moment from "moment-jalaali";
import {
  fromDate,
  getLocalTimeZone,
  toCalendar,
  createCalendar,
  DateValue,
} from "@internationalized/date";
import ServiceSelection from "./ServiceSelection";
import ResourceSelection from "./ResourceSelection";
import DateSelection from "./DateSelection";
import TimeBlockSelection from "./TimeBlockSelection";
import TimeSlotSelection from "./TimeSlotSelection";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

moment.loadPersian({ usePersianDigits: false });

interface BookingSelectionProps {
  bookings: {
    available_bookings: Booking[];
  }[];
  isRtl: boolean;
}

export default function BookingSelection({
  bookings,
  isRtl,
}: BookingSelectionProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);
  const [selectedTimeBlockId, setSelectedTimeBlockId] = useState<string | null>(
    null
  );
  const [selectedStartTime, setSelectedStartTime] = useState<string | null>(
    null
  );

  const timeZone = getLocalTimeZone();

  const allServices = useMemo(
    () => bookings?.flatMap((item) => item.available_bookings) || [],
    [bookings]
  );

  const services = useMemo(
    () => allServices[0]?.available_bookings || [],
    [allServices]
  );

  const chosenService = useMemo(
    () => services.find((service) => service.service_id === selectedService),
    [services, selectedService]
  );

  const resources = useMemo(
    () => chosenService?.resources || [],
    [chosenService]
  );

  const chosenResource = useMemo(
    () => resources.find((r) => r.resource_id === selectedResource),
    [resources, selectedResource]
  );

  const timeBlocks = useMemo(
    () => chosenResource?.time_blocks || [],
    [chosenResource]
  );

  const schedules = useMemo(
    () => chosenResource?.schedules || [],
    [chosenResource]
  );

  const flattenedSchedules = useMemo(() => {
    const DAYS_LIMIT = 60;
    const endOfRange = moment().add(DAYS_LIMIT, "days").toDate();
    const results: { date: string; start_time: string; end_time: string }[] =
      [];

    schedules.forEach((sch) => {
      if (!sch.is_recurring || !sch.recurrence_pattern) {
        const dateObj = moment(sch.specific_date, "YYYY-MM-DD").toDate();
        if (dateObj >= new Date() && dateObj <= endOfRange) {
          results.push({
            date: moment(dateObj).format("YYYY-MM-DD"),
            start_time: sch.start_time,
            end_time: sch.end_time,
          });
        }
      } else {
        try {
          //    const startDate = moment(sch.specific_date, "YYYY-MM-DD").toDate();
          const rule = RRule.fromString(sch.recurrence_pattern);
          const occurrences = rule.between(new Date(), endOfRange, true);

          occurrences.forEach((occ) => {
            results.push({
              date: moment(occ).format("YYYY-MM-DD"),
              start_time: sch.start_time,
              end_time: sch.end_time,
            });
          });
        } catch (err) {
          console.error(
            "Error parsing recurrence pattern:",
            sch.recurrence_pattern,
            err
          );
        }
      }
    });

    return results;
  }, [schedules]);

  const allowedDates = useMemo(() => {
    const uniqueDates = Array.from(
      new Set(flattenedSchedules.map((item) => item.date))
    );
    const persianCalendar = createCalendar("persian");

    return uniqueDates.map((d) => {
      const dateObj = moment(d, "YYYY-MM-DD").toDate();
      const gregorianDateValue = fromDate(dateObj, timeZone);
      return toCalendar(gregorianDateValue, persianCalendar);
    });
  }, [flattenedSchedules, timeZone]);

  const { data: session } = useSession();
  const isAuthorizeUser = !!session;

  const selectedDateSchedule = useMemo(() => {
    if (!selectedDate) return null;
    const gregorianDateStr = moment(
      selectedDate.toString(),
      "YYYY-MM-DD"
    ).format("YYYY-MM-DD");
    return (
      flattenedSchedules.find((item) => item.date === gregorianDateStr) || null
    );
  }, [selectedDate, flattenedSchedules]);

  const selectedTimeBlock = useMemo(() => {
    return timeBlocks.find(
      (block) => block.time_block_id === selectedTimeBlockId
    );
  }, [timeBlocks, selectedTimeBlockId]);

  const availableStartTimes = useMemo(() => {
    if (!selectedDateSchedule || !selectedTimeBlock) return [];

    const start = moment(selectedDateSchedule.start_time, "HH:mm");
    const end = moment(selectedDateSchedule.end_time, "HH:mm");
    const times = [];
    const increment = selectedTimeBlock.duration;

    for (
      let current = start.clone();
      current.isBefore(end);
      current.add(increment, "minutes")
    ) {
      const slotEnd = current.clone().add(increment, "minutes");
      if (slotEnd.isAfter(end)) break;
      times.push(current.format("HH:mm"));
    }

    return times;
  }, [selectedDateSchedule, selectedTimeBlock]);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!isAuthorizeUser) {
      router.push("/auth");
      return;
    }

    if (
      !selectedService ||
      !selectedResource ||
      !selectedDate ||
      !selectedStartTime ||
      !selectedTimeBlockId
    ) {
      alert("لطفاً همهٔ فیلدهای لازم را پر کنید.");
      return;
    }

    const gregorianDate = moment(selectedDate?.toString(), "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );
    const submissionData = {
      service_id: selectedService,
      resource_id: selectedResource,
      date: gregorianDate,
      start_time: selectedStartTime,
      time_block_id: selectedTimeBlockId,
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Booking successfully submitted:", result);
        alert("رزرو شما با موفقیت ثبت شد.");
        router.push("/confirmation"); // Redirect to a confirmation page or another relevant page
      } else {
        const errorData = await response.json();
        console.error("Error submitting booking:", errorData);
        alert(`خطا در ثبت رزرو: ${errorData.error || "مشکلی پیش آمده است."}`);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("خطای شبکه رخ داده است.");
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Reset dependent fields when service changes
  useEffect(() => {
    // When service changes, clear downstream selections
    setSelectedResource(null);
    setSelectedDate(null);
    setSelectedTimeBlockId(null);
    setSelectedStartTime(null);
  }, [selectedService]);

  // Reset dependent fields when resource changes
  useEffect(() => {
    // When resource changes, clear downstream selections
    setSelectedDate(null);
    setSelectedTimeBlockId(null);
    setSelectedStartTime(null);
  }, [selectedResource]);

  // At step 3, if allowedDates is empty, show message
  const noAllowedDates =
    step === 3 && chosenResource && allowedDates.length === 0;

  // If user has chosen a date but no time blocks or available times are actually valid for that day:
  // This can happen if there's a date chosen but either no schedules match that day or no timeblocks fit.
  // We'll show a message after date selection if there is no valid time block or start times.
  // But we only know this once user selects a date and moves to step 4.
  // So at step 4, if no timeBlocks are available, show message. Or if no availableStartTimes at step 5.
  const noTimeBlocksAvailable =
    step === 4 && selectedDate && timeBlocks.length === 0;
  const noTimeSlotsAvailable =
    step === 5 && selectedTimeBlock && availableStartTimes.length === 0;

  return (
    <div className="p-6 text-primary-darkuser dark:text-primary-light min-h-screen text-right">
      <h1 className="text-3xl font-bold mb-6 text-primary-brand text-center dark:text-secondary-light">
        رزرو نوبت
      </h1>

      {step === 1 && (
        <>
          {services.length > 0 ? (
            <ServiceSelection
              services={services}
              selectedService={selectedService}
              onSelectService={(service) => {
                setSelectedService(service);
                nextStep();
              }}
              isRtl={isRtl}
            />
          ) : (
            <div className="text-center mt-6">
              <p className="mb-4 text-red-500">
                هیچ سرویسی برای رزرو وجود ندارد.
              </p>
              <button
                onClick={prevStep}
                className="bg-primary-brand text-white py-2 px-4 rounded"
              >
                بازگشت
              </button>
            </div>
          )}
        </>
      )}

      {step === 2 && chosenService && (
        <>
          {resources.length > 0 ? (
            <ResourceSelection
              resources={resources}
              selectedResource={selectedResource}
              onSelectResource={(resource) => {
                setSelectedResource(resource);
                nextStep();
              }}
              onBack={prevStep}
              onNext={nextStep}
              isRtl={isRtl}
            />
          ) : (
            <div className="text-center mt-6">
              <p className="mb-4 text-red-500">
                منابعی برای این سرویس در دسترس نیستند.
              </p>
              <button
                onClick={prevStep}
                className="bg-primary-brand text-white py-2 px-4 rounded"
              >
                بازگشت
              </button>
            </div>
          )}
        </>
      )}

      {step === 3 && chosenResource && (
        <>
          {noAllowedDates ? (
            <div className="text-center mt-6">
              <p className="mb-4 text-red-500">تاریخی برای رزرو موجود نیست.</p>
              <button
                onClick={prevStep}
                className="bg-primary-brand text-white py-2 px-4 rounded"
              >
                بازگشت
              </button>
            </div>
          ) : (
            <DateSelection
              value={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                nextStep();
              }}
              allowedDates={allowedDates}
              onBack={prevStep}
              onNext={nextStep}
              isRtl={isRtl}
            />
          )}
        </>
      )}

      {step === 4 && selectedDate && (
        <>
          {noTimeBlocksAvailable ? (
            <div className="text-center mt-6">
              <p className="mb-4 text-red-500">
                هیچ بازه زمانی برای تاریخ انتخاب شده موجود نیست.
              </p>
              <button
                onClick={prevStep}
                className="bg-primary-brand text-white py-2 px-4 rounded"
              >
                بازگشت
              </button>
            </div>
          ) : (
            <TimeBlockSelection
              timeBlocks={timeBlocks}
              selectedTimeBlockId={selectedTimeBlockId}
              onSelectTimeBlock={(blockId) => {
                setSelectedTimeBlockId(blockId);
                nextStep();
              }}
              onBack={prevStep}
              onNext={nextStep}
              isRtl={isRtl}
            />
          )}
        </>
      )}

      {step === 5 && selectedTimeBlock && selectedDateSchedule && (
        <>
          {noTimeSlotsAvailable ? (
            <div className="text-center mt-6">
              <p className="mb-4 text-red-500">
                هیچ زمانی برای این بازه موجود نیست.
              </p>
              <button
                onClick={prevStep}
                className="bg-primary-brand text-white py-2 px-4 rounded"
              >
                بازگشت
              </button>
            </div>
          ) : (
            <TimeSlotSelection
              times={availableStartTimes}
              selectedStartTime={selectedStartTime}
              onSelectStartTime={(time) => setSelectedStartTime(time)}
              onBack={prevStep}
              onNext={handleSubmit}
              isRtl={isRtl}
              isValidUser={isAuthorizeUser}
            />
          )}
        </>
      )}
    </div>
  );
}
