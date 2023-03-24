import { get } from "svelte/store";
import { accessToken } from "./settings";
import type { App, SpaceApp } from "./types";
import CryptoJS from "crypto-js";

const spaceRoot = "https://deta.space/api/v0";

// This is a re-implementation of https://github.com/pomdtr/deta-space-client as
// the crypto NodeJS library can't be used in the browser
export async function makeRequest<T>(
  method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH",
  endpoint: string,
  body?: string
): Promise<T> {
  const timestamp = Date.now().toString().slice(0, 10);
  const contentType = "application/json";

  const toSign = `${method}\n${"/api/v0" + endpoint}\n${timestamp}\n${contentType}\n${
    body || ""
  }\n`;

  const token = get(accessToken);

  if (!token.includes("_")) {
    throw new Error("Invalid access token");
  }

  const [keyId, keySecret] = token.split("_");

  const signature = CryptoJS.HmacSHA256(toSign, keySecret).toString(CryptoJS.enc.Hex);

  const res = await fetch(`${spaceRoot}${endpoint}`, {
    method,
    headers: {
      "Content-Type": contentType,
      "X-Deta-Timestamp": timestamp,
      "X-Deta-Signature": `v0=${keyId}:${signature}`,
    },
    body,
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

const getApp = (app: SpaceApp): App => {
  if (app.item_type === "system_app") {
    return systemApps.find((a) => a.name.toLowerCase().replace(/ /g, "_") === app.item_id);
  }

  return {
    name: app.data.release.app_name,
    link: app.data.url,
    image: app.data.release.icon_url,
    gradient: app.data.release.placeholder_icon_config.css_background,
  };
};

export const getSpaceApps = async () =>
  (
    await makeRequest<{ items: SpaceApp[] }>("GET", "/canvas?limit=999").then((res) => res.items)
  ).map((app) => getApp(app));

export const systemApps = [
  {
    name: "Manual",
    link: "https://deta.space/manual",
    image: "https://deta.space/assets/manual.a2e80d80.webp",
    gradient: "",
  },
  {
    name: "Docs",
    link: "https://deta.space/docs",
    image: "https://deta.space/assets/docs.36387e5a.webp",
    gradient: "",
  },
  {
    name: "Discovery",
    link: "https://deta.space/discovery",
    image: "https://deta.space/assets/discovery.b6035544.webp",
    gradient: "",
  },
  {
    name: "Collections",
    link: "https://deta.space/collections",
    image: "https://deta.space/assets/collections.9c538cc2.png",
    gradient: "",
  },
  {
    name: "Builder",
    link: "https://deta.space/builder",
    image: "https://deta.space/assets/builder.9b3437f3.webp",
    gradient: "",
  },
  {
    name: "Legacy Cloud",
    link: "https://deta.space/legacy",
    image: "https://deta.space/assets/legacy_cloud.43f2c117.webp",
    gradient: "",
  },
];
