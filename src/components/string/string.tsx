import React from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./string.module.css";
import {Circle} from "../ui/circle/circle";
import {useForm} from "../../hooks/useForm";

export const swapper = (arr: string[]) => {
  const newArr = [...arr];
  let leftCharIndex = 0;
  let rightCharIndex = newArr.length - 1;
  let leftChar = newArr[leftCharIndex];
  let rightChar = newArr[rightCharIndex];
  let step = 0;

  if (newArr.length <= 1) {
    return arr;
  }

  while (leftCharIndex < rightCharIndex) {
    newArr[leftCharIndex] = rightChar;
    newArr[rightCharIndex] = leftChar;
    leftCharIndex++;
    rightCharIndex--;
    step++;
    leftChar = newArr[leftCharIndex];
    rightChar = newArr[rightCharIndex];
    setTimeout(() => {
      console.log(step);
    }, 1000);
  }

  return newArr
}

export const StringComponent: React.FC = () => {
  const {values, handleChange,} = useForm({});
  const [arrayChars, setArrayChars] = React.useState<string[]>([]);
  const onSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    const newChars = values.string?.split('') || [];
    setArrayChars(newChars);
    setTimeout(() => setArrayChars(swapper(newChars)), 1000);
  }
  console.log(arrayChars, values.string)
  return (
    <SolutionLayout title="Строка">
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input name={'string'} extraClass={'mr-6'} maxLength={11} isLimitText={true} onChange={handleChange}/>
          <Button text={'Развернуть'} type={'submit'}/>
        </form>
        <ul className={styles.vizualization}>
          {arrayChars?.map((item: string, index: number) => <li key={index}><Circle letter={item}/></li>)}
        </ul>
      </div>
    </SolutionLayout>
  );
};
