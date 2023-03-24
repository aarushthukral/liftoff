import { writable } from "svelte/store";
import { listen } from "@tauri-apps/api/event";

export const accessToken = writable(localStorage.getItem("accessToken") ?? "");

accessToken.subscribe((newToken) => localStorage.setItem("accessToken", newToken));

listen("resetAccessToken", () => accessToken.set(""));

listen("refresh", () => window.location.reload());
