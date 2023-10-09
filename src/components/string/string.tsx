import React from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./string.module.css";
import {Circle} from "../ui/circle/circle";
import {useForm} from "../../hooks/useForm";

export const StringComponent: React.FC = () => {
  const {values, handleChange} = useForm({});
  const onSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    console.log(values.string?.split(''));
  }
  console.log(values)
  return (
    <SolutionLayout title="Строка">
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={onSubmit}>
        <Input name={'string'} extraClass={'mr-6'} maxLength={11} isLimitText={true} onChange={handleChange}/>
        <Button text={'Развернуть'} type={'submit'}/>
        </form>
        <div className={styles.vizualization}>
          <Circle letter={'H'}/>
        </div>
      </div>
    </SolutionLayout>

  );
};
