import React from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {Direction} from "../../types/direction";
import {Column} from "../ui/column/column";

export const SortingPage: React.FC = () => {
    return (
        <SolutionLayout title="Сортировка массива">
            <div className={styles.controlContainer}>
                <fieldset className={styles.fieldset}>
                    <RadioInput name="sort" value="selectionSort" label={'Выбор'}/>
                    <RadioInput name="sort" value="bubbleSort " label={'Пузырек'}/>
                </fieldset>
                <Button sorting={Direction.Ascending} text={'По возрастанию'} type={'button'}/>
                <Button sorting={Direction.Descending} extraClass={'ml-6'} text={'По убыванию'} type={'button'}/>
                <Button extraClass={`${styles.buttonWidth} ml-40`} text={'Новый массив'} type={'button'}/>
            </div>
            <div>
                <Column index={1} />
            </div>
        </SolutionLayout>
    );
};
