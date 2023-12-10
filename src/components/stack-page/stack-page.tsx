import React, {useRef, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {useForm} from "../../hooks/useForm";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {DELAY_IN_MS} from "../../constants/delays";
import {Stack} from "./utils";

export const StackPage: React.FC = () => {
  const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));
  const {values, handleChange, setValues} = useForm({value: ''});
  const [arrayChars, setArrayChars] = useState<(string | number)[]>([]);
  const [lighting, setLighting] = useState<number | null>(null);
  const stack = useRef(new Stack<string | number>()).current;
  const add = async () => {
    stack.push(values.value)
    setArrayChars(stack.itemsArray);
    setLighting(stack.length - 1)
    await delay(DELAY_IN_MS);
    setLighting(null)
    setValues({value: ''})

  }
  const del = async () => {
    setLighting(stack.length - 1)
    await delay(DELAY_IN_MS);
    setLighting(null)
    stack.pop()
    setArrayChars(stack.itemsArray);
    setValues({value: ''})
  }
  const clear = () => {
    stack.clear();
    setArrayChars(stack.itemsArray);
  }

  console.log(stack.itemsArray)
  return (
    <SolutionLayout title="Стек">
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <Input name={'value'} extraClass={'mr-6'} value={values.value} maxLength={4} isLimitText={true}
                 onChange={handleChange}/>
          <Button extraClass={`ml-6`} onClick={add} disabled={!(values.value && values.value !== '')} text={'Добавить'}
                  type={'button'}/>
          <Button onClick={del} disabled={arrayChars.length === 0} extraClass={`ml-6`} text={'Удалить'}
                  type={'button'}/>
          <Button onClick={clear} disabled={arrayChars.length === 0} extraClass={`ml-40`} text={'Очистить'}
                  type={'button'}/>
        </form>
        <ul className={styles.vizualization}>
          {arrayChars?.map((item: string | number, index: number) => <li key={index}>
            <Circle
              head={index === arrayChars.length - 1 ? 'top' : null}
              state={lighting === index ? ElementStates.Changing : ElementStates.Default}
              letter={`${item}`}
              index={index}
            /></li>)}
        </ul>
      </div>
    </SolutionLayout>
  );
};
