"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import type { SavedSessionPayload } from "@/types";
import { getSupabaseAdmin } from "@/services/supabase";

export async function saveWorkSession(payload: SavedSessionPayload) {
  const { userId } = await auth();

  if (!userId) {
    return { ok: false, message: "Please sign in before saving a session." };
  }

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return {
      ok: false,
      message: "Supabase is not configured yet. Your progress is still saved locally.",
    };
  }

  const clerkUser = await currentUser();
  const primaryEmail =
    clerkUser?.emailAddresses.find(
      (email) => email.id === clerkUser.primaryEmailAddressId,
    )?.emailAddress ?? clerkUser?.emailAddresses[0]?.emailAddress;

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .upsert(
      {
        clerk_user_id: userId,
        email: primaryEmail,
        name: clerkUser?.fullName ?? clerkUser?.username ?? "LinkFlow user",
        avatar_url: clerkUser?.imageUrl,
      },
      { onConflict: "clerk_user_id" },
    )
    .select("id")
    .single();

  if (profileError || !profile) {
    return { ok: false, message: profileError?.message ?? "Could not sync user." };
  }

  const { data: workSession, error: sessionError } = await supabase
    .from("work_sessions")
    .insert({
      user_id: profile.id,
      date: payload.date,
      total_tickets: payload.totalTickets,
      goal_completed: payload.totalTickets >= payload.dailyGoal,
      total_hours: payload.totalHours,
      average_per_hour: payload.averagePerHour,
    })
    .select("id")
    .single();

  if (sessionError || !workSession) {
    return {
      ok: false,
      message: sessionError?.message ?? "Could not save this session.",
    };
  }

  const hourlyRows = payload.hourlyStats.map((stat) => ({
    session_id: workSession.id,
    hour: stat.hour,
    tickets: stat.tickets,
  }));

  if (hourlyRows.length > 0) {
    const { error } = await supabase.from("hourly_stats").insert(hourlyRows);
    if (error) return { ok: false, message: error.message };
  }

  if (payload.totalTickets >= payload.dailyGoal) {
    await supabase.from("achievements").insert({
      user_id: profile.id,
      title: "Goal completed",
      description: `Completed ${payload.totalTickets} tickets in one session.`,
    });
  }

  return { ok: true, message: "Session saved. Fresh counter started." };
}
