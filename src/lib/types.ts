export type App = {
  name: string;
  link: string;
  image?: string;
  gradient: string;
};

export type SpaceApp = {
  id: string;
  index_number: number;
  item_id: string;
  item_type: "instance" | "system_app";
  data?: {
    url: string;
    release: {
      app_name: string;
      icon_url: string;
      placeholder_icon_config: {
        css_background: string;
      };
    };
  };
};
