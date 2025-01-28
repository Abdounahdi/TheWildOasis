import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ohjawgkwuomwckdojjgb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oamF3Z2t3dW9td2NrZG9qamdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5OTQ3MjIsImV4cCI6MjA1MzU3MDcyMn0.J0rr967JCN6nDyVzblY2CwKA6-XcU7Sma2mrbO5giNw";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
