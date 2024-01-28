import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {Direction} from "../../types/direction";
import {Column} from "../ui/column/column";
import {ElementStates} from "../../types/element-states";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {randomArray, randomLength, selectionSortSteps, swap} from "./utils";

export const SortingPage: React.FC = () => {
  const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));
  const [array, setArray] = useState<number[]>([]);
  const [sortingVariant, setSortingVariant] = useState('selectionSort')
  const [changingLeftElement, setChangingLeftElement] = useState<number | null>(null);
  const [changingRightElement, setChangingRightElement] = useState<number | null>(null);
  const [modifiedElements, setModifiedElement] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const [completeDescending, setCompleteDescending] = useState(false);

  const selectionSort = async (arr: number[], sortingVariant: string = 'ascending') => {
    if (sortingVariant === 'descending') {
      setCompleteDescending(true);
    } else {
      setCompleted(true);
    }
    setModifiedElement([]);
    const modifiedElementsIndex = [];
    const {length} = arr;
    const sortingSteps = sortingVariant === 'ascending' ? selectionSortSteps([...arr]) : selectionSortSteps([...arr], 'descending');
    for (let i = 0; i < length - 1; i++) {
      let minIndex = i;
      setChangingLeftElement(minIndex);
      for (let j = i + 1; j < length; j++) {
        if (sortingVariant === 'ascending' && arr[j] < arr[minIndex]) {
          minIndex = j;
        } else if (sortingVariant === 'descending' && arr[j] > arr[minIndex]) {
          minIndex = j;
        }
        setChangingRightElement(j);
        await delay(SHORT_DELAY_IN_MS);
      }
      modifiedElementsIndex.push(i)
      setModifiedElement([...modifiedElementsIndex]);
      setArray([...sortingSteps.steps[i]]);
    }
    modifiedElementsIndex.push(length - 1)
    setModifiedElement([...modifiedElementsIndex]);
    setChangingLeftElement(null);
    setChangingRightElement(null);
    if (sortingVariant === 'descending') {
      setCompleteDescending(false);
    } else {
      setCompleted(false);
    }
  };

  const bubbleSort = async (arr: number[], sortingVariant: string = 'ascending') => {
    if (sortingVariant === 'descending') {
      setCompleteDescending(true);
    } else {
      setCompleted(true);
    }
    setModifiedElement([]);
    const modifiedElementsIndex = [];
    const newArr = [...arr];
    const {length} = newArr;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (sortingVariant === 'ascending' && newArr[j] > newArr[j + 1]) {
          swap(newArr, j, j + 1);
        } else if (sortingVariant === 'descending' && newArr[j] < newArr[j + 1]) {
          swap(newArr, j, j + 1);
        }
        setChangingLeftElement(j);
        setChangingRightElement(j + 1);
        setArray([...newArr]);
        await delay(SHORT_DELAY_IN_MS);

      }
      modifiedElementsIndex.push(length - i - 1);
      setModifiedElement([...modifiedElementsIndex]);
    }
    if (sortingVariant === 'descending') {
      setCompleteDescending(false);
    } else {
      setCompleted(false);
    }
  }

  const handleButtonClick = () => {
    setChangingLeftElement(null);
    setChangingRightElement(null);
    setModifiedElement([]);
    setArray(randomArray(randomLength(), 0, 101));
  };

  const handleOptionChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    setSortingVariant(changeEvent.target.value)
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.controlContainer}>
        <fieldset className={styles.fieldset}>
          <RadioInput name="sort" value="selectionSort" disabled={completed || completeDescending}
                      label={'Выбор'}
                      onChange={handleOptionChange}
                      defaultChecked/>
          <RadioInput name="sort" value="bubbleSort" disabled={completed || completeDescending}
                      onChange={handleOptionChange}
                      label={'Пузырёк'}/>
        </fieldset>
        <Button sorting={Direction.Ascending} isLoader={completed} disabled={completeDescending}
                onClick={() => sortingVariant === 'selectionSort' ? selectionSort(array) : bubbleSort(array)}
                text={'По возрастанию'} type={'button'} extraClass={`${styles.buttonWidthAscending}`}/>
        <Button sorting={Direction.Descending} isLoader={completeDescending}
                onClick={() => sortingVariant === 'selectionSort' ? selectionSort(array, 'descending') : bubbleSort(array, 'descending')}
                disabled={completed} extraClass={`${styles.buttonWidthDescending} ml-6`} text={'По убыванию'}
                type={'button'}/>
        <Button onClick={handleButtonClick} disabled={completed || completeDescending}
                extraClass={`${styles.buttonWidthNewArr} ml-40`} text={'Новый массив'}
                type={'button'}/>
      </div>
      <ul className={styles.columnsContainer}>
        {
          array.map((value, index) => (
            <li key={index} className={styles.columnsElement}>
              <Column
                state={modifiedElements.includes(index)
                  ? ElementStates.Modified
                  : changingLeftElement === index || changingRightElement === index
                    ? ElementStates.Changing
                    : ElementStates.Default}
                index={value}
              />
            </li>
          ))
        }
      </ul>
    </SolutionLayout>
  );
};
