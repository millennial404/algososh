import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {useForm} from "../../hooks/useForm";
import {DELAY_IN_MS} from "../../constants/delays";
import {Queue} from "./utils";

export const QueuePage: React.FC = () => {
  const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));
  const {values, handleChange, setValues} = useForm({value: ''});
  const [arrayChars, setArrayChars] = useState<(string | number)[]>(['', '', '', '', '', '', '']);
  const [lighting, setLighting] = useState<number | null>(null);
  const [headIndex, setHeadIndex] = useState<number>(0);
  const [tailIndex, setTailIndex] = useState<number>(-1);
  const [isDisebled, setIsDisebled] = useState<boolean>(true);
  const queue = new Queue<string | number>();
  const checkArray = (arrayChars: (string | number)[]) => {
    let flag = true
    arrayChars.forEach((char: string | number, index: number) => {
      if (char !== '') {
        flag = false
      }
    })
    setIsDisebled(flag)
  }
  const enqueueVisualization = async () => {
    if (tailIndex >= arrayChars.length - 1) {
      return
    } else {
      setLighting(tailIndex + 1)
      await delay(DELAY_IN_MS);
      setTailIndex(tailIndex + 1)
      let newChars: (string | number)[] = [...arrayChars];
      newChars[tailIndex + 1] = values.value;
      setArrayChars([...newChars]);
      setValues({value: ''})
      setLighting(null)
    }
  }
  const dequeueVisualization = async () => {
    if (headIndex >= arrayChars.length) {
      return
    } else if (headIndex === tailIndex) {
      setLighting(headIndex)
      await delay(DELAY_IN_MS);
      setHeadIndex(headIndex + 1)
      let newChars: (string | number)[] = [...arrayChars];
      setLighting(null)
      newChars[headIndex] = '';
      setArrayChars([...newChars]);

    } else {
      setLighting(headIndex)
      await delay(DELAY_IN_MS);
      setHeadIndex(headIndex + 1)
      let newChars: (string | number)[] = [...arrayChars];
      setLighting(null)
      newChars[headIndex] = '';
      setArrayChars([...newChars]);
      setValues({value: ''})
    }
  }
  const clear = () => {
    setArrayChars(['', '', '', '', '', '', '']);
    setHeadIndex(0);
    setTailIndex(-1);
  }

  useEffect(() => {
    checkArray(arrayChars)
  }, [arrayChars]);

  // console.log(headIndex, tailIndex)
  const originalArray = [3, 4, 5, 3, 5];
  const newArray = Array.from({ length: 7 }, (_, index) =>
    index < originalArray.length ? originalArray[index] : ''
  );

  console.log(newArray);

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <Input name={'value'} extraClass={'mr-6'} maxLength={4} isLimitText={true} value={values.value}
                 onChange={handleChange}/>
          <Button extraClass={`ml-6`} onClick={enqueueVisualization} disabled={!(values.value && values.value !== '')} text={'Добавить'}
                  type={'button'}/>
          <Button onClick={dequeueVisualization} disabled={isDisebled} extraClass={`ml-6`} text={'Удалить'}
                  type={'button'}/>
          <Button onClick={clear}
                  disabled={headIndex !== 0 && tailIndex !== -1 ? false : headIndex === 7 ? false : isDisebled}
                  extraClass={`ml-40`} text={'Очистить'}
                  type={'button'}/>
        </form>
        <ul className={styles.vizualization}>
          {arrayChars?.map((item: string | number, index: number) => <li key={index}>
            <Circle
              head={(index === 6 && item === '' && headIndex === 7) ? 'head' : item !== '' && headIndex === index ? 'head' : null}
              tail={item !== '' && tailIndex === index ? 'tail' : null}
              state={lighting === index ? ElementStates.Changing : ElementStates.Default}
              letter={`${item}`}
              index={index}
            /></li>)}
        </ul>
      </div>
    </SolutionLayout>
  );
};
