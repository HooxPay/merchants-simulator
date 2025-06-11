import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === "production";

export const initMixpanel = () => {
    if (!MIXPANEL_TOKEN || !isProduction || mixpanel.__initialized) return;

    mixpanel.init(MIXPANEL_TOKEN);
    mixpanel.__initialized = true;
};

export const identifyUser = (id) => {
    if (!isProduction || !id) return;
    mixpanel.identify(id);
};

export const setUserProperties = (props = {}) => {
    if (!isProduction) return;
    mixpanel.people.set(props);
};

export const trackCustomEvent = (eventName, props = {}) => {
    if (!isProduction || !eventName) return;
    mixpanel.track(eventName, props);
};
