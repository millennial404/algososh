import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./string.module.css";
import {Circle} from "../ui/circle/circle";
import {useForm} from "../../hooks/useForm";
import {ElementStates} from "../../types/element-states";
import {DELAY_IN_MS} from "../../constants/delays";
import {swapper} from "./utils";

export const StringComponent: React.FC = () => {
  const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));
  const {values, handleChange, setValues} = useForm({string: ''});
  const [arrayChars, setArrayChars] = useState<string[]>([]);
  const [changingElements, setChangingElement] = useState<{ left: number | null, right: number | null }>({
    left: null,
    right: null
  });
  const [modifiedElements, setModifiedElement] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const onSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    setCompleted(true);
    let newChars = values.string?.split('') || [];
    const modifiedElementsIndexes: number[] = [];
    setModifiedElement([]);
    setArrayChars(newChars);
    setChangingElement({left: 0, right: newChars.length - 1});
    for (let i = 0; i < newChars.length / 2; i++) {
      setChangingElement({left: i, right: newChars.length - 1 - i});
      await delay(DELAY_IN_MS);
      const swappedChars = await swapper(newChars, i, newChars.length - 1 - i);
      setArrayChars(swappedChars);
      modifiedElementsIndexes.push(i, newChars.length - 1 - i);
      setModifiedElement([...modifiedElementsIndexes]);
      newChars = [...swappedChars];
    }
    setCompleted(false);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input name={'string'} extraClass={'mr-6'} maxLength={11} isLimitText={true}
                 onChange={handleChange}/>
          <Button extraClass={'cy_test_button_reverse'} isLoader={completed} text={'Развернуть'} type={'submit'} disabled={values.string.length < 1}/>
        </form>
        <ul className={styles.vizualization}>
          {arrayChars?.map((item: string, index: number) => <li key={index}><Circle
            state={modifiedElements.includes(index)
              ? ElementStates.Modified
              : changingElements.left === index || changingElements.right === index
                ? ElementStates.Changing
                : ElementStates.Default
            }
            letter={item}/></li>)}
        </ul>
      </div>
    </SolutionLayout>
  );
};
