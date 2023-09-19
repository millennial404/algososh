import React from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./string.module.css";
import {Circle} from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
      <div className={styles.wrapper}>
        <div className={styles.form}>
        <Input extraClass={'mr-6'} maxLength={11} isLimitText={true}/>
        <Button text={'Развернуть'}/>
        </div>
        <div className={styles.vizualization}>
          <Circle/>
          <Circle/>
          <Circle/>
          <Circle/>
          <Circle/>
          <Circle/>
          <Circle/>
          <Circle/>
          <Circle/>
          <Circle/>
          <Circle/>
        </div>
      </div>
    </SolutionLayout>

  );
};
