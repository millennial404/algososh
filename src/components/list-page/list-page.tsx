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
  const {values, handleChange, setValues} = useForm({value: '', index: ''});
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [headIndex, setHeadIndex] = useState<number | null>(null);
  const [tailIndex, setTailIndex] = useState<number | null>(null);
  const [modifiedIndex, setModifiedIndex] = useState<number | null>(null);
  const [isVoid, setIsVoid] = useState<number | null>(null);
  const [theValueToBeDeleted, setTheValueToBeDeleted] = useState<string>('');
  const [indexesItems, setIndexesItems] = useState<number[]>([]);
  const linkedList = new LinkedList<number | string>(arrayChars);
  const addHead = async () => {
    setIsDisabled(true);
    setIsLoading('addHead');
    linkedList.prepend(values.value);
    setHeadIndex(0)
    await delay(DELAY_IN_MS);
    setArrayChars(linkedList.toArray());
    setHeadIndex(null)
    setModifiedIndex(0)
    await delay(DELAY_IN_MS);
    setModifiedIndex(null)
    setIsDisabled(false);
    setValues({value: '', index: ''});
    await delay(DELAY_IN_MS);
    setIsLoading(null);

  }
  const addTail = async () => {
    setIsDisabled(true);
    setIsLoading('addTail')
    linkedList.append(values.value);
    setHeadIndex(arrayChars.length - 1)
    await delay(DELAY_IN_MS);
    setArrayChars(linkedList.toArray());
    setHeadIndex(null)
    setModifiedIndex(arrayChars.length)
    await delay(DELAY_IN_MS);
    setModifiedIndex(null)
    setIsDisabled(false);
    setValues({value: '', index: ''});
    await delay(DELAY_IN_MS);
    setIsLoading(null);

  }
  const deleteHead = async () => {
    setIsDisabled(true);
    setIsLoading('deleteHead');
    setIsVoid(0)
    setTheValueToBeDeleted(String(arrayChars[0]));
    setTailIndex(0)
    linkedList.deleteHead();
    await delay(DELAY_IN_MS);
    setArrayChars(linkedList.toArray());
    setTailIndex(null)
    setIsVoid(null);
    setIsDisabled(false);
    setTheValueToBeDeleted('');
    setValues({value: '', index: ''});
    await delay(DELAY_IN_MS);
    setIsLoading(null);
  }
  const deleteTail = async () => {
    setIsDisabled(true);
    setIsLoading('deleteTail');
    setIsVoid(arrayChars.length - 1)
    setTheValueToBeDeleted(String(arrayChars[arrayChars.length - 1]));
    setTailIndex(arrayChars.length - 1)
    linkedList.deleteTail();
    await delay(DELAY_IN_MS);
    setArrayChars(linkedList.toArray());
    setTailIndex(null)
    setIsVoid(null);
    setIsDisabled(false);
    setTheValueToBeDeleted('');
    setValues({value: '', index: ''});
    await delay(DELAY_IN_MS);
    setIsLoading(null);
  }
  const removeByIndex = async () => {
    setIsDisabled(true);
    setIsLoading('removeByIndex');
    linkedList.deleteByIndex(Number(values.index));
    for (let i = 0; i < Number(values.index) + 1; i++) {
      const indexes = indexesItems;
      indexes.push(i);
      setIndexesItems([...indexes])
      await delay(DELAY_IN_MS);
    }
    setTheValueToBeDeleted(String(arrayChars[Number(values.index)]));
    setTailIndex(Number(values.index))
    const popIndexes = indexesItems
    popIndexes.pop();
    setIndexesItems([...popIndexes])
    setIsVoid(Number(values.index))
    await delay(DELAY_IN_MS);
    setIndexesItems([])
    setArrayChars(linkedList.toArray());
    setIsVoid(null);
    setTailIndex(null)
    setIsLoading(null);
    setIsDisabled(false);
    setValues({value: '', index: ''});

  }
  const addByIndex = async () => {
    setIsDisabled(true);
    setIsLoading('addByIndex');
    for (let i = 0; i < Number(values.index) + 1; i++) {
      setHeadIndex(i)
      if (i > 0) {
        const indexes = indexesItems;
        indexes.push(i - 1);
        setIndexesItems([...indexes])
      }
      await delay(DELAY_IN_MS);
    }
    linkedList.addByIndex(values.value, Number(values.index));
    setArrayChars(linkedList.toArray());
    setHeadIndex(null)
    setIsDisabled(false);
    setModifiedIndex(Number(values.index))
    setIndexesItems([]);
    await delay(DELAY_IN_MS);
    setModifiedIndex(null)
    await delay(DELAY_IN_MS);
    setIsLoading(null);
    setValues({value: '', index: ''});
  }

  useEffect(() => {
    setArrayChars(randomArray(5, 0, 100).map(el => String(el)));
  }, []);

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <div className={styles.formValue}>
            <Input name={'value'} onChange={handleChange} disabled={isDisabled} extraClass={`${styles.input}`}
                   maxLength={4}
                   isLimitText={true} placeholder={'Введите значение'} value={values.value}/>
            <Button extraClass={`${styles.buttonValue} ml-6`} isLoader={isLoading === 'addHead'}
                    disabled={values.value === '' || isDisabled}
                    text={'Добавить в head'}
                    type={'button'} onClick={addHead}/>
            <Button extraClass={`${styles.buttonValue} ml-6`} isLoader={isLoading === 'addTail'}
                    disabled={values.value === '' || isDisabled}
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
            <Input name={'index'} onChange={handleChange} disabled={isDisabled} type={'number'}
                   extraClass={`${styles.input}`}
                   placeholder={'Введите индекс'}
                   value={values.index}/>
            <Button extraClass={`${styles.buttonIndex} ml-6`} isLoader={isLoading === 'addByIndex'}
                    disabled={(Number(values.index) < 0 || Number(values.index) > arrayChars.length - 1) || (values.index === '' || values.value === '') || isDisabled}
                    text={'Добавить по индексу'}
                    type={'button'} onClick={addByIndex}/>
            <Button extraClass={`${styles.buttonIndex} ml-6`} isLoader={isLoading === 'removeByIndex'}
                    disabled={(Number(values.index) < 0 || Number(values.index) > arrayChars.length - 1) || values.index === '' || isDisabled}
                    text={'Удалить по индексу'}
                    type={'button'} onClick={removeByIndex}/>
          </div>
        </form>
        <ul className={styles.vizualization}>
          {arrayChars?.map((item: string | number | null, index: number) =>
            <li key={index} className={styles.element}>
              <Circle
                state={indexesItems.includes(index)
                  ? ElementStates.Changing
                  : modifiedIndex === index
                    ? ElementStates.Modified
                    : ElementStates.Default}
                head={index === headIndex ?
                  <Circle state={ElementStates.Changing} isSmall letter={values.value}/> : index === 0 ? 'head' : ''}
                tail={index === tailIndex ? <Circle state={ElementStates.Changing} isSmall
                                                    letter={theValueToBeDeleted}/> : index === arrayChars.length - 1 ? 'tail' : ''}
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
