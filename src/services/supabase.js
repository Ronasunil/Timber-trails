import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = "https://qozrqyobcxjewzwxrsvy.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvenJxeW9iY3hqZXd6d3hyc3Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxNTYzMTcsImV4cCI6MjAyOTczMjMxN30.wlbSKiRyeES6q3ACdB6Y_yZ0TzxD_gobreC4KHWZyC0";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
