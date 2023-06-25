import { useEffect, useState } from "react";
import Pusher from "pusher-js";

interface PusherHook {
  channel: string | undefined;
  event: "START_STORAGE" | "FINISH_STORAGE";
}

const pusher = new Pusher("68a92baa7c1b8cdaed4f", {
  cluster: "us2",
});

const usePusher = ({ channel, event }: PusherHook) => {
  const [isSuccess, setIsSuccess] = useState<boolean | undefined>();
  const [start, setStart] = useState<boolean>(false);
  const subscribe = () => {
    setStart(true);
  };
  useEffect(() => {
    if (!start) return;
    console.log("subscribe to", channel, event);
    const channelHandler = pusher.subscribe(channel as string);
    channelHandler.bind(event, (data: { message: boolean }) => {
      console.log("data from", channel, event, ":", data);
      if (data.message) {
        setIsSuccess(true);
        return () => {
          console.log("unsubscribe from", channel, event);
          pusher.unsubscribe(channel as string);
        };
      }
      if (!data.message) {
        setIsSuccess(false);
      }
    });
    return () => {
      console.log("unsubscribe from", channel, event);
      pusher.unsubscribe(channel as string);
    };
  }, [channel, start]);

  return { isSuccess, subscribe };
};
export default usePusher;
