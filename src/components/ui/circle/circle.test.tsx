import React from 'react';
import {render} from '@testing-library/react';
import {Circle} from './circle';
import {ElementStates} from "../../../types/element-states";

describe('Circle component', () => {

  test('корректная отрисовка без буквы', () => {
    const {container} = render(<Circle/>);
    expect(container).toMatchSnapshot();
  });

  test('корректная отрисовка с буквами', () => {
    const {container} = render(<Circle letter="A"/>);
    expect(container).toMatchSnapshot();
  });

  test('корректная отрисовка с head', () => {
    const {container} = render(<Circle head="Head"/>);
    expect(container).toMatchSnapshot();
  });

  test('корректная отрисовка с react-элементом в head', () => {
    const {container} = render(<Circle head={<p>Head</p>}/>);
    expect(container).toMatchSnapshot();
  });

  test('корректная отрисовка с tail', () => {
    const {container} = render(<Circle tail="Tail"/>);
    expect(container).toMatchSnapshot();
  });

  test('корректная отрисовка с react-элементом в tail', () => {
    const {container} = render(<Circle tail={<p>Tail</p>}/>);
    expect(container).toMatchSnapshot();
  });

  test('корректная отрисовка с index', () => {
    const {container} = render(<Circle index={1}/>);
    expect(container).toMatchSnapshot();
  });

  test('корректная отрисовка с пропом isSmall ===  true', () => {
    const {container} = render(<Circle isSmall/>);
    expect(container).toMatchSnapshot();
  });

  test('корректная отрисовка в состоянии default', () => {
    const {container} = render(<Circle/>);
    expect(container).toMatchSnapshot();
  });

  test('корректная отрисовка в состоянии changing', () => {
    const {container} = render(<Circle state={ElementStates.Changing}/>);
    expect(container).toMatchSnapshot();
  });

  test('корректная отрисовка в состоянии modified', () => {
    const {container} = render(<Circle state={ElementStates.Modified}/>);
    expect(container).toMatchSnapshot();
  });

});