import { useEffect } from "react";
import type { KeyboardEvent } from "react";
import classes from "./day-4.module.css";

const selectRandomElement = (jiggleClass: string) => {
  const elements = document.querySelectorAll("button");
  const randomSelectedElement = Math.floor(Math.random() * elements.length);
  // remove jiggle if exists on any element
  const jiggleElement = document.querySelector(`.${jiggleClass}`);
  if (jiggleElement) {
    jiggleElement.classList.remove(jiggleClass);
  }
  elements[randomSelectedElement].classList.add(jiggleClass);
};

export default function ComputerKeyboard() {
  const { jiggle: jiggleClass } = classes;

  function handleKeyDown(event: KeyboardEvent) {
    const { key } = event;
    // get the element that is jiggling
    const jiggleElement = document.querySelector(`.${jiggleClass}`);
    const jiggleElementKey = jiggleElement?.getAttribute("data-key");

    if (key.toUpperCase() === jiggleElementKey) {
      selectRandomElement(jiggleClass);
    }
  }

  useEffect(() => {
    // first select a random key
    selectRandomElement(jiggleClass);

    // listen to keydown
    //@ts-ignore handlekeydown event mismatch
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      //@ts-ignore handlekeydown event mismatch
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.keyboard}>
        <h1 className={classes.header1}>Eyes on the Screen</h1>
        <div className={classes.row}>
          <button className={classes.key} data-key="`">
            `
          </button>
          <button className={classes.key} data-key="1">
            1
          </button>
          <button className={classes.key} data-key="2">
            2
          </button>
          <button className={classes.key} data-key="3">
            3
          </button>
          <button className={classes.key} data-key="4">
            4
          </button>
          <button className={classes.key} data-key="5">
            5
          </button>
          <button className={classes.key} data-key="6">
            6
          </button>
          <button className={classes.key} data-key="7">
            7
          </button>
          <button className={classes.key} data-key="8">
            8
          </button>
          <button className={classes.key} data-key="9">
            9
          </button>
          <button className={classes.key} data-key="0">
            0
          </button>
          <button className={classes.key} data-key="-">
            -
          </button>
          <button className={classes.key} data-key="=">
            =
          </button>
          <button className={classes.key} data-key="BACKSPACE">
            DEL
          </button>
        </div>
        <div className={classes.row}>
          <button
            className={`${classes.utility} ${classes.key} ${classes.jiggle}`}
            data-key="TAB"
          >
            Tab
          </button>
          <button className={classes.key} data-key="Q">
            Q
          </button>
          <button className={classes.key} data-key="W">
            W
          </button>
          <button className={classes.key} data-key="E">
            E
          </button>
          <button className={`${classes.key}`} data-key="R">
            R
          </button>
          <button className={classes.key} data-key="T">
            T
          </button>
          <button className={classes.key} data-key="Y">
            Y
          </button>
          <button className={classes.key} data-key="U">
            U
          </button>
          <button className={classes.key} data-key="I">
            I
          </button>
          <button className={classes.key} data-key="O">
            O
          </button>
          <button className={classes.key} data-key="P">
            P
          </button>
          <button className={classes.key} data-key="[">
            [
          </button>
          <button className={classes.key} data-key="]">
            ]
          </button>
          <button className={classes.key} data-key="\">
            \
          </button>
        </div>
        <div className={classes.row}>
          <button
            className={`${classes.utility} ${classes.key}`}
            data-key="CAPSLOCK"
          >
            CAPS
          </button>
          <button className={classes.key} data-key="A">
            A
          </button>
          <button className={classes.key} data-key="S">
            S
          </button>
          <button className={classes.key} data-key="D">
            D
          </button>
          <button className={classes.key} data-key="F">
            F
          </button>
          <button className={classes.key} data-key="G">
            G
          </button>
          <button className={classes.key} data-key="H">
            H
          </button>
          <button className={classes.key} data-key="J">
            J
          </button>
          <button className={classes.key} data-key="K">
            K
          </button>
          <button className={classes.key} data-key="L">
            L
          </button>
          <button className={classes.key} data-key=";">
            ;
          </button>
          <button className={classes.key} data-key="'">
            '
          </button>
          <button
            className={`${classes.utility} ${classes.key}`}
            data-key="ENTER"
          >
            ENTER
          </button>
        </div>
        <div className={classes.row}>
          <button
            className={`${classes.utility} ${classes.key}`}
            data-key="SHIFT"
          >
            SHIFT
          </button>
          <button className={classes.key} data-key="Z">
            Z
          </button>
          <button className={classes.key} data-key="X">
            X
          </button>
          <button className={classes.key} data-key="C">
            C
          </button>
          <button className={classes.key} data-key="V">
            V
          </button>
          <button className={classes.key} data-key="B">
            B
          </button>
          <button className={classes.key} data-key="N">
            N
          </button>
          <button className={classes.key} data-key="M">
            M
          </button>
          <button className={classes.key} data-key=",">
            ,
          </button>
          <button className={classes.key} data-key=".">
            .
          </button>
          <button className={classes.key} data-key="/">
            /
          </button>
          <button
            className={`${classes.utility} ${classes.key}`}
            data-key="SHIFT"
          >
            SHIFT
          </button>
        </div>
      </div>
    </div>
  );
}
