import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {useForm} from "../../hooks/useForm";
import {LinkedList, randomArray} from "./utils";

export const ListPage: React.FC = () => {
  const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));
  const [arrayChars, setArrayChars] = useState<Array<string | number>>([]);
  const {values, handleChange,} = useForm({});
  const linkedList = new LinkedList<number | string>(arrayChars);
  const addHead = () => {
    linkedList.prepend(values.value);
    setArrayChars(linkedList.toArray());
  }
  const addTail = () => {
    linkedList.append(values.value);
    setArrayChars(linkedList.toArray());
  }
  const deleteHead = () => {
    linkedList.deleteHead();
    setArrayChars(linkedList.toArray());
  }
  const deleteTail = () => {
    linkedList.deleteTail();
    setArrayChars(linkedList.toArray());
  }
  const removeByIndex = () => {
    linkedList.deleteByIndex(values.index);
    setArrayChars(linkedList.toArray());
  }
  const addByIndex = () => {
    linkedList.addByIndex(values.value, values.index);
    setArrayChars(linkedList.toArray());
  }
  console.log(linkedList.toArray());
  console.log(arrayChars);

  useEffect(() => {
    setArrayChars(randomArray(5, 0, 100));
  }, []);

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <div className={styles.formValue}>
            <Input name={'value'} onChange={handleChange} extraClass={`${styles.input}`} maxLength={4}
                   isLimitText={true} placeholder={'Введите значение'}/>
            <Button extraClass={`${styles.buttonValue} ml-6`} text={'Добавить в head'}
                    type={'button'} onClick={addHead}/>
            <Button extraClass={`${styles.buttonValue} ml-6`} text={'Добавить в tail'}
                    type={'button'} onClick={addTail}/>
            <Button extraClass={`${styles.buttonValue} ml-6`} text={'Удалить из head'} type={'button'}
                    onClick={deleteHead}/>
            <Button extraClass={`${styles.buttonValue} ml-6`} text={'Удалить из tail'} type={'button'}
                    onClick={deleteTail}/>
          </div>
          <div className={styles.formIndex}>
            <Input name={'index'} onChange={handleChange} type={'number'} extraClass={`${styles.input}`}
                   placeholder={'Введите индекс'}/>
            <Button extraClass={`${styles.buttonIndex} ml-6`} text={'Добавить по индексу'}
                    type={'button'} onClick={addByIndex}/>
            <Button extraClass={`${styles.buttonIndex} ml-6`} text={'Удалить по индексу'}
                    type={'button'} onClick={removeByIndex}/>
          </div>
        </form>
        <ul className={styles.vizualization}>
          {arrayChars?.map((item: string | number | null, index: number) =>
            <>
              <li key={index} className={styles.element}>
                <Circle
                  head={index === 0 ? 'head' : <Circle isSmall/>}
                  tail={index === arrayChars.length - 1 ? 'tail' : <Circle isSmall/>}
                  letter={`${item}`}
                  index={index}
                />
                {index !== arrayChars.length - 1 && <ArrowIcon/>}
              </li>
            </>
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};
