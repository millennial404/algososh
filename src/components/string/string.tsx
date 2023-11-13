import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./string.module.css";
import {Circle} from "../ui/circle/circle";
import {useForm} from "../../hooks/useForm";
import {ElementStates} from "../../types/element-states";

export const swapper = async (arr: string[], leftIndex: number, rightIndex: number) => {
  const newArr = [...arr];
  if (newArr.length <= 1) {
    return arr;
  }
  let leftCharIndex = leftIndex;
  let rightCharIndex = rightIndex;
  let leftChar = newArr[leftCharIndex];
  newArr[leftCharIndex] = newArr[rightCharIndex];
  newArr[rightCharIndex] = leftChar;
  return newArr
}

export const StringComponent: React.FC = () => {
  const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));
  const {values, handleChange,} = useForm({});
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
      await delay(1000);
      const swappedChars = await swapper(newChars, i, newChars.length - 1 - i);
      setArrayChars(swappedChars);
      modifiedElementsIndexes.push(i, newChars.length - 1 - i);
      setModifiedElement([...modifiedElementsIndexes]);
      newChars = [...swappedChars];
    }
    setCompleted(false);
  }
  console.log(modifiedElements)
  return (
    <SolutionLayout title="Строка">
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input name={'string'} extraClass={'mr-6'} maxLength={11} isLimitText={true}
                 onChange={handleChange}/>
          <Button disabled={completed} text={'Развернуть'} type={'submit'}/>
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
