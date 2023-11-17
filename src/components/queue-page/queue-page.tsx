import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "../stack-page/stack-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {useForm} from "../../hooks/useForm";
import {DELAY_IN_MS} from "../../constants/delays";

export const QueuePage: React.FC = () => {
    const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));
    const {values, handleChange, setValues} = useForm({});
    const [arrayChars, setArrayChars] = useState<(string | number)[]>(['','','','','','','']);
    const [lighting, setLighting] = useState<number | null>(null);
    const add = async (e: React.FormEvent) => {
        let newChars: (string | number)[] = [...arrayChars];
        newChars.push(values.value)
        setArrayChars([...newChars]);
        const target = e.target as HTMLFormElement;
        target.reset();
        setValues({value: ''})
        setLighting(newChars.length - 1)
        await delay(DELAY_IN_MS);
        setLighting(null)

    }
    const del = async () => {
        let newChars: (string | number)[] = [...arrayChars];
        setLighting(newChars.length - 1)
        await delay(DELAY_IN_MS);
        setLighting(null)
        newChars.pop()
        setArrayChars([...newChars]);
        setValues({value: ''})
    }
    const clear = () => {
        setArrayChars([]);
    }
    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        if (values.value && values.value !== '') {
            add(evt);
        }
    }
    console.log(values)
    return (
        <SolutionLayout title="Очередь">
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <Input name={'value'} extraClass={'mr-6'} maxLength={4} isLimitText={true}
                           onChange={handleChange}/>
                    <Button extraClass={`ml-6`} disabled={!(values.value && values.value !== '')} text={'Добавить'}
                            type={'submit'}/>
                    <Button onClick={del} disabled={arrayChars.length === 0} extraClass={`ml-6`} text={'Удалить'}
                            type={'button'}/>
                    <Button onClick={clear} disabled={arrayChars.length === 0} extraClass={`ml-40`} text={'Очистить'}
                            type={'button'}/>
                </form>
                <ul className={styles.vizualization}>
                    {arrayChars?.map((item: string | number, index: number) => <li key={index}>
                        <Circle
                            head={index === arrayChars.length - 1 ? 'top' : null}
                            state={lighting === index ? ElementStates.Changing : ElementStates.Default}
                            letter={`${item}`}
                            index={index}
                        /></li>)}
                </ul>
            </div>
        </SolutionLayout>
    );
};
