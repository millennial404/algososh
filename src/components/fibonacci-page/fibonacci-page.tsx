import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {useForm} from "../../hooks/useForm";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {getFibonacciNumbers} from "./utils";


export const FibonacciPage: React.FC = () => {
  const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));
  const {values, handleChange} = useForm({number: ''});
  const [arrayChars, setArrayChars] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const fibonacciAnimation = async () => {
    if (!isMounted) return
    setCompleted(true);
    const fibonacciArr = getFibonacciNumbers(Number(values.number));
    const fibNums = [];
    for (let i = 0; i < fibonacciArr.length; i++) {
      fibNums.push(fibonacciArr[i]);
      setArrayChars([...fibNums]);
      await delay(SHORT_DELAY_IN_MS);
    }
    setCompleted(false);
  }
  useEffect(() => {
    return () => {
      setIsMounted(false)
    }
  },[])

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <Input name={'number'} extraClass={'mr-6'} type={'number'} max={19} isLimitText={true}
                 onChange={handleChange}/>
          <Button onClick={fibonacciAnimation}
                  disabled={Number(values.number) < 0 || Number(values.number) > 19 || values.number === ''}
                  isLoader={completed} text={'Рассчитать'} type={'button'}/>
        </form>
        <ul className={styles.vizualization}>
          {arrayChars?.map((item: number, index: number) => <li className={styles.element} key={index}><Circle
            index={index}
            state={ElementStates.Default}
            letter={`${item}`}/></li>)}
        </ul>
      </div>
    </SolutionLayout>
  );
};
