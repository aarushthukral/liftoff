import { writable } from "svelte/store";
import { get, set } from "tauri-settings";
import { listen } from "@tauri-apps/api/event";

type Schema = { accessToken: string };

export const accessToken = writable(await get<Schema>("accessToken"));

accessToken.subscribe(async (newToken) => await set<Schema>("accessToken", newToken));

listen("resetAccessToken", () => accessToken.set(""));

listen("refresh", () => window.location.reload());
