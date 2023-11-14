import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {useForm} from "../../hooks/useForm";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

const fib = async (n: number): Promise<number> => {
    if (n <= 2) {
        return 1;
    }
    return await fib(n - 1) + await fib(n - 2);
}
export const FibonacciPage: React.FC = () => {
    const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));
    const {values, handleChange, setValues} = useForm({});
    const [arrayChars, setArrayChars] = useState<number[]>([]);
    const [completed, setCompleted] = useState(false);
    const onSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
        setCompleted(true);
        const arr = Array.from({length: Number(values.number) + 1}, (e, i) => i)
        const fibonacciArr = []
        for (let i = 1; i < arr.length + 1; i++) {
            const fibNum = await fib(i)
            fibonacciArr.push(fibNum)
            setArrayChars([...fibonacciArr])
            await delay(SHORT_DELAY_IN_MS);
        }
        setCompleted(false);
    }
    useEffect(() => {
        setValues({number: ""});
    }, [setValues]);
    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <Input name={'number'} extraClass={'mr-6'} type={'number'} max={19} isLimitText={true}
                           onChange={handleChange}/>
                    <Button disabled={Number(values.number) < 0 || Number(values.number) > 19 || values.number === ''}
                            isLoader={completed} text={'Рассчитать'} type={'submit'}/>
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
