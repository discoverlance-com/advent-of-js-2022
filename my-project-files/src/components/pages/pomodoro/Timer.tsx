import Seconds from "./Seconds";
import Minutes from "./Minutes";
import Settings from "./Settings";
import { useCallback, useEffect, useReducer } from "react";
import {
  addMinutes,
  addSeconds,
  getMinutes,
  getSeconds,
  padString,
} from "~/app/lib/utils";

type ACTIONTYPE =
  | {
      type: "start";
      payload: {
        startDate: Date;
        startTimer: boolean;
        minutes: number;
        seconds: number;
        actionButtonText: ActionButtonText;
      };
    }
  | {
      type: "pause";
      payload: {
        startTimer: boolean;
        minutes: number;
        seconds: number;
        actionButtonText: ActionButtonText;
      };
    }
  | {
      type: "update";
      payload: {
        startTimer: boolean;
        minutes: number;
        seconds: number;
        actionButtonText: ActionButtonText;
      };
    }
  | {
      type: "updateTime";
      payload: {
        startTimer: boolean;
        minutes: number;
        seconds: number;
        actionButtonText: ActionButtonText;
      };
    }
  | {
      type: "reset";
      payload: {
        startTimer: boolean;
        minutes: number;
        seconds: number;
        actionButtonText: ActionButtonText;
      };
    };

type ActionButtonText = "start" | "pause" | "resume";

const initialState = {
  actionButtonText: "start",
  startDate: new Date(),
  minutes: "15",
  seconds: "00",
  startTimer: false,
};

function timerReducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "start":
      return {
        actionButtonText: "pause",
        startDate: action.payload.startDate,
        startTimer: action.payload.startTimer,
        minutes: padString(action.payload.minutes),
        seconds: padString(action.payload.seconds),
      };
    case "pause":
      return {
        actionButtonText: action.payload.actionButtonText,
        startTimer: action.payload.startTimer,
        startDate: state.startDate,
        minutes: padString(action.payload.minutes),
        seconds: padString(action.payload.seconds),
      };
    case "update":
      return {
        actionButtonText: action.payload.actionButtonText,
        startDate: state.startDate,
        startTimer: action.payload.startTimer,
        minutes: padString(action.payload.minutes),
        seconds: padString(action.payload.seconds),
      };
    case "updateTime":
      return {
        actionButtonText: action.payload.actionButtonText,
        startDate: state.startDate,
        startTimer: action.payload.startTimer,
        minutes: padString(action.payload.minutes),
        seconds: padString(action.payload.seconds),
      };
    case "reset":
      return {
        actionButtonText: action.payload.actionButtonText,
        startDate: state.startDate,
        startTimer: action.payload.startTimer,
        minutes: padString(action.payload.minutes),
        seconds: padString(action.payload.seconds),
      };
    default:
      throw new Error();
  }
}

export default function Timer(props: {
  ringElementRef: React.RefObject<HTMLDivElement>;
}) {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  const handleTimerStart = useCallback(() => {
    const date = new Date();
    const seconds = addSeconds(date, Number(state.seconds));
    const minutes = addMinutes(date, Number(state.minutes));
    dispatch({
      type: "start",
      payload: {
        startTimer: true,
        startDate: new Date(
          `${date.toDateString()} ${date.getHours()}:${minutes}:${seconds}:00`
        ),
        minutes: Number(state.minutes),
        seconds: Number(state.seconds),
        actionButtonText: "pause",
      },
    });
  }, [state]);

  const handleTimerPause = useCallback(() => {
    dispatch({
      type: "pause",
      payload: {
        startTimer: false,
        minutes: Number(state.minutes),
        seconds: Number(state.seconds),
        actionButtonText: "resume",
      },
    });
  }, [state]);

  const handleTimerReset = useCallback(() => {
    dispatch({
      type: "reset",
      payload: {
        startTimer: false,
        minutes: 15,
        seconds: 0,
        actionButtonText: "start",
      },
    });
  }, [state]);

  useEffect(() => {
    let timer: number = 0;
    if (Number(state.minutes) <= 1) {
      props.ringElementRef?.current?.classList.add("ending");
    } else {
      props.ringElementRef?.current?.classList.remove("ending");
    }

    if (state.startTimer) {
      // if timer is 0, reset
      if (
        isNaN(Number(state.minutes)) ||
        isNaN(Number(state.seconds)) ||
        (Number(state.minutes) <= 0 && Number(state.seconds) <= 0)
      ) {
        dispatch({
          type: "reset",
          payload: {
            startTimer: false,
            minutes: 15,
            seconds: 0,
            actionButtonText: "start",
          },
        });
        clearTimeout(timer);
        return;
      }

      // continue timer
      timer = setInterval(() => {
        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = state.startDate.getTime() - now;

        dispatch({
          type: "update",
          payload: {
            startTimer: true,
            minutes: getMinutes(distance),
            seconds: getSeconds(distance),
            actionButtonText: "pause",
          },
        });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [state]);
  return (
    <div className="timer">
      <div className="time">
        <Minutes value={state.minutes} />
        <div className="colon">:</div>
        <Seconds value={state.seconds} />
      </div>
      <button
        className="start"
        onClick={
          state.actionButtonText === "start" ||
          state.actionButtonText === "resume"
            ? handleTimerStart
            : handleTimerPause
        }
      >
        {state.actionButtonText}
      </button>
      <Settings
        handleReset={handleTimerReset}
        minutes={Number(state.minutes)}
        seconds={Number(state.seconds)}
      />
    </div>
  );
}
