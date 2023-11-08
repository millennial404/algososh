import React from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./string.module.css";
import {Circle} from "../ui/circle/circle";
import {useForm} from "../../hooks/useForm";
import {ElementStates} from "../../types/element-states";

export const swapper = (arr: string[]) => {
    const newArr = [...arr];
    if (newArr.length <= 1) {
        return arr;
    }
    let leftCharIndex = 0;
    let rightCharIndex = newArr.length - 1;
    let leftChar = newArr[leftCharIndex];
    let rightChar = newArr[rightCharIndex];
    newArr[leftCharIndex] = rightChar;
    newArr[rightCharIndex] = leftChar;
    leftCharIndex++;
    rightCharIndex--;

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
    const l = 0;
    const r = 5
    return (
        <SolutionLayout title="Строка">
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <Input name={'string'} extraClass={'mr-6'} maxLength={11} isLimitText={true}
                           onChange={handleChange}/>
                    <Button text={'Развернуть'} type={'submit'}/>
                </form>
                <ul className={styles.vizualization}>
                    {arrayChars?.map((item: string, index: number) => <li key={index}><Circle
                        state={l === index || r === index ? ElementStates.Changing : ElementStates.Default}
                        letter={item}/></li>)}
                </ul>
            </div>
        </SolutionLayout>
    );
};
