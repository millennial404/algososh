import React, {useEffect, useRef, useState} from "react";
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
  const [arrayChars, setArrayChars] = useState<(string | number)[]>([]);
  const [lighting, setLighting] = useState<number | null>(null);
  const [headIndex, setHeadIndex] = useState<number>(0);
  const [tailIndex, setTailIndex] = useState<number>(0);
  const queue = useRef(new Queue<string>(7, '')).current;

  const enqueueVisualization = async () => {
    if (tailIndex >= arrayChars.length - 1) {
      return
    }
    queue.enqueue(values.value)
    setLighting(queue.tailIndex - 1);
    await delay(DELAY_IN_MS);
    setArrayChars([...queue.elements]);
    setTailIndex(queue.tailIndex - 1);
    setLighting(null);
    setValues({value: ''});
  }
  const dequeueVisualization = async () => {
    if (headIndex === arrayChars.length) {
      return
    } else if (headIndex === arrayChars.length - 1) {
      queue.dequeue()
      setLighting(queue.headIndex - 1);
      await delay(DELAY_IN_MS);
      setArrayChars([...queue.elements]);
      setLighting(null);
      setHeadIndex(queue.headIndex);
      return
    }
    queue.dequeue()
    setLighting(queue.headIndex - 1);
    await delay(DELAY_IN_MS);
    setArrayChars([...queue.elements]);
    setHeadIndex(queue.headIndex);
    setLighting(null);
    setValues({value: ''});
  }
  const clear = () => {
    queue.clear();
    setArrayChars([...queue.elements]);
    setHeadIndex(0);
    setTailIndex(0);
    setValues({value: ''});
  }

  useEffect(() => {
    setArrayChars(queue.elements);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <Input name={'value'} extraClass={'mr-6'} maxLength={4} isLimitText={true} value={values.value}
                 onChange={handleChange}/>
          <Button extraClass={`cy_test_button_add ml-6`} onClick={enqueueVisualization} disabled={!(values.value && values.value !== '')}
                  text={'Добавить'}
                  type={'button'}/>
          <Button onClick={dequeueVisualization} disabled={queue.isEmpty} extraClass={`cy_test_button_del ml-6`} text={'Удалить'}
                  type={'button'}/>
          <Button onClick={clear}
                  disabled={queue.isEmpty && headIndex === 0 && tailIndex === 0}
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
