import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./string.module.css";
import {Circle} from "../ui/circle/circle";
import {useForm} from "../../hooks/useForm";
import {ElementStates} from "../../types/element-states";
import {DELAY_IN_MS} from "../../constants/delays";
import {reverseString} from "./utils";

export const StringComponent: React.FC = () => {
  const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));
  const {values, handleChange} = useForm({string: ''});
  const [arrayChars, setArrayChars] = useState<string[]>([]);
  const [changingElements, setChangingElement] = useState<{ left: number, right: number }>({
    left: 0,
    right: 0
  });
  const [modifiedElements, setModifiedElement] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const handleClick = async () => {
    setCompleted(true);
    const revStr = reverseString(values.string).split('') || [];
    let charsArr = values.string?.split('') || [];
    const modifiedElementsIndexes: number[] = [];
    setModifiedElement([]);
    setArrayChars([...charsArr]);
    setChangingElement((prevElements) => ({...prevElements, left: 0, right: charsArr.length - 1}));
    for (let i = 0; i < charsArr.length / 2; i++) {
      await delay(DELAY_IN_MS);
      setChangingElement((prevElements) => ({...prevElements, left: i, right: charsArr.length - 1 - i}));
      charsArr[i] = revStr[i];
      charsArr[charsArr.length - 1 - i] = revStr[charsArr.length - 1 - i];
      setArrayChars([...charsArr]);
      modifiedElementsIndexes.push(i, charsArr.length - 1 - i);
      setModifiedElement([...modifiedElementsIndexes]);
    }
    setCompleted(false);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <Input name={'string'} extraClass={'mr-6'} maxLength={11} isLimitText={true}
                 onChange={handleChange} data-cy="input" value={values.string}/>
          <Button data-cy="submit" isLoader={completed} text={'Развернуть'} type={'button'} onClick={handleClick}
                  extraClass={'mr-6'} disabled={values.string.length < 1}/>
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
