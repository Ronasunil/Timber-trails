// import { getToday } from "../utils/helpers";
import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getAllBookings(filterValue, sortValue, currentPage) {
  let query = supabase
    .from("bookings")
    .select("*, guests(*), cabins(*)", { count: "exact" });

  // FILTER
  // if filter value is all or undefined take everything else according to value
  if (filterValue !== "all" && filterValue !== undefined) {
    query = query.eq("status", filterValue);
  }

  // SORT
  if (sortValue) {
    const [field, sortOrder] = sortValue.split("-");

    query = query.order(field, { ascending: sortOrder === "asc" });
  }

  // PAGINATION
  if (currentPage) {
    const from = (currentPage - 1) * PAGE_SIZE;
    const to = currentPage * 10 - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error(`Can't load bookings`);
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export async function getBookingsAfterDate(date) {
  // getting current date as iso string
  const currentDate = new Date(Date.now()).toISOString();

  // getting previous date
  const previousDate = new Date();
  previousDate.setDate(previousDate.getDate(previousDate) - +date);

  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extraPrice")
    .gte("created_at", new Date(previousDate).toISOString())
    .lte("created_at", currentDate);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getStaysAfterDate(date) {
  // getting current date
  const currentDate = new Date().toISOString();

  // calculating previous date
  const prevDate = new Date();
  prevDate.setDate(prevDate.getDate() - +date);

  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(name)")
    .gte("startDate", prevDate.toISOString())
    .lte("startDate", currentDate);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(name, nationality, countryFlag, email)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) console.error(error.message);

  return data;
}
