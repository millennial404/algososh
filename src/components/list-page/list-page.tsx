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
  const [arrayChars, setArrayChars] = useState<Array<string | number>>([]);
  const {values, handleChange,} = useForm({});
  const linkedList = new LinkedList<number | string>(arrayChars);

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
                    type={'button'}/>
            <Button extraClass={`${styles.buttonValue} ml-6`} text={'Добавить в tail'}
                    type={'button'}/>
            <Button extraClass={`${styles.buttonValue} ml-6`} text={'Удалить из head'} type={'button'}/>
            <Button extraClass={`${styles.buttonValue} ml-6`} text={'Удалить из tail'} type={'button'}/>
          </div>
          <div className={styles.formIndex}>
            <Input name={'index'} onChange={handleChange} type={'number'} extraClass={`${styles.input}`}
                   placeholder={'Введите индекс'}/>
            <Button extraClass={`${styles.buttonIndex} ml-6`} text={'Добавить по индексу'}
                    type={'button'}/>
            <Button extraClass={`${styles.buttonIndex} ml-6`} text={'Удалить по индексу'}
                    type={'button'}/>
          </div>
        </form>
        <ul className={styles.vizualization}>
          {arrayChars?.map((item: string | number | null, index: number) =>
            <li key={index} className={styles.element}>
              <div className={styles.circleStack}>
                <Circle isSmall={true} extraClass={'mb-4'}/>
                <Circle
                  head={index === 0 ? 'head' : null}
                  tail={index === arrayChars.length - 1 ? 'tail' : null}
                  letter={`${item}`}
                  index={index}
                />
                <Circle isSmall={true} extraClass={'mt-20'}/>
              </div>
              {index !== arrayChars.length - 1 && <ArrowIcon/>}
            </li>
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};
