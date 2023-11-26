import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {useForm} from "../../hooks/useForm";
import {LinkedList, randomArray} from "./utils";
import {DELAY_IN_MS} from "../../constants/delays";
import {ElementStates} from "../../types/element-states";

export const ListPage: React.FC = () => {
  const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));
  const [arrayChars, setArrayChars] = useState<Array<string | number>>([]);
  const {values, handleChange, setValues} = useForm({});
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [headIndex, setHeadIndex] = useState<number | null>(null);
  const [tailIndex, setTailIndex] = useState<number | null>(null);
  const [modifiedIndex, setModifiedIndex] = useState<number | null>(null);
  const [isVoid, setIsVoid] = useState<number | null>(null);
  const linkedList = new LinkedList<number | string>(arrayChars);
  const addHead = async () => {
    setIsLoading('addHead');
    linkedList.prepend(values.value);
    setHeadIndex(0)
    await delay(DELAY_IN_MS);
    setArrayChars(linkedList.toArray());
    setHeadIndex(null)
    setModifiedIndex(0)
    await delay(DELAY_IN_MS);
    setModifiedIndex(null)
    setIsLoading(null);
  }
  const addTail = async () => {
    setIsLoading('addTail')
    linkedList.append(values.value);
    setHeadIndex(arrayChars.length - 1)
    await delay(DELAY_IN_MS);
    setArrayChars(linkedList.toArray());
    setHeadIndex(null)
    setModifiedIndex(arrayChars.length)
    await delay(DELAY_IN_MS);
    setModifiedIndex(null)
    setIsLoading(null);

  }
  const deleteHead = async () => {
    setIsLoading('deleteHead');
    setIsVoid(0)
    setValues({value: arrayChars[0]});
    setTailIndex(0)
    linkedList.deleteHead();
    await delay(DELAY_IN_MS);
    setArrayChars(linkedList.toArray());
    setTailIndex(null)
    setIsLoading(null);
    setIsVoid(null);
  }
  const deleteTail = async () => {
    setIsLoading('deleteTail');
    setIsVoid(arrayChars.length - 1)
    setValues({value: arrayChars[arrayChars.length - 1]});
    setTailIndex(arrayChars.length - 1)
    linkedList.deleteTail();
    await delay(DELAY_IN_MS);
    setArrayChars(linkedList.toArray());
    setTailIndex(null)
    setIsLoading(null);
    setIsVoid(null);
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
    setArrayChars(randomArray(5, 0, 100).map(el => String(el)));
  }, []);

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <div className={styles.formValue}>
            <Input name={'value'} onChange={handleChange} extraClass={`${styles.input}`} maxLength={4}
                   isLimitText={true} placeholder={'Введите значение'}/>
            <Button extraClass={`${styles.buttonValue} ml-6`} isLoader={isLoading === 'addHead'}
                    disabled={values.value ? values.value === '' : true}
                    text={'Добавить в head'}
                    type={'button'} onClick={addHead}/>
            <Button extraClass={`${styles.buttonValue} ml-6`} isLoader={isLoading === 'addTail'}
                    disabled={values.value ? values.value === '' : true}
                    text={'Добавить в tail'}
                    type={'button'} onClick={addTail}/>
            <Button extraClass={`${styles.buttonValue} ml-6`} isLoader={isLoading === 'deleteHead'}
                    disabled={isDisabled}
                    text={'Удалить из head'} type={'button'}
                    onClick={deleteHead}/>
            <Button extraClass={`${styles.buttonValue} ml-6`} isLoader={isLoading === 'deleteTail'}
                    disabled={isDisabled}
                    text={'Удалить из tail'} type={'button'}
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
            <li key={index} className={styles.element}>
              <Circle
                state={modifiedIndex === index ? ElementStates.Modified : ElementStates.Default}
                head={index === headIndex ?
                  <Circle state={ElementStates.Changing} isSmall letter={values.value}/> : index === 0 ? 'head' : ''}
                tail={index === tailIndex ? <Circle state={ElementStates.Changing} isSmall
                                                    letter={values.value}/> : index === arrayChars.length - 1 ? 'tail' : ''}
                letter={index === isVoid ? '' : `${item}`}
                index={index}
              />
              {index !== arrayChars.length - 1 && <ArrowIcon/>}
            </li>
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};
